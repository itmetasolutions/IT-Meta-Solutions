"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import styles from "./Industries.module.scss";

const INDUSTRIES = [
  {
    index: "01",
    title: "E-commerce",
    body: "Product pages, checkout flows and pricing logic built around what you actually sell — not a generic template.",
    image: {
      src: "https://images.unsplash.com/photo-1758351507026-71ad3645cb43?q=80&w=1600&auto=format&fit=crop",
      alt: "Cardboard shipping box sealed with fragile tape",
    },
  },
  {
    index: "02",
    title: "Real Estate",
    body: "Listings, search and lead capture built for how buyers and tenants actually browse.",
    image: {
      src: "https://images.unsplash.com/photo-1760473537243-72168ffd273c?q=80&w=1600&auto=format&fit=crop",
      alt: "Row of modern houses by a calm lake",
    },
  },
  {
    index: "03",
    title: "SaaS & Tech",
    body: "Marketing sites and product interfaces that keep pace with how fast your roadmap moves.",
    image: {
      src: "https://images.unsplash.com/photo-1774901128215-3549cc686921?q=80&w=1600&auto=format&fit=crop",
      alt: "Coding on a dark-theme computer screen",
    },
  },
  {
    index: "04",
    title: "Finance",
    body: "Clear, trustworthy interfaces for products where accuracy and compliance aren't optional.",
    image: {
      src: "https://images.unsplash.com/photo-1730789701634-5386e7271462?q=80&w=1600&auto=format&fit=crop",
      alt: "Calculator sitting on top of a pile of money",
    },
  },
  {
    index: "05",
    title: "Healthcare",
    body: "Patient-facing experiences built around clarity, trust and accessibility.",
    image: {
      src: "https://images.unsplash.com/photo-1758691463384-771db2f192b3?q=80&w=1600&auto=format&fit=crop",
      alt: "Doctor wearing a stethoscope at a desk",
    },
  },
  {
    index: "06",
    title: "Professional Services",
    body: "Sites that turn expertise into inquiries — clear positioning, faster contact.",
    image: {
      src: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=1600&auto=format&fit=crop",
      alt: "Group of professionals in a business meeting",
    },
  },
  {
    index: "07",
    title: "Travel & Hospitality",
    body: "Booking flows and campaigns built for how people actually plan and book trips.",
    image: {
      src: "https://images.unsplash.com/photo-1621293954908-907159247fc8?q=80&w=1600&auto=format&fit=crop",
      alt: "Modern hotel lobby with designer furniture",
    },
  },
  {
    index: "08",
    title: "Retail & Fashion",
    body: "Storefronts and campaigns built to make browsing feel as good as the product.",
    image: {
      src: "https://images.unsplash.com/photo-1761090617068-f1b3257d27ad?q=80&w=1600&auto=format&fit=crop",
      alt: "Racks of clothing displayed in a boutique",
    },
  },
];

export function Industries() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<HTMLButtonElement[]>([]);

  // Scroll-driven auto-highlight, layered on top of hover/click below —
  // whichever industry is nearest the vertical center of the viewport
  // becomes active as the section scrolls past.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = itemRefs.current.indexOf(entry.target as HTMLButtonElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const active = INDUSTRIES[activeIndex]!;

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
        <ul className={styles.list}>
          {INDUSTRIES.map((industry, i) => {
            const isActive = i === activeIndex;
            return (
              <li key={industry.title} className={isActive ? styles.itemActive : ""}>
                <button
                  type="button"
                  ref={(el) => {
                    if (el) itemRefs.current[i] = el;
                  }}
                  className={styles.itemButton}
                  onClick={() => setActiveIndex(i)}
                  onMouseEnter={() => setActiveIndex(i)}
                  aria-pressed={isActive}
                >
                  <span className={styles.itemIndex}>{industry.index}</span>
                  <span className={styles.itemTitle}>{industry.title}</span>
                  <span className={styles.itemShort}>{industry.body}</span>
                </button>

                <div className={styles.mobilePreview}>
                  <div className={styles.mobileImage}>
                    <Image src={industry.image.src} alt={industry.image.alt} fill sizes="90vw" />
                  </div>
                  <p>{industry.body}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className={styles.desktopPreview}>
          <div className={styles.previewVisual}>
            <Image
              src={active.image.src}
              alt={active.image.alt}
              fill
              sizes="30vw"
              className={styles.previewImage}
            />
          </div>
          <div className={styles.previewBody}>
            <p>{active.body}</p>
            <Link href="/contact" className={styles.previewLink}>
              Start a {active.title.toLowerCase()} project ↗
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
