import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Code2,
  Database,
  KeyRound,
  Layers,
  LayoutGrid,
  Lock,
  Server,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
  Zap,
  GraduationCap,
  Heart,
  ShoppingCart,
  DollarSign,
  Home,
  Briefcase,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import SeoContentFaq from "../../components/SeoContentFaq";
import SubpageVisualLayer from "../../components/SubpageVisualLayer";

/**
 * Custom Web Apps Expertise Page - IT Meta Solutions
 * Showcasing bespoke portal and web application development capabilities
 */

const cx = (...c) => c.filter(Boolean).join(" ");

const nav = [
  { label: "Overview", href: "#overview" },
  { label: "Expertise", href: "#expertise" },
  { label: "Achievements", href: "#achievements" },
  { label: "Skills", href: "#skills" },
  { label: "Industries", href: "#industries" },
];

const seoContent = {
  kicker: "Custom Web Apps",
  title: "Bespoke Web Portals and Business Applications",
  subtitle:
    "We design and build custom web applications — from role-based operations portals to SaaS-style tools, CRM dashboards, and integration-ready business systems.",
  paragraphs: [
    "Our development team builds fully bespoke web applications tailored to your business workflows — not off-the-shelf templates. Every app is designed with a clear data model, secure authentication, and role-aware architecture.",
    "From letting agency portals to internal dashboards and customer-facing tools, we deliver production-ready applications built on Next.js, PostgreSQL, and TypeScript — deployed on Vercel or Docker.",
  ],
  bullets: [
    "Custom web portals with role-based access control",
    "Next.js 14 and TypeScript application development",
    "PostgreSQL database design via Prisma ORM",
    "OTP authentication, audit logs, and secure session management",
    "Integrated dialer, chat, and third-party API connections",
  ],
};

const seoFaqs = [
  {
    q: "What types of custom web applications do you build?",
    a: "We build bespoke business portals, internal operations tools, CRM-style dashboards, role-based admin panels, customer-facing apps, and SaaS-style platforms. Each app is tailored to your specific workflows.",
  },
  {
    q: "What technology stack do you use for custom web apps?",
    a: "Our primary stack is Next.js 14, React 18, and TypeScript for the frontend and API layer, with PostgreSQL managed via Prisma ORM for the database. We use Zod for validation and deploy on Vercel or Docker.",
  },
  {
    q: "Can you build apps with role-based access and secure login?",
    a: "Yes. We implement OTP-protected login flows with rate limiting, secure server-side sessions, and role-aware route protection. Admins and agents (or any role structure you need) get distinct access levels.",
  },
  {
    q: "Can you integrate a dialer, chat, or third-party API into a custom app?",
    a: "Yes. We have experience integrating SIP.js dialers (LINKUS-ready), embedded chat systems, and external APIs. We can connect your app to CRMs, payment gateways, calendars, and more.",
  },
  {
    q: "Can you build a similar portal to the MHG letting agency system?",
    a: "Absolutely. The MHG Portal is a good example of what we deliver — a role-based operations portal with an integrated dialer suite, embedded chat, audit logs, and full CRM-style workflows. Contact us to discuss your requirements.",
  },
];

/* ==================== HELPERS ==================== */

function Container({ children, className }) {
  return (
    <div className={cx("mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12", className)}>
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
        "bg-[radial-gradient(closest-side,rgba(99,102,241,0.6),rgba(99,102,241,0))]",
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
      className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500"
      style={{ scaleX: w }}
    />
  );
}

