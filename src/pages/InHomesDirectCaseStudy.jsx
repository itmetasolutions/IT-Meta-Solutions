import React, { useEffect, useMemo, useRef } from "react";
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
} from "lucide-react";

/**
 * InHomes Direct — Case Study Page
 * Theme matches the main portfolio page (dark, glass cards, gradients).
 * - Sticky header with anchors
 * - Scroll progress bar
 * - Parallax hero
 * - Reveal animations
 * - Case study sections: Overview, Challenge, Solution, Features, UX, SEO, Results
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

const nav = [
  { label: "Overview", href: "#overview" },
  { label: "Challenge", href: "#challenge" },
  { label: "Solution", href: "#solution" },
  { label: "Features", href: "#features" },
  { label: "UX", href: "#ux" },
  { label: "SEO & Speed", href: "#seo" },
  { label: "Results", href: "#results" },
];

function Container({ children, className }) {
  return (
    <div className={cx("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
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

function GradientBlob({ className }) {
  return (
    <div
      aria-hidden
      className={cx(
        "pointer-events-none absolute -z-10 blur-3xl opacity-40",
        "bg-[radial-gradient(closest-side,rgba(99,102,241,0.6),rgba(99,102,241,0))]",
        className
      )}
    />
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 18, mass: 0.5 });
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-indigo-500 via-emerald-400 to-fuchsia-500"
      style={{ scaleX: w }}
    />
  );
}

function Reveal({ children, delay = 0, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
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

function SectionTitle({ kicker, title, desc, align = "left" }) {
  return (
    <div className={cx("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
        <Sparkles className="h-3.5 w-3.5" />
        {kicker}
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">{desc}</p>
    </div>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 h-full flex flex-col justify-center">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-2xl font-semibold text-white">{value}</div>
          <div className="text-sm text-zinc-300">{label}</div>
        </div>
      </div>
    </div>
  );
}

function Card({ icon: Icon, title, desc, bullets }) {
  return (
    <div
      className="
        group relative overflow-hidden
        rounded-3xl border border-white/10
        bg-gradient-to-b from-white/[0.07] to-white/[0.03]
        p-6 pb-8
        h-full                /* 👈 CRITICAL */
        flex
      "
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col">
        <div className="mb-4 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>

        <p className="text-sm leading-relaxed text-zinc-300">
          {desc}
        </p>

        {bullets?.length ? (
          <ul className="mt-5 space-y-2 text-sm text-zinc-200">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-emerald-300" />
                <span className="opacity-90">{b}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {/* keeps bottom breathing space */}
        <div className="mt-auto pt-4" />
      </div>
    </div>
  );
}


function Divider() {
  return <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />;
}

