"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { projects } from "@/content/projects";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import Link from "next/link";
import styles from "./ProjectSlider.module.scss";

export function ProjectSlider() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Pinned horizontal scroll only above the "lg" breakpoint — mobile
      // uses the same track as a native scroll-snap swipe carousel instead.
      mm.add("(min-width: 1024px)", () => {
        if (!trackRef.current || !sectionRef.current) return;
        const scrollDistance = trackRef.current.scrollWidth - window.innerWidth;

        const tween = gsap.to(trackRef.current, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            scrub: 0.6,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        return () => tween.scrollTrigger?.kill();
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.track} ref={trackRef}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>The work, in motion</span>
          <h2>Six projects. Six different problems.</h2>
        </div>
        {projects.map((project) => (
          <Link key={project.slug} href={`/work/${project.slug}`} className={styles.panel}>
            <div className={styles.visual}>
              <ProjectVisual project={project} reveal={false} sizes="60vw" />
            </div>
            <div className={styles.info}>
              <h3>{project.title}</h3>
              <span>{project.category.slice(0, 2).join(" / ")}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
