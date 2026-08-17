import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useInView } from "framer-motion";
import {
  ArrowRight, CheckCircle2, Layers, Database, KeyRound, Users, Phone, Settings,
  ShieldCheck, BarChart3, Cog, MessageSquare, Workflow, Lock, Search, Target,
  ChevronRight, ExternalLink, MousePointerClick,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import SeoContentFaq from "../../components/SeoContentFaq";
import Container from "../../components/Container";

import lettingAgencyBannerImg from "../../assets/img/Banner Image.png";
import adminControlCenterImg from "../../assets/img/Admin Control Center.png";
import agentWorkspaceImg from "../../assets/img/Agent Workspace — Property Lifecycle.png";
import dialerSuiteImg from "../../assets/img/Dialer Suite — Dialpad & Call History.png";
import dialerLabelsImg from "../../assets/img/Dialer — Labels, Notes & Recordings.png";
import teamCommunicationImg from "../../assets/img/Team Communication — Embedded Chat.png";
import revenueDashboardImg from "../../assets/img/Revenue & Commission Dashboard.png";
import otpLoginImg from "../../assets/img/OTP Login & Authentication.png";
import auditLogImg from "../../assets/img/Audit Log — Platform Governance.png";

const cx = (...c) => c.filter(Boolean).join(" ");

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div aria-hidden className="fixed left-0 top-0 z-50 h-0.5 w-full origin-left bg-gradient-to-r from-[#1D4ED8] via-[#23A6E8] to-[#3AC9F5]" style={{ scaleX: scrollYProgress }} />;
}

