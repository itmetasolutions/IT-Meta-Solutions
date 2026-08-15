import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SeoContentFaq from "../../components/SeoContentFaq";
import { motion, useScroll, useInView } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Boxes,
  Calculator,
  ChevronRight,
  FileSearch,
  Gauge,
  Globe,
  Layout,
  Package,
  Percent,
  Receipt,
  Ruler,
  ShieldCheck,
  Sparkles,
  Truck,
  CheckCircle2,
  MousePointerClick,
  ExternalLink,
} from "lucide-react";
import Container from "../../components/Container";

/* ==================== HELPERS ==================== */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!m) return;
    const onChange = () => setReduced(!!m.matches);
    onChange();
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-50 h-0.5 w-full origin-left bg-gradient-to-r from-[#1D4ED8] via-[#23A6E8] to-[#3AC9F5]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

function Reveal({ children, delay = 0, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AnchorLink({ href, children, className }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        if (href?.startsWith?.("#")) {
          e.preventDefault();
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }}
      className={className}
    >
      {children}
    </a>
  );
}

/* ==================== LIGHT CARD ==================== */

function LightCard({ icon: Icon, color = "#1D4ED8", title, desc, bullets, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div className="premium-card h-full rounded-2xl p-6">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: `${color}15` }}>
          <Icon className="h-5 w-5" style={{ color }} />
        </div>
        <h3 className="mb-2 text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
        {bullets?.length ? (
          <ul className="mt-4 space-y-2">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color }} />
                {b}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Reveal>
  );
}

/* ==================== SIDE ROW ITEM ==================== */

