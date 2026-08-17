"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { projects } from "@/content/projects";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./FeaturedWork.module.scss";

// Scroll distance the pinned section consumes per card transition, and the
// vertical peek offset between stacked cards — tuned per breakpoint so the
// interaction stays proportional on smaller screens rather than just
// shrinking the same numbers.
const DESKTOP = { scrollPerCard: 700, stackGap: 26 };
const TABLET = { scrollPerCard: 480, stackGap: 16 };

export function FeaturedWork() {
  const stackWrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLElement[]>([]);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !stackWrapRef.current) return;
      const cards = cardRefs.current.filter(Boolean);
      if (cards.length < 2) return;

      const mm = gsap.matchMedia();

      // matchMedia().add() only fires its callback immediately if at least
      // one condition currently matches — isDesktop closes the gap so the
      // default (widest) viewport isn't silently skipped on load.
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
          // Cards use min-height, not a fixed height, so different projects'
          // content (summary length, result count) can never get clipped —
          // measure the tallest one actually rendered, not just the first.
          const cardHeight = Math.max(...cards.map((c) => c.offsetHeight));
          // +24px so the frontmost card's box-shadow isn't clipped by the
          // overflow:hidden that keeps waiting cards from bleeding into view.
          const shadowBuffer = 24;

          gsap.set(stackWrapRef.current, {
            height: cardHeight + stackGap * (cards.length - 1) + shadowBuffer,
          });
          gsap.set(cards, { zIndex: (i: number) => i + 1 });
          gsap.set(cards[0]!, { y: 0 });
          // Hidden starting position for not-yet-revealed cards: needs to be
          // well below the visible viewport. A card's own height (the old
          // `y: "100%"`, which GSAP resolves against the TARGET's own size,
          // not the viewport) is nowhere near enough — at ~450px tall that
          // left the "hidden" card only a few hundred px below card 1, so it
          // was already peeking into view before any scroll happened. Use
          // the viewport height instead, which reliably clears it.
          gsap.set(cards.slice(1), { y: window.innerHeight });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: stackWrapRef.current,
              start: () => `top ${headerOffset}px`,
              end: () => `+=${(cards.length - 1) * scrollPerCard}`,
              pin: true,
              // Exact (no lag) scrub: the pin only releases once the raw
              // scroll position reaches the end, so unpinning must coincide
              // exactly with the last card's tween reaching its final
              // value — any smoothing lag here would let the pin release
              // a few pixels before the card visually finishes settling.
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
        <span className={styles.eyebrow}>Featured Work</span>
        <SplitTextReveal
          as="h2"
          text="Real projects, built for real businesses."
          trigger="scroll"
          className={styles.heading}
        />
      </div>

      <div className={styles.stackWrap} ref={stackWrapRef}>
        {projects.map((project, i) => (
          <article
            key={project.slug}
            className={styles.card}
            ref={(el) => {
              if (el) cardRefs.current[i] = el;
            }}
          >
            <div className={styles.cardVisual}>
              <ProjectVisual project={project} reveal={false} />
            </div>

            <div className={styles.cardInfo}>
              <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={styles.title}>{project.title}</h3>
              <div className={styles.tags}>
                {project.category.map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </div>
              <p className={styles.summary}>{project.summary}</p>

              {project.results.length > 0 && (
                <div className={styles.results}>
                  {project.results.slice(0, 2).map((r) => (
                    <div key={r.label}>
                      <span className={styles.resultValue}>{r.value}</span>
                      <span className={styles.resultLabel}>{r.label}</span>
                    </div>
                  ))}
                </div>
              )}

              <MagneticButton href={`/work/${project.slug}`} className={styles.link} arrow>
                View project
              </MagneticButton>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.footer}>
        <Link href="/work" className={styles.viewAll}>
          View all work ↗
        </Link>
      </div>
    </section>
  );
}
