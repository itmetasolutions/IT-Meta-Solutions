import type { Metadata } from "next";
import { ProjectList } from "@/components/work/ProjectList";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects across e-commerce, property platforms, travel brands and digital marketing — built by IT Meta Solutions.",
};

export default function WorkPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Work</span>
        <SplitTextReveal
          as="h1"
          text="Six projects. Six different problems worth solving."
          className={styles.heading}
        />
      </header>

      <ProjectList />
    </div>
  );
}
