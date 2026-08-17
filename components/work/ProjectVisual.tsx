import Image from "next/image";
import type { Project } from "@/content/types";
import { RevealPanel } from "@/components/motion/RevealPanel";
import styles from "./ProjectVisual.module.scss";

export function ProjectVisual({
  project,
  reveal = true,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  project: Project;
  reveal?: boolean;
  sizes?: string;
}) {
  const image = project.images[0];

  const inner = image ? (
    <div className={styles.imageWrap} style={{ background: project.themeColorSoft }}>
      <Image src={image.src} alt={image.alt} fill sizes={sizes} className={styles.image} />
    </div>
  ) : (
    <div className={styles.flatPanel} style={{ background: project.themeColorSoft }}>
      {project.logo ? (
        <Image src={project.logo} alt={project.client} width={220} height={64} className={styles.logo} />
      ) : (
        <span className={styles.wordmark} style={{ color: project.themeColor }}>
          {project.title}
        </span>
      )}
    </div>
  );

  if (!reveal) return <div className={styles.static}>{inner}</div>;

  return (
    <RevealPanel wipeColor={project.themeColor} className={styles.panel}>
      {inner}
    </RevealPanel>
  );
}
