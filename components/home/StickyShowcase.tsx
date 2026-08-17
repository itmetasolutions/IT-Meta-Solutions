"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getProject } from "@/content/projects";
import { MagneticButton } from "@/components/motion/MagneticButton";
import styles from "./StickyShowcase.module.scss";

const project = getProject("inhomes-direct")!;

const stages = [
  { label: "Overview", body: project.summary },
  { label: "Challenge", body: project.challenge! },
  { label: "Solution", body: project.solution! },
  {
    label: "Results",
    body: project.results.map((r) => `${r.label}: ${r.value}`).join(" · "),
  },
];

export function StickyShowcase() {
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
      <div className={styles.grid}>
        <div className={styles.sticky}>
          <span className={styles.eyebrow}>Inside a project</span>
          <div className={styles.panel} style={{ background: project.themeColorSoft }}>
            {project.logo && (
              <Image src={project.logo} alt={project.client} width={200} height={56} className={styles.logo} />
            )}
            <div className={styles.stageLabel}>
              <span className={styles.stageIndex}>{String(active + 1).padStart(2, "0")}</span>
              <span>{stages[active]!.label}</span>
            </div>
          </div>
          <MagneticButton href={`/work/${project.slug}`} className={styles.cta} arrow>
            Read the full case study
          </MagneticButton>
        </div>

        <div className={styles.stages}>
          {stages.map((stage, i) => (
            <div
              key={stage.label}
              ref={(el) => {
                if (el) stageRefs.current[i] = el;
              }}
              className={`${styles.stage} ${active === i ? styles.stageActive : ""}`}
            >
              <span className={styles.stageEyebrow}>{stage.label}</span>
              <p>{stage.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
