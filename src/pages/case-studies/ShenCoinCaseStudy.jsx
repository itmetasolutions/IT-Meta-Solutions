import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, useScroll, useInView } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Database,
  ExternalLink,
  Globe,
  Layers,
  Lock,
  Network,
  Server,
  ShieldCheck,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import SeoContentFaq from "../../components/SeoContentFaq";
import Container from "../../components/Container";

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

function LightCard({ icon: Icon, color = "#1D4ED8", title, desc, bullets, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div className="premium-card h-full rounded-2xl p-6">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: `${color}15` }}>
          <Icon className="h-5 w-5" style={{ color }} />
        </div>
        <h3 className="mb-2 text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
        {desc && <p className="mb-3 text-sm leading-relaxed text-slate-600">{desc}</p>}
        {bullets?.length ? (
          <ul className="space-y-2">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color }} />{b}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Reveal>
  );
}

function AnchorLink({ href, children, className }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        if (href?.startsWith("#")) {
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

const navItems = [
  { label: "Overview", href: "#overview" },
  { label: "Architecture", href: "#architecture" },
  { label: "Features", href: "#features" },
  { label: "Payment Flow", href: "#payment" },
  { label: "Results", href: "#results" },
];

function StickyNav() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) setActive(`#${en.target.id}`); }),
      { rootMargin: "-20% 0px -70% 0px" }
    );
    navItems.forEach(({ href }) => { const el = document.querySelector(href); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return (
    <div className="sticky top-[64px] z-40 border-b border-slate-100 bg-white/95 backdrop-blur-sm shadow-sm">
      <Container>
        <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-none">
          {navItems.map(({ label, href }) => (
            <AnchorLink
              key={href}
              href={href}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                active === href ? "bg-[#1D4ED8] text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {label}
            </AnchorLink>
          ))}
        </div>
      </Container>
    </div>
  );
}

const techStack = [
  { icon: Globe, label: "React", sublabel: "UI Framework" },
  { icon: Zap, label: "Vite", sublabel: "Build Tool" },
  { icon: Server, label: "Express.js", sublabel: "Node.js API" },
  { icon: Layers, label: "Prisma ORM", sublabel: "Type-safe DB" },
  { icon: Database, label: "PostgreSQL", sublabel: "Neon Serverless" },
  { icon: Wallet, label: "Phantom", sublabel: "Solana Wallet" },
  { icon: Wallet, label: "Solflare", sublabel: "Solana Wallet" },
  { icon: Network, label: "Solana RPC", sublabel: "On-chain Verify" },
  { icon: Lock, label: "JWT Auth", sublabel: "Admin Routes" },
  { icon: Code2, label: "TypeScript", sublabel: "Type Safety" },
];

const seoContent = {
  kicker: "Case Study",
  title: "Full-Stack Crypto Platform with Solana Payments",
  subtitle: "ShenCoin — a React + Vite SPA with Express.js REST API, Prisma ORM, Neon PostgreSQL, and Solana wallet payments.",
  paragraphs: [
    "We built a full-stack web application connecting a modern SPA to a secure REST API with on-chain transaction verification.",
    "The platform handles real Solana payments via Phantom and Solflare deep links with admin-verified wallet crediting.",
  ],
  bullets: [
    "Full-stack React + Express.js custom web app",
    "Solana blockchain payment integration",
    "Prisma ORM + Neon serverless PostgreSQL",
    "Admin verification layer with audit logs",
  ],
};

const seoFaqs = [
  { q: "What was built for ShenCoin?", a: "A full-stack crypto platform with React + Vite frontend, Express.js API, Prisma/Neon PostgreSQL, and Solana wallet payments." },
  { q: "How do Solana payments work in this platform?", a: "Users sign transactions in Phantom or Solflare. The TX hash is submitted to the API, verified on-chain via Solana RPC, and admins credit the wallet balance after confirmation." },
  { q: "Can you build similar blockchain platforms?", a: "Yes. We build full-stack web applications with blockchain integrations, custom APIs, and production-grade database layers." },
];

export default function ShenCoinCaseStudy() {
  return (
    <>
      <Helmet>
        <title>ShenCoin — Solana Crypto Platform | IT Meta Solutions</title>
        <meta name="description" content="Case study: ShenCoin — a React + Vite SPA with Express.js REST API, Prisma ORM, Neon PostgreSQL, and Solana wallet payments via Phantom and Solflare deep links." />
        <meta name="keywords" content="ShenCoin, Solana, crypto platform, React Vite, Express.js, Prisma, Neon PostgreSQL, blockchain, wallet, IT Meta Solutions" />
        <meta property="og:title" content="ShenCoin — Solana Crypto Platform | IT Meta Solutions" />
        <meta property="og:description" content="Full-stack crypto platform with React + Vite, Express.js REST API, Prisma ORM, and Solana wallet payments." />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://itmetasolutions.com/case-study/shencoin" />
        <meta property="og:image" content="https://itmetasolutions.com/favicon.webp" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <ScrollProgress />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#141A2E] pb-20 pt-28 sm:pb-28 sm:pt-36">
        <div aria-hidden className="absolute inset-0 dot-grid-bg opacity-25 pointer-events-none" />
        <div aria-hidden className="absolute -top-32 right-0 w-[600px] h-[500px] rounded-full bg-[#1D4ED8]/10 blur-[120px] pointer-events-none" />
        <div aria-hidden className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full bg-[#23A6E8]/8 blur-[100px] pointer-events-none" />
        <Container>
          <Reveal>
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { icon: Globe, label: "React + Vite" },
                { icon: Server, label: "Express.js" },
                { icon: Database, label: "Neon PostgreSQL" },
                { icon: Wallet, label: "Solana" },
                { icon: Lock, label: "JWT Auth" },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
                  <Icon className="h-3.5 w-3.5 text-[#3AC9F5]" />{label}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-heading)" }}>
              ShenCoin —{" "}
              <span className="animated-gradient-text">Solana Crypto Platform</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-base text-zinc-300 leading-relaxed">
              A full-stack crypto platform connecting a React + Vite SPA to an Express.js REST API backed by Prisma ORM
              and Neon Serverless PostgreSQL — with Solana wallet payments via Phantom and Solflare deep links,
              on-chain transaction signing, and an admin verification layer that credits wallets after blockchain confirmation.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-10 grid gap-4 sm:grid-cols-4">
              {[
                { icon: Globe, value: "React + Vite", label: "Frontend SPA" },
                { icon: Server, value: "Express.js", label: "Node.js REST API" },
                { icon: Database, value: "Neon PG", label: "Serverless Postgres" },
                { icon: Wallet, value: "Solana", label: "On-chain Payments" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Icon className="mb-3 h-6 w-6 text-[#3AC9F5]" />
                  <div className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{value}</div>
                  <div className="mt-1 text-sm text-zinc-400">{label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://shencoin.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                Visit shencoin.xyz <ExternalLink className="h-4 w-4" />
              </a>
              <Link to="/work?filter=custom-web-apps" className="btn-ghost-dark inline-flex items-center gap-2">
                More Custom Web Apps <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <StickyNav />

      {/* OVERVIEW */}
      <section id="overview" className="scroll-mt-20 bg-white py-20">
        <Container>
          <Reveal>
            <span className="kicker">Overview</span>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Production-ready crypto platform, end to end
            </h2>
            <p className="mt-4 max-w-2xl text-base text-slate-600">
              A production-ready crypto platform covering the entire stack — from the wallet UX in the browser to the admin verification layer in the back office.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal delay={0.05}>
              <div className="premium-card rounded-2xl p-6">
                <h3 className="mb-4 text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>What We Built</h3>
                <ul className="space-y-3">
                  {[
                    "React + Vite SPA with wallet detection",
                    "Phantom and Solflare deep link integration",
                    "In-app browser transaction signing flow",
                    "Express.js REST API with JWT-protected admin routes",
                    "Prisma ORM schema design and migrations",
                    "Neon serverless PostgreSQL setup and connection pooling",
                    "On-chain TX hash verification via Solana RPC",
                    "Admin panel: TX review, verify, approve / reject",
                    "Wallet balance crediting and ledger management",
                    "Audit log for all wallet and admin actions",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1D4ED8]" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="premium-card rounded-2xl p-6">
                <h3 className="mb-4 text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>Tech Stack</h3>
                <div className="grid grid-cols-2 gap-3">
                  {techStack.map((t) => (
                    <div key={t.label + t.sublabel} className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#1D4ED8]/10">
                        <t.icon className="h-3.5 w-3.5 text-[#1D4ED8]" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900">{t.label}</div>
                        <div className="text-[10px] text-slate-500">{t.sublabel}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ARCHITECTURE */}
      <section id="architecture" className="scroll-mt-20 bg-[#F1F4F9] py-20">
        <Container>
          <Reveal>
            <span className="kicker">Architecture</span>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Full-stack flow, browser to blockchain
            </h2>
            <p className="mt-4 max-w-2xl text-base text-slate-600">
              End-to-end flow from the React SPA through the Express.js API, Prisma ORM, and Neon PostgreSQL — with Solana wallet payments handled via deep links and on-chain verification.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 premium-card rounded-2xl p-6 overflow-x-auto">
              <div className="flex min-w-[600px] items-center justify-between gap-2">
                {[
                  { icon: Globe, label: "React + Vite", sublabel: "Browser SPA", color: "#1D4ED8" },
                  null,
                  { icon: Server, label: "Express.js API", sublabel: "Node.js", color: "#23A6E8" },
                  null,
                  { icon: Database, label: "Neon PostgreSQL", sublabel: "Prisma ORM", color: "#3AC9F5" },
                ].map((item, i) =>
                  item === null ? (
                    <div key={i} className="flex flex-col items-center gap-1 text-slate-400">
                      <ArrowRight className="h-5 w-5" />
                      <span className="text-[10px] uppercase tracking-wider">REST</span>
                    </div>
                  ) : (
                    <div key={item.label} className="flex flex-1 flex-col items-center gap-2 rounded-xl border border-slate-100 p-4 text-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${item.color}15` }}>
                        <item.icon className="h-5 w-5" style={{ color: item.color }} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{item.label}</div>
                        <div className="text-xs text-slate-500">{item.sublabel}</div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <LightCard
              icon={Wallet}
              title="Solana wallet flow"
              desc="User opens Phantom or Solflare → deep link launches dApp → signs on-chain → TX hash submitted to API."
              bullets={["Phantom & Solflare deep link support", "In-app browser transaction signing", "On-chain TX hash verification via RPC"]}
              delay={0.05}
            />
            <LightCard
              icon={ShieldCheck}
              color="#23A6E8"
              title="Admin verification layer"
              desc="Dedicated admin panel to review submitted TX hashes, verify on-chain, and approve wallet credits."
              bullets={["Pending TX queue with hash lookup", "One-click on-chain verification", "Full audit log per wallet action"]}
              delay={0.1}
            />
          </div>
        </Container>
      </section>

      {/* FEATURES */}
      <section id="features" className="scroll-mt-20 bg-white py-20">
        <Container>
          <Reveal>
            <span className="kicker">Platform Modules</span>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Every layer built to production standard
            </h2>
            <p className="mt-4 max-w-2xl text-base text-slate-600">
              Wallet UX, secure API, type-safe database, and an admin control layer — all production ready.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <LightCard
              icon={Globe}
              title="React + Vite Frontend"
              desc="Fast, modern SPA with wallet detection and deep links."
              bullets={["Wallet detection (Phantom / Solflare)", "Deep link & in-app browser launch", "Real-time transaction status feedback", "Responsive mobile wallet UX"]}
              delay={0.05}
            />
            <LightCard
              icon={Server}
              color="#23A6E8"
              title="Express.js REST API"
              desc="Node.js backend for TX submission, on-chain verification, and wallet crediting."
              bullets={["TX hash submission endpoint", "On-chain verification via Solana RPC", "Admin verification & wallet crediting", "JWT-protected admin routes"]}
              delay={0.1}
            />
            <LightCard
              icon={Database}
              color="#3AC9F5"
              title="Prisma ORM + Neon PostgreSQL"
              desc="Type-safe database layer with serverless connection pooling."
              bullets={["Prisma schema with relational models", "Neon serverless connection pooling", "Transaction history and status tracking", "Admin-managed balance ledger"]}
              delay={0.15}
            />
            <LightCard
              icon={Wallet}
              title="Solana Wallet Integration"
              desc="Phantom and Solflare support via deep links and in-app browser flows."
              bullets={["Phantom & Solflare deep link support", "In-app browser wallet flow", "On-chain transaction signing"]}
              delay={0.2}
            />
            <LightCard
              icon={ShieldCheck}
              color="#23A6E8"
              title="Admin Verification"
              desc="Admin panel to review TX hashes and approve credits."
              bullets={["Pending TX queue with hash lookup", "One-click on-chain verification", "Manual override and rejection controls"]}
              delay={0.25}
            />
            <LightCard
              icon={Zap}
              color="#3AC9F5"
              title="Serverless & Scalable"
              desc="Scale-to-zero database with stateless API and optimized bundle."
              bullets={["Scale-to-zero database costs", "Stateless API — horizontally scalable", "Deployable to Vercel / Render / Railway"]}
              delay={0.3}
            />
          </div>
        </Container>
      </section>

      {/* PAYMENT FLOW */}
      <section id="payment" className="scroll-mt-20 bg-[#F1F4F9] py-20">
        <Container>
          <Reveal>
            <span className="kicker">Payment Flow</span>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Solana payment flow — step by step
            </h2>
            <p className="mt-4 max-w-2xl text-base text-slate-600">
              A trustless, verifiable payment system: the user signs on-chain, we verify the TX hash via Solana RPC, and the admin credits the balance only after blockchain confirmation.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { step: "01", icon: Wallet, title: "Wallet Connect", desc: "User opens Phantom or Solflare. The React SPA detects the installed wallet and triggers the deep link to launch the dApp." },
              { step: "02", icon: ShieldCheck, title: "Sign On-Chain", desc: "The user reviews and signs the Solana transaction inside their wallet. The signed TX is broadcast to the Solana network." },
              { step: "03", icon: Server, title: "Submit TX Hash", desc: "The React frontend submits the TX hash to the Express.js API. The API stores it as a pending transaction in PostgreSQL." },
              { step: "04", icon: Network, title: "Admin Verifies", desc: "An admin reviews the pending TX hash. The API queries the Solana RPC to confirm the transaction is finalized on-chain." },
              { step: "05", icon: CheckCircle2, title: "Credit Wallet", desc: "After on-chain confirmation, the admin approves the transaction. The user's wallet balance is credited in PostgreSQL." },
              { step: "06", icon: Zap, title: "Real-Time Update", desc: "The React SPA reflects the updated balance. The user can now use their credited ShenCoin balance within the platform." },
            ].map(({ step, icon: Icon, title, desc }) => (
              <Reveal key={step} delay={parseInt(step) * 0.04}>
                <div className="premium-card h-full rounded-2xl p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-3xl font-black text-slate-200">{step}</span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1D4ED8]/10">
                      <Icon className="h-4 w-4 text-[#1D4ED8]" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* RESULTS CTA */}
      <section id="results" className="scroll-mt-20 relative bg-[#141A2E] py-20">
        <div aria-hidden className="absolute inset-0 dot-grid-bg opacity-10 pointer-events-none" />
        <Container className="relative">
          <Reveal>
            <span className="kicker" style={{ color: "#3AC9F5", borderColor: "#3AC9F5" }}>Deliverables</span>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold text-white sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Need a similar platform built?
            </h2>
            <p className="mt-4 max-w-xl text-base text-zinc-300">
              We build full-stack web applications with blockchain integrations, custom APIs, and production-grade database layers. Let's talk about your project.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold text-white">Skills & deliverables</p>
              <p className="mt-1 text-sm text-zinc-400">React • Vite • Express.js • Node.js • Prisma ORM • PostgreSQL • Neon Serverless • Solana • Phantom • Solflare • JWT Auth</p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                Start a Project <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/work?filter=custom-web-apps" className="btn-ghost-dark inline-flex items-center gap-2">
                View All Custom Web Apps <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="bg-[#F1F4F9]">
        <SeoContentFaq content={seoContent} faqs={seoFaqs} lightTheme={true} />
      </div>
    </>
  );
}
