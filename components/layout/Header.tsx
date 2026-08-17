"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { primaryNav } from "./nav";
import styles from "./Header.module.scss";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
        onMouseLeave={scheduleClose}
      >
        <div className={styles.bar}>
          <Link href="/" className={styles.logo} onClick={() => setMegaOpen(false)}>
            <Image src="/brand/itms-logo.webp" alt="IT Meta Solutions" width={400} height={100} priority />
          </Link>

          <nav className={styles.nav}>
            <ul>
              {primaryNav.map((item) =>
                item.label === "Services" ? (
                  <li key={item.href} onMouseEnter={openMega} onFocus={openMega}>
                    <Link href={item.href} aria-haspopup="true" aria-expanded={megaOpen} className={styles.hasDropdown}>
                      {item.label}
                      <ChevronDown size={14} className={`${styles.chevron} ${megaOpen ? styles.chevronOpen : ""}`} />
                    </Link>
                  </li>
                ) : (
                  <li key={item.href} onMouseEnter={scheduleClose}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          <MegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} />

          <div className={styles.actions}>
            <MagneticButton href="/contact" className={styles.cta} arrow>
              Start a Project
            </MagneticButton>
            <button
              type="button"
              className={`${styles.burger} ${mobileOpen ? styles.burgerOpen : ""}`}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
