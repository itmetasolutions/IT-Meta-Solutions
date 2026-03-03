import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useSpring } from "framer-motion";
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
  Sparkles,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

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
  return (
    <div className={cx("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
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
        <p className={cx("mt-4 text-base text-zinc-300 sm:text-lg max-w-3xl", centered && "mx-auto")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

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

/* ==================== ARCHITECTURE FLOW ==================== */
function ArchFlow() {
  const reduced = usePrefersReducedMotion();
  const layers = [
    {
      icon: Globe,
      label: "Browser",
      sublabel: "React + Vite",
      color: "from-blue-500 to-cyan-500",
      note: "SPA with wallet detection & deep link triggers",
    },
    {
      icon: ArrowRight,
      arrow: true,
      label: "HTTPS REST",
      sublabel: null,
      color: null,
    },
    {
      icon: Server,
      label: "Express.js API",
      sublabel: "Node.js",
      color: "from-green-500 to-emerald-600",
      note: "REST endpoints, TX hash verification, wallet crediting",
    },
    {
      icon: ArrowRight,
      arrow: true,
      label: "Prisma ORM",
      sublabel: null,
      color: null,
    },
    {
      icon: Database,
      label: "PostgreSQL",
      sublabel: "Neon Serverless",
      color: "from-indigo-500 to-violet-600",
      note: "Users, transactions, wallet balances, admin records",
    },
  ];

  const walletFlow = [
    "User opens Phantom or Solflare",
    "Deep link / in-app browser launches dApp",
    "User signs transaction on-chain (Solana)",
    "TX hash submitted to Express.js API",
    "Admin panel verifies TX on-chain",
    "Wallet balance credited in PostgreSQL",
  ];

  return (
    <div className="space-y-10">
      {/* Main stack horizontal */}
      <Reveal>
        <div className="flex justify-center overflow-x-auto">
          <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
            {layers.map((layer, i) =>
              layer.arrow ? (
                <div key={i} className="flex flex-col items-center gap-1 px-2">
                  <ArrowRight className="h-5 w-5 text-zinc-400" />
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider whitespace-nowrap">
                    {layer.label}
                  </span>
                </div>
              ) : (
                <motion.div
                  key={i}
                  initial={reduced ? false : { y: 12 }}
                  whileInView={reduced ? {} : { y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] p-5 min-w-[140px]"
                >
                  <div className={cx("rounded-xl bg-gradient-to-br p-3", layer.color)}>
                    <layer.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-white">{layer.label}</div>
                    {layer.sublabel && (
                      <div className="text-xs text-zinc-400">{layer.sublabel}</div>
                    )}
                  </div>
                  {layer.note && (
                    <p className="mt-1 text-center text-[11px] text-zinc-400 leading-tight max-w-[130px]">
                      {layer.note}
                    </p>
                  )}
                </motion.div>
              )
            )}
          </div>
        </div>
      </Reveal>

      {/* Solana wallet flow */}
      <Reveal delay={0.1}>
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 p-2.5">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-base font-semibold text-white">Solana Wallet Payment Flow</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {walletFlow.map((step, i) => (
              <motion.div
                key={i}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                whileInView={reduced ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3"
              >
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-[#5025d1] to-purple-600 text-xs font-bold text-white flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-sm text-zinc-200 leading-snug">{step}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

/* ==================== PAGE DATA ==================== */
const stats = [
  { icon: Globe, value: "React + Vite", label: "Frontend SPA" },
  { icon: Server, value: "Express.js", label: "Node.js REST API" },
  { icon: Database, value: "Neon PG", label: "Serverless Postgres" },
  { icon: Wallet, value: "Solana", label: "On-chain Payments" },
];

const features = [
  {
    icon: Globe,
    title: "React + Vite Frontend",
    desc: "Fast, modern SPA built with React and Vite. Detects installed Solana wallets, triggers deep links to Phantom and Solflare in-app browsers, and handles the full payment UX client-side.",
    bullets: [
      "Wallet detection (Phantom / Solflare)",
      "Deep link & in-app browser launch",
      "Real-time transaction status feedback",
      "Responsive design for mobile wallet UX",
    ],
  },
  {
    icon: Server,
    title: "Express.js REST API",
    desc: "Node.js backend that handles transaction submission, on-chain verification, and wallet crediting. Clean RESTful endpoints with middleware for authentication and rate limiting.",
    bullets: [
      "TX hash submission endpoint",
      "On-chain verification via Solana RPC",
      "Admin verification & wallet crediting",
      "JWT-protected admin routes",
    ],
  },
  {
    icon: Database,
    title: "Prisma ORM + Neon PostgreSQL",
    desc: "Type-safe database layer with Prisma ORM backed by Neon's serverless PostgreSQL. Stores users, transactions, wallet balances, and admin records with full audit trails.",
    bullets: [
      "Prisma schema with relational models",
      "Neon serverless connection pooling",
      "Transaction history and status tracking",
      "Admin-managed balance ledger",
    ],
  },
  {
    icon: Wallet,
    title: "Solana Wallet Integration",
    desc: "Phantom and Solflare support via deep links and in-app browser flows. Users sign real on-chain transactions, and the TX hash is submitted to the API for verification before any credits are applied.",
    bullets: [
      "Phantom & Solflare deep link support",
      "In-app browser wallet flow",
      "On-chain transaction signing",
      "TX hash → API → admin verify → credit",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Admin Verification Layer",
    desc: "Dedicated admin panel to review submitted transaction hashes, verify them on-chain via the Solana RPC, and approve wallet credits. Prevents fraud and ensures only valid transactions are credited.",
    bullets: [
      "Pending TX queue with hash lookup",
      "One-click on-chain verification",
      "Manual override and rejection controls",
      "Full audit log per wallet action",
    ],
  },
  {
    icon: Zap,
    title: "Serverless & Scalable",
    desc: "Neon's serverless PostgreSQL scales to zero when idle and bursts on demand. Combined with stateless Express.js and Vite's optimised bundle, the app handles real-world load without over-provisioning.",
    bullets: [
      "Scale-to-zero database costs",
      "Stateless API — horizontally scalable",
      "Vite optimised production bundle",
      "Deployable to Vercel / Render / Railway",
    ],
  },
];

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

const scope = [
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
];

/* ==================== MAIN PAGE ==================== */
export default function ShenCoinCaseStudy() {
  return (
    <>
      <Helmet>
        <title>ShenCoin — Solana Crypto Platform | IT Meta Solutions</title>
        <meta
          name="description"
          content="Case study: ShenCoin — a React + Vite SPA with Express.js REST API, Prisma ORM, Neon PostgreSQL, and Solana wallet payments via Phantom and Solflare deep links."
        />
      </Helmet>

      <ScrollProgress />

      <main className="relative min-h-screen overflow-hidden pb-24">
        {/* Background blobs */}
        <GradientBlob className="left-1/3 top-0 h-[600px] w-[600px] -translate-x-1/2" color="rgba(80,37,209,0.18)" />
        <GradientBlob className="-right-40 top-1/3 h-[500px] w-[500px]" color="rgba(124,58,237,0.12)" />
        <GradientBlob className="-left-40 bottom-1/4 h-[400px] w-[400px]" color="rgba(99,102,241,0.12)" />

        {/* ==================== HERO ==================== */}
        <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20">
          <Container>
            <Reveal>
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <Badge icon={Sparkles}>Custom Web App</Badge>
                <Badge icon={Wallet}>Solana Blockchain</Badge>
                <a
                  href="https://shencoin.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#5025d1]/40 bg-[#5025d1]/10 px-4 py-2 text-sm font-medium text-purple-300 transition-colors hover:bg-[#5025d1]/20"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  shencoin.xyz
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                ShenCoin
                <br />
                <span className="bg-gradient-to-r from-[#5025d1] via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Crypto Platform
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300 sm:text-xl">
                A full-stack crypto platform connecting a React + Vite SPA to an Express.js REST API backed by Prisma ORM
                and Neon Serverless PostgreSQL — with Solana wallet payments via Phantom and Solflare deep links,
                on-chain transaction signing, and an admin verification layer that credits wallets after blockchain confirmation.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-2">
                {["React", "Vite", "Express.js", "Node.js", "Prisma", "PostgreSQL", "Neon", "Solana", "Phantom", "Solflare"].map(
                  (tag) => (
                    <Pill key={tag}>{tag}</Pill>
                  )
                )}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="https://shencoin.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#5025d1] to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5025d1]/30 transition-all hover:shadow-xl hover:shadow-[#5025d1]/40 hover:gap-3"
                >
                  Visit shencoin.xyz
                  <ExternalLink className="h-4 w-4" />
                </a>
                <Link
                  to="/work?filter=custom-web-apps"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:gap-3"
                >
                  More Custom Web Apps
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* ==================== STATS ==================== */}
        <section className="py-8">
          <Container>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((s, i) => (
                <StatCard key={i} icon={s.icon} value={s.value} label={s.label} delay={i * 0.08} />
              ))}
            </div>
          </Container>
        </section>

        <Divider />

        {/* ==================== ARCHITECTURE ==================== */}
        <section className="py-4">
          <Container>
            <SectionHeading
              badge="Architecture"
              title="Full-Stack Architecture"
              description="End-to-end flow from the React SPA through the Express.js API, Prisma ORM, and Neon PostgreSQL — with Solana wallet payments handled via deep links and on-chain verification."
            />
            <ArchFlow />
          </Container>
        </section>

        <Divider />

        {/* ==================== SCOPE ==================== */}
        <section className="py-4">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <Reveal>
                <SectionHeading
                  badge="Project Scope"
                  title="What We Built"
                  description="A production-ready crypto platform covering the entire stack — from the wallet UX in the browser to the admin verification layer in the back office."
                />
                <ul className="space-y-3">
                  {scope.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-200">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#5025d1]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-7 backdrop-blur-sm">
                  <h3 className="mb-6 text-lg font-semibold text-white">Tech Stack</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {techStack.map((t, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5"
                      >
                        <div className="flex-shrink-0 rounded-lg bg-gradient-to-br from-[#5025d1] to-purple-600 p-1.5">
                          <t.icon className="h-3.5 w-3.5 text-white" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">{t.label}</div>
                          <div className="text-[10px] text-zinc-400">{t.sublabel}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        <Divider />

        {/* ==================== FEATURES ==================== */}
        <section className="py-4">
          <Container>
            <SectionHeading
              badge="Features"
              title="Platform Modules"
              description="Every layer of the platform built to production standard — wallet UX, secure API, type-safe database, and an admin control layer."
              centered
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <FeatureCard key={i} icon={f.icon} title={f.title} desc={f.desc} bullets={f.bullets} delay={i * 0.08} />
              ))}
            </div>
          </Container>
        </section>

        <Divider />

        {/* ==================== HOW THE PAYMENT FLOW WORKS ==================== */}
        <section className="py-4">
          <Container>
            <SectionHeading
              badge="Payment Flow"
              title="Solana Payment Flow — Step by Step"
              description="A trustless, verifiable payment system: the user signs on-chain, we verify the TX hash via Solana RPC, and the admin credits the balance only after blockchain confirmation."
              centered
            />

            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  step: "01",
                  icon: Wallet,
                  title: "Wallet Connect",
                  desc: "User opens Phantom or Solflare. The React SPA detects the installed wallet and triggers the deep link or in-app browser to launch the dApp.",
                },
                {
                  step: "02",
                  icon: ShieldCheck,
                  title: "Sign On-Chain",
                  desc: "The user reviews and signs the Solana transaction inside their wallet. The signed TX is broadcast to the Solana network and a TX hash is returned.",
                },
                {
                  step: "03",
                  icon: Server,
                  title: "Submit TX Hash",
                  desc: "The React frontend submits the TX hash to the Express.js API. The API stores it as a pending transaction in PostgreSQL via Prisma.",
                },
                {
                  step: "04",
                  icon: Network,
                  title: "Admin Verifies",
                  desc: "An admin reviews the pending TX hash in the admin panel. The API queries the Solana RPC to confirm the transaction is finalized on-chain.",
                },
                {
                  step: "05",
                  icon: CheckCircle2,
                  title: "Credit Wallet",
                  desc: "After on-chain confirmation, the admin approves the transaction. The user's wallet balance is credited in PostgreSQL and the audit log is updated.",
                },
                {
                  step: "06",
                  icon: Zap,
                  title: "Real-Time Update",
                  desc: "The React SPA reflects the updated balance. The user can now use their credited ShenCoin balance within the platform.",
                },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 backdrop-blur-sm h-full">
                    <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-gradient-to-br from-[#5025d1]/20 to-purple-600/15 blur-2xl transition-all group-hover:scale-150" />
                    <div className="relative">
                      <div className="mb-4 flex items-center gap-3">
                        <span className="text-4xl font-black text-white/10 leading-none">{item.step}</span>
                        <div className="rounded-xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-2.5">
                          <item.icon className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <h3 className="text-base font-semibold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <Divider />

        {/* ==================== CTA ==================== */}
        <section className="py-4">
          <Container>
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#5025d1]/20 via-purple-900/10 to-transparent p-10 text-center backdrop-blur-sm">
                <GradientBlob
                  className="left-1/2 top-0 h-64 w-64 -translate-x-1/2"
                  color="rgba(80,37,209,0.25)"
                />
                <div className="relative">
                  <Badge icon={Sparkles}>Get In Touch</Badge>
                  <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
                    Need a Similar Platform Built?
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-base text-zinc-300">
                    We build full-stack web applications with blockchain integrations, custom APIs, and production-grade
                    database layers. Let's talk about your project.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#5025d1] to-purple-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#5025d1]/30 transition-all hover:shadow-xl hover:shadow-[#5025d1]/40 hover:gap-3"
                    >
                      Start a Project
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/work?filter=custom-web-apps"
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:gap-3"
                    >
                      View All Custom Web Apps
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      </main>
    </>
  );
}
