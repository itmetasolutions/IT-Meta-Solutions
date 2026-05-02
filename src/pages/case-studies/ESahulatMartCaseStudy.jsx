import React, { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import SeoContentFaq from "../../components/SeoContentFaq";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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
  Megaphone,
  MessageSquareText,
  MousePointerClick,
  PackageCheck,
  Percent,
  ScrollText,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Target,
  Truck,
  Users,
  Wallet,
} from "lucide-react";
import SubpageVisualLayer from "../../components/SubpageVisualLayer";

/**
 * ESahulat Mart — Case Study (REDESIGNED to match new Home theme)
 * - Uses #5025d1 primary
 * - Glass + gradients + blobs like your Home page
 * - Scroll progress same as Home
 * - Reduced-motion safe reveals
 * - Equal-height cards (h-full + grid)
 * - Screenshot placeholders preserved
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

/* ==================== UI ATOMS ==================== */
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
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-[#5025d1] via-purple-500 to-pink-500"
      style={{ scaleX: scrollYProgress }}
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

function Pill({ icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-zinc-100 backdrop-blur-sm">
      {Icon ? <Icon className="h-3.5 w-3.5 opacity-90" /> : null}
      {children}
    </span>
  );
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

function Divider() {
  return <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />;
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
            ESahulat Mart — Brand Build
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
  { key: "website", label: "Website (E-commerce)", icon: LayoutGrid },
  { key: "paid", label: "Meta Ads (Sales Growth)", icon: Megaphone },
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

/* ==================== TAB PANELS ==================== */
function TabPanel({ active }) {
  if (active === "website") {
    return (
      <div className="grid gap-6">
        <Reveal>
          <SectionHeading
            badge="Website (E-commerce Foundation)"
            title={
              <>
                Fast shopping experience built for{" "}
                <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                  conversion
                </span>
              </>
            }
            description="A sales-focused e-commerce foundation: clean product discovery, clear pricing/offers, and a smooth cart → checkout flow — optimized for mobile buyers coming from Meta Ads."
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          <FeatureCard
            icon={LayoutGrid}
            title="Store structure"
            desc="Simple navigation that makes it easy to find essentials and purchase quickly."
            bullets={[
              "Home (offers + featured products)",
              "Product categories",
              "Product detail pages",
              "Cart & checkout flow",
              "Contact & support pages",
            ]}
            delay={0.05}
          />
          <FeatureCard
            icon={ShoppingCart}
            title="Conversion UX"
            desc="Clear CTAs and friction-reduction elements designed to improve checkout completion."
            bullets={["Buy Now", "Add to Cart", "Limited Stock", "Simple UX to reduce checkout friction"]}
            delay={0.1}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <FeatureCard
            icon={Gauge}
            title="Mobile-first shopping"
            desc="Most buyers come from mobile — layouts are optimized for fast browsing and checkout."
            bullets={["Mobile-first design", "Readable layout", "Fast product browsing", "Quick checkout flow"]}
            delay={0.05}
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Trust for first-time buyers"
            desc="Built-in trust signals to reduce hesitation and increase purchase confidence."
            bullets={["Clear pricing", "Support/contact access", "Offer clarity", "First-time buyer friendly UX"]}
            delay={0.1}
          />
          <FeatureCard
            icon={FileSearch}
            title="Ads-ready checkout path"
            desc="Designed as a landing hub for ads traffic → product → checkout."
            bullets={["Direct product paths", "Low distraction pages", "Fast add-to-cart", "Checkout-focused flow"]}
            delay={0.15}
          />
        </div>

        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#5025d1]/20 to-purple-600/20 p-6 backdrop-blur-sm">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <div className="text-sm font-semibold text-white">Website goals</div>
                <div className="mt-1 text-sm text-zinc-300">
                  Provide a fast buying experience, clearly show products/prices/offers, support direct ads traffic, and
                  build trust for first-time buyers.
                </div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
                <ChevronRight className="h-4 w-4" />
                Browse → cart → checkout
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
            badge="Meta Ads (Sales Growth)"
            title={
              <>
                Purchase-optimized funnel with{" "}
                <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                  controlled spend
                </span>
              </>
            }
            description="A sales-focused Meta Ads system with pixel tracking, conversion events, product retargeting, and purchase campaigns — enabling consistent daily orders and scalable ROAS without aggressive spend."
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          <FeatureCard
            icon={ShieldCheck}
            title="Meta + pixel setup"
            desc="Tracking and conversion foundations for purchase optimization."
            bullets={[
              "Meta Business Manager",
              "Ad account setup",
              "Pixel tracking",
              "Conversion events (ViewContent, AddToCart, Purchase)",
              "Campaign budget optimization (CBO)",
            ]}
            delay={0.05}
          />
          <FeatureCard
            icon={Target}
            title="Product targeting"
            desc="Buyer-intent audiences + retargeting to increase purchase volume."
            bullets={[
              "Product-based targeting",
              "Website visitors retargeting",
              "Add-to-cart retargeting",
              "Engagers retargeting",
            ]}
            delay={0.1}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <FeatureCard
            icon={Megaphone}
            title="Product awareness ads"
            desc="Short videos + images with offer hooks for fast product discovery."
            bullets={["Short product videos", "Offer-based hooks", "Price-focused creatives", "Simple product messaging"]}
            delay={0.05}
          />
          <FeatureCard
            icon={Users}
            title="Retargeting campaigns"
            desc="Warm audiences nurtured back to product pages and checkout."
            bullets={["Website visitors", "Add-to-cart users", "IG/FB engagers", "Offer reminders"]}
            delay={0.1}
          />
          <FeatureCard
            icon={MousePointerClick}
            title="Purchase campaigns"
            desc="Conversion-optimized ads designed for consistent sales."
            bullets={["Purchase objective", "Limited-time offers", "Clear “Order Now” CTA", "Checkout-driven creatives"]}
            delay={0.15}
          />
        </div>

        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#5025d1]/20 to-purple-600/20 p-6 backdrop-blur-sm">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <div className="text-sm font-semibold text-white">Performance snapshot (~3 months)</div>
                <div className="mt-1 text-sm text-zinc-300">
                  Daily spend: <span className="text-white font-semibold">800–1,200 PKR</span> • Duration:{" "}
                  <span className="text-white font-semibold">~3 months</span> • Cost per sale:{" "}
                  <span className="text-white font-semibold">~250–300 PKR</span> • Total sales:{" "}
                  <span className="text-white font-semibold">2+ lac PKR</span>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950">
                <PackageCheck className="h-4 w-4" />
                Profitable sales
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          <FeatureCard
            icon={MessageSquareText}
            title="Creative & copy system"
            desc="Simple, price-driven messaging built for local Pakistani buyers."
            bullets={[
              "Urdu + English mixed copy",
              "Clear pricing & offers",
              "Trust signals (COD, delivery)",
              "Real product visuals",
              "Strong CTAs (Order Now / Limited Offer)",
            ]}
            delay={0.05}
          />
          <FeatureCard
            icon={BarChart3}
            title="Optimization loop"
            desc="A repeatable method to improve ROAS while keeping spend controlled."
            bullets={["Budget scaling without spikes", "Retargeting for lower CPA", "Best-seller focus", "Creative rotation"]}
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
              Trust-building social presence for{" "}
              <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                everyday essentials
              </span>
            </>
          }
          description="Profiles + branding + a content system focused on products, offers, and proof — aligning organic content with paid ads for higher purchase confidence."
        />
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        <FeatureCard
          icon={Instagram}
          title="Platforms"
          desc="Daily essentials audiences across high-reach channels."
          bullets={["Instagram", "Facebook", "Local buyer trust content"]}
          delay={0.05}
        />
        <FeatureCard
          icon={ShieldCheck}
          title="Brand setup"
          desc="Optimized profiles and consistent visuals built for trust."
          bullets={["Bio + category", "Contact buttons", "Consistent colors", "Product visual style"]}
          delay={0.1}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <FeatureCard
          icon={CalendarDays}
          title="Content pillars"
          desc="Content designed to sell + build proof."
          bullets={["Product showcases", "Offers & discounts", "Order dispatch / trust posts", "Reels for awareness"]}
          delay={0.05}
        />
        <FeatureCard
          icon={ScrollText}
          title="Messaging"
          desc="Simple language that highlights value + delivery confidence."
          bullets={["Price-driven copy", "COD availability", "Fast delivery", "Clear CTAs (Order Now)"]}
          delay={0.1}
        />
        <FeatureCard
          icon={Percent}
          title="Highlights"
          desc="Quick access to offers, proof, and shopping categories."
          bullets={["Best Sellers", "Deals", "New Arrivals", "Customer Orders"]}
          delay={0.15}
        />
      </div>

      <Reveal>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#5025d1]/20 to-purple-600/20 p-6 backdrop-blur-sm">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold text-white">Why this works</div>
              <div className="mt-1 text-sm text-zinc-300">
                Trust content (orders + dispatch) + offer-led creatives makes cold audiences warmer — improving purchase rates
                and reducing cost per sale over time.
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
              <ChevronRight className="h-4 w-4" />
              Organic → purchase lift
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

const seoContent = {
  kicker: "Case Study",
  title: "Ecommerce Brand Build and Meta Ads Performance",
  subtitle:
    "E Sahulat Mart grew sales with a conversion-focused store, social content, and performance marketing.",
  paragraphs: [
    "We combined storefront optimization, clear product positioning, and Meta Ads testing to grow revenue with controlled spend.",
    "The result is a repeatable ecommerce growth system focused on ROAS and conversion rate improvements.",
  ],
  bullets: [
    "Meta Ads agency for ecommerce growth",
    "High-converting ecommerce website design",
    "Creative testing and offer optimization",
    "Conversion tracking and ROAS optimization",
  ],
};

const seoFaqs = [
  {
    q: "What was the primary outcome?",
    a: "The brand achieved 2+ lac PKR in sales with controlled daily ad spend.",
  },
  {
    q: "Which channels drove growth?",
    a: "Meta Ads and conversion-optimized ecommerce pages drove most results.",
  },
  {
    q: "Can this system scale for other stores?",
    a: "Yes. We tailor the funnel and creative strategy to product and market.",
  },
];

/* ==================== PAGE ==================== */
export default function ESahulatMartCaseStudy() {
  const reduced = usePrefersReducedMotion();
  const year = useMemo(() => new Date().getFullYear(), []);
  const [activeTab, setActiveTab] = useState("website");

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, reduced ? 0 : -70]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.9]);

  const heroRef = useRef(null);

  return (
    <>
      <Helmet>
        <title>E Sahulat Mart Case Study - E-commerce Sales Growth | IT Meta Solutions</title>
        <meta
          name="description"
          content="E Sahulat Mart case study: ecommerce brand build with Meta Ads delivering 2+ lac PKR sales and controlled spend."
        />
        <meta
          name="keywords"
          content="E Sahulat Mart, e-commerce case study, online store development, Meta Ads, social media marketing, Pakistan e-commerce, IT Meta Solutions"
        />
        <meta property="og:title" content="E Sahulat Mart Case Study - E-commerce Sales Growth | IT Meta Solutions" />
        <meta
          property="og:description"
          content="Complete brand build with website, social media, and Meta Ads generating 2+ lac PKR in sales with sustainable daily spend."
        />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://itmetasolutions.com/case-study/esahulat-mart" />
        <meta property="og:url" content="https://itmetasolutions.com/case-study/esahulat-mart" />
        <meta property="og:image" content="https://itmetasolutions.com/favicon.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="E Sahulat Mart Case Study - E-commerce Sales Growth | IT Meta Solutions" />
        <meta
          name="twitter:description"
          content="Complete brand build with website, social media, and Meta Ads generating 2+ lac PKR in sales with sustainable daily spend."
        />
        <meta name="twitter:image" content="https://itmetasolutions.com/favicon.webp" />
      </Helmet>

      <div className="itms-subpage relative min-h-screen overflow-hidden text-zinc-100">
        <SubpageVisualLayer />

        <ScrollProgress />

        {/* Background blobs (Home style) */}
        <GradientBlob className="left-[-120px] top-[-120px] h-[620px] w-[620px]" color="rgba(80,37,209,0.20)" />
        <GradientBlob className="right-[-180px] top-[180px] h-[720px] w-[720px]" color="rgba(186,85,211,0.14)" />
        <GradientBlob className="bottom-[-160px] left-[25%] h-[760px] w-[760px]" color="rgba(80,37,209,0.16)" />

        {/* HERO */}
        <section ref={heroRef} className="relative pt-24 pb-10 sm:pt-32 sm:pb-16">
          <Container>
            <motion.div style={{ y: heroY, opacity: heroOpacity }}>
              <Reveal>
                <div className="flex flex-wrap items-center gap-2">
                  <Pill icon={ShoppingBag}>E-commerce</Pill>
                  <Pill icon={Globe}>Pakistan</Pill>
                  <Pill icon={LayoutGrid}>Website</Pill>
                  <Pill icon={Instagram}>Social</Pill>
                  <Pill icon={Megaphone}>Meta Ads</Pill>
                  <Pill icon={ShoppingCart}>Sales Growth</Pill>
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <h1 className="mt-7 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  E Sahulat Mart — complete brand build for{" "}
                  <span className="bg-gradient-to-r from-[#5025d1] via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    daily sales growth
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="mt-5 max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                  A Pakistan-based general store e-commerce brand for daily essentials — built with a conversion-focused
                  website, trust-first social presence, and a purchase-optimized Meta Ads system to drive consistent orders at
                  low cost.
                </p>
              </Reveal>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard icon={LayoutGrid} label="Foundation" value="E-commerce website" delay={0.05} />
                <StatCard icon={Megaphone} label="Daily spend" value="800–1,200 PKR" delay={0.1} />
                <StatCard icon={Target} label="Cost per sale" value="250–300 PKR" delay={0.15} />
                <StatCard icon={Wallet} label="Sales generated" value="2+ lac PKR" delay={0.2} />
              </div>

              <Reveal delay={0.16}>
                <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-7 backdrop-blur-sm">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-2xl">
                      <div className="text-sm font-semibold text-white">Live website</div>
                      <div className="mt-1 text-sm text-zinc-300">
                        Use this page as your portfolio “Complete Brand Build” case study for E Sahulat Mart.
                      </div>
                    </div>

                    <a
                      href="https://esahulatmart.pk"
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5025d1] to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5025d1]/40 transition-all hover:shadow-xl hover:shadow-[#5025d1]/55 hover:scale-[1.02]"
                    >
                      Visit Website
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {[
                      { icon: ShoppingCart, title: "Checkout flow", desc: "Fast add-to-cart and smooth cart → checkout UX." },
                      { icon: Truck, title: "Trust signals", desc: "COD + delivery confidence cues for first-time buyers." },
                      { icon: BarChart3, title: "Purchase funnel", desc: "Pixel events + retargeting + purchase campaigns." },
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
                    A sales-driven daily essentials store built for{" "}
                    <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                      consistent orders
                    </span>
                  </>
                }
                description="This build focused on conversion UX, trust on social, and a purchase-optimized Meta Ads system that scales sales steadily on controlled spend."
              />
            </Reveal>

            <div className="grid gap-6 lg:grid-cols-3">
              <FeatureCard
                icon={ShoppingBag}
                title="Industry"
                desc="E-commerce • General Store • Daily Essentials"
                bullets={["Daily-use products", "Price-sensitive market", "Trust-first buying behavior"]}
                delay={0.05}
              />
              <FeatureCard
                icon={LayoutGrid}
                title="Scope"
                desc="Website • Social • Meta Ads • Sales Growth"
                bullets={["E-commerce website", "IG/FB trust content", "Pixel + conversion events", "Purchase funnel"]}
                delay={0.1}
              />
              <FeatureCard
                icon={ShieldCheck}
                title="Objectives"
                desc="Conversion + trust + profitable sales"
                bullets={["Conversion-focused store", "Trust on Instagram & Facebook", "Performance Meta Ads system", "Low cost per purchase"]}
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
                description="Switch between Website (E-commerce), Meta Ads (Sales Growth), and Social Media — each tab shows the structure, features, and outcomes."
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
                description="These placeholders match recommended sizes so you can swap images later (website, product page, mobile, social, and Ads Manager)."
              />
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <Reveal delay={0.05}>
                <Shot title="[WEBSITE HOME PAGE]" size="1920 × 1080 (Desktop)" comment="Offers, featured products & trust messaging" />
              </Reveal>
              <Reveal delay={0.1}>
                <Shot title="[PRODUCT DETAIL PAGE]" size="1440 × 900" comment="Product images, pricing & buy CTA" />
              </Reveal>
              <Reveal delay={0.15}>
                <Shot title="[MOBILE SHOPPING VIEW]" size="390 × 844" comment="Mobile-first product browsing & checkout" />
              </Reveal>
              <Reveal delay={0.2}>
                <Shot title="[INSTAGRAM PROFILE]" size="1080 × 1080" comment="Bio, highlights & product grid" />
              </Reveal>
              <Reveal delay={0.25}>
                <Shot title="[PRODUCT REELS]" size="1080 × 1920" comment="Short reels showing product usage & offers" />
              </Reveal>
              <Reveal delay={0.3}>
                <Shot title="[FACEBOOK PAGE]" size="1200 × 630" comment="Page layout & recent posts" />
              </Reveal>
              <Reveal delay={0.35}>
                <Shot title="[ADS MANAGER DASHBOARD]" size="1920 × 1080" comment="Spend, purchases & ROAS overview" />
              </Reveal>
              <Reveal delay={0.4}>
                <Shot title="[PURCHASE EVENTS]" size="1440 × 900" comment="Conversion tracking & cost per sale" />
              </Reveal>
              <Reveal delay={0.45}>
                <Shot title="[PRODUCT AD PREVIEW]" size="1080 × 1920" comment="Sales-focused product creative" />
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
                    2+ lac PKR in sales with a{" "}
                    <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                      sustainable daily spend model
                    </span>
                  </>
                }
                description="A complete e-commerce brand presence (website + social + ads) with purchase tracking, retargeting, and consistent daily orders — achieving profitable cost per sale on controlled budgets."
                centered
              />
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatCard icon={Wallet} label="Sales generated" value="2+ lac PKR" delay={0.05} />
              <StatCard icon={CalendarDays} label="Campaign duration" value="~3 months" delay={0.1} />
              <StatCard icon={Target} label="Cost per sale" value="250–300 PKR" delay={0.15} />
              <StatCard icon={Megaphone} label="Daily ad spend" value="800–1,200 PKR" delay={0.2} />
            </div>

            <Reveal delay={0.15}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#5025d1]/20 to-purple-600/20 p-7 backdrop-blur-sm">
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                  <div className="max-w-2xl">
                    <div className="text-sm font-semibold text-white">Scalable next steps</div>
                    <div className="mt-1 text-sm text-zinc-300">
                      Scale by expanding best-seller campaigns, adding bundle offers, and increasing retargeting coverage —
                      while keeping budgets controlled to protect ROAS.
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

            <div className="mt-10 text-center text-xs text-zinc-500">© {year} • E Sahulat Mart brand build</div>
          </Container>
        </section>

        <SeoContentFaq content={seoContent} faqs={seoFaqs} />
      </div>
    </>
  );
}

