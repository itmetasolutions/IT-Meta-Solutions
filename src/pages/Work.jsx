import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
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
  Cloud,
  Database,
  Zap,
  ExternalLink,
  X,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import Container from "../components/Container";

/* ==================== HELPERS ==================== */

const cx = (...classes) => classes.filter(Boolean).join(" ");

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

/* ==================== COMPONENTS ==================== */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-[#5025d1] via-purple-500 to-pink-500"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

function GradientBlob({ className, color = "rgba(80,37,209,0.3)" }) {
  return (
    <div
      aria-hidden
      className={cx("pointer-events-none absolute -z-10 blur-3xl", className)}
      style={{
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
      }}
    />
  );
}

function Badge({ children, icon: Icon }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </span>
  );
}

function SectionHeading({ badge, title, description, centered = false }) {
  return (
    <div className={cx("mb-12", centered && "text-center")}>
      {badge && (
        <div className={cx("mb-4", centered && "flex justify-center")}>
          <Badge icon={Sparkles}>{badge}</Badge>
        </div>
      )}
      <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && (
        <p className={cx("mt-4 text-lg text-zinc-300 sm:text-xl max-w-3xl", centered && "mx-auto")}>
          {description}
        </p>
      )}
    </div>
  );
}

function StatBadge({ icon: Icon, value, label }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div className="rounded-lg bg-gradient-to-br from-[#5025d1] to-purple-600 p-2">
          <Icon className="h-4 w-4 text-white" />
        </div>
        <div>
          <div className="text-base font-bold text-white">{value}</div>
          <div className="text-xs text-zinc-400">{label}</div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, delay = 0 }) {
  const reduced = usePrefersReducedMotion();
  const Icon = project.icon;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={reduced ? {} : { y: -8, transition: { duration: 0.2 } }}
      className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm transition-all hover:border-[#5025d1]/50"
    >
      {/* Animated background glow */}
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-gradient-to-br from-[#5025d1]/20 to-purple-600/20 blur-3xl transition-all group-hover:scale-150" />

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-3">
            <Icon className="h-7 w-7 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
            <p className="mt-1 text-sm text-zinc-400">{project.industry}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="rounded-full bg-[#5025d1]/20 px-3 py-1 text-xs font-medium text-purple-300 border border-[#5025d1]/30"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Summary */}
        <p className="mt-4 text-sm leading-relaxed text-zinc-300">{project.summary}</p>

        {/* Scope & Highlights */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-3 flex items-center gap-2">
              <Target className="h-4 w-4 text-[#5025d1]" />
              <span className="text-xs font-semibold text-white">Scope</span>
            </div>
            <ul className="space-y-2">
              {project.scope.slice(0, 4).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span className="text-xs font-semibold text-white">Highlights</span>
            </div>
            <ul className="space-y-2">
              {project.highlights.slice(0, 4).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                  <BadgeCheck className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-purple-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats */}
        {project.stats?.length > 0 && (
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {project.stats.map((stat, idx) => (
              <StatBadge key={idx} icon={stat.icon} value={stat.value} label={stat.label} />
            ))}
          </div>
        )}

        {/* Platforms */}
        {project.platforms?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {project.platforms.map((platform, idx) => (
              <Badge key={idx} icon={platform.icon}>
                {platform.label}
              </Badge>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-6">
          {project.external ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5025d1] to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5025d1]/30 transition-all hover:shadow-xl hover:shadow-[#5025d1]/40 hover:scale-105"
            >
              View Project
              <ExternalLink className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </a>
          ) : (
            <Link
              to={project.href}
              className="group/btn inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5025d1] to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5025d1]/30 transition-all hover:shadow-xl hover:shadow-[#5025d1]/40 hover:scale-105"
            >
              View Case Study
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

const PROJECTS = [
  {
    key: "salesforce-erp-integration",
    title: "Enterprise ERP Integration",
    icon: Cloud,
    industry: "Salesforce • ERP Integration",
    tags: ["Salesforce", "Integration", "Automation"],
    summary:
      "Complete Salesforce-ERP integration with real-time data synchronization, automated workflows, and custom business logic to streamline operations across departments.",
    scope: ["REST/SOAP API integration", "Real-time data sync", "Custom Apex triggers", "Automated workflows", "Error handling & logging"],
    highlights: [
      "Zero data loss migration",
      "Real-time bidirectional sync",
      "Automated order processing",
      "Reduced manual entry by 80%",
    ],
    stats: [
      { icon: Database, label: "Records Migrated", value: "100K+" },
      { icon: Zap, label: "Automation", value: "Real-time sync" },
      { icon: Target, label: "Accuracy", value: "100%" },
    ],
    platforms: [
      { label: "Sales Cloud", icon: Cloud },
      { label: "Custom API", icon: Code2 },
    ],
    href: "https://www.upwork.com/freelancers/~0159ca8b8e6b8eb63e?p=1920426864212738048",
    external: true,
  },
  {
    key: "salesforce-payment-gateway",
    title: "Payment Gateway Integration",
    icon: Cloud,
    industry: "Salesforce • E-commerce • Payment Processing",
    tags: ["Salesforce", "Stripe", "Shopify"],
    summary:
      "Multi-platform payment integration connecting Salesforce with Stripe and Shopify for seamless order processing, payment tracking, and customer management.",
    scope: ["Stripe API integration", "Shopify connector", "Payment tracking", "Customer sync", "Invoice automation"],
    highlights: [
      "Unified payment tracking",
      "Automated invoice generation",
      "Customer data synchronization",
      "Revenue reporting dashboard",
    ],
    stats: [
      { icon: ShieldCheck, label: "Security", value: "PCI Compliant" },
      { icon: Zap, label: "Integration", value: "3 platforms" },
      { icon: BarChart3, label: "Reporting", value: "Real-time" },
    ],
    platforms: [
      { label: "Salesforce", icon: Cloud },
      { label: "Stripe", icon: Wallet },
      { label: "Shopify", icon: ShoppingCart },
    ],
    href: "https://www.upwork.com/freelancers/~0159ca8b8e6b8eb63e?p=1920439837014478848",
    external: true,
  },
  {
    key: "salesforce-lightning-app",
    title: "Custom Lightning Application",
    icon: Cloud,
    industry: "Salesforce • Custom Development",
    tags: ["Salesforce", "LWC", "Automation"],
    summary:
      "Built custom Lightning Web Components application to replace manual processes with automated workflows, improving team productivity and data accuracy.",
    scope: ["Lightning Web Components", "Apex classes", "Flow automation", "Custom objects", "Permission sets"],
    highlights: [
      "Replaced 5 manual processes",
      "Improved data accuracy by 95%",
      "Reduced processing time by 70%",
      "Enhanced user experience",
    ],
    stats: [
      { icon: Zap, label: "Apps Built", value: "4+" },
      { icon: Target, label: "Efficiency Gain", value: "70%" },
      { icon: Users, label: "User Adoption", value: "100%" },
    ],
    platforms: [
      { label: "Lightning", icon: Cloud },
      { label: "Apex", icon: Code2 },
    ],
    href: "https://www.upwork.com/freelancers/~0159ca8b8e6b8eb63e?p=1923125235402395648",
    external: true,
  },
  {
    key: "salesforce-service-cloud",
    title: "Service Cloud Implementation",
    icon: Cloud,
    industry: "Salesforce • Customer Service",
    tags: ["Salesforce", "Service Cloud", "Portal"],
    summary:
      "Complete Service Cloud setup with customer portal, case management, knowledge base, and automated routing to enhance customer support operations.",
    scope: ["Service Cloud setup", "Experience Cloud portal", "Case automation", "Knowledge base", "Omni-channel routing"],
    highlights: [
      "50% faster case resolution",
      "Self-service portal reducing tickets",
      "Automated case routing",
      "Enhanced customer satisfaction",
    ],
    stats: [
      { icon: Users, label: "Portal Users", value: "1000+" },
      { icon: Target, label: "Resolution Time", value: "-50%" },
      { icon: ShieldCheck, label: "CSAT", value: "4.8/5" },
    ],
    platforms: [
      { label: "Service Cloud", icon: Cloud },
      { label: "Experience Cloud", icon: Globe },
    ],
    href: "https://www.upwork.com/freelancers/~0159ca8b8e6b8eb63e?p=2011807565210583040",
    external: true,
  },
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

function FilterChip({ active, onClick, icon: Icon, label }) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={reduced ? {} : { scale: 1.05 }}
      whileTap={reduced ? {} : { scale: 0.95 }}
      className={cx(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all",
        active
          ? "border-[#5025d1] bg-gradient-to-r from-[#5025d1] to-purple-600 text-white shadow-lg shadow-[#5025d1]/30"
          : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:border-white/20"
      )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {label}
      {active && <CheckCircle2 className="h-4 w-4" />}
    </motion.button>
  );
}

/* ==================== PAGE ==================== */

export default function WorkPage() {
  const reduced = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const [searchParams] = useSearchParams();

  // Parallax effects
  const heroY = useTransform(scrollY, [0, 500], [0, reduced ? 0 : 150]);

  const [query, setQuery] = useState("");
  const [mainTab, setMainTab] = useState("all");
  const [subFilter, setSubFilter] = useState("all");

  // Read URL parameter on mount and set initial filter
  useEffect(() => {
    const filterParam = searchParams.get("filter");
    if (filterParam) {
      if (filterParam === "salesforce") {
        setMainTab("salesforce");
        setSubFilter("all");
      } else if (filterParam === "web") {
        setMainTab("web");
        setSubFilter("all");
      }
    }
  }, [searchParams]);

  const mainTabs = [
    { key: "all", label: "All Projects", icon: LayoutGrid },
    { key: "web", label: "Web Development", icon: Code2 },
    { key: "salesforce", label: "Salesforce", icon: Cloud },
  ];

  const webSubFilters = [
    { key: "all", label: "All Web Projects", icon: LayoutGrid },
    { key: "ecommerce", label: "E-commerce", icon: ShoppingCart },
    { key: "business", label: "Business Sites", icon: Building2 },
    { key: "travel", label: "Travel & Tourism", icon: MapPin },
  ];

  const salesforceSubFilters = [
    { key: "all", label: "All Salesforce Projects", icon: Cloud },
    { key: "integration", label: "Integrations", icon: Database },
    { key: "custom-dev", label: "Custom Development", icon: Code2 },
    { key: "automation", label: "Automation", icon: Zap },
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const byQuery = (p) => {
      if (!q) return true;
      const searchText = [
        p.title,
        p.industry,
        p.summary,
        ...(p.tags || []),
        ...(p.scope || []),
        ...(p.highlights || []),
      ]
        .join(" ")
        .toLowerCase();
      return searchText.includes(q);
    };

    const byMainTab = (p) => {
      if (mainTab === "all") return true;
      if (mainTab === "salesforce") {
        return (
          p.industry.toLowerCase().includes("salesforce") ||
          (p.tags || []).some((t) => t.toLowerCase().includes("salesforce"))
        );
      }
      if (mainTab === "web") {
        return (
          (p.tags || []).some((t) => t.toLowerCase().includes("website")) ||
          p.industry.toLowerCase().includes("web") ||
          p.platforms?.some((pl) => pl.label.toLowerCase().includes("website"))
        );
      }
      return true;
    };

    const bySubFilter = (p) => {
      if (subFilter === "all") return true;

      // Web sub-filters
      if (subFilter === "ecommerce") {
        return (
          p.industry.toLowerCase().includes("e-commerce") ||
          p.industry.toLowerCase().includes("ecommerce") ||
          (p.tags || []).some((t) => t.toLowerCase().includes("e-commerce"))
        );
      }
      if (subFilter === "business") {
        return (
          p.industry.toLowerCase().includes("property") ||
          p.industry.toLowerCase().includes("real estate") ||
          p.industry.toLowerCase().includes("lettings") ||
          p.industry.toLowerCase().includes("interiors")
        );
      }
      if (subFilter === "travel") {
        return (
          p.industry.toLowerCase().includes("travel") ||
          p.industry.toLowerCase().includes("tours") ||
          p.industry.toLowerCase().includes("tourism")
        );
      }

      // Salesforce sub-filters
      if (subFilter === "integration") {
        return (
          p.title.toLowerCase().includes("integration") ||
          p.summary.toLowerCase().includes("integration") ||
          (p.scope || []).some((s) => s.toLowerCase().includes("integration"))
        );
      }
      if (subFilter === "custom-dev") {
        return (
          p.title.toLowerCase().includes("custom") ||
          p.title.toLowerCase().includes("lightning") ||
          (p.scope || []).some((s) => s.toLowerCase().includes("lwc") || s.toLowerCase().includes("apex"))
        );
      }
      if (subFilter === "automation") {
        return (
          p.summary.toLowerCase().includes("automation") ||
          (p.tags || []).some((t) => t.toLowerCase().includes("automation")) ||
          (p.scope || []).some((s) => s.toLowerCase().includes("automation") || s.toLowerCase().includes("workflow"))
        );
      }

      return true;
    };

    return PROJECTS.filter((p) => byQuery(p) && byMainTab(p) && bySubFilter(p));
  }, [query, mainTab, subFilter]);

  return (
    <>
      <Helmet>
        <title>IT Meta Solutions - Our Work | Portfolio & Case Studies</title>
        <meta
          name="description"
          content="Explore IT Meta Solutions' successful digital projects and case studies. View our portfolio of web development, digital marketing, branding, and SEO campaigns for clients worldwide."
        />
        <link rel="canonical" href="https://itmetasolutions.com/work" />
      </Helmet>

      <div className="relative min-h-screen overflow-hidden">
        <ScrollProgress />

        {/* Background Elements */}
        <GradientBlob className="left-0 top-0 h-[600px] w-[600px]" color="rgba(80,37,209,0.2)" />
        <GradientBlob className="right-0 top-1/4 h-[800px] w-[800px]" color="rgba(186,85,211,0.15)" />
        <GradientBlob className="bottom-0 left-1/3 h-[700px] w-[700px]" color="rgba(80,37,209,0.18)" />

        {/* ==================== HERO SECTION ==================== */}
        <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24">
          <Container>
            <motion.div
              style={{ y: heroY }}
              className="mx-auto max-w-5xl text-center"
            >
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={reduced ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge icon={Sparkles}>Our Portfolio</Badge>
              </motion.div>

              <motion.h1
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={reduced ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-8 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
              >
                Our Work Speaks
                <br />
                <span className="bg-gradient-to-r from-[#5025d1] via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  For Itself
                </span>
              </motion.h1>

              <motion.p
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={reduced ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 text-xl text-zinc-300 sm:text-2xl max-w-3xl mx-auto"
              >
                Real projects, real results. Explore our case studies and see how we've helped businesses grow through strategic web development, digital marketing, and brand building.
              </motion.p>

              {/* Search and Filters */}
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={reduced ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-10"
              >
                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 backdrop-blur-sm">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search projects by name, industry, or service..."
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#5025d1]"
                    />
                    {query && (
                      <button
                        onClick={() => setQuery("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>

                  {/* Main Category Filters */}
                  <div className="mt-6">
                    <div className="mb-3 text-sm font-semibold text-white">Categories</div>
                    <div className="flex flex-wrap gap-3">
                      {mainTabs.map((tab) => (
                        <FilterChip
                          key={tab.key}
                          active={mainTab === tab.key}
                          onClick={() => {
                            setMainTab(tab.key);
                            setSubFilter("all");
                          }}
                          icon={tab.icon}
                          label={tab.label}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Web Sub-filters */}
                  {mainTab === "web" && (
                    <div className="mt-6 border-t border-white/10 pt-6">
                      <div className="mb-3 text-sm font-semibold text-white">Web Projects</div>
                      <div className="flex flex-wrap gap-3">
                        {webSubFilters.map((filter) => (
                          <FilterChip
                            key={filter.key}
                            active={subFilter === filter.key}
                            onClick={() => setSubFilter(filter.key)}
                            icon={filter.icon}
                            label={filter.label}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Salesforce Sub-filters */}
                  {mainTab === "salesforce" && (
                    <div className="mt-6 border-t border-white/10 pt-6">
                      <div className="mb-3 text-sm font-semibold text-white">Salesforce Projects</div>
                      <div className="flex flex-wrap gap-3">
                        {salesforceSubFilters.map((filter) => (
                          <FilterChip
                            key={filter.key}
                            active={subFilter === filter.key}
                            onClick={() => setSubFilter(filter.key)}
                            icon={filter.icon}
                            label={filter.label}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </Container>
        </section>

        {/* ==================== PROJECTS GRID ==================== */}
        <section className="relative z-10 pt-24 pb-16 sm:py-24">
          <Container>
            {filtered.length > 0 ? (
              <>
                <div className="mb-8 flex items-center justify-between">
                  <p className="text-zinc-400">
                    Showing <span className="font-semibold text-white">{filtered.length}</span> {filtered.length === 1 ? "project" : "projects"}
                  </p>
                  {(mainTab !== "all" || subFilter !== "all" || query) && (
                    <button
                      onClick={() => {
                        setQuery("");
                        setMainTab("all");
                        setSubFilter("all");
                      }}
                      className="text-sm text-[#5025d1] hover:text-purple-400 transition-colors"
                    >
                      Clear filters
                    </button>
                  )}
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  {filtered.map((project, index) => (
                    <ProjectCard key={project.key} project={project} delay={index * 0.1} />
                  ))}
                </div>
              </>
            ) : (
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={reduced ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-12 text-center backdrop-blur-sm"
              >
                <Search className="mx-auto h-16 w-16 text-zinc-600" />
                <h3 className="mt-6 text-2xl font-bold text-white">No projects found</h3>
                <p className="mt-3 text-zinc-400">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setQuery("");
                    setMainTab("all");
                    setSubFilter("all");
                  }}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5025d1] to-purple-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105"
                >
                  Clear all filters
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            )}
          </Container>
        </section>

        {/* ==================== CTA SECTION ==================== */}
        <section className="py-16 sm:py-24">
          <Container>
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={reduced ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#5025d1]/20 to-purple-600/20 p-12 backdrop-blur-sm sm:p-16"
            >
              <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#5025d1]/30 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-600/30 blur-3xl" />

              <div className="relative mx-auto max-w-3xl text-center">
                <h2 className="text-4xl font-bold text-white sm:text-5xl">
                  Ready to Start Your Project?
                </h2>
                <p className="mt-6 text-xl text-zinc-300">
                  Let's create something amazing together. Get in touch and let's discuss how we can help your business grow.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-[#5025d1] shadow-lg transition-all hover:scale-105"
                  >
                    Get Started Now
                    <ArrowRight className="h-5 w-5" />
                  </Link>

                  <Link
                    to="/services"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
                  >
                    View Services
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>
      </div>
    </>
  );
}