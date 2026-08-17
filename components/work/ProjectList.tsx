"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { projects } from "@/content/projects";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import styles from "./ProjectList.module.scss";

export function ProjectList() {
  const [hovered, setHovered] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const canHover = useMediaQuery("(pointer: fine)");
  const quick = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);

  useGSAP(
    () => {
      if (!previewRef.current) return;
      // xPercent/yPercent handle the centering-on-cursor offset as a
      // separate transform component from the animated x/y translation,
      // so quickTo's per-frame `x`/`y` writes don't clobber it.
      gsap.set(previewRef.current, { xPercent: -50, yPercent: -50 });
      quick.current = {
        x: gsap.quickTo(previewRef.current, "x", { duration: 0.5, ease: "power3.out" }),
        y: gsap.quickTo(previewRef.current, "y", { duration: 0.5, ease: "power3.out" }),
      };
    },
    { dependencies: [canHover] }
  );

  const onMouseMove = (e: React.MouseEvent) => {
    quick.current?.x(e.clientX);
    quick.current?.y(e.clientY);
  };

  const hoveredProject = projects.find((p) => p.slug === hovered);

  return (
    <div className={styles.wrap} onMouseMove={canHover ? onMouseMove : undefined}>
      <ul className={styles.list}>
        {projects.map((project, i) => (
          <li key={project.slug}>
            <Link
              href={`/work/${project.slug}`}
              className={styles.row}
              onMouseEnter={() => setHovered(project.slug)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.title}>{project.title}</span>
              <span className={styles.category}>{project.category.slice(0, 2).join(" / ")}</span>
              <span className={styles.year}>{project.year}</span>
            </Link>

            {/* Static preview for touch/coarse pointers — no hover available. */}
            {!canHover && (
              <div className={styles.mobilePreview}>
                <ProjectVisual project={project} reveal={false} sizes="200px" />
              </div>
            )}
          </li>
        ))}
      </ul>

      {canHover && (
        <div ref={previewRef} className={`${styles.preview} ${hoveredProject ? styles.previewVisible : ""}`}>
          {hoveredProject && <ProjectVisual project={hoveredProject} reveal={false} sizes="260px" />}
        </div>
      )}
    </div>
  );
}
