import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  Calculator,
  Calendar,
  CheckCircle2,
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
      className={cx("pointer-events-none absolute z-0 blur-3xl", className)}
      style={{
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
      }}
    />
  );
}

function Badge({ children, icon: Icon }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </span>
  );
}

function StatBadge({ icon: Icon, value, label }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 sm:p-3 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div className="flex-shrink-0 rounded-lg bg-gradient-to-br from-[#5025d1] to-purple-600 p-1.5 sm:p-2">
          <Icon className="h-4 w-4 text-white" />
        </div>
        <div className="min-w-0">
          <div className="text-sm sm:text-base font-bold text-white truncate">{value}</div>
          <div className="text-[10px] sm:text-xs text-zinc-400">{label}</div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, delay = 0 }) {
  const reduced = usePrefersReducedMotion();
  const Icon = project.icon;

  return (
    <Link to={project.href} className="block h-full">
      <motion.div
        initial={reduced ? false : { y: 16 }}
        whileInView={reduced ? {} : { y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        whileHover={reduced ? {} : { y: -6, transition: { duration: 0.2 } }}
        className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm transition-all hover:border-[#5025d1]/50"
      >
        {/* Animated background glow */}
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-gradient-to-br from-[#5025d1]/20 to-purple-600/20 blur-3xl transition-all group-hover:scale-150" />

        <div className="relative flex h-full flex-col p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex-shrink-0 rounded-2xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-2.5 sm:p-3">
              <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-white">{project.title}</h3>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">{project.industry}</p>
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
          <div className="mt-6 flex-1 grid gap-4 sm:grid-cols-2 content-start">
            <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="mb-3 flex items-center gap-2">
                <Target className="h-4 w-4 text-[#5025d1]" />
                <span className="text-xs font-semibold text-white">Scope</span>
              </div>
              <ul className="flex-1 space-y-2">
                {project.scope.slice(0, 4).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-400" />
                <span className="text-xs font-semibold text-white">Highlights</span>
              </div>
              <ul className="flex-1 space-y-2">
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
        </div>
      </motion.div>
    </Link>
  );
}

/* ==================== PROJECT CATEGORIES ==================== */
// Category constants for proper filtering
const CATEGORIES = {
  SALESFORCE: "salesforce",
  WEB: "web",
  MARKETING: "marketing",
  CUSTOM_WEB_APPS: "custom-web-apps",
};

const SUB_CATEGORIES = {
  // Salesforce
  SALES_CLOUD: "sales-cloud",
  SERVICE_CLOUD: "service-cloud",
  EXPERIENCE_CLOUD: "experience-cloud",
  // Web
  ECOMMERCE: "ecommerce",
  PLATFORMS: "platforms",
  // Custom Web Apps
  PORTALS: "portals",
  // Marketing
  BRAND_BUILDING: "brand-building",
  DIGITAL_MARKETING: "digital-marketing",
  SOCIAL_MEDIA: "social-media",
};

const PROJECTS = [
  // ==================== SALESFORCE PROJECTS ====================
  {
    key: "salesforce-duplicate-check",
    title: "Duplicate Check & Data Validation",
    icon: Cloud,
    industry: "Salesforce • Data Quality • CRM",
    tags: ["Salesforce", "Data Validation", "Automation"],
    category: CATEGORIES.SALESFORCE,
    subCategories: [SUB_CATEGORIES.SALES_CLOUD, SUB_CATEGORIES.SERVICE_CLOUD],
    summary:
      "Built Salesforce components that prevent and identify duplicate records while validating entries before record creation and updates. Result: cleaner CRM data, fewer operational issues, and more reliable reporting.",
    scope: ["Duplicate prevention rules", "Pre-save validation logic", "Match rule configuration", "User warning systems", "Admin-friendly tuning"],
    highlights: [
      "Reduced duplicate records",
      "Cleaner CRM data",
      "Improved reporting accuracy",
      "Reusable components",
    ],
    stats: [
      { icon: ShieldCheck, label: "Data Quality", value: "Cleaner records" },
      { icon: Target, label: "Validation", value: "Pre-save gates" },
      { icon: Users, label: "Teams", value: "Sales + Service" },
    ],
    platforms: [
      { label: "Sales Cloud", icon: Cloud },
      { label: "Service Cloud", icon: Globe },
    ],
    href: "/case-study/salesforce-duplicate-check",
  },
  {
    key: "salesforce-experience-cloud-government",
    title: "Customer Portal for Environmental Issue Reporting",
    icon: Globe,
    industry: "Salesforce • Experience Cloud • Government Cloud",
    tags: ["Salesforce", "Experience Cloud", "Custom Development", "Automation"],
    category: CATEGORIES.SALESFORCE,
    subCategories: [SUB_CATEGORIES.EXPERIENCE_CLOUD, SUB_CATEGORIES.SERVICE_CLOUD],
    summary:
      "Developed a user-friendly customer portal on Salesforce Experience Cloud (Government Cloud context) to help citizens report environmental concerns, manage property details, process service payments, and track request status in real-time — improving transparency and trust.",
    scope: ["Complaint management", "Request tracking", "Payments integration", "Property management", "Security & access control", "Lightning UI", "CRM workflow-ready"],
    highlights: [
      "Guided complaint submission",
      "Real-time status updates",
      "Secure payment flow",
      "Property profiles",
      "Better transparency",
    ],
    stats: [
      { icon: Ticket, label: "Complaints", value: "Managed" },
      { icon: CreditCard, label: "Payments", value: "Integrated" },
      { icon: Home, label: "Properties", value: "Tracked" },
      { icon: LineChart, label: "Transparency", value: "Improved" },
    ],
    platforms: [
      { label: "Experience Cloud", icon: Globe },
      { label: "Government Cloud", icon: ShieldCheck },
    ],
    href: "/case-study/salesforce-experience-cloud-government-cloud",
  },
  {
    key: "salesforce-service-cloud-implementation",
    title: "Service Cloud Case Management + Property Data Automation",
    icon: Cloud,
    industry: "Salesforce • Service Cloud • LWC • Automation",
    tags: ["Salesforce", "Service Cloud", "LWC", "Automation"],
    category: CATEGORIES.SALESFORCE,
    subCategories: [SUB_CATEGORIES.SERVICE_CLOUD, SUB_CATEGORIES.SALES_CLOUD, SUB_CATEGORIES.EXPERIENCE_CLOUD],
    summary:
      "Developed a Salesforce Lightning Web Components application using Sales Cloud and Experience Cloud, integrated with an automation engine that uses real-time property data to generate qualified Leads or Potential Buyers. Agents can track opportunities through intuitive dashboards, role-based access, and seamless integration with external property listing systems.",
    scope: ["Case management", "Lead generation", "Automation engine", "LWC app", "Real-time property data", "Role-based access", "Agent dashboards", "External listings integration"],
    highlights: [
      "Qualified lead generation",
      "Real-time property data",
      "LWC components",
      "Role-based access",
      "Agent dashboards",
    ],
    stats: [
      { icon: Zap, label: "Core", value: "Case Mgmt" },
      { icon: Target, label: "Automation", value: "Qualified Leads" },
      { icon: LayoutGrid, label: "Agents", value: "Dashboards" },
    ],
    platforms: [
      { label: "Service Cloud", icon: Cloud },
      { label: "Sales Cloud", icon: Cloud },
      { label: "Experience Cloud", icon: Globe },
    ],
    href: "/case-study/salesforce-service-cloud-implementation",
  },

  {
    key: "letting-agency-portal",
    title: "MHG Portal — Custom Letting Agency App",
    icon: Building2,
    industry: "Custom Web App • Next.js 14 • PostgreSQL • Real Estate",
    tags: ["Custom Web App", "Next.js 14", "PostgreSQL", "Role-Based", "SIP Dialer"],
    category: CATEGORIES.CUSTOM_WEB_APPS,
    subCategories: [SUB_CATEGORIES.PORTALS],
    summary:
      "Bespoke letting agency platform for More Homes Group built on Next.js 14, TypeScript, Prisma ORM, and PostgreSQL. Features a two-tier Admin/Agent system, embedded SIP dialer (LINKUS), intercalling, call recordings, team chat, OTP login, audit logs, and a revenue & performance dashboard.",
    scope: [
      "Admin Control Center & team management",
      "Agent Workspace with property pipeline",
      "SIP Dialer Suite (dialpad, history, intercalling, notes, labels, recordings)",
      "Team Communication (embedded chat)",
      "Revenue & Performance dashboard",
      "OTP-protected login & rate limiting",
      "Platform-wide audit logs",
      "Next.js 14 + Prisma + PostgreSQL stack",
    ],
    highlights: [
      "5 fully-featured modules",
      "Admin + Agent two-tier roles",
      "SIP.js / LINKUS dialer integration",
      "OTP auth with audit logging",
      "Secure session management",
      "Deployed on Vercel / Docker",
    ],
    stats: [
      { icon: LayoutGrid, label: "Modules", value: "5 built" },
      { icon: Users, label: "Roles", value: "Admin + Agent" },
      { icon: ShieldCheck, label: "Security", value: "OTP + Audit" },
    ],
    platforms: [
      { label: "Next.js 14", icon: Code2 },
      { label: "PostgreSQL", icon: Database },
      { label: "SIP.js Dialer", icon: Globe },
    ],
    href: "/case-study/letting-agency-portal",
  },

  {
    key: "shencoin",
    title: "ShenCoin — Solana Crypto Platform",
    icon: Wallet,
    industry: "Custom Web App • React + Vite • Express.js • Solana",
    tags: ["React", "Vite", "Express.js", "Prisma", "PostgreSQL", "Solana", "Crypto"],
    category: CATEGORIES.CUSTOM_WEB_APPS,
    subCategories: [SUB_CATEGORIES.PORTALS],
    summary:
      "Full-stack crypto platform connecting a React + Vite SPA to an Express.js REST API backed by Prisma ORM and Neon Serverless PostgreSQL. Solana wallet payments via Phantom and Solflare deep links — users sign on-chain, submit the TX hash to the API, and admins verify on-chain before crediting wallet balances.",
    scope: [
      "React + Vite SPA with wallet detection",
      "Phantom & Solflare deep link / in-app browser",
      "On-chain transaction signing (Solana)",
      "Express.js REST API with JWT admin routes",
      "Prisma ORM + Neon serverless PostgreSQL",
      "TX hash verification via Solana RPC",
      "Admin panel: verify, approve, reject TX",
      "Wallet balance crediting and audit log",
    ],
    highlights: [
      "React + Vite frontend SPA",
      "Phantom & Solflare wallet support",
      "On-chain TX signing & hash submission",
      "Express.js + Prisma + Neon stack",
      "Admin on-chain TX verification",
      "Wallet crediting after confirmation",
    ],
    stats: [
      { icon: Globe, label: "Frontend", value: "React + Vite" },
      { icon: Database, label: "Database", value: "Neon PG" },
      { icon: Wallet, label: "Wallets", value: "Phantom + Solflare" },
    ],
    platforms: [
      { label: "React + Vite", icon: Globe },
      { label: "Express.js", icon: Code2 },
      { label: "Solana", icon: Wallet },
    ],
    href: "/case-study/shencoin",
  },

  // ==================== WEB DEVELOPMENT PROJECTS ====================
  {
    key: "inhomes-direct",
    title: "InHomes Direct — E-commerce with Custom Calculators",
    icon: ShoppingCart,
    industry: "E-commerce • Custom Development • Shopify",
    tags: ["E-commerce", "Custom Development", "Calculators"],
    category: CATEGORIES.WEB,
    subCategories: [SUB_CATEGORIES.ECOMMERCE],
    summary:
      "Built a logic-driven storefront for flooring, worktops and home interiors with custom calculators for area-to-pack conversion, real-time pricing, and survey-based estimates — all without paid apps.",
    scope: ["Custom calculators", "Product logic", "Real-time pricing", "Survey forms", "Category policies"],
    highlights: [
      "Area → packs conversion",
      "Real-time pricing",
      "Survey-based estimates",
      "No paid apps",
    ],
    stats: [
      { icon: Calculator, label: "Calculators", value: "Custom built" },
      { icon: Package, label: "Pack logic", value: "Auto-round up" },
      { icon: Truck, label: "Policies", value: "By category" },
    ],
    platforms: [
      { label: "Shopify", icon: ShoppingCart },
    ],
    href: "/case-study/inhomes-direct",
  },
  {
    key: "esahulat-mart",
    title: "ESahulat Mart — E-commerce Platform",
    icon: ShoppingCart,
    industry: "E-commerce • Retail • Web Development",
    tags: ["E-commerce", "Web Development", "Retail"],
    category: CATEGORIES.WEB,
    subCategories: [SUB_CATEGORIES.ECOMMERCE],
    summary:
      "Developed a modern e-commerce platform for ESahulat Mart, featuring product catalog, shopping cart, payment integration, and order management system.",
    scope: ["Product catalog", "Shopping cart", "Payment integration", "Order management", "Inventory tracking"],
    highlights: [
      "Modern storefront",
      "Secure payments",
      "Order management",
      "Inventory tracking",
    ],
    stats: [
      { icon: ShoppingCart, label: "Products", value: "Listed" },
      { icon: CreditCard, label: "Payments", value: "Integrated" },
      { icon: Package, label: "Orders", value: "Managed" },
    ],
    platforms: [
      { label: "E-commerce", icon: ShoppingCart },
    ],
    href: "/case-study/esahulat-mart",
  },
  {
    key: "more-homes-group",
    title: "More Homes Group — Property Management Platform",
    icon: Building2,
    industry: "Real Estate • Property Management • Web Development",
    tags: ["Web Development", "Property Management", "Business Sites"],
    category: CATEGORIES.WEB,
    subCategories: [SUB_CATEGORIES.PLATFORMS],
    summary:
      "Developed a comprehensive property management platform for More Homes Group, featuring property listings, tenant management, maintenance tracking, and financial reporting.",
    scope: ["Property listings", "Tenant management", "Maintenance tracking", "Financial reporting", "Admin dashboard"],
    highlights: [
      "Streamlined operations",
      "Better tenant experience",
      "Real-time tracking",
      "Comprehensive reporting",
    ],
    stats: [
      { icon: Building2, label: "Properties", value: "Managed" },
      { icon: Users, label: "Tenants", value: "Tracked" },
      { icon: BarChart3, label: "Reports", value: "Automated" },
    ],
    platforms: [
      { label: "Web App", icon: Code2 },
    ],
    href: "/case-study/more-homes-group",
  },
  {
    key: "multidatum",
    title: "Multidatum — Data Analytics Platform",
    icon: Database,
    industry: "Data Analytics • Business Intelligence • Web Development",
    tags: ["Web Development", "Data Analytics", "Business Intelligence"],
    category: CATEGORIES.WEB,
    subCategories: [SUB_CATEGORIES.PLATFORMS],
    summary:
      "Built a comprehensive data analytics platform for Multidatum, featuring advanced data visualization, real-time reporting, and business intelligence dashboards.",
    scope: ["Data visualization", "Real-time reporting", "Business intelligence", "Dashboard development", "Data integration"],
    highlights: [
      "Advanced analytics",
      "Real-time insights",
      "Interactive dashboards",
      "Data integration",
    ],
    stats: [
      { icon: Database, label: "Data", value: "Analyzed" },
      { icon: BarChart3, label: "Reports", value: "Automated" },
      { icon: Target, label: "Insights", value: "Real-time" },
    ],
    platforms: [
      { label: "Web App", icon: Code2 },
      { label: "Analytics", icon: BarChart3 },
    ],
    href: "/case-study/multidatum",
  },
  {
    key: "hikmabiotics",
    title: "Hikmabiotics — Healthcare Platform",
    icon: ShieldCheck,
    industry: "Healthcare • Web Development • Medical",
    tags: ["Web Development", "Healthcare", "Medical"],
    category: CATEGORIES.WEB,
    subCategories: [SUB_CATEGORIES.PLATFORMS],
    summary:
      "Built a comprehensive healthcare platform for Hikmabiotics, featuring patient management, appointment scheduling, medical records, and telemedicine capabilities.",
    scope: ["Patient management", "Appointment scheduling", "Medical records", "Telemedicine", "Admin dashboard"],
    highlights: [
      "Patient management",
      "Appointment system",
      "Medical records",
      "Telemedicine ready",
    ],
    stats: [
      { icon: Users, label: "Patients", value: "Managed" },
      { icon: Calendar, label: "Appointments", value: "Scheduled" },
      { icon: ShieldCheck, label: "Records", value: "Secured" },
    ],
    platforms: [
      { label: "Healthcare", icon: ShieldCheck },
    ],
    href: "/case-study/hikmabiotics",
  },

  // ==================== MARKETING & BRANDING PROJECTS ====================
  {
    key: "ekommart",
    title: "Ekommart — Complete Brand & Marketing Transformation",
    icon: Sparkles,
    industry: "E-commerce • Brand Building • Digital Marketing",
    tags: ["Brand Building", "Digital Marketing", "E-commerce", "Social Media"],
    category: CATEGORIES.MARKETING,
    subCategories: [SUB_CATEGORIES.BRAND_BUILDING, SUB_CATEGORIES.DIGITAL_MARKETING, SUB_CATEGORIES.SOCIAL_MEDIA],
    summary:
      "Complete transformation for Ekommart including brand identity, WordPress store development, social media presence, and performance marketing campaigns that generated thousands of purchases.",
    scope: ["Brand identity", "WordPress store", "Social media", "Performance marketing", "Content creation"],
    highlights: [
      "Brand built from scratch",
      "E-commerce store launched",
      "Social media presence",
      "Performance campaigns",
    ],
    stats: [
      { icon: ShoppingCart, label: "Purchases", value: "3,300+" },
      { icon: Target, label: "CPA", value: "164 PKR" },
      { icon: Megaphone, label: "Campaigns", value: "5 Months" },
    ],
    platforms: [
      { label: "WordPress", icon: Code2 },
      { label: "Meta Ads", icon: Target },
    ],
    href: "/case-study/ekommart",
  },
  {
    key: "halla-gulla",
    title: "Halla Gulla — Brand Identity & Digital Presence",
    icon: Sparkles,
    industry: "Brand Building • Digital Marketing • Branding",
    tags: ["Brand Building", "Digital Marketing", "Branding", "Social Media"],
    category: CATEGORIES.MARKETING,
    subCategories: [SUB_CATEGORIES.BRAND_BUILDING, SUB_CATEGORIES.DIGITAL_MARKETING, SUB_CATEGORIES.SOCIAL_MEDIA],
    summary:
      "Complete brand transformation for Halla Gulla including logo design, brand guidelines, website development, and comprehensive digital marketing strategy.",
    scope: ["Brand identity", "Logo design", "Website development", "Digital marketing", "Social media setup"],
    highlights: [
      "Complete brand overhaul",
      "Modern website",
      "Social media presence",
      "Marketing strategy",
    ],
    stats: [
      { icon: Sparkles, label: "Brand", value: "Transformed" },
      { icon: Globe, label: "Website", value: "Launched" },
      { icon: Megaphone, label: "Marketing", value: "Implemented" },
    ],
    platforms: [
      { label: "WordPress", icon: Code2 },
      { label: "Social Media", icon: Users },
    ],
    href: "/case-study/halla-gulla",
  },
  {
    key: "united-muslim-travels",
    title: "United Muslim Travels — Brand Build & Marketing",
    icon: Sparkles,
    industry: "Travel • Brand Building • Digital Marketing",
    tags: ["Brand Building", "Digital Marketing", "Travel", "Social Media"],
    category: CATEGORIES.MARKETING,
    subCategories: [SUB_CATEGORIES.BRAND_BUILDING, SUB_CATEGORIES.DIGITAL_MARKETING, SUB_CATEGORIES.SOCIAL_MEDIA],
    summary:
      "Comprehensive brand building and digital marketing campaign for United Muslim Travels, including brand identity, website development, and performance marketing.",
    scope: ["Brand identity", "Website development", "Digital marketing", "Social media", "Content creation"],
    highlights: [
      "Brand identity created",
      "Website launched",
      "Marketing campaigns",
      "Social presence built",
    ],
    stats: [
      { icon: Sparkles, label: "Brand", value: "Built" },
      { icon: Globe, label: "Website", value: "Developed" },
      { icon: Target, label: "Marketing", value: "Executed" },
    ],
    platforms: [
      { label: "WordPress", icon: Code2 },
      { label: "Meta Ads", icon: Target },
    ],
    href: "/case-studies/united-muslim-travels-brand-build",
  },
];

const seoContent = {
  kicker: "Our Work",
  title: "Case Studies in Salesforce, E-commerce, and Growth Marketing",
  subtitle:
    "Explore real outcomes from Salesforce implementation, Experience Cloud portal development, and performance-optimized ecommerce builds.",
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
  {
    q: "Do you have Salesforce Experience Cloud case studies?",
    a: "Yes. We have Experience Cloud and Service Cloud implementations focused on automation, portals, and data accuracy.",
  },
  {
    q: "Can I see ecommerce performance results?",
    a: "Yes. Our case studies include fast-loading Shopify builds and Meta Ads performance improvements.",
  },
  {
    q: "Do you share ad performance metrics?",
    a: "Where allowed, we show ROAS, CPA, and conversion growth with transparent timelines.",
  },
  {
    q: "Can you build a similar solution for my business?",
    a: "Absolutely. We tailor Salesforce, ecommerce, and marketing strategies to your industry and goals.",
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

  // Handle URL filter parameter
  useEffect(() => {
    const filterParam = searchParams.get("filter");
    if (filterParam) {
      // Main category filters
      if (filterParam === "salesforce") {
        setMainTab(CATEGORIES.SALESFORCE);
        setSubFilter("all");
      } else if (filterParam === "web") {
        setMainTab(CATEGORIES.WEB);
        setSubFilter("all");
      } else if (filterParam === "custom-web-apps" || filterParam === "custom-apps" || filterParam === "portals") {
        setMainTab(CATEGORIES.CUSTOM_WEB_APPS);
        setSubFilter("all");
      } else if (filterParam === "marketing" || filterParam === "branding" || filterParam === "brand-build") {
        setMainTab(CATEGORIES.MARKETING);
        setSubFilter("all");
      }
      // Salesforce sub-filters
      else if (filterParam === "sales-cloud") {
        setMainTab(CATEGORIES.SALESFORCE);
        setSubFilter(SUB_CATEGORIES.SALES_CLOUD);
      } else if (filterParam === "service-cloud") {
        setMainTab(CATEGORIES.SALESFORCE);
        setSubFilter(SUB_CATEGORIES.SERVICE_CLOUD);
      } else if (filterParam === "experience-cloud") {
        setMainTab(CATEGORIES.SALESFORCE);
        setSubFilter(SUB_CATEGORIES.EXPERIENCE_CLOUD);
      }
      // Web sub-filters
      else if (filterParam === "ecommerce" || filterParam === "e-commerce") {
        setMainTab(CATEGORIES.WEB);
        setSubFilter(SUB_CATEGORIES.ECOMMERCE);
      } else if (filterParam === "platforms") {
        setMainTab(CATEGORIES.WEB);
        setSubFilter(SUB_CATEGORIES.PLATFORMS);
      }
      // Marketing sub-filters
      else if (filterParam === "social" || filterParam === "social-media") {
        setMainTab(CATEGORIES.MARKETING);
        setSubFilter(SUB_CATEGORIES.SOCIAL_MEDIA);
      } else if (filterParam === "digital-marketing") {
        setMainTab(CATEGORIES.MARKETING);
        setSubFilter(SUB_CATEGORIES.DIGITAL_MARKETING);
      } else if (filterParam === "brand-building") {
        setMainTab(CATEGORIES.MARKETING);
        setSubFilter(SUB_CATEGORIES.BRAND_BUILDING);
      }
    }
  }, [searchParams]);

  const mainTabs = [
    { key: "all", label: "All Projects", icon: LayoutGrid },
    { key: CATEGORIES.SALESFORCE, label: "Salesforce", icon: Cloud },
    { key: CATEGORIES.WEB, label: "Web Development", icon: Code2 },
    { key: CATEGORIES.CUSTOM_WEB_APPS, label: "Custom Web Apps", icon: Database },
    { key: CATEGORIES.MARKETING, label: "Marketing & Branding", icon: Megaphone },
  ];

  const salesforceSubFilters = [
    { key: "all", label: "All Salesforce", icon: Cloud },
    { key: SUB_CATEGORIES.SALES_CLOUD, label: "Sales Cloud", icon: Cloud },
    { key: SUB_CATEGORIES.SERVICE_CLOUD, label: "Service Cloud", icon: Workflow },
    { key: SUB_CATEGORIES.EXPERIENCE_CLOUD, label: "Experience Cloud", icon: Globe },
  ];

  const webSubFilters = [
    { key: "all", label: "All Web Projects", icon: LayoutGrid },
    { key: SUB_CATEGORIES.ECOMMERCE, label: "E-commerce", icon: ShoppingCart },
    { key: SUB_CATEGORIES.PLATFORMS, label: "Platforms & Apps", icon: Database },
  ];

  const customWebAppsSubFilters = [
    { key: "all", label: "All Custom Apps", icon: Database },
    { key: SUB_CATEGORIES.PORTALS, label: "Portals & Dashboards", icon: LayoutGrid },
  ];

  const marketingSubFilters = [
    { key: "all", label: "All Marketing", icon: Megaphone },
    { key: SUB_CATEGORIES.BRAND_BUILDING, label: "Brand Building", icon: Sparkles },
    { key: SUB_CATEGORIES.DIGITAL_MARKETING, label: "Digital Marketing", icon: Target },
    { key: SUB_CATEGORIES.SOCIAL_MEDIA, label: "Social Media", icon: Users },
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    // Search filter - searches across all text fields
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

    // Main category filter - uses the category field
    const byMainTab = (p) => {
      if (mainTab === "all") return true;
      return p.category === mainTab;
    };

    // Sub-category filter - uses the subCategories array
    const bySubFilter = (p) => {
      if (subFilter === "all") return true;
      return (p.subCategories || []).includes(subFilter);
    };

    return PROJECTS.filter((p) => byQuery(p) && byMainTab(p) && bySubFilter(p));
  }, [query, mainTab, subFilter]);

  return (
    <>
      <Helmet>
        <title>IT Meta Solutions - Our Work | Portfolio & Case Studies</title>
        <meta
          name="description"
          content="Portfolio of Salesforce implementation, Experience Cloud, Shopify builds, and performance marketing case studies."
        />
        <link rel="canonical" href="https://itmetasolutions.com/work" />
      </Helmet>

      <div className="itms-subpage text-zinc-100 relative min-h-screen overflow-hidden">
        <SubpageVisualLayer />

        <ScrollProgress />

        {/* Background Elements */}
        <GradientBlob className="left-0 top-0 h-[600px] w-[600px]" color="rgba(80,37,209,0.2)" />
        <GradientBlob className="right-0 top-1/4 h-[800px] w-[800px]" color="rgba(186,85,211,0.15)" />
        <GradientBlob className="bottom-0 left-1/3 h-[700px] w-[700px]" color="rgba(80,37,209,0.18)" />

        {/* ==================== HERO SECTION ==================== */}
        <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-20">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div
              style={{ y: heroY }}
              className="mx-auto max-w-5xl text-center"
            >
              <motion.div
                initial={reduced ? false : { y: 16 }}
                animate={reduced ? {} : { y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge icon={Sparkles}>Our Portfolio</Badge>
              </motion.div>

              <motion.h1
                initial={reduced ? false : { y: 16 }}
                animate={reduced ? {} : { y: 0 }}
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
                initial={reduced ? false : { y: 16 }}
                animate={reduced ? {} : { y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 text-xl text-zinc-300 sm:text-2xl max-w-3xl mx-auto"
              >
                Real projects, real results. Explore our case studies and see how we've helped businesses grow through strategic web development, digital marketing, and brand building.
              </motion.p>

              {/* Search and Filters */}
              <motion.div
                initial={reduced ? false : { y: 16 }}
                animate={reduced ? {} : { y: 0 }}
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

                  {/* Salesforce Sub-filters */}
                  {mainTab === CATEGORIES.SALESFORCE && (
                    <div className="mt-6 border-t border-white/10 pt-6">
                      <div className="mb-3 text-sm font-semibold text-white">Salesforce Cloud Products</div>
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

                  {/* Web Sub-filters */}
                  {mainTab === CATEGORIES.WEB && (
                    <div className="mt-6 border-t border-white/10 pt-6">
                      <div className="mb-3 text-sm font-semibold text-white">Web Development Types</div>
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

                  {/* Custom Web Apps Sub-filters */}
                  {mainTab === CATEGORIES.CUSTOM_WEB_APPS && (
                    <div className="mt-6 border-t border-white/10 pt-6">
                      <div className="mb-3 text-sm font-semibold text-white">Custom App Types</div>
                      <div className="flex flex-wrap gap-3">
                        {customWebAppsSubFilters.map((filter) => (
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

                  {/* Marketing Sub-filters */}
                  {mainTab === CATEGORIES.MARKETING && (
                    <div className="mt-6 border-t border-white/10 pt-6">
                      <div className="mb-3 text-sm font-semibold text-white">Marketing Services</div>
                      <div className="flex flex-wrap gap-3">
                        {marketingSubFilters.map((filter) => (
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
          </div>
        </section>

        {/* ==================== PROJECTS GRID ==================== */}
        <section className="relative z-10 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
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
                initial={reduced ? false : { y: 16 }}
                animate={reduced ? {} : { y: 0 }}
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
                  Clear filters
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            )}
          </div>
        </section>

        <SeoContentFaq content={seoContent} faqs={seoFaqs} />

        {/* ==================== CTA SECTION ==================== */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={reduced ? false : { y: 16 }}
              whileInView={reduced ? {} : { y: 0 }}
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
          </div>
        </section>
      </div>
    </>
  );
}
