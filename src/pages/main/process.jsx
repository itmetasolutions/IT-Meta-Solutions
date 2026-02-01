import React, { useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
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
  Landmark,
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

/**
 * PROCESS PAGE
 * - Same dark/glass/gradient theme
 * - Sticky top subnav (anchors)
 * - Tabs by "Engagement Type" (Brand Build, Marketing, Web, Content)
 * - Timeline steps + what you get + timelines + FAQ
 *
 * ✅ Replace CTA links (#) with your routes (contact/whatsapp/proposal).
 */

const cx = (...c) => c.filter(Boolean).join(" ");

const inPageNav = [
  { label: "Overview", href: "#overview" },
  { label: "Steps", href: "#steps" },
  { label: "Engagement Types", href: "#modes" },
  { label: "Deliverables", href: "#deliverables" },
  { label: "FAQ", href: "#faq" },
];

const modes = [
  { key: "brand", label: "Brand Building", icon: Wand2 },
  { key: "marketing", label: "Paid Marketing", icon: Megaphone },
  { key: "web", label: "Web Development", icon: MonitorSmartphone },
  { key: "content", label: "Content & Social", icon: Layers },
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
        "bg-[radial-gradient(closest-side,rgba(99,102,241,0.55),rgba(99,102,241,0))]",
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
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200 mb-3">
      {Icon ? <Icon className="h-3.5 w-3.5 opacity-80" /> : null}
      {children}
    </span>
  );
}

function Divider() {
  return <div className="my-12 sm:my-16 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />;
}

