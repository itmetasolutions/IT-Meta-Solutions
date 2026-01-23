import React, { useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  ChevronRight,
  CheckCircle2,
  FileSearch,
  Gauge,
  Globe,
  Images,
  Instagram,
  Landmark,
  LayoutGrid,
  Megaphone,
  MessageSquareText,
  MousePointerClick,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wallet,
  CalendarDays,
  Facebook,
  ShoppingCart,
  Leaf,
  HeartPulse,
  BookOpenCheck,
  PackageCheck,
  BadgeDollarSign,
} from "lucide-react";

/**
 * Hikmabiotics — Complete Brand Build (Tabbed)
 * Tabs:
 *  - Websites (Dual-market architecture: PK + UK)
 *  - Meta Ads (Pakistan sales validation)
 *  - Social & Organic (Dual presence + UK organic foundation)
 *
 * Matches your reference theme:
 * - Dark, glass cards, gradients
 * - Scroll progress
 * - Parallax hero
 * - Reveal animations
 * - Sticky section subnav
 */

const cx = (...c) => c.filter(Boolean).join(" ");

const tabs = [
  { key: "website", label: "Websites (PK + UK)", icon: LayoutGrid },
  { key: "paid", label: "Meta Ads (PK Sales)", icon: Megaphone },
  { key: "social", label: "Social & Organic", icon: Instagram },
];

const inPageNav = [
  { label: "Overview", href: "#overview" },
  { label: "Tabs", href: "#tabs" },
  { label: "Screenshots", href: "#screens" },
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
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-6 pb-8 h-full flex">
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />
      </div>

      <div className="relative flex h-full flex-col">
        <div className="mb-4 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>

        <p className="text-sm leading-relaxed text-zinc-300">{desc}</p>

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

        <div className="mt-auto pt-4" />
      </div>
    </div>
  );
}

function Divider() {
  return <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />;
}

