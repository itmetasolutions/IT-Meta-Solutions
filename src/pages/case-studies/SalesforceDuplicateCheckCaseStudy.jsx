import React, { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Database,
  FileSearch,
  Gauge,
  Layers,
  LayoutGrid,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Workflow,
  Wrench,
  AlertTriangle,
  ClipboardCheck,
  FileWarning,
  Search,
  CopyCheck,
  Settings,
  Lock,
  LineChart,
  BadgeHelp,
} from "lucide-react";

// Import case study images
import sfImage1 from "../../assets/img/Salesforce Duplicate Check Case Study Image 1.png";
import sfImage2 from "../../assets/img/Salesforce Duplicate Check Case Study Image 2.png";
import sfImage3 from "../../assets/img/Salesforce Duplicate Check Case Study Image 3.png";

/**
 * Salesforce Case Study — Duplicate Check & Data Validation Components
 * - Matches your Home theme (dark + glass + gradients + blobs)
 * - Scroll progress + reduced-motion safe reveals
 * - Sticky subnav + tabs
 * - Screenshot placeholders for demo/proof
 * - Professional portfolio-ready narrative
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
            <Database className="h-4 w-4 text-[#5025d1]" />
            Salesforce — Duplicate Prevention
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
export default function SalesforceDuplicateCheckCaseStudy() {
  const reduced = usePrefersReducedMotion();
  const year = useMemo(() => new Date().getFullYear(), []);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 900], [0, reduced ? 0 : -70]);
  const heroOpacity = useTransform(scrollY, [0, 520], [1, 0.9]);
  const heroRef = useRef(null);

  return (
    <>
      <Helmet>
        <title>Salesforce Duplicate Check & Data Validation — Case Study | IT Meta Solutions</title>
        <meta
          name="description"
          content="Salesforce case study: duplicate prevention + data validation components to keep CRM clean, reduce operational issues, and improve reporting accuracy."
        />
        <meta
          name="keywords"
          content="Salesforce, duplicate check, data validation, data cleaning, Sales Cloud, Service Cloud, Salesforce development, IT Meta Solutions"
        />
        <meta property="og:title" content="Salesforce Duplicate Check & Data Validation — Case Study" />
        <meta
          property="og:description"
          content="Duplicate prevention + data validation components to keep CRM clean and reliable."
        />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://itmetasolutions.com/case-study/salesforce-duplicate-check" />
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
                  <Pill icon={Database}>Salesforce CRM</Pill>
                  <Pill icon={ShieldCheck}>Duplicate prevention</Pill>
                  <Pill icon={ClipboardCheck}>Validation</Pill>
                  <Pill icon={Workflow}>Record lifecycle</Pill>
                  <Pill icon={Layers}>Reusable components</Pill>
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <h1 className="mt-7 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  Duplicate Check & Data Validation Components for{" "}
                  <span className="bg-gradient-to-r from-[#5025d1] via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Salesforce
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="mt-5 max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                  Built a set of Salesforce components that prevent and identify duplicate records while validating
                  entries before record creation and updates. The result: cleaner CRM data, fewer operational issues,
                  and more reliable reporting for Sales & Support teams.
                </p>
              </Reveal>

              {/* KPI cards (kept generic—no fake numbers) */}
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard icon={FileWarning} label="Problem" value="Duplicate records" delay={0.05} />
                <StatCard icon={ClipboardCheck} label="Solution" value="Validation gates" delay={0.1} />
                <StatCard icon={Search} label="Detection" value="Match rules" delay={0.15} />
                <StatCard icon={LineChart} label="Outcome" value="Cleaner reporting" delay={0.2} />
              </div>

              <Reveal delay={0.16}>
                <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-7 backdrop-blur-sm">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-2xl">
                      <div className="text-sm font-semibold text-white">Project summary</div>
                      <div className="mt-1 text-sm text-zinc-300">
                        Duplicate prevention + data validation for reliable customer and business data across Sales Cloud and
                        Service Cloud—reducing downstream issues like double follow-ups, wrong ownership, and broken reports.
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
                        title: "Sales teams",
                        desc: "Stops double outreach + prevents duplicate leads/accounts.",
                      },
                      {
                        icon: Target,
                        title: "Support teams",
                        desc: "Improves case routing + avoids duplicate customer records.",
                      },
                      {
                        icon: BarChart3,
                        title: "Management",
                        desc: "Accurate dashboards and trustworthy metrics.",
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
                    Fixing duplicates at the{" "}
                    <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                      source of truth
                    </span>
                  </>
                }
                description="Duplicate records don’t just clutter the CRM — they break automation, distort reporting, and create real operational errors. This implementation focused on prevention first, detection second, and cleanup support where needed."
              />
            </Reveal>

            <div className="grid gap-6 lg:grid-cols-3">
              <FeatureCard
                icon={AlertTriangle}
                title="The challenge"
                desc="Duplicates across Leads/Contacts/Accounts created operational and reporting issues."
                bullets={[
                  "Double outreach and poor customer experience",
                  "Incorrect ownership and routing",
                  "Broken segmentation and analytics",
                ]}
                delay={0.05}
              />
              <FeatureCard
                icon={ShieldCheck}
                title="Primary goal"
                desc="Stop duplicates before they enter the system."
                bullets={[
                  "Validate key fields pre-save",
                  "Warn users with clear actions",
                  "Block record creation when needed",
                ]}
                delay={0.1}
              />
              <FeatureCard
                icon={CopyCheck}
                title="Quality outcome"
                desc="Cleaner data across Sales Cloud and Service Cloud."
                bullets={[
                  "More reliable dashboards",
                  "Improved automation accuracy",
                  "Reduced operational headaches",
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
                    A layered system:{" "}
                    <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                      validate + detect + guide
                    </span>
                  </>
                }
                description="We designed components and rules that validate data entry, detect duplicates through match logic, and guide users to resolve conflicts without slowing down operations."
              />
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2">
              <FeatureCard
                icon={ClipboardCheck}
                title="Pre-save validation"
                desc="Validations ensure data quality before create/update."
                bullets={[
                  "Required field enforcement (context-based)",
                  "Format checks (email/phone patterns)",
                  "Conditional rules (business logic)",
                  "User-friendly error messages",
                ]}
                delay={0.05}
              />
              <FeatureCard
                icon={Search}
                title="Duplicate detection layer"
                desc="Detect and surface potential duplicates in real-time."
                bullets={[
                  "Match rules aligned with business fields",
                  "Warning vs blocking flows",
                  "User decision + merge guidance",
                  "Reduced duplicate creation rate",
                ]}
                delay={0.1}
              />
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              <FeatureCard
                icon={Workflow}
                title="Record lifecycle coverage"
                desc="Controls applied consistently across create + update."
                bullets={[
                  "New record protection",
                  "Update protection (prevent drift)",
                  "Automations protected from bad data",
                ]}
                delay={0.05}
              />
              <FeatureCard
                icon={Settings}
                title="Configurable rules"
                desc="Easy updates as the business evolves."
                bullets={[
                  "Rule tuning without rework",
                  "Config-first approach where possible",
                  "Clear admin controls",
                ]}
                delay={0.1}
              />
              <FeatureCard
                icon={Lock}
                title="Governance & stability"
                desc="Designed to reduce risk and keep teams productive."
                bullets={[
                  "Minimized false positives",
                  "Clear user actions",
                  "Safe guardrails for critical objects",
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
                      We balanced strict prevention (blocking duplicates) with team velocity (warnings where safe) —
                      ensuring data stayed clean without slowing Sales and Support workflows.
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
                    <ChevronRight className="h-4 w-4" />
                    Prevent → detect → resolve
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
                    Designed as reusable{" "}
                    <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                      Salesforce components
                    </span>
                  </>
                }
                description="The build emphasized reuse across objects and use cases, ensuring a consistent experience and long-term maintainability."
              />
            </Reveal>

            <div className="grid gap-6 lg:grid-cols-3">
              <FeatureCard
                icon={Layers}
                title="Reusable validation patterns"
                desc="Validation logic structured so it can be extended across objects."
                bullets={[
                  "Shared rules where possible",
                  "Object-specific exceptions supported",
                  "Consistent user messaging",
                ]}
                delay={0.05}
              />
              <FeatureCard
                icon={Wrench}
                title="Admin-friendly tuning"
                desc="Designed so admins can refine behavior over time."
                bullets={[
                  "Rule updates without breaking flows",
                  "Field-level adjustments supported",
                  "Clear guardrails for critical fields",
                ]}
                delay={0.1}
              />
              <FeatureCard
                icon={Gauge}
                title="Performance-aware"
                desc="Duplicate checks designed to stay fast and usable."
                bullets={[
                  "Avoid heavy checks where unnecessary",
                  "Reduce friction in high-volume flows",
                  "Keep UI responsive for users",
                ]}
                delay={0.15}
              />
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
                badge="Project Screenshots"
                title={
                  <>
                    See the solution{" "}
                    <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                      in action
                    </span>
                  </>
                }
                description="Screenshots showing the duplicate check and data validation components configured in Salesforce."
              />
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <Reveal delay={0.05}>
                <Screenshot
                  src={sfImage1}
                  title="Duplicate Rule Configuration"
                  comment="Salesforce Setup showing duplicate rules and matching rules configuration for preventing duplicate records."
                />
              </Reveal>
              <Reveal delay={0.1}>
                <Screenshot
                  src={sfImage2}
                  title="Validation & Detection"
                  comment="Pre-save validation logic and duplicate detection in action, ensuring data quality before record creation."
                />
              </Reveal>
              <Reveal delay={0.15} className="lg:col-span-2">
                <Screenshot
                  src={sfImage3}
                  title="User Warning System"
                  comment="User-friendly warning modal showing potential duplicates with clear actions: review, cancel, or proceed."
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
                    Cleaner CRM data, fewer errors,{" "}
                    <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                      better decisions
                    </span>
                  </>
                }
                description="This project improved data reliability across the CRM, which directly improves reporting, workflows, and customer experience."
                centered
              />
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatCard icon={ShieldCheck} label="Data quality" value="Cleaner records" delay={0.05} />
              <StatCard icon={Users} label="Operations" value="Less confusion" delay={0.1} />
              <StatCard icon={BarChart3} label="Reporting" value="More accurate" delay={0.15} />
              <StatCard icon={Target} label="Sales/Service" value="Better workflows" delay={0.2} />
            </div>

            <Reveal delay={0.15}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#5025d1]/20 to-purple-600/20 p-7 backdrop-blur-sm">
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                  <div className="max-w-2xl">
                    <div className="text-sm font-semibold text-white">Skills & deliverables</div>
                    <div className="mt-1 text-sm text-zinc-300">
                      Salesforce CRM • Data Cleaning • Salesforce App Development • Sales Cloud • Service Cloud
                    </div>
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
