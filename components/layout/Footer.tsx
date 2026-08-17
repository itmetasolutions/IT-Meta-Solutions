import Link from "next/link";
import Image from "next/image";
import { primaryNav, socialLinks } from "./nav";
import { services } from "@/content/services";
import { PHONE_NUMBERS, EMAIL, OFFICE_ADDRESS } from "@/lib/contact";
import { MagneticButton } from "@/components/motion/MagneticButton";
import styles from "./Footer.module.scss";

const trustStats = [
  { value: "50+", label: "Projects shipped" },
  { value: "40+", label: "Businesses worked with" },
  { value: "100%", label: "Commitment to the work" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <p className={styles.eyebrow}>Have something worth building?</p>
        <h2 className={styles.headline}>LET&rsquo;S TALK.</h2>
        <MagneticButton href="/contact" className={styles.cta} arrow>
          Start a Project
        </MagneticButton>
      </div>

      <div className={styles.grid}>
        <div className={styles.brandCol}>
          <Image
            src="/brand/itms-logo.webp"
            alt="IT Meta Solutions"
            width={220}
            height={55}
            className={styles.logo}
          />
          <div className={styles.stats}>
            {trustStats.map((s) => (
              <div key={s.label}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
          <div className={styles.social}>
            {socialLinks.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.col}>
          <h3>Navigate</h3>
          <nav>
            <ul>
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.col}>
          <h3>Services</h3>
          <nav>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.col}>
          <h3>Contact</h3>
          <ul className={styles.contactList}>
            <li>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </li>
            {PHONE_NUMBERS.map((p) => (
              <li key={p.tel}>
                <a href={`tel:${p.tel}`}>
                  {p.display} <span>({p.region})</span>
                </a>
              </li>
            ))}
            <li className={styles.address}>{OFFICE_ADDRESS}</li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {year} IT Meta Solutions (Pvt) Ltd. All rights reserved.</p>
        <div className={styles.legal}>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
        </div>
      </div>

      <div className={styles.wordmarkWrap} aria-hidden="true">
        <span className={styles.wordmark}>IT META SOLUTIONS</span>
      </div>
    </footer>
  );
}
