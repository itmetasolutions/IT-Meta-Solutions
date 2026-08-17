import Link from "next/link";
import { projects } from "@/content/projects";
import styles from "./NextProject.module.scss";

export function NextProject({ currentSlug }: { currentSlug: string }) {
  const index = projects.findIndex((p) => p.slug === currentSlug);
  const next = projects[(index + 1) % projects.length]!;

  return (
    <Link href={`/work/${next.slug}`} className={styles.section} style={{ background: next.themeColorSoft }}>
      <span className={styles.eyebrow}>Next project</span>
      <h2 className={styles.title}>{next.title} ↗</h2>
      <span className={styles.category}>{next.category.slice(0, 2).join(" / ")}</span>
    </Link>
  );
}
