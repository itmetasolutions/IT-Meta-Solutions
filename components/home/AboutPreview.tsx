import Link from "next/link";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import styles from "./AboutPreview.module.scss";

export function AboutPreview() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        <SplitTextReveal
          as="h2"
          text="Small enough to care. Experienced enough to deliver."
          trigger="scroll"
          className={styles.heading}
        />

        <div className={styles.body}>
          <p>
            We&rsquo;re a Lahore-based team that works directly with founders and
            operators — no account managers, no layers between you and the
            people actually building. Every project gets the same scrutiny
            we&rsquo;d want on our own product.
          </p>
          <Link href="/about" className={styles.link}>
            More about how we work ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
