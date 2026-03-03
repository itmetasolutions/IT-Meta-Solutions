import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import {
  ArrowRight,
  Brush,
  CheckCircle2,
  Clapperboard,
  Cloud,
  Code2,
  Film,
  Gauge,
  Instagram,
  LayoutGrid,
  Megaphone,
  Palette,
  Phone,
  Search,
  Settings,
  Share2,
  Sparkles,
  Store,
  Video,
  Captions,
  PenTool,
  Layers,
  Wand2,
  FileSearch,
  MapPin,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import SeoContentFaq from "../../components/SeoContentFaq";
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
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </span>
  );
}

function ServiceSelector({ active, onClick, icon: Icon, label, description }) {
  const reduced = usePrefersReducedMotion();
  const isActive = active;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={reduced ? false : { y: 16 }}
      whileInView={reduced ? {} : { y: 0 }}
      viewport={{ once: true }}
      whileHover={reduced ? {} : { y: -4, transition: { duration: 0.2 } }}
      whileTap={reduced ? {} : { scale: 0.98 }}
      className={cx(
        "group relative flex flex-col items-center text-center p-5 rounded-2xl border transition-all duration-300",
        isActive
          ? "border-[#5025d1] bg-gradient-to-br from-[#5025d1]/20 to-purple-600/10 shadow-lg shadow-[#5025d1]/20"
          : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20"
      )}
    >
      {/* Active indicator glow */}
      {isActive && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#5025d1]/10 to-purple-600/5 blur-xl" />
      )}

      <div className={cx(
        "relative flex items-center justify-center w-14 h-14 rounded-xl transition-all duration-300",
        isActive
          ? "bg-gradient-to-br from-[#5025d1] to-purple-600 shadow-lg shadow-[#5025d1]/40"
          : "bg-white/10 group-hover:bg-white/15"
      )}>
        <Icon className={cx("w-7 h-7 transition-colors", isActive ? "text-white" : "text-zinc-300 group-hover:text-white")} />
      </div>

      <span className={cx(
        "relative mt-3 text-sm font-semibold transition-colors",
        isActive ? "text-white" : "text-zinc-300 group-hover:text-white"
      )}>
        {label}
      </span>

      {description && (
        <span className="relative mt-1 text-xs text-zinc-500 line-clamp-2">
          {description}
        </span>
      )}

      {isActive && (
        <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-gradient-to-r from-[#5025d1] to-purple-600" />
      )}
    </motion.button>
  );
}

