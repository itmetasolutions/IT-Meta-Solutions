import { pool, isDbConfigured, ensureSchema } from './db.js';

const DEFAULT_WIDGET_ID = process.env.GOOGLE_REVIEWS_WIDGET_ID || '416e46d0-c7c1-4638-bce7-268a149545f7';
const DEFAULT_PAGE_URL = process.env.GOOGLE_REVIEWS_PAGE_URL || 'https://itmetasolutions.com/';
const DEFAULT_GOOGLE_MAPS_URL = process.env.GOOGLE_REVIEWS_PROFILE_URL || 'https://maps.app.goo.gl/5LmmNhuWXgWUiA1L6';
const PAGE_LENGTH = 100;

const BOOT_BASE_URL = 'https://core.service.elfsight.com/p/boot/';
const REVIEWS_API_BASE_URL = 'https://service-reviews-ultimate.elfsight.com/data';
const DEFAULT_HEADERS = { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' };

const CACHE_TTL_MS = Number(process.env.GOOGLE_REVIEWS_CACHE_TTL_HOURS || 24) * 60 * 60 * 1000;

async function requestJson(url, headers = {}) {
  const res = await fetch(url, { headers: { ...DEFAULT_HEADERS, ...headers } });
  if (!res.ok) throw new Error(`Request to ${url} failed with ${res.status}`);
  return res.json();
}

function isoFromUnix(value) {
  if (value == null) return null;
  return new Date(value * 1000).toISOString();
}

function normalizeReview(review) {
  const ownerResponse = review.response || null;
  const publishedAt = review.published_at;

  return {
    id: review.id,
    author_name: review.reviewer_name || 'Google user',
    author_photo_url: review.reviewer_picture_url,
    rating: review.rating,
    text: review.text || '',
    text_html: review.text_html || '',
    google_review_url: review.url,
    images: review.images || [],
    published_at: publishedAt,
    published_at_iso: isoFromUnix(publishedAt),
    owner_response: ownerResponse
      ? {
          text: ownerResponse.text || '',
          published_at: ownerResponse.date,
          published_at_iso: isoFromUnix(ownerResponse.date),
          name: ownerResponse.name,
          logo_url: ownerResponse.logo_url,
        }
      : null,
  };
}

async function fetchBootPayload(widgetId, pageUrl) {
  const query = new URLSearchParams({ w: widgetId, page: pageUrl });
  return requestJson(`${BOOT_BASE_URL}?${query}`);
}

async function fetchSourceData(widgetToken, sourceUri) {
  const query = new URLSearchParams({ 'uris[]': sourceUri });
  const response = await requestJson(`${REVIEWS_API_BASE_URL}/sources?${query}`, {
    'x-widget-token': widgetToken,
  });
  const data = response?.result?.data || [];
  if (!data.length) throw new Error('Source metadata response did not include any source records.');
  return data[0];
}

async function fetchReviews(widgetToken, sourceUri, pageLength) {
  const query = new URLSearchParams({
    'uris[]': sourceUri,
    page_length: String(pageLength),
    filter_content: 'with_content',
  });
  const response = await requestJson(`${REVIEWS_API_BASE_URL}/reviews?${query}`, {
    'x-widget-token': widgetToken,
  });
  return response?.result?.data || [];
}

// Fetches fresh reviews from Elfsight (the widget provider behind the site's
// Google reviews embed) and normalizes them into the shape the frontend expects.
export async function scrapeReviews({
  widgetId = DEFAULT_WIDGET_ID,
  pageUrl = DEFAULT_PAGE_URL,
  googleMapsUrl = DEFAULT_GOOGLE_MAPS_URL,
  pageLength = PAGE_LENGTH,
} = {}) {
  const bootPayload = await fetchBootPayload(widgetId, pageUrl);
  const widget = bootPayload.data.widgets[widgetId].data;
  const widgetToken = widget.public_widget_token;
  const sourceUri = widget.settings.sources[0].url;

  const sourcePayload = await fetchSourceData(widgetToken, sourceUri);
  const reviewsPayload = await fetchReviews(widgetToken, sourceUri, pageLength);

  const configuredSource = widget.settings.sources[0];
  const sourceMeta = sourcePayload.meta || {};
  const resolvedSourceUri = sourcePayload.uri || configuredSource.url;

  return {
    generated_at: new Date().toISOString(),
    page_url: pageUrl,
    widget_id: widgetId,
    source: {
      supplier: sourcePayload.supplier || configuredSource.type,
      uri: resolvedSourceUri,
      name: sourceMeta.name || configuredSource.caption,
      address: sourceMeta.address,
      rating: sourcePayload.rating,
      reviews_number: sourcePayload.reviews_number,
      profile_state: sourcePayload.profile_state,
      thumbnail_url: sourceMeta.thumbnail,
      profile_logo_url: sourceMeta.profile_logo_url,
      google_maps_url: googleMapsUrl,
      write_review_url: resolvedSourceUri
        ? `https://search.google.com/local/writereview?placeid=${resolvedSourceUri}`
        : null,
    },
    reviews: reviewsPayload.map(normalizeReview),
  };
}

export async function refreshReviewsCache() {
  const payload = await scrapeReviews();
  if (isDbConfigured()) {
    await ensureSchema();
    await pool.query('INSERT INTO reviews_cache (payload) VALUES ($1)', [payload]);
  }
  return payload;
}

// Returns the most recent cached reviews payload plus how stale it is; null if
// nothing has ever been cached (caller should trigger a live scrape).
export async function getCachedReviews() {
  if (!isDbConfigured()) return null;
  await ensureSchema();
  const { rows } = await pool.query(
    'SELECT payload, generated_at FROM reviews_cache ORDER BY generated_at DESC LIMIT 1'
  );
  if (!rows.length) return null;

  const generatedAt = new Date(rows[0].generated_at).getTime();
  const fresh = Date.now() - generatedAt < CACHE_TTL_MS;
  return { payload: rows[0].payload, fresh };
}
