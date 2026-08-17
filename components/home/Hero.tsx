"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { projects } from "@/content/projects";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import styles from "./Hero.module.scss";

const stack = [projects[0]!, projects[3]!, projects[5]!]; // InHomes Direct, Halla Gulla, Hikmabiotics

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const canHover = useMediaQuery("(pointer: fine)");

  useGSAP(
    () => {
      if (!canHover) return;
      const quickX = cardRefs.current.map((el) =>
        gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" })
      );
      const quickY = cardRefs.current.map((el) =>
        gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" })
      );

      const onMove = (e: MouseEvent) => {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect) return;
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;
        cardRefs.current.forEach((_, i) => {
          const depth = (i + 1) * 10;
          quickX[i]?.(relX * depth);
          quickY[i]?.(relY * depth);
        });
      };

      sectionRef.current?.addEventListener("mousemove", onMove);
      return () => sectionRef.current?.removeEventListener("mousemove", onMove);
    },
    { dependencies: [canHover], scope: sectionRef }
  );

  return (
    <section className={styles.hero} ref={sectionRef}>
      <div className={styles.text}>
        <span className={styles.eyebrow}>Digital Product &amp; Growth Studio</span>
        <SplitTextReveal
          as="h1"
          text="We build digital that moves."
          className={styles.headline}
        />
        <p className={styles.sub}>
          Strategy, design, development and growth brought together to build
          digital products that perform in the real world.
        </p>
        <div className={styles.actions}>
          <MagneticButton href="/work" className={styles.primaryCta} arrow>
            Explore our work
          </MagneticButton>
          <MagneticButton href="/contact" className={styles.secondaryCta}>
            Start a project
          </MagneticButton>
        </div>
      </div>

      <div className={styles.visual} aria-hidden="true">
        {stack.map((project, i) => (
          <div
            key={project.slug}
            className={styles.card}
            ref={(el) => {
              if (el) cardRefs.current[i] = el;
            }}
            style={{
              background: project.themeColorSoft,
              zIndex: stack.length - i,
            }}
          >
            {project.logo ? (
              <Image src={project.logo} alt="" width={140} height={40} className={styles.cardLogo} />
            ) : (
              <span className={styles.cardTitle} style={{ color: project.themeColor }}>
                {project.title}
              </span>
            )}
            <span className={styles.cardCategory}>{project.category[0]}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
