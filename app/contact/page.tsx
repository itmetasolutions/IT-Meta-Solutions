import type { Metadata } from "next";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { PHONE_NUMBERS, EMAIL, OFFICE_ADDRESS, OFFICE_HOURS } from "@/lib/contact";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us what you're building — we'll reply with a clear plan and timeline.",
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Contact</span>
        <SplitTextReveal as="h1" text="Tell us what you're building." className={styles.heading} />
        <p className={styles.sub}>
          We&rsquo;ll reply with a clear plan and timeline — no fluff, no sales calls you didn&rsquo;t ask for.
        </p>
      </header>

      <div className={styles.grid}>
        <ContactForm />

        <aside className={styles.details}>
          <div>
            <span className={styles.detailLabel}>Email</span>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
          <div>
            <span className={styles.detailLabel}>Phone</span>
            {PHONE_NUMBERS.map((p) => (
              <a key={p.tel} href={`tel:${p.tel}`}>
                {p.display} <span>({p.region})</span>
              </a>
            ))}
          </div>
          <div>
            <span className={styles.detailLabel}>Office</span>
            <p>{OFFICE_ADDRESS}</p>
          </div>
          <div>
            <span className={styles.detailLabel}>Hours</span>
            <p>{OFFICE_HOURS}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