function Reveal({ children, delay = 0, className }) {
  return (
    <motion.div
      className={className}
      initial={{ y: 16 }}
      whileInView={{ y: 0 }}
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
    <div className={cx("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
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
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 h-full flex flex-col justify-center">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-2xl font-semibold text-white">{value}</div>
          <div className="text-sm text-zinc-300">{label}</div>
        </div>
      </div>
    </div>
  );
}

function Card({ icon: Icon, title, desc, bullets }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-6 pb-8 h-full flex">
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-violet-400/20 blur-3xl" />
      </div>

      <div className="relative flex h-full flex-col">
        <div className="mb-4 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>

        {desc && <p className="text-sm leading-relaxed text-zinc-300">{desc}</p>}

        {bullets?.length ? (
          <ul className="mt-5 space-y-2 text-sm text-zinc-200">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <BadgeCheck className="h-4 w-4 text-emerald-300 mt-0.5 flex-shrink-0" />
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

function StickyNav({ items }) {
  const [active, setActive] = React.useState("");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    items.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="sticky top-16 z-30 border-b border-white/10 bg-zinc-950/80 backdrop-blur">
      <Container className="py-4">
        <nav className="flex flex-wrap gap-2">
          {items.map((item) => (
            <AnchorLink
              key={item.href}
              href={item.href}
              className={cx(
                "rounded-xl px-4 py-2 text-sm transition",
                active === item.href
                  ? "bg-white text-zinc-950"
                  : "text-zinc-300 hover:bg-white/10"
              )}
            >
              {item.label}
            </AnchorLink>
          ))}
        </nav>
      </Container>
    </div>
  );
}

function Divider() {
  return <div className="my-14 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />;
}

/* ==================== PAGE ==================== */

export default function CustomWebAppsExpertisePage() {
  const heroRef = useRef(null);

  return (
    <>
      <Helmet>
        <title>Custom Web App Development — Portals, Dashboards & Business Systems | IT Meta Solutions</title>
        <meta
          name="description"
          content="Bespoke web application development — role-based portals, operations dashboards, SaaS tools, and business systems built on Next.js, PostgreSQL, and TypeScript."
        />
        <meta
          name="keywords"
          content="custom web app development, bespoke portal development, Next.js development, role-based application, business dashboard, SaaS development, PostgreSQL, Prisma ORM, IT Meta Solutions"
        />
        <meta property="og:title" content="Custom Web App Development — IT Meta Solutions" />
        <meta
          property="og:description"
          content="We build bespoke web portals, operations tools, and business applications on Next.js and PostgreSQL — with role-based access, OTP auth, and full audit governance."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://itmetasolutions.com/custom-web-apps-expertise" />
      </Helmet>

      <div className="itms-subpage relative min-h-screen text-zinc-100 mb-16 overflow-hidden">
        <SubpageVisualLayer />

        <ScrollProgress />
        {/* Background accents */}
        <GradientBlob className="h-[600px] w-[600px] -left-32 -top-32" />
        <GradientBlob className="h-[600px] w-[600px] -right-32 top-96 bg-[radial-gradient(closest-side,rgba(139,92,246,0.5),rgba(139,92,246,0))]" />

        {/* HERO */}
        <section ref={heroRef} className="relative overflow-hidden">
          <Container className="pb-10 pt-24 sm:pb-14 sm:pt-32">
            <motion.div>
              <Reveal>
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <Pill icon={Layers}>Next.js 14</Pill>
                  <Pill icon={Database}>PostgreSQL</Pill>
                  <Pill icon={Code2}>TypeScript</Pill>
                  <Pill icon={KeyRound}>OTP Auth</Pill>
                  <Pill icon={Users}>Role-Based Systems</Pill>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  Custom Web App Development
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-zinc-300 max-w-3xl">
                  We build fully bespoke web applications — operations portals, CRM-style tools, role-based dashboards, and SaaS-style platforms — designed around your specific workflows and deployed production-ready on modern infrastructure.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  <Stat icon={LayoutGrid} label="Portals Delivered" value="5+" />
                  <Stat icon={Layers} label="Tech Stack" value="Next.js 14" />
                  <Stat icon={ShieldCheck} label="Security" value="OTP + Audit" />
                </div>
              </Reveal>
            </motion.div>
          </Container>
        </section>

        {/* STICKY NAV */}
        <StickyNav items={nav} />

        <Container>
          <Divider />

          {/* OVERVIEW */}
          <section id="overview">
            <Reveal>
              <SectionTitle
                kicker="Company Overview"
                title="Built for Your Business, Not Off the Shelf"
                desc="We design and develop custom web applications from scratch — tailored to your operations, your team structure, and your growth plans."
              />
            </Reveal>

            <Reveal delay={0.05}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-8">
                <p className="text-base leading-relaxed text-zinc-300">
                  Off-the-shelf platforms rarely fit complex business workflows. We build bespoke web applications that mirror how your team actually works — with the right data model, the right access controls, and the right integrations for your operations.
                </p>
                <p className="mt-4 text-base leading-relaxed text-zinc-300">
                  Our stack is built around Next.js 14, TypeScript, and PostgreSQL with Prisma ORM — giving every application type-safe data handling, structured schemas, and a clean separation between frontend, API, and database layers. Apps are deployable on Vercel or Docker.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <Card
                  icon={Target}
                  title="Workflow-First Design"
                  bullets={[
                    "Built around your actual processes",
                    "Role-aware architecture from day one",
                    "Data model designed for your business",
                  ]}
                />
                <Card
                  icon={ShieldCheck}
                  title="Production-Ready"
                  bullets={[
                    "OTP login and secure sessions",
                    "Platform-wide audit logging",
                    "Vercel or Docker deployment",
                  ]}
                />
                <Card
                  icon={Zap}
                  title="Modern Stack"
                  bullets={[
                    "Next.js 14 App Router",
                    "TypeScript throughout",
                    "Prisma ORM + PostgreSQL",
                  ]}
                />
              </div>
            </Reveal>
          </section>

          <Divider />

          {/* EXPERTISE */}
          <section id="expertise">
            <Reveal>
              <SectionTitle
                kicker="What We Build"
                title="Full-Stack Custom Application Capabilities"
                desc="From the login screen to the database schema, we handle every layer of your custom web application."
              />
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <Reveal delay={0.05}>
                <Card
                  icon={LayoutGrid}
                  title="Portals & Operations Dashboards"
                  desc="Role-based portals where admins and agents (or any user tier) work from purpose-built views."
                  bullets={[
                    "Admin control centers with full platform visibility",
                    "Agent workspaces for day-to-day task execution",
                    "CRM-style record management (landlords, clients, sales)",
                    "Commission and performance dashboards",
                    "Embedded internal chat and communication",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.1}>
                <Card
                  icon={Database}
                  title="Data Models & Backend APIs"
                  desc="Structured PostgreSQL schemas and typed Next.js API routes that scale cleanly."
                  bullets={[
                    "Prisma ORM schema design and migrations",
                    "Relational data models with referential integrity",
                    "Zod validation on all input and API boundaries",
                    "Server Actions for forms and mutations",
                    "RESTful and RPC-style API endpoints",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.15}>
                <Card
                  icon={KeyRound}
                  title="Authentication & Security"
                  desc="OTP-protected login with rate limiting, secure sessions, and role-aware access control."
                  bullets={[
                    "OTP login flow with expiry and rate limiting",
                    "Server-side session management",
                    "Role-based route protection and UI gating",
                    "Platform-wide audit log for all actions",
                    "Admin-only sensitive operations and overrides",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.2}>
                <Card
                  icon={Workflow}
                  title="Integrations & Dialer Systems"
                  desc="Connect your app to external services — dialers, APIs, payment systems, and more."
                  bullets={[
                    "SIP.js dialer integration (LINKUS-ready)",
                    "Call history, intercalling, labels, and notes",
                    "Third-party API connections (CRM, payments, calendar)",
                    "Webhook handling and event-driven triggers",
                    "Recording URL capture and storage",
                  ]}
                />
              </Reveal>
            </div>
          </section>

          <Divider />

          {/* ACHIEVEMENTS */}
          <section id="achievements">
            <Reveal>
              <SectionTitle
                kicker="Key Achievements"
                title="Proven Track Record"
                desc="Delivered production-grade custom applications across letting, retail, legal, and business services sectors."
              />
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <Reveal delay={0.05}>
                <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 mb-4">
                    <LayoutGrid className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">5+</div>
                  <div className="mt-1 text-sm text-zinc-300">Custom Portals Built</div>
                  <p className="mt-3 text-xs text-zinc-400">Delivered for letting agencies, property groups, and business services</p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 mb-4">
                    <Workflow className="h-6 w-6 text-violet-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">10+</div>
                  <div className="mt-1 text-sm text-zinc-300">Integrations Delivered</div>
                  <p className="mt-3 text-xs text-zinc-400">SIP dialers, payment gateways, APIs, and third-party platforms</p>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 mb-4">
                    <ShieldCheck className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">100%</div>
                  <div className="mt-1 text-sm text-zinc-300">Production Deployments</div>
                  <p className="mt-3 text-xs text-zinc-400">Every app shipped to live environments with security and audit coverage</p>
                </div>
              </Reveal>
            </div>
          </section>

          <Divider />

          {/* SKILLS */}
          <section id="skills">
            <Reveal>
              <SectionTitle
                kicker="Technology Stack"
                title="What We Work With"
                desc="Our custom app development stack is built for type safety, scalability, and production reliability."
              />
            </Reveal>

            <Reveal delay={0.05}>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { icon: Layers, label: "Next.js 14", desc: "App Router, Server Actions, server/client components" },
                  { icon: Code2, label: "TypeScript", desc: "Type-safe development across all layers" },
                  { icon: Database, label: "PostgreSQL + Prisma", desc: "Relational schema design with typed ORM queries" },
                  { icon: ShieldCheck, label: "Zod Validation", desc: "Input validation at every API boundary" },
                  { icon: KeyRound, label: "OTP Auth + Sessions", desc: "Secure login with rate limiting and server sessions" },
                  { icon: Workflow, label: "SIP.js / LINKUS", desc: "Browser-based SIP dialer with intercalling support" },
                  { icon: Server, label: "Vercel / Docker", desc: "Cloud and container-based deployment pipelines" },
                  { icon: LayoutGrid, label: "Role-Based Systems", desc: "Admin and agent tier architecture with gated routes" },
                  { icon: Lock, label: "Audit Logging", desc: "Platform-wide action tracking for compliance and governance" },
                ].map((skill, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 flex items-start gap-3"
                  >
                    <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5">
                      <skill.icon className="h-4 w-4 text-zinc-300" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{skill.label}</div>
                      <div className="mt-0.5 text-xs text-zinc-400">{skill.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          <Divider />

          {/* INDUSTRIES */}
          <section id="industries">
            <Reveal>
              <SectionTitle
                kicker="Industries Served"
                title="Where We've Deployed Custom Apps"
                desc="Our custom web applications serve businesses across property, retail, legal, and professional services."
              />
            </Reveal>

            <Reveal delay={0.05}>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { icon: Home, label: "Letting & Property", desc: "Operations portals for letting agencies with landlord, property, sales, and tenant management" },
                  { icon: ShoppingCart, label: "Retail & E-commerce", desc: "Custom admin tools, inventory dashboards, and order management systems" },
                  { icon: Briefcase, label: "Professional Services", desc: "Client portals, CRM-style tools, and workflow management for service businesses" },
                  { icon: Users, label: "HR & Staffing", desc: "Staff management systems, commission tracking, and role-based team portals" },
                  { icon: DollarSign, label: "Finance & Insurance", desc: "Compliance-ready platforms with audit logs and secure data handling" },
                  { icon: GraduationCap, label: "Education & Training", desc: "Student portals, instructor dashboards, and content management systems" },
                ].map((ind, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 flex items-start gap-3"
                  >
                    <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5">
                      <ind.icon className="h-4 w-4 text-zinc-300" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{ind.label}</div>
                      <div className="mt-0.5 text-xs text-zinc-400">{ind.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <div className="text-lg font-bold text-white">Ready to build your custom portal?</div>
                  <div className="mt-1 text-sm text-zinc-300 max-w-xl">
                    Tell us about your workflows and we'll design a system that fits your team — not the other way around.
                  </div>
                </div>
                <a
                  href="/contact"
                  className="group inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-[1.02]"
                >
                  Start a Project
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
          </section>
        </Container>

        <SeoContentFaq content={seoContent} faqs={seoFaqs} />
      </div>
    </>
  );
}
