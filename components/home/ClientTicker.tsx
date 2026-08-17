import { projects } from "@/content/projects";
import styles from "./ClientTicker.module.scss";

export function ClientTicker() {
  const items = [...projects, ...projects]; // duplicated for a seamless loop

  return (
    <section className={styles.ticker} aria-label="Selected clients">
      <div className={styles.track}>
        {items.map((project, i) => (
          <span className={styles.item} key={`${project.slug}-${i}`}>
            {project.title}
          </span>
        ))}
      </div>
    </section>
  );
}
