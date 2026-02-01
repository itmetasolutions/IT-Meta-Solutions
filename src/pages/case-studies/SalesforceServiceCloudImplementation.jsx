import React, { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
    ArrowRight,
    BarChart3,
    CheckCircle2,
    ChevronRight,
    Cloud,
    Database,
    Gauge,
    KeyRound,
    Layers,
    LayoutGrid,
    LineChart,
    Lock,
    Network,
    Settings,
    ShieldCheck,
    Sparkles,
    Target,
    Users,
    Workflow,
    Wrench,
    Home,
    Search,
} from "lucide-react";

/* ==================== IMPORT: ADD YOUR IMAGE PATHS HERE ==================== */
/**
 * Replace with your actual image paths.
 */
import scImage1 from "../../assets/img/Salesforce Service Cloud Implementation Image 1.png"; // Dashboard / Overview
import scImage2 from "../../assets/img/Salesforce Service Cloud Implementation Image 2.png"; // Automation / Lead generation
import scImage3 from "../../assets/img/Salesforce Service Cloud Implementation Image 3.png"; // Case management view
import scImage4 from "../../assets/img/Salesforce Service Cloud Implementation Image 4.png"; // Opportunity tracking


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
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={reduced ? {} : { opacity: 1, y: 0 }}
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
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={reduced ? {} : { opacity: 1, y: 0 }}
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
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={reduced ? {} : { opacity: 1, y: 0 }}
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

function Screenshot({ src, title, comment }) {
    return (
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-4 backdrop-blur-sm h-full">
            <div className="overflow-hidden rounded-2xl">
                <img
                    src={src}
                    alt={title}
                    className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                />
            </div>
            <div className="mt-4 px-2">
                <div className="text-sm font-semibold text-white">{title}</div>
                <div className="mt-1 text-sm text-zinc-400">{comment}</div>
            </div>
        </div>
    );
}