function ServiceCard({ icon: Icon, title, description, features, delay = 0 }) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { y: 16 }}
      whileInView={reduced ? {} : { y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={reduced ? {} : { y: -6, transition: { duration: 0.2 } }}
      className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm transition-all hover:border-[#5025d1]/50"
    >
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-gradient-to-br from-[#5025d1]/20 to-purple-600/20 blur-3xl transition-all group-hover:scale-150" />

      <div className="relative p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 rounded-2xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-3">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-white">{title}</h3>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-zinc-300">
          {description}
        </p>

        {features && features.length > 0 && (
          <ul className="mt-5 space-y-2.5">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                <span className="text-sm text-zinc-200">{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 backdrop-blur-sm">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-2.5 sm:p-3">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </div>
        <div className="min-w-0">
          <div className="text-lg sm:text-2xl font-bold text-white truncate">{value}</div>
          <div className="text-xs sm:text-sm text-zinc-400">{label}</div>
        </div>
      </div>
    </div>
  );
}

/* ==================== DATA ==================== */

const tabs = [
  { key: "web", label: "Web Development", icon: Code2, description: "Custom websites & e-commerce" },
  { key: "customwebapps", label: "Custom Web Apps", icon: Layers, description: "Portals & business systems" },
  { key: "salesforce", label: "Salesforce", icon: Cloud, description: "CRM solutions & automation" },
  { key: "marketing", label: "Digital Marketing", icon: Megaphone, description: "Ads that drive results" },
  { key: "seo", label: "SEO", icon: Search, description: "Rank & convert" },
  { key: "social", label: "Social Media", icon: Share2, description: "Content & engagement" },
  { key: "design", label: "Graphic Design", icon: Palette, description: "Visuals that convert" },
  { key: "video", label: "Video Editing", icon: Clapperboard, description: "Reels, TikToks & ads" },
  { key: "brand", label: "Brand Building", icon: Wand2, description: "Complete brand systems" },
];

const seoContent = {
  kicker: "Our Services",
  title: "Revenue-Focused Services for Salesforce, E-commerce, and Growth",
  subtitle:
    "We deliver Salesforce implementation, LWC development services, Experience Cloud portals, and high-converting Shopify and WooCommerce builds.",
  paragraphs: [
    "Our team combines CRM automation, performance marketing, and conversion-first web development to create end-to-end growth systems.",
    "From data cleaning in Salesforce to Meta Ads ROAS optimization, we focus on measurable outcomes and scalable results.",
  ],
  bullets: [
    "Salesforce automation experts and Experience Cloud portal development",
    "Shopify custom theme development with performance optimization",
    "Custom web app development and pricing engine builds",
    "Performance marketing for online stores and lead generation",
  ],
};

const seoFaqs = [
  {
    q: "What Salesforce services do you offer?",
    a: "We handle implementation, LWC development, Experience Cloud portals, integrations, and CRM automation.",
  },
  {
    q: "Do you build high-converting ecommerce websites?",
    a: "Yes. We build fast-loading Shopify and WooCommerce stores with CRO, tracking, and conversion-focused UX.",
  },
  {
    q: "Can you improve an existing store or CRM?",
    a: "Absolutely. We optimize site performance, fix data issues, and automate lead workflows for better results.",
  },
  {
    q: "Do you offer Meta Ads and performance marketing?",
    a: "Yes. We run scalable Meta Ads strategies, creative testing, and ROAS optimization for growth.",
  },
];

/* ==================== PANELS ==================== */

function PanelWeb() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <Badge icon={Code2}>Web Development</Badge>
        <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          High-Converting Websites Built for Growth
        </h2>
        <p className="mt-4 text-lg text-zinc-300 sm:text-xl max-w-3xl mx-auto">
          Modern websites and e-commerce stores optimized for speed, conversions,
          and mobile users.
        </p>
      </div>

      <div className="flex justify-center">
        <Link
          to="/web-development-expertise"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5025d1] to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5025d1]/30 transition-all hover:shadow-xl hover:shadow-[#5025d1]/40 hover:scale-105"
        >
          <Code2 className="h-5 w-5" />
          Explore Our Web Expertise
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ServiceCard
          icon={LayoutGrid}
          title="Business Websites"
          description="Service websites, landing pages, and portfolios designed to convert visitors into customers."
          features={[
            "Modern UI with clear CTAs",
            "Mobile-first responsive layouts",
            "Lead forms + WhatsApp integration",
            "Speed optimization",
            "SEO-ready structure",
          ]}
          delay={0.1}
        />
        <ServiceCard
          icon={Store}
          title="E-commerce Stores"
          description="Shopify and custom stores with frictionless checkout and conversion optimization."
          features={[
            "Product & category page templates",
            "Cart & checkout optimization",
            "COD / shipping rules setup",
            "Bundles & special offers",
            "Pixel & conversion tracking",
          ]}
          delay={0.2}
        />
        <ServiceCard
          icon={Gauge}
          title="Performance Optimization"
          description="Built for ads traffic, fast loading times, and clean analytics tracking."
          features={[
            "Landing pages for campaigns",
            "Event tracking (leads/purchases)",
            "Conversion-focused copy",
            "A/B testing ready layouts",
            "Heatmap & analytics support",
          ]}
          delay={0.3}
        />
      </div>
    </div>
  );
}

function PanelCustomWebApps() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <Badge icon={Layers}>Custom Web Applications</Badge>
        <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          Bespoke Portals & Business Systems
        </h2>
        <p className="mt-4 text-lg text-zinc-300 sm:text-xl max-w-3xl mx-auto">
          Role-based web applications, internal tools, and operations dashboards built around your exact workflows — not generic templates.
        </p>
      </div>

      <div className="flex justify-center">
        <Link
          to="/custom-web-apps-expertise"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5025d1] to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5025d1]/30 transition-all hover:shadow-xl hover:shadow-[#5025d1]/40 hover:scale-105"
        >
          <Layers className="h-5 w-5" />
          Explore Our Custom Web Apps Expertise
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ServiceCard
          icon={LayoutGrid}
          title="Portals & Dashboards"
          description="Multi-role web portals with separate admin and user views, tailored to your operational structure."
          features={[
            "Role-based access control",
            "Admin control panels",
            "Agent / user workspaces",
            "Real-time data dashboards",
            "Audit logs & activity tracking",
          ]}
          delay={0.1}
        />
        <ServiceCard
          icon={Code2}
          title="Backend APIs & Data Models"
          description="Scalable server-side logic built with modern frameworks and a clean, maintainable data architecture."
          features={[
            "Next.js 14 + TypeScript",
            "Prisma ORM & PostgreSQL",
            "REST API development",
            "Zod validation & type safety",
            "Vercel / Docker deployment",
          ]}
          delay={0.2}
        />
        <ServiceCard
          icon={Settings}
          title="Auth, Security & Integrations"
          description="Secure authentication systems and third-party integrations wired into your platform from day one."
          features={[
            "OTP login & rate limiting",
            "Secure session management",
            "SIP / VoIP dialer integration",
            "Embedded chat systems",
            "Third-party API integrations",
          ]}
          delay={0.3}
        />
      </div>
    </div>
  );
}

