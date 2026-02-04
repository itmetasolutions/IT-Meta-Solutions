import React, { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import SeoContentFaq from "../../components/SeoContentFaq";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  CreditCard,
  FileSearch,
  Gauge,
  Globe,
  Home,
  Layers,
  LineChart,
  Lock,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  Ticket,
  Users,
  Workflow,
} from "lucide-react";

/* =========================================================
   ✅ Project 2 — Salesforce Experience Cloud & Government Cloud (Customer Portal)
   - Same look/feel as your reference page (dark + glass + gradients + blobs)
   - Sticky subnav + scroll progress + reduced-motion safe reveals
   - 4 screenshot placeholders (IMPORT SPACE ON TOP)
   - Portfolio-ready narrative (Government of Australia portal)
========================================================= */

/* ==================== IMPORTS: ADD YOUR IMAGE PATHS HERE ==================== */
/**
 * Replace these 4 lines with your actual image paths.
 * Example:
 * import portalImg1 from "../assets/img/portal-1.png";
 */
import portalImg1 from "../../assets/img/Salesforce Experience Cloud & Government Cloud Image 1.png"; // ✅ add path
import portalImg2 from "../../assets/img/Salesforce Experience Cloud & Government Cloud Image 2.png"; // ✅ add path
import portalImg3 from "../../assets/img/Salesforce Experience Cloud & Government Cloud Image 3.png"; // ✅ add path
import portalImg4 from "../../assets/img/Salesforce Experience Cloud & Government Cloud Image 4.png"; // ✅ add path

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
  { label: "Modules", href: "#modules" },
  { label: "Screenshots", href: "#screens" },
  { label: "Impact", href: "#impact" },
];

