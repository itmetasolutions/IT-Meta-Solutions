"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import styles from "./WhyChooseUs.module.scss";

const REASONS = [
  {
    title: "Launch Fast",
    body: "From idea to live product in weeks, not months. We move at the speed of your ambition.",
    image: {
      src: "https://images.unsplash.com/photo-1755811717097-23fba595025d?q=80&w=1600&auto=format&fit=crop",
      alt: "Light trails from moving traffic at night, suggesting speed",
    },
  },
  {
    title: "Results Focused",
    body: "Every pixel, campaign, and line of code is optimized for conversions and measurable growth.",
    image: {
      src: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=1600&auto=format&fit=crop",
      alt: "Stock market growth chart displayed on a laptop screen",
    },
  },
  {
    title: "Always Innovating",
    body: "We stay ahead of trends so you stay ahead of your competition — new tools and approaches, tested before they reach your project.",
    image: {
      src: "https://images.unsplash.com/photo-1758873269035-aae0e1fd3422?q=80&w=1600&auto=format&fit=crop",
      alt: "Team collaborating around a whiteboard in an office",
    },
  },
  {
    title: "Partnership Mindset",
    body: "We don't just deliver and disappear. We're invested in your long-term success.",
    image: {
      src: "https://images.unsplash.com/photo-1752159684779-0639174cdfac?q=80&w=1600&auto=format&fit=crop",
      alt: "Business partners shaking hands",
    },
  },
];

export function WhyChooseUs() {
  const [active, setActive] = useState(0);
  const stageRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = stageRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    stageRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.intro}>
        <div>
          <span className={styles.eyebrow}>Why Choose Us</span>
          <SplitTextReveal
            as="h2"
            text="Creativity meets strategy & results."
            trigger="scroll"
            className={styles.heading}
          />
        </div>
        <p className={styles.introBody}>
          Good ideas don&rsquo;t move the needle on their own — they need a
          plan behind them and follow-through after launch. That&rsquo;s the
          combination we build every project around.
        </p>
      </div>

      <div className={styles.grid}>
        <div className={styles.sticky}>
          <div className={styles.panel}>
            {REASONS.map((reason, i) => (
              <Image
                key={reason.title}
                src={reason.image.src}
                alt={reason.image.alt}
                fill
                sizes="480px"
                className={styles.panelImage}
                style={{ opacity: active === i ? 1 : 0 }}
                priority={i === 0}
              />
            ))}
            <div className={styles.stageLabel}>
              <span className={styles.stageIndex}>{String(active + 1).padStart(2, "0")}</span>
              <span>{REASONS[active]!.title}</span>
            </div>
          </div>
        </div>

        <div className={styles.stages}>
          {REASONS.map((reason, i) => (
            <div
              key={reason.title}
              ref={(el) => {
                if (el) stageRefs.current[i] = el;
              }}
              className={`${styles.stage} ${active === i ? styles.stageActive : ""}`}
            >
              <span className={styles.stageEyebrow}>{reason.title}</span>
              <p>{reason.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