function Reveal({ children, delay = 0, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function AnchorLink({ href, children, className }) {
  return <a href={href} onClick={(e) => { if (href?.startsWith?.("#")) { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" }); } }} className={className}>{children}</a>;
}

function LightCard({ icon: Icon, color = "#1D4ED8", title, desc, bullets, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div className="premium-card h-full rounded-2xl p-6">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: `${color}15` }}>
          <Icon className="h-5 w-5" style={{ color }} />
        </div>
        <h3 className="mb-2 text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
        {desc && <p className="text-sm text-slate-600 leading-relaxed mb-3">{desc}</p>}
        {bullets?.length ? (
          <ul className="space-y-2">{bullets.map((b, i) => <li key={i} className="flex items-start gap-2 text-sm text-slate-700"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color }} />{b}</li>)}</ul>
        ) : null}
      </div>
    </Reveal>
  );
}

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

function ModuleBlock({ icon: Icon, number, title, desc, fields, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div className="premium-card rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:gap-8">
          <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-3 md:w-52 md:flex-shrink-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: "#1D4ED815" }}><Icon className="h-5 w-5 text-[#1D4ED8]" /></div>
            <div><div className="text-xs font-semibold uppercase tracking-widest text-[#23A6E8]">Module {number}</div><h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm leading-relaxed text-slate-600 mb-4">{desc}</p>
            {fields?.length ? (
              <div className="grid gap-2 sm:grid-cols-2">
                {fields.map((f, i) => (
                  <div key={i} className="flex items-start gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">
                    <ChevronRight className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#1D4ED8]" />
                    <span className="text-xs text-slate-700">{f}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function StickyNav({ items }) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const obs = new IntersectionObserver((e) => e.forEach((en) => { if (en.isIntersecting) setActive(`#${en.target.id}`); }), { rootMargin: "-20% 0px -70% 0px" });
    items.forEach(({ href }) => { const el = document.querySelector(href); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [items]);
  return (
    <div className="sticky top-[64px] z-40 border-b border-slate-100 bg-white/95 backdrop-blur-sm shadow-sm">
      <Container className="py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500"><Layers className="h-3.5 w-3.5 text-[#1D4ED8]" />Next.js 14 · PostgreSQL · TypeScript · SIP.js</div>
          <div className="flex flex-wrap items-center gap-2">
            {items.map((item) => <AnchorLink key={item.href} href={item.href} className={cx("rounded-full border px-3 py-1.5 text-xs font-medium transition", active === item.href ? "border-[#1D4ED8] bg-[#1D4ED8] text-white" : "border-slate-200 bg-[#F1F4F9] text-slate-600 hover:border-[#1D4ED8]/40 hover:text-[#1D4ED8]")}>{item.label}</AnchorLink>)}
          </div>
        </div>
      </Container>
    </div>
  );
}

const nav = [
  { label: "Overview", href: "#overview" },
  { label: "Modules", href: "#modules" },
  { label: "Architecture", href: "#architecture" },
  { label: "Screenshots", href: "#screens" },
  { label: "Impact", href: "#impact" },
];

const seoContent = {
  kicker: "Case Study",
  title: "MHG Portal — Custom Letting Agency Operations Platform",
  subtitle: "Custom Next.js web application built for More Homes Group — a centralised portal for letting operations with role-based access, OTP login, an integrated dialer suite, and full audit governance.",
  paragraphs: [
    "We designed and delivered a bespoke operations portal for More Homes Group, replacing fragmented tools with a single unified platform covering landlord onboarding, property lifecycle management, sales tracking, tenant records, and an integrated SIP dialer.",
    "The platform is built on Next.js 14, TypeScript, and PostgreSQL via Prisma ORM, with a two-tier role model, OTP-protected login with rate limiting, platform-wide audit logs, and a built-in dialer suite ready for SIP/LINKUS integration.",
  ],
  bullets: [
    "Custom Next.js portal replacing disconnected letting agency tools",
    "Role-based access for Admin and Agent users with OTP-secured login",
    "Integrated SIP dialer with call history, labels, notes, and intercalling",
    "Unified data model: landlords, properties, sales, tenants, and users",
    "Governance through platform-wide audit logs and secure session management",
  ],
};

const seoFaqs = [
  { q: "What technology was used to build the MHG letting agency portal?", a: "The portal is built on Next.js 14, React 18, and TypeScript with a PostgreSQL database managed through Prisma ORM. The dialer suite integrates via SIP.js and is LINKUS-ready. Deployment is Vercel/Docker-compatible." },
  { q: "Does the MHG portal support multiple user roles?", a: "Yes. The system has two core roles — Admin and Agent. Admins manage users, commissions, dialer settings, and audit logs. Agents handle day-to-day landlord, property, sales, and tenant workflows." },
  { q: "How does the login security work?", a: "The portal uses an OTP-protected login flow with rate limiting and secure session management to prevent unauthorised access and ensure auditability." },
  { q: "What does the integrated dialer include?", a: "The dialer suite includes a live-status dialpad, contacts management, call history, internal intercalling (extension-to-extension), labels, favourites, contact and call notes, and recording URL support." },
  { q: "Can you build a similar custom letting agency portal for our business?", a: "Absolutely. We build bespoke web applications tailored to letting and estate agency workflows. Contact us to discuss your requirements." },
];

export default function LettingAgencyPortalCaseStudy() {
  return (
    <>
      <Helmet>
        <title>MHG Portal — Custom Letting Agency Web Application | Case Study | IT Meta Solutions</title>
        <meta name="description" content="Custom Next.js letting agency portal for More Homes Group — role-based access, OTP login, integrated SIP dialer, landlord & property management, sales tracking, and full audit logs." />
        <meta property="og:title" content="MHG Portal — Custom Letting Agency Web Application | Case Study" />
        <meta property="og:description" content="Bespoke letting agency operations portal built on Next.js 14 with PostgreSQL, SIP dialer integration, OTP-secured login, admin and agent workspaces, and platform-wide audit governance." />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://itmetasolutions.com/case-study/letting-agency-portal" />
      </Helmet>
      <ScrollProgress />

      {/* HERO */}
      <section className="relative bg-[#141A2E] overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="absolute inset-0 dot-grid-bg opacity-25 pointer-events-none" />
        <div className="absolute -top-32 right-0 w-[600px] h-[500px] rounded-full bg-[#1D4ED8]/10 blur-[120px] pointer-events-none" />
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex flex-wrap gap-2 mb-8">
              {[{ icon: Layers, label: "Next.js 14" }, { icon: Database, label: "PostgreSQL" }, { icon: KeyRound, label: "OTP Login" }, { icon: Phone, label: "SIP Dialer" }, { icon: Users, label: "Role-Based" }, { icon: ShieldCheck, label: "Audit Logs" }].map((b) => (
                <span key={b.label} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-slate-300"><b.icon className="h-3.5 w-3.5 text-[#3AC9F5]" />{b.label}</span>
              ))}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-5xl" style={{ fontFamily: "var(--font-heading)" }}>
              MHG Portal — <span className="animated-gradient-text">Custom Letting Agency App</span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-3xl leading-relaxed">A bespoke operations portal built for More Homes Group — replacing disconnected tools with a single platform for landlord onboarding, property lifecycle management, sales tracking, tenant records, an integrated SIP dialer suite, team chat, and full audit governance.</p>
            <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
              <img src={lettingAgencyBannerImg} alt="MHG Portal" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-4 max-w-3xl">
              {[{ icon: Layers, label: "Core Modules", value: "5 Modules", color: "#1D4ED8" }, { icon: Users, label: "User Roles", value: "Admin + Agent", color: "#23A6E8" }, { icon: Phone, label: "Dialer", value: "SIP Integrated", color: "#3AC9F5" }, { icon: ShieldCheck, label: "Security", value: "OTP + Audit", color: "#1D4ED8" }].map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: `${s.color}30` }}><s.icon className="h-4 w-4" style={{ color: s.color }} /></div>
                    <div><div className="text-base font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</div><div className="text-xs text-slate-400">{s.label}</div></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://portal.morehomesgroup.co.uk/" target="_blank" rel="noreferrer" className="btn-primary">Visit Live Site <ExternalLink className="h-4 w-4" /></a>
              <Link to="/contact" className="btn-ghost-dark">Build Your Portal <MousePointerClick className="h-4 w-4" /></Link>
            </div>
          </motion.div>
        </Container>
      </section>

      <StickyNav items={nav} />

      {/* OVERVIEW */}
      <section id="overview" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Overview</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>One Platform to Run All Letting Operations</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">More Homes Group needed a single platform to run day-to-day agency operations without switching between disconnected tools. We built a centralised portal combining business workflows, communication, and compliance in one system.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            <LightCard color="#1D4ED8" icon={Search} title="The Problem" desc="Fragmented tools, limited visibility, and weak communication flow between teams." bullets={["Landlord, property, sales, and tenant records stored separately", "Limited visibility across admin and agent activity", "No structured dialer workflow", "Insufficient login security and no audit trail"]} />
            <LightCard color="#23A6E8" icon={Target} title="The Solution" desc="A centralised Next.js operations portal combining workflows, communication, and compliance." bullets={["Role-based architecture for Admin and Agent", "OTP-protected login with rate limiting", "Unified data model: landlords, properties, sales, tenants", "SIP/LINKUS-ready integrated dialer suite", "Platform-wide audit logs for governance"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={ShieldCheck} title="Delivered Outcomes" desc="A fully operational letting portal serving admin and agent users from a single secure system." bullets={["Single source of truth for operations", "Faster admin oversight", "Stronger security via OTP and role access", "Improved agent productivity with integrated dialer", "Compliance readiness through audit trails"]} delay={0.1} />
          </div>
        </Container>
      </section>

      {/* MODULES */}
      <section id="modules" className="scroll-mt-28 bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Core Modules</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Every Part of the Portal, in Detail</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">The system is organised into five core modules, each handling a distinct area of the letting business — from admin oversight and agent workflows through the dialer suite, team communication, and revenue reporting.</p>
          </Reveal>
          <div className="flex flex-col gap-5">
            <ModuleBlock icon={Cog} number="01" title="Admin Control Center" desc="The admin-only hub for managing the entire platform. Admins control agents, configure commission structures, set dialer domain settings, review audit logs, and maintain full visibility across the portfolio and operations." fields={["Agent account creation, editing & deactivation", "Commission rate configuration per agent / deal type", "Dialer domain & SIP extension management", "Platform-wide audit log (all user actions & changes)", "Full portfolio visibility (landlords, properties, sales, tenants)", "Role assignment and permission management", "System settings and configuration panel", "User session management and security oversight"]} />
            <ModuleBlock icon={Users} number="02" title="Agent Workspace" desc="The day-to-day operational hub for agents. From a single workspace, agents handle every core letting workflow — onboarding landlords, managing property lifecycles, closing sales, maintaining tenant records, and updating their own profiles." fields={["Landlord onboarding and profile management", "Property lifecycle tracking (listing → active → closed)", "Sales record creation, progression, and closure", "Tenant record management and status tracking", "Agent profile and settings management", "Assigned portfolio view per agent", "Activity log and notes per record", "Commission earned and payment status view"]} delay={0.05} />
            <ModuleBlock icon={Phone} number="03" title="Dialer Suite" desc="A fully integrated calling workflow built directly into the portal. The dialer suite is SIP/LINKUS-ready and covers the complete calling experience — from live-status dial to post-call notes and recording management." fields={["Dialpad with live call status indicator", "Contacts management (import, create, organise)", "Full call history management (inbound & outbound)", "Intercalling — internal extension-to-extension calls", "Labels for categorising calls and contacts", "Favourites for quick-access contacts", "Per-contact and per-call notes", "Recording URL support for call review"]} delay={0.1} />
            <ModuleBlock icon={MessageSquare} number="04" title="Team Communication" desc="An embedded chat system built into the portal for fast internal coordination between users. Agents and admins can message each other directly without switching to external tools, keeping communication in context and on record." fields={["Direct messaging between portal users", "Real-time message delivery", "Conversation history and message persistence", "User presence and online status", "Message notifications and unread indicators", "Accessible to both Admin and Agent roles"]} delay={0.15} />
            <ModuleBlock icon={BarChart3} number="05" title="Revenue & Performance" desc="Sales and commission dashboards give admins and agents clear visibility into financial performance. Operational reporting views cover deal volumes, revenue earned, commission calculations, and overall portfolio activity." fields={["Sales dashboard with deal volume and status breakdown", "Commission dashboard per agent (earned vs paid)", "Revenue overview for admin users", "Operational reporting views for activity monitoring", "Agent performance summaries", "Filterable date-range reporting", "Portfolio-level financial snapshot"]} delay={0.2} />
          </div>
        </Container>
      </section>

      {/* ARCHITECTURE */}
      <section id="architecture" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <span className="kicker">Architecture</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Built on a Modern Full-Stack Foundation</h2>
              <p className="mt-4 text-lg text-slate-500">Next.js 14 with PostgreSQL via Prisma ORM, SIP.js for the integrated dialer, Zod for validation, and deployable on Vercel or Docker.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Next.js 14", "React 18", "TypeScript", "Prisma ORM", "PostgreSQL", "Zod", "SIP.js", "Vercel / Docker"].map((tag) => (
                  <span key={tag} className="rounded-full border border-[#1D4ED8]/20 bg-[#1D4ED8]/5 px-3 py-1 text-xs font-semibold text-[#1D4ED8]">{tag}</span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1} className="space-y-4">
              <SideItem color="#1D4ED8" icon={Layers} title="Next.js 14 + React 18" desc="App Router with server and client components, TypeScript throughout, Server Actions for mutations, Vercel-ready deployment." />
              <SideItem color="#23A6E8" icon={Database} title="Prisma ORM + PostgreSQL" desc="Type-safe ORM over PostgreSQL with a clean unified data model, migration management with Prisma Migrate, and Zod validation." />
              <SideItem color="#3AC9F5" icon={Phone} title="SIP.js Dialer" desc="Browser-based calling via SIP.js, LINKUS-ready architecture for enterprise PBX, live call status and extension-to-extension intercalling." />
              <SideItem color="#1D4ED8" icon={Lock} title="Security & Authentication" desc="OTP-based login with expiry and rate limiting, secure server-side sessions, two-tier role model with role-aware route protection and audit logs." />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* SCREENSHOTS */}
      <section id="screens" className="scroll-mt-28 bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Project Screenshots</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>See the Portal in Action</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">Screenshots of all major modules — admin control center, agent workspace, dialer suite, team chat, and revenue dashboards.</p>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-2">
            {[{ src: adminControlCenterImg, title: "Admin Control Center", comment: "Agent management, commission config, dialer domain settings, and audit log overview" }, { src: agentWorkspaceImg, title: "Agent Workspace — Property Lifecycle", comment: "Agent view showing landlord onboarding, property status tracking, and sales records" }].map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <div className="group premium-card rounded-2xl p-4 h-full">
                  <div className="overflow-hidden rounded-xl border border-slate-100">
                    <img src={s.src} alt={s.title} loading="lazy" className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                  </div>
                  <div className="mt-3 px-1"><p className="text-sm font-bold text-slate-900">{s.title}</p><p className="mt-0.5 text-xs text-slate-500">{s.comment}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {[{ src: dialerSuiteImg, title: "Dialer Suite — Dialpad & Call History", comment: "Live-status dialpad, call history log, contacts list, and intercalling interface" }, { src: dialerLabelsImg, title: "Dialer — Labels, Notes & Recordings", comment: "Call labelling, per-call notes, favourites, and recording URL management" }].map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <div className="group premium-card rounded-2xl p-4 h-full">
                  <div className="overflow-hidden rounded-xl border border-slate-100">
                    <img src={s.src} alt={s.title} loading="lazy" className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                  </div>
                  <div className="mt-3 px-1"><p className="text-sm font-bold text-slate-900">{s.title}</p><p className="mt-0.5 text-xs text-slate-500">{s.comment}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.05} className="mt-5">
            <div className="group premium-card rounded-2xl p-4">
              <div className="overflow-hidden rounded-xl border border-slate-100">
                <img src={teamCommunicationImg} alt="Team Communication" loading="lazy" className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
              </div>
              <div className="mt-3 px-1"><p className="text-sm font-bold text-slate-900">Team Communication — Embedded Chat</p><p className="mt-0.5 text-xs text-slate-500">In-portal direct messaging between admin and agent users with conversation history</p></div>
            </div>
          </Reveal>
          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            {[{ src: revenueDashboardImg, title: "Revenue & Commission Dashboard", comment: "Sales and commission overview with deal volumes and agent performance" }, { src: otpLoginImg, title: "OTP Login & Authentication", comment: "Secure OTP-protected login flow with rate limiting and session management" }, { src: auditLogImg, title: "Audit Log — Platform Governance", comment: "Admin-accessible audit trail showing all user actions and record changes" }].map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <div className="group premium-card rounded-2xl p-4 h-full">
                  <div className="overflow-hidden rounded-xl border border-slate-100">
                    <img src={s.src} alt={s.title} loading="lazy" className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                  </div>
                  <div className="mt-3 px-1"><p className="text-sm font-bold text-slate-900">{s.title}</p><p className="mt-0.5 text-xs text-slate-500">{s.comment}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* IMPACT */}
      <section id="impact" className="scroll-mt-28 bg-[#141A2E] py-20 sm:py-28">
        <Container>
          <Reveal className="text-center mb-12">
            <span className="kicker" style={{ borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.07)", color: "#93c5fd" }}>Impact</span>
            <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>One Portal, Zero Friction, Full Control</h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">The MHG portal replaced fragmented, disconnected tools with a single secure platform — delivering faster operations, stronger security, and better agent productivity across every letting workflow.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-4 mb-10">
            {[{ icon: Layers, label: "Operations", value: "Centralised", color: "#1D4ED8" }, { icon: Phone, label: "Dialer", value: "Integrated", color: "#23A6E8" }, { icon: KeyRound, label: "Security", value: "OTP + Audit", color: "#3AC9F5" }, { icon: BarChart3, label: "Revenue", value: "Dashboarded", color: "#1D4ED8" }].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: `${s.color}30` }}><s.icon className="h-5 w-5" style={{ color: s.color }} /></div>
                    <div><div className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</div><div className="text-sm text-slate-400">{s.label}</div></div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-[#1D4ED8]/30 bg-[#1D4ED8]/10 p-7">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div className="max-w-2xl">
                  <div className="text-base font-bold text-white mb-1" style={{ fontFamily: "var(--font-heading)" }}>Want a similar portal built for your agency?</div>
                  <div className="text-sm text-slate-400">Next.js 14 · React 18 · TypeScript · Prisma ORM · PostgreSQL · Zod · SIP.js · OTP Auth · Audit Logs</div>
                </div>
                <Link to="/contact" className="inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1D4ED8] shadow-lg transition-all hover:scale-105" style={{ fontFamily: "var(--font-heading)" }}>Build Your Portal <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="bg-[#F1F4F9]"><SeoContentFaq content={seoContent} faqs={seoFaqs} lightTheme={true} /></div>
    </>
  );
}