function StickySubnav() {
  return (
    <div className="sticky top-[72px] z-40 border-b border-white/10 bg-zinc-950/60 backdrop-blur">
      <Container className="py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-300">
            <Landmark className="h-4 w-4" />
            Hikmabiotics — Brand Build
          </div>

          <div className="flex flex-wrap items-center gap-2 justify-end">
            {inPageNav.map((n) => (
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

function Tabs({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((t) => {
        const Icon = t.icon;
        const isActive = active === t.key;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            className={cx(
              "inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm transition",
              isActive
                ? "border-white/20 bg-white text-zinc-950"
                : "border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10"
            )}
          >
            <Icon className={cx("h-4 w-4", isActive ? "" : "opacity-80")} />
            {t.label}
            {isActive ? <CheckCircle2 className="h-4 w-4" /> : null}
          </button>
        );
      })}
    </div>
  );
}

function Shot({ title, size, comment }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5">
          <Images className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-white">{title}</div>
          <div className="mt-1 text-xs text-zinc-400">{size}</div>
          <div className="mt-2 text-sm text-zinc-300">{comment}</div>
          <div className="mt-4 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-6 text-xs text-zinc-400">
            Screenshot placeholder — drop image here
          </div>
        </div>
      </div>
    </div>
  );
}

function TabPanel({ active }) {
  if (active === "website") {
    return (
      <div className="grid gap-6">
        <Reveal>
          <SectionTitle
            kicker="Websites (Dual-market architecture)"
            title="Two localized stores under one premium brand system"
            desc="Hikmabiotics was built as a scalable international brand: separate domains for Pakistan and the UK, localized messaging/currency/behavior cues, and one consistent identity across both experiences."
          />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          <Reveal delay={0.05}>
            <Card
              icon={Globe}
              title="Dual-market strategy"
              desc="Separated domains for trust, compliance, and localization — while keeping one brand voice."
              bullets={[
                "Separate domains (PK + UK)",
                "Localized currency & offers",
                "Market-specific messaging",
                "Audience behavior alignment",
                "One consistent identity",
              ]}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <Card
              icon={ShieldCheck}
              title="Conversion + trust foundations"
              desc="Built to convert ads traffic (PK) and support premium trust (UK)."
              bullets={[
                "Optimized checkout flow",
                "Product education sections",
                "Trust badges & reassurance cues",
                "Mobile-first shopping",
                "Ads-ready landing experience",
              ]}
            />
          </Reveal>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Reveal delay={0.05}>
            <Card
              icon={ShoppingCart}
              title="🇵🇰 Pakistan website"
              desc="Sales-driven e-commerce designed for COD and local delivery confidence."
              bullets={[
                "Conversion-focused layout",
                "Benefits / usage / ingredients sections",
                "Local delivery messaging",
                "COD support cues",
                "Optimized for Meta Ads traffic",
              ]}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <Card
              icon={Leaf}
              title="🇬🇧 UK website"
              desc="Premium minimal design with compliance-ready product pages."
              bullets={[
                "Premium, minimal aesthetic",
                "International shipping focus",
                "Compliance-ready product pages",
                "Brand-first content for SEO",
                "Built for long-term organic trust",
              ]}
            />
          </Reveal>

          <Reveal delay={0.15}>
            <Card
              icon={BookOpenCheck}
              title="Product education"
              desc="Content structure designed to answer key buyer questions quickly."
              bullets={[
                "Ingredients & sourcing",
                "Benefits & outcomes",
                "Usage instructions",
                "Trust signals & proof",
                "Clear CTA placement",
              ]}
            />
          </Reveal>
        </div>

        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.06] to-white/[0.03] p-6">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <div className="text-sm font-semibold text-white">Website goals</div>
                <div className="mt-1 text-sm text-zinc-300">
                  Build two localized stores for Pakistan and the UK, keep one consistent premium identity, and support both
                  performance ads (PK) and long-term organic trust (UK).
                </div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
                <ChevronRight className="h-4 w-4" />
                Localized trust → purchase
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    );
  }

  if (active === "paid") {
    return (
      <div className="grid gap-6">
        <Reveal>
          <SectionTitle
            kicker="Meta Ads (Pakistan sales validation)"
            title="Low-budget launch that validated profitable purchases early"
            desc="For Pakistan, we built a conversion-ready Meta Ads structure with pixel + purchase events, product-level tracking, and a 3-stage funnel (Awareness → Retargeting → Purchase) to validate early sales performance on controlled spend."
          />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          <Reveal delay={0.05}>
            <Card
              icon={ShieldCheck}
              title="Meta setup"
              desc="Tracking foundations to optimize for purchases."
              bullets={[
                "Meta Business Manager",
                "Pixel configured",
                "Purchase events enabled",
                "Product-level tracking",
                "Conversion-focused campaign structure",
              ]}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <Card
              icon={Target}
              title="Audience logic"
              desc="High-intent buyer audiences built through content and site signals."
              bullets={["Video viewers", "Website visitors", "Warm audience retargeting", "Buyer-intent segments"]}
            />
          </Reveal>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Reveal delay={0.05}>
            <Card
              icon={Megaphone}
              title="Product awareness"
              desc="Educational creatives that sell by explaining benefits."
              bullets={["Short educational videos", "Benefit-driven creatives", "Product visuals", "Trust-first hooks"]}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <Card
              icon={Users}
              title="Retargeting"
              desc="Warm users reminded with stronger offers and proof."
              bullets={["Video viewers", "Website visitors", "Proof-based creatives", "Offer messaging"]}
            />
          </Reveal>

          <Reveal delay={0.15}>
            <Card
              icon={MousePointerClick}
              title="Purchase campaigns"
              desc="Conversion-optimized ads with clear CTA and urgency."
              bullets={["Buy Now CTA", "Conversion optimization", "Limited-time offer messaging", "Checkout-focused path"]}
            />
          </Reveal>
        </div>

        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-emerald-400/10 p-6">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <div className="text-sm font-semibold text-white">Performance snapshot (launch phase)</div>
                <div className="mt-1 text-sm text-zinc-300">
                  Daily budget: <span className="text-white font-semibold">~800 PKR</span> • Duration:{" "}
                  <span className="text-white font-semibold">First 3 days</span> • Cost per sale:{" "}
                  <span className="text-white font-semibold">~250–300 PKR</span> • Revenue:{" "}
                  <span className="text-white font-semibold">~20,000 PKR</span> with multiple purchases and strong early ROAS.
                </div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950">
                <BadgeDollarSign className="h-4 w-4" />
                Early ROAS win
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          <Reveal delay={0.05}>
            <Card
              icon={MessageSquareText}
              title="Creative & copy system (PK)"
              desc="Education + offers + trust signals in a local tone."
              bullets={[
                "Urdu + English mixed copy",
                "Benefits & usage hooks",
                "Trust cues (COD / delivery)",
                "Real product visuals",
                "Clear Buy Now CTA",
              ]}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <Card
              icon={BarChart3}
              title="Optimization loop"
              desc="A repeatable framework to scale while protecting CPL/ROAS."
              bullets={[
                "Creative iteration",
                "Retargeting expansion",
                "Best-seller focus",
                "Landing page improvements",
              ]}
            />
          </Reveal>
        </div>
      </div>
    );
  }

  // Social & organic
  return (
    <div className="grid gap-6">
      <Reveal>
        <SectionTitle
          kicker="Social & Organic (Dual presence)"
          title="Localized content for PK + premium authority for UK/global"
          desc="We built two social identities under one brand system: Pakistan accounts focused on education + offers and bilingual content; UK/global accounts focused on premium wellness aesthetics, English-only storytelling, and long-term authority building."
        />
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2">
        <Reveal delay={0.05}>
          <Card
            icon={Instagram}
            title="Pakistan social (hikmabiotics.pk)"
            desc="Product-first content designed to sell and educate locally."
            bullets={[
              "Urdu + English mixed content",
              "Offer-driven posts",
              "Product education reels",
              "Testimonials & reviews",
              "Sales-focused CTAs",
            ]}
          />
        </Reveal>

        <Reveal delay={0.1}>
          <Card
            icon={Leaf}
            title="UK/global social (hikmabiotics)"
            desc="Premium wellness identity for global trust and authority."
            bullets={[
              "Clean premium aesthetics",
              "English-only content",
              "Lifestyle + storytelling",
              "Trust & authority positioning",
              "Prepared for future paid scaling",
            ]}
          />
        </Reveal>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Reveal delay={0.05}>
          <Card
            icon={BookOpenCheck}
            title="Content pillars"
            desc="A repeatable system used across both markets."
            bullets={[
              "Product education",
              "Health & wellness tips",
              "Usage & benefits",
              "Testimonials & reviews",
              "Reels for reach",
            ]}
          />
        </Reveal>

        <Reveal delay={0.1}>
          <Card
            icon={HeartPulse}
            title="Brand voice consistency"
            desc="One brand identity, adapted per market behavior."
            bullets={[
              "Same product truth",
              "Localized messaging",
              "Visual consistency",
              "Different tone per market",
            ]}
          />
        </Reveal>

        <Reveal delay={0.15}>
          <Card
            icon={Globe}
            title="UK organic growth plan"
            desc="No aggressive ads initially — built for long-term trust and authority."
            bullets={[
              "Education-led content",
              "SEO-friendly storytelling",
              "Authority positioning",
              "Foundation for future paid scaling",
            ]}
          />
        </Reveal>
      </div>

      <Reveal>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.06] to-white/[0.03] p-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold text-white">Why this dual system works</div>
              <div className="mt-1 text-sm text-zinc-300">
                Pakistan content converts with education + offers and bilingual trust cues, while UK content builds premium
                authority for organic growth — both staying aligned under one recognizable brand identity.
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
              <ChevronRight className="h-4 w-4" />
              Local conversion + global trust
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default function HikmabioticsCaseStudy() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [activeTab, setActiveTab] = useState("website");

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
        <Container className="pb-10 pt-16 sm:pb-16 sm:pt-24">
          <motion.div style={{ y: heroY, opacity: heroOpacity }}>
            <Reveal>
              <div className="flex flex-wrap items-center gap-2">
                <Pill icon={Leaf}>Natural wellness</Pill>
                <Pill icon={Globe}>Dual market (PK + UK)</Pill>
                <Pill icon={LayoutGrid}>Two websites</Pill>
                <Pill icon={Instagram}>Dual social</Pill>
                <Pill icon={Megaphone}>Meta Ads (PK)</Pill>
                <Pill icon={ShieldCheck}>Sales growth</Pill>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                Hikmabiotics — dual-market brand build across websites, social & Meta Ads
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                A premium natural supplements and herbal wellness brand targeting Pakistan and the UK — built with localized
                websites, separate social identities, and performance-driven ads in Pakistan while maintaining one strong brand voice.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-3 sm:grid-cols-4">
              <Reveal delay={0.1}>
                <Stat icon={LayoutGrid} label="Websites" value="PK + UK domains" />
              </Reveal>
              <Reveal delay={0.15}>
                <Stat icon={Instagram} label="Social" value="PK + UK profiles" />
              </Reveal>
              <Reveal delay={0.2}>
                <Stat icon={Wallet} label="Revenue (PK launch)" value="~20,000 PKR" />
              </Reveal>
              <Reveal delay={0.25}>
                <Stat icon={Target} label="Cost per sale (PK)" value="250–300 PKR" />
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.03] p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-2xl">
                    <div className="text-sm font-semibold text-white">Live websites</div>
                    <div className="mt-1 text-sm text-zinc-300">
                      Use this case study as a “Complete Brand Build” portfolio page for Hikmabiotics.
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <a
                      href="https://hikrnmabiotics.com"
                      className="hidden"
                      aria-hidden
                    >
                      {/* guard */}
                    </a>
                    <a
                      href="https://hikmabiotics.com"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:opacity-90"
                    >
                      PK Website <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href="https://hikmabiotics.co.uk"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                    >
                      UK Website <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {[
                    { icon: Globe, title: "Localization", desc: "Currency, messaging, offers, and behavior cues per market." },
                    { icon: BookOpenCheck, title: "Education pages", desc: "Ingredients, benefits, usage, and trust structure." },
                    { icon: BarChart3, title: "PK ads validation", desc: "3-day launch phase with early profitable sales." },
                  ].map((b) => (
                    <div
                      key={b.title}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 h-full flex flex-col justify-center"
                    >
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

      {/* Sticky anchors */}
      <StickySubnav />

      <Container>
        <Divider />
      </Container>

      {/* Overview */}
      <section id="overview" className="scroll-mt-24">
        <Container className="pb-16">
          <Reveal>
            <SectionTitle
              kicker="Brand overview"
              title="A scalable international wellness brand system (PK + UK)"
              desc="Hikmabiotics is a premium natural supplements brand offering herbal wellness products including shilajit. The build focused on two localized websites, dual social identities, and a performance-driven launch in Pakistan — while keeping one unified premium brand voice."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <Reveal delay={0.05}>
              <Card
                icon={Leaf}
                title="Industry"
                desc="Natural Supplements • Wellness • Herbal Products"
                bullets={["Premium positioning", "Education-led buying", "Trust and compliance needs"]}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Card
                icon={LayoutGrid}
                title="Scope"
                desc="Dual websites • Social • Organic • Meta Ads • Sales Growth"
                bullets={[
                  "PK + UK domains",
                  "Dual social presence",
                  "Organic brand building",
                  "Meta Ads purchase funnel (PK)",
                ]}
              />
            </Reveal>
            <Reveal delay={0.15}>
              <Card
                icon={ShieldCheck}
                title="Objectives"
                desc="Localization + scalability + early sales validation"
                bullets={[
                  "Two market-specific websites",
                  "Localized social content",
                  "PK paid launch validation",
                  "UK organic authority foundation",
                ]}
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <Container>
        <Divider />
      </Container>

      {/* Tabs */}
      <section id="tabs" className="scroll-mt-24">
        <Container className="pb-16">
          <Reveal>
            <SectionTitle
              kicker="Brand build sections"
              title="Everything organized into three deliverables"
              desc="Switch between Websites (PK + UK), Meta Ads (Pakistan sales), and Social & Organic (dual presence)."
            />
          </Reveal>

          <div className="mt-8">
            <Reveal delay={0.05}>
              <Tabs active={activeTab} onChange={setActiveTab} />
            </Reveal>
          </div>

          <div className="mt-8">
            <TabPanel active={activeTab} />
          </div>
        </Container>
      </section>

      <Container>
        <Divider />
      </Container>

      {/* Screenshots */}
      <section id="screens" className="scroll-mt-24">
        <Container className="pb-16">
          <Reveal>
            <SectionTitle
              kicker="Screenshot placeholders"
              title="Drop your proof here for a high-trust portfolio"
              desc="These placeholders match your requested sizes so you can swap images in later (PK home, UK home, product pages, mobile, social, and ads)."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <Reveal delay={0.05}>
              <Shot
                title="[PAKISTAN WEBSITE – HOME]"
                size="1920 × 1080"
                comment="Product highlights, benefits & trust badges"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Shot
                title="[UK WEBSITE – HOME]"
                size="1920 × 1080"
                comment="Premium layout, global wellness positioning"
              />
            </Reveal>
            <Reveal delay={0.15}>
              <Shot
                title="[PRODUCT DETAIL PAGE]"
                size="1440 × 900"
                comment="Ingredients, benefits, usage & CTA"
              />
            </Reveal>
            <Reveal delay={0.2}>
              <Shot
                title="[MOBILE VIEW]"
                size="390 × 844"
                comment="Mobile-first shopping experience"
              />
            </Reveal>
            <Reveal delay={0.25}>
              <Shot
                title="[INSTAGRAM PK PROFILE]"
                size="1080 × 1080"
                comment="Product grid, highlights & offers"
              />
            </Reveal>
            <Reveal delay={0.3}>
              <Shot
                title="[INSTAGRAM UK PROFILE]"
                size="1080 × 1080"
                comment="Premium wellness branding"
              />
            </Reveal>
            <Reveal delay={0.35}>
              <Shot
                title="[REELS CONTENT]"
                size="1080 × 1920"
                comment="Educational & product-focused reels"
              />
            </Reveal>
            <Reveal delay={0.4}>
              <Shot
                title="[ADS MANAGER OVERVIEW]"
                size="1920 × 1080"
                comment="Spend, purchases & ROAS (PK market)"
              />
            </Reveal>
            <Reveal delay={0.45}>
              <Shot
                title="[PURCHASE EVENTS]"
                size="1440 × 900"
                comment="Cost per sale & revenue tracking"
              />
            </Reveal>
            <Reveal delay={0.5}>
              <Shot
                title="[PRODUCT AD PREVIEW]"
                size="1080 × 1920"
                comment="Sales-focused supplement creative"
              />
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
              kicker="Results"
              title="Dual websites + dual social + early profitable ads validation"
              desc="A complete international-ready brand presence with localized PK/UK websites, separate social identities, and a purchase-optimized Meta Ads launch in Pakistan that generated early profitable sales on low spend."
              align="center"
            />
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            <Reveal delay={0.05}>
              <Stat icon={LayoutGrid} label="Websites" value="2 (PK + UK)" />
            </Reveal>
            <Reveal delay={0.1}>
              <Stat icon={Instagram} label="Social presence" value="PK + UK" />
            </Reveal>
            <Reveal delay={0.15}>
              <Stat icon={Wallet} label="Revenue (PK launch)" value="~20,000 PKR" />
            </Reveal>
            <Reveal delay={0.2}>
              <Stat icon={Target} label="Cost per sale (PK)" value="250–300 PKR" />
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-emerald-400/10 p-6">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div className="max-w-2xl">
                  <div className="text-sm font-semibold text-white">Scalable next steps</div>
                  <div className="mt-1 text-sm text-zinc-300">
                    Scale Pakistan by expanding best-seller campaigns and retargeting depth; scale UK by continuing authority-led
                    organic growth and launching paid once content credibility and data foundation is mature.
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

          <div className="mt-10 text-center text-xs text-zinc-500">© {year} • Hikmabiotics brand build</div>
        </Container>
      </section>
    </div>
  );
}
