import React, { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
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
} from "lucide-react";

/**
 * InHomes Direct — Case Study (UPDATED to match your NEW Home theme)
 * - Primary: #5025d1 (ITMS purple)
 * - Dark glass + gradients + blobs
 * - Scroll progress bar
 * - Parallax hero
 * - Reveal animations
 * - Equal-height cards in grids (h-full + flex + items-stretch)
 * - Mobile safe (overflow-x-hidden + safe padding)
 *
 * Requirements covered:
 * - Custom calculators for flooring: area -> packs + real-time price
 * - Pack requirement calculator from area + real-time price
 * - Worktops show only percentage / require survey to estimate
 * - Per-piece, per-area, estimated products in one site
 * - No paid apps
 * - Different shipping & return per product type
 * - Custom forms, custom layouts
 */

const cx = (...c) => c.filter(Boolean).join(" ");

/* ==================== REDUCED MOTION ==================== */
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

/* ==================== NAV ==================== */
const nav = [
  { label: "Overview", href: "#overview" },
  { label: "Challenge", href: "#challenge" },
  { label: "Solution", href: "#solution" },
  { label: "Features", href: "#features" },
  { label: "UX", href: "#ux" },
  { label: "SEO & Speed", href: "#seo" },
  { label: "Results", href: "#results" },
];

/* ==================== UI ==================== */
function Container({ children, className }) {
  return <div className={cx("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
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

function GradientBlob({ className, color = "rgba(80,37,209,0.20)" }) {
  return (
    <div
      aria-hidden
      className={cx("pointer-events-none absolute -z-10 blur-3xl", className)}
      style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }}
    />
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 18, mass: 0.5 });
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-[#5025d1] via-purple-500 to-pink-500"
      style={{ scaleX: w }}
    />
  );
}

