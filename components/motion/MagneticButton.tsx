"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import styles from "./MagneticButton.module.scss";

type Props = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  strength?: number;
  arrow?: boolean;
};

export function MagneticButton({
  href,
  onClick,
  children,
  className = "",
  strength = 0.35,
  arrow = false,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  type QuickTo = (value: number) => void;
  const quickRefs = useRef<{
    x: QuickTo;
    y: QuickTo;
    ax: QuickTo;
    ay: QuickTo;
  } | null>(null);

  const ensureQuickTo = () => {
    if (quickRefs.current || !contentRef.current) return quickRefs.current;
    quickRefs.current = {
      x: gsap.quickTo(contentRef.current, "x", { duration: 0.5, ease: "power3.out" }),
      y: gsap.quickTo(contentRef.current, "y", { duration: 0.5, ease: "power3.out" }),
      ax: gsap.quickTo(arrowRef.current || contentRef.current, "x", {
        duration: 0.4,
        ease: "power3.out",
      }),
      ay: gsap.quickTo(arrowRef.current || contentRef.current, "y", {
        duration: 0.4,
        ease: "power3.out",
      }),
    };
    return quickRefs.current;
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    const q = ensureQuickTo();
    if (!q) return;
    q.x(relX * strength);
    q.y(relY * strength);
    q.ax(relX * (strength + 0.25));
    q.ay(relY * (strength + 0.25));
  };

  const onMouseLeave = () => {
    const q = ensureQuickTo();
    if (!q) return;
    q.x(0);
    q.y(0);
    q.ax(0);
    q.ay(0);
  };

  const inner = (
    <span className={styles.content} ref={contentRef}>
      <span>{children}</span>
      {arrow && (
        <span className={styles.arrow} ref={arrowRef} aria-hidden="true">
          ↗
        </span>
      )}
    </span>
  );

  const rootProps = {
    ref: rootRef,
    className: `${styles.magnetic} ${className}`,
    onMouseMove,
    onMouseLeave,
  };

  if (href) {
    return (
      <div {...rootProps}>
        <Link href={href} className={styles.hitArea} onClick={onClick}>
          {inner}
        </Link>
      </div>
    );
  }

  return (
    <div {...rootProps}>
      <button type="button" className={styles.hitArea} onClick={onClick}>
        {inner}
      </button>
    </div>
  );
}
