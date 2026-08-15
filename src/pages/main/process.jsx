import React, { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useInView } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  FileText,
  Gauge,
  LayoutGrid,
  Megaphone,
  MessageSquareText,
  Phone,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wand2,
  Workflow,
  Layers,
  Settings2,
  PenTool,
  MonitorSmartphone,
  RefreshCw,
  ClipboardCheck,
  Zap,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import SeoContentFaq from "../../components/SeoContentFaq";
import Container from "../../components/Container";

const cx = (...c) => c.filter(Boolean).join(" ");

/* ==================== HELPERS ==================== */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  React.useEffect(() => {
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

function LightCard({ icon: Icon, color = "#1D4ED8", title, desc, bullets }) {
  return (
    <div className="premium-card h-full rounded-2xl p-6">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: `${color}15` }}>
        <Icon className="h-5 w-5" style={{ color }} />
      </div>
      <h3 className="mb-2 text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-slate-600">{desc}</p>
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
  );
}

/* ==================== STEP ==================== */

function Step({ num, icon: Icon, title, desc, bullets, color = "#1D4ED8" }) {
  return (
    <div className="premium-card rounded-2xl p-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: `${color}15` }}>
            <Icon className="h-6 w-6" style={{ color }} />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className="rounded-full px-2.5 py-1 text-xs font-bold"
              style={{ backgroundColor: `${color}15`, color }}
            >
              Step {num}
            </span>
            <h3 className="text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
              {title}
            </h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
          {bullets?.length ? (
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <BadgeCheck className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color }} />
                  {b}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* ==================== DELIVERABLE ROW ==================== */

function DeliverableRow({ title, items, color = "#1D4ED8" }) {
  return (
    <div className="premium-card rounded-2xl p-6">
      <div className="text-sm font-bold text-slate-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
        {title}
      </div>
      <ul className="grid gap-2 sm:grid-cols-2">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
            <BadgeCheck className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color }} />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ==================== FAQ ITEM ==================== */

function FAQItem({ q, a }) {
  return (
    <details className="group premium-card rounded-2xl p-5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
        <div className="text-sm font-semibold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>{q}</div>
        <ChevronRight className="h-4 w-4 flex-shrink-0 text-slate-400 transition group-open:rotate-90" />
      </summary>
      <div className="mt-3 text-sm text-slate-600 leading-relaxed">{a}</div>
    </details>
  );
}

/* ==================== MODE PANELS ==================== */

const modes = [
  { key: "brand", label: "Brand Building", icon: Wand2 },
  { key: "marketing", label: "Paid Marketing", icon: Megaphone },
  { key: "web", label: "Web Development", icon: MonitorSmartphone },
  { key: "content", label: "Content & Social", icon: Layers },
];

const MODE_COLORS = { brand: "#1D4ED8", marketing: "#23A6E8", web: "#3AC9F5", content: "#1D4ED8" };

function ModePanel({ mode }) {
  const color = MODE_COLORS[mode];

  if (mode === "brand") {
    return (
      <div className="grid gap-4 lg:grid-cols-3">
        <LightCard color={color} icon={Wand2} title="Brand foundation" desc="Positioning + identity system that makes you instantly recognizable." bullets={["Brand story & messaging", "Logo + colors + typography", "Templates & consistency rules"]} />
        <LightCard color={color} icon={LayoutGrid} title="Conversion hub" desc="Website and landing pages that turn attention into leads/sales." bullets={["Ads-ready landing pages", "WhatsApp/contact flows", "Tracking foundations"]} />
        <LightCard color={color} icon={Target} title="Growth loop" desc="Organic + paid plan to build trust and scale performance." bullets={["Content pillars", "Retargeting pools", "Offer + creative testing"]} />
      </div>
    );
  }

  if (mode === "marketing") {
    return (
      <div className="grid gap-4 lg:grid-cols-3">
        <LightCard color={color} icon={Megaphone} title="Funnel build" desc="Awareness → retargeting → conversion, aligned to your product/service." bullets={["Campaign structure", "Audience segmentation", "Offer angles"]} />
        <LightCard color={color} icon={BarChart3} title="Tracking" desc="Pixel/events + reporting so optimization is data-driven." bullets={["Lead/Purchase events", "UTM + analytics", "Weekly optimization notes"]} />
        <LightCard color={color} icon={RefreshCw} title="Creative testing" desc="Test hooks, visuals, and CTAs to drop CPA and scale." bullets={["Multiple variations", "Winners scaling", "Creative rotation system"]} />
      </div>
    );
  }

  if (mode === "web") {
    return (
      <div className="grid gap-4 lg:grid-cols-3">
        <LightCard color={color} icon={MonitorSmartphone} title="UI/UX" desc="Modern pages designed for mobile-first conversion." bullets={["Wireframe + layout", "CTA placement", "Speed & readability"]} />
        <LightCard color={color} icon={Gauge} title="Build & launch" desc="Fast, clean implementation with best practices." bullets={["Responsive build", "SEO basics", "Hosting + deployment"]} />
        <LightCard color={color} icon={ShieldCheck} title="Integrations" desc="Forms, WhatsApp, tracking and automations." bullets={["WhatsApp click-to-chat", "Email notifications", "Pixel/events setup"]} />
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <LightCard color={color} icon={Layers} title="Content system" desc="Monthly plan with consistent pillars, formats, and brand style." bullets={["Calendars", "Pillars + themes", "Posting cadence"]} />
      <LightCard color={color} icon={MessageSquareText} title="Copy & hooks" desc="Messaging designed to build trust and trigger action." bullets={["Urdu/English mix (optional)", "CTA frameworks", "Objection handling"]} />
      <LightCard color={color} icon={Rocket} title="Distribution" desc="Reels-first workflow with repurposing for all platforms." bullets={["9:16 first", "Stories + highlights", "Boost-ready creatives"]} />
    </div>
  );
}

/* ==================== SEO DATA ==================== */

const seoContent = {
  kicker: "Our Workflow",
  title: "A Proven Process for Salesforce, Ecommerce, and Performance Growth",
  subtitle: "Our workflow covers Salesforce implementation, LWC development, Experience Cloud portals, and performance-optimized Shopify and WooCommerce builds.",
  paragraphs: [
    "We plan discovery, design, build, and launch in structured sprints so Salesforce automation, CRM data cleaning, and web development stay aligned.",
    "For performance marketing, we set up tracking, creative testing, and ROAS optimization so Meta Ads scale with confidence.",
  ],
  bullets: [
    "Salesforce automation experts and CRM data cleanup",
    "Experience Cloud and LWC delivery in staged releases",
    "Fast-loading ecommerce builds with CRO checkpoints",
    "Meta Ads launch, testing, and ongoing optimization",
  ],
};

const inPageNav = [
  { label: "Overview", href: "#overview" },
  { label: "Steps", href: "#steps" },
  { label: "Engagement Types", href: "#modes" },
  { label: "Deliverables", href: "#deliverables" },
  { label: "FAQ", href: "#faq" },
];

/* ==================== PAGE ==================== */

export default function ProcessPage() {
  const reduced = usePrefersReducedMotion();
  const [mode, setMode] = useState("brand");

  return (
    <>
      <Helmet>
        <title>IT Meta Solutions - Our Process | How We Deliver Results</title>
        <meta name="description" content="Our process for Salesforce implementation, LWC, Experience Cloud, ecommerce builds, and performance marketing." />
        <meta property="og:title" content="IT Meta Solutions - Our Process | How We Deliver Results" />
        <meta property="og:description" content="Discover IT Meta Solutions' proven process for web development, digital marketing, and branding projects." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://itmetasolutions.com/process" />
        <meta property="og:url" content="https://itmetasolutions.com/process" />
        <meta property="og:image" content="https://itmetasolutions.com/favicon.webp" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {!reduced && <ScrollProgress />}

      {/* ==================== HERO (dark) ==================== */}
      <section className="relative bg-[#141A2E] overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="absolute inset-0 dot-grid-bg opacity-25 pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#1D4ED8]/10 blur-[120px] pointer-events-none" />

        <Container>
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={reduced ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {[
                { icon: Workflow, label: "Clear process" },
                { icon: ShieldCheck, label: "Trust-first execution" },
                { icon: Target, label: "Performance-driven" },
                { icon: ClipboardCheck, label: "Weekly deliverables" },
              ].map((b) => (
                <span key={b.label} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-slate-300">
                  <b.icon className="h-3.5 w-3.5 text-[#3AC9F5]" />
                  {b.label}
                </span>
              ))}
            </motion.div>

            <motion.h1
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={reduced ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              A simple process that builds
              <br />
              <span className="animated-gradient-text">trust, speed &amp; results</span>
            </motion.h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={reduced ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-slate-400 max-w-2xl"
            >
              From discovery to launch and optimization — our workflow is designed to move fast, keep you in control, and deliver outcomes (leads, sales, growth).
            </motion.p>

            {/* 3 overview cards */}
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={reduced ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 grid gap-4 sm:grid-cols-3"
            >
              {[
                { icon: ClipboardList, title: "1) Plan", desc: "We align goals, audience, and deliverables.", bullets: ["Discovery call", "Scope & timeline", "KPI targets"], color: "#1D4ED8" },
                { icon: Rocket, title: "2) Build & Launch", desc: "We execute quickly with clean approvals.", bullets: ["Design/build", "Tracking setup", "Launch checklist"], color: "#23A6E8" },
                { icon: RefreshCw, title: "3) Optimize", desc: "We improve based on real data.", bullets: ["Weekly reporting", "Creative testing", "Scaling plan"], color: "#3AC9F5" },
              ].map((card) => (
                <div key={card.title} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-sm">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${card.color}30` }}>
                    <card.icon className="h-5 w-5" style={{ color: card.color }} />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1" style={{ fontFamily: "var(--font-heading)" }}>{card.title}</h3>
                  <p className="text-xs text-slate-400 mb-3">{card.desc}</p>
                  <ul className="space-y-1.5">
                    {card.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-xs text-slate-300">
                        <div className="h-1 w-1 rounded-full flex-shrink-0" style={{ backgroundColor: card.color }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>

            {/* Quick CTA */}
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={reduced ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href="https://wa.me/923271804037"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#141A2E] shadow-lg transition-all hover:scale-105"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                WhatsApp Us <Phone className="h-4 w-4" />
              </a>
              <Link
                to="/contact"
                className="btn-ghost-dark"
              >
                Get a Proposal <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ==================== BANNER IMAGE (white) ==================== */}
      <section className="bg-white py-12">
        <Container>
          <div className="relative h-60 sm:h-72 overflow-hidden rounded-3xl shadow-xl shadow-slate-200">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80"
              alt="Our Process"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1D4ED8]/70 via-[#141A2E]/30 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8 sm:px-12">
              <div>
                <p className="text-white/80 text-sm font-medium mb-2">Our proven methodology</p>
                <p className="text-white text-2xl font-bold sm:text-3xl max-w-xs" style={{ fontFamily: "var(--font-heading)" }}>
                  From kickoff to scale
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ==================== STICKY SUBNAV (white) ==================== */}
      <div className="sticky top-[64px] z-40 border-b border-slate-100 bg-white/95 backdrop-blur-sm shadow-sm">
        <Container className="py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500">
              <Workflow className="h-3.5 w-3.5 text-[#1D4ED8]" />
              Our Process
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {inPageNav.map((n) => (
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
            <span className="kicker">How we work</span>
            <h2
              className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              No confusion. Clear steps. Clear approvals.
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">
              We keep the process structured so you always know what's happening, what you need to approve, and what results we're targeting.
            </p>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-3">
            <Reveal delay={0.05}>
              <LightCard color="#1D4ED8" icon={ShieldCheck} title="Communication" desc="You get clean updates without noise." bullets={["WhatsApp + email updates", "Weekly check-ins", "Approval checkpoints"]} />
            </Reveal>
            <Reveal delay={0.1}>
              <LightCard color="#23A6E8" icon={Target} title="Performance focus" desc="Everything points toward results." bullets={["KPIs defined early", "Testing system", "Optimization roadmap"]} />
            </Reveal>
            <Reveal delay={0.15}>
              <LightCard color="#3AC9F5" icon={FileText} title="Documentation" desc="Your brand stays organized." bullets={["Brand assets folder", "Access list", "Monthly reports"]} />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ==================== STEPS (mist) ==================== */}
      <section id="steps" className="scroll-mt-28 bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Step-by-step</span>
            <h2
              className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              From kickoff to scale
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">
              A proven workflow used across brand builds, e-commerce, travel, and lead generation projects.
            </p>
          </Reveal>

          <div className="grid gap-4">
            {[
              { num: "01", icon: Search, title: "Discovery & goals", color: "#1D4ED8", desc: "We understand your business, audience, competitors, and define what success looks like.", bullets: ["Business audit", "Audience & offer mapping", "KPIs (leads/sales/ROAS)", "Scope finalized"] },
              { num: "02", icon: ClipboardList, title: "Strategy & plan", color: "#23A6E8", desc: "We create the execution plan: funnel, content pillars, website requirements, and timelines.", bullets: ["Funnel plan", "Content pillars", "Website pages map", "Creative direction", "Timeline & deliverables"] },
              { num: "03", icon: PenTool, title: "Creative production", color: "#3AC9F5", desc: "Design and content assets are produced in batches so execution stays consistent.", bullets: ["Design templates", "Ad creative variations", "Copywriting hooks", "Reels scripts (if needed)"] },
              { num: "04", icon: MonitorSmartphone, title: "Build (website/store/landing)", color: "#1D4ED8", desc: "We build the website or landing pages optimized for mobile and conversions.", bullets: ["Mobile-first UI", "CTA placement", "Fast loading", "Trust blocks", "Checkout/lead flow"] },
              { num: "05", icon: Settings2, title: "Tracking & integrations", color: "#23A6E8", desc: "We set up everything required for measurement and lead handling.", bullets: ["Pixel/events (lead/purchase)", "WhatsApp/form routing", "Analytics & reporting basics", "Access control"] },
              { num: "06", icon: Rocket, title: "Launch", color: "#3AC9F5", desc: "We launch with a checklist to avoid errors and maximize early performance.", bullets: ["Launch checklist", "QA + device testing", "Campaign structure live", "Budget control"] },
              { num: "07", icon: RefreshCw, title: "Optimize & scale", color: "#1D4ED8", desc: "We improve results with testing and scaling rules (creative, audiences, offers).", bullets: ["Weekly reporting", "Creative testing", "Retargeting expansion", "Scaling plan", "Iteration loop"] },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 0.05}>
                <Step {...step} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ==================== ENGAGEMENT TYPES (white) ==================== */}
      <section id="modes" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mb-10">
            <span className="kicker">Engagement types</span>
            <h2
              className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Pick your engagement
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">
              Different services have different deliverables, but the workflow stays consistent. Select a mode to see what that engagement looks like.
            </p>
          </Reveal>

          {/* Mode tabs */}
          <Reveal delay={0.05} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {modes.map((m) => {
                const Icon = m.icon;
                const isActive = mode === m.key;
                return (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => setMode(m.key)}
                    className={cx(
                      "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                      isActive
                        ? "border-[#1D4ED8] bg-[#1D4ED8] text-white shadow-md shadow-[#1D4ED8]/20"
                        : "border-slate-200 bg-white text-slate-600 hover:border-[#1D4ED8]/40 hover:text-[#1D4ED8]"
                    )}
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    <Icon className="h-4 w-4" />
                    {m.label}
                    {isActive ? <CheckCircle2 className="h-3.5 w-3.5" /> : null}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ModePanel mode={mode} />
          </Reveal>

          <Reveal delay={0.12} className="mt-10">
            <div className="grid gap-5 md:grid-cols-3">
              <LightCard color="#1D4ED8" icon={CalendarDays} title="Timelines" desc="Typical timelines (varies by scope)." bullets={["Web/landing: 7–14 days", "Brand kit: 7–10 days", "Ads system: 3–7 days setup", "Monthly management ongoing"]} />
              <LightCard color="#23A6E8" icon={Zap} title="Fast wins" desc="Where we usually see early impact." bullets={["Profile optimization", "WhatsApp CTAs", "Landing improvements", "Retargeting setup", "Creative refresh"]} />
              <LightCard color="#3AC9F5" icon={ClipboardCheck} title="Approval points" desc="You stay in control with simple approvals." bullets={["Strategy approval", "Design direction approval", "Launch approval", "Weekly review"]} />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ==================== DELIVERABLES (mist) ==================== */}
      <section id="deliverables" className="scroll-mt-28 bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">What you get</span>
            <h2
              className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Clear deliverables, not vague promises
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">
              Every project includes a structured set of outputs so progress is visible and measurable.
            </p>
          </Reveal>

          <div className="grid gap-4">
            {[
              { title: "Foundation package (included in most projects)", color: "#1D4ED8", items: ["Discovery call + KPI alignment", "Brand messaging notes", "Access checklist (BM, website, pages)", "Tracking plan (lead/purchase)", "Basic reporting format", "Project timeline + milestones"] },
              { title: "Website / landing deliverables", color: "#23A6E8", items: ["Page structure + CTA plan", "Responsive design/build", "Forms + WhatsApp integration", "Basic SEO (structure + metadata)", "Speed optimization basics", "Launch QA checklist"] },
              { title: "Ads deliverables", color: "#3AC9F5", items: ["Campaign structure (full funnel)", "Pixel/events configured", "Audience segmentation", "Creative testing plan", "Weekly optimization notes", "Scaling recommendations"] },
              { title: "Content & social deliverables", color: "#1D4ED8", items: ["Content pillars + calendar", "Post/reel design system", "Captions + CTA frameworks", "Highlights + profile optimization", "Monthly reporting", "Iteration + improvements"] },
            ].map((row, i) => (
              <Reveal key={row.title} delay={i * 0.06}>
                <DeliverableRow {...row} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-8">
            <div className="rounded-2xl border border-[#1D4ED8]/20 bg-[#1D4ED8]/5 p-6">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div className="max-w-2xl">
                  <div className="text-sm font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>Ready to start?</div>
                  <div className="mt-1 text-sm text-slate-600">
                    Send your website/social links + a short note about your goals. We'll reply with a plan and deliverables list.
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://wa.me/923271804037"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#1D4ED8] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#162f8f] hover:scale-105"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    WhatsApp Us <Phone className="h-4 w-4" />
                  </a>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-[#1D4ED8]/30 px-5 py-2.5 text-sm font-semibold text-[#1D4ED8] transition-all hover:bg-[#1D4ED8]/10"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Get a Proposal <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ==================== SEO / FAQ (white) ==================== */}
      <div className="bg-white">
        <SeoContentFaq content={seoContent} lightTheme={true} />
      </div>

      {/* ==================== FAQ Section (mist) ==================== */}
      <section id="faq" className="scroll-mt-28 bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <Reveal className="mb-10">
            <span className="kicker">FAQ</span>
            <h2
              className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Common questions
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-xl">
              Quick answers about how we work, timelines, and approvals.
            </p>
          </Reveal>

          <div className="grid gap-3">
            {[
              { q: "How do we start a project?", a: "We start with a short discovery call to confirm goals, scope, and timelines. Then we share a plan for Salesforce implementation, ecommerce, or marketing with first deliverables." },
              { q: "Do you provide weekly updates?", a: "Yes. Updates cover Salesforce or web progress, what's next, approvals needed, and ROAS/CPA changes if Meta Ads are running." },
              { q: "How fast can you launch ads?", a: "If assets and access are ready, we can set up Meta Ads tracking and campaigns within 3–7 days, then test creatives weekly to improve CPA/ROAS." },
              { q: "What do you need from us?", a: "We typically need Salesforce or Shopify access when relevant, Meta BM access for ads, product/service info, and brand assets. We can create missing assets." },
              { q: "How do approvals work?", a: "We use approval checkpoints for strategy, UI/UX, and build. For LWC or Experience Cloud work, you review staging before launch." },
            ].map((faq, i) => (
              <Reveal key={faq.q} delay={i * 0.05}>
                <FAQItem {...faq} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ==================== CTA (dark) ==================== */}
      <section className="bg-[#141A2E] py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="kicker" style={{ borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.07)", color: "#93c5fd" }}>
                Start Your Project
              </span>
              <h2
                className="mt-6 text-3xl font-extrabold text-white sm:text-4xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Ready to Follow This Process Together?
              </h2>
              <p className="mt-4 text-lg text-slate-400 max-w-xl mx-auto">
                Share your business type, target market, and budget range — we'll recommend the best plan and first steps.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link to="/contact" className="btn-primary">
                  Get a Proposal <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://wa.me/923271804037"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost-dark"
                >
                  <Phone className="h-4 w-4" /> WhatsApp Us
                </a>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
