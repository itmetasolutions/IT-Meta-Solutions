import type { Metadata } from "next";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { processStages } from "@/content/process";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "About",
  description: "A Lahore-based team working directly with founders and operators on web, e-commerce, CRM and growth work.",
};

const markets = [
  { region: "Pakistan", note: "Local pricing, COD, local trust signals" },
  { region: "United Kingdom", note: "Premium minimal design, compliance-aware" },
  { region: "United States / Canada", note: "Fast funnels, direct calls to action" },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>About</span>
        <SplitTextReveal
          as="h1"
          text="Small enough to care. Experienced enough to deliver."
          className={styles.heading}
        />
        <p className={styles.sub}>
          We&rsquo;re a Lahore-based team that works directly with founders and
          operators — no account managers, no layers between you and the
          people actually building. Every project gets the same scrutiny
          we&rsquo;d want on our own product.
        </p>
      </header>

      <section className={styles.section}>
        <span className={styles.sectionLabel}>How we work</span>
        <ol className={styles.processList}>
          {processStages.map((stage) => (
            <li key={stage.index}>
              <span className={styles.processIndex}>{stage.index}</span>
              <div>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section}>
        <span className={styles.sectionLabel}>Markets we work in</span>
        <div className={styles.marketsGrid}>
          {markets.map((m) => (
            <div key={m.region}>
              <h3>{m.region}</h3>
              <p>{m.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <span className={styles.sectionLabel}>The team</span>
        <p className={styles.teamNote}>
          A small, focused team based in Lahore, working across design,
          development, Salesforce and growth marketing — deliberately kept
          small enough that the people who scope a project are the people
          who build it.
        </p>
      </section>

      <div className={styles.cta}>
        <MagneticButton href="/contact" arrow>
          Start a project
        </MagneticButton>
      </div>
    </div>
  );
}