/* ==================== NAV ==================== */
const inPageNav = [
    { label: "Overview", href: "#overview" },
    { label: "Solution", href: "#solution" },
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
                        <Cloud className="h-4 w-4 text-[#5025d1]" />
                        Service Cloud • LWC • Automation Engine
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

/* ==================== PAGE ==================== */
export default function SalesforceServiceCloudCaseManagementCaseStudy() {
    const reduced = usePrefersReducedMotion();
    const year = useMemo(() => new Date().getFullYear(), []);
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 900], [0, reduced ? 0 : -70]);
    const heroOpacity = useTransform(scrollY, [0, 520], [1, 0.9]);
    const heroRef = useRef(null);

    return (
        <>
            <Helmet>
                <title>Salesforce Service Cloud Implementation — Case Management | Case Study | IT Meta Solutions</title>
                <meta
                    name="description"
                    content="Salesforce case study: Service Cloud case management + Lightning Web Components, Experience Cloud, and an automation engine using real-time property data to generate qualified leads and manage opportunities."
                />
                <meta
                    name="keywords"
                    content="Salesforce Service Cloud, case management, Lightning Web Components, LWC, Experience Cloud, Sales Cloud, Apex, VF pages, Salesforce CRM, IT Meta Solutions"
                />
                <meta property="og:title" content="Salesforce Service Cloud Implementation — Case Management | Case Study" />
                <meta
                    property="og:description"
                    content="LWC application integrated with an automation engine to generate qualified leads from real-time property data, with dashboards, role-based access, and external listing integration."
                />
                <meta property="og:type" content="article" />
                <link rel="canonical" href="https://itmetasolutions.com/case-study/salesforce-service-cloud-case-management" />
            </Helmet>

            <div className="relative min-h-screen overflow-hidden text-zinc-100">
                <ScrollProgress />

                {/* Background blobs */}
                <GradientBlob className="left-[-120px] top-[-120px] h-[620px] w-[620px]" color="rgba(80,37,209,0.20)" />
                <GradientBlob className="right-[-180px] top-[180px] h-[720px] w-[720px]" color="rgba(186,85,211,0.14)" />
                <GradientBlob className="bottom-[-160px] left-[25%] h-[760px] w-[760px]" color="rgba(80,37,209,0.16)" />

                {/* HERO */}
                <section ref={heroRef} className="relative pt-24 pb-10 sm:pt-32 sm:pb-16">
                    <Container>
                        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
                            <Reveal>
                                <div className="flex flex-wrap items-center gap-2">
                                    <Pill icon={Cloud}>Service Cloud</Pill>
                                    <Pill icon={Layers}>LWC App</Pill>
                                    <Pill icon={Users}>Role-based access</Pill>
                                    <Pill icon={LayoutGrid}>Dashboards</Pill>
                                    <Pill icon={Database}>Real-time property data</Pill>
                                    <Pill icon={Network}>External listings</Pill>
                                </div>
                            </Reveal>

                            <Reveal delay={0.06}>
                                <h1 className="mt-7 max-w-5xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
                                    Service Cloud Case Management +{" "}
                                    <span className="bg-gradient-to-r from-[#5025d1] via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                        Property Data Automation
                                    </span>
                                </h1>
                            </Reveal>

                            <Reveal delay={0.12}>
                                <p className="mt-5 max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                                    Developed a Salesforce Lightning Web Components application using Sales Cloud and Experience Cloud,
                                    integrated with an automation engine that uses real-time property data to generate qualified Leads or
                                    Potential Buyers. Agents can track opportunities through intuitive dashboards, role-based access, and
                                    seamless integration with external property listing systems.
                                </p>
                            </Reveal>

                            {/* KPI cards (generic; no fake numbers) */}
                            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                <StatCard icon={Workflow} label="Core" value="Case Mgmt" delay={0.05} />
                                <StatCard icon={Target} label="Automation" value="Qualified Leads" delay={0.1} />
                                <StatCard icon={LayoutGrid} label="Agents" value="Dashboards" delay={0.15} />
                                <StatCard icon={ShieldCheck} label="Control" value="RBAC" delay={0.2} />
                            </div>

                            <Reveal delay={0.16}>
                                <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-7 backdrop-blur-sm">
                                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                        <div className="max-w-2xl">
                                            <div className="text-sm font-semibold text-white">Project summary</div>
                                            <div className="mt-1 text-sm text-zinc-300">
                                                A Service Cloud-first solution that centralizes case management while continuously enriching the CRM
                                                with property-driven buyer intent — enabling faster qualification, cleaner pipelines, and better agent
                                                productivity.
                                            </div>
                                        </div>

                                        <a
                                            href="/contact"
                                            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5025d1] to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5025d1]/40 transition-all hover:shadow-xl hover:shadow-[#5025d1]/55 hover:scale-[1.02]"
                                        >
                                            Build in Salesforce
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </a>
                                    </div>

                                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                                        {[
                                            {
                                                icon: Users,
                                                title: "Agents",
                                                desc: "One view to manage cases, leads, and opportunities efficiently.",
                                            },
                                            {
                                                icon: Settings,
                                                title: "Operations",
                                                desc: "Automated creation of qualified records using real-time property data.",
                                            },
                                            {
                                                icon: LineChart,
                                                title: "Leadership",
                                                desc: "Improved oversight with reliable dashboards and pipeline visibility.",
                                            },
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
                                badge="Overview"
                                title={
                                    <>
                                        Turning real-time listings into{" "}
                                        <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                                            qualified opportunities
                                        </span>
                                    </>
                                }
                                description="This project unified case management with lead generation by connecting live property data to Salesforce workflows—so teams can respond faster, qualify better, and manage pipelines with confidence."
                            />
                        </Reveal>

                        <div className="grid gap-6 lg:grid-cols-3">
                            <FeatureCard
                                icon={Search}
                                title="The challenge"
                                desc="Agents needed faster qualification and a single place to manage outcomes."
                                bullets={[
                                    "Leads arriving unqualified or incomplete",
                                    "Data spread across external listing systems",
                                    "Limited visibility into pipeline progress",
                                ]}
                                delay={0.05}
                            />
                            <FeatureCard
                                icon={Target}
                                title="Primary goal"
                                desc="Automate qualification using property signals and simplify agent workflows."
                                bullets={[
                                    "Generate Leads/Potential Buyers automatically",
                                    "Enable efficient opportunity tracking",
                                    "Keep data consistent across systems",
                                ]}
                                delay={0.1}
                            />
                            <FeatureCard
                                icon={ShieldCheck}
                                title="Quality outcome"
                                desc="Improved productivity and decision-making through visibility and structure."
                                bullets={[
                                    "Cleaner pipeline and dashboards",
                                    "Role-based control over sensitive data",
                                    "Less manual work for agents",
                                ]}
                                delay={0.15}
                            />
                        </div>
                    </Container>
                </section>

                <Container>
                    <Divider />
                </Container>

                {/* SOLUTION */}
                <section id="solution" className="scroll-mt-24 py-16 sm:py-20">
                    <Container>
                        <Reveal>
                            <SectionHeading
                                badge="Solution"
                                title={
                                    <>
                                        LWC app + automation engine{" "}
                                        <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                                            working in real-time
                                        </span>
                                    </>
                                }
                                description="We built a Lightning Web Components experience to manage cases and opportunities, while the automation engine continuously interprets property data to generate qualified CRM records."
                            />
                        </Reveal>

                        <div className="grid gap-6 md:grid-cols-2">
                            <FeatureCard
                                icon={Layers}
                                title="Lightning Web Components app"
                                desc="An LWC-driven UI focused on speed and clarity for agents."
                                bullets={[
                                    "Case + opportunity views designed for daily usage",
                                    "Fast navigation and reusable components",
                                    "Consistent UX across teams",
                                ]}
                                delay={0.05}
                            />
                            <FeatureCard
                                icon={Workflow}
                                title="Automation engine integration"
                                desc="Turns property signals into actionable Salesforce records."
                                bullets={[
                                    "Uses real-time property data inputs",
                                    "Creates Leads or Potential Buyers based on qualification logic",
                                    "Supports routing + ownership patterns",
                                ]}
                                delay={0.1}
                            />
                        </div>

                        <div className="mt-6 grid gap-6 lg:grid-cols-3">
                            <FeatureCard
                                icon={LayoutGrid}
                                title="Agent dashboards"
                                desc="Clear views for tracking and prioritization."
                                bullets={[
                                    "Pipeline and activity overview",
                                    "Opportunity stage visibility",
                                    "Work queues and next-best actions",
                                ]}
                                delay={0.05}
                            />
                            <FeatureCard
                                icon={KeyRound}
                                title="Role-based access"
                                desc="Right data for the right users."
                                bullets={[
                                    "Permission-aware UI behavior",
                                    "Field/record visibility patterns",
                                    "Safer collaboration across roles",
                                ]}
                                delay={0.1}
                            />
                            <FeatureCard
                                icon={Network}
                                title="External listings integration"
                                desc="Sync and reference data without breaking workflows."
                                bullets={[
                                    "Seamless linkage to listing systems",
                                    "Reduced double-entry risk",
                                    "Consistent source-of-truth behavior",
                                ]}
                                delay={0.15}
                            />
                        </div>

                        <Reveal delay={0.16}>
                            <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#5025d1]/20 to-purple-600/20 p-6 backdrop-blur-sm">
                                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                                    <div className="max-w-2xl">
                                        <div className="text-sm font-semibold text-white">What made it successful</div>
                                        <div className="mt-1 text-sm text-zinc-300">
                                            We aligned the automation logic with agent workflows—so qualification happens in the background, while
                                            the UI stays fast, simple, and action-driven.
                                        </div>
                                    </div>
                                    <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
                                        <ChevronRight className="h-4 w-4" />
                                        Ingest → qualify → close
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </Container>
                </section>

                <Container>
                    <Divider />
                </Container>

                {/* ARCHITECTURE */}
                <section id="architecture" className="scroll-mt-24 py-16 sm:py-20">
                    <Container>
                        <Reveal>
                            <SectionHeading
                                badge="Architecture"
                                title={
                                    <>
                                        Built with scalable{" "}
                                        <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                                            Salesforce foundations
                                        </span>
                                    </>
                                }
                                description="The implementation used Apex + VF pages where needed, while keeping the overall experience Lightning-first and maintainable."
                            />
                        </Reveal>

                        <div className="grid gap-6 lg:grid-cols-3">
                            <FeatureCard
                                icon={Wrench}
                                title="Apex-driven logic"
                                desc="Server-side logic to support complex workflows and integrations."
                                bullets={[
                                    "Business logic and validation patterns",
                                    "Integration-friendly services",
                                    "Error handling and stability",
                                ]}
                                delay={0.05}
                            />
                            <FeatureCard
                                icon={Layers}
                                title="Lightning-first UI"
                                desc="LWC components designed for reuse and speed."
                                bullets={[
                                    "Reusable UI blocks",
                                    "Consistent navigation patterns",
                                    "Performance-aware design",
                                ]}
                                delay={0.1}
                            />
                            <FeatureCard
                                icon={Gauge}
                                title="Experience Cloud support"
                                desc="Extended access and controlled experiences (where applicable)."
                                bullets={[
                                    "Experience Cloud integration",
                                    "Secure access patterns",
                                    "Role-aligned experiences",
                                ]}
                                delay={0.15}
                            />
                        </div>

                        <Reveal delay={0.16}>
                            <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-7 backdrop-blur-sm">
                                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                    <div className="max-w-2xl">
                                        <div className="text-sm font-semibold text-white">Tech highlights</div>
                                        <div className="mt-1 text-sm text-zinc-300">
                                            Apex services • Salesforce CRM • Service Cloud • VF pages • LWC • Integration patterns
                                        </div>
                                    </div>
                                    <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
                                        <ShieldCheck className="h-4 w-4" />
                                        Stable + maintainable
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </Container>
                </section>

                <Container>
                    <Divider />
                </Container>

                {/* SCREENSHOT */}
                {/* SCREENSHOTS */}
                <section id="screens" className="scroll-mt-24 py-16 sm:py-20">
                    <Container>
                        <Reveal>
                            <SectionHeading
                                badge="Project Screenshots"
                                title={
                                    <>
                                        See the platform{" "}
                                        <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                                            in action
                                        </span>
                                    </>
                                }
                            />
                        </Reveal>

                        <div className="mt-10 grid gap-6 lg:grid-cols-2">
                            <Reveal delay={0.05}>
                                <Screenshot
                                    src={scImage1}
                                    title="Staff n Operation LWC - Aura"
                                />
                            </Reveal>

                            <Reveal delay={0.1}>
                                <Screenshot
                                    src={scImage2}
                                    title="Report of collection LWC - Aura"
                                />
                            </Reveal>

                            <Reveal delay={0.15}>
                                <Screenshot
                                    src={scImage3}
                                    title="Add Reciept LWC - Aura"
                                />
                            </Reveal>

                            <Reveal delay={0.2}>
                                <Screenshot
                                    src={scImage4}
                                    title="Add Invoice LWC - Aura"
                                />
                            </Reveal>
                        </div>
                    </Container>
                </section>


                <Container>
                    <Divider />
                </Container>

                {/* IMPACT */}
                <section id="impact" className="scroll-mt-24 py-16 sm:py-20 pb-24">
                    <Container>
                        <Reveal>
                            <SectionHeading
                                badge="Impact"
                                title={
                                    <>
                                        Faster qualification, clearer pipelines,{" "}
                                        <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                                            better agent performance
                                        </span>
                                    </>
                                }
                                description="This solution reduced manual work, improved lead quality, and made it easier for agents to manage opportunities end-to-end."
                                centered
                            />
                        </Reveal>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <StatCard icon={Target} label="Lead quality" value="More qualified" delay={0.05} />
                            <StatCard icon={Workflow} label="Workflows" value="More efficient" delay={0.1} />
                            <StatCard icon={LayoutGrid} label="Visibility" value="Clearer pipeline" delay={0.15} />
                            <StatCard icon={Users} label="Agents" value="More productive" delay={0.2} />
                        </div>

                        <Reveal delay={0.15}>
                            <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#5025d1]/20 to-purple-600/20 p-7 backdrop-blur-sm">
                                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                                    <div className="max-w-2xl">
                                        <div className="text-sm font-semibold text-white">Skills & deliverables</div>
                                        <div className="mt-1 text-sm text-zinc-300">Apex • Salesforce CRM • Service Cloud • VF pages</div>
                                    </div>

                                    <a
                                        href="/contact"
                                        className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#5025d1] shadow-lg transition-all hover:scale-[1.02]"
                                    >
                                        Discuss your Salesforce build
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </a>
                                </div>
                            </div>
                        </Reveal>

                        <div className="mt-10 text-center text-xs text-zinc-500">© {year} • Salesforce case study • IT Meta Solutions</div>
                    </Container>
                </section>
            </div>
        </>
    );
}
