"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { processStages } from "@/content/process";
import styles from "./Process.module.scss";

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      if (!lineRef.current || !sectionRef.current) return;
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            end: "bottom 55%",
            scrub: 0.5,
            onUpdate: (self) => {
              setActive(Math.min(processStages.length - 1, Math.floor(self.progress * processStages.length)));
            },
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.intro}>
        <span className={styles.eyebrow}>How we work</span>
        <h2>A process built to keep everyone honest about what&rsquo;s actually happening.</h2>
      </div>

      <div className={styles.timeline}>
        <div className={styles.lineTrack}>
          <div className={styles.lineFill} ref={lineRef} />
        </div>

        <div className={styles.stages}>
          {processStages.map((stage, i) => (
            <div key={stage.index} className={`${styles.stage} ${i <= active ? styles.stageActive : ""}`}>
              <span className={styles.stageIndex}>{stage.index}</span>
              <h3>{stage.title}</h3>
              <p>{stage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
