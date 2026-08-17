"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./RevealPanel.module.scss";

type Props = {
  children: React.ReactNode;
  wipeColor: string;
  className?: string;
};

// Project-colour panel wipes away to reveal the image/content beneath,
// instead of a plain fade — per the brief's "image reveals" motion rule.
export function RevealPanel({ children, wipeColor, className = "" }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!rootRef.current || reducedMotion) return;
      gsap.fromTo(
        overlayRef.current,
        { scaleX: 1 },
        {
          scaleX: 0,
          duration: 1,
          ease: "power4.inOut",
          transformOrigin: "right",
          scrollTrigger: { trigger: rootRef.current, start: "top 78%" },
        }
      );
      gsap.fromTo(
        contentRef.current,
        { scale: 1.12 },
        {
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 78%" },
        }
      );
    },
    { dependencies: [reducedMotion], scope: rootRef }
  );

  return (
    <div ref={rootRef} className={`${styles.root} ${className}`}>
      <div ref={contentRef} className={styles.content}>
        {children}
      </div>
      {!reducedMotion && (
        <div ref={overlayRef} className={styles.overlay} style={{ background: wipeColor }} />
      )}
    </div>
  );
}
