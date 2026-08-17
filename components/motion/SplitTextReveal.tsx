"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./SplitTextReveal.module.scss";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  trigger?: "mount" | "scroll";
  delay?: number;
  stagger?: number;
};

export function SplitTextReveal({
  text,
  as: Tag = "span",
  className = "",
  trigger = "mount",
  delay = 0,
  stagger = 0.06,
}: Props) {
  const rootRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const words = text.split(" ");

  useGSAP(
    () => {
      if (!rootRef.current || reducedMotion) return;
      const targets = rootRef.current.querySelectorAll(`.${styles.word}`);

      const tween = {
        y: 0,
        rotate: 0,
        duration: 0.85,
        ease: "power4.out",
        stagger,
        delay,
      };

      if (trigger === "scroll") {
        gsap.fromTo(
          targets,
          { y: "110%", rotate: 4 },
          {
            ...tween,
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 85%",
            },
          }
        );
      } else {
        gsap.fromTo(targets, { y: "110%", rotate: 4 }, tween);
      }

      return () => ScrollTrigger.getAll().forEach((st) => st.trigger === rootRef.current && st.kill());
    },
    { dependencies: [text, reducedMotion], scope: rootRef }
  );

  return (
    // @ts-expect-error - dynamic tag ref typing
    <Tag ref={rootRef} className={`${styles.root} ${className}`}>
      {words.map((word, i) => (
        <span className={styles.mask} key={`${word}-${i}`}>
          <span className={styles.word}>
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