function SideItem({ icon: Icon, color = "#1D4ED8", title, desc }) {
  return (
    <div className="premium-card flex items-start gap-4 rounded-2xl p-5">
      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl" style={{ backgroundColor: `${color}15` }}>
        <Icon className="h-5 w-5" style={{ color }} />
      </div>
      <div>
        <div className="text-sm font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>{title}</div>
        <div className="mt-1 text-sm text-slate-600 leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}

/* ==================== NAV & SEO DATA ==================== */

const nav = [
  { label: "Overview", href: "#overview" },
  { label: "Challenge", href: "#challenge" },
  { label: "Solution", href: "#solution" },
  { label: "Features", href: "#features" },
  { label: "UX", href: "#ux" },
  { label: "SEO & Speed", href: "#seo" },
  { label: "Results", href: "#results" },
];

const seoContent = {
  kicker: "Case Study",
  title: "Custom Calculators for Ecommerce Conversion",
  subtitle: "InHomes Direct uses custom product calculators and real-time pricing to improve ordering confidence.",
  paragraphs: [
    "We built a performance-optimized store with logic-driven calculators and clear UX for complex product ordering.",
    "The system improved conversion clarity while reducing reliance on paid apps.",
  ],
  bullets: [
    "Custom product calculators for ecommerce",
    "Real-time pricing engine development",
    "High-converting ecommerce website design",
    "Performance-optimized Shopify store builds",
  ],
};

const seoFaqs = [
  { q: "What makes this ecommerce build unique?", a: "Custom calculators and logic-driven ordering for flooring and interiors." },
  { q: "Did this reduce app dependencies?", a: "Yes. The custom build reduced reliance on paid Shopify apps." },
  { q: "Can you build similar calculators?", a: "Yes. We build custom pricing and conversion tools for ecommerce stores." },
];

/* ==================== PAGE ==================== */

export default function InHomesDirectCaseStudy() {
  const reduced = usePrefersReducedMotion();
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <>
      <Helmet>
        <title>InHomes Direct Case Study - E-commerce with Custom Calculators | IT Meta Solutions</title>
        <meta name="description" content="InHomes Direct case study: ecommerce store with custom calculators, real-time pricing, and conversion UX." />
        <meta property="og:title" content="InHomes Direct Case Study - E-commerce with Custom Calculators | IT Meta Solutions" />
        <meta property="og:description" content="Logic-driven storefront for flooring and interiors with custom calculators and SEO." />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://itmetasolutions.com/case-study/inhomes-direct" />
        <meta property="og:url" content="https://itmetasolutions.com/case-study/inhomes-direct" />
        <meta property="og:image" content="https://itmetasolutions.com/favicon.webp" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {!reduced && <ScrollProgress />}

      {/* ==================== HERO (dark) ==================== */}
      <section className="relative bg-[#141A2E] overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="absolute inset-0 dot-grid-bg opacity-25 pointer-events-none" />
        <div className="absolute -top-32 right-0 w-[600px] h-[500px] rounded-full bg-[#1D4ED8]/10 blur-[120px] pointer-events-none" />

        <Container>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={reduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                { icon: Receipt, label: "E-commerce" },
                { icon: Calculator, label: "Custom calculators" },
                { icon: FileSearch, label: "On-page SEO" },
                { icon: ShieldCheck, label: "No paid apps" },
              ].map((b) => (
                <span key={b.label} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-slate-300">
                  <b.icon className="h-3.5 w-3.5 text-[#3AC9F5]" />
                  {b.label}
                </span>
              ))}
            </div>

            <h1
              className="max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              InHomes Direct — a logic-driven storefront for{" "}
              <span className="animated-gradient-text">flooring, worktops &amp; home interiors</span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg text-slate-400 leading-relaxed">
              We built a modern UK e-commerce experience that handles complex product rules — area-to-pack conversion,
              real-time pricing, survey-based worktop estimates, and multiple unit types — all in one site, without any paid calculator apps.
            </p>

            {/* Snapshot stats */}
            <div className="mt-10 grid gap-4 sm:grid-cols-3 max-w-2xl">
              {[
                { icon: Calculator, label: "Real-time pricing", value: "Area → Total", color: "#1D4ED8" },
                { icon: Package, label: "Pack requirement", value: "Auto-round up", color: "#23A6E8" },
                { icon: Truck, label: "Policies", value: "By product type", color: "#3AC9F5" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: `${s.color}30` }}>
                      <s.icon className="h-4 w-4" style={{ color: s.color }} />
                    </div>
                    <div>
                      <div className="text-base font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</div>
                      <div className="text-xs text-slate-400">{s.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Live link */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://inhomesdirect.co.uk/"
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Visit InHomes Direct <ExternalLink className="h-4 w-4" />
              </a>
              <Link to="/contact" className="btn-ghost-dark">
                Request a similar build <MousePointerClick className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ==================== STICKY SUBNAV (white) ==================== */}
      <div className="sticky top-[64px] z-40 border-b border-slate-100 bg-white/95 backdrop-blur-sm shadow-sm">
        <Container className="py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500">
              <Layout className="h-3.5 w-3.5 text-[#1D4ED8]" />
              InHomes Direct — Case Study
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {nav.map((n) => (
                <AnchorLink
                  key={n.href}
                  href={n.href}
                  className="rounded-full border border-slate-200 bg-[#F1F4F9] px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-[#1D4ED8]/40 hover:text-[#1D4ED8]"
                >
                  {n.label}
                </AnchorLink>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* ==================== OVERVIEW (white) ==================== */}
      <section id="overview" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Overview</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              A premium interiors store with real-world ordering logic
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">
              InHomes Direct sells flooring, worktops and interior products — where customers think in area (m²), packs, pieces, and sometimes need a survey for accurate estimating. The goal was to unify these product types into one seamless storefront.
            </p>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-3">
            <LightCard color="#1D4ED8" icon={Globe} title="Industry" desc="Home interiors (UK)" bullets={["Flooring & accessories", "Worktops", "Tiles", "Beds", "Doors & Windows", "Lighting"]} />
            <LightCard color="#23A6E8" icon={Receipt} title="Scope" desc="Custom storefront + product logic" bullets={["Calculators", "Product templates", "Policies by type", "Custom forms"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={ShieldCheck} title="Constraint" desc="No paid apps" bullets={["Lightweight custom code", "Fast UX", "Scalable rules"]} delay={0.1} />
          </div>
        </Container>
      </section>

      {/* ==================== CHALLENGE (mist) ==================== */}
      <section id="challenge" className="scroll-mt-28 bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Challenge</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Standard e-commerce doesn't handle flooring &amp; worktops
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">
              Unlike normal retail, these products require measurement-based buying and category-specific policies. Off-the-shelf apps were expensive, rigid, and slowed performance.
            </p>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2">
            <LightCard color="#1D4ED8" icon={Package} title="Packs vs area" desc="Flooring is sold in packs, but customers order by square meters. This needs accurate conversion and rounding." bullets={["Area → packs", "Round-up logic", "Avoid under-ordering"]} />
            <LightCard color="#23A6E8" icon={Percent} title="Worktops need survey" desc="Worktops cannot be priced instantly. Customers need an estimate range and a survey request flow." bullets={["Show % / starting indication", "Survey request", "Measure submission"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={Boxes} title="Mixed unit products" desc="One store must support per-piece items, per-area items, and estimated items with different UI patterns." bullets={["Per piece", "Per area", "Estimated / quote-based"]} delay={0.1} />
            <LightCard color="#1D4ED8" icon={Truck} title="Policies by product type" desc="Shipping and returns differ by category; the store must display the correct policy per product." bullets={["Different shipping rules", "Different returns rules", "Clear messaging"]} delay={0.15} />
          </div>
        </Container>
      </section>

      {/* ==================== SOLUTION (white) ==================== */}
      <section id="solution" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <span className="kicker">Solution</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
                A custom logic engine built into the storefront
              </h2>
              <p className="mt-4 text-lg text-slate-500">
                We implemented lightweight, custom-coded calculators and conditional product templates. This delivered a fast UX and avoided paid calculator apps.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Real-time calculators", "Conditional product layouts", "Category-based policies", "No paid apps"].map((tag) => (
                  <span key={tag} className="rounded-full border border-[#1D4ED8]/20 bg-[#1D4ED8]/5 px-3 py-1 text-xs font-semibold text-[#1D4ED8]">{tag}</span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://inhomesdirect.co.uk/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1D4ED8] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1D4ED8]/25 transition-all hover:bg-[#162f8f] hover:scale-105"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  View store <ExternalLink className="h-4 w-4" />
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-[#1D4ED8]/40 hover:text-[#1D4ED8]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Request a build <MousePointerClick className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="premium-card rounded-2xl p-6 shadow-lg">
                <div className="text-sm font-bold text-slate-900 mb-5" style={{ fontFamily: "var(--font-heading)" }}>
                  Implementation summary
                </div>
                <ul className="space-y-3">
                  {[
                    "Flooring: area (m²) input → packs required → rounded up → real-time total price",
                    "Worktops: show only a percentage / starting indication; require survey for final estimate",
                    "Multiple unit types: per piece, per area, and estimated products in one unified storefront",
                    "Custom forms for survey requests + measurement data collection",
                    "Shipping & returns displayed dynamically by product category",
                  ].map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <BadgeCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1D4ED8]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ==================== FEATURES (mist) ==================== */}
      <section id="features" className="scroll-mt-28 bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Key features</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Custom calculators, templates, and category workflows
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">
              These were the core build components that made the store feel premium and practical for customers ordering by measurements.
            </p>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-3 mb-5">
            <LightCard color="#1D4ED8" icon={Calculator} title="Flooring calculator" desc="Customers enter area (m²) and instantly see required packs and the live total price." bullets={["Area → packs", "Round-up logic", "Live total"]} />
            <LightCard color="#23A6E8" icon={Package} title="Pack requirement logic" desc="Coverage-aware calculation to avoid under-ordering and reduce returns/complaints." bullets={["Coverage per pack", "Auto rounding", "Clarity messaging"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={Percent} title="Worktops estimate flow" desc="Worktops show only a percentage / starting indication and require a survey to provide final estimate." bullets={["Survey request", "Measurement form", "Quote workflow"]} delay={0.1} />
          </div>

          <div className="grid gap-5 md:grid-cols-2 mb-8">
            <LightCard color="#1D4ED8" icon={Boxes} title="One site, multiple unit types" desc="Per-piece, per-area, and estimated products were supported without splitting into separate sites." bullets={["Per piece products", "Per area products", "Estimated products"]} />
            <LightCard color="#23A6E8" icon={Truck} title="Shipping & returns by category" desc="Policies displayed per product type — reducing confusion and support tickets." bullets={["Custom policy blocks", "Category-specific logic", "Trust signals"]} delay={0.05} />
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-[#1D4ED8]/20 bg-[#1D4ED8]/5 p-6">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <div className="text-sm font-bold text-slate-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                    Custom forms &amp; layouts
                  </div>
                  <div className="text-sm text-slate-600 max-w-xl">
                    We built product-specific forms (survey requests, measurement submission) and conditional page layouts so customers always see the correct next step.
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#1D4ED8]/30 px-4 py-2 text-sm font-semibold text-[#1D4ED8] flex-shrink-0">
                  <ChevronRight className="h-4 w-4" />
                  No third-party apps
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ==================== UX (white) ==================== */}
      <section id="ux" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <span className="kicker">UI / UX</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
                Designed for clarity and confident purchasing
              </h2>
              <p className="mt-4 text-lg text-slate-500">
                We structured product pages so users immediately understand: how pricing works, what unit applies, and what action to take (buy now, calculate, or request survey).
              </p>
            </Reveal>

            <Reveal delay={0.1} className="space-y-4">
              <SideItem color="#1D4ED8" icon={Layout} title="Conditional product layouts" desc="Flooring pages show calculator + pack info; worktops show estimate + survey CTA; accessories show simple add-to-cart." />
              <SideItem color="#23A6E8" icon={ShieldCheck} title="Trust + transparency" desc="Clear breakdowns for packs/coverage, estimate rules, and category-specific shipping/returns." />
              <SideItem color="#3AC9F5" icon={Ruler} title="Mobile-first calculator UX" desc="Inputs, results, and CTAs remain readable and usable on mobile devices." />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ==================== SEO & SPEED (mist) ==================== */}
      <section id="seo" className="scroll-mt-28 bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <span className="kicker">SEO &amp; Performance</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
                Structured pages, fast UX, clean content
              </h2>
              <p className="mt-4 text-lg text-slate-500">
                We applied on-page SEO best practices and kept performance strong by avoiding heavy paid apps. This ensured both search visibility and a smooth shopping experience.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="space-y-4">
              <SideItem color="#1D4ED8" icon={FileSearch} title="On-page SEO structure" desc="Clean headings, metadata, internal linking, and category content alignment." />
              <SideItem color="#23A6E8" icon={Gauge} title="Performance optimizations" desc="Lightweight custom scripts, efficient rendering, and reduced third-party load." />
              <SideItem color="#3AC9F5" icon={BarChart3} title="Analytics-ready" desc="Tracking foundation for measuring product interest, form submissions, and conversion flow." />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ==================== RESULTS (dark) ==================== */}
      <section id="results" className="scroll-mt-28 bg-[#141A2E] py-20 sm:py-28">
        <Container>
          <Reveal className="text-center mb-12">
            <span className="kicker" style={{ borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.07)", color: "#93c5fd" }}>
              Impact
            </span>
            <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              A scalable, cost-effective system — built for real products
            </h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              By building custom logic into the storefront, InHomes Direct gained accurate ordering flows, clearer user decisions, and long-term savings by avoiding paid apps.
            </p>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3 mb-10">
            {[
              { icon: ShieldCheck, label: "App dependency", value: "Zero", color: "#1D4ED8" },
              { icon: Calculator, label: "Ordering confidence", value: "Higher", color: "#23A6E8" },
              { icon: Truck, label: "Policy clarity", value: "Improved", color: "#3AC9F5" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: `${s.color}30` }}>
                      <s.icon className="h-5 w-5" style={{ color: s.color }} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</div>
                      <div className="text-sm text-slate-400">{s.label}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-[#1D4ED8]/30 bg-[#1D4ED8]/10 p-7">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div className="max-w-2xl">
                  <div className="text-base font-bold text-white mb-1" style={{ fontFamily: "var(--font-heading)" }}>Want a similar build?</div>
                  <div className="text-sm text-slate-400">
                    We can implement custom calculators, forms, and category logic for any e-commerce store — while keeping the UI modern and the performance fast.
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1D4ED8] shadow-lg transition-all hover:scale-105"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Request a proposal <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 text-center text-xs text-slate-600">© {year} • InHomes Direct case study</div>
        </Container>
      </section>

      {/* ==================== SEO / FAQ (white) ==================== */}
      <div className="bg-white">
        <SeoContentFaq content={seoContent} faqs={seoFaqs} lightTheme={true} />
      </div>
    </>
  );
}