function SectionTitle({ kicker, title, desc, align = "left", level = "h2" }) {
  const HeadingTag = level;
  return (
    <div className={cx("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
        <Sparkles className="h-3.5 w-3.5" />
        {kicker}
      </div>
      <HeadingTag className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">{title}</HeadingTag>
      <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">{desc}</p>
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

function Step({ num, icon: Icon, title, desc, bullets }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="relative">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/5">
            <Icon className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-200">
                Step {num}
              </span>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
            </div>
            <p className="mt-2 text-sm text-zinc-300 leading-relaxed">{desc}</p>

            {bullets?.length ? (
              <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-sm text-zinc-200">
                {bullets.map((b, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                    <span className="opacity-90">{b}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function StickySubnav() {
  return (
    <div className="sticky top-24 z-50 border-b border-white/10 bg-zinc-950/60 backdrop-blur">
      <Container className="py-6">
        <div className="flex items-center justify-between gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-300">
            <Workflow className="h-4 w-4" />
            Our Process
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

function ModesTabs({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {modes.map((m) => {
        const Icon = m.icon;
        const isActive = active === m.key;
        return (
          <button
            key={m.key}
            type="button"
            onClick={() => onChange(m.key)}
            className={cx(
              "inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm transition",
              isActive
                ? "border-white/20 bg-white text-zinc-950"
                : "border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10"
            )}
          >
            <Icon className="h-4 w-4" />
            {m.label}
            {isActive ? <CheckCircle2 className="h-4 w-4" /> : null}
          </button>
        );
      })}
    </div>
  );
}

function DeliverableRow({ title, items }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <div className="text-sm font-semibold text-white">{title}</div>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-sm text-zinc-200">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2">
            <BadgeCheck className="h-4 w-4 text-emerald-300" />
            <span className="opacity-90">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FAQItem({ q, a }) {
  return (
    <details className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
        <div className="text-sm font-semibold text-white">{q}</div>
        <ChevronRight className="h-4 w-4 text-zinc-300 transition group-open:rotate-90" />
      </summary>
      <div className="mt-3 text-sm text-zinc-300 leading-relaxed">{a}</div>
    </details>
  );
}

function ModePanel({ mode }) {
  if (mode === "brand") {
    return (
      <div className="grid gap-4 lg:grid-cols-3">
        <Card
          icon={Wand2}
          title="Brand foundation"
          desc="Positioning + identity system that makes you instantly recognizable."
          bullets={["Brand story & messaging", "Logo + colors + typography", "Templates & consistency rules"]}
        />
        <Card
          icon={LayoutGrid}
          title="Conversion hub"
          desc="Website and landing pages that turn attention into leads/sales."
          bullets={["Ads-ready landing pages", "WhatsApp/contact flows", "Tracking foundations"]}
        />
        <Card
          icon={Target}
          title="Growth loop"
          desc="Organic + paid plan to build trust and scale performance."
          bullets={["Content pillars", "Retargeting pools", "Offer + creative testing"]}
        />
      </div>
    );
  }

  if (mode === "marketing") {
    return (
      <div className="grid gap-4 lg:grid-cols-3">
        <Card
          icon={Megaphone}
          title="Funnel build"
          desc="Awareness → retargeting → conversion, aligned to your product/service."
          bullets={["Campaign structure", "Audience segmentation", "Offer angles"]}
        />
        <Card
          icon={BarChart3}
          title="Tracking"
          desc="Pixel/events + reporting so optimization is data-driven."
          bullets={["Lead/Purchase events", "UTM + analytics", "Weekly optimization notes"]}
        />
        <Card
          icon={RefreshCw}
          title="Creative testing"
          desc="Test hooks, visuals, and CTAs to drop CPA and scale."
          bullets={["Multiple variations", "Winners scaling", "Creative rotation system"]}
        />
      </div>
    );
  }

  if (mode === "web") {
    return (
      <div className="grid gap-4 lg:grid-cols-3">
        <Card
          icon={MonitorSmartphone}
          title="UI/UX"
          desc="Modern pages designed for mobile-first conversion."
          bullets={["Wireframe + layout", "CTA placement", "Speed & readability"]}
        />
        <Card
          icon={Gauge}
          title="Build & launch"
          desc="Fast, clean implementation with best practices."
          bullets={["Responsive build", "SEO basics", "Hosting + deployment"]}
        />
        <Card
          icon={ShieldCheck}
          title="Integrations"
          desc="Forms, WhatsApp, tracking and automations."
          bullets={["WhatsApp click-to-chat", "Email notifications", "Pixel/events setup"]}
        />
      </div>
    );
  }

  // content
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card
        icon={Layers}
        title="Content system"
        desc="Monthly plan with consistent pillars, formats, and brand style."
        bullets={["Calendars", "Pillars + themes", "Posting cadence"]}
      />
      <Card
        icon={MessageSquareText}
        title="Copy & hooks"
        desc="Messaging designed to build trust and trigger action."
        bullets={["Urdu/English mix (optional)", "CTA frameworks", "Objection handling"]}
      />
      <Card
        icon={Rocket}
        title="Distribution"
        desc="Reels-first workflow with repurposing for all platforms."
        bullets={["9:16 first", "Stories + highlights", "Boost-ready creatives"]}
      />
    </div>
  );
}

export default function ProcessPage() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [mode, setMode] = useState("brand");
  const heroRef = useRef(null);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, -55]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.88]);

  return (
    <>
      <Helmet>
        <title>IT Meta Solutions - Our Process | How We Deliver Results</title>
        <meta name="description" content="Discover IT Meta Solutions' proven process for web development, digital marketing, and branding projects. Clear steps, trust-first execution, and performance-driven results with weekly deliverables." />
        <meta name="keywords" content="digital agency process, web development workflow, marketing campaign process, project timeline, agency methodology, IT Meta Solutions process" />
        <meta property="og:title" content="IT Meta Solutions - Our Process | How We Deliver Results" />
        <meta property="og:description" content="Discover IT Meta Solutions' proven process for web development, digital marketing, and branding projects. Clear steps, trust-first execution, and performance-driven results with weekly deliverables." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://itmetasolutions.com/process" />
        <meta property="og:url" content="https://itmetasolutions.com/process" />
        <meta property="og:image" content="https://itmetasolutions.com/favicon.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="IT Meta Solutions - Our Process | How We Deliver Results" />
        <meta name="twitter:description" content="Discover IT Meta Solutions' proven process for web development, digital marketing, and branding projects. Clear steps, trust-first execution, and performance-driven results with weekly deliverables." />
        <meta name="twitter:image" content="https://itmetasolutions.com/favicon.webp" />
      </Helmet>

      <div className="min-h-screen text-zinc-100 mb-16 overflow-x-hidden">
        <ScrollProgress />

      {/* Background accents */}
      <GradientBlob className="left-[-140px] top-[-140px] h-[560px] w-[560px]" />
      <GradientBlob className="right-[-180px] top-[240px] h-[560px] w-[560px] bg-[radial-gradient(closest-side,rgba(16,185,129,0.5),rgba(16,185,129,0))]" />

      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden">
        <Container className="pb-12 pt-24 sm:pb-16 sm:pt-32">
          <motion.div style={{ y: heroY, opacity: heroOpacity }}>
            <Reveal>
              <div className="flex flex-wrap items-center gap-2">
                <Pill icon={Workflow}>Clear process</Pill>
                <Pill icon={ShieldCheck}>Trust-first execution</Pill>
                <Pill icon={Target}>Performance-driven</Pill>
                <Pill icon={ClipboardCheck}>Weekly deliverables</Pill>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <SectionTitle
                kicker="Process"
                title="A simple process that builds trust, speed, and measurable results"
                desc="From discovery to launch and optimization — our workflow is designed to move fast, keep you in control, and deliver outcomes (leads, sales, growth)."
                level="h1"
              />
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                <Card
                  icon={ClipboardList}
                  title="1) Plan"
                  desc="We align goals, audience, and deliverables."
                  bullets={["Discovery call", "Scope & timeline", "KPI targets"]}
                />
                <Card
                  icon={Rocket}
                  title="2) Build & Launch"
                  desc="We execute quickly with clean approvals."
                  bullets={["Design/build", "Tracking setup", "Launch checklist"]}
                />
                <Card
                  icon={RefreshCw}
                  title="3) Optimize"
                  desc="We improve based on real data."
                  bullets={["Weekly reporting", "Creative testing", "Scaling plan"]}
                />
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                  <div className="max-w-2xl">
                    <div className="text-sm font-semibold text-white">Fast inquiry</div>
                    <div className="mt-1 text-sm text-zinc-300">
                      Share your business type, target city/country, and budget range — we’ll recommend the best plan.
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="https://wa.me/923271804037"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:opacity-90"
                    >
                      WhatsApp us <Phone className="h-4 w-4" />
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                    >
                      Get a proposal <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </motion.div>
        </Container>
      </section>

      {/* Sticky anchors */}
      <StickySubnav />

      {/* Overview */}
      <section id="overview" className="scroll-mt-24 py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionTitle
              kicker="How we work"
              title="No confusion. Clear steps. Clear approvals."
              desc="We keep the process structured so you always know what’s happening, what you need to approve, and what results we’re targeting."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <Reveal delay={0.05}>
              <Card
                icon={ShieldCheck}
                title="Communication"
                desc="You get clean updates without noise."
                bullets={["WhatsApp + email updates", "Weekly check-ins", "Approval checkpoints"]}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Card
                icon={Target}
                title="Performance focus"
                desc="Everything points toward results."
                bullets={["KPIs defined early", "Testing system", "Optimization roadmap"]}
              />
            </Reveal>
            <Reveal delay={0.15}>
              <Card
                icon={FileText}
                title="Documentation"
                desc="Your brand stays organized."
                bullets={["Brand assets folder", "Access list", "Monthly reports"]}
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Steps */}
      <section id="steps" className="scroll-mt-24 py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionTitle
              kicker="Step-by-step"
              title="From kickoff to scale"
              desc="A proven workflow used across brand builds, e-commerce, travel, and lead generation projects."
            />
          </Reveal>

          <div className="mt-10 grid gap-4">
            <Reveal delay={0.05}>
              <Step
                num="01"
                icon={Search}
                title="Discovery & goals"
                desc="We understand your business, audience, competitors, and define what success looks like."
                bullets={["Business audit", "Audience & offer mapping", "KPIs (leads/sales/ROAS)", "Scope finalized"]}
              />
            </Reveal>

            <Reveal delay={0.1}>
              <Step
                num="02"
                icon={ClipboardList}
                title="Strategy & plan"
                desc="We create the execution plan: funnel, content pillars, website requirements, and timelines."
                bullets={["Funnel plan", "Content pillars", "Website pages map", "Creative direction", "Timeline & deliverables"]}
              />
            </Reveal>

            <Reveal delay={0.15}>
              <Step
                num="03"
                icon={PenTool}
                title="Creative production"
                desc="Design and content assets are produced in batches so execution stays consistent."
                bullets={["Design templates", "Ad creative variations", "Copywriting hooks", "Reels scripts (if needed)"]}
              />
            </Reveal>

            <Reveal delay={0.2}>
              <Step
                num="04"
                icon={MonitorSmartphone}
                title="Build (website/store/landing)"
                desc="We build the website or landing pages optimized for mobile and conversions."
                bullets={["Mobile-first UI", "CTA placement", "Fast loading", "Trust blocks", "Checkout/lead flow"]}
              />
            </Reveal>

            <Reveal delay={0.25}>
              <Step
                num="05"
                icon={Settings2}
                title="Tracking & integrations"
                desc="We set up everything required for measurement and lead handling."
                bullets={["Pixel/events (lead/purchase)", "WhatsApp/form routing", "Analytics & reporting basics", "Access control"]}
              />
            </Reveal>

            <Reveal delay={0.3}>
              <Step
                num="06"
                icon={Rocket}
                title="Launch"
                desc="We launch with a checklist to avoid errors and maximize early performance."
                bullets={["Launch checklist", "QA + device testing", "Campaign structure live", "Budget control"]}
              />
            </Reveal>

            <Reveal delay={0.35}>
              <Step
                num="07"
                icon={RefreshCw}
                title="Optimize & scale"
                desc="We improve results with testing and scaling rules (creative, audiences, offers)."
                bullets={["Weekly reporting", "Creative testing", "Retargeting expansion", "Scaling plan", "Iteration loop"]}
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Engagement Types */}
      <section id="modes" className="scroll-mt-24 py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionTitle
              kicker="Engagement types"
              title="Pick your engagement — process stays structured"
              desc="Different services have different deliverables, but the workflow stays consistent. Select a mode to see what that engagement looks like."
            />
          </Reveal>

          <div className="mt-8">
            <Reveal delay={0.05}>
              <ModesTabs active={mode} onChange={setMode} />
            </Reveal>
          </div>

          <div className="mt-8">
            <Reveal delay={0.08}>
              <ModePanel mode={mode} />
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <Card
                icon={CalendarDays}
                title="Timelines"
                desc="Typical timelines (varies by scope)."
                bullets={["Web/landing: 7–14 days", "Brand kit: 7–10 days", "Ads system: 3–7 days setup", "Monthly management ongoing"]}
              />
              <Card
                icon={Zap}
                title="Fast wins"
                desc="Where we usually see early impact."
                bullets={["Profile optimization", "WhatsApp CTAs", "Landing improvements", "Retargeting setup", "Creative refresh"]}
              />
              <Card
                icon={ClipboardCheck}
                title="Approval points"
                desc="You stay in control with simple approvals."
                bullets={["Strategy approval", "Design direction approval", "Launch approval", "Weekly review"]}
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Deliverables */}
      <section id="deliverables" className="scroll-mt-24 py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionTitle
              kicker="What you get"
              title="Clear deliverables, not vague promises"
              desc="Every project includes a structured set of outputs so progress is visible and measurable."
            />
          </Reveal>

          <div className="mt-10 grid gap-4">
            <Reveal delay={0.05}>
              <DeliverableRow
                title="Foundation package (included in most projects)"
                items={[
                  "Discovery call + KPI alignment",
                  "Brand messaging notes",
                  "Access checklist (BM, website, pages)",
                  "Tracking plan (lead/purchase)",
                  "Basic reporting format",
                  "Project timeline + milestones",
                ]}
              />
            </Reveal>

            <Reveal delay={0.1}>
              <DeliverableRow
                title="Website / landing deliverables"
                items={[
                  "Page structure + CTA plan",
                  "Responsive design/build",
                  "Forms + WhatsApp integration",
                  "Basic SEO (structure + metadata)",
                  "Speed optimization basics",
                  "Launch QA checklist",
                ]}
              />
            </Reveal>

            <Reveal delay={0.15}>
              <DeliverableRow
                title="Ads deliverables"
                items={[
                  "Campaign structure (full funnel)",
                  "Pixel/events configured",
                  "Audience segmentation",
                  "Creative testing plan",
                  "Weekly optimization notes",
                  "Scaling recommendations",
                ]}
              />
            </Reveal>

            <Reveal delay={0.2}>
              <DeliverableRow
                title="Content & social deliverables"
                items={[
                  "Content pillars + calendar",
                  "Post/reel design system",
                  "Captions + CTA frameworks",
                  "Highlights + profile optimization",
                  "Monthly reporting",
                  "Iteration + improvements",
                ]}
              />
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-emerald-400/10 p-6">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div className="max-w-2xl">
                  <div className="text-sm font-semibold text-white">Ready to start?</div>
                  <div className="mt-1 text-sm text-zinc-300">
                    Send your website/social links + a short note about your goals. We’ll reply with a plan and deliverables list.
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:opacity-90"
                  >
                    WhatsApp us <Phone className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    Get a proposal <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionTitle
              kicker="FAQ"
              title="Common questions"
              desc="Quick answers about how we work, timelines, and approvals."
            />
          </Reveal>

          <div className="mt-10 grid gap-3">
            <Reveal delay={0.05}>
              <FAQItem
                q="How do we start a project?"
                a="We start with a short discovery call to confirm goals, scope, and timelines. Then we share a plan, required access, and the first deliverables for approval."
              />
            </Reveal>
            <Reveal delay={0.08}>
              <FAQItem
                q="Do you provide weekly updates?"
                a="Yes. We keep updates simple: what was done, what’s next, what needs approval, and key performance changes (if ads are running)."
              />
            </Reveal>
            <Reveal delay={0.11}>
              <FAQItem
                q="How fast can you launch ads?"
                a="If assets and access are ready, we can set up tracking + campaigns within 3–7 days. Creative testing continues weekly to improve CPA/ROAS."
              />
            </Reveal>
            <Reveal delay={0.14}>
              <FAQItem
                q="What do you need from us?"
                a="Basic access (Meta BM, ad account/page), your offer details, any product/service info, and brand assets (logo/colors). If you don’t have them, we create them."
              />
            </Reveal>
            <Reveal delay={0.17}>
              <FAQItem
                q="How do approvals work?"
                a="We use simple approval checkpoints: strategy direction, creative direction, and launch. After launch, we iterate weekly based on performance."
              />
            </Reveal>
          </div>


        </Container>
      </section>
    </div>
    </>
  );
}