function PanelSalesforce() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <Badge icon={Cloud}>Salesforce Development</Badge>
        <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          Custom Salesforce Solutions
        </h2>
        <p className="mt-4 text-lg text-zinc-300 sm:text-xl max-w-3xl mx-auto">
          Streamline your business operations with custom Salesforce
          implementations and integrations.
        </p>
      </div>

      <div className="flex justify-center">
        <Link
          to="/salesforce-expertise"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5025d1] to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5025d1]/30 transition-all hover:shadow-xl hover:shadow-[#5025d1]/40 hover:scale-105"
        >
          <Cloud className="h-5 w-5" />
          Explore Our Salesforce Expertise
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ServiceCard
          icon={Cloud}
          title="Salesforce Implementation"
          description="End-to-end Salesforce setup tailored to your business needs and processes."
          features={[
            "Sales & Service Cloud setup",
            "Custom objects & fields",
            "User roles & permissions",
            "Data migration & import",
            "Training & documentation",
          ]}
          delay={0.1}
        />
        <ServiceCard
          icon={Code2}
          title="Custom Development"
          description="Build custom functionality with Apex, LWC, and Visualforce development."
          features={[
            "Apex classes & triggers",
            "Lightning Web Components",
            "Visualforce pages",
            "Custom APIs & integrations",
            "AppExchange app development",
          ]}
          delay={0.2}
        />
        <ServiceCard
          icon={Settings}
          title="Process Automation"
          description="Automate workflows to increase efficiency and reduce manual work significantly."
          features={[
            "Flow Builder automation",
            "Process Builder & workflows",
            "Approval processes",
            "Email alerts & notifications",
            "Scheduled jobs & batch processes",
          ]}
          delay={0.3}
        />
      </div>
    </div>
  );
}

function PanelMarketing() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <Badge icon={Megaphone}>Digital Marketing</Badge>
        <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          Performance Marketing That Drives Results
        </h2>
        <p className="mt-4 text-lg text-zinc-300 sm:text-xl max-w-3xl mx-auto">
          Full-funnel ad systems focused on leads, sales, and maximizing ROAS
          across all platforms.
        </p>
      </div>

      <div className="flex justify-center">
        <Link
          to="/digital-marketing-expertise"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5025d1] to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5025d1]/30 transition-all hover:shadow-xl hover:shadow-[#5025d1]/40 hover:scale-105"
        >
          <Megaphone className="h-5 w-5" />
          Explore Our Digital Marketing Expertise
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ServiceCard
          icon={Megaphone}
          title="Meta Ads"
          description="Facebook and Instagram campaigns with retargeting and conversion optimization."
          features={[
            "Business Manager setup",
            "Pixel & event tracking",
            "Awareness → Conversion funnels",
            "WhatsApp + lead forms",
            "Controlled spend scaling",
          ]}
          delay={0.1}
        />
        <ServiceCard
          icon={Video}
          title="TikTok Ads"
          description="Short-form performance creatives built for reach and high conversion rates."
          features={[
            "UGC style concepts",
            "Hook + benefit + CTA scripts",
            "Interest & lookalike targeting",
            "Landing pages for TikTok",
            "Creative rotation system",
          ]}
          delay={0.2}
        />
        <ServiceCard
          icon={Search}
          title="Google Ads"
          description="Search and shopping campaigns capturing high-intent buyers effectively."
          features={[
            "Search campaigns (high intent)",
            "Display & YouTube remarketing",
            "Shopping feed optimization",
            "Conversion tracking setup",
            "Keyword & landing optimization",
          ]}
          delay={0.3}
        />
      </div>
    </div>
  );
}

