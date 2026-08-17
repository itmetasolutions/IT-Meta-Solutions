import Link from "next/link";
import { projects } from "@/content/projects";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import styles from "./FeaturedWork.module.scss";

export function FeaturedWork() {
  return (
    <section className={styles.section}>
      <div className={styles.intro}>
        <span className={styles.eyebrow}>Featured Work</span>
        <SplitTextReveal
          as="h2"
          text="Real projects, built for real businesses."
          trigger="scroll"
          className={styles.heading}
        />
      </div>

      <div className={styles.list}>
        {projects.map((project, i) => (
          <article
            key={project.slug}
            className={`${styles.row} ${i % 2 === 1 ? styles.rowReverse : ""}`}
          >
            <div className={styles.visual}>
              <ProjectVisual project={project} />
            </div>

            <div className={styles.info}>
              <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={styles.title}>{project.title}</h3>
              <div className={styles.tags}>
                {project.category.map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </div>
              <p className={styles.summary}>{project.summary}</p>

              {project.results.length > 0 && (
                <div className={styles.results}>
                  {project.results.slice(0, 2).map((r) => (
                    <div key={r.label}>
                      <span className={styles.resultValue}>{r.value}</span>
                      <span className={styles.resultLabel}>{r.label}</span>
                    </div>
                  ))}
                </div>
              )}

              <MagneticButton href={`/work/${project.slug}`} className={styles.link} arrow>
                View project
              </MagneticButton>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.footer}>
        <Link href="/work" className={styles.viewAll}>
          View all work ↗
        </Link>
      </div>
    </section>
  );
}
