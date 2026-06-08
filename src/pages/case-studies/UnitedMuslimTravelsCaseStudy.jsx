import React, { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import SeoContentFaq from "../../components/SeoContentFaq";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BedDouble,
  ChevronRight,
  FileSearch,
  Gauge,
  LayoutGrid,
  Landmark,
  Megaphone,
  MessageSquareText,
  Phone,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users,
  Wallet,
  Instagram,
  Target,
  MousePointerClick,
  Images,
  CheckCircle2,
  ScrollText,
  CalendarDays,
  Globe,
} from "lucide-react";
import SubpageVisualLayer from "../../components/SubpageVisualLayer";

/**
 * United Muslim Travels — Complete Brand Build (Tabbed) — UPDATED
 * ✅ Same theme as your latest pages (dark glass + gradients)
 * ✅ Primary color: #1D4ED8 (ITMS purple)
 * ✅ Smooth tabs + sticky in-page nav
 * ✅ Equal-height cards everywhere
 * ✅ Mobile safe (no horizontal scroll)
 * ✅ "Request a proposal" routes to /contact
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

/* ==================== CONFIG ==================== */
const tabs = [
  { key: "website", label: "Website & SEO", icon: LayoutGrid },
  { key: "paid", label: "Paid Marketing", icon: Megaphone },
  { key: "social", label: "Social Media Management", icon: Instagram },
];

const inPageNav = [
  { label: "Overview", href: "#overview" },
  { label: "Tabs", href: "#tabs" },
  { label: "Results", href: "#results" },
];

/* ==================== UI HELPERS ==================== */
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

