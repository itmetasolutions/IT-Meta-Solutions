"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./Counter.module.scss";

export function Counter({
  value,
  suffix = "",
  className = "",
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!ref.current) return;
      if (reducedMotion) {
        ref.current.textContent = String(value);
        return;
      }
      const counter = { n: 0 };
      gsap.to(counter, {
        n: value,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        onUpdate: () => {
          if (ref.current) ref.current.textContent = String(Math.round(counter.n));
        },
      });
    },
    { dependencies: [value, reducedMotion], scope: ref }
  );

  return (
    <span className={`${styles.counter} ${className}`}>
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}