export default function InHomesDirectCaseStudy() {
  useEffect(() => {
    document.title = "ITMS | InHomes Direct";
  }, []);

  const year = useMemo(() => new Date().getFullYear(), []);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, -60]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.88]);

  const heroRef = useRef(null);

  return (
    <div className="min-h-screen text-zinc-100 mb-16">
      <ScrollProgress />

      {/* Background accents */}
      <GradientBlob className="left-[-120px] top-[-120px] h-[520px] w-[520px]" />
      <GradientBlob className="right-[-160px] top-[220px] h-[520px] w-[520px] bg-[radial-gradient(closest-side,rgba(16,185,129,0.55),rgba(16,185,129,0))]" />

      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden">
        <Container className="pb-16 pt-16 sm:pb-24 sm:pt-24">
          <motion.div style={{ y: heroY, opacity: heroOpacity }}>
            <Reveal>
              <div className="flex flex-wrap items-center gap-2">
                <Pill icon={Receipt}>E-commerce</Pill>
                <Pill icon={Calculator}>Custom calculators</Pill>
                <Pill icon={FileSearch}>On-page SEO</Pill>
                <Pill icon={Gauge}>Performance</Pill>
                <Pill icon={ShieldCheck}>No paid apps</Pill>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                InHomes Direct — a logic-driven storefront for flooring, worktops & home interiors
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                We built a modern UK e-commerce experience that handles complex product rules — area-to-pack conversion,
                real-time pricing, survey-based worktop estimates, and multiple unit types — all in one site, without any
                paid calculator apps.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <Reveal delay={0.1}>
                <Stat icon={Calculator} label="Real-time pricing" value="Area → Total" />
              </Reveal>
              <Reveal delay={0.15}>
                <Stat icon={Package} label="Pack requirement" value="Auto-round up" />
              </Reveal>
              <Reveal delay={0.2}>
                <Stat icon={Truck} label="Policies" value="By product type" />
              </Reveal>
            </div>

            {/* Hero Visual placeholder */}
            <Reveal delay={0.15}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.03] p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-2xl">
                    <div className="text-sm font-semibold text-white">Live website</div>
                    <div className="mt-1 text-sm text-zinc-300">Replace with your link and screenshots on the final site.</div>
                  </div>
                  <a
                    href="https://inhomesdirect.co.uk/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:opacity-90"
                  >
                    Visit InHomes Direct <ArrowRight className="h-4 w-4" />
                  </a>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {[
                    { icon: Layout, title: "Modern UI", desc: "Clean structure designed for conversion and clarity." },
                    { icon: Boxes, title: "Mixed units", desc: "Per-piece, per-area, and estimated products." },
                    { icon: Ruler, title: "Measurement flow", desc: "Accurate ordering with pack coverage logic." },
                  ].map((b) => (
                    <div key={b.title} className="rounded-2xl border border-white/10 bg-white/5 p-4 h-full flex flex-col justify-center">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5">
                          <b.icon className="h-5 w-5" />
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

          <div className="mt-10 pb-6 grid gap-4 lg:grid-cols-3">
            <Reveal delay={0.05}>
              <Card
                icon={Globe}
                title="Industry"
                desc="Home interiors (UK)"
                bullets={["Flooring & accessories", "Worktops", "Tiles", "Beds", "Doors & Windows", "Lightning"]}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Card
                icon={Receipt}
                title="Scope"
                desc="Custom storefront + product logic"
                bullets={["Calculators", "Product templates", "Policies by type", "Forms"]}
              />
            </Reveal>
            <Reveal delay={0.15}>
              <Card
                icon={ShieldCheck}
                title="Constraint"
                desc="No paid apps"
                bullets={["Lightweight code", "Fast UX", "Scalable rules"]}
              />
            </Reveal>
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

          <div className="mt-10 pb-6 grid gap-4 md:grid-cols-2">
            <Reveal delay={0.05}>
              <Card
                icon={Package}
                title="Packs vs area"
                desc="Flooring is sold in packs, but customers order by square meters. This needs accurate conversion and rounding."
                bullets={["Area → packs", "Round-up logic", "Avoid under-ordering"]}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Card
                icon={Percent}
                title="Worktops need survey"
                desc="Worktops cannot be priced instantly. Customers need an estimate range and a survey request flow." 
                bullets={["Show % / starting indication", "Survey request", "Measure submission"]}
              />
            </Reveal>
            <Reveal delay={0.15}>
              <Card
                icon={Boxes}
                title="Mixed unit products"
                desc="One store must support per-piece items, per-area items, and estimated items with different UI patterns." 
                bullets={["Per piece", "Per area", "Estimated / quote-based"]}
              />
            </Reveal>
            <Reveal delay={0.2}>
              <Card
                icon={Truck}
                title="Policies by product type"
                desc="Shipping and returns differ by category; the store must display the correct policy per product." 
                bullets={["Different shipping rules", "Different returns rules", "Clear messaging"]}
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <Container>
        <Divider />
      </Container>

      {/* Solution */}
      <section id="solution" className="scroll-mt-24">
        <Container>
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
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-6">
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

          <div className="mt-10 pb-6 grid gap-4 lg:grid-cols-3">
            <Reveal delay={0.05}>
              <Card
                icon={Calculator}
                title="Flooring calculator"
                desc="Customers enter area (m²) and instantly see required packs and the live total price."
                bullets={["Area → packs", "Round-up logic", "Live total"]}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Card
                icon={Package}
                title="Pack requirement logic"
                desc="Coverage-aware calculation to avoid under-ordering and reduce returns/complaints." 
                bullets={["Coverage per pack", "Auto rounding", "Clarity messaging"]}
              />
            </Reveal>
            <Reveal delay={0.15}>
              <Card
                icon={Percent}
                title="Worktops estimate flow"
                desc="Worktops show only a percentage / starting indication and require a survey to provide final estimate." 
                bullets={["Survey request", "Measurement form", "Quote workflow"]}
              />
            </Reveal>
          </div>

          <div className="mt-6 pb-6 grid gap-4 lg:grid-cols-2">
            <Reveal delay={0.1}>
              <Card
                icon={Boxes}
                title="One site, multiple unit types"
                desc="Per-piece, per-area, and estimated products were supported without splitting into separate sites."
                bullets={["Per piece products", "Per area products", "Estimated products"]}
              />
            </Reveal>
            <Reveal delay={0.15}>
              <Card
                icon={Truck}
                title="Shipping & returns by category"
                desc="Policies displayed per product type — reducing confusion and support tickets." 
                bullets={["Custom policy blocks", "Category-specific logic", "Trust signals"]}
              />
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.06] to-white/[0.03] p-6">
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
        <Container>
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
                    desc: "Input fields, results, and CTAs remain readable and usable on mobile devices.",
                  },
                ].map((r) => (
                  <div key={r.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                    <div className="flex items-start gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5">
                        <r.icon className="h-5 w-5" />
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
        <Container>
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
                  <div key={r.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                    <div className="flex items-start gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5">
                        <r.icon className="h-5 w-5" />
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
        <Container>
          <Reveal>
            <SectionTitle
              kicker="Impact"
              title="A scalable, cost-effective system — built for real products"
              desc="By building custom logic into the storefront, InHomes Direct gained accurate ordering flows, clearer user decisions, and long-term savings by avoiding paid apps." 
              align="center"
            />
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Reveal delay={0.05}>
              <Stat icon={ShieldCheck} label="App dependency" value="Zero" />
            </Reveal>
            <Reveal delay={0.1}>
              <Stat icon={Calculator} label="Ordering confidence" value="Higher" />
            </Reveal>
            <Reveal delay={0.15}>
              <Stat icon={Truck} label="Policy clarity" value="Improved" />
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-emerald-400/10 p-6">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div className="max-w-2xl">
                  <div className="text-sm font-semibold text-white">Want a similar build?</div>
                  <div className="mt-1 text-sm text-zinc-300">
                    We can implement custom calculators, forms, and category logic for any e-commerce store — while keeping
                    the UI modern and the performance fast.
                  </div>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:opacity-90"
                >
                  Request a proposal <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
