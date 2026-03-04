import React, { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import SeoContentFaq from "../../components/SeoContentFaq";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
    ArrowRight,
    BarChart3,
    ExternalLink,
    Building2,
    CheckCircle2,
    ChevronRight,
    Cog,
    Database,
    FileText,
    Gauge,
    Home,
    KeyRound,
    Layers,
    LayoutGrid,
    LineChart,
    Lock,
    MessageSquare,
    Network,
    Phone,
    Search,
    Settings,
    ShieldCheck,
    Sparkles,
    Target,
    Users,
    Wallet,
    Workflow,
    Wrench,
} from "lucide-react";

/* ==================== IMAGE IMPORTS ==================== */
import lettingAgencyBannerImg from "../../assets/img/Banner Image.png";
import adminControlCenterImg from "../../assets/img/Admin Control Center.png";
import agentWorkspaceImg from "../../assets/img/Agent Workspace \u2014 Property Lifecycle.png";
import dialerSuiteImg from "../../assets/img/Dialer Suite \u2014 Dialpad & Call History.png";
import dialerLabelsImg from "../../assets/img/Dialer \u2014 Labels, Notes & Recordings.png";
import teamCommunicationImg from "../../assets/img/Team Communication \u2014 Embedded Chat.png";
import revenueDashboardImg from "../../assets/img/Revenue & Commission Dashboard.png";
import otpLoginImg from "../../assets/img/OTP Login & Authentication.png";
import auditLogImg from "../../assets/img/Audit Log \u2014 Platform Governance.png";

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
    const s = useSpring(scrollYProgress, { stiffness: 120, damping: 18, mass: 0.5 });
    return (
        <motion.div
            aria-hidden
            className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-[#5025d1] via-purple-500 to-pink-500"
            style={{ scaleX: s }}
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
            {Icon ? <Icon className="h-3.5 w-3.5 flex-shrink-0 opacity-90" /> : null}
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
                <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-3">
                    <Icon className="h-6 w-6 flex-shrink-0 text-white" />
                </div>
                <div className="min-w-0">
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
                    <div className="flex-shrink-0 inline-flex rounded-2xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-3">
                        <Icon className="h-5 w-5 flex-shrink-0 text-white" />
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

/* ==================== SCREENSHOT CARD ==================== */
function Screenshot({ src, title, comment }) {
    return (
        <div className="group rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-4 backdrop-blur-sm h-full">
            <div className="overflow-hidden rounded-2xl border border-white/10">
                <img
                    src={src}
                    alt={title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
            </div>
            <div className="mt-4 px-2">
                <div className="text-sm font-semibold text-white">{title}</div>
                {comment && <div className="mt-1 text-sm text-zinc-400">{comment}</div>}
            </div>
        </div>
    );
}

/* ==================== MODULE DETAIL BLOCK ==================== */
function ModuleBlock({ icon: Icon, number, title, desc, fields, delay = 0 }) {
    const reduced = usePrefersReducedMotion();
    return (
        <motion.div
            initial={reduced ? false : { y: 16 }}
            whileInView={reduced ? {} : { y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 sm:p-8 backdrop-blur-sm"
        >
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-gradient-to-br from-[#5025d1]/15 to-purple-600/15 blur-3xl" />
            <div className="relative flex flex-col gap-5 md:flex-row md:gap-8">
                <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-3 md:w-56 md:flex-shrink-0">
                    <div className="flex-shrink-0 rounded-2xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-3">
                        <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <div className="text-xs font-semibold uppercase tracking-widest text-purple-400">Module {number}</div>
                        <h3 className="text-xl font-bold text-white">{title}</h3>
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm leading-relaxed text-zinc-300">{desc}</p>
                    {fields?.length ? (
                        <div className="mt-5 grid gap-2 sm:grid-cols-2">
                            {fields.map((f, i) => (
                                <div key={i} className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                                    <ChevronRight className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-purple-400" />
                                    <span className="text-xs text-zinc-200">{f}</span>
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>
        </motion.div>
    );
}

/* ==================== NAV ==================== */
const inPageNav = [
    { label: "Overview", href: "#overview" },
    { label: "Modules", href: "#modules" },
    { label: "Architecture", href: "#architecture" },
    { label: "Screenshots", href: "#screens" },
    { label: "Impact", href: "#impact" },
];

function StickySubnav() {
    return (
        <div className="sticky top-[72px] z-40 border-b border-white/10 bg-white/5 backdrop-blur-lg">
            <Container className="py-3">
                <div className="flex items-center justify-between gap-3">
                    <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-300">
                        <Layers className="h-4 w-4 text-[#5025d1]" />
                        Next.js 14 • PostgreSQL • TypeScript • SIP.js
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

/* ==================== SEO DATA ==================== */
const seoContent = {
    kicker: "Case Study",
    title: "MHG Portal — Custom Letting Agency Operations Platform",
    subtitle:
        "Custom Next.js web application built for More Homes Group — a centralised portal for letting operations with role-based access, OTP login, an integrated dialer suite, and full audit governance.",
    paragraphs: [
        "We designed and delivered a bespoke operations portal for More Homes Group, replacing fragmented tools with a single unified platform covering landlord onboarding, property lifecycle management, sales tracking, tenant records, and an integrated SIP dialer.",
        "The platform is built on Next.js 14, TypeScript, and PostgreSQL via Prisma ORM, with a two-tier role model (Admin and Agent), OTP-protected login with rate limiting, platform-wide audit logs, and a built-in dialer suite ready for SIP/LINKUS integration.",
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
    {
        q: "What technology was used to build the MHG letting agency portal?",
        a: "The portal is built on Next.js 14, React 18, and TypeScript with a PostgreSQL database managed through Prisma ORM. The dialer suite integrates via SIP.js and is LINKUS-ready. Deployment is Vercel/Docker-compatible.",
    },
    {
        q: "Does the MHG portal support multiple user roles?",
        a: "Yes. The system has two core roles — Admin and Agent. Admins manage users, commissions, dialer settings, and audit logs. Agents handle day-to-day landlord, property, sales, and tenant workflows.",
    },
    {
        q: "How does the login security work?",
        a: "The portal uses an OTP-protected login flow with rate limiting and secure session management to prevent unauthorised access and ensure auditability.",
    },
    {
        q: "What does the integrated dialer include?",
        a: "The dialer suite includes a live-status dialpad, contacts management, call history, internal intercalling (extension-to-extension), labels, favourites, contact and call notes, and recording URL support.",
    },
    {
        q: "Can you build a similar custom letting agency portal for our business?",
        a: "Absolutely. We build bespoke web applications tailored to letting and estate agency workflows. Contact us to discuss your requirements.",
    },
];

/* ==================== PAGE ==================== */
export default function LettingAgencyPortalCaseStudy() {
    const reduced = usePrefersReducedMotion();
    const year = useMemo(() => new Date().getFullYear(), []);
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 900], [0, reduced ? 0 : -70]);
    const heroOpacity = useTransform(scrollY, [0, 520], [1, 0.9]);
    const heroRef = useRef(null);

    return (
        <>
            <Helmet>
                <title>MHG Portal — Custom Letting Agency Web Application | Case Study | IT Meta Solutions</title>
                <meta
                    name="description"
                    content="Custom Next.js letting agency portal for More Homes Group — role-based access, OTP login, integrated SIP dialer, landlord & property management, sales tracking, and full audit logs."
                />
                <meta
                    name="keywords"
                    content="letting agency portal, custom web application, Next.js CRM, More Homes Group, SIP dialer, role-based access, OTP login, property management, IT Meta Solutions"
                />
                <meta property="og:title" content="MHG Portal — Custom Letting Agency Web Application | Case Study" />
                <meta
                    property="og:description"
                    content="Bespoke letting agency operations portal built on Next.js 14 with PostgreSQL, SIP dialer integration, OTP-secured login, admin and agent workspaces, and platform-wide audit governance."
                />
                <meta property="og:type" content="article" />
                <link rel="canonical" href="https://itmetasolutions.com/case-study/letting-agency-portal" />
                <meta property="og:url" content="https://itmetasolutions.com/case-study/letting-agency-portal" />
                <meta property="og:image" content="https://itmetasolutions.com/favicon.webp" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="MHG Portal — Custom Letting Agency Web Application | Case Study" />
                <meta
                    name="twitter:description"
                    content="Bespoke letting agency operations portal built on Next.js 14 with PostgreSQL, SIP dialer integration, OTP-secured login, admin and agent workspaces, and platform-wide audit governance."
                />
                <meta name="twitter:image" content="https://itmetasolutions.com/favicon.webp" />
            </Helmet>

            <div className="relative min-h-screen overflow-hidden text-zinc-100">
                <ScrollProgress />

                <GradientBlob className="left-[-120px] top-[-120px] h-[620px] w-[620px]" color="rgba(80,37,209,0.20)" />
                <GradientBlob className="right-[-180px] top-[180px] h-[720px] w-[720px]" color="rgba(186,85,211,0.14)" />
                <GradientBlob className="bottom-[-160px] left-[25%] h-[760px] w-[760px]" color="rgba(80,37,209,0.16)" />

                {/* ==================== HERO ==================== */}
                <section ref={heroRef} className="relative pt-24 pb-10 sm:pt-32 sm:pb-16">
                    <Container>
                        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
                            <Reveal>
                                <div className="flex flex-wrap items-center gap-2">
                                    <Pill icon={Layers}>Next.js 14</Pill>
                                    <Pill icon={Database}>PostgreSQL</Pill>
                                    <Pill icon={FileText}>TypeScript</Pill>
                                    <Pill icon={Phone}>SIP Dialer</Pill>
                                    <Pill icon={Users}>Role-Based Access</Pill>
                                    <Pill icon={KeyRound}>OTP Login</Pill>
                                    <Pill icon={Settings}>Admin Controls</Pill>
                                    <Pill icon={ShieldCheck}>Audit Logs</Pill>
                                </div>
                            </Reveal>

                            <Reveal delay={0.06}>
                                <h1 className="mt-7 max-w-5xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
                                    MHG Portal —{" "}
                                    <span className="bg-gradient-to-r from-[#5025d1] via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                        Custom Letting Agency App
                                    </span>
                                </h1>
                            </Reveal>

                            <Reveal delay={0.12}>
                                <p className="mt-5 max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                                    A bespoke operations portal built for More Homes Group — replacing disconnected tools with a single platform for
                                    landlord onboarding, property lifecycle management, sales tracking, tenant records, an integrated SIP dialer suite,
                                    team chat, and full audit governance. Built on Next.js 14, TypeScript, and PostgreSQL.
                                </p>
                            </Reveal>

                            <Reveal delay={0.14}>
                                <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02]">
                                    <img
                                        src={lettingAgencyBannerImg}
                                        alt="MHG Portal banner"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </Reveal>
                            {/* KPI cards */}
                            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                <StatCard icon={Layers} label="Core Modules" value="5 Modules" delay={0.05} />
                                <StatCard icon={Users} label="User Roles" value="Admin + Agent" delay={0.1} />
                                <StatCard icon={Phone} label="Dialer" value="SIP Integrated" delay={0.15} />
                                <StatCard icon={ShieldCheck} label="Security" value="OTP + Audit" delay={0.2} />
                            </div>

                            <Reveal delay={0.18}>
                                <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-7 backdrop-blur-sm">
                                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                        <div className="max-w-2xl">
                                            <div className="text-sm font-semibold text-white">Project summary</div>
                                            <div className="mt-1 text-sm text-zinc-300">
                                                End-to-end custom web portal for More Homes Group — combining CRM-style letting workflows, an integrated
                                                dialer suite, team communication, and compliance governance in one secure, role-based platform.
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-3">
                                            <a
                                                href="https://portal.morehomesgroup.co.uk/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/[0.12] hover:scale-[1.02]"
                                            >
                                                Visit Live Site
                                                <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                            </a>
                                            <a
                                                href="/contact"
                                                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5025d1] to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5025d1]/40 transition-all hover:shadow-xl hover:shadow-[#5025d1]/55 hover:scale-[1.02]"
                                            >
                                                Build Your Portal
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </a>
                                        </div>
                                    </div>

                                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                                        {[
                                            { icon: Settings, title: "Admin Control Center", desc: "Agent management, commission config, dialer domain setup, audit logs, and full portfolio visibility." },
                                            { icon: Users, title: "Agent Workspace", desc: "Daily execution for landlord onboarding, property lifecycle tracking, sales closure, and tenant records." },
                                            { icon: Phone, title: "Dialer Suite", desc: "SIP/LINKUS-ready dialpad with call history, intercalling, contacts, labels, notes, and recording URLs." },
                                        ].map((b) => (
                                            <div key={b.title} className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col justify-center">
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

                {/* ==================== OVERVIEW ==================== */}
                <section id="overview" className="scroll-mt-24 py-16 sm:py-20">
                    <Container>
                        <Reveal>
                            <SectionHeading
                                badge="Overview"
                                title={
                                    <>
                                        One platform to run{" "}
                                        <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                                            all letting operations
                                        </span>
                                    </>
                                }
                                description="More Homes Group needed a single platform to run day-to-day agency operations without switching between disconnected tools. We built a centralised portal combining business workflows, communication, and compliance in one system."
                            />
                        </Reveal>

                        <div className="grid gap-6 lg:grid-cols-3">
                            <FeatureCard
                                icon={Search}
                                title="The problem"
                                desc="Fragmented tools, limited visibility, and weak communication flow between teams."
                                bullets={[
                                    "Landlord, property, sales, and tenant records stored separately",
                                    "Limited visibility across admin and agent activity",
                                    "Weak communication flow between teams",
                                    "No structured dialer workflow for calling operations",
                                    "Insufficient login security and no audit trail",
                                ]}
                                delay={0.05}
                            />
                            <FeatureCard
                                icon={Target}
                                title="The solution"
                                desc="A centralised Next.js operations portal combining workflows, communication, and compliance."
                                bullets={[
                                    "Role-based architecture for Admin and Agent users",
                                    "OTP-protected login with rate limiting and secure sessions",
                                    "Unified data model for landlords, properties, sales, tenants",
                                    "Integrated SIP/LINKUS-ready dialer suite",
                                    "Platform-wide audit logs for full governance",
                                ]}
                                delay={0.1}
                            />
                            <FeatureCard
                                icon={ShieldCheck}
                                title="Delivered outcomes"
                                desc="A fully operational letting portal serving admin and agent users from a single secure system."
                                bullets={[
                                    "Single source of truth for core letting operations",
                                    "Faster admin oversight with cleaner ownership controls",
                                    "Stronger security via OTP and role-aware access",
                                    "Improved agent productivity with integrated dialer + CRM",
                                    "Compliance readiness through persistent audit trails",
                                ]}
                                delay={0.15}
                            />
                        </div>
                    </Container>
                </section>

                <Container><Divider /></Container>

                {/* ==================== MODULES ==================== */}
                <section id="modules" className="scroll-mt-24 py-16 sm:py-20">
                    <Container>
                        <Reveal>
                            <SectionHeading
                                badge="Core Modules"
                                title={
                                    <>
                                        Every part of the portal,{" "}
                                        <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                                            in detail
                                        </span>
                                    </>
                                }
                                description="The system is organised into five core modules. Each handles a distinct area of the letting business — from admin oversight and agent workflows through the dialer suite, team communication, and revenue reporting."
                            />
                        </Reveal>

                        <div className="flex flex-col gap-6">
                            <ModuleBlock
                                icon={Cog}
                                number="01"
                                title="Admin Control Center"
                                desc="The admin-only hub for managing the entire platform. Admins control agents, configure commission structures, set dialer domain settings, review audit logs, and maintain full visibility across the portfolio and operations."
                                fields={[
                                    "Agent account creation, editing & deactivation",
                                    "Commission rate configuration per agent / deal type",
                                    "Dialer domain & SIP extension management",
                                    "Platform-wide audit log (all user actions & changes)",
                                    "Full portfolio visibility (landlords, properties, sales, tenants)",
                                    "Role assignment and permission management",
                                    "System settings and configuration panel",
                                    "User session management and security oversight",
                                ]}
                                delay={0.05}
                            />

                            <ModuleBlock
                                icon={Users}
                                number="02"
                                title="Agent Workspace"
                                desc="The day-to-day operational hub for agents. From a single workspace, agents handle every core letting workflow — onboarding landlords, managing property lifecycles, closing sales, maintaining tenant records, and updating their own profiles."
                                fields={[
                                    "Landlord onboarding and profile management",
                                    "Property lifecycle tracking (listing → active → closed)",
                                    "Sales record creation, progression, and closure",
                                    "Tenant record management and status tracking",
                                    "Agent profile and settings management",
                                    "Assigned portfolio view per agent",
                                    "Activity log and notes per record",
                                    "Commission earned and payment status view",
                                ]}
                                delay={0.07}
                            />

                            <ModuleBlock
                                icon={Phone}
                                number="03"
                                title="Dialer Suite"
                                desc="A fully integrated calling workflow built directly into the portal. The dialer suite is SIP/LINKUS-ready and covers the complete calling experience — from live-status dial to post-call notes and recording management."
                                fields={[
                                    "Dialpad with live call status indicator",
                                    "Contacts management (import, create, organise)",
                                    "Full call history management (inbound & outbound)",
                                    "Intercalling — internal extension-to-extension calls",
                                    "Labels for categorising calls and contacts",
                                    "Favourites for quick-access contacts",
                                    "Per-contact and per-call notes",
                                    "Recording URL support for call review",
                                ]}
                                delay={0.09}
                            />

                            <ModuleBlock
                                icon={MessageSquare}
                                number="04"
                                title="Team Communication"
                                desc="An embedded chat system built into the portal for fast internal coordination between users. Agents and admins can message each other directly without switching to external tools, keeping communication in context and on record."
                                fields={[
                                    "Direct messaging between portal users",
                                    "Real-time message delivery",
                                    "Conversation history and message persistence",
                                    "User presence and online status",
                                    "Message notifications and unread indicators",
                                    "Accessible to both Admin and Agent roles",
                                ]}
                                delay={0.11}
                            />

                            <ModuleBlock
                                icon={BarChart3}
                                number="05"
                                title="Revenue & Performance"
                                desc="Sales and commission dashboards give admins and agents clear visibility into financial performance. Operational reporting views cover deal volumes, revenue earned, commission calculations, and overall portfolio activity."
                                fields={[
                                    "Sales dashboard with deal volume and status breakdown",
                                    "Commission dashboard per agent (earned vs paid)",
                                    "Revenue overview for admin users",
                                    "Operational reporting views for activity monitoring",
                                    "Agent performance summaries",
                                    "Filterable date-range reporting",
                                    "Portfolio-level financial snapshot",
                                    "Export-ready reports (proposed next phase)",
                                ]}
                                delay={0.13}
                            />
                        </div>
                    </Container>
                </section>

                <Container><Divider /></Container>

                {/* ==================== ARCHITECTURE ==================== */}
                <section id="architecture" className="scroll-mt-24 py-16 sm:py-20">
                    <Container>
                        <Reveal>
                            <SectionHeading
                                badge="Architecture"
                                title={
                                    <>
                                        Built on a modern{" "}
                                        <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                                            full-stack foundation
                                        </span>
                                    </>
                                }
                                description="The portal is built on Next.js 14 with a PostgreSQL database managed through Prisma ORM. SIP.js powers the integrated dialer, Zod handles validation, and the system is deployable on Vercel or Docker."
                            />
                        </Reveal>

                        <div className="grid gap-6 lg:grid-cols-3">
                            <FeatureCard
                                icon={Layers}
                                title="Next.js 14 + React 18"
                                desc="The frontend and API layer are built on Next.js 14 with React 18 and TypeScript throughout."
                                bullets={[
                                    "App Router with server and client components",
                                    "TypeScript for type-safe development",
                                    "Server Actions for form and mutation handling",
                                    "Optimised rendering and page performance",
                                    "Vercel-ready deployment model",
                                ]}
                                delay={0.05}
                            />
                            <FeatureCard
                                icon={Database}
                                title="Prisma ORM + PostgreSQL"
                                desc="Prisma provides a type-safe ORM layer over PostgreSQL with a clean, structured data model."
                                bullets={[
                                    "Unified schema for landlords, properties, sales, tenants",
                                    "Relational integrity with typed queries",
                                    "Migration management with Prisma Migrate",
                                    "Zod validation on all inputs and API boundaries",
                                    "Docker-compatible database setup",
                                ]}
                                delay={0.1}
                            />
                            <FeatureCard
                                icon={Phone}
                                title="SIP.js Dialer Integration"
                                desc="The dialer suite integrates SIP.js for browser-based calling, ready for LINKUS and SIP server connections."
                                bullets={[
                                    "SIP.js for WebRTC-based call handling",
                                    "LINKUS-ready architecture for enterprise PBX",
                                    "Live call status and session management",
                                    "Extension-to-extension intercalling support",
                                    "Call recording URL capture and storage",
                                ]}
                                delay={0.15}
                            />
                        </div>

                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <FeatureCard
                                icon={Lock}
                                title="Security & Authentication"
                                desc="OTP-protected login with rate limiting, secure sessions, and a two-tier role model."
                                bullets={[
                                    "OTP-based login flow with expiry and rate limiting",
                                    "Secure session management (server-side)",
                                    "Two-tier role model: Admin and Agent",
                                    "Role-aware route protection and UI rendering",
                                    "Sensitive operations gated behind admin access",
                                    "Platform-wide audit log for all user actions",
                                ]}
                                delay={0.05}
                            />
                            <FeatureCard
                                icon={Workflow}
                                title="Roadmap — Next Phase"
                                desc="The proposed next phase adds scheduling, notifications, automation, and advanced reporting."
                                bullets={[
                                    "Scheduling: callbacks, follow-ups, and call plans",
                                    "Notification engine: missed calls, due reminders, assignments",
                                    "Workflow automation: rule-based triggers and escalation logic",
                                    "Advanced reporting: export-ready, role-specific dashboards",
                                    "Optional integrations: calendar, telephony analytics, BI tools",
                                ]}
                                delay={0.1}
                            />
                        </div>

                        <Reveal delay={0.16}>
                            <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-7 backdrop-blur-sm">
                                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                    <div className="max-w-2xl">
                                        <div className="text-sm font-semibold text-white">Full tech stack</div>
                                        <div className="mt-1 text-sm text-zinc-300">
                                            Next.js 14 • React 18 • TypeScript • Prisma ORM • PostgreSQL •
                                            Zod • SIP.js • Vercel / Docker
                                        </div>
                                    </div>
                                    <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
                                        <ShieldCheck className="h-4 w-4" />
                                        OTP + Audit secured
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </Container>
                </section>

                <Container><Divider /></Container>

                {/* ==================== SCREENSHOTS ==================== */}
                <section id="screens" className="scroll-mt-24 py-16 sm:py-20">
                    <Container>
                        <Reveal>
                            <SectionHeading
                                badge="Project Screenshots"
                                title={
                                    <>
                                        See the portal{" "}
                                        <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                                            in action
                                        </span>
                                    </>
                                }
                                description="Screenshots of all major modules — admin control center, agent workspace, dialer suite, team chat, and revenue dashboards."
                            />
                        </Reveal>

                        {/* Row 1 - 2 wide */}
                        <div className="grid gap-6 lg:grid-cols-2">
                            <Reveal delay={0.05}>
                                <Screenshot
                                    src={adminControlCenterImg}
                                    title="Admin Control Center"
                                    comment="Agent management, commission config, dialer domain settings, and audit log overview"
                                />
                            </Reveal>
                            <Reveal delay={0.1}>
                                <Screenshot
                                    src={agentWorkspaceImg}
                                    title="Agent Workspace - Property Lifecycle"
                                    comment="Agent view showing landlord onboarding, property status tracking, and sales records"
                                />
                            </Reveal>
                        </div>

                        {/* Row 2 - 2 wide */}
                        <div className="mt-6 grid gap-6 lg:grid-cols-2">
                            <Reveal delay={0.05}>
                                <Screenshot
                                    src={dialerSuiteImg}
                                    title="Dialer Suite - Dialpad & Call History"
                                    comment="Live-status dialpad, call history log, contacts list, and intercalling interface"
                                />
                            </Reveal>
                            <Reveal delay={0.1}>
                                <Screenshot
                                    src={dialerLabelsImg}
                                    title="Dialer - Labels, Notes & Recordings"
                                    comment="Call labelling, per-call notes, favourites, and recording URL management"
                                />
                            </Reveal>
                        </div>

                        {/* Row 3 - full width */}
                        <div className="mt-6">
                            <Reveal delay={0.05}>
                                <Screenshot
                                    src={teamCommunicationImg}
                                    title="Team Communication - Embedded Chat"
                                    comment="In-portal direct messaging between admin and agent users with conversation history"
                                />
                            </Reveal>
                        </div>

                        {/* Row 4 - 3 columns */}
                        <div className="mt-6 grid gap-6 lg:grid-cols-3">
                            <Reveal delay={0.05}>
                                <Screenshot
                                    src={revenueDashboardImg}
                                    title="Revenue & Commission Dashboard"
                                    comment="Sales and commission overview with deal volumes and agent performance summaries"
                                />
                            </Reveal>
                            <Reveal delay={0.1}>
                                <Screenshot
                                    src={otpLoginImg}
                                    title="OTP Login & Authentication"
                                    comment="Secure OTP-protected login flow with rate limiting and session management"
                                />
                            </Reveal>
                            <Reveal delay={0.15}>
                                <Screenshot
                                    src={auditLogImg}
                                    title="Audit Log - Platform Governance"
                                    comment="Admin-accessible audit trail showing all user actions and record changes across the portal"
                                />
                            </Reveal>
                        </div>
                    </Container>
                </section>

                <Container><Divider /></Container>

                {/* ==================== IMPACT ==================== */}
                <section id="impact" className="scroll-mt-24 py-16 sm:py-20 pb-24">
                    <Container>
                        <Reveal>
                            <SectionHeading
                                badge="Impact"
                                title={
                                    <>
                                        One portal, zero friction,{" "}
                                        <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                                            full control
                                        </span>
                                    </>
                                }
                                description="The MHG portal replaced fragmented, disconnected tools with a single secure platform — delivering faster operations, stronger security, and better agent productivity across every letting workflow."
                                centered
                            />
                        </Reveal>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <StatCard icon={Layers} label="Operations" value="Centralised" delay={0.05} />
                            <StatCard icon={Phone} label="Dialer" value="Integrated" delay={0.1} />
                            <StatCard icon={KeyRound} label="Security" value="OTP + Audit" delay={0.15} />
                            <StatCard icon={BarChart3} label="Revenue" value="Dashboarded" delay={0.2} />
                        </div>

                        <div className="mt-8 grid gap-6 md:grid-cols-2">
                            <Reveal delay={0.05}>
                                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-7 h-full">
                                    <h3 className="text-lg font-bold text-white">Operational outcomes</h3>
                                    <ul className="mt-5 space-y-3 text-sm text-zinc-200">
                                        {[
                                            "Single source of truth for landlords, properties, sales, and tenants",
                                            "Faster admin oversight with cleaner ownership and control boundaries",
                                            "Agents work from a unified workspace without switching tools",
                                            "Integrated dialer reduces context switching during calling workflows",
                                            "Embedded team chat keeps communication in-platform and on record",
                                            "Persistent audit trails support compliance and accountability",
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Reveal>

                            <Reveal delay={0.1}>
                                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-7 h-full">
                                    <h3 className="text-lg font-bold text-white">Technical deliverables</h3>
                                    <ul className="mt-5 space-y-3 text-sm text-zinc-200">
                                        {[
                                            "Next.js 14 + TypeScript portal with App Router and Server Actions",
                                            "PostgreSQL database managed via Prisma ORM with typed queries",
                                            "Zod validation layer across all inputs and API boundaries",
                                            "SIP.js dialer suite with intercalling and recording URL support",
                                            "OTP login with rate limiting, secure sessions, and role-aware routing",
                                            "Platform-wide audit logging for admin governance and compliance",
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-purple-400" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Reveal>
                        </div>

                        <Reveal delay={0.15}>
                            <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#5025d1]/20 to-purple-600/20 p-7 backdrop-blur-sm">
                                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                                    <div className="max-w-2xl">
                                        <div className="text-sm font-semibold text-white">Skills & deliverables</div>
                                        <div className="mt-1 text-sm text-zinc-300">
                                            Next.js 14 • React 18 • TypeScript • Prisma ORM • PostgreSQL •
                                            Zod • SIP.js • OTP Auth • Audit Logs • Vercel / Docker
                                        </div>
                                    </div>
                                    <a
                                        href="/contact"
                                        className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#5025d1] shadow-lg transition-all hover:scale-[1.02]"
                                    >
                                        Build Your Portal
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </a>
                                </div>
                            </div>
                        </Reveal>

                        <div className="mt-10 text-center text-xs text-zinc-500">
                            © {year} • MHG Portal case study • IT Meta Solutions
                        </div>
                    </Container>
                </section>

                <SeoContentFaq content={seoContent} faqs={seoFaqs} />
            </div>
        </>
    );
}