function StickySubnav() {
  return (
    <div className="sticky top-[72px] z-40 border-b border-white/10 bg-white/5 backdrop-blur-lg">
      <Container className="py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-300">
            <Globe className="h-4 w-4 text-[#5025d1]" />
            Experience Cloud • Government Customer Portal
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

const seoContent = {
  kicker: "Case Study",
  title: "Experience Cloud Portal for Government Services",
  subtitle:
    "We built a Salesforce Experience Cloud portal to streamline reporting, requests, and payments.",
  paragraphs: [
    "The portal centralizes complaint management, property records, and service tracking in one secure experience.",
    "It improves public transparency while reducing internal operational friction.",
  ],
  bullets: [
    "Experience Cloud portal development",
    "Government Cloud workflows and secure access",
    "Request tracking and complaint management",
    "Integrated payments and property management",
  ],
};

const seoFaqs = [
  {
    q: "What was the core goal of this project?",
    a: "Create a secure public portal for reporting issues, tracking requests, and processing payments.",
  },
  {
    q: "Does this use Experience Cloud?",
    a: "Yes. The portal was built on Salesforce Experience Cloud with Government Cloud requirements.",
  },
  {
    q: "Can you build similar portals?",
    a: "Yes. We design Experience Cloud portals for self-service and operational efficiency.",
  },
];

/* ==================== PAGE ==================== */
export default function SalesforceGovPortalCaseStudy() {
  const reduced = usePrefersReducedMotion();
  const year = useMemo(() => new Date().getFullYear(), []);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 900], [0, reduced ? 0 : -70]);
  const heroOpacity = useTransform(scrollY, [0, 520], [1, 0.9]);
  const heroRef = useRef(null);

  return (
    <>
      <Helmet>
        <title>Salesforce Experience Cloud & Government Cloud — Customer Portal | Case Study | IT Meta Solutions</title>
        <meta
          name="description"
          content="Salesforce case study: Experience Cloud portal for government requests, complaint management, and secure payments."
        />
        <meta
          name="keywords"
          content="Salesforce Experience Cloud, Government Cloud, customer portal, complaint management, payments, request tracking, property management, Salesforce CRM, IT Meta Solutions"
        />
        <meta property="og:title" content="Salesforce Experience Cloud & Government Cloud — Customer Portal | Case Study" />
        <meta
          property="og:description"
          content="A user-friendly government customer portal to report environmental issues, track requests, manage properties, and process service payments."
        />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://itmetasolutions.com/case-study/salesforce-experience-cloud-government-cloud" />
        <meta
          property="og:url"
          content="https://itmetasolutions.com/case-study/salesforce-experience-cloud-government-cloud"
        />
        <meta property="og:image" content="https://itmetasolutions.com/favicon.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Salesforce Experience Cloud & Government Cloud — Customer Portal | Case Study"
        />
        <meta
          name="twitter:description"
          content="A user-friendly government customer portal to report environmental issues, track requests, manage properties, and process service payments."
        />
        <meta name="twitter:image" content="https://itmetasolutions.com/favicon.webp" />
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
                  <Pill icon={Globe}>Experience Cloud</Pill>
                  <Pill icon={ShieldCheck}>Government Cloud</Pill>
                  <Pill icon={Ticket}>Complaint management</Pill>
                  <Pill icon={CreditCard}>Payments</Pill>
                  <Pill icon={Home}>Property management</Pill>
                  <Pill icon={Workflow}>Request tracking</Pill>
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <h1 className="mt-7 max-w-5xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  Salesforce Customer Portal for{" "}
                  <span className="bg-gradient-to-r from-[#5025d1] via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Environmental Issue Reporting
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="mt-5 max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                  Developed a user-friendly customer portal on Salesforce Experience Cloud (Government Cloud context) to help
                  citizens report environmental concerns, manage property details, process service payments, and track request
                  status in real-time — improving transparency and trust.
                </p>
              </Reveal>

              {/* KPI cards (generic, no fake numbers) */}
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard icon={Ticket} label="Feature" value="Complaints" delay={0.05} />
                <StatCard icon={CreditCard} label="Feature" value="Payments" delay={0.1} />
                <StatCard icon={Home} label="Feature" value="Properties" delay={0.15} />
                <StatCard icon={LineChart} label="Outcome" value="Transparency" delay={0.2} />
              </div>

              <Reveal delay={0.16}>
                <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-7 backdrop-blur-sm">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-2xl">
                      <div className="text-sm font-semibold text-white">Project summary</div>
                      <div className="mt-1 text-sm text-zinc-300">
                        A modern government customer portal designed to streamline end-to-end reporting and resolution for
                        environmental issues — from complaint submission to payments and real-time request tracking.
                      </div>
                    </div>

                    <a
                      href="/contact"
                      className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5025d1] to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5025d1]/40 transition-all hover:shadow-xl hover:shadow-[#5025d1]/55 hover:scale-[1.02]"
                    >
                      Build a customer portal
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {[
                      {
                        icon: Users,
                        title: "Citizens",
                        desc: "Easy reporting + clear status updates on requests.",
                      },
                      {
                        icon: Settings,
                        title: "Government teams",
                        desc: "Structured intake, routing, and resolution workflows.",
                      },
                      {
                        icon: BarChart3,
                        title: "Leadership",
                        desc: "Better oversight via clean data and consistent processes.",
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
                    A portal that makes reporting{" "}
                    <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                      simple, fast, and trustworthy
                    </span>
                  </>
                }
                description="The goal was to streamline how residents report environmental issues and how government teams manage intake, updates, and resolution — with clear communication and secure transactions."
              />
            </Reveal>

            <div className="grid gap-6 lg:grid-cols-3">
              <FeatureCard
                icon={FileSearch}
                title="The challenge"
                desc="Fragmented reporting and limited visibility created delays and frustration."
                bullets={[
                  "Citizens unsure where to report issues",
                  "Manual follow-ups increased workload",
                  "Low transparency reduced trust",
                ]}
                delay={0.05}
              />
              <FeatureCard
                icon={Target}
                title="Primary goal"
                desc="Create a user-friendly portal that improves reporting and resolution."
                bullets={[
                  "Easy complaint submission",
                  "Clear guidance + validation",
                  "Secure and accessible experience",
                ]}
                delay={0.1}
              />
              <FeatureCard
                icon={ShieldCheck}
                title="Quality outcome"
                desc="Real-time status updates and a cleaner resolution workflow."
                bullets={[
                  "Better transparency for citizens",
                  "More structured internal handling",
                  "Reliable data for reporting",
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
                    Built on Salesforce:{" "}
                    <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                      portal + workflows + visibility
                    </span>
                  </>
                }
                description="We designed a portal experience that guides citizens through reporting, supports payments for services, and provides request tracking — while keeping internal teams aligned through structured CRM workflows."
              />
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2">
              <FeatureCard
                icon={Ticket}
                title="Complaint management"
                desc="Citizens can submit and manage reports with a clear, guided flow."
                bullets={[
                  "Structured intake (category, location, details)",
                  "Attachments supported (where applicable)",
                  "Validation for clean, usable data",
                  "Routing-ready record creation",
                ]}
                delay={0.05}
              />
              <FeatureCard
                icon={Workflow}
                title="Request tracking"
                desc="Real-time updates keep citizens informed throughout the lifecycle."
                bullets={[
                  "Status timeline (received → in progress → resolved)",
                  "Notifications-ready design",
                  "Reduced inbound follow-up calls",
                  "Improved transparency and trust",
                ]}
                delay={0.1}
              />
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              <FeatureCard
                icon={CreditCard}
                title="Payments integration"
                desc="A payment flow for environmental service transactions."
                bullets={[
                  "Secure transaction flow (portal-side)",
                  "Receipt/confirmation pattern",
                  "Reduced manual payment handling",
                  "Audit-friendly records",
                ]}
                delay={0.05}
              />
              <FeatureCard
                icon={Home}
                title="Property management module"
                desc="Residents can add and manage properties to link requests accurately."
                bullets={[
                  "Property profiles (address/details)",
                  "Link complaints to properties",
                  "Improves routing and ownership",
                  "Better case context for teams",
                ]}
                delay={0.1}
              />
              <FeatureCard
                icon={Lock}
                title="Security & access control"
                desc="Designed with privacy and role-based access in mind."
                bullets={[
                  "Authenticated portal access",
                  "Role-based visibility patterns",
                  "Data integrity guardrails",
                ]}
                delay={0.15}
              />
            </div>

            <Reveal delay={0.16}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#5025d1]/20 to-purple-600/20 p-6 backdrop-blur-sm">
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                  <div className="max-w-2xl">
                    <div className="text-sm font-semibold text-white">Design principle</div>
                    <div className="mt-1 text-sm text-zinc-300">
                      We optimized for clarity: short forms, guided steps, helpful validation, and a transparent request
                      timeline — so citizens always know what’s happening next.
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
                    <ChevronRight className="h-4 w-4" />
                    Submit → track → resolve
                  </div>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        <Container>
          <Divider />
        </Container>

        {/* MODULES */}
        <section id="modules" className="scroll-mt-24 py-16 sm:py-20">
          <Container>
            <Reveal>
              <SectionHeading
                badge="Modules"
                title={
                  <>
                    Four core modules working as{" "}
                    <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                      one experience
                    </span>
                  </>
                }
                description="Each module was designed to be intuitive for residents while producing clean, actionable CRM data for internal teams."
              />
            </Reveal>

            <div className="grid gap-6 lg:grid-cols-4">
              <FeatureCard
                icon={Ticket}
                title="Complaints"
                desc="Report environmental issues easily."
                bullets={["Guided form", "Validation", "Attachments-ready"]}
                delay={0.05}
              />
              <FeatureCard
                icon={CreditCard}
                title="Payments"
                desc="Process service transactions."
                bullets={["Secure flow", "Confirmation patterns", "Record auditability"]}
                delay={0.08}
              />
              <FeatureCard
                icon={Home}
                title="Properties"
                desc="Manage resident properties."
                bullets={["Property profiles", "Link requests", "Better context"]}
                delay={0.11}
              />
              <FeatureCard
                icon={Gauge}
                title="Tracking"
                desc="Real-time status updates."
                bullets={["Status timeline", "Transparency", "Less follow-ups"]}
                delay={0.14}
              />
            </div>

            <Reveal delay={0.16}>
              <div className="mt-10 grid gap-6 lg:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-7 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-3">
                      <Layers className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-sm font-semibold text-white">SF Lightning UI</div>
                  </div>
                  <p className="mt-3 text-sm text-zinc-300">
                    Lightning-based patterns were used to keep the portal UI consistent, responsive, and easy to navigate.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-7 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-3">
                      <Workflow className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-sm font-semibold text-white">CRM workflow-ready</div>
                  </div>
                  <p className="mt-3 text-sm text-zinc-300">
                    The portal data structure supports internal routing, handling, and resolution without messy manual steps.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-7 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-3">
                      <Search className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-sm font-semibold text-white">Better visibility</div>
                  </div>
                  <p className="mt-3 text-sm text-zinc-300">
                    Citizens get clarity through tracking; teams get clean records for reporting and accountability.
                  </p>
                </div>
              </div>
            </Reveal>
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
                badge="Project Screenshots"
                title={
                  <>
                    Portal workflow{" "}
                    <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                      highlights
                    </span>
                  </>
                }
              />
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <Reveal delay={0.05}>
                <Screenshot
                  src={portalImg1}
                  title="Customer Portal Login"
                />
              </Reveal>

              <Reveal delay={0.1}>
                <Screenshot
                  src={portalImg2}
                  title="Payments & Transactions"
                />
              </Reveal>

              <Reveal delay={0.15}>
                <Screenshot
                  src={portalImg3}
                  title="Customer Portal Home"
                />
              </Reveal>

              <Reveal delay={0.2}>
                <Screenshot
                  src={portalImg4}
                  title="Complaint Submission Flow"
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
                    Better citizen experience, cleaner CRM data,{" "}
                    <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                      faster resolution
                    </span>
                  </>
                }
                description="This portal reduced friction for residents and improved internal handling through structured intake, visibility, and secure transactions."
                centered
              />
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatCard icon={Users} label="Citizen UX" value="Easier reporting" delay={0.05} />
              <StatCard icon={Workflow} label="Operations" value="Streamlined handling" delay={0.1} />
              <StatCard icon={BarChart3} label="Reporting" value="More reliable" delay={0.15} />
              <StatCard icon={ShieldCheck} label="Trust" value="Transparency" delay={0.2} />
            </div>

            <Reveal delay={0.15}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#5025d1]/20 to-purple-600/20 p-7 backdrop-blur-sm">
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                  <div className="max-w-2xl">
                    <div className="text-sm font-semibold text-white">Skills & deliverables</div>
                    <div className="mt-1 text-sm text-zinc-300">
                      Customer Relationship Management • Customer Portal • SF Lightning • Salesforce CRM • User Experience
                    </div>
                  </div>

                  <a
                    href="/contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#5025d1] shadow-lg transition-all hover:scale-[1.02]"
                  >
                    Discuss your Salesforce portal
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </Reveal>

            <div className="mt-10 text-center text-xs text-zinc-500">© {year} • Salesforce case study • IT Meta Solutions</div>
          </Container>
        </section>

        <SeoContentFaq content={seoContent} faqs={seoFaqs} />
      </div>
    </>
  );
}

