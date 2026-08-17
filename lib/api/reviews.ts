export type GoogleReview = {
  id: string;
  author_name: string;
  author_photo_url: string | null;
  rating: number;
  text: string;
  google_review_url: string;
  published_at_iso: string;
};

export type GoogleReviewsResponse = {
  generated_at: string;
  source: {
    rating: number;
    reviews_number: number;
    google_maps_url: string;
  };
  reviews: GoogleReview[];
};

// Same fallback contract as the previous site: try the live cached API first
// (server/reviews.js, refreshed by a daily Vercel cron), fall back to the
// static snapshot in public/ if the API/DB is unreachable.
export async function getGoogleReviews(): Promise<GoogleReviewsResponse | null> {
  try {
    const res = await fetch("/api/google-reviews");
    if (res.ok) return res.json();
  } catch {
    // fall through to static snapshot
  }
  try {
    const res = await fetch("/google-reviews.json");
    if (res.ok) return res.json();
  } catch {
    // no data available
  }
  return null;
}