function GradientBlob({ className, color = "rgba(29,78,216,0.20)" }) {
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
      className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-[#1D4ED8] via-blue-500 to-pink-500"
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
      <HeadingTag className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</HeadingTag>
      <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">{desc}</p>
    </div>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-5 h-full flex flex-col justify-center backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-gradient-to-br from-[#1D4ED8] to-blue-600 p-3">
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
        h-full flex
        backdrop-blur-sm
      "
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-[#1D4ED8]/25 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
      </div>

      <div className="relative flex h-full flex-col">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-[#1D4ED8] to-blue-600 p-3">
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

function Divider() {
  return <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />;
}

function StickySubnav() {
  return (
    <div className="sticky top-[72px] z-40 border-b border-white/10 bg-black/50 backdrop-blur">
      <Container className="py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-300">
            <Landmark className="h-4 w-4 text-[#1D4ED8]" />
            United Muslim Travels — Brand Build
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
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-5 backdrop-blur-sm">
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

/* ==================== TAB PANELS ==================== */
function TabPanel({ active }) {
  if (active === "website") {
    return (
      <div className="grid gap-6">
        <Reveal>
          <SectionTitle
            kicker="Website & SEO"
            title="A conversion-ready trust hub for Hajj & Umrah leads"
            desc="The website was built as the foundation of the brand: clear package architecture, hotel/accommodation detail pages, and fast inquiry + WhatsApp conversion paths — optimized for mobile-first traffic from ads and social."
          />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 items-stretch">
          <Card
            icon={LayoutGrid}
            title="Site architecture"
            desc="A structure that makes pilgrimage services easy to find and compare."
            bullets={[
              "Home (trust messaging + brand)",
              "Umrah Packages",
              "Hajj Packages",
              "Ramadan Packages",
              "Hotels / accommodation pages",
              "Visa + Transport",
              "Contact & inquiry forms",
            ]}
            delay={0.05}
          />
          <Card
            icon={Ticket}
            title="Package detail templates"
            desc="Dedicated package pages designed for scannability and quick action."
            bullets={["Duration", "Inclusions", "Hotel distance from Haram", "Pricing cues", "Call / WhatsApp CTAs"]}
            delay={0.1}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-3 items-stretch">
          <Card
            icon={Gauge}
            title="Mobile-first UX"
            desc="Most leads arrive via mobile — so layouts are optimized for quick reading and one-tap actions."
            bullets={["Sticky CTAs", "Readable sections", "Fast navigation", "WhatsApp-first flow"]}
            delay={0.05}
          />
          <Card
            icon={BedDouble}
            title="Hotels & amenities"
            desc="Accommodation pages set expectations and support decision-making for families and elders."
            bullets={["Amenity lists", "Galleries", "Proximity context", "Linked from packages"]}
            delay={0.1}
          />
          <Card
            icon={FileSearch}
            title="SEO structure"
            desc="Built for intent-based search around packages, seasons, and locations."
            bullets={["Package hubs", "Long-tail package pages", "Service pages", "Clean internal linking"]}
            delay={0.15}
          />
        </div>

        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 backdrop-blur-sm">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <div className="text-sm font-semibold text-white">Website goals</div>
                <div className="mt-1 text-sm text-zinc-300">
                  Act as a trust hub for ads & social traffic, explain Umrah/Hajj/Ramadan packages clearly, and provide fast inquiry
                  + WhatsApp conversion paths.
                </div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
                <ChevronRight className="h-4 w-4" />
                Info → inquiry
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
            kicker="Paid Marketing"
            title="Meta Ads funnel built for low-budget, high-intent inquiries"
            desc="We built a complete Meta setup with domain verification, pixel foundations, WhatsApp + instant lead forms, and a 3-stage funnel (Awareness → Retargeting → Leads) designed for Hajj/Umrah intent targeting."
          />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 items-stretch">
          <Card
            icon={ShieldCheck}
            title="Meta setup"
            desc="Professional infrastructure so ads and tracking remain reliable."
            bullets={[
              "Meta Business Manager",
              "Domain verification",
              "Ad account setup",
              "Pixel foundations",
              "WhatsApp + lead form integration",
            ]}
            delay={0.05}
          />
          <Card
            icon={Users}
            title="Audience segmentation"
            desc="Interest + behavior-based segments optimized for pilgrimage intent."
            bullets={["Umrah/Hajj interests", "Ramadan seasonal intent", "Engagers retargeting", "Warm audiences"]}
            delay={0.1}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-3 items-stretch">
          <Card
            icon={Megaphone}
            title="Awareness campaign"
            desc="Introduce the brand with respectful Islamic visuals and emotional messaging."
            bullets={["Image + video creatives", "Umrah calling copy", "Ramadan blessings angle", "Trust messaging"]}
            delay={0.05}
          />
          <Card
            icon={Target}
            title="Retargeting"
            desc="Re-engage warm users who watched videos or interacted with the page."
            bullets={["Video viewers", "Page engagers", "Profile visitors", "Reminder creatives"]}
            delay={0.1}
          />
          <Card
            icon={MousePointerClick}
            title="Lead campaigns"
            desc="Conversion-focused ads sending users to WhatsApp and instant forms."
            bullets={["Click-to-WhatsApp", "Instant lead forms", "Clear package messaging", "Direct CTAs"]}
            delay={0.15}
          />
        </div>

        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#1D4ED8]/20 to-emerald-400/10 p-6 backdrop-blur-sm">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <div className="text-sm font-semibold text-white">Performance snapshot (test budget)</div>
                <div className="mt-1 text-sm text-zinc-300">
                  Total spend: <span className="text-white font-semibold">500</span> (PKR test budget) • Leads:{" "}
                  <span className="text-white font-semibold">200+</span> via WhatsApp chats + instant forms • Strong relevance due
                  to niche targeting.
                </div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#1D4ED8]">
                <Wallet className="h-4 w-4" />
                Low CPL system
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 items-stretch">
          <Card
            icon={MessageSquareText}
            title="Creative & copy strategy"
            desc="A respectful Islamic tone with Urdu + English mixed copy and urgency-based CTAs."
            bullets={["Licensed travel trust", "Hotels near Haram", "Complete Umrah support", "Limited seats", "Ramadan specials"]}
            delay={0.05}
          />
          <Card
            icon={BarChart3}
            title="Lead handling"
            desc="Leads routed to WhatsApp and forms for fast responses and better close rates."
            bullets={["WhatsApp conversations", "Instant form follow-ups", "Package-specific intent", "Scalable for Hajj/Ramadan"]}
            delay={0.1}
          />
        </div>
      </div>
    );
  }

  // social
  return (
    <div className="grid gap-6">
      <Reveal>
        <SectionTitle
          kicker="Social Media Management"
          title="Consistent Islamic identity across Instagram & Facebook"
          desc="We optimized profiles, defined content pillars, and built a consistent brand style to support trust and conversion — aligning organic content with ad messaging for stronger recall."
        />
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2 items-stretch">
        <Card
          icon={Instagram}
          title="Platforms"
          desc="Brand presence across high-intent social channels."
          bullets={["Instagram", "Facebook (if used)", "WhatsApp-first conversion"]}
          delay={0.05}
        />
        <Card
          icon={ShieldCheck}
          title="Brand setup"
          desc="Profile optimization and visual consistency built for trust."
          bullets={["Bio + category", "Contact buttons", "Consistent logo/colors", "Islamic theme cues"]}
          delay={0.1}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3 items-stretch">
        <Card
          icon={CalendarDays}
          title="Content pillars"
          desc="Content designed to inform, build trust, and convert."
          bullets={["Package promotions", "Islamic education", "Ziyarat & history", "Testimonials/trust posts"]}
          delay={0.05}
        />
        <Card
          icon={ScrollText}
          title="Tone & messaging"
          desc="Respectful, spiritual, and easy to understand for all age groups."
          bullets={["Urdu + English mix", "Trust messaging", "Clear CTAs", "Seasonal campaigns"]}
          delay={0.1}
        />
        <Card
          icon={Ticket}
          title="Highlights structure"
          desc="Highlights that answer common pilgrim intents quickly."
          bullets={["Umrah Packages", "Hajj Packages", "Hotels", "Ziyarat"]}
          delay={0.15}
        />
      </div>

      <Reveal>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 backdrop-blur-sm">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold text-white">Why this works</div>
              <div className="mt-1 text-sm text-zinc-300">
                Consistent identity + clear offers + trust messaging makes organic traffic warmer — improving retargeting and lowering ad costs.
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
              <ChevronRight className="h-4 w-4" />
              Organic → ads synergy
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

const seoContent = {
  kicker: "Case Study",
  title: "Hajj & Umrah Leads via Meta Ads and Conversion UX",
  subtitle:
    "United Muslim Travels generated 200+ leads with a conversion-focused travel funnel.",
  paragraphs: [
    "We built a trust-first brand presence with clear package architecture and WhatsApp-first conversions.",
    "Meta Ads testing delivered rapid lead volume on a minimal budget.",
  ],
  bullets: [
    "Lead generation services for travel brands",
    "Meta Ads strategy and conversion tracking",
    "Package landing pages with clear CTAs",
    "WhatsApp-first inquiry flows",
  ],
};

const seoFaqs = [
  {
    q: "How many leads were generated?",
    a: "The campaign generated 200+ qualified leads on a small test budget.",
  },
  {
    q: "What made the funnel effective?",
    a: "Clear package pages, WhatsApp-first CTAs, and Meta Ads targeting.",
  },
  {
    q: "Can this scale for peak seasons?",
    a: "Yes. The funnel scales by swapping offers, creatives, and campaign timing.",
  },
];

/* ==================== PAGE ==================== */
export default function UnitedMuslimTravelsCaseStudy() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [activeTab, setActiveTab] = useState("website");
  const heroRef = useRef(null);

  return (
    <>
      <Helmet>
        <title>United Muslim Travels Case Study - Hajj & Umrah Brand Build | IT Meta Solutions</title>
        <meta
          name="description"
          content="United Muslim Travels case study: brand build with Meta Ads delivering 200+ Hajj and Umrah leads."
        />
        <meta
          name="keywords"
          content="United Muslim Travels, Hajj travel, Umrah packages, Islamic travel agency, Meta Ads, website development, social media marketing, IT Meta Solutions"
        />
        <meta property="og:title" content="United Muslim Travels Case Study - Hajj & Umrah Brand Build | IT Meta Solutions" />
        <meta
          property="og:description"
          content="Complete brand build: website, social media, and Meta Ads delivering 200+ leads for Hajj, Umrah, and Ramadan travel packages."
        />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://itmetasolutions.com/case-studies/united-muslim-travels-brand-build" />
        <meta property="og:url" content="https://itmetasolutions.com/case-studies/united-muslim-travels-brand-build" />
        <meta property="og:image" content="https://itmetasolutions.com/favicon.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="United Muslim Travels Case Study - Hajj & Umrah Brand Build | IT Meta Solutions" />
        <meta
          name="twitter:description"
          content="Complete brand build: website, social media, and Meta Ads delivering 200+ leads for Hajj, Umrah, and Ramadan travel packages."
        />
        <meta name="twitter:image" content="https://itmetasolutions.com/favicon.webp" />
      </Helmet>

      <div className="itms-subpage relative min-h-screen text-zinc-100 mb-16 overflow-hidden">
        <SubpageVisualLayer />

        <ScrollProgress />

        {/* Background accents */}
        <GradientBlob className="left-[-140px] top-[-140px] h-[650px] w-[650px]" color="rgba(29,78,216,0.22)" />
        <GradientBlob className="right-[-190px] top-[220px] h-[700px] w-[700px]" color="rgba(16,185,129,0.16)" />
        <GradientBlob className="bottom-[-180px] left-[18%] h-[780px] w-[780px]" color="rgba(236,72,153,0.10)" />

        {/* Hero */}
        <section ref={heroRef} className="relative overflow-hidden">
          <Container className="pb-16 pt-24 sm:pb-24 sm:pt-32">
            <motion.div>
              <Reveal>
                <div className="flex flex-wrap items-center gap-2">
                  <Pill icon={Landmark}>Islamic travel brand</Pill>
                  <Pill icon={LayoutGrid}>Website</Pill>
                  <Pill icon={Instagram}>Social</Pill>
                  <Pill icon={Megaphone}>Meta Ads</Pill>
                  <Pill icon={ShieldCheck}>Lead generation</Pill>
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  United Muslim Travels — complete brand build across{" "}
                  <span className="bg-gradient-to-r from-[#1D4ED8] via-blue-500 to-pink-500 bg-clip-text text-transparent">
                    website, social & Meta Ads
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="mt-5 max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                  A faith-focused travel brand for Hajj, Umrah, Ramadan, visa, hotels, and transport — built to increase trust,
                  visibility, and consistent inquiries in a competitive religious travel market.
                </p>
              </Reveal>

              <div className="mt-10 grid gap-4 sm:grid-cols-3 items-stretch">
                <Stat icon={LayoutGrid} label="Foundation" value="Conversion website" />
                <Stat icon={Instagram} label="Presence" value="IG + Facebook" />
                <Stat icon={Megaphone} label="Growth" value="Meta leads" />
              </div>

              {/* Live website card */}
              <Reveal delay={0.18}>
                <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-7 backdrop-blur-sm">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-2xl">
                      <div className="text-sm font-semibold text-white">Live website</div>
                      <div className="mt-1 text-sm text-zinc-300">Use this page as your portfolio “Complete Brand Build” case study.</div>
                    </div>
                    <a
                      href="https://unitedmuslimtravels.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1D4ED8] to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1D4ED8]/35 transition-all hover:shadow-xl hover:shadow-[#1D4ED8]/55 hover:scale-[1.02]"
                    >
                      Visit Website <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-3 items-stretch">
                    {[
                      { icon: Ticket, title: "Packages", desc: "Hajj, Umrah, Ramadan with structured detail pages." },
                      { icon: Phone, title: "WhatsApp paths", desc: "Fast conversion routes for mobile-first leads." },
                      { icon: BarChart3, title: "Ad funnel", desc: "Awareness → retargeting → leads system." },
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
                title="Trust-first Islamic travel brand with full-funnel lead generation"
                desc="United Muslim Travels offers Hajj, Umrah, Ramadan packages, visa support, hotels, and transport. This build focused on credibility, consistent identity, and a repeatable ads system that generates qualified inquiries on a low budget."
              />
            </Reveal>

            <div className="mt-10 grid gap-4 lg:grid-cols-3 items-stretch">
              <Card
                icon={Landmark}
                title="Industry"
                desc="Hajj • Umrah • Islamic Travel Services"
                bullets={["Spiritually respectful tone", "Competitive market", "Seasonal demand"]}
                delay={0.05}
              />
              <Card
                icon={LayoutGrid}
                title="Scope"
                desc="Website • Social • Meta Ads • Lead Gen"
                bullets={["Conversion website", "IG/FB brand identity", "Meta setup + funnel", "WhatsApp integration"]}
                delay={0.1}
              />
              <Card
                icon={ShieldCheck}
                title="Objectives"
                desc="Visibility + trust + consistent inquiries"
                bullets={["Credible brand", "Conversion-ready website", "Awareness → Leads funnel", "Low-budget performance"]}
                delay={0.15}
              />
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
                desc="Switch between Website & SEO, Paid Marketing, and Social Media Management — each tab shows the full structure, features, and outcomes."
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



        {/* Results */}
        <section id="results" className="scroll-mt-24">
          <Container className="pb-10">
            <Reveal>
              <SectionTitle
                kicker="Results"
                title="200+ qualified leads on a minimal test budget"
                desc="A complete brand presence (website + social + ads) with verified Meta setup, clear package architecture, and a funnel that consistently generates Umrah/Hajj inquiries."
                align="center"
              />
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-3 items-stretch">
              <Stat icon={Wallet} label="Test ad spend" value="500" />
              <Stat icon={Users} label="Potential leads" value="200+" />
              <Stat icon={Phone} label="Conversions" value="WhatsApp + forms" />
            </div>

            <Reveal delay={0.15}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#1D4ED8]/20 to-emerald-400/10 p-6 backdrop-blur-sm">
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                  <div className="max-w-2xl">
                    <div className="text-sm font-semibold text-white">Scalable next steps</div>
                    <div className="mt-1 text-sm text-zinc-300">
                      This system scales into Hajj peak season and Ramadan campaigns by duplicating the funnel and swapping offers, creatives, and package pages.
                    </div>
                  </div>
                  <a
                    href="/contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1D4ED8] shadow-lg transition-all hover:scale-[1.02]"
                  >
                    Request a proposal <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </Reveal>

            <div className="mt-10 text-center text-xs text-zinc-500">© {year} • United Muslim Travels brand build</div>
          </Container>
        </section>

        <SeoContentFaq content={seoContent} faqs={seoFaqs} />
      </div>
    </>
  );
}


