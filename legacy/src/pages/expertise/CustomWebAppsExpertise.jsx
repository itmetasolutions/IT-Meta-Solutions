import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useInView } from "framer-motion";
import {
  ArrowRight, Code2, Database, KeyRound, Layers, LayoutGrid, Lock, Server,
  Settings, ShieldCheck, Target, Users, Workflow, Zap, GraduationCap, Heart,
  ShoppingCart, DollarSign, Home, Briefcase, CheckCircle2,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import SeoContentFaq from "../../components/SeoContentFaq";
import Container from "../../components/Container";

const cx = (...c) => c.filter(Boolean).join(" ");

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div aria-hidden className="fixed left-0 top-0 z-50 h-0.5 w-full origin-left bg-gradient-to-r from-[#1D4ED8] via-[#23A6E8] to-[#3AC9F5]" style={{ scaleX: scrollYProgress }} />
  );
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
  return (
    <a href={href} onClick={(e) => { if (href?.startsWith?.("#")) { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" }); } }} className={className}>
      {children}
    </a>
  );
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
          <ul className="space-y-2">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color }} />
                {b}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Reveal>
  );
}

function StickyNav({ items }) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(`#${e.target.id}`); }), { rootMargin: "-20% 0px -70% 0px" });
    items.forEach(({ href }) => { const el = document.querySelector(href); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [items]);
  return (
    <div className="sticky top-[64px] z-40 border-b border-slate-100 bg-white/95 backdrop-blur-sm shadow-sm">
      <Container className="py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500"><Code2 className="h-3.5 w-3.5 text-[#1D4ED8]" />Custom Web Apps</div>
          <div className="flex flex-wrap items-center gap-2">
            {items.map((item) => (
              <AnchorLink key={item.href} href={item.href} className={cx("rounded-full border px-3 py-1.5 text-xs font-medium transition", active === item.href ? "border-[#1D4ED8] bg-[#1D4ED8] text-white" : "border-slate-200 bg-[#F1F4F9] text-slate-600 hover:border-[#1D4ED8]/40 hover:text-[#1D4ED8]")}>
                {item.label}
              </AnchorLink>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

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
  subtitle: "We design and build custom web applications — from role-based operations portals to SaaS-style tools, CRM dashboards, and integration-ready business systems.",
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
  { q: "What types of custom web applications do you build?", a: "We build bespoke business portals, internal operations tools, CRM-style dashboards, role-based admin panels, customer-facing apps, and SaaS-style platforms. Each app is tailored to your specific workflows." },
  { q: "What technology stack do you use for custom web apps?", a: "Our primary stack is Next.js 14, React 18, and TypeScript for the frontend and API layer, with PostgreSQL managed via Prisma ORM for the database. We use Zod for validation and deploy on Vercel or Docker." },
  { q: "Can you build apps with role-based access and secure login?", a: "Yes. We implement OTP-protected login flows with rate limiting, secure server-side sessions, and role-aware route protection. Admins and agents get distinct access levels." },
  { q: "Can you integrate a dialer, chat, or third-party API into a custom app?", a: "Yes. We have experience integrating SIP.js dialers (LINKUS-ready), embedded chat systems, and external APIs. We can connect your app to CRMs, payment gateways, calendars, and more." },
  { q: "Can you build a similar portal to the MHG letting agency system?", a: "Absolutely. The MHG Portal is a good example of what we deliver — a role-based operations portal with an integrated dialer suite, embedded chat, audit logs, and full CRM-style workflows. Contact us to discuss your requirements." },
];

export default function CustomWebAppsExpertisePage() {
  return (
    <>
      <Helmet>
        <title>Custom Web App Development — Portals, Dashboards & Business Systems | IT Meta Solutions</title>
        <meta name="description" content="Bespoke web application development — role-based portals, operations dashboards, SaaS tools, and business systems built on Next.js, PostgreSQL, and TypeScript." />
        <meta name="keywords" content="custom web app development, bespoke portal development, Next.js development, role-based application, business dashboard, SaaS development, PostgreSQL, Prisma ORM, IT Meta Solutions" />
        <meta property="og:title" content="Custom Web App Development — IT Meta Solutions" />
        <meta property="og:description" content="We build bespoke web portals, operations tools, and business applications on Next.js and PostgreSQL — with role-based access, OTP auth, and full audit governance." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://itmetasolutions.com/custom-web-apps-expertise" />
      </Helmet>
      <ScrollProgress />

      {/* HERO */}
      <section className="relative bg-[#141A2E] overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="absolute inset-0 dot-grid-bg opacity-25 pointer-events-none" />
        <div className="absolute -top-32 right-0 w-[600px] h-[500px] rounded-full bg-[#1D4ED8]/10 blur-[120px] pointer-events-none" />
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex flex-wrap gap-2 mb-8">
              {[{ icon: Layers, label: "Next.js 14" }, { icon: Database, label: "PostgreSQL" }, { icon: Code2, label: "TypeScript" }, { icon: KeyRound, label: "OTP Auth" }, { icon: Users, label: "Role-Based Systems" }].map((b) => (
                <span key={b.label} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-slate-300">
                  <b.icon className="h-3.5 w-3.5 text-[#3AC9F5]" />{b.label}
                </span>
              ))}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Custom Web App <span className="animated-gradient-text">Development</span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-3xl leading-relaxed">
              We build fully bespoke web applications — operations portals, CRM-style tools, role-based dashboards, and SaaS-style platforms — designed around your specific workflows and deployed production-ready on modern infrastructure.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3 max-w-2xl">
              {[{ icon: LayoutGrid, label: "Portals Delivered", value: "5+", color: "#1D4ED8" }, { icon: Layers, label: "Tech Stack", value: "Next.js 14", color: "#23A6E8" }, { icon: ShieldCheck, label: "Security", value: "OTP + Audit", color: "#3AC9F5" }].map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: `${s.color}30` }}><s.icon className="h-4 w-4" style={{ color: s.color }} /></div>
                    <div><div className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</div><div className="text-xs text-slate-400">{s.label}</div></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">Start a Project <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/work?filter=web" className="btn-ghost-dark">View Web Projects</Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* BANNER */}
      <section className="bg-white py-12">
        <Container>
          <div className="relative h-64 sm:h-80 overflow-hidden rounded-3xl shadow-xl shadow-slate-200">
            <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80" alt="Custom Web Applications" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1D4ED8]/60 via-[#141A2E]/30 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8 sm:px-12">
              <div><p className="text-white/80 text-sm font-medium mb-2">Production-ready from day one</p><p className="text-white text-2xl font-bold sm:text-3xl max-w-xs" style={{ fontFamily: "var(--font-heading)" }}>Built for your workflows, not off the shelf</p></div>
            </div>
          </div>
        </Container>
      </section>

      <StickyNav items={nav} />

      {/* OVERVIEW */}
      <section id="overview" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mb-10">
            <span className="kicker">Company Overview</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Built for Your Business, Not Off the Shelf</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">We design and develop custom web applications from scratch — tailored to your operations, your team structure, and your growth plans.</p>
          </Reveal>
          <Reveal delay={0.05} className="mb-8">
            <div className="premium-card rounded-2xl p-7">
              <p className="text-slate-700 leading-relaxed">Off-the-shelf platforms rarely fit complex business workflows. We build bespoke web applications that mirror how your team actually works — with the right data model, the right access controls, and the right integrations for your operations.</p>
              <p className="mt-4 text-slate-700 leading-relaxed">Our stack is built around Next.js 14, TypeScript, and PostgreSQL with Prisma ORM — giving every application type-safe data handling, structured schemas, and a clean separation between frontend, API, and database layers.</p>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            <LightCard color="#1D4ED8" icon={Target} title="Workflow-First Design" bullets={["Built around your actual processes", "Role-aware architecture from day one", "Data model designed for your business"]} />
            <LightCard color="#23A6E8" icon={ShieldCheck} title="Production-Ready" bullets={["OTP login and secure sessions", "Platform-wide audit logging", "Vercel or Docker deployment"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={Zap} title="Modern Stack" bullets={["Next.js 14 App Router", "TypeScript throughout", "Prisma ORM + PostgreSQL"]} delay={0.1} />
          </div>
        </Container>
      </section>

      {/* EXPERTISE */}
      <section id="expertise" className="scroll-mt-28 bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">What We Build</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Full-Stack Custom Application Capabilities</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">From the login screen to the database schema, we handle every layer of your custom web application.</p>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-2">
            <LightCard color="#1D4ED8" icon={LayoutGrid} title="Portals & Operations Dashboards" desc="Role-based portals where admins and agents work from purpose-built views." bullets={["Admin control centers with full platform visibility", "Agent workspaces for day-to-day task execution", "CRM-style record management (landlords, clients, sales)", "Commission and performance dashboards", "Embedded internal chat and communication"]} />
            <LightCard color="#23A6E8" icon={Database} title="Data Models & Backend APIs" desc="Structured PostgreSQL schemas and typed Next.js API routes that scale cleanly." bullets={["Prisma ORM schema design and migrations", "Relational data models with referential integrity", "Zod validation on all input and API boundaries", "Server Actions for forms and mutations", "RESTful and RPC-style API endpoints"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={KeyRound} title="Authentication & Security" desc="OTP-protected login with rate limiting, secure sessions, and role-aware access control." bullets={["OTP login flow with expiry and rate limiting", "Server-side session management", "Role-based route protection and UI gating", "Platform-wide audit log for all actions", "Admin-only sensitive operations and overrides"]} delay={0.1} />
            <LightCard color="#1D4ED8" icon={Workflow} title="Integrations & Dialer Systems" desc="Connect your app to external services — dialers, APIs, payment systems, and more." bullets={["SIP.js dialer integration (LINKUS-ready)", "Call history, intercalling, labels, and notes", "Third-party API connections (CRM, payments, calendar)", "Webhook handling and event-driven triggers", "Recording URL capture and storage"]} delay={0.15} />
          </div>
        </Container>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Key Achievements</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Proven Track Record</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">Delivered production-grade custom applications across letting, retail, legal, and business services sectors.</p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: LayoutGrid, value: "5+", label: "Custom Portals Built", desc: "Delivered for letting agencies, property groups, and business services", color: "#1D4ED8" },
              { icon: Workflow, value: "10+", label: "Integrations Delivered", desc: "SIP dialers, payment gateways, APIs, and third-party platforms", color: "#23A6E8" },
              { icon: ShieldCheck, value: "100%", label: "Production Deployments", desc: "Every app shipped to live environments with security and audit coverage", color: "#3AC9F5" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.07}>
                <div className="premium-card rounded-2xl p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl mb-4" style={{ backgroundColor: `${s.color}15` }}>
                    <s.icon className="h-6 w-6" style={{ color: s.color }} />
                  </div>
                  <div className="text-4xl font-black mb-1" style={{ fontFamily: "var(--font-heading)", color: s.color }}>{s.value}</div>
                  <div className="text-base font-bold text-slate-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>{s.label}</div>
                  <p className="text-sm text-slate-500">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* SKILLS */}
      <section id="skills" className="scroll-mt-28 bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Technology Stack</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>What We Work With</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">Our custom app development stack is built for type safety, scalability, and production reliability.</p>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Layers, label: "Next.js 14", desc: "App Router, Server Actions, server/client components", color: "#1D4ED8" },
                { icon: Code2, label: "TypeScript", desc: "Type-safe development across all layers", color: "#23A6E8" },
                { icon: Database, label: "PostgreSQL + Prisma", desc: "Relational schema design with typed ORM queries", color: "#3AC9F5" },
                { icon: ShieldCheck, label: "Zod Validation", desc: "Input validation at every API boundary", color: "#1D4ED8" },
                { icon: KeyRound, label: "OTP Auth + Sessions", desc: "Secure login with rate limiting and server sessions", color: "#23A6E8" },
                { icon: Workflow, label: "SIP.js / LINKUS", desc: "Browser-based SIP dialer with intercalling support", color: "#3AC9F5" },
                { icon: Server, label: "Vercel / Docker", desc: "Cloud and container-based deployment pipelines", color: "#1D4ED8" },
                { icon: LayoutGrid, label: "Role-Based Systems", desc: "Admin and agent tier architecture with gated routes", color: "#23A6E8" },
                { icon: Lock, label: "Audit Logging", desc: "Platform-wide action tracking for compliance and governance", color: "#3AC9F5" },
              ].map((skill, i) => (
                <div key={skill.label} className="premium-card rounded-2xl p-5 flex items-start gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${skill.color}15` }}>
                    <skill.icon className="h-4 w-4" style={{ color: skill.color }} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{skill.label}</div>
                    <div className="mt-0.5 text-xs text-slate-500">{skill.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* INDUSTRIES */}
      <section id="industries" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Industries Served</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Where We've Deployed Custom Apps</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">Our custom web applications serve businesses across property, retail, legal, and professional services.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Home, color: "#1D4ED8", title: "Letting & Property", desc: "Operations portals for letting agencies with landlord, property, sales, and tenant management" },
              { icon: ShoppingCart, color: "#23A6E8", title: "Retail & E-commerce", desc: "Custom admin tools, inventory dashboards, and order management systems" },
              { icon: Briefcase, color: "#3AC9F5", title: "Professional Services", desc: "Client portals, CRM-style tools, and workflow management for service businesses" },
              { icon: Users, color: "#1D4ED8", title: "HR & Staffing", desc: "Staff management systems, commission tracking, and role-based team portals" },
              { icon: DollarSign, color: "#23A6E8", title: "Finance & Insurance", desc: "Compliance-ready platforms with audit logs and secure data handling" },
              { icon: GraduationCap, color: "#3AC9F5", title: "Education & Training", desc: "Student portals, instructor dashboards, and content management systems" },
            ].map((c, i) => <LightCard key={c.title} color={c.color} icon={c.icon} title={c.title} desc={c.desc} delay={(i % 3) * 0.07} />)}
          </div>
        </Container>
      </section>

      <div className="bg-[#F1F4F9]"><SeoContentFaq content={seoContent} faqs={seoFaqs} lightTheme={true} /></div>

      {/* CTA */}
      <section className="bg-[#141A2E] py-20 sm:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="kicker" style={{ borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.07)", color: "#93c5fd" }}>Start a Project</span>
              <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Ready to Build Your Custom Portal?</h2>
              <p className="mt-5 text-lg text-slate-400 max-w-xl mx-auto">Tell us about your workflows and we'll design a system that fits your team — not the other way around.</p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link to="/contact" className="btn-primary">Start a Project <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/work?filter=web" className="btn-ghost-dark">View Web Projects</Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