function Reveal({ children, delay = 0, className }) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { y: 16 }}
      whileInView={reduced ? {} : { y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function Badge({ children, icon: Icon }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
      {Icon ? <Icon className="h-4 w-4" /> : null}
      {children}
    </span>
  );
}

function Pill({ icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
      {Icon ? <Icon className="h-3.5 w-3.5 opacity-80" /> : null}
      {children}
    </span>
  );
}

function SectionTitle({ kicker, title, desc, align = "left", level = "h2" }) {
  const HeadingTag = level;
  return (
    <div className={cx("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <div className={cx("inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200", align === "center" && "mx-auto")}>
        <Sparkles className="h-3.5 w-3.5" />
        {kicker}
      </div>
      <HeadingTag className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </HeadingTag>
      <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">{desc}</p>
    </div>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-5 h-full flex flex-col justify-center backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-3">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="text-2xl font-semibold text-white">{value}</div>
          <div className="text-sm text-zinc-300">{label}</div>
        </div>
      </div>
    </div>
  );
}

function Card({ icon: Icon, title, desc, bullets, delay = 0 }) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { y: 16 }}
      whileInView={reduced ? {} : { y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      whileHover={reduced ? {} : { y: -8, transition: { duration: 0.2 } }}
      className="
        group relative overflow-hidden
        rounded-3xl border border-white/10
        bg-gradient-to-br from-white/[0.08] to-white/[0.02]
        p-6 pb-8
        h-full
        flex
        backdrop-blur-sm
      "
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-[#5025d1]/25 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-purple-500/20 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-3">
            <Icon className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>

        <p className="text-sm leading-relaxed text-zinc-300">{desc}</p>

        {bullets?.length ? (
          <ul className="mt-5 space-y-2 text-sm text-zinc-200">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                <span className="opacity-90">{b}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {/* keeps bottom breathing space */}
        <div className="mt-auto pt-4" />
      </div>
    </motion.div>
  );
}

function Divider() {
  return <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />;
}

function StickySubnav() {
  return (
    <div className="sticky top-[72px] z-40 border-b border-white/10 bg-black/50 backdrop-blur">
      <Container className="py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-300">
            <Layout className="h-4 w-4 text-[#5025d1]" />
            InHomes Direct — Case Study
          </div>

          <div className="flex flex-wrap items-center gap-2 justify-end">
            {nav.map((n) => (
              <AnchorLink
                key={n.href}
                href={n.href}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200 hover:bg-white/10"
              >
                {n.label}
              </AnchorLink>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

/* ==================== PAGE ==================== */
export default function InHomesDirectCaseStudy() {
  const reduced = usePrefersReducedMotion();
  const year = useMemo(() => new Date().getFullYear(), []);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, reduced ? 0 : -60]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.9]);
  const heroRef = useRef(null);

  return (
    <>
      <Helmet>
        <title>InHomes Direct Case Study - E-commerce with Custom Calculators | IT Meta Solutions</title>
        <meta
          name="description"
          content="Explore how IT Meta Solutions built InHomes Direct - a high-performance e-commerce store with custom flooring calculators, real-time pricing, and advanced SEO optimization."
        />
        <meta
          name="keywords"
          content="InHomes Direct, e-commerce case study, custom calculator development, Shopify development, flooring calculator, real-time pricing, SEO optimization, IT Meta Solutions"
        />
        <meta property="og:title" content="InHomes Direct Case Study - E-commerce with Custom Calculators | IT Meta Solutions" />
        <meta
          property="og:description"
          content="Logic-driven storefront for flooring and interiors with custom calculators and SEO."
        />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://itmetasolutions.com/case-study/inhomes-direct" />
        <meta property="og:url" content="https://itmetasolutions.com/case-study/inhomes-direct" />
        <meta property="og:image" content="https://itmetasolutions.com/favicon.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="InHomes Direct Case Study - E-commerce with Custom Calculators | IT Meta Solutions" />
        <meta
          name="twitter:description"
          content="Logic-driven storefront for flooring and interiors with custom calculators and SEO."
        />
        <meta name="twitter:image" content="https://itmetasolutions.com/favicon.webp" />
      </Helmet>

      <div className="relative min-h-screen text-zinc-100 mb-16 overflow-x-hidden">
        <ScrollProgress />

        {/* Background accents (Home style) */}
        <GradientBlob className="left-[-140px] top-[-140px] h-[650px] w-[650px]" color="rgba(80,37,209,0.20)" />
        <GradientBlob className="right-[-190px] top-[220px] h-[700px] w-[700px]" color="rgba(16,185,129,0.14)" />
        <GradientBlob className="bottom-[-180px] left-[18%] h-[780px] w-[780px]" color="rgba(236,72,153,0.10)" />

        {/* Hero */}
        <section ref={heroRef} className="relative overflow-hidden">
          <Container className="pb-16 pt-24 sm:pb-24 sm:pt-32">
            <motion.div style={{ y: heroY, opacity: heroOpacity }}>
              <Reveal>
                <Badge icon={Sparkles}>E-commerce + Custom Product Logic</Badge>
              </Reveal>

              <Reveal delay={0.06} className="mt-6">
                <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  InHomes Direct — a logic-driven storefront for{" "}
                  <span className="bg-gradient-to-r from-[#5025d1] via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    flooring, worktops & home interiors
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="mt-5 max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                  We built a modern UK e-commerce experience that handles complex product rules — area-to-pack conversion,
                  real-time pricing, survey-based worktop estimates, and multiple unit types — all in one site, without any
                  paid calculator apps.
                </p>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="mt-7 flex flex-wrap items-center gap-2">
                  <Pill icon={Receipt}>E-commerce</Pill>
                  <Pill icon={Calculator}>Custom calculators</Pill>
                  <Pill icon={FileSearch}>On-page SEO</Pill>
                  <Pill icon={Gauge}>Performance</Pill>
                  <Pill icon={ShieldCheck}>No paid apps</Pill>
                </div>
              </Reveal>

              <div className="mt-10 grid gap-4 sm:grid-cols-3 items-stretch">
                <Stat icon={Calculator} label="Real-time pricing" value="Area → Total" />
                <Stat icon={Package} label="Pack requirement" value="Auto-round up" />
                <Stat icon={Truck} label="Policies" value="By product type" />
              </div>

              <Reveal delay={0.18}>
                <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-7 backdrop-blur-sm">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-2xl">
                      <div className="text-sm font-semibold text-white">Live website</div>
                      <div className="mt-1 text-sm text-zinc-300">
                        Replace with your link and screenshots on the final portfolio page.
                      </div>
                    </div>
                    <a
                      href="https://inhomesdirect.co.uk/"
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5025d1] to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5025d1]/35 transition-all hover:shadow-xl hover:shadow-[#5025d1]/55 hover:scale-[1.02]"
                    >
                      Visit InHomes Direct <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-3 items-stretch">
                    {[
                      { icon: Layout, title: "Modern UI", desc: "Clean structure designed for conversion and clarity." },
                      { icon: Boxes, title: "Mixed units", desc: "Per-piece, per-area, and estimated products." },
                      { icon: Ruler, title: "Measurement flow", desc: "Accurate ordering with pack coverage logic." },
                    ].map((b) => (
                      <div
                        key={b.title}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4 h-full flex flex-col justify-center"
                      >
                        <div className="flex items-center gap-3">
                          <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5">
                            <b.icon className="h-5 w-5 text-white/85" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white">{b.title}</div>
                            <div className="mt-1 text-sm text-zinc-300">{b.desc}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </motion.div>
          </Container>
        </section>

        <StickySubnav />

        <Container>
          <Divider />
        </Container>

        {/* Overview */}
        <section id="overview" className="scroll-mt-24">
          <Container className="pb-16">
            <Reveal>
              <SectionTitle
                kicker="Overview"
                title="A premium interiors store with real-world ordering logic"
                desc="InHomes Direct sells flooring, worktops and interior products — where customers think in area (m²), packs, pieces, and sometimes need a survey for accurate estimating. The goal was to unify these product types into one seamless storefront."
              />
            </Reveal>

            <div className="mt-10 grid gap-4 lg:grid-cols-3 items-stretch">
              <Card
                icon={Globe}
                title="Industry"
                desc="Home interiors (UK)"
                bullets={["Flooring & accessories", "Worktops", "Tiles", "Beds", "Doors & Windows", "Lighting"]}
                delay={0.05}
              />
              <Card
                icon={Receipt}
                title="Scope"
                desc="Custom storefront + product logic"
                bullets={["Calculators", "Product templates", "Policies by type", "Forms"]}
                delay={0.1}
              />
              <Card
                icon={ShieldCheck}
                title="Constraint"
                desc="No paid apps"
                bullets={["Lightweight code", "Fast UX", "Scalable rules"]}
                delay={0.15}
              />
            </div>
          </Container>
        </section>

        <Container>
          <Divider />
        </Container>

        {/* Challenge */}
        <section id="challenge" className="scroll-mt-24">
          <Container className="pb-16">
            <Reveal>
              <SectionTitle
                kicker="Challenge"
                title="Standard e-commerce doesn’t handle flooring & worktops"
                desc="Unlike normal retail, these products require measurement-based buying and category-specific policies. Off-the-shelf apps were expensive, rigid, and slowed performance."
              />
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-2 items-stretch">
              <Card
                icon={Package}
                title="Packs vs area"
                desc="Flooring is sold in packs, but customers order by square meters. This needs accurate conversion and rounding."
                bullets={["Area → packs", "Round-up logic", "Avoid under-ordering"]}
                delay={0.05}
              />
              <Card
                icon={Percent}
                title="Worktops need survey"
                desc="Worktops cannot be priced instantly. Customers need an estimate range and a survey request flow."
                bullets={["Show % / starting indication", "Survey request", "Measure submission"]}
                delay={0.1}
              />
              <Card
                icon={Boxes}
                title="Mixed unit products"
                desc="One store must support per-piece items, per-area items, and estimated items with different UI patterns."
                bullets={["Per piece", "Per area", "Estimated / quote-based"]}
                delay={0.15}
              />
              <Card
                icon={Truck}
                title="Policies by product type"
                desc="Shipping and returns differ by category; the store must display the correct policy per product."
                bullets={["Different shipping rules", "Different returns rules", "Clear messaging"]}
                delay={0.2}
              />
            </div>
          </Container>
        </section>

        <Container>
          <Divider />
        </Container>

        {/* Solution */}
        <section id="solution" className="scroll-mt-24">
          <Container className="pb-16">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <Reveal>
                <SectionTitle
                  kicker="Solution"
                  title="A custom logic engine built into the storefront"
                  desc="We implemented lightweight, custom-coded calculators and conditional product templates. This delivered a fast UX and avoided paid calculator apps."
                />

                <div className="mt-6 flex flex-wrap gap-2">
                  <Pill icon={Calculator}>Real-time calculators</Pill>
                  <Pill icon={Layout}>Conditional product layouts</Pill>
                  <Pill icon={Truck}>Category-based policies</Pill>
                  <Pill icon={ShieldCheck}>No paid apps</Pill>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="https://inhomesdirect.co.uk/"
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5025d1] to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5025d1]/35 hover:shadow-xl hover:shadow-[#5025d1]/55 transition-all hover:scale-[1.02]"
                  >
                    View store <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    Request a build <MousePointerClick className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 backdrop-blur-sm">
                  <div className="text-sm font-semibold text-white">Implementation summary</div>
                  <ul className="mt-4 space-y-3 text-sm text-zinc-200">
                    {[
                      "Flooring: area (m²) input → packs required → rounded up → real-time total price",
                      "Worktops: show only a percentage / starting indication; require survey for final estimate",
                      "Multiple unit types: per piece, per area, and estimated products in one unified storefront",
                      "Custom forms for survey requests + measurement data collection",
                      "Shipping & returns displayed dynamically by product category",
                    ].map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-300" />
                        <span className="opacity-90">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        <Container>
          <Divider />
        </Container>

        {/* Features */}
        <section id="features" className="scroll-mt-24">
          <Container className="pb-16">
            <Reveal>
              <SectionTitle
                kicker="Key features"
                title="Custom calculators, templates, and category workflows"
                desc="These were the core build components that made the store feel premium and practical for customers ordering by measurements."
              />
            </Reveal>

            <div className="mt-10 grid gap-4 lg:grid-cols-3 items-stretch">
              <Card
                icon={Calculator}
                title="Flooring calculator"
                desc="Customers enter area (m²) and instantly see required packs and the live total price."
                bullets={["Area → packs", "Round-up logic", "Live total"]}
                delay={0.05}
              />
              <Card
                icon={Package}
                title="Pack requirement logic"
                desc="Coverage-aware calculation to avoid under-ordering and reduce returns/complaints."
                bullets={["Coverage per pack", "Auto rounding", "Clarity messaging"]}
                delay={0.1}
              />
              <Card
                icon={Percent}
                title="Worktops estimate flow"
                desc="Worktops show only a percentage / starting indication and require a survey to provide final estimate."
                bullets={["Survey request", "Measurement form", "Quote workflow"]}
                delay={0.15}
              />
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2 items-stretch">
              <Card
                icon={Boxes}
                title="One site, multiple unit types"
                desc="Per-piece, per-area, and estimated products were supported without splitting into separate sites."
                bullets={["Per piece products", "Per area products", "Estimated products"]}
                delay={0.1}
              />
              <Card
                icon={Truck}
                title="Shipping & returns by category"
                desc="Policies displayed per product type — reducing confusion and support tickets."
                bullets={["Custom policy blocks", "Category-specific logic", "Trust signals"]}
                delay={0.15}
              />
            </div>

            <Reveal delay={0.2}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#5025d1]/20 to-purple-600/20 p-6 backdrop-blur-sm">
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                  <div className="max-w-2xl">
                    <div className="text-sm font-semibold text-white">Custom forms & layouts</div>
                    <div className="mt-1 text-sm text-zinc-300">
                      We built product-specific forms (survey requests, measurement submission) and conditional page layouts so
                      customers always see the correct next step.
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
                    <ChevronRight className="h-4 w-4" />
                    No third-party apps
                  </div>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        <Container>
          <Divider />
        </Container>

        {/* UX */}
        <section id="ux" className="scroll-mt-24">
          <Container className="pb-16">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <Reveal>
                <SectionTitle
                  kicker="UI / UX"
                  title="Designed for clarity and confident purchasing"
                  desc="We structured product pages so users immediately understand: how pricing works, what unit applies, and what action to take (buy now, calculate, or request survey)."
                />
              </Reveal>

              <Reveal delay={0.1}>
                <div className="grid gap-4">
                  {[
                    {
                      icon: Layout,
                      title: "Conditional product layouts",
                      desc: "Flooring pages show calculator + pack info; worktops show estimate + survey CTA; accessories show simple add-to-cart.",
                    },
                    {
                      icon: ShieldCheck,
                      title: "Trust + transparency",
                      desc: "Clear breakdowns for packs/coverage, estimate rules, and category-specific shipping/returns.",
                    },
                    {
                      icon: Ruler,
                      title: "Mobile-first calculator UX",
                      desc: "Inputs, results, and CTAs remain readable and usable on mobile devices.",
                    },
                  ].map((r) => (
                    <div
                      key={r.title}
                      className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-5 backdrop-blur-sm"
                    >
                      <div className="flex items-start gap-3">
                        <div className="rounded-2xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-3">
                          <r.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{r.title}</div>
                          <div className="mt-1 text-sm text-zinc-300">{r.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        <Container>
          <Divider />
        </Container>

        {/* SEO */}
        <section id="seo" className="scroll-mt-24">
          <Container className="pb-16">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <Reveal>
                <SectionTitle
                  kicker="SEO & performance"
                  title="Structured pages, fast UX, clean content"
                  desc="We applied on-page SEO best practices and kept performance strong by avoiding heavy paid apps. This ensured both search visibility and a smooth shopping experience."
                />
              </Reveal>

              <Reveal delay={0.1}>
                <div className="grid gap-4">
                  {[
                    {
                      icon: FileSearch,
                      title: "On-page SEO structure",
                      desc: "Clean headings, metadata, internal linking, and category content alignment.",
                    },
                    {
                      icon: Gauge,
                      title: "Performance optimizations",
                      desc: "Lightweight custom scripts, efficient rendering, and reduced third-party load.",
                    },
                    {
                      icon: BarChart3,
                      title: "Analytics-ready",
                      desc: "Tracking foundation for measuring product interest, form submissions, and conversion flow.",
                    },
                  ].map((r) => (
                    <div
                      key={r.title}
                      className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-5 backdrop-blur-sm"
                    >
                      <div className="flex items-start gap-3">
                        <div className="rounded-2xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-3">
                          <r.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{r.title}</div>
                          <div className="mt-1 text-sm text-zinc-300">{r.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        <Container>
          <Divider />
        </Container>

        {/* Results */}
        <section id="results" className="scroll-mt-24">
          <Container className="pb-10">
            <Reveal>
              <SectionTitle
                kicker="Impact"
                title="A scalable, cost-effective system — built for real products"
                desc="By building custom logic into the storefront, InHomes Direct gained accurate ordering flows, clearer user decisions, and long-term savings by avoiding paid apps."
                align="center"
              />
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-3 items-stretch">
              <Stat icon={ShieldCheck} label="App dependency" value="Zero" />
              <Stat icon={Calculator} label="Ordering confidence" value="Higher" />
              <Stat icon={Truck} label="Policy clarity" value="Improved" />
            </div>

            <Reveal delay={0.15}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#5025d1]/20 to-emerald-400/10 p-6 backdrop-blur-sm">
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                  <div className="max-w-2xl">
                    <div className="text-sm font-semibold text-white">Want a similar build?</div>
                    <div className="mt-1 text-sm text-zinc-300">
                      We can implement custom calculators, forms, and category logic for any e-commerce store — while keeping
                      the UI modern and the performance fast.
                    </div>
                  </div>
                  <a
                    href="/contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#5025d1] shadow-lg transition-all hover:scale-[1.02]"
                  >
                    Request a proposal <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </Reveal>

            <div className="mt-10 text-center text-xs text-zinc-500">© {year} • InHomes Direct case study</div>
          </Container>
        </section>
      </div>
    </>
  );
}