function PanelSEO() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <Badge icon={Search}>SEO Services</Badge>
        <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          SEO That Compounds Over Time
        </h2>
        <p className="mt-4 text-lg text-zinc-300 sm:text-xl max-w-3xl mx-auto">
          Technical fixes, on-page structure, and content strategy that grow organic visibility
          and qualified leads.
        </p>
      </div>

      <div className="flex justify-center">
        <Link
          to="/seo-expertise"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5025d1] to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5025d1]/30 transition-all hover:shadow-xl hover:shadow-[#5025d1]/40 hover:scale-105"
        >
          <Search className="h-5 w-5" />
          Explore Our SEO Expertise
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ServiceCard
          icon={FileSearch}
          title="Technical SEO"
          description="Fix crawlability, speed, and Core Web Vitals to unlock rankings."
          features={[
            "Site audits and fixes",
            "Schema and structured data",
            "Indexing and crawl control",
            "Core Web Vitals improvements",
            "Redirects and canonicals",
          ]}
          delay={0.1}
        />
        <ServiceCard
          icon={Search}
          title="On-Page + Content"
          description="Intent-based pages and content that convert visitors into leads."
          features={[
            "Keyword intent mapping",
            "Title and meta optimization",
            "Content hierarchy and headings",
            "Internal linking structure",
            "Service and blog page planning",
          ]}
          delay={0.2}
        />
        <ServiceCard
          icon={MapPin}
          title="Local SEO"
          description="Rank for local intent and build trust with nearby customers."
          features={[
            "Google Business Profile setup",
            "Location and service pages",
            "Citations and NAP consistency",
            "Review strategy guidance",
            "Local reporting",
          ]}
          delay={0.3}
        />
      </div>
    </div>
  );
}

function PanelSocial() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <Badge icon={Share2}>Social Media Management</Badge>
        <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          Consistent Content That Builds Trust
        </h2>
        <p className="mt-4 text-lg text-zinc-300 sm:text-xl max-w-3xl mx-auto">
          Manage your social presence with strategic content that supports ads
          and drives engagement.
        </p>
      </div>

      <div className="flex justify-center">
        <Link
          to="/social-media-expertise"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5025d1] to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5025d1]/30 transition-all hover:shadow-xl hover:shadow-[#5025d1]/40 hover:scale-105"
        >
          <Share2 className="h-5 w-5" />
          Explore Our Social Media Expertise
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ServiceCard
          icon={Instagram}
          title="Profile Optimization"
          description="Fix the basics that increase trust and conversion rates immediately."
          features={[
            "Bio & category optimization",
            "CTA buttons (WhatsApp/Call)",
            "Highlights structure",
            "Brand colors & grid style",
            "Pinned posts strategy",
          ]}
          delay={0.1}
        />
        <ServiceCard
          icon={Layers}
          title="Content Pillars"
          description="A system that keeps content consistent, purposeful, and on-brand."
          features={[
            "Product/service showcases",
            "Offers & promotions",
            "Educational content posts",
            "Trust posts (proof/reviews)",
            "Engagement content",
          ]}
          delay={0.2}
        />
        <ServiceCard
          icon={Clapperboard}
          title="Reels & Short-Form"
          description="Reels for reach, authority building, and retargeting fuel for ads."
          features={[
            "Hook + script writing",
            "Shot list guidance",
            "Editing style direction",
            "Posting cadence planning",
            "Best practices for reach",
          ]}
          delay={0.3}
        />
      </div>
    </div>
  );
}

function PanelDesign() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <Badge icon={Palette}>Graphic Design</Badge>
        <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          High-Impact Visuals That Convert
        </h2>
        <p className="mt-4 text-lg text-zinc-300 sm:text-xl max-w-3xl mx-auto">
          Modern creatives for ads, social media, and brand identity that make
          users stop and take action.
        </p>
      </div>

      <div className="flex justify-center">
        <Link
          to="/graphic-designing-expertise"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5025d1] to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5025d1]/30 transition-all hover:shadow-xl hover:shadow-[#5025d1]/40 hover:scale-105"
        >
          <Palette className="h-5 w-5" />
          Explore Our Graphic Design Expertise
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ServiceCard
          icon={Brush}
          title="Social Media Creatives"
          description="Clean, modern post designs that maintain consistency across platforms."
          features={[
            "Post & story templates",
            "Carousel designs",
            "Highlight covers",
            "Offer banners & promotions",
            "Content branding system",
          ]}
          delay={0.1}
        />
        <ServiceCard
          icon={PenTool}
          title="Ads Creatives"
          description="Performance-first designs optimized for Meta, TikTok, and Google Ads."
          features={[
            "Ad static creatives",
            "Creative testing variations",
            "Thumb-stopping hooks",
            "Offer clarity layouts",
            "Multiple aspect ratios",
          ]}
          delay={0.2}
        />
        <ServiceCard
          icon={Palette}
          title="Brand Identity"
          description="Logo and brand kits that look premium everywhere you showcase them."
          features={[
            "Logo variations & formats",
            "Color palette & typography",
            "Brand guidelines document",
            "Icons and patterns",
            "Platform consistency",
          ]}
          delay={0.3}
        />
      </div>
    </div>
  );
}

