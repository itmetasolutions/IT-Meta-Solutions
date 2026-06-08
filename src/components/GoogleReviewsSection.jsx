import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, LoaderCircle, Star, Quote, ThumbsUp } from "lucide-react";
import Container from "./Container";
import TechMeshBg from "./TechMeshBg";

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
  if (envBaseUrl) return envBaseUrl;
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") return "http://localhost:3001";
  }
  return DEFAULT_API_BASE_URL;
}

function formatReviewDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function RatingStars({ rating, size = "sm" }) {
  const filled = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));
  const cls = size === "lg" ? "h-6 w-6" : "h-4 w-4";
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`${cls} ${i < filled ? "fill-[#fbbc05] text-[#fbbc05]" : "text-white/15"}`} />
      ))}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 animate-pulse">
      <div className="flex gap-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-white/10 shrink-0" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="h-3 w-28 rounded-full bg-white/10" />
          <div className="h-3 w-20 rounded-full bg-white/10" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 rounded-full bg-white/10" />
        <div className="h-3 rounded-full bg-white/10" />
        <div className="h-3 w-3/4 rounded-full bg-white/10" />
      </div>
    </div>
  );
}

function ReviewCard({ review, delay = 0 }) {
  const initial = review.author_name?.trim()?.charAt(0)?.toUpperCase() || "G";
  const date = formatReviewDate(review.published_at_iso);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      className="group relative flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-sm transition-all duration-300 hover:border-[#1D4ED8]/40 hover:bg-white/[0.05]"
      style={{ transition: "box-shadow 0.3s, border-color 0.3s, background 0.3s" }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 30px rgba(29,78,216,0.12), 0 0 60px rgba(29,78,216,0.05)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#1D4ED8]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />

      {/* Header row */}
      <div className="flex items-start gap-3 mb-4">
        {review.author_photo_url ? (
          <img
            src={review.author_photo_url}
            alt={review.author_name}
            className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-white/10"
            loading="lazy"
          />
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{ background: "linear-gradient(135deg, #1D4ED8, #23A6E8)" }}>
            {initial}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white truncate">{review.author_name}</p>
          <p className="text-[11px] text-zinc-500 mt-0.5">{date}</p>
        </div>

        <a href={review.google_review_url} target="_blank" rel="noreferrer"
          className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-600 hover:text-[#fbbc05]">
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Stars */}
      <RatingStars rating={review.rating} />

      {/* Review text */}
      <div className="mt-3 flex gap-2">
        <Quote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1D4ED8]/50" />
        <p className="text-[13px] leading-[1.75] text-zinc-400 line-clamp-4">{review.text}</p>
      </div>

      {/* Review image */}
      {review.images?.[0] && (
        <div className="mt-4 overflow-hidden rounded-xl border border-white/10 h-20 w-28">
          <img src={review.images[0]} alt="" className="h-full w-full object-cover" loading="lazy" />
        </div>
      )}
    </motion.article>
  );
}

export default function GoogleReviewsSection({
  title = "See What Clients Say On Google",
  description = "Latest public Google feedback from our business profile.",
}) {
  const [state, setState] = useState({ loading: true, error: null, data: null });

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch(`${getApiBaseUrl()}/api/google-reviews`);
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        if (mounted) setState({ loading: false, error: null, data });
        return;
      } catch { /* fall through */ }
      try {
        const res = await fetch("/google-reviews.json");
        if (!res.ok) throw new Error("Fallback unavailable");
        const data = await res.json();
        if (mounted) setState({ loading: false, error: null, data: { ...data, cache_status: "stale" } });
      } catch (err) {
        if (mounted) setState({ loading: false, error: err instanceof Error ? err.message : "Failed to load.", data: null });
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const source    = state.data?.source || {};
  const reviews   = state.data?.reviews || [];
  const mapsUrl   = source.google_maps_url   || FALLBACK_GOOGLE_MAPS_URL;
  const writeUrl  = source.write_review_url  || mapsUrl;
  const syncedAt  = formatReviewDate(state.data?.generated_at);
  const isLive    = state.data?.cache_status !== "stale";
  const rating    = source.rating?.toFixed?.(1) || "5.0";
  const totalRevs = source.reviews_number || reviews.length || 0;

  return (
    <section className="py-16 sm:py-24 bg-[#141A2E] relative overflow-hidden">
      <TechMeshBg variant="marketing" iconColor="#1D4ED8" iconOpacityBase={0.03} />
      <div className="absolute inset-0 dot-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(29,78,216,0.09) 0%, transparent 70%)" }} />

      <Container>
        {/* ── Section heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          {/* Google badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 mb-5">
            <GoogleLogo className="h-4 w-4" />
            <span className="text-xs font-semibold text-white tracking-wide">Google Reviews</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">{title}</h2>
          <p className="mt-4 text-base text-zinc-400 max-w-xl mx-auto">{description}</p>

          {/* Rating summary row */}
          <div className="mt-8 inline-flex flex-col sm:flex-row items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur px-6 py-4">
            <div className="flex items-end gap-3">
              <span className="text-5xl font-bold text-white" style={{ textShadow: "0 0 20px rgba(251,188,5,0.3)" }}>
                {rating}
              </span>
              <div className="pb-1.5">
                <RatingStars rating={parseFloat(rating)} size="lg" />
                <p className="text-xs text-zinc-500 mt-1">{totalRevs} reviews</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/10" />
            <div className="flex items-center gap-2">
              {state.loading ? (
                <LoaderCircle className="h-3.5 w-3.5 animate-spin text-zinc-500" />
              ) : (
                <span className={`h-2 w-2 rounded-full ${isLive ? "bg-emerald-400" : "bg-amber-400"}`} />
              )}
              <span className="text-xs text-zinc-400">{state.loading ? "Loading…" : isLive ? "Live feed" : "Cached"}</span>
              {syncedAt && <span className="text-xs text-zinc-600 hidden sm:inline">· {syncedAt}</span>}
            </div>
          </div>
        </motion.div>

        {/* ── Review cards grid ── */}
        {state.loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : reviews.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.slice(0, 6).map((r, i) => (
              <ReviewCard key={r.id ?? i} review={r} delay={i * 0.07} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <ThumbsUp className="h-10 w-10 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-400 text-sm">
              {state.error ? "Reviews temporarily unavailable." : "No reviews found yet."}
            </p>
          </div>
        )}

        {/* ── CTA row ── */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href={mapsUrl} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition-all hover:bg-zinc-100 hover:scale-105"
            style={{ boxShadow: "0 0 20px rgba(255,255,255,0.1)" }}
          >
            <GoogleLogo className="h-4 w-4" />
            View Google Profile
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <a href={writeUrl} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/[0.12] hover:border-white/25"
          >
            Write a Review
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </Container>
    </section>
  );
}

