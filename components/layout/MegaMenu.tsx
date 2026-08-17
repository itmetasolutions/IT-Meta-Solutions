"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { services } from "@/content/services";
import { getProject } from "@/content/projects";
import styles from "./MegaMenu.module.scss";

export function MegaMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [activeSlug, setActiveSlug] = useState(services[0]!.slug);
  const rootRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLLIElement[]>([]);

  const active = services.find((s) => s.slug === activeSlug) ?? services[0]!;
  const previewProject = active.relatedProjects[0]
    ? getProject(active.relatedProjects[0])
    : undefined;

  useGSAP(
    () => {
      if (!rootRef.current) return;
      if (open) {
        gsap.set(rootRef.current, { display: "block" });
        gsap.fromTo(
          rootRef.current,
          { autoAlpha: 0, y: -12 },
          { autoAlpha: 1, y: 0, duration: 0.35, ease: "power3.out" }
        );
        gsap.fromTo(
          itemRefs.current,
          { autoAlpha: 0, y: 10 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.35,
            ease: "power3.out",
            stagger: 0.035,
            delay: 0.05,
          }
        );
      } else {
        gsap.to(rootRef.current, {
          autoAlpha: 0,
          y: -12,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => gsap.set(rootRef.current, { display: "none" }),
        });
      }
    },
    { dependencies: [open] }
  );

  return (
    <div
      ref={rootRef}
      className={styles.menu}
      style={{ display: "none" }}
      onMouseLeave={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div className={styles.inner}>
        <div className={styles.intro}>
          <span className={styles.eyebrow}>What we do</span>
          <p className={styles.introText}>
            Strategy, design, development and growth — brought together to
            build digital products that perform.
          </p>
          <Link href="/services" className={styles.viewAll} onClick={onClose}>
            View all services ↗
          </Link>
        </div>

        <ul className={styles.list}>
          {services.map((service, i) => (
            <li
              key={service.slug}
              ref={(el) => {
                if (el) itemRefs.current[i] = el;
              }}
            >
              <Link
                href={`/services/${service.slug}`}
                className={`${styles.item} ${
                  activeSlug === service.slug ? styles.itemActive : ""
                }`}
                onMouseEnter={() => setActiveSlug(service.slug)}
                onFocus={() => setActiveSlug(service.slug)}
                onClick={onClose}
              >
                <span className={styles.itemIndex}>{service.index}</span>
                <span className={styles.itemTitle}>{service.title}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.preview}>
          {previewProject ? (
            <Link
              href={`/work/${previewProject.slug}`}
              className={styles.previewCard}
              onClick={onClose}
              style={{ background: previewProject.themeColorSoft }}
            >
              {previewProject.images[0] ? (
                <>
                  <Image
                    src={previewProject.images[0].src}
                    alt={previewProject.images[0].alt}
                    fill
                    className={styles.previewImage}
                    sizes="320px"
                  />
                  <span className={styles.previewLabelOnImage}>
                    <strong>{previewProject.title}</strong>
                    <span>{previewProject.category.slice(0, 2).join(" / ")}</span>
                  </span>
                </>
              ) : (
                <span className={styles.previewLabelFlat} style={{ color: previewProject.themeColor }}>
                  <strong>{previewProject.title}</strong>
                  <span>{previewProject.category.slice(0, 2).join(" / ")}</span>
                </span>
              )}
            </Link>
          ) : (
            <div className={styles.previewCard} style={{ background: "var(--bg-white)" }}>
              <span className={styles.previewLabel}>
                <strong>{active.title}</strong>
                <span>{active.short}</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