function PanelVideo() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <Badge icon={Clapperboard}>Video Editing</Badge>
        <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          Short-Form Edits That Drive Engagement
        </h2>
        <p className="mt-4 text-lg text-zinc-300 sm:text-xl max-w-3xl mx-auto">
          Reels, TikToks, and ads with modern pacing, strong hooks, and clean
          captions for mobile viewers.
        </p>
      </div>

      <div className="flex justify-center">
        <Link
          to="/video-editing-expertise"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5025d1] to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5025d1]/30 transition-all hover:shadow-xl hover:shadow-[#5025d1]/40 hover:scale-105"
        >
          <Clapperboard className="h-5 w-5" />
          Explore Our Video Editing Expertise
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ServiceCard
          icon={Film}
          title="Reels / TikTok Edits"
          description="Fast-paced edits built for social algorithms and maximum reach."
          features={[
            "Hook-first pacing",
            "Smooth cuts & transitions",
            "Music syncing & timing",
            "Trend-aware editing style",
            "Multiple ratio exports",
          ]}
          delay={0.1}
        />
        <ServiceCard
          icon={Captions}
          title="Captions & Subtitles"
          description="Readable captions that increase retention and watch time significantly."
          features={[
            "Clean subtitle styling",
            "Urdu/English support",
            "Emphasis on keywords",
            "Safe area placement",
            "Brand-style captions",
          ]}
          delay={0.2}
        />
        <ServiceCard
          icon={Video}
          title="Ad Edits"
          description="Performance edits specifically optimized for Meta and TikTok campaigns."
          features={[
            "Multiple hook variants",
            "Offer overlays & graphics",
            "CTA end cards",
            "UGC style editing",
            "Test-ready outputs",
          ]}
          delay={0.3}
        />
      </div>
    </div>
  );
}

function PanelBrand() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <Badge icon={Wand2}>Brand Building</Badge>
        <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          Complete Brand Systems From Scratch
        </h2>
        <p className="mt-4 text-lg text-zinc-300 sm:text-xl max-w-3xl mx-auto">
          Full brand ecosystems: identity, website, social presence, and ads
          funnels for consistent growth.
        </p>
      </div>

      <div className="flex justify-center">
        <Link
          to="/brand-building-expertise"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5025d1] to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5025d1]/30 transition-all hover:shadow-xl hover:shadow-[#5025d1]/40 hover:scale-105"
        >
          <Wand2 className="h-5 w-5" />
          Explore Our Brand Building Expertise
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ServiceCard
          icon={Wand2}
          title="Brand Strategy"
          description="Positioning, messaging framework, and offer clarity that resonates."
          features={[
            "Brand positioning strategy",
            "Audience personas research",
            "Offer & pricing strategy",
            "Messaging framework",
            "Competitive analysis",
          ]}
          delay={0.1}
        />
        <ServiceCard
          icon={Palette}
          title="Identity System"
          description="Visual identity that stays consistent everywhere your brand appears."
          features={[
            "Logo + variations",
            "Color palette selection",
            "Typography system",
            "Templates & guidelines",
            "Content style direction",
          ]}
          delay={0.2}
        />
        <ServiceCard
          icon={Megaphone}
          title="Growth System"
          description="Organic and paid system designed for real, measurable results."
          features={[
            "Content + ads alignment",
            "Full-funnel campaigns",
            "Retargeting systems",
            "Landing pages for offers",
            "Scaling roadmap planning",
          ]}
          delay={0.3}
        />
      </div>
    </div>
  );
}

/* ==================== MAIN ==================== */

