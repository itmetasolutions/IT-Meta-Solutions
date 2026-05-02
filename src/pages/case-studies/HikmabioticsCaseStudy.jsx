import React, { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import SeoContentFaq from "../../components/SeoContentFaq";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  FileSearch,
  Gauge,
  Globe,
  Images,
  Instagram,
  Landmark,
  LayoutGrid,
  Leaf,
  Megaphone,
  MessageSquareText,
  MousePointerClick,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wallet,
  ShoppingCart,
  BookOpenCheck,
  HeartPulse,
  BadgeDollarSign,
} from "lucide-react";
import SubpageVisualLayer from "../../components/SubpageVisualLayer";

/**
 * Hikmabiotics — Case Study (REDESIGNED to match your NEW Home style)
 * - Primary: #5025d1 (IT Meta Solutions purple)
 * - Dark glass + gradients + blobs
 * - Scroll progress same as Home
 * - Reduced-motion safe
 * - Equal-height cards in grids
 */

const cx = (...c) => c.filter(Boolean).join(" ");

/* ==================== HOOKS ==================== */
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

/* ==================== UI ==================== */
function Container({ children, className }) {
  return <div className={cx("mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12", className)}>{children}</div>;
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

function GradientBlob({ className, color = "rgba(80,37,209,0.22)" }) {
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

function Badge({ children, icon: Icon }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
      {Icon ? <Icon className="h-4 w-4" /> : null}
      {children}
    </span>
  );
}

function Reveal({ children, delay = 0, className }) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { y: 16 }}
      whileInView={reduced ? {} : { y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function Pill({ icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-zinc-100 backdrop-blur-sm">
      {Icon ? <Icon className="h-3.5 w-3.5 opacity-90" /> : null}
      {children}
    </span>
  );
}

function SectionHeading({ badge, title, description, centered = false }) {
  return (
    <div className={cx("mb-12", centered && "text-center")}>
      {badge ? (
        <div className={cx("mb-4", centered && "flex justify-center")}>
          <Badge icon={Sparkles}>{badge}</Badge>
        </div>
      ) : null}

      <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{title}</h2>

      {description ? (
        <p className={cx("mt-4 text-base text-zinc-300 sm:text-lg max-w-3xl", centered && "mx-auto")}>{description}</p>
      ) : null}
    </div>
  );
}

function Divider() {
  return <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />;
}

/* ==================== CARDS ==================== */
function StatCard({ icon: Icon, value, label, delay = 0 }) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { y: 16 }}
      whileInView={reduced ? {} : { y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 backdrop-blur-sm h-full"
    >
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-3">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <div className="text-2xl font-bold text-white sm:text-3xl">{value}</div>
          <div className="mt-1 text-sm text-zinc-400">{label}</div>
        </div>
      </div>
    </motion.div>
  );
}

function FeatureCard({ icon: Icon, title, desc, bullets, delay = 0 }) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { y: 16 }}
      whileInView={reduced ? {} : { y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={reduced ? {} : { y: -8, transition: { duration: 0.2 } }}
      className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-7 backdrop-blur-sm"
    >
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-[#5025d1]/20 to-purple-600/20 blur-3xl transition-all group-hover:scale-150" />
      <div className="relative flex h-full flex-col">
        <div className="mb-4 flex items-center gap-3">
          <div className="inline-flex rounded-2xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-3">
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

        <div className="mt-auto pt-4" />
      </div>
    </motion.div>
  );
}

function Shot({ title, size, comment }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 backdrop-blur-sm h-full">
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5">
          <Images className="h-5 w-5 text-white/80" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-white">{title}</div>
          <div className="mt-1 text-xs text-zinc-400">{size}</div>
          <div className="mt-2 text-sm text-zinc-300">{comment}</div>

          <div className="mt-5 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center text-xs text-zinc-400">
            Screenshot placeholder — drop image here
            <div className="mt-2 text-[11px] text-zinc-500">Keep the same aspect ratio for best look</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==================== NAV + TABS ==================== */
const inPageNav = [
  { label: "Overview", href: "#overview" },
  { label: "Tabs", href: "#tabs" },
  { label: "Screenshots", href: "#screens" },
  { label: "Results", href: "#results" },
];

function StickySubnav() {
  return (
    <div className="sticky top-[72px] z-40 border-b border-white/10 bg-black/50 backdrop-blur">
      <Container className="py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-300">
            <Landmark className="h-4 w-4 text-[#5025d1]" />
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

const tabs = [
  { key: "website", label: "Websites (PK + UK)", icon: LayoutGrid },
  { key: "paid", label: "Meta Ads (PK Sales)", icon: Megaphone },
  { key: "social", label: "Social & Organic", icon: Instagram },
];

function Tabs({ active, onChange }) {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((t, idx) => {
        const Icon = t.icon;
        const isActive = active === t.key;
        return (
          <motion.button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            initial={reduced ? false : { y: 8 }}
            animate={reduced ? {} : { y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
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
          </motion.button>
        );
      })}
    </div>
  );
}

/* ==================== PANELS ==================== */
function TabPanel({ active }) {
  if (active === "website") {
    return (
      <div className="grid gap-6">
        <Reveal>
          <SectionHeading
            badge="Websites (Dual-market architecture)"
            title={
              <>
                Two localized stores under{" "}
                <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                  one premium brand system
                </span>
              </>
            }
            description="Hikmabiotics was built as a scalable international brand: separate domains for Pakistan and the UK, localized messaging/currency/behavior cues, and one consistent identity across both experiences."
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          <FeatureCard
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
            delay={0.05}
          />
          <FeatureCard
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
            delay={0.1}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <FeatureCard
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
            delay={0.05}
          />
          <FeatureCard
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
            delay={0.1}
          />
          <FeatureCard
            icon={BookOpenCheck}
            title="Product education"
            desc="Content structure designed to answer key buyer questions quickly."
            bullets={["Ingredients & sourcing", "Benefits & outcomes", "Usage instructions", "Trust signals & proof", "Clear CTA placement"]}
            delay={0.15}
          />
        </div>

        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#5025d1]/20 to-purple-600/20 p-6 backdrop-blur-sm">
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
          <SectionHeading
            badge="Meta Ads (Pakistan sales validation)"
            title={
              <>
                Low-budget launch that{" "}
                <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                  validated profitable purchases
                </span>{" "}
                early
              </>
            }
            description="For Pakistan, we built a conversion-ready Meta Ads structure with pixel + purchase events, product-level tracking, and a 3-stage funnel (Awareness → Retargeting → Purchase) to validate early sales performance on controlled spend."
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          <FeatureCard
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
            delay={0.05}
          />
          <FeatureCard
            icon={Target}
            title="Audience logic"
            desc="High-intent buyer audiences built through content and site signals."
            bullets={["Video viewers", "Website visitors", "Warm audience retargeting", "Buyer-intent segments"]}
            delay={0.1}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <FeatureCard
            icon={Megaphone}
            title="Product awareness"
            desc="Educational creatives that sell by explaining benefits."
            bullets={["Short educational videos", "Benefit-driven creatives", "Product visuals", "Trust-first hooks"]}
            delay={0.05}
          />
          <FeatureCard
            icon={Users}
            title="Retargeting"
            desc="Warm users reminded with stronger offers and proof."
            bullets={["Video viewers", "Website visitors", "Proof-based creatives", "Offer messaging"]}
            delay={0.1}
          />
          <FeatureCard
            icon={MousePointerClick}
            title="Purchase campaigns"
            desc="Conversion-optimized ads with clear CTA and urgency."
            bullets={["Buy Now CTA", "Conversion optimization", "Limited-time offer messaging", "Checkout-focused path"]}
            delay={0.15}
          />
        </div>

        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#5025d1]/20 to-purple-600/20 p-6 backdrop-blur-sm">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <div className="text-sm font-semibold text-white">Performance snapshot (launch phase)</div>
                <div className="mt-1 text-sm text-zinc-300">
                  Daily budget: <span className="text-white font-semibold">~800 PKR</span> • Duration:{" "}
                  <span className="text-white font-semibold">First 3 days</span> • Cost per sale:{" "}
                  <span className="text-white font-semibold">~250–300 PKR</span> • Revenue:{" "}
                  <span className="text-white font-semibold">~20,000 PKR</span>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950">
                <BadgeDollarSign className="h-4 w-4" />
                Early ROAS win
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          <FeatureCard
            icon={MessageSquareText}
            title="Creative & copy system (PK)"
            desc="Education + offers + trust signals in a local tone."
            bullets={["Urdu + English mixed copy", "Benefits & usage hooks", "Trust cues (COD / delivery)", "Real product visuals", "Clear Buy Now CTA"]}
            delay={0.05}
          />
          <FeatureCard
            icon={BarChart3}
            title="Optimization loop"
            desc="A repeatable framework to scale while protecting CPL/ROAS."
            bullets={["Creative iteration", "Retargeting expansion", "Best-seller focus", "Landing page improvements"]}
            delay={0.1}
          />
        </div>
      </div>
    );
  }

  // SOCIAL & ORGANIC
  return (
    <div className="grid gap-6">
      <Reveal>
        <SectionHeading
          badge="Social & Organic (Dual presence)"
          title={
            <>
              Localized content for PK +{" "}
              <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                premium authority
              </span>{" "}
              for UK/global
            </>
          }
          description="We built two social identities under one brand system: Pakistan accounts focused on education + offers and bilingual content; UK/global accounts focused on premium wellness aesthetics, English-only storytelling, and long-term authority building."
        />
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        <FeatureCard
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
          delay={0.05}
        />
        <FeatureCard
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
          delay={0.1}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <FeatureCard
          icon={BookOpenCheck}
          title="Content pillars"
          desc="A repeatable system used across both markets."
          bullets={["Product education", "Health & wellness tips", "Usage & benefits", "Testimonials & reviews", "Reels for reach"]}
          delay={0.05}
        />
        <FeatureCard
          icon={HeartPulse}
          title="Brand voice consistency"
          desc="One brand identity, adapted per market behavior."
          bullets={["Same product truth", "Localized messaging", "Visual consistency", "Different tone per market"]}
          delay={0.1}
        />
        <FeatureCard
          icon={Globe}
          title="UK organic growth plan"
          desc="No aggressive ads initially — built for long-term trust and authority."
          bullets={["Education-led content", "SEO-friendly storytelling", "Authority positioning", "Foundation for future paid scaling"]}
          delay={0.15}
        />
      </div>

      <Reveal>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#5025d1]/20 to-purple-600/20 p-6 backdrop-blur-sm">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold text-white">Why this dual system works</div>
              <div className="mt-1 text-sm text-zinc-300">
                Pakistan content converts with education + offers and bilingual trust cues, while UK content builds premium
                authority for organic growth — both aligned under one recognizable brand identity.
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

const seoContent = {
  kicker: "Case Study",
  title: "Dual-Market Ecommerce Brand Launch",
  subtitle:
    "Hikmabiotics launched PK and UK brands with localized sites, social, and Meta Ads performance.",
  paragraphs: [
    "We built two localized ecommerce experiences and content systems for market-specific positioning.",
    "The launch used Meta Ads validation to generate early revenue with controlled cost per sale.",
  ],
  bullets: [
    "Localized ecommerce websites for PK and UK",
    "Meta Ads launch strategy and ROAS optimization",
    "Brand positioning and product storytelling",
    "Conversion-focused product pages and creatives",
  ],
};

const seoFaqs = [
  {
    q: "What markets were launched?",
    a: "We launched separate PK and UK websites with localized messaging.",
  },
  {
    q: "Did Meta Ads drive early sales?",
    a: "Yes. Launch Meta Ads generated early revenue with efficient cost per sale.",
  },
  {
    q: "Can you run dual-market brand launches?",
    a: "Yes. We build localized funnels and content systems for each market.",
  },
];

/* ==================== PAGE ==================== */
export default function HikmabioticsCaseStudy() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [activeTab, setActiveTab] = useState("website");
  const heroRef = useRef(null);

  return (
    <>
      <Helmet>
        <title>Hikmabiotics Case Study - Dual-Market Wellness Brand | IT Meta Solutions</title>
        <meta
          name="description"
          content="Hikmabiotics case study: dual-market ecommerce launch with PK/UK sites and Meta Ads generating early revenue."
        />
        <meta
          name="keywords"
          content="Hikmabiotics, natural supplements, wellness brand, dual market strategy, website development, Meta Ads, social media marketing, IT Meta Solutions"
        />
        <meta property="og:title" content="Hikmabiotics Case Study - Dual-Market Wellness Brand | IT Meta Solutions" />
        <meta
          property="og:description"
          content="Dual-market brand build with PK + UK websites, dual social identity, and PK Meta Ads validation."
        />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://itmetasolutions.com/case-study/hikmabiotics" />
        <meta property="og:url" content="https://itmetasolutions.com/case-study/hikmabiotics" />
        <meta property="og:image" content="https://itmetasolutions.com/favicon.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hikmabiotics Case Study - Dual-Market Wellness Brand | IT Meta Solutions" />
        <meta
          name="twitter:description"
          content="Dual-market brand build with PK + UK websites, dual social identity, and PK Meta Ads validation."
        />
        <meta name="twitter:image" content="https://itmetasolutions.com/favicon.webp" />
      </Helmet>

      <div className="itms-subpage relative min-h-screen overflow-hidden text-zinc-100">
        <SubpageVisualLayer />

        <ScrollProgress />

        {/* Background blobs (Home style) */}
        <GradientBlob className="left-[-140px] top-[-140px] h-[640px] w-[640px]" color="rgba(80,37,209,0.20)" />
        <GradientBlob className="right-[-180px] top-[180px] h-[740px] w-[740px]" color="rgba(16,185,129,0.14)" />
        <GradientBlob className="bottom-[-170px] left-[20%] h-[780px] w-[780px]" color="rgba(236,72,153,0.12)" />

        {/* HERO */}
        <section ref={heroRef} className="relative pt-24 pb-10 sm:pt-32 sm:pb-16">
          <Container>
            <motion.div>
              <Reveal>
                <Badge icon={Sparkles}>Complete Brand Build — Dual Market (PK + UK)</Badge>
              </Reveal>

              <Reveal delay={0.06}>
                <h1 className="mt-7 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  Hikmabiotics — dual-market brand build across{" "}
                  <span className="bg-gradient-to-r from-[#5025d1] via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    websites, social & Meta Ads
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="mt-5 max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                  A premium natural supplements and herbal wellness brand targeting Pakistan and the UK — built with localized
                  websites, separate social identities, and performance-driven ads in Pakistan while maintaining one unified
                  premium brand voice.
                </p>
              </Reveal>

              <Reveal delay={0.16} className="mt-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Pill icon={Leaf}>Natural wellness</Pill>
                  <Pill icon={Globe}>Dual market (PK + UK)</Pill>
                  <Pill icon={LayoutGrid}>Two websites</Pill>
                  <Pill icon={Instagram}>Dual social</Pill>
                  <Pill icon={Megaphone}>Meta Ads (PK)</Pill>
                  <Pill icon={ShieldCheck}>Sales growth</Pill>
                </div>
              </Reveal>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard icon={LayoutGrid} label="Websites" value="PK + UK domains" delay={0.05} />
                <StatCard icon={Instagram} label="Social" value="PK + UK profiles" delay={0.1} />
                <StatCard icon={Wallet} label="Revenue (PK launch)" value="~20,000 PKR" delay={0.15} />
                <StatCard icon={Target} label="Cost per sale (PK)" value="250–300 PKR" delay={0.2} />
              </div>

              <Reveal delay={0.18}>
                <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-7 backdrop-blur-sm">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-2xl">
                      <div className="text-sm font-semibold text-white">Live websites</div>
                      <div className="mt-1 text-sm text-zinc-300">
                        Use this page as your portfolio “Complete Brand Build” case study for Hikmabiotics.
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <a
                        href="https://hikmabiotics.com"
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5025d1] to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5025d1]/40 transition-all hover:shadow-xl hover:shadow-[#5025d1]/55 hover:scale-[1.02]"
                      >
                        PK Website
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                      <a
                        href="https://hikmabiotics.co.uk"
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/10"
                      >
                        UK Website
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {[
                      { icon: Globe, title: "Localization", desc: "Currency, messaging, offers, and behavior cues per market." },
                      { icon: BookOpenCheck, title: "Education pages", desc: "Ingredients, benefits, usage, and trust structure." },
                      { icon: BarChart3, title: "PK ads validation", desc: "Launch phase with early profitable sales on low spend." },
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

        {/* OVERVIEW */}
        <section id="overview" className="scroll-mt-24 py-16 sm:py-20">
          <Container>
            <Reveal>
              <SectionHeading
                badge="Brand overview"
                title={
                  <>
                    A scalable international wellness brand system{" "}
                    <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                      (PK + UK)
                    </span>
                  </>
                }
                description="Hikmabiotics is a premium natural supplements brand offering herbal wellness products including shilajit. The build focused on two localized websites, dual social identities, and a performance-driven launch in Pakistan — while keeping one unified premium brand voice."
              />
            </Reveal>

            <div className="grid gap-6 lg:grid-cols-3">
              <FeatureCard
                icon={Leaf}
                title="Industry"
                desc="Natural Supplements • Wellness • Herbal Products"
                bullets={["Premium positioning", "Education-led buying", "Trust and compliance needs"]}
                delay={0.05}
              />
              <FeatureCard
                icon={LayoutGrid}
                title="Scope"
                desc="Dual websites • Social • Organic • Meta Ads • Sales Growth"
                bullets={["PK + UK domains", "Dual social presence", "Organic brand building", "Meta Ads purchase funnel (PK)"]}
                delay={0.1}
              />
              <FeatureCard
                icon={ShieldCheck}
                title="Objectives"
                desc="Localization + scalability + early sales validation"
                bullets={[
                  "Two market-specific websites",
                  "Localized social content",
                  "PK paid launch validation",
                  "UK organic authority foundation",
                ]}
                delay={0.15}
              />
            </div>
          </Container>
        </section>

        <Container>
          <Divider />
        </Container>

        {/* TABS */}
        <section id="tabs" className="scroll-mt-24 py-16 sm:py-20">
          <Container>
            <Reveal>
              <SectionHeading
                badge="Brand build sections"
                title={
                  <>
                    Everything organized into{" "}
                    <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                      three deliverables
                    </span>
                  </>
                }
                description="Switch between Websites (PK + UK), Meta Ads (Pakistan sales), and Social & Organic (dual presence)."
              />
            </Reveal>

            <Reveal delay={0.06} className="mt-8">
              <Tabs active={activeTab} onChange={setActiveTab} />
            </Reveal>

            <div className="mt-8">
              <TabPanel active={activeTab} />
            </div>
          </Container>
        </section>

        <Container>
          <Divider />
        </Container>

        {/* SCREENSHOTS */}
        <section id="screens" className="scroll-mt-24 py-16 sm:py-20">
          <Container>
            <Reveal>
              <SectionHeading
                badge="Screenshot placeholders"
                title={
                  <>
                    Drop your proof here for a{" "}
                    <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                      high-trust portfolio
                    </span>
                  </>
                }
                description="These placeholders match recommended sizes so you can swap images later (PK home, UK home, product pages, mobile, social, and ads)."
              />
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <Reveal delay={0.05}>
                <Shot title="[PAKISTAN WEBSITE – HOME]" size="1920 × 1080" comment="Product highlights, benefits & trust badges" />
              </Reveal>
              <Reveal delay={0.1}>
                <Shot title="[UK WEBSITE – HOME]" size="1920 × 1080" comment="Premium layout, global wellness positioning" />
              </Reveal>
              <Reveal delay={0.15}>
                <Shot title="[PRODUCT DETAIL PAGE]" size="1440 × 900" comment="Ingredients, benefits, usage & CTA" />
              </Reveal>
              <Reveal delay={0.2}>
                <Shot title="[MOBILE VIEW]" size="390 × 844" comment="Mobile-first shopping experience" />
              </Reveal>
              <Reveal delay={0.25}>
                <Shot title="[INSTAGRAM PK PROFILE]" size="1080 × 1080" comment="Product grid, highlights & offers" />
              </Reveal>
              <Reveal delay={0.3}>
                <Shot title="[INSTAGRAM UK PROFILE]" size="1080 × 1080" comment="Premium wellness branding" />
              </Reveal>
              <Reveal delay={0.35}>
                <Shot title="[REELS CONTENT]" size="1080 × 1920" comment="Educational & product-focused reels" />
              </Reveal>
              <Reveal delay={0.4}>
                <Shot title="[ADS MANAGER OVERVIEW]" size="1920 × 1080" comment="Spend, purchases & ROAS (PK market)" />
              </Reveal>
              <Reveal delay={0.45}>
                <Shot title="[PURCHASE EVENTS]" size="1440 × 900" comment="Cost per sale & revenue tracking" />
              </Reveal>
              <Reveal delay={0.5}>
                <Shot title="[PRODUCT AD PREVIEW]" size="1080 × 1920" comment="Sales-focused supplement creative" />
              </Reveal>
            </div>
          </Container>
        </section>

        <Container>
          <Divider />
        </Container>

        {/* RESULTS */}
        <section id="results" className="scroll-mt-24 py-16 sm:py-20 pb-24">
          <Container>
            <Reveal>
              <SectionHeading
                badge="Results"
                title={
                  <>
                    Dual websites + dual social +{" "}
                    <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                      early profitable ads validation
                    </span>
                  </>
                }
                description="A complete international-ready brand presence with localized PK/UK websites, separate social identities, and a purchase-optimized Meta Ads launch in Pakistan that generated early profitable sales on low spend."
                centered
              />
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard icon={LayoutGrid} label="Websites" value="2 (PK + UK)" delay={0.05} />
              <StatCard icon={Instagram} label="Social presence" value="PK + UK" delay={0.1} />
              <StatCard icon={Wallet} label="Revenue (PK launch)" value="~20,000 PKR" delay={0.15} />
              <StatCard icon={Target} label="Cost per sale (PK)" value="250–300 PKR" delay={0.2} />
            </div>

            <Reveal delay={0.16}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#5025d1]/20 to-purple-600/20 p-7 backdrop-blur-sm">
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                  <div className="max-w-2xl">
                    <div className="text-sm font-semibold text-white">Scalable next steps</div>
                    <div className="mt-1 text-sm text-zinc-300">
                      Scale Pakistan by expanding best-seller campaigns and retargeting depth; scale UK by continuing authority-led
                      organic growth and launching paid once content credibility and data foundation is mature.
                    </div>
                  </div>

                  <a
                    href="/contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#5025d1] shadow-lg transition-all hover:scale-[1.02]"
                  >
                    Request a proposal
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </Reveal>

            <div className="mt-10 text-center text-xs text-zinc-500">© {year} • Hikmabiotics brand build</div>
          </Container>
        </section>

        <SeoContentFaq content={seoContent} faqs={seoFaqs} />
      </div>
    </>
  );
}

