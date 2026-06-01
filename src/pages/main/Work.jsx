import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, useScroll, useInView } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  Calculator,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Code2,
  CreditCard,
  Database,
  Globe,
  Home,
  LayoutGrid,
  LineChart,
  Megaphone,
  Package,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Target,
  Ticket,
  Truck,
  Users,
  Wallet,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import SeoContentFaq from "../../components/SeoContentFaq";
import SubpageVisualLayer from "../../components/SubpageVisualLayer";
import Container from "../../components/Container";

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

function Reveal({ children, delay = 0, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ target, suffix, reduced }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || reduced) { setCount(target); return; }
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 1800 / steps);
    return () => clearInterval(timer);
  }, [inView, target, reduced]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function FilterChip({ active, onClick, icon: Icon, label }) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={reduced ? {} : { scale: 1.04 }}
      whileTap={reduced ? {} : { scale: 0.96 }}
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all",
        active
          ? "border-[#5025d1] bg-gradient-to-r from-[#5025d1] to-purple-600 text-white shadow-md shadow-[#5025d1]/30"
          : "border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
      )}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {label}
    </motion.button>
  );
}

function ProjectCard({ project, delay = 0 }) {
  const reduced = usePrefersReducedMotion();
  const Icon = project.icon;

  return (
    <Reveal delay={delay}>
      <Link to={project.href} className="group block h-full">
        <div className="relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111118] transition-all duration-300 hover:border-white/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#5025d1]/10">
          {/* Image */}
          {project.image && (
            <div className="relative h-48 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111118]/90 via-[#111118]/20 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-[#1c1a3a]/90 backdrop-blur-sm"
                  style={{ boxShadow: "0 0 14px rgba(80,37,209,0.35)" }}
                >
                  <Icon className="h-4 w-4 text-[#a78bfa]" />
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            <div className="mb-1 text-xs font-medium text-[#a78bfa]">{project.industry}</div>
            <h3 className="mb-2 text-base font-bold text-white leading-snug group-hover:text-[#a78bfa] transition-colors">
              {project.title}
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed line-clamp-3">{project.summary}</p>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {(project.tags || []).slice(0, 3).map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] text-zinc-400">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-[#5025d1] group-hover:text-[#a78bfa] transition-colors">
              View Case Study
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

/* ==================== FEATURED CASE STUDY CARD ==================== */

function FeaturedCard({ project, reversed = false }) {
  const Icon = project.icon;
  return (
    <Reveal>
      <div className={cx(
        "grid gap-0 overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0f0f17]",
        "lg:grid-cols-2"
      )}>
        {/* Image */}
        <div className={cx("relative min-h-[280px] overflow-hidden", reversed && "lg:order-last")}>
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className={cx(
            "absolute inset-0",
            reversed
              ? "bg-gradient-to-l from-transparent to-[#0f0f17] hidden lg:block"
              : "bg-gradient-to-r from-transparent to-[#0f0f17] hidden lg:block"
          )} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f17]/80 via-transparent to-transparent lg:hidden" />
          {/* Industry badge on image */}
          <div className="absolute top-4 left-4">
            <span className="rounded-full border border-white/20 bg-[#09090e]/80 backdrop-blur-sm px-3 py-1.5 text-[10px] font-medium text-zinc-300">
              {project.industry}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className={cx("flex flex-col justify-center p-8 lg:p-10", reversed && "lg:pr-4")}>
          <div
            className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#1c1a3a]"
            style={{ boxShadow: "0 0 20px rgba(80,37,209,0.35)" }}
          >
            <Icon className="h-5 w-5 text-[#a78bfa]" />
          </div>
          <h3 className="mb-3 text-xl font-extrabold text-white leading-snug">{project.title}</h3>
          <p className="mb-6 text-sm text-zinc-400 leading-relaxed">{project.summary}</p>

          {/* Key results */}
          {project.stats?.length > 0 && (
            <div className="mb-6 grid grid-cols-3 gap-3">
              {project.stats.slice(0, 3).map((s, i) => {
                const SIcon = s.icon;
                return (
                  <div key={i} className="rounded-xl border border-white/[0.07] bg-white/5 p-3 text-center">
                    <div className="text-sm font-bold text-white">{s.value}</div>
                    <div className="mt-0.5 text-[10px] text-zinc-500">{s.label}</div>
                  </div>
                );
              })}
            </div>
          )}

          <Link
            to={project.href}
            className="inline-flex items-center gap-2 self-start rounded-xl bg-gradient-to-r from-[#5025d1] to-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-[#5025d1]/30 hover:scale-105"
          >
            View Case Study
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

/* ==================== PROJECT CATEGORIES ==================== */

const CATEGORIES = {
  SALESFORCE: "salesforce",
  WEB: "web",
  MARKETING: "marketing",
  CUSTOM_WEB_APPS: "custom-web-apps",
};

const SUB_CATEGORIES = {
  SALES_CLOUD: "sales-cloud",
  SERVICE_CLOUD: "service-cloud",
  EXPERIENCE_CLOUD: "experience-cloud",
  ECOMMERCE: "ecommerce",
  PLATFORMS: "platforms",
  PORTALS: "portals",
  BRAND_BUILDING: "brand-building",
  DIGITAL_MARKETING: "digital-marketing",
  SOCIAL_MEDIA: "social-media",
};

const PROJECTS = [
  {
    key: "salesforce-duplicate-check",
    title: "Duplicate Check & Data Validation",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    icon: Cloud,
    industry: "Salesforce • Data Quality • CRM",
    tags: ["Salesforce", "Data Validation", "Automation"],
    category: CATEGORIES.SALESFORCE,
    subCategories: [SUB_CATEGORIES.SALES_CLOUD, SUB_CATEGORIES.SERVICE_CLOUD],
    summary:
      "Built Salesforce components that prevent and identify duplicate records while validating entries before record creation and updates. Result: cleaner CRM data, fewer operational issues, and more reliable reporting.",
    scope: ["Duplicate prevention rules", "Pre-save validation logic", "Match rule configuration", "User warning systems", "Admin-friendly tuning"],
    highlights: ["Reduced duplicate records", "Cleaner CRM data", "Improved reporting accuracy", "Reusable components"],
    stats: [
      { icon: ShieldCheck, label: "Data Quality", value: "Cleaner records" },
      { icon: Target, label: "Validation", value: "Pre-save gates" },
      { icon: Users, label: "Teams", value: "Sales + Service" },
    ],
    platforms: [{ label: "Sales Cloud", icon: Cloud }, { label: "Service Cloud", icon: Globe }],
    href: "/case-study/salesforce-duplicate-check",
  },
  {
    key: "salesforce-experience-cloud-government",
    title: "Customer Portal for Environmental Issue Reporting",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    icon: Globe,
    industry: "Salesforce • Experience Cloud • Government Cloud",
    tags: ["Salesforce", "Experience Cloud", "Custom Development", "Automation"],
    category: CATEGORIES.SALESFORCE,
    subCategories: [SUB_CATEGORIES.EXPERIENCE_CLOUD, SUB_CATEGORIES.SERVICE_CLOUD],
    summary:
      "Developed a user-friendly customer portal on Salesforce Experience Cloud (Government Cloud context) to help citizens report environmental concerns, manage property details, process service payments, and track request status in real-time — improving transparency and trust.",
    scope: ["Complaint management", "Request tracking", "Payments integration", "Property management", "Security & access control", "Lightning UI"],
    highlights: ["Guided complaint submission", "Real-time status updates", "Secure payment flow", "Property profiles", "Better transparency"],
    stats: [
      { icon: Ticket, label: "Complaints", value: "Managed" },
      { icon: CreditCard, label: "Payments", value: "Integrated" },
      { icon: Home, label: "Properties", value: "Tracked" },
    ],
    platforms: [{ label: "Experience Cloud", icon: Globe }, { label: "Government Cloud", icon: ShieldCheck }],
    href: "/case-study/salesforce-experience-cloud-government-cloud",
  },
  {
    key: "salesforce-service-cloud-implementation",
    title: "Service Cloud Case Management + Property Data Automation",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
    icon: Cloud,
    industry: "Salesforce • Service Cloud • LWC • Automation",
    tags: ["Salesforce", "Service Cloud", "LWC", "Automation"],
    category: CATEGORIES.SALESFORCE,
    subCategories: [SUB_CATEGORIES.SERVICE_CLOUD, SUB_CATEGORIES.SALES_CLOUD, SUB_CATEGORIES.EXPERIENCE_CLOUD],
    summary:
      "Developed a Salesforce Lightning Web Components application using Sales Cloud and Experience Cloud, integrated with an automation engine that uses real-time property data to generate qualified Leads or Potential Buyers. Agents can track opportunities through intuitive dashboards, role-based access, and seamless integration with external property listing systems.",
    scope: ["Case management", "Lead generation", "Automation engine", "LWC app", "Real-time property data", "Role-based access"],
    highlights: ["Qualified lead generation", "Real-time property data", "LWC components", "Role-based access", "Agent dashboards"],
    stats: [
      { icon: Zap, label: "Core", value: "Case Mgmt" },
      { icon: Target, label: "Automation", value: "Qualified Leads" },
      { icon: LayoutGrid, label: "Agents", value: "Dashboards" },
    ],
    platforms: [{ label: "Service Cloud", icon: Cloud }, { label: "Sales Cloud", icon: Cloud }, { label: "Experience Cloud", icon: Globe }],
    href: "/case-study/salesforce-service-cloud-implementation",
  },
  {
    key: "letting-agency-portal",
    title: "MHG Portal — Custom Letting Agency App",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    icon: Building2,
    industry: "Custom Web App • Next.js 14 • PostgreSQL • Real Estate",
    tags: ["Custom Web App", "Next.js 14", "PostgreSQL", "Role-Based", "SIP Dialer"],
    category: CATEGORIES.CUSTOM_WEB_APPS,
    subCategories: [SUB_CATEGORIES.PORTALS],
    summary:
      "Bespoke letting agency platform for More Homes Group built on Next.js 14, TypeScript, Prisma ORM, and PostgreSQL. Features a two-tier Admin/Agent system, embedded SIP dialer (LINKUS), intercalling, call recordings, team chat, OTP login, audit logs, and a revenue & performance dashboard.",
    scope: ["Admin Control Center & team management", "Agent Workspace with property pipeline", "SIP Dialer Suite", "Team Communication (embedded chat)", "Revenue & Performance dashboard", "OTP-protected login"],
    highlights: ["5 fully-featured modules", "Admin + Agent two-tier roles", "SIP.js / LINKUS dialer integration", "OTP auth with audit logging"],
    stats: [
      { icon: LayoutGrid, label: "Modules", value: "5 built" },
      { icon: Users, label: "Roles", value: "Admin + Agent" },
      { icon: ShieldCheck, label: "Security", value: "OTP + Audit" },
    ],
    platforms: [{ label: "Next.js 14", icon: Code2 }, { label: "PostgreSQL", icon: Database }, { label: "SIP.js Dialer", icon: Globe }],
    href: "/case-study/letting-agency-portal",
  },
  {
    key: "shencoin",
    title: "ShenCoin — Solana Crypto Platform",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
    icon: Wallet,
    industry: "Custom Web App • React + Vite • Express.js • Solana",
    tags: ["React", "Vite", "Express.js", "Prisma", "PostgreSQL", "Solana", "Crypto"],
    category: CATEGORIES.CUSTOM_WEB_APPS,
    subCategories: [SUB_CATEGORIES.PORTALS],
    summary:
      "Full-stack crypto platform connecting a React + Vite SPA to an Express.js REST API backed by Prisma ORM and Neon Serverless PostgreSQL. Solana wallet payments via Phantom and Solflare deep links — users sign on-chain, submit the TX hash to the API, and admins verify on-chain before crediting wallet balances.",
    scope: ["React + Vite SPA with wallet detection", "Phantom & Solflare deep link / in-app browser", "On-chain transaction signing (Solana)", "Express.js REST API with JWT admin routes"],
    highlights: ["React + Vite frontend SPA", "Phantom & Solflare wallet support", "On-chain TX signing & hash submission", "Admin on-chain TX verification"],
    stats: [
      { icon: Globe, label: "Frontend", value: "React + Vite" },
      { icon: Database, label: "Database", value: "Neon PG" },
      { icon: Wallet, label: "Wallets", value: "Phantom + Solflare" },
    ],
    platforms: [{ label: "React + Vite", icon: Globe }, { label: "Express.js", icon: Code2 }, { label: "Solana", icon: Wallet }],
    href: "/case-study/shencoin",
  },
  {
    key: "inhomes-direct",
    title: "InHomes Direct — E-commerce with Custom Calculators",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    icon: ShoppingCart,
    industry: "E-commerce • Custom Development • Shopify",
    tags: ["E-commerce", "Custom Development", "Calculators"],
    category: CATEGORIES.WEB,
    subCategories: [SUB_CATEGORIES.ECOMMERCE],
    summary:
      "Built a logic-driven storefront for flooring, worktops and home interiors with custom calculators for area-to-pack conversion, real-time pricing, and survey-based estimates — all without paid apps.",
    scope: ["Custom calculators", "Product logic", "Real-time pricing", "Survey forms", "Category policies"],
    highlights: ["Area → packs conversion", "Real-time pricing", "Survey-based estimates", "No paid apps"],
    stats: [
      { icon: Calculator, label: "Calculators", value: "Custom built" },
      { icon: Package, label: "Pack logic", value: "Auto-round up" },
      { icon: Truck, label: "Policies", value: "By category" },
    ],
    platforms: [{ label: "Shopify", icon: ShoppingCart }],
    href: "/case-study/inhomes-direct",
  },
  {
    key: "esahulat-mart",
    title: "ESahulat Mart — E-commerce Platform",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    icon: ShoppingCart,
    industry: "E-commerce • Retail • Web Development",
    tags: ["E-commerce", "Web Development", "Retail"],
    category: CATEGORIES.WEB,
    subCategories: [SUB_CATEGORIES.ECOMMERCE],
    summary:
      "Developed a modern e-commerce platform for ESahulat Mart, featuring product catalog, shopping cart, payment integration, and order management system.",
    scope: ["Product catalog", "Shopping cart", "Payment integration", "Order management", "Inventory tracking"],
    highlights: ["Modern storefront", "Secure payments", "Order management", "Inventory tracking"],
    stats: [
      { icon: ShoppingCart, label: "Products", value: "Listed" },
      { icon: CreditCard, label: "Payments", value: "Integrated" },
      { icon: Package, label: "Orders", value: "Managed" },
    ],
    platforms: [{ label: "E-commerce", icon: ShoppingCart }],
    href: "/case-study/esahulat-mart",
  },
  {
    key: "more-homes-group",
    title: "More Homes Group — Property Management Platform",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
    icon: Building2,
    industry: "Real Estate • Property Management • Web Development",
    tags: ["Web Development", "Property Management", "Business Sites"],
    category: CATEGORIES.WEB,
    subCategories: [SUB_CATEGORIES.PLATFORMS],
    summary:
      "Developed a comprehensive property management platform for More Homes Group, featuring property listings, tenant management, maintenance tracking, and financial reporting.",
    scope: ["Property listings", "Tenant management", "Maintenance tracking", "Financial reporting", "Admin dashboard"],
    highlights: ["Streamlined operations", "Better tenant experience", "Real-time tracking", "Comprehensive reporting"],
    stats: [
      { icon: Building2, label: "Properties", value: "Managed" },
      { icon: Users, label: "Tenants", value: "Tracked" },
      { icon: BarChart3, label: "Reports", value: "Automated" },
    ],
    platforms: [{ label: "Web App", icon: Code2 }],
    href: "/case-study/more-homes-group",
  },
  {
    key: "multidatum",
    title: "Multidatum — Data Analytics Platform",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    icon: Database,
    industry: "Data Analytics • Business Intelligence • Web Development",
    tags: ["Web Development", "Data Analytics", "Business Intelligence"],
    category: CATEGORIES.WEB,
    subCategories: [SUB_CATEGORIES.PLATFORMS],
    summary:
      "Built a comprehensive data analytics platform for Multidatum, featuring advanced data visualization, real-time reporting, and business intelligence dashboards.",
    scope: ["Data visualization", "Real-time reporting", "Business intelligence", "Dashboard development", "Data integration"],
    highlights: ["Advanced analytics", "Real-time insights", "Interactive dashboards", "Data integration"],
    stats: [
      { icon: Database, label: "Data", value: "Analyzed" },
      { icon: BarChart3, label: "Reports", value: "Automated" },
      { icon: Target, label: "Insights", value: "Real-time" },
    ],
    platforms: [{ label: "Web App", icon: Code2 }, { label: "Analytics", icon: BarChart3 }],
    href: "/case-study/multidatum",
  },
  {
    key: "hikmabiotics",
    title: "Hikmabiotics — Healthcare Platform",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
    icon: ShieldCheck,
    industry: "Healthcare • Web Development • Medical",
    tags: ["Web Development", "Healthcare", "Medical"],
    category: CATEGORIES.WEB,
    subCategories: [SUB_CATEGORIES.PLATFORMS],
    summary:
      "Built a comprehensive healthcare platform for Hikmabiotics, featuring patient management, appointment scheduling, medical records, and telemedicine capabilities.",
    scope: ["Patient management", "Appointment scheduling", "Medical records", "Telemedicine", "Admin dashboard"],
    highlights: ["Patient management", "Appointment system", "Medical records", "Telemedicine ready"],
    stats: [
      { icon: Users, label: "Patients", value: "Managed" },
      { icon: Calendar, label: "Appointments", value: "Scheduled" },
      { icon: ShieldCheck, label: "Records", value: "Secured" },
    ],
    platforms: [{ label: "Healthcare", icon: ShieldCheck }],
    href: "/case-study/hikmabiotics",
  },
  {
    key: "ekommart",
    title: "Ekommart — Complete Brand & Marketing Transformation",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    icon: Sparkles,
    industry: "E-commerce • Brand Building • Digital Marketing",
    tags: ["Brand Building", "Digital Marketing", "E-commerce", "Social Media"],
    category: CATEGORIES.MARKETING,
    subCategories: [SUB_CATEGORIES.BRAND_BUILDING, SUB_CATEGORIES.DIGITAL_MARKETING, SUB_CATEGORIES.SOCIAL_MEDIA],
    summary:
      "Complete transformation for Ekommart including brand identity, WordPress store development, social media presence, and performance marketing campaigns that generated thousands of purchases.",
    scope: ["Brand identity", "WordPress store", "Social media", "Performance marketing", "Content creation"],
    highlights: ["Brand built from scratch", "E-commerce store launched", "Social media presence", "Performance campaigns"],
    stats: [
      { icon: ShoppingCart, label: "Purchases", value: "3,300+" },
      { icon: Target, label: "CPA", value: "164 PKR" },
      { icon: Megaphone, label: "Campaigns", value: "5 Months" },
    ],
    platforms: [{ label: "WordPress", icon: Code2 }, { label: "Meta Ads", icon: Target }],
    href: "/case-study/ekommart",
  },
  {
    key: "halla-gulla",
    title: "Halla Gulla — Brand Identity & Digital Presence",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80",
    icon: Sparkles,
    industry: "Brand Building • Digital Marketing • Branding",
    tags: ["Brand Building", "Digital Marketing", "Branding", "Social Media"],
    category: CATEGORIES.MARKETING,
    subCategories: [SUB_CATEGORIES.BRAND_BUILDING, SUB_CATEGORIES.DIGITAL_MARKETING, SUB_CATEGORIES.SOCIAL_MEDIA],
    summary:
      "Complete brand transformation for Halla Gulla including logo design, brand guidelines, website development, and comprehensive digital marketing strategy.",
    scope: ["Brand identity", "Logo design", "Website development", "Digital marketing", "Social media setup"],
    highlights: ["Complete brand overhaul", "Modern website", "Social media presence", "Marketing strategy"],
    stats: [
      { icon: Sparkles, label: "Brand", value: "Transformed" },
      { icon: Globe, label: "Website", value: "Launched" },
      { icon: Megaphone, label: "Marketing", value: "Implemented" },
    ],
    platforms: [{ label: "WordPress", icon: Code2 }, { label: "Social Media", icon: Users }],
    href: "/case-study/halla-gulla",
  },
  {
    key: "united-muslim-travels",
    title: "United Muslim Travels — Brand Build & Marketing",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
    icon: Sparkles,
    industry: "Travel • Brand Building • Digital Marketing",
    tags: ["Brand Building", "Digital Marketing", "Travel", "Social Media"],
    category: CATEGORIES.MARKETING,
    subCategories: [SUB_CATEGORIES.BRAND_BUILDING, SUB_CATEGORIES.DIGITAL_MARKETING, SUB_CATEGORIES.SOCIAL_MEDIA],
    summary:
      "Comprehensive brand building and digital marketing campaign for United Muslim Travels, including brand identity, website development, and performance marketing.",
    scope: ["Brand identity", "Website development", "Digital marketing", "Social media", "Content creation"],
    highlights: ["Brand identity created", "Website launched", "Marketing campaigns", "Social presence built"],
    stats: [
      { icon: Sparkles, label: "Brand", value: "Built" },
      { icon: Globe, label: "Website", value: "Developed" },
      { icon: Target, label: "Marketing", value: "Executed" },
    ],
    platforms: [{ label: "WordPress", icon: Code2 }, { label: "Meta Ads", icon: Target }],
    href: "/case-studies/united-muslim-travels-brand-build",
  },
];

const FEATURED_KEYS = ["ekommart", "letting-agency-portal", "salesforce-experience-cloud-government"];
const FEATURED_PROJECTS = FEATURED_KEYS.map((k) => PROJECTS.find((p) => p.key === k)).filter(Boolean);

const WORK_STATS = [
  { value: 50, suffix: "+", label: "Projects Completed" },
  { value: 40, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "+", label: "Industries Served" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

const seoContent = {
  kicker: "Our Work",
  title: "Case Studies in Salesforce, E-commerce, and Growth Marketing",
  subtitle: "Explore real outcomes from Salesforce implementation, Experience Cloud portal development, and performance-optimized ecommerce builds.",
  paragraphs: [
    "Our portfolio highlights CRM automation, LWC development services, and high-converting Shopify and WooCommerce stores.",
    "We also showcase performance marketing wins such as Meta Ads ROAS optimization and lead generation for real estate brands.",
  ],
  bullets: [
    "Salesforce automation experts and data cleanup workflows",
    "Experience Cloud portals and LWC component builds",
    "Shopify custom theme development and CRO upgrades",
    "Meta Ads strategies that lower CPA and scale revenue",
  ],
};

const seoFaqs = [
  { q: "Do you have Salesforce Experience Cloud case studies?", a: "Yes. We have Experience Cloud and Service Cloud implementations focused on automation, portals, and data accuracy." },
  { q: "Can I see ecommerce performance results?", a: "Yes. Our case studies include fast-loading Shopify builds and Meta Ads performance improvements." },
  { q: "Do you share ad performance metrics?", a: "Where allowed, we show ROAS, CPA, and conversion growth with transparent timelines." },
  { q: "Can you build a similar solution for my business?", a: "Absolutely. We tailor Salesforce, ecommerce, and marketing strategies to your industry and goals." },
];

/* ==================== PAGE ==================== */

export default function WorkPage() {
  const reduced = usePrefersReducedMotion();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [mainTab, setMainTab] = useState("all");
  const [subFilter, setSubFilter] = useState("all");

  useEffect(() => {
    const filterParam = searchParams.get("filter");
    if (!filterParam) return;
    if (filterParam === "salesforce") { setMainTab(CATEGORIES.SALESFORCE); setSubFilter("all"); }
    else if (filterParam === "web") { setMainTab(CATEGORIES.WEB); setSubFilter("all"); }
    else if (["custom-web-apps", "custom-apps", "portals"].includes(filterParam)) { setMainTab(CATEGORIES.CUSTOM_WEB_APPS); setSubFilter("all"); }
    else if (["marketing", "branding", "brand-build"].includes(filterParam)) { setMainTab(CATEGORIES.MARKETING); setSubFilter("all"); }
    else if (filterParam === "sales-cloud") { setMainTab(CATEGORIES.SALESFORCE); setSubFilter(SUB_CATEGORIES.SALES_CLOUD); }
    else if (filterParam === "service-cloud") { setMainTab(CATEGORIES.SALESFORCE); setSubFilter(SUB_CATEGORIES.SERVICE_CLOUD); }
    else if (filterParam === "experience-cloud") { setMainTab(CATEGORIES.SALESFORCE); setSubFilter(SUB_CATEGORIES.EXPERIENCE_CLOUD); }
    else if (["ecommerce", "e-commerce"].includes(filterParam)) { setMainTab(CATEGORIES.WEB); setSubFilter(SUB_CATEGORIES.ECOMMERCE); }
    else if (filterParam === "platforms") { setMainTab(CATEGORIES.WEB); setSubFilter(SUB_CATEGORIES.PLATFORMS); }
    else if (["social", "social-media"].includes(filterParam)) { setMainTab(CATEGORIES.MARKETING); setSubFilter(SUB_CATEGORIES.SOCIAL_MEDIA); }
    else if (filterParam === "digital-marketing") { setMainTab(CATEGORIES.MARKETING); setSubFilter(SUB_CATEGORIES.DIGITAL_MARKETING); }
    else if (filterParam === "brand-building") { setMainTab(CATEGORIES.MARKETING); setSubFilter(SUB_CATEGORIES.BRAND_BUILDING); }
  }, [searchParams]);

  const mainTabs = [
    { key: "all", label: "All Projects", icon: LayoutGrid },
    { key: CATEGORIES.SALESFORCE, label: "Salesforce", icon: Cloud },
    { key: CATEGORIES.WEB, label: "Web Dev", icon: Code2 },
    { key: CATEGORIES.CUSTOM_WEB_APPS, label: "Custom Apps", icon: Database },
    { key: CATEGORIES.MARKETING, label: "Marketing", icon: Megaphone },
  ];

  const salesforceSubFilters = [
    { key: "all", label: "All Salesforce", icon: Cloud },
    { key: SUB_CATEGORIES.SALES_CLOUD, label: "Sales Cloud", icon: Cloud },
    { key: SUB_CATEGORIES.SERVICE_CLOUD, label: "Service Cloud", icon: Workflow },
    { key: SUB_CATEGORIES.EXPERIENCE_CLOUD, label: "Experience Cloud", icon: Globe },
  ];
  const webSubFilters = [
    { key: "all", label: "All Web", icon: LayoutGrid },
    { key: SUB_CATEGORIES.ECOMMERCE, label: "E-commerce", icon: ShoppingCart },
    { key: SUB_CATEGORIES.PLATFORMS, label: "Platforms", icon: Database },
  ];
  const customWebAppsSubFilters = [
    { key: "all", label: "All Apps", icon: Database },
    { key: SUB_CATEGORIES.PORTALS, label: "Portals", icon: LayoutGrid },
  ];
  const marketingSubFilters = [
    { key: "all", label: "All Marketing", icon: Megaphone },
    { key: SUB_CATEGORIES.BRAND_BUILDING, label: "Brand Building", icon: Sparkles },
    { key: SUB_CATEGORIES.DIGITAL_MARKETING, label: "Digital Marketing", icon: Target },
    { key: SUB_CATEGORIES.SOCIAL_MEDIA, label: "Social Media", icon: Users },
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      if (q) {
        const text = [p.title, p.industry, p.summary, ...(p.tags || [])].join(" ").toLowerCase();
        if (!text.includes(q)) return false;
      }
      if (mainTab !== "all" && p.category !== mainTab) return false;
      if (subFilter !== "all" && !(p.subCategories || []).includes(subFilter)) return false;
      return true;
    });
  }, [query, mainTab, subFilter]);

  const activeSubFilters =
    mainTab === CATEGORIES.SALESFORCE ? salesforceSubFilters
    : mainTab === CATEGORIES.WEB ? webSubFilters
    : mainTab === CATEGORIES.CUSTOM_WEB_APPS ? customWebAppsSubFilters
    : mainTab === CATEGORIES.MARKETING ? marketingSubFilters
    : null;

  return (
    <>
      <Helmet>
        <title>Our Work & Case Studies | IT Meta Solutions</title>
        <meta name="description" content="Portfolio of Salesforce implementation, Experience Cloud, Shopify builds, and performance marketing case studies." />
        <link rel="canonical" href="https://itmetasolutions.com/work" />
      </Helmet>

      <div className="itms-subpage min-h-screen bg-[#09090e] text-white">
        <SubpageVisualLayer />
        {!reduced && <ScrollProgress />}

        {/* ==================== HERO ==================== */}
        <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
          <div className="absolute inset-0 -z-10">
            <img
              src="https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=1800&q=80"
              alt=""
              className="h-full w-full object-cover opacity-15"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#09090e]/60 via-[#09090e]/70 to-[#09090e]" />
          </div>
          <div className="pointer-events-none absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full bg-[#5025d1]/20 blur-[120px] -z-10" />

          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={reduced ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#5025d1]/40 bg-[#5025d1]/10 px-4 py-2 text-sm font-medium text-[#a78bfa]"
              >
                <Sparkles className="h-4 w-4" />
                Our Portfolio
              </motion.div>

              <motion.h1
                initial={reduced ? false : { opacity: 0, y: 24 }}
                animate={reduced ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Real Projects,
                <br />
                <span className="animated-gradient-text">Real Results</span>
              </motion.h1>

              <motion.p
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={reduced ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 text-lg text-zinc-400 sm:text-xl max-w-2xl mx-auto"
              >
                Explore case studies across Salesforce, web development, digital marketing, and brand building — each one a story of measurable growth.
              </motion.p>
            </div>
          </Container>
        </section>

        {/* ==================== SUCCESS METRICS ==================== */}
        <section className="py-14 bg-[#0b0b14]">
          <Container>
            <div className="relative rounded-3xl border border-white/[0.07] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#5025d1]/10 via-transparent to-[#ba55d3]/5" />
              <div className="relative grid grid-cols-2 divide-x divide-y divide-white/[0.06] lg:grid-cols-4 lg:divide-y-0">
                {WORK_STATS.map((stat, i) => (
                  <Reveal key={stat.label} delay={i * 0.1}>
                    <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
                      <div className="text-4xl font-black text-white mb-1.5">
                        <CountUp target={stat.value} suffix={stat.suffix} reduced={reduced} />
                      </div>
                      <p className="text-sm text-zinc-500">{stat.label}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ==================== FEATURED CASE STUDIES ==================== */}
        <section className="py-20 sm:py-28">
          <Container>
            <Reveal className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#a78bfa] mb-3">Featured Work</p>
              <h2 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">Highlighted Case Studies</h2>
              <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
                In-depth looks at some of our most impactful projects.
              </p>
            </Reveal>

            <div className="space-y-8">
              {FEATURED_PROJECTS.map((p, i) => (
                <FeaturedCard key={p.key} project={p} reversed={i % 2 === 1} />
              ))}
            </div>
          </Container>
        </section>

        {/* ==================== ALL PROJECTS ==================== */}
        <section className="py-20 sm:py-24 bg-[#0b0b14]">
          <Container>
            <Reveal className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#a78bfa] mb-3">Full Portfolio</p>
              <h2 className="text-3xl font-extrabold sm:text-4xl">All Projects</h2>
            </Reveal>

            {/* Filters */}
            <div className="mb-10 rounded-2xl border border-white/[0.07] bg-[#111118] p-6">
              {/* Search */}
              <div className="relative mb-5">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#5025d1]/50"
                />
                {query && (
                  <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Main tabs */}
              <div className="flex flex-wrap gap-2 mb-4">
                {mainTabs.map((tab) => (
                  <FilterChip
                    key={tab.key}
                    active={mainTab === tab.key}
                    onClick={() => { setMainTab(tab.key); setSubFilter("all"); }}
                    icon={tab.icon}
                    label={tab.label}
                  />
                ))}
              </div>

              {/* Sub-filters */}
              {activeSubFilters && (
                <div className="flex flex-wrap gap-2 border-t border-white/[0.06] pt-4">
                  {activeSubFilters.map((f) => (
                    <FilterChip key={f.key} active={subFilter === f.key} onClick={() => setSubFilter(f.key)} icon={f.icon} label={f.label} />
                  ))}
                </div>
              )}
            </div>

            {/* Results header */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-zinc-500">
                Showing <span className="text-white font-medium">{filtered.length}</span> {filtered.length === 1 ? "project" : "projects"}
              </p>
              {(mainTab !== "all" || subFilter !== "all" || query) && (
                <button
                  onClick={() => { setQuery(""); setMainTab("all"); setSubFilter("all"); }}
                  className="text-xs text-[#a78bfa] hover:text-white transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((project, i) => (
                  <ProjectCard key={project.key} project={project} delay={i * 0.05} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/[0.07] bg-[#111118] p-16 text-center">
                <Search className="mx-auto h-12 w-12 text-zinc-700 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">No projects found</h3>
                <p className="text-sm text-zinc-500 mb-6">Try adjusting your search or filters.</p>
                <button
                  onClick={() => { setQuery(""); setMainTab("all"); setSubFilter("all"); }}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#5025d1] to-purple-600 px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Clear filters <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </Container>
        </section>

        <SeoContentFaq content={seoContent} faqs={seoFaqs} />

        {/* ==================== CTA ==================== */}
        <section className="py-20 sm:py-28">
          <Container>
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-white/10">
                <div className="absolute inset-0 -z-10">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80"
                    alt=""
                    className="h-full w-full object-cover opacity-15"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5025d1]/40 via-[#09090e]/80 to-[#ba55d3]/20" />
                </div>
                <div className="relative py-16 px-8 sm:py-20 sm:px-16 text-center">
                  <p className="text-sm font-semibold uppercase tracking-widest text-[#a78bfa] mb-4">Start Your Project</p>
                  <h2 className="text-3xl font-extrabold sm:text-4xl md:text-5xl text-white max-w-2xl mx-auto leading-tight">
                    Ready to Add Your Project to This List?
                  </h2>
                  <p className="mt-5 text-zinc-400 text-lg max-w-xl mx-auto">
                    Let's discuss your goals and build something you're proud to showcase.
                  </p>
                  <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-bold text-[#09090e] shadow-lg transition-all hover:scale-105"
                    >
                      Start a Project
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-white/10"
                    >
                      Our Services
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      </div>
    </>
  );
}
