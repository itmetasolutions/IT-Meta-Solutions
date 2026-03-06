import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  LoaderCircle,
  Quote,
  Star,
} from "lucide-react";
import Container from "./Container";

function GoogleLogo({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-label="Google" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.332 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" fill="#FFC107"/>
      <path d="M6.306 14.691l6.571 4.819C14.655 15.108 19.001 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" fill="#FF3D00"/>
      <path d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.31 0-9.621-3.317-11.28-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" fill="#4CAF50"/>
      <path d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" fill="#1976D2"/>
    </svg>
  );
}

const DEFAULT_API_BASE_URL = "https://it-meta-solutions.onrender.com";
const FALLBACK_GOOGLE_MAPS_URL = "https://maps.app.goo.gl/5LmmNhuWXgWUiA1L6";

function getApiBaseUrl() {
  const envBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");
  if (envBaseUrl) {
    return envBaseUrl;
  }

  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") {
      return "http://localhost:3001";
    }
  }

  return DEFAULT_API_BASE_URL;
}

function formatReviewDate(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function RatingStars({ rating, size = "md", className = "" }) {
  const filledStars = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));
  const sizeClass = size === "lg" ? "h-5 w-5" : "h-5 w-5";

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={`${sizeClass} ${
            index < filledStars
              ? "fill-[#fbbc05] text-[#fbbc05]"
              : "text-white/15"
          }`}
        />
      ))}
    </div>
  );
}

function LoadingCard() {
  return (
    <div className="h-full rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
      <div className="animate-pulse">
        <div className="h-12 w-12 rounded-full bg-white/10" />
        <div className="mt-5 h-4 w-32 rounded-full bg-white/10" />
        <div className="mt-2 h-3 w-24 rounded-full bg-white/10" />
        <div className="mt-4 h-4 w-28 rounded-full bg-white/10" />
        <div className="mt-6 space-y-3">
          <div className="h-3 rounded-full bg-white/10" />
          <div className="h-3 rounded-full bg-white/10" />
          <div className="h-3 w-4/5 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ review }) {
  const authorInitial = review.author_name?.trim()?.charAt(0)?.toUpperCase() || "G";
  const reviewDate = formatReviewDate(review.published_at_iso);

  return (
    <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
      {/* Top row: avatar + name/date + stars + link */}
      <div className="flex items-start gap-4">
        {review.author_photo_url ? (
          <img
            src={review.author_photo_url}
            alt={review.author_name}
            className="h-11 w-11 flex-shrink-0 rounded-full object-cover ring-1 ring-white/10"
            loading="lazy"
          />
        ) : (
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
            {authorInitial}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
            <div>
              <p className="text-sm font-semibold text-white">{review.author_name}</p>
              <p className="text-xs text-zinc-500">{reviewDate}</p>
            </div>
            <div className="flex items-center gap-3">
              <RatingStars rating={review.rating} />
              <a
                href={review.google_review_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 transition hover:text-[#fbbc05]"
              >
                View
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Review text */}
      <div className="mt-4 flex items-start gap-2">
        <Quote className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-white/20" />
        <p className="text-[14px] leading-7 text-zinc-300">{review.text}</p>
      </div>

      {/* Review image — small thumbnail */}
      {review.images?.[0] ? (
        <div className="mt-4 overflow-hidden rounded-xl border border-white/10 w-28 h-20">
          <img
            src={review.images[0]}
            alt={`${review.author_name} review`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      ) : null}
    </article>
  );
}

export default function GoogleReviewsSection({
  title = "Read Our Google Reviews",
  description = "Latest customer feedback pulled directly from our Google Business Profile.",
}) {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null,
  });

  useEffect(() => {
    let isMounted = true;

    async function loadReviews() {
      // Try live API first
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/google-reviews`);
        if (!response.ok) throw new Error("API error");
        const data = await response.json();
        if (isMounted) {
          setState({ loading: false, error: null, data });
        }
        return;
      } catch {
        // Fall through to static fallback
      }

      // Fallback: static cached JSON served from /public
      try {
        const response = await fetch("/google-reviews.json");
        if (!response.ok) throw new Error("Fallback unavailable");
        const data = await response.json();
        if (isMounted) {
          setState({ loading: false, error: null, data: { ...data, cache_status: "stale" } });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            loading: false,
            error: error instanceof Error ? error.message : "Failed to load Google reviews.",
            data: null,
          });
        }
      }
    }

    loadReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  const source = state.data?.source || {};
  const reviews = state.data?.reviews || [];
  const googleMapsUrl = source.google_maps_url || FALLBACK_GOOGLE_MAPS_URL;
  const writeReviewUrl = source.write_review_url || googleMapsUrl;
  const generatedAt = formatReviewDate(state.data?.generated_at);
  const cacheStatusLabel =
    state.data?.cache_status === "stale" ? "Refreshing cache" : "Live feed";

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0b0812] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-8 lg:p-10"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#5025d1]/20 blur-3xl" />
          <div className="absolute right-0 top-12 h-80 w-80 rounded-full bg-[#1b4dff]/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-pink-500/10 blur-3xl" />

          <div className="relative grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.25fr)]">
            {/* Left panel */}
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              {/* Google badge */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 py-2">
                <GoogleLogo className="h-5 w-5" />
                <span className="text-sm font-medium text-white">Google Reviews</span>
              </div>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-300">
                {description}
              </p>

              {/* Overall rating */}
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.26em] text-white/35">Overall rating</p>
                <div className="mt-3 flex items-end gap-3">
                  <span className="text-5xl font-bold text-white">
                    {source.rating?.toFixed?.(1) || source.rating || "5.0"}
                  </span>
                  <div className="pb-1.5">
                    <RatingStars rating={source.rating || 5} />
                    <p className="mt-1.5 text-xs text-zinc-500">
                      {source.reviews_number || reviews.length || 0} reviews
                    </p>
                  </div>
                </div>
              </div>

              {/* Business profile + sync status */}
              <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.26em] text-white/35">Business profile</p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {source.name || "IT Meta Solutions"}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-200">
                    {state.loading ? (
                      <>
                        <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                        Loading
                      </>
                    ) : (
                      cacheStatusLabel
                    )}
                  </div>
                </div>
                {generatedAt && (
                  <p className="mt-3 text-xs text-zinc-600">Last synced {generatedAt}</p>
                )}
              </div>

              <div className="mt-6 flex gap-3">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-zinc-950 transition hover:bg-zinc-200"
                >
                  View Google Profile
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a
                  href={writeReviewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.08] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-white/[0.14]"
                >
                  Write a Review
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Right panel — reviews as rows */}
            <div className="flex flex-col gap-4">
              {state.loading ? (
                <>
                  <LoadingCard />
                  <LoadingCard />
                </>
              ) : reviews.length > 0 ? (
                reviews.slice(0, 4).map((review) => <ReviewCard key={review.id} review={review} />)
              ) : (
                <div className="flex h-full flex-col justify-between rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.26em] text-white/35">Google reviews</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">
                      {state.error ? "Reviews temporarily unavailable" : "No reviews found yet"}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-300">
                      {state.error ||
                        "Use the Google Business Profile button to view the latest public reviews directly on Google."}
                    </p>
                  </div>
                  <div className="mt-6">
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.14]"
                    >
                      Open on Google
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
