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
  MapPin,
  Megaphone,
  MessageSquareText,
  MousePointerClick,
  Phone,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wallet,
} from "lucide-react";
import SubpageVisualLayer from "../../components/SubpageVisualLayer";

/**
 * Halla Gulla — Case Study (REDESIGNED to match your NEW Home style)
 * - Primary: #1D4ED8
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

function GradientBlob({ className, color = "rgba(29,78,216,0.22)" }) {
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
        <div className="rounded-xl bg-gradient-to-br from-[#1D4ED8] to-blue-600 p-3">
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
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-[#1D4ED8]/20 to-blue-600/20 blur-3xl transition-all group-hover:scale-150" />
      <div className="relative flex h-full flex-col">
        <div className="mb-4 flex items-center gap-3">
          <div className="inline-flex rounded-2xl bg-gradient-to-br from-[#1D4ED8] to-blue-600 p-3">
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
  { label: "Results", href: "#results" },
];

function StickySubnav() {
  return (
    <div className="sticky top-[72px] z-40 border-b border-white/10 bg-black/50 backdrop-blur">
      <Container className="py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-300">
            <Landmark className="h-4 w-4 text-[#1D4ED8]" />
            Halla Gulla — Brand Build
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
  { key: "website", label: "Website (Foundation)", icon: LayoutGrid },
  { key: "paid", label: "Meta Ads (Lead Gen)", icon: Megaphone },
  { key: "social", label: "Social Media (IG/FB)", icon: Instagram },
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
            badge="Website (Foundation)"
            title={
              <>
                A visual travel hub built for{" "}
                <span className="bg-gradient-to-r from-[#1D4ED8] to-blue-500 bg-clip-text text-transparent">
                  excitement + fast inquiries
                </span>
              </>
            }
            description="The website was built as the brand foundation: destinations, tours, gallery, transport, and quick inquiry paths — optimized for mobile-first traffic coming from Instagram, Facebook, and ads."
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          <FeatureCard
            icon={LayoutGrid}
            title="Site structure"
            desc="Simple, conversion-friendly navigation for travel browsing."
            bullets={[
              "Home (brand vibe + destinations)",
              "Destinations pages",
              "Tours & packages",
              "Gallery",
              "Transport / cars section",
              "Contact & inquiry page",
            ]}
            delay={0.05}
          />
          <FeatureCard
            icon={MousePointerClick}
            title="Clear CTAs"
            desc="Designed to reduce friction and turn interest into inquiry."
            bullets={["Book Your Trip", "Explore Destinations", "Contact Us", "WhatsApp-friendly inquiry flow"]}
            delay={0.1}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <FeatureCard
            icon={Gauge}
            title="Mobile-first UX"
            desc="Most travel audiences browse on mobile — built for quick scanning and one-tap action."
            bullets={["Mobile-first layout", "Fast sections", "Clear headings", "Low-friction inquiry paths"]}
            delay={0.05}
          />
          <FeatureCard
            icon={Images}
            title="Visual storytelling"
            desc="Travel sells with visuals — the experience is image-led and vibe-focused."
            bullets={["Hero destination visuals", "Gallery section", "Destination listings", "Tour highlights"]}
            delay={0.1}
          />
          <FeatureCard
            icon={FileSearch}
            title="Ads-ready pages"
            desc="Built as a landing hub for paid traffic with minimal distractions."
            bullets={["Clean layout", "Strong CTAs", "Tour & destination clarity", "Quick contact options"]}
            delay={0.15}
          />
        </div>

        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#1D4ED8]/20 to-blue-600/20 p-6 backdrop-blur-sm">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <div className="text-sm font-semibold text-white">Website goals</div>
                <div className="mt-1 text-sm text-zinc-300">
                  Showcase destinations & tours, build travel excitement through visuals, and convert traffic into inquiries
                  using clear “Book Your Trip” actions.
                </div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
                <ChevronRight className="h-4 w-4" />
                Browse → inquire
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
            badge="Meta Ads (Lead Gen)"
            title={
              <>
                Awareness → retargeting →{" "}
                <span className="bg-gradient-to-r from-[#1D4ED8] to-blue-500 bg-clip-text text-transparent">
                  leads funnel
                </span>{" "}
                on a controlled budget
              </>
            }
            description="A complete Meta Ads setup with travel-interest targeting and lead capture through WhatsApp + instant lead forms — validated lead volume and CPL using a controlled 3-day test."
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          <FeatureCard
            icon={ShieldCheck}
            title="Meta setup"
            desc="Performance-ready configuration so tracking and lead capture stays reliable."
            bullets={[
              "Meta Business Manager",
              "Ad account configuration",
              "Audience targeting (travel interest based)",
              "WhatsApp integration",
              "Instant lead form integration",
              "Campaign tracking & optimization",
            ]}
            delay={0.05}
          />
          <FeatureCard
            icon={Target}
            title="Targeting approach"
            desc="Built around travel intent for Pakistan tourism."
            bullets={[
              "Travel & tourism interests",
              "Northern areas intent",
              "Engagers retargeting (IG/FB)",
              "Video viewers retargeting",
            ]}
            delay={0.1}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <FeatureCard
            icon={Megaphone}
            title="Awareness campaign"
            desc="Destination visuals and short reels for fast traction."
            bullets={["Destination visuals", "Short reels", "Youth hooks", "Brand vibe storytelling"]}
            delay={0.05}
          />
          <FeatureCard
            icon={Users}
            title="Engagement retargeting"
            desc="Warm audiences who interacted were retargeted with stronger offers."
            bullets={["Video viewers", "Instagram engagers", "Facebook engagers", "Profile visitors"]}
            delay={0.1}
          />
          <FeatureCard
            icon={MousePointerClick}
            title="Lead campaigns"
            desc="Conversion ads optimized for inquiries and booking intent."
            bullets={["Click-to-WhatsApp", "Instant lead forms", "Clear “Book Your Trip” message", "Offer + urgency hooks"]}
            delay={0.15}
          />
        </div>

        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#1D4ED8]/20 to-blue-600/20 p-6 backdrop-blur-sm">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <div className="text-sm font-semibold text-white">Performance snapshot (3-day test)</div>
                <div className="mt-1 text-sm text-zinc-300">
                  Total spend: <span className="text-white font-semibold">5,500 PKR</span> • Duration:{" "}
                  <span className="text-white font-semibold">3 days</span> • Leads:{" "}
                  <span className="text-white font-semibold">67</span> • Cost per lead:{" "}
                  <span className="text-white font-semibold">~78 PKR</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950">
                <Wallet className="h-4 w-4" />
                Low CPL validated
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          <FeatureCard
            icon={MessageSquareText}
            title="Creative & copy system"
            desc="Energetic, youth-focused tone with travel hooks + clear value."
            bullets={[
              "Affordable trips messaging",
              "Group & family tours angle",
              "Scenic destinations highlights",
              "Urgency CTAs (Limited Seats / Book Now)",
              "Visual-first storytelling",
            ]}
            delay={0.05}
          />
          <FeatureCard
            icon={BarChart3}
            title="Lead capture & handling"
            desc="Leads routed to WhatsApp and forms for fast response and better close rates."
            bullets={[
              "WhatsApp inquiries",
              "Instant Meta lead forms",
              "High-intent routing",
              "Scalable for seasonal travel campaigns",
            ]}
            delay={0.1}
          />
        </div>
      </div>
    );
  }

  // SOCIAL
  return (
    <div className="grid gap-6">
      <Reveal>
        <SectionHeading
          badge="Social Media (IG/FB)"
          title={
            <>
              A youthful, energetic travel identity built for{" "}
              <span className="bg-gradient-to-r from-[#1D4ED8] to-blue-500 bg-clip-text text-transparent">
                consistency
              </span>
            </>
          }
          description="Profiles optimized, content pillars set, and highlight categories created to support conversion — aligning organic storytelling with paid messaging for stronger recall."
        />
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        <FeatureCard
          icon={Instagram}
          title="Platforms"
          desc="Brand presence across high-intent channels."
          bullets={["Instagram", "Facebook", "WhatsApp-first inquiry behavior"]}
          delay={0.05}
        />
        <FeatureCard
          icon={ShieldCheck}
          title="Brand setup"
          desc="Profiles optimized for clarity, trust, and quick action."
          bullets={["Bio + category", "CTA buttons", "Consistent brand colors", "Travel visual style"]}
          delay={0.1}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <FeatureCard
          icon={CalendarDays}
          title="Content pillars"
          desc="Content designed to inspire, inform, and convert."
          bullets={["Destination showcases", "Tour promotions", "Travel reels", "Engagement content (polls/Q&A)"]}
          delay={0.05}
        />
        <FeatureCard
          icon={ScrollText}
          title="Tone & messaging"
          desc="Youthful hooks + clear value in short, scannable formats."
          bullets={["Energetic voice", "Visual-first storytelling", "Clear offers", "Strong CTAs"]}
          delay={0.1}
        />
        <FeatureCard
          icon={MapPin}
          title="Highlights structure"
          desc="Highlights organized around travel intent for fast browsing."
          bullets={["Tours", "Destinations", "Gallery", "Transport"]}
          delay={0.15}
        />
      </div>

      <Reveal>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#1D4ED8]/20 to-blue-600/20 p-6 backdrop-blur-sm">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold text-white">Why this works</div>
              <div className="mt-1 text-sm text-zinc-300">
                Consistent travel identity + strong visuals makes audiences warmer — improving retargeting performance and
                reducing lead costs over time.
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
  title: "Travel Brand Leads via Meta Ads and Conversion UX",
  subtitle:
    "Halla Gulla generated 67 travel leads in 3 days with a conversion-focused funnel and Meta Ads.",
  paragraphs: [
    "We built a travel brand system with clear offers, WhatsApp-first flows, and lead-ready landing pages.",
    "Meta Ads testing delivered fast lead volume with controlled spend.",
  ],
  bullets: [
    "Lead generation services with Meta Ads",
    "High-converting landing pages for travel",
    "Offer positioning and urgency CTAs",
    "WhatsApp-first inquiry flows",
  ],
};

const seoFaqs = [
  {
    q: "How many leads were generated?",
    a: "We generated 67 potential leads within a 3-day campaign.",
  },
  {
    q: "What drove the results?",
    a: "Meta Ads combined with clear offers and fast WhatsApp inquiry flows.",
  },
  {
    q: "Can this approach work for other travel brands?",
    a: "Yes. We can replicate the funnel with new offers and seasonal campaigns.",
  },
];

/* ==================== PAGE ==================== */
export default function HallaGullaCaseStudy() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [activeTab, setActiveTab] = useState("website");

  const heroRef = useRef(null);

  return (
    <>
      <Helmet>
        <title>Halla Gulla Case Study - Complete Travel Brand Build | IT Meta Solutions</title>
        <meta
          name="description"
          content="Halla Gulla case study: travel brand build with Meta Ads generating 67 leads in 3 days."
        />
        <meta
          name="keywords"
          content="Halla Gulla, travel brand case study, Pakistan tourism, Meta Ads, social media marketing, website development, travel agency branding, IT Meta Solutions"
        />
        <meta property="og:title" content="Halla Gulla Case Study - Complete Travel Brand Build | IT Meta Solutions" />
        <meta
          property="og:description"
          content="Website development, social media management, and Meta Ads generating 67 leads in 3 days."
        />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://itmetasolutions.com/case-study/halla-gulla" />
        <meta property="og:url" content="https://itmetasolutions.com/case-study/halla-gulla" />
        <meta property="og:image" content="https://itmetasolutions.com/favicon.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Halla Gulla Case Study - Complete Travel Brand Build | IT Meta Solutions" />
        <meta
          name="twitter:description"
          content="Website development, social media management, and Meta Ads generating 67 leads in 3 days."
        />
        <meta name="twitter:image" content="https://itmetasolutions.com/favicon.webp" />
      </Helmet>

      <div className="itms-subpage relative min-h-screen overflow-hidden text-zinc-100">
        <SubpageVisualLayer />

        <ScrollProgress />

        {/* Background blobs (Home style) */}
        <GradientBlob className="left-[-140px] top-[-140px] h-[640px] w-[640px]" color="rgba(29,78,216,0.20)" />
        <GradientBlob className="right-[-180px] top-[180px] h-[740px] w-[740px]" color="rgba(35,166,232,0.14)" />
        <GradientBlob className="bottom-[-170px] left-[20%] h-[780px] w-[780px]" color="rgba(29,78,216,0.16)" />

        {/* HERO */}
        <section ref={heroRef} className="relative pt-24 pb-10 sm:pt-32 sm:pb-16">
          <Container>
            <motion.div>
              <Reveal>
                <Badge icon={Sparkles}>Complete Brand Build — Pakistan Tourism</Badge>
              </Reveal>

              <Reveal delay={0.06}>
                <h1 className="mt-7 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  Halla Gulla — complete travel brand build across{" "}
                  <span className="bg-gradient-to-r from-[#1D4ED8] via-blue-500 to-pink-500 bg-clip-text text-transparent">
                    website, social & Meta Ads
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="mt-5 max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                  A youthful, energetic tours & travel brand focused on Pakistan tourism — built for digital visibility,
                  strong travel storytelling, and a performance-driven lead system to generate real inquiries at low cost.
                </p>
              </Reveal>

              <Reveal delay={0.16} className="mt-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Pill icon={Globe}>Pakistan tourism</Pill>
                  <Pill icon={LayoutGrid}>Website</Pill>
                  <Pill icon={Instagram}>Social</Pill>
                  <Pill icon={Megaphone}>Meta Ads</Pill>
                  <Pill icon={ShieldCheck}>Lead generation</Pill>
                </div>
              </Reveal>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <StatCard icon={LayoutGrid} label="Foundation" value="Modern travel website" delay={0.05} />
                <StatCard icon={Instagram} label="Presence" value="IG + Facebook" delay={0.1} />
                <StatCard icon={Megaphone} label="Performance" value="67 leads (3 days)" delay={0.15} />
              </div>

              <Reveal delay={0.18}>
                <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-7 backdrop-blur-sm">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-2xl">
                      <div className="text-sm font-semibold text-white">Live website</div>
                      <div className="mt-1 text-sm text-zinc-300">
                        Use this page as your portfolio “Complete Brand Build” case study for Halla Gulla.
                      </div>
                    </div>

                    <a
                      href="https://hallagulla.pk"
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1D4ED8] to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1D4ED8]/40 transition-all hover:shadow-xl hover:shadow-[#1D4ED8]/55 hover:scale-[1.02]"
                    >
                      Visit Website
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {[
                      { icon: MapPin, title: "Destinations", desc: "Northern areas listings + travel vibe layout." },
                      { icon: Phone, title: "Quick inquiry", desc: "Fast contact + WhatsApp-friendly actions." },
                      { icon: BarChart3, title: "Ads funnel", desc: "Awareness → retargeting → leads system." },
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

        {/* Sticky anchors */}
        <StickySubnav />

        {/* OVERVIEW */}
        <section id="overview" className="scroll-mt-24 py-16 sm:py-20">
          <Container>
            <Reveal>
              <SectionHeading
                badge="Brand overview"
                title={
                  <>
                    Youthful travel brand with a{" "}
                    <span className="bg-gradient-to-r from-[#1D4ED8] to-blue-500 bg-clip-text text-transparent">
                      full-funnel lead engine
                    </span>
                  </>
                }
                description="Halla Gulla offers northern areas tours, group trips, family tours, and customized travel experiences. This build focused on a conversion-ready website, consistent social identity, and a repeatable Meta Ads funnel that generates qualified inquiries at low cost."
              />
            </Reveal>

            <div className="grid gap-6 lg:grid-cols-3">
              <FeatureCard
                icon={Globe}
                title="Industry"
                desc="Tours • Travel • Pakistan Tourism"
                bullets={["Youth-focused vibe", "Visual storytelling", "Seasonal & destination-driven demand"]}
                delay={0.05}
              />
              <FeatureCard
                icon={LayoutGrid}
                title="Scope"
                desc="Website • Social • Meta Ads • Lead Gen"
                bullets={["Modern website structure", "IG/FB brand setup", "Meta funnel build", "WhatsApp + lead forms"]}
                delay={0.1}
              />
              <FeatureCard
                icon={ShieldCheck}
                title="Objectives"
                desc="Visibility + excitement + inquiries"
                bullets={["Recognizable brand", "Mobile-first website", "Awareness → leads funnel", "Low-budget validation"]}
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
                    <span className="bg-gradient-to-r from-[#1D4ED8] to-blue-500 bg-clip-text text-transparent">
                      three deliverables
                    </span>
                  </>
                }
                description="Switch between Website, Meta Ads, and Social Media — each tab shows the structure, features, and outcomes."
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



        {/* RESULTS */}
        <section id="results" className="scroll-mt-24 py-16 sm:py-20 pb-24">
          <Container>
            <Reveal>
              <SectionHeading
                badge="Results"
                title={
                  <>
                    67 potential leads in{" "}
                    <span className="bg-gradient-to-r from-[#1D4ED8] to-blue-500 bg-clip-text text-transparent">
                      3 days
                    </span>{" "}
                    on a controlled test budget
                  </>
                }
                description="A complete brand presence (website + social + ads) with a validated Meta funnel generating travel inquiries via WhatsApp and instant lead forms at a very cost-effective CPL."
                centered
              />
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatCard icon={Wallet} label="Total ad spend" value="5,500 PKR" delay={0.05} />
              <StatCard icon={CalendarDays} label="Campaign duration" value="3 days" delay={0.1} />
              <StatCard icon={Users} label="Potential leads" value="67" delay={0.15} />
              <StatCard icon={Target} label="Cost per lead" value="~78 PKR" delay={0.2} />
            </div>

            <Reveal delay={0.16}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#1D4ED8]/20 to-blue-600/20 p-7 backdrop-blur-sm">
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                  <div className="max-w-2xl">
                    <div className="text-sm font-semibold text-white">Scalable next steps</div>
                    <div className="mt-1 text-sm text-zinc-300">
                      Scale seasonally by duplicating the funnel and swapping destination offers, creatives, and landing page
                      sections for peak travel windows.
                    </div>
                  </div>

                  <a
                    href="/contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1D4ED8] shadow-lg transition-all hover:scale-[1.02]"
                  >
                    Request a proposal
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </Reveal>

            <div className="mt-10 text-center text-xs text-zinc-500">© {year} • Halla Gulla brand build</div>
          </Container>
        </section>

        <SeoContentFaq content={seoContent} faqs={seoFaqs} />
      </div>
    </>
  );
}