export default function ServicesPage() {
  const reduced = usePrefersReducedMotion();
  const [activeTab, setActiveTab] = useState("web");

  // ✅ Measure your fixed header height (id="site-header") and set CSS variable for sticky tabs.
  useEffect(() => {
    const header = document.getElementById("site-header");
    if (!header) return;

    const setHeaderH = () => {
      const h = header.getBoundingClientRect().height || 72;
      document.documentElement.style.setProperty("--header-h", `${Math.ceil(h)}px`);
    };

    setHeaderH();

    const ro = new ResizeObserver(setHeaderH);
    ro.observe(header);

    window.addEventListener("resize", setHeaderH);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setHeaderH);
    };
  }, []);

  const renderPanel = () => {
    switch (activeTab) {
      case "web":
        return <PanelWeb />;
      case "customwebapps":
        return <PanelCustomWebApps />;
      case "salesforce":
        return <PanelSalesforce />;
      case "marketing":
        return <PanelMarketing />;
      case "seo":
        return <PanelSEO />;
      case "social":
        return <PanelSocial />;
      case "design":
        return <PanelDesign />;
      case "video":
        return <PanelVideo />;
      case "brand":
        return <PanelBrand />;
      default:
        return <PanelWeb />;
    }
  };

  return (
    <>
      <Helmet>
        <title>IT Meta Solutions - Services | Web Development, Digital Marketing & Branding</title>
        <meta
          name="description"
          content="Salesforce implementation, LWC, Experience Cloud, Shopify, and performance marketing services built for growth."
        />
        <link rel="canonical" href="https://itmetasolutions.com/services" />
      </Helmet>

      <div className="relative min-h-screen">
        <ScrollProgress />

        {/* ==================== HERO SECTION ==================== */}
        <section className="relative pt-28 pb-12 sm:pt-36 sm:pb-16">
          <Container>
            <div className="mx-auto max-w-5xl text-center">
              <motion.div
                initial={reduced ? false : { y: 16 }}
                animate={reduced ? {} : { y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge icon={Sparkles}>Full-Service Digital Agency</Badge>
              </motion.div>

              <motion.h1
                initial={reduced ? false : { y: 16 }}
                animate={reduced ? {} : { y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-8 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
              >
                Everything You Need to
                <br />
                <span className="bg-gradient-to-r from-[#5025d1] via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Build & Grow
                </span>
              </motion.h1>

              <motion.p
                initial={reduced ? false : { y: 16 }}
                animate={reduced ? {} : { y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 text-xl text-zinc-300 sm:text-2xl max-w-3xl mx-auto"
              >
                From websites and Salesforce solutions to digital marketing and brand building — we
                deliver complete solutions that drive real business growth.
              </motion.p>

              <motion.div
                initial={reduced ? false : { y: 16 }}
                animate={reduced ? {} : { y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-10 grid gap-6 sm:grid-cols-3"
              >
                <StatCard icon={LayoutGrid} label="Build" value="Web & Salesforce" />
                <StatCard icon={Megaphone} label="Grow" value="Marketing & Ads" />
                <StatCard icon={Palette} label="Create" value="Design & Video" />
              </motion.div>
            </div>
          </Container>
        </section>

        {/* ==================== SERVICE SELECTOR (PROMINENT GRID) ==================== */}
        <section className="py-12 sm:py-16">
          <Container>
            <motion.div
              initial={reduced ? false : { y: 16 }}
              animate={reduced ? {} : { y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Select a Service to Explore
              </h2>
              <p className="mt-2 text-zinc-400">
                Click on any service below to see what we offer
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-9 gap-3 sm:gap-4">
              {tabs.map((tab, index) => (
                <ServiceSelector
                  key={tab.key}
                  active={activeTab === tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  icon={tab.icon}
                  label={tab.label}
                  description={tab.description}
                />
              ))}
            </div>
          </Container>
        </section>

        {/* ==================== SERVICE CONTENT ==================== */}
        <section className="py-16 sm:py-20">
          <Container>{renderPanel()}</Container>
        </section>

        <SeoContentFaq content={seoContent} faqs={seoFaqs} />

        {/* ==================== CTA SECTION ==================== */}
        <section className="py-16 sm:py-20">
          <Container>
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
                  Ready to Get Started?
                </h2>
                <p className="mt-6 text-xl text-zinc-300">
                  Let's discuss your project and create a custom plan that fits your goals and budget.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-[#5025d1] shadow-lg transition-all hover:scale-105"
                  >
                    Get Started Now
                    <ArrowRight className="h-5 w-5" />
                  </Link>

                  <a
                    href="https://wa.me/923271804037"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
                  >
                    <Phone className="h-5 w-5" />
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>
      </div>
    </>
  );
}
