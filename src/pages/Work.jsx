import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Code2,
  Globe,
  Instagram,
  LayoutGrid,
  Megaphone,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wallet,
  Building2,
  ShoppingCart,
  Leaf,
  MapPin,
} from "lucide-react";

/**
 * WORKS PAGE (Portfolio Listing)
 * - Shows each project with moderate details
 * - Links to full case study pages you already made (one per project)
 * - Same dark/glass/gradient + scroll progress + reveal theme
 *
 * ✅ Replace href routes to match your routing (Next.js / React Router / plain anchors).
 * Example routes:
 *  /work/united-muslim-travels
 *  /work/halla-gulla
 *  /work/esahulat-mart
 *  /work/hikmabiotics
 */

const cx = (...c) => c.filter(Boolean).join(" ");

function Container({ children, className }) {
  return (
    <div className={cx("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

function GradientBlob({ className }) {
  return (
    <div
      aria-hidden
      className={cx(
        "pointer-events-none absolute inset-0 -z-10 blur-3xl opacity-40",
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

function SectionTitle({ kicker, title, desc, align = "left" }) {
  return (
    <div className={cx("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
        <Sparkles className="h-3.5 w-3.5" />
        {kicker}
      </div>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h1>
      <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">{desc}</p>
    </div>
  );
}

function Divider() {
  return <div className="my-14 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />;
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-zinc-200">
      {children}
    </span>
  );
}

function StatRow({ stats }) {
  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-3">
      {stats.map((s) => (
        <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5">
              <s.icon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white">{s.value}</div>
              <div className="text-xs text-zinc-400">{s.label}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectCard({ p }) {
  const Icon = p.icon;
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-6 h-full">
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />
      </div>

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-lg font-semibold text-white">{p.title}</div>
                <div className="mt-1 text-xs text-zinc-400">{p.industry}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 justify-end">
            {p.tags.slice(0, 3).map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-zinc-300">{p.summary}</p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="text-xs font-semibold text-white">Scope</div>
            <ul className="mt-2 space-y-1 text-xs text-zinc-300">
              {p.scope.slice(0, 5).map((s, i) => (
                <li key={i} className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-emerald-300" />
                  <span className="opacity-90">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="text-xs font-semibold text-white">Highlights</div>
            <ul className="mt-2 space-y-1 text-xs text-zinc-300">
              {p.highlights.slice(0, 5).map((s, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  <span className="opacity-90">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {p.stats?.length ? <StatRow stats={p.stats} /> : null}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {p.platforms?.map((pl) => (
              <Pill key={pl.label} icon={pl.icon}>
                {pl.label}
              </Pill>
            ))}
          </div>

          <a
            href={p.href}
            className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:opacity-90"
          >
            View full case study <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

const PROJECTS = [
  {
    key: "united-muslim-travels",
    title: "United Muslim Travels",
    icon: Building2,
    industry: "Religious Travel • Hajj • Umrah • Ziyarat",
    tags: ["Website", "Meta Ads", "Lead Gen"],
    summary:
      "Trust-first Islamic travel brand build with conversion website, social presence, and a funnel system designed to generate qualified inquiries through WhatsApp and lead forms.",
    scope: ["Website & package architecture", "WhatsApp-first conversions", "Meta Ads funnel", "Social setup", "Lead routing"],
    highlights: [
      "Conversion-ready website foundation",
      "Clear service & package structure",
      "Organic + paid synergy",
      "Lead generation workflow",
      "Scalable seasonal system",
    ],
    stats: [
      { icon: Megaphone, label: "Channel", value: "Meta Ads" },
      { icon: Users, label: "Outcome", value: "Qualified inquiries" },
      { icon: ShieldCheck, label: "Goal", value: "Trust + conversion" },
    ],
    platforms: [
      { label: "Website", icon: LayoutGrid },
      { label: "Instagram", icon: Instagram },
      { label: "Facebook", icon: Globe },
    ],
    href: "/case-studies/united-muslim-travels-brand-build",
  },
  {
    key: "halla-gulla",
    title: "Halla Gulla",
    icon: MapPin,
    industry: "Tours • Travel • Pakistan Tourism",
    tags: ["Website", "Social", "Leads"],
    summary:
      "Youthful travel brand build with a clean website, consistent IG/FB presence, and a 3-stage Meta funnel validated on a controlled test budget.",
    scope: ["Website (destinations, tours, gallery)", "IG/FB setup + highlights", "Meta funnel (Awareness → Leads)", "WhatsApp + forms"],
    highlights: ["67 potential leads in 3 days", "~78 PKR CPL", "Fast traction with reels + visuals", "Ads-ready site structure"],
    stats: [
      { icon: Wallet, label: "Spend", value: "5,500 PKR" },
      { icon: Users, label: "Leads", value: "67" },
      { icon: Target, label: "CPL", value: "~78 PKR" },
    ],
    platforms: [
      { label: "Website", icon: LayoutGrid },
      { label: "Instagram", icon: Instagram },
      { label: "Meta Ads", icon: Megaphone },
    ],
    href: "/case-study/halla-gulla",
  },
  {
    key: "esahulat-mart",
    title: "eSahulat Mart",
    icon: ShoppingCart,
    industry: "E-commerce • General Store • Daily Essentials",
    tags: ["E-commerce", "Sales", "ROAS"],
    summary:
      "Sales-driven e-commerce build with conversion UX, trust-focused social, and purchase-optimized Meta ads achieving consistent daily orders on controlled spend.",
    scope: ["E-commerce website + checkout", "Pixel + purchase events", "Retargeting & purchase campaigns", "IG/FB trust content"],
    highlights: ["2+ lac PKR sales in ~3 months", "250–300 PKR cost per sale", "Sustainable daily spend model", "Offer-led creatives"],
    stats: [
      { icon: Wallet, label: "Revenue", value: "2+ lac PKR" },
      { icon: Target, label: "Cost/Sale", value: "250–300 PKR" },
      { icon: CalendarDays, label: "Duration", value: "~3 months" },
    ],
    platforms: [
      { label: "Website", icon: LayoutGrid },
      { label: "Instagram", icon: Instagram },
      { label: "Meta Ads", icon: Megaphone },
    ],
    href: "/case-study/esahulat-mart",
  },
  {
    key: "hikmabiotics",
    title: "Hikmabiotics",
    icon: Leaf,
    industry: "Natural Supplements • Wellness • Herbal Products",
    tags: ["Dual Market", "PK+UK", "E-commerce"],
    summary:
      "International-ready dual-market brand system with localized PK & UK websites, separate social identities, and early profitable Pakistan ads — while maintaining one premium brand voice.",
    scope: ["Dual websites (PK + UK)", "Localized messaging & UX", "PK Meta purchase funnel", "Dual social presence (PK + UK)", "UK organic foundation"],
    highlights: ["2 websites (PK + UK)", "PK launch ~20k revenue in 3 days", "250–300 PKR cost per sale (PK)", "UK brand-first organic plan"],
    stats: [
      { icon: Globe, label: "Markets", value: "Pakistan + UK" },
      { icon: Wallet, label: "PK Revenue (launch)", value: "~20k PKR" },
      { icon: Target, label: "Cost/Sale (PK)", value: "250–300 PKR" },
    ],
    platforms: [
      { label: "PK Website", icon: LayoutGrid },
      { label: "UK Website", icon: Globe },
      { label: "Instagram", icon: Instagram },
    ],
    href: "/case-study/hikmabiotics",
  },
  {
    key: "in-homes-direct",
    title: "IN HOMES DIRECT",
    icon: Building2,
    industry: "Home Interiors • E-commerce",
    tags: ["Website", "Shopify", "Calculators"],
    summary:
      "Home interiors e-commerce with custom pricing logic and calculators for flooring and other products.",
    scope: ["Real-time flooring calculator", "Pack requirement logic", "Custom pricing rules", "SEO-ready structure"],
    highlights: [
      "Custom pricing calculators",
      "Pack requirement logic",
      "Real-time price updates",
      "SEO-optimized structure",
    ],
    stats: [],
    platforms: [
      { label: "Website", icon: LayoutGrid },
    ],
    href: "/case-study/inhomes-direct",
  },
  {
    key: "more-homes-group",
    title: "MORE HOMES GROUP",
    icon: Building2,
    industry: "Property Lettings • Real Estate",
    tags: ["Website", "Property", "Multi-city"],
    summary:
      "Property lettings platform with tenant and landlord services, advanced search, and multi-city coverage.",
    scope: ["Property listings", "Tenant & landlord flows", "Advanced search & filters", "Multi-city coverage"],
    highlights: [
      "Advanced search functionality",
      "Multi-city property listings",
      "Tenant and landlord portals",
      "Comprehensive property management",
    ],
    stats: [],
    platforms: [
      { label: "Website", icon: LayoutGrid },
    ],
    href: "/case-study/more-homes-group",
  },
  {
    key: "multidatum",
    title: "Multidatum",
    icon: BarChart3,
    industry: "Digital Marketing • Social Media Growth",
    tags: ["Strategy", "Paid Campaigns", "Analytics"],
    summary:
      "Data-driven social media growth for measurable brand impact through strategic campaigns and analytics.",
    scope: ["Strategy", "Paid campaigns", "Content & design", "Analytics & reporting"],
    highlights: [
      "Measurable brand growth",
      "Data-driven strategies",
      "Comprehensive analytics",
      "Optimized campaign performance",
    ],
    stats: [],
    platforms: [
      { label: "Website", icon: LayoutGrid },
      { label: "Social Media", icon: Instagram },
    ],
    href: "/case-study/multidatum",
  },
  {
    key: "debug",
    title: "Project Debug",
    icon: Code2,
    industry: "Software Development • Debugging Tools",
    tags: ["Debugging", "Tools", "Development"],
    summary:
      "Advanced debugging tools and software development solutions for efficient code analysis and error resolution.",
    scope: ["Code analysis", "Error tracking", "Performance monitoring", "Debugging utilities"],
    highlights: [
      "Real-time error detection",
      "Performance optimization",
      "Comprehensive logging",
      "User-friendly interface",
    ],
    stats: [],
    platforms: [
      { label: "Website", icon: LayoutGrid },
      { label: "Tools", icon: Code2 },
    ],
    href: "/about",
  },
];

function FilterPill({ active, onClick, icon: Icon, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm transition",
        active ? "border-white/20 bg-white text-zinc-950" : "border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10"
      )}
    >
      {Icon ? <Icon className="h-4 w-4" /> : null}
      {label}
      {active ? <CheckCircle2 className="h-4 w-4" /> : null}
    </button>
  );
}

export default function WorksPage() {
  useEffect(() => {
    document.title = "ITMS | Work";
  }, []);

  const year = useMemo(() => new Date().getFullYear(), []);
  const heroRef = useRef(null);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, -50]);
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0.9]);

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const filters = [
    { key: "all", label: "All", icon: LayoutGrid },
    { key: "travel", label: "Travel", icon: MapPin },
    { key: "ecommerce", label: "E-commerce", icon: ShoppingCart },
    { key: "wellness", label: "Wellness", icon: Leaf },
    { key: "ads", label: "Meta Ads", icon: Megaphone },
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const byQuery = (p) => {
      if (!q) return true;
      const hay = [
        p.title,
        p.industry,
        p.summary,
        ...(p.tags || []),
        ...(p.scope || []),
        ...(p.highlights || []),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    };

    const byFilter = (p) => {
      if (filter === "all") return true;
      if (filter === "ads") return (p.tags || []).some((t) => t.toLowerCase().includes("ads")) || p.summary.toLowerCase().includes("meta");
      if (filter === "travel") return p.industry.toLowerCase().includes("travel") || p.industry.toLowerCase().includes("tours");
      if (filter === "ecommerce") return p.industry.toLowerCase().includes("e-commerce") || p.industry.toLowerCase().includes("ecommerce");
      if (filter === "wellness") return p.industry.toLowerCase().includes("wellness") || p.industry.toLowerCase().includes("supplements");
      return true;
    };

    return PROJECTS.filter((p) => byQuery(p) && byFilter(p));
  }, [query, filter]);

  return (
    <div className="min-h-screen text-zinc-100 mb-16 overflow-x-hidden">
      <ScrollProgress />

      {/* Background accents */}
      <GradientBlob className="bg-[radial-gradient(closest-side,rgba(99,102,241,0.55),rgba(99,102,241,0))] bg-[length:50vw_50vw] sm:bg-[length:560px_560px] bg-left-top" />
      <GradientBlob className="bg-[radial-gradient(closest-side,rgba(16,185,129,0.5),rgba(16,185,129,0))] bg-[length:50vw_50vw] sm:bg-[length:560px_560px] bg-right-top" />

      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden">
        <Container className="pb-10 pt-16 sm:pb-14 sm:pt-24">
          <motion.div style={{ y: heroY, opacity: heroOpacity }}>
            <Reveal>
              <div className="flex flex-wrap items-center gap-2">
                <Pill icon={LayoutGrid}>Case studies</Pill>
                <Pill icon={Megaphone}>Performance marketing</Pill>
                <Pill icon={ShieldCheck}>Brand building</Pill>
                <Pill icon={BarChart3}>Results</Pill>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <SectionTitle
                kicker="Works"
                title="Detailed work pages for every brand build"
                desc="Browse projects with moderate detail here — open any project for the full case study page (the ones you already made)."
              />
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 grid gap-3 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5">
                      <Search className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 w-full">
                      <div className="text-xs font-semibold text-white">Search projects</div>
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search: ads, leads, e-commerce, UK, tours..."
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-white/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="text-xs font-semibold text-white">Filter</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {filters.map((f) => (
                      <FilterPill
                        key={f.key}
                        active={filter === f.key}
                        onClick={() => setFilter(f.key)}
                        icon={f.icon}
                        label={f.label}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </motion.div>
        </Container>
      </section>

      <Container>
        <Divider />
      </Container>

      {/* LIST */}
      <section className="pb-16">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            {filtered.map((p, idx) => (
              <Reveal key={p.key} delay={Math.min(idx * 0.05, 0.25)}>
                <ProjectCard p={p} />
              </Reveal>
            ))}
          </div>

          {/* Empty state */}
          {!filtered.length ? (
            <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center">
              <div className="text-lg font-semibold text-white">No matching projects</div>
              <div className="mt-2 text-sm text-zinc-300">Try a different keyword or reset the filter.</div>
              <div className="mt-5 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setFilter("all");
                  }}
                  className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950"
                >
                  Reset
                </button>
              </div>
            </div>
          ) : null}

          <div className="mt-12 rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-emerald-400/10 p-6">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <div className="text-sm font-semibold text-white">Want this style for more projects?</div>
                <div className="mt-1 text-sm text-zinc-300">
                  Add more projects to the <code className="text-zinc-100">PROJECTS</code> array and create a full case-study
                  route for each.
                </div>
              </div>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:opacity-90"
              >
                Request a proposal <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>


        </Container>
      </section>
    </div>
  );
}