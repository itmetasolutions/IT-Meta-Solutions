import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getService } from "@/content/services";
import { getProject } from "@/content/projects";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { processStages } from "@/content/process";
import styles from "./page.module.scss";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.overview,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const relatedProjects = service.relatedProjects
    .map((s) => getProject(s))
    .filter((p) => p !== undefined);

  return (
    <article>
      <header className={styles.hero}>
        <span className={styles.eyebrow}>
          {service.index} / Services
        </span>
        <SplitTextReveal as="h1" text={service.headline} className={styles.title} />
        <p className={styles.overview}>{service.overview}</p>
      </header>

      <section className={styles.section}>
        <span className={styles.sectionLabel}>Capabilities</span>
        <ul className={styles.capabilities}>
          {service.capabilities.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      {relatedProjects.length > 0 && (
        <section className={styles.section}>
          <span className={styles.sectionLabel}>Selected work</span>
          <div className={styles.projects}>
            {relatedProjects.map((project) => (
              <Link key={project!.slug} href={`/work/${project!.slug}`} className={styles.projectCard}>
                <div className={styles.projectVisual}>
                  <ProjectVisual project={project!} reveal={false} sizes="360px" />
                </div>
                <div className={styles.projectInfo}>
                  <h3>{project!.title}</h3>
                  <span>{project!.category.slice(0, 2).join(" / ")}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className={styles.section}>
        <span className={styles.sectionLabel}>How it runs</span>
        <ol className={styles.processList}>
          {processStages.map((stage) => (
            <li key={stage.index}>
              <span>{stage.index}</span>
              <h3>{stage.title}</h3>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section}>
        <span className={styles.sectionLabel}>FAQ</span>
        <dl className={styles.faqList}>
          {service.faqs.map((faq) => (
            <div key={faq.q}>
              <dt>{faq.q}</dt>
              <dd>{faq.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className={styles.cta}>
        <MagneticButton href="/contact" arrow>
          Start a {service.title.toLowerCase()} project
        </MagneticButton>
      </div>
    </article>
  );
}
