import { MagneticButton } from "@/components/motion/MagneticButton";
import styles from "./ContactCTA.module.scss";

export function ContactCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Got a project in mind?</p>
        <h2 className={styles.heading}>Tell us what you&rsquo;re building.</h2>
        <MagneticButton href="/contact" className={styles.cta} arrow>
          Start a project
        </MagneticButton>
      </div>
    </section>
  );
}
