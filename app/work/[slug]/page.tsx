import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/content/projects";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import { NextProject } from "@/components/work/NextProject";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import styles from "./page.module.scss";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article>
      <header className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.eyebrow}>{project.category.join(" / ")}</span>
          <SplitTextReveal as="h1" text={project.title} className={styles.title} />
          <dl className={styles.meta}>
            <div>
              <dt>Client</dt>
              <dd>{project.client}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
            {project.liveUrl && (
              <div>
                <dt>Site</dt>
                <dd>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    Visit live ↗
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>
        <div className={styles.heroVisual}>
          <ProjectVisual project={project} />
        </div>
      </header>

      <section className={styles.section}>
        <span className={styles.sectionLabel}>Overview</span>
        <p className={styles.sectionBody}>{project.summary}</p>
      </section>

      {project.challenge && (
        <section className={styles.section}>
          <span className={styles.sectionLabel}>Challenge</span>
          <p className={styles.sectionBody}>{project.challenge}</p>
        </section>
      )}

      {project.solution && (
        <section className={styles.section}>
          <span className={styles.sectionLabel}>Solution</span>
          <p className={styles.sectionBody}>{project.solution}</p>
        </section>
      )}

      {project.results.length > 0 && (
        <section className={styles.resultsSection}>
          <span className={styles.sectionLabel}>Results</span>
          <div className={styles.resultsGrid}>
            {project.results.map((r) => (
              <div key={r.label} className={styles.resultItem}>
                <span className={styles.resultValue}>{r.value}</span>
                <span className={styles.resultLabel}>{r.label}</span>
                {!r.verified && <span className={styles.resultFlag}>Directional outcome</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {project.testimonial && (
        <section className={styles.section}>
          <span className={styles.sectionLabel}>Client review</span>
          <blockquote className={styles.quote}>&ldquo;{project.testimonial.quote}&rdquo;</blockquote>
          <p className={styles.quoteAttribution}>
            {project.testimonial.name}, {project.testimonial.role}, {project.testimonial.company}
          </p>
        </section>
      )}

      {project.stack.length > 0 && (
        <section className={styles.section}>
          <span className={styles.sectionLabel}>Technology</span>
          <ul className={styles.stackList}>
            {project.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
      )}

      <div className={styles.cta}>
        <MagneticButton href="/contact" arrow>
          Start a similar project
        </MagneticButton>
      </div>

      <NextProject currentSlug={project.slug} />
    </article>
  );
}
