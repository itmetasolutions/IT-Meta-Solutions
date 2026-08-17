"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { primaryNav, socialLinks } from "./nav";
import { PRIMARY_PHONE, EMAIL } from "@/lib/contact";
import styles from "./MobileNav.module.scss";

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<HTMLLIElement[]>([]);

  useGSAP(
    () => {
      if (!rootRef.current) return;
      if (open) {
        gsap.set(rootRef.current, { display: "flex" });
        gsap.fromTo(
          rootRef.current,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.5, ease: "power4.inOut" }
        );
        gsap.fromTo(
          linkRefs.current,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.06,
            delay: 0.15,
          }
        );
      } else {
        gsap.to(rootRef.current, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.4,
          ease: "power3.inOut",
          onComplete: () => gsap.set(rootRef.current, { display: "none" }),
        });
      }
    },
    { dependencies: [open] }
  );

  return (
    <div ref={rootRef} className={styles.drawer} style={{ display: "none" }}>
      <nav>
        <ul className={styles.list}>
          {primaryNav.map((item, i) => (
            <li
              key={item.href}
              ref={(el) => {
                if (el) linkRefs.current[i] = el;
              }}
            >
              <Link href={item.href} onClick={onClose}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.footer}>
        <Link href="/contact" className={styles.cta} onClick={onClose}>
          Start a Project ↗
        </Link>
        <a href={`tel:${PRIMARY_PHONE.tel}`} className={styles.detail}>
          {PRIMARY_PHONE.display}
        </a>
        <a href={`mailto:${EMAIL}`} className={styles.detail}>
          {EMAIL}
        </a>
        <div className={styles.social}>
          {socialLinks.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
