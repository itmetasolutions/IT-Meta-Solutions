"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./ServicesStack.module.scss";

// Curated highlight list for this homepage stack — distinct from (and
// shorter than) the full 9-service catalog on /services. Links to a
// dedicated /services/[slug] page where one exists; falls back to the
// services index for the two that don't (Google Business Profile, Mobile
// Apps aren't modelled as their own service pages yet).
const SERVICES = [
  {
    title: "Web Development",
    description:
      "Fast, maintainable sites and web apps built to handle real content and real traffic — not just look good in a mockup.",
    image: {
      src: "https://images.unsplash.com/photo-1763568258330-039d2f3dfc76?q=80&w=1600&auto=format&fit=crop",
      alt: "Laptop screen showing lines of code",
    },
    href: "/services/web-development",
  },
  {
    title: "Digital Marketing",
    description:
      "Meta Ads and social campaigns measured by leads and sales, not impressions — validated on a small budget before we scale spend.",
    image: {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
      alt: "Analytics dashboard showing campaign performance charts",
    },
    href: "/services/digital-marketing",
  },
  {
    title: "Search Engine Optimization (SEO)",
    description:
      "Technical SEO and content structure built into the site from day one, not retrofitted after launch.",
    image: {
      src: "https://images.unsplash.com/photo-1686061593213-98dad7c599b9?q=80&w=1600&auto=format&fit=crop",
      alt: "Analytics dashboard on a computer screen",
    },
    href: "/services/seo-growth",
  },
  {
    title: "Google Business Profile (GBP)",
    description:
      "A fully optimised, actively managed profile so local searches find you first — not a one-time setup and forget.",
    image: {
      src: "https://images.unsplash.com/photo-1694928850410-b209896782a2?q=80&w=1600&auto=format&fit=crop",
      alt: "Map pin marking a business location",
    },
    href: "/services",
  },
  {
    title: "CRM & Salesforce",
    description:
      "Salesforce implementations built around how your team actually sells and serves customers, not a generic template.",
    image: {
      src: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=1600&auto=format&fit=crop",
      alt: "Team in a meeting room discussing at a table",
    },
    href: "/services/crm-salesforce",
  },
  {
    title: "Custom Applications",
    description:
      "Software for the parts of the business off-the-shelf tools don't fit — internal tools, platforms, workflow automation.",
    image: {
      src: "https://images.unsplash.com/photo-1742199009963-c028d0c5a603?q=80&w=1600&auto=format&fit=crop",
      alt: "Modern desk setup with multiple screens",
    },
    href: "/services/custom-applications",
  },
  {
    title: "Mobile Apps",
    description:
      "Native and cross-platform apps designed and built around what your users actually need to do, on the devices they use.",
    image: {
      src: "https://images.unsplash.com/photo-1756575433591-0d82418dd67b?q=80&w=1600&auto=format&fit=crop",
      alt: "Hand holding a smartphone displaying colourful app icons",
    },
    href: "/services",
  },
];

// Scroll distance the pinned section consumes per card transition, and the
// vertical peek offset between stacked cards — tuned per breakpoint so the
// interaction stays proportional on smaller screens rather than just
// shrinking the same numbers.
const DESKTOP = { scrollPerCard: 700, stackGap: 20 };
const TABLET = { scrollPerCard: 480, stackGap: 14 };

export function ServicesStack() {
  const stackWrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLElement[]>([]);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !stackWrapRef.current) return;
      const cards = cardRefs.current.filter(Boolean);
      if (cards.length < 2) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 767px)",
          isTablet: "(min-width: 768px) and (max-width: 1023px)",
          isDesktop: "(min-width: 1024px)",
        },
        (context) => {
          const { isMobile, isTablet } = context.conditions as {
            isMobile: boolean;
            isTablet: boolean;
          };

          // Mobile: normal scrolling flow, no pin — clear any transforms a
          // previous (wider) breakpoint may have left behind.
          if (isMobile) {
            gsap.set(cards, { clearProps: "all" });
            return;
          }

          const { scrollPerCard, stackGap } = isTablet ? TABLET : DESKTOP;

          const header = document.querySelector("header");
          const headerOffset = (header?.getBoundingClientRect().height ?? 80) + 24;
          // Cards use min-height, not a fixed height, so content length
          // variance can never get clipped — measure the tallest one
          // actually rendered, not just the first.
          const cardHeight = Math.max(...cards.map((c) => c.offsetHeight));
          // +24px so the frontmost card's box-shadow isn't clipped by the
          // overflow:hidden that keeps waiting cards from bleeding into view.
          const shadowBuffer = 24;

          gsap.set(stackWrapRef.current, {
            height: cardHeight + stackGap * (cards.length - 1) + shadowBuffer,
          });
          gsap.set(cards, { zIndex: (i: number) => i + 1 });
          gsap.set(cards[0]!, { y: 0 });
          // Hidden starting position for not-yet-revealed cards needs to
          // clear the viewport, not just the card's own height (GSAP
          // resolves "100%" against the target's own size) — otherwise
          // waiting cards start already peeking into view.
          gsap.set(cards.slice(1), { y: window.innerHeight });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: stackWrapRef.current,
              start: () => `top ${headerOffset}px`,
              end: () => `+=${(cards.length - 1) * scrollPerCard}`,
              pin: true,
              scrub: true,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });

          cards.slice(1).forEach((card, idx) => {
            const i = idx + 1;
            tl.fromTo(
              card,
              { y: window.innerHeight },
              { y: i * stackGap, duration: 1, ease: "none" }
            );
          });

          return () => {
            gsap.set(cards, { clearProps: "all" });
          };
        }
      );

      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);

      return () => {
        window.removeEventListener("load", onLoad);
        mm.revert();
      };
    },
    { dependencies: [reducedMotion], scope: stackWrapRef }
  );

  return (
    <section className={styles.section}>
      <div className={styles.intro}>
        <div>
          <span className={styles.eyebrow}>Services</span>
          <SplitTextReveal
            as="h2"
            text="Everything under one roof, built to work together."
            trigger="scroll"
            className={styles.heading}
          />
        </div>
        <p className={styles.introBody}>
          From the first line of code to the ads that bring people to it —
          one team handles strategy, build and growth, so nothing gets lost
          translating between agencies.
        </p>
      </div>

      <div className={styles.stackWrap} ref={stackWrapRef}>
        {SERVICES.map((service, i) => (
          <article
            key={service.title}
            className={styles.card}
            ref={(el) => {
              if (el) cardRefs.current[i] = el;
            }}
          >
            <div className={styles.cardVisual}>
              <Image
                src={service.image.src}
                alt={service.image.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={styles.cardImage}
              />
            </div>

            <div className={styles.cardInfo}>
              <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={styles.title}>{service.title}</h3>
              <p className={styles.summary}>{service.description}</p>

              <MagneticButton href={service.href} className={styles.link} arrow>
                Learn more
              </MagneticButton>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.footer}>
        <Link href="/services" className={styles.viewAll}>
          View all services ↗
        </Link>
      </div>
    </section>
  );
}
