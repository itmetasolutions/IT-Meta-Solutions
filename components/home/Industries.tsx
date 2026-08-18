"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import styles from "./Industries.module.scss";

const INDUSTRIES = [
  {
    title: "E-commerce",
    body: "Product pages, checkout flows and pricing logic built around what you actually sell — not a generic template.",
    image: {
      src: "https://images.unsplash.com/photo-1758351507026-71ad3645cb43?q=80&w=1600&auto=format&fit=crop",
      alt: "Cardboard shipping box sealed with fragile tape",
    },
  },
  {
    title: "Real Estate",
    body: "Listings, search and lead capture built for how buyers and tenants actually browse.",
    image: {
      src: "https://images.unsplash.com/photo-1760473537243-72168ffd273c?q=80&w=1600&auto=format&fit=crop",
      alt: "Row of modern houses by a calm lake",
    },
  },
  {
    title: "SaaS & Tech",
    body: "Marketing sites and product interfaces that keep pace with how fast your roadmap moves.",
    image: {
      src: "https://images.unsplash.com/photo-1774901128215-3549cc686921?q=80&w=1600&auto=format&fit=crop",
      alt: "Coding on a dark-theme computer screen",
    },
  },
  {
    title: "Finance",
    body: "Clear, trustworthy interfaces for products where accuracy and compliance aren't optional.",
    image: {
      src: "https://images.unsplash.com/photo-1730789701634-5386e7271462?q=80&w=1600&auto=format&fit=crop",
      alt: "Calculator sitting on top of a pile of money",
    },
  },
  {
    title: "Healthcare",
    body: "Patient-facing experiences built around clarity, trust and accessibility.",
    image: {
      src: "https://images.unsplash.com/photo-1758691463384-771db2f192b3?q=80&w=1600&auto=format&fit=crop",
      alt: "Doctor wearing a stethoscope at a desk",
    },
  },
  {
    title: "Professional Services",
    body: "Sites that turn expertise into inquiries — clear positioning, faster contact.",
    image: {
      src: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=1600&auto=format&fit=crop",
      alt: "Group of professionals in a business meeting",
    },
  },
  {
    title: "Travel & Hospitality",
    body: "Booking flows and campaigns built for how people actually plan and book trips.",
    image: {
      src: "https://images.unsplash.com/photo-1621293954908-907159247fc8?q=80&w=1600&auto=format&fit=crop",
      alt: "Modern hotel lobby with designer furniture",
    },
  },
  {
    title: "Retail & Fashion",
    body: "Storefronts and campaigns built to make browsing feel as good as the product.",
    image: {
      src: "https://images.unsplash.com/photo-1761090617068-f1b3257d27ad?q=80&w=1600&auto=format&fit=crop",
      alt: "Racks of clothing displayed in a boutique",
    },
  },
];

export function Industries() {
  const [active, setActive] = useState(0);
  const stageRefs = useRef<HTMLButtonElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = stageRefs.current.indexOf(entry.target as HTMLButtonElement);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    stageRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const selectIndustry = (i: number) => {
    setActive(i);
    stageRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section className={styles.section}>
      <div className={styles.intro}>
        <div>
          <span className={styles.eyebrow}>Industries</span>
          <SplitTextReveal
            as="h2"
            text="Built around how your industry actually works."
            trigger="scroll"
            className={styles.heading}
          />
        </div>
        <p className={styles.introBody}>
          The same template never fits two industries the same way. We shape
          strategy, design and build around the specifics of yours — not a
          one-size-fits-all package.
        </p>
      </div>

      <div className={styles.grid}>
        <div className={styles.stages}>
          {INDUSTRIES.map((industry, i) => (
            <button
              key={industry.title}
              type="button"
              ref={(el) => {
                if (el) stageRefs.current[i] = el;
              }}
              className={`${styles.stage} ${active === i ? styles.stageActive : ""}`}
              onClick={() => selectIndustry(i)}
              aria-pressed={active === i}
            >
              <span className={styles.stageTitle}>{industry.title}</span>
              <p>{industry.body}</p>
            </button>
          ))}
        </div>

        <div className={styles.sticky}>
          <div className={styles.panel}>
            {INDUSTRIES.map((industry, i) => (
              <Image
                key={industry.title}
                src={industry.image.src}
                alt={industry.image.alt}
                fill
                sizes="480px"
                className={styles.panelImage}
                style={{ opacity: active === i ? 1 : 0 }}
                priority={i === 0}
              />
            ))}
            <div className={styles.stageLabel}>
              <span className={styles.stageIndex}>{String(active + 1).padStart(2, "0")}</span>
              <span>{INDUSTRIES[active]!.title}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
