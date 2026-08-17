"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { getGoogleReviews, type GoogleReview } from "@/lib/api/reviews";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import styles from "./Testimonials.module.scss";

export function Testimonials() {
  const [reviews, setReviews] = useState<GoogleReview[] | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let mounted = true;
    getGoogleReviews().then((data) => {
      if (mounted) setReviews(data?.reviews ?? []);
    });
    return () => {
      mounted = false;
    };
  }, []);

  // No fabricated placeholder here: while loading, or if there's genuinely
  // nothing to show, the section simply doesn't render.
  if (!reviews || reviews.length === 0) return null;

  const review = reviews[index]!;
  const total = reviews.length;
  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + total) % total);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Client feedback</span>
        <a
          href="https://maps.app.goo.gl/5LmmNhuWXgWUiA1L6"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.googleLink}
        >
          Read our Google reviews ↗
        </a>
      </div>

      <div className={styles.stage}>
        <div className={styles.stars} aria-hidden="true">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} />
          ))}
        </div>

        <SplitTextReveal
          key={review.id}
          as="p"
          text={review.text}
          trigger="mount"
          stagger={0.02}
          className={styles.quote}
        />

        <div className={styles.person}>
          {review.author_photo_url ? (
            <Image
              src={review.author_photo_url}
              alt=""
              width={48}
              height={48}
              className={styles.avatar}
            />
          ) : (
            <div className={styles.avatarFallback}>{review.author_name.charAt(0)}</div>
          )}
          <div>
            <strong>{review.author_name}</strong>
            <span>Verified Google review</span>
          </div>
        </div>
      </div>

      <div className={styles.nav}>
        <span className={styles.counter}>
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <div className={styles.arrows}>
          <button type="button" onClick={() => go(-1)} aria-label="Previous review">
            <ArrowLeft size={18} />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next review">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
