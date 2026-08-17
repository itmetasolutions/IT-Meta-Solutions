"use client";

import { useState } from "react";
import Link from "next/link";
import { services } from "@/content/services";
import { getProject } from "@/content/projects";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import styles from "./ServiceShowcase.module.scss";

export function ServiceShowcase() {
  const [activeSlug, setActiveSlug] = useState(services[0]!.slug);
  const active = services.find((s) => s.slug === activeSlug) ?? services[0]!;
  const previewProject = active.relatedProjects[0] ? getProject(active.relatedProjects[0]) : undefined;

  return (
    <section className={styles.section}>
      <div className={styles.intro}>
        <span className={styles.eyebrow}>What we do</span>
        <SplitTextReveal
          as="h2"
          text="Nine services, one connected process."
          trigger="scroll"
          className={styles.heading}
        />
      </div>

      <div className={styles.grid}>
        <ul className={styles.list}>
          {services.map((service) => {
            const isActive = service.slug === activeSlug;
            return (
              <li key={service.slug} className={isActive ? styles.itemActive : ""}>
                <button
                  type="button"
                  className={styles.itemButton}
                  onClick={() => setActiveSlug(service.slug)}
                  onMouseEnter={() => setActiveSlug(service.slug)}
                  aria-expanded={isActive}
                >
                  <span className={styles.itemIndex}>{service.index}</span>
                  <span className={styles.itemTitle}>{service.title}</span>
                  <span className={styles.itemShort}>{service.short}</span>
                </button>

                <div className={styles.mobilePreview}>
                  <p>{service.short}</p>
                  <ul>
                    {service.capabilities.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                  <Link href={`/services/${service.slug}`}>Learn more ↗</Link>
                </div>
              </li>
            );
          })}
        </ul>

        <div className={styles.desktopPreview}>
          <div className={styles.previewVisual}>
            {previewProject ? (
              <ProjectVisual project={previewProject} reveal={false} sizes="30vw" />
            ) : (
              <div className={styles.previewFallback}>
                <span>{active.title}</span>
              </div>
            )}
          </div>
          <div className={styles.previewBody}>
            <ul className={styles.capabilities}>
              {active.capabilities.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <Link href={`/services/${active.slug}`} className={styles.previewLink}>
              Learn more about {active.title} ↗
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
