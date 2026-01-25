import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Brush,
  CheckCircle2,
  ChevronRight,
  Clapperboard,
  Code2,
  Film,
  Gauge,
  Globe,
  Instagram,
  LayoutGrid,
  Megaphone,
  MousePointerClick,
  Palette,
  Phone,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wand2,
  Wallet,
  Webhook,
  Search,
  Laptop,
  Smartphone,
  PenTool,
  Layers,
  Share2,
  Video,
  Captions,
  Store,
  Boxes,
  Cloud,
  Database,
  Settings,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

/**
 * SERVICES PAGE (Tabbed)
 * Tabs (top navigation):
 *  - Web Development
 *  - Digital Marketing (Meta, TikTok, Google)
 *  - Social Media Management
 *  - Graphic Designing
 *  - Video Editing
 *  - Brand Building
 *
 * Theme:
 * - Dark, glass cards, gradients
 * - Scroll progress + reveal animations
 * - Sticky tab navigation at top
 *
 * ✅ Replace CTA links (#) with your contact/quote page routes.
 */

const cx = (...c) => c.filter(Boolean).join(" ");

const tabs = [
  { key: "web", label: "Web Development", icon: Code2 },
  { key: "salesforce", label: "Salesforce Development", icon: Cloud },
  { key: "marketing", label: "Digital Marketing", icon: Megaphone },
  { key: "social", label: "Social Media Management", icon: Share2 },
  { key: "design", label: "Graphic Designing", icon: Palette },
  { key: "video", label: "Video Editing", icon: Clapperboard },
  { key: "brand", label: "Brand Building", icon: Wand2 },
];

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
        "pointer-events-none absolute -z-10 blur-3xl opacity-40",
        "bg-[radial-gradient(closest-side,rgba(99,102,241,0.55),rgba(99,102,241,0))]",
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

function Divider() {
  return <div className="my-12 sm:my-16 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />;
}

function SectionTitle({ kicker, title, desc, align = "left", level = "h2" }) {
  const HeadingTag = level;
  return (
    <div className={cx("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
        <Sparkles className="h-3.5 w-3.5" />
        {kicker}
      </div>
      <HeadingTag className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">{title}</HeadingTag>
      <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">{desc}</p>
    </div>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 h-full flex flex-col justify-center">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
        <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />
      </div>

      <div className="relative flex h-full flex-col">
        <div className="mb-4 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>

        <p className="text-sm leading-relaxed text-zinc-300">{desc}</p>

        {bullets?.length ? (
          <ul className="mt-5 space-y-2 text-sm text-zinc-200">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-emerald-300" />
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

function StickyTabs({ active, onChange }) {
  return (
    <div className="sticky top-16 z-30 border-b border-white/10 bg-zinc-950/60 backdrop-blur">
      <Container className="py-6">
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = active === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => onChange(t.key)}
                className={cx(
                  "inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm transition",
                  isActive
                    ? "border-white/20 bg-white text-zinc-950"
                    : "border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10"
                )}
              >
                <Icon className="h-4 w-4" />
                {t.label}
                {isActive ? <CheckCircle2 className="h-4 w-4" /> : null}
              </button>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

function MiniCTA() {
  return (
    <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-emerald-400/10 p-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold text-white">Need a quote or a custom plan?</div>
          <div className="mt-1 text-sm text-zinc-300">
            Tell us your industry, budget range, and target city/country — we’ll recommend the best service mix.
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
  );
}

function PanelWeb() {
  return (
    <div className="grid gap-6">
      <Reveal>
        <SectionTitle
          kicker="Web Development"
          title="High-converting websites built for speed, trust, and lead/sales growth"
          desc="We build modern websites and e-commerce stores that look premium, load fast, and convert traffic into real inquiries or purchases — optimized for mobile-first users and ads traffic."
        />
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-8 flex justify-center">
          <Link
            to="/web-development-expertise"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-emerald-400 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            <Code2 className="h-5 w-5" />
            Explore Our Web Development Expertise
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>

      <div className="grid gap-4 lg:grid-cols-3">
        <Reveal delay={0.05}>
          <Card
            icon={LayoutGrid}
            title="Business websites"
            desc="Service websites, landing pages, and portfolios designed to convert."
            bullets={[
              "Modern UI with clear CTAs",
              "Mobile-first layouts",
              "Lead forms + WhatsApp integration",
              "Speed optimization",
              "SEO-ready structure",
            ]}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Card
            icon={Store}
            title="E-commerce stores"
            desc="Shopify / custom stores with frictionless checkout and upsells."
            bullets={[
              "Category + product page templates",
              "Cart + checkout optimization",
              "COD / shipping rules setup",
              "Bundles & offers",
              "Pixel + conversion tracking",
            ]}
          />
        </Reveal>
        <Reveal delay={0.15}>
          <Card
            icon={Gauge}
            title="Performance foundations"
            desc="Built for ads traffic, fast loading, and clean analytics."
            bullets={[
              "Landing pages for campaigns",
              "Event tracking (leads/purchase)",
              "Conversion-oriented copy blocks",
              "A/B-ready layouts",
              "Heatmap/analytics support",
            ]}
          />
        </Reveal>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Reveal delay={0.05}>
          <Card
            icon={Laptop}
            title="Tech stack options"
            desc="We work with your preferred platform and scale with you."
            bullets={[
              "WordPress / Elementor",
              "Shopify (Liquid + apps)",
              "Custom React/Next.js builds",
              "Node/Express APIs (optional)",
              "Hosting + deployment support",
            ]}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Card
            icon={Webhook}
            title="Integrations"
            desc="Connect your website with the tools your team uses daily."
            bullets={[
              "WhatsApp click-to-chat",
              "Email notifications",
              "CRM / Sheets integrations",
              "Payment gateways (where applicable)",
              "Chat widgets & automations",
            ]}
          />
        </Reveal>
      </div>

      <Reveal>
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold text-white">Deliverables</div>
              <div className="mt-1 text-sm text-zinc-300">
                Sitemap, UI design, responsive build, basic SEO, analytics/pixel setup, and a conversion-ready contact/checkout flow.
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
              <ChevronRight className="h-4 w-4" />
              Design → build → launch
            </div>
          </div>
        </div>
      </Reveal>

      <MiniCTA />
    </div>
  );
}

function PanelSalesforce() {
  return (
    <div className="grid gap-6">
      <Reveal>
        <SectionTitle
          kicker="Salesforce Development"
          title="Custom Salesforce solutions to streamline your business operations"
          desc="We build, customize, and optimize Salesforce implementations that align with your business processes — from custom apps to automation, integrations, and analytics."
        />
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-8 flex justify-center">
          <Link
            to="/salesforce-expertise"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-emerald-400 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            <Cloud className="h-5 w-5" />
            Explore Our Salesforce Expertise
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>

      <div className="grid gap-4 lg:grid-cols-3">
        <Reveal delay={0.05}>
          <Card
            icon={Cloud}
            title="Salesforce Implementation"
            desc="End-to-end Salesforce setup tailored to your business needs."
            bullets={[
              "Sales Cloud & Service Cloud setup",
              "Custom object & field creation",
              "User roles & permissions",
              "Data migration & import",
              "Training & documentation",
            ]}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Card
            icon={Code2}
            title="Custom Development"
            desc="Build custom functionality with Apex, LWC, and Visualforce."
            bullets={[
              "Apex classes & triggers",
              "Lightning Web Components (LWC)",
              "Visualforce pages",
              "Custom APIs & integrations",
              "AppExchange app development",
            ]}
          />
        </Reveal>
        <Reveal delay={0.15}>
          <Card
            icon={Settings}
            title="Process Automation"
            desc="Automate workflows to increase efficiency and reduce manual work."
            bullets={[
              "Flow Builder automation",
              "Process Builder & workflows",
              "Approval processes",
              "Email alerts & notifications",
              "Scheduled jobs & batch processes",
            ]}
          />
        </Reveal>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Reveal delay={0.05}>
          <Card
            icon={Webhook}
            title="Integration Solutions"
            desc="Connect Salesforce with your existing tools and platforms."
            bullets={[
              "REST/SOAP API integrations",
              "Third-party app connections",
              "ERP & accounting systems",
              "Marketing automation tools",
              "Real-time data synchronization",
            ]}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Card
            icon={Database}
            title="Reports & Dashboards"
            desc="Data-driven insights for better decision making."
            bullets={[
              "Custom report types",
              "Interactive dashboards",
              "Sales & pipeline analytics",
              "Service metrics tracking",
              "Einstein Analytics integration",
            ]}
          />
        </Reveal>
      </div>

      <Reveal>
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold text-white">Deliverables</div>
              <div className="mt-1 text-sm text-zinc-300">
                Complete Salesforce configuration, custom development code, integration setup, comprehensive documentation, user training, and ongoing support.
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
              <ChevronRight className="h-4 w-4" />
              Analyze → build → deploy
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-emerald-400/10 p-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold text-white">Learn more about our Salesforce expertise</div>
              <div className="mt-1 text-sm text-zinc-300">
                Discover our 5+ years of Salesforce development experience, key achievements, and successful project implementations.
              </div>
            </div>
            <Link
              to="/salesforce-expertise"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:opacity-90"
            >
              View Our Expertise <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Reveal>

      <MiniCTA />
    </div>
  );
}

function PanelMarketing() {
  return (
    <div className="grid gap-6">
      <Reveal>
        <SectionTitle
          kicker="Digital Marketing (Meta • TikTok • Google)"
          title="Performance marketing focused on leads, sales, and ROAS"
          desc="We create full-funnel ad systems with creative testing, audience segmentation, tracking, and optimization — built to generate real inquiries or purchases at the lowest possible cost."
        />
      </Reveal>

      <div className="grid gap-4 lg:grid-cols-3">
        <Reveal delay={0.05}>
          <Card
            icon={Megaphone}
            title="Meta Ads (Facebook/Instagram)"
            desc="Leads and sales campaigns with retargeting and conversion optimization."
            bullets={[
              "Business Manager setup",
              "Pixel & events tracking",
              "Awareness → retargeting → conversion",
              "WhatsApp + lead forms",
              "Scaling with controlled spend",
            ]}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Card
            icon={Video}
            title="TikTok Ads"
            desc="Short-form performance creatives built for reach and conversion."
            bullets={[
              "UGC style concepts",
              "Hook + benefit + CTA scripts",
              "Interest & lookalike targeting",
              "Landing pages for TikTok",
              "Creative rotation system",
            ]}
          />
        </Reveal>
        <Reveal delay={0.15}>
          <Card
            icon={Search}
            title="Google Ads"
            desc="Search + shopping campaigns capturing high-intent buyers."
            bullets={[
              "Search campaigns (high intent)",
              "Remarketing (display/YouTube)",
              "Shopping feed (if applicable)",
              "Conversion tracking",
              "Keyword + landing optimization",
            ]}
          />
        </Reveal>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Reveal delay={0.05}>
          <Card
            icon={Target}
            title="Funnel & targeting"
            desc="We don’t just run ads — we build a system that improves over time."
            bullets={[
              "Audience research & segmentation",
              "Warm retargeting pools",
              "Offer & angle testing",
              "Landing page matching",
              "Budget scaling rules",
            ]}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Card
            icon={BarChart3}
            title="Tracking & reporting"
            desc="Clear dashboards and actionable performance insights."
            bullets={[
              "Event setup (lead/purchase)",
              "ROAS / CPA monitoring",
              "Creative performance reporting",
              "Weekly optimization notes",
              "Scaling recommendations",
            ]}
          />
        </Reveal>
      </div>

      <Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          <Stat icon={Wallet} label="Budget style" value="Controlled spend" />
          <Stat icon={TrendingUp} label="Goal" value="Lower CPA / higher ROAS" />
          <Stat icon={Users} label="Outcome" value="Qualified leads / buyers" />
        </div>
      </Reveal>

      <MiniCTA />
    </div>
  );
}

function PanelSocial() {
  return (
    <div className="grid gap-6">
      <Reveal>
        <SectionTitle
          kicker="Social Media Management"
          title="A consistent content system that builds trust and supports ads"
          desc="We manage your Instagram/Facebook presence with a defined brand style, content pillars, posting plan, and conversion-driven profile setup — so your page looks active, credible, and ready for paid scaling."
        />
      </Reveal>

      <div className="grid gap-4 lg:grid-cols-3">
        <Reveal delay={0.05}>
          <Card
            icon={Instagram}
            title="Profile optimization"
            desc="We fix the basics that increase trust immediately."
            bullets={[
              "Bio & category optimization",
              "CTA buttons (WhatsApp/Call)",
              "Highlights structure",
              "Brand colors & grid style",
              "Pinned posts strategy",
            ]}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Card
            icon={Layers}
            title="Content pillars"
            desc="A system that keeps content consistent and purposeful."
            bullets={[
              "Product/service showcases",
              "Offers & promotions",
              "Educational posts",
              "Trust posts (proof/reviews)",
              "Engagement content",
            ]}
          />
        </Reveal>
        <Reveal delay={0.15}>
          <Card
            icon={Clapperboard}
            title="Reels & short-form"
            desc="Reels for reach + authority + retargeting fuel."
            bullets={[
              "Hook + script writing",
              "Basic shot list guidance",
              "Editing style direction",
              "Posting cadence",
              "Best practices for reach",
            ]}
          />
        </Reveal>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Reveal delay={0.05}>
          <Card
            icon={ShieldCheck}
            title="Trust system"
            desc="Social proof and clarity that helps close leads."
            bullets={[
              "Testimonials & reviews format",
              "Order dispatch / behind-the-scenes",
              "FAQ posts",
              "Story highlights proof",
              "Brand tone consistency",
            ]}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Card
            icon={BarChart3}
            title="Monthly planning"
            desc="We plan, produce, post, and improve based on performance."
            bullets={[
              "Monthly content calendar",
              "Caption + hashtag strategy",
              "Engagement monitoring",
              "Creative improvements",
              "Reporting & next steps",
            ]}
          />
        </Reveal>
      </div>

      <MiniCTA />
    </div>
  );
}

function PanelDesign() {
  return (
    <div className="grid gap-6">
      <Reveal>
        <SectionTitle
          kicker="Graphic Designing"
          title="High-impact visuals for ads, social, and brand identity"
          desc="We design modern creatives that match your brand style and make offers easy to understand — so users stop scrolling and take action."
        />
      </Reveal>

      <div className="grid gap-4 lg:grid-cols-3">
        <Reveal delay={0.05}>
          <Card
            icon={Brush}
            title="Social media creatives"
            desc="Clean, modern post designs that stay consistent."
            bullets={[
              "Post & story templates",
              "Carousel designs",
              "Highlight covers",
              "Offer banners",
              "Content branding system",
            ]}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Card
            icon={Target}
            title="Ads creatives"
            desc="Performance-first designs for Meta/TikTok/Google."
            bullets={[
              "Ad static creatives",
              "Creative testing variations",
              "Thumb-stopping hooks",
              "Offer clarity layouts",
              "Multiple aspect ratios",
            ]}
          />
        </Reveal>
        <Reveal delay={0.15}>
          <Card
            icon={PenTool}
            title="Brand identity"
            desc="Logo + brand kits that look premium everywhere."
            bullets={[
              "Logo variations",
              "Color palette & typography",
              "Brand guidelines",
              "Icons and patterns",
              "Consistency across platforms",
            ]}
          />
        </Reveal>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Reveal delay={0.05}>
          <Card
            icon={Layers}
            title="Packaging & print"
            desc="Product packaging and print-ready designs."
            bullets={[
              "Label & box design",
              "Print-ready files",
              "Barcode / batch placements",
              "Mockups for presentation",
              "Premium finishing guidance",
            ]}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Card
            icon={Palette}
            title="Template systems"
            desc="Reusable design systems for your team."
            bullets={[
              "Canva templates (optional)",
              "Editable PSD/AI files",
              "Brand-safe grid systems",
              "Content kit setup",
              "Multi-language support",
            ]}
          />
        </Reveal>
      </div>

      <MiniCTA />
    </div>
  );
}

function PanelVideo() {
  return (
    <div className="grid gap-6">
      <Reveal>
        <SectionTitle
          kicker="Video Editing"
          title="Short-form edits that drive reach, retention, and conversions"
          desc="We edit reels, TikToks, and ads with modern pacing, strong hooks, and clean captions — optimized for mobile viewing and performance."
        />
      </Reveal>

      <div className="grid gap-4 lg:grid-cols-3">
        <Reveal delay={0.05}>
          <Card
            icon={Film}
            title="Reels / TikTok edits"
            desc="Fast-paced edits built for social algorithms."
            bullets={[
              "Hook-first pacing",
              "Smooth cuts & transitions",
              "Music syncing",
              "Trend-aware style",
              "Export for multiple ratios",
            ]}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Card
            icon={Captions}
            title="Captions & subtitles"
            desc="Readable captions that increase retention."
            bullets={[
              "Clean subtitle styling",
              "Urdu/English support",
              "Emphasis keywords",
              "Safe area placement",
              "Brand-style captions",
            ]}
          />
        </Reveal>
        <Reveal delay={0.15}>
          <Card
            icon={Clapperboard}
            title="Ad edits"
            desc="Performance edits for Meta/TikTok campaigns."
            bullets={[
              "Multiple hooks/variants",
              "Offer overlays",
              "CTA end cards",
              "UGC style editing",
              "Test-ready outputs",
            ]}
          />
        </Reveal>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Reveal delay={0.05}>
          <Card
            icon={Video}
            title="Content packages"
            desc="A repeatable monthly content plan for consistent output."
            bullets={[
              "10–30 reels/month options",
              "Story clips & cutdowns",
              "Ad creative variations",
              "Thumbnails and covers",
              "Content calendar support",
            ]}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Card
            icon={Smartphone}
            title="Mobile-first delivery"
            desc="We deliver formats that work across platforms."
            bullets={[
              "9:16 primary exports",
              "1:1 and 4:5 versions",
              "Optimized bitrate",
              "Platform-safe captions",
              "Fast delivery workflow",
            ]}
          />
        </Reveal>
      </div>

      <MiniCTA />
    </div>
  );
}

function PanelBrand() {
  return (
    <div className="grid gap-6">
      <Reveal>
        <SectionTitle
          kicker="Brand Building"
          title="Complete brand systems: identity, website, content, and performance growth"
          desc="We build full brand ecosystems from scratch — positioning, identity, website, social presence, and ads funnels — so your brand looks premium and grows consistently."
        />
      </Reveal>

      <div className="grid gap-4 lg:grid-cols-3">
        <Reveal delay={0.05}>
          <Card
            icon={Wand2}
            title="Brand strategy"
            desc="Positioning, messaging, and offer clarity."
            bullets={[
              "Brand positioning",
              "Audience personas",
              "Offer & pricing strategy",
              "Messaging framework",
              "Competitive analysis",
            ]}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Card
            icon={Palette}
            title="Identity system"
            desc="Visual identity that stays consistent everywhere."
            bullets={[
              "Logo + variations",
              "Color palette",
              "Typography system",
              "Templates & guidelines",
              "Content style direction",
            ]}
          />
        </Reveal>
        <Reveal delay={0.15}>
          <Card
            icon={Megaphone}
            title="Growth system"
            desc="Organic + paid system designed for real results."
            bullets={[
              "Content + ads alignment",
              "Full-funnel campaigns",
              "Retargeting systems",
              "Landing pages for offers",
              "Scaling roadmap",
            ]}
          />
        </Reveal>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Reveal delay={0.05}>
          <Card
            icon={ShieldCheck}
            title="Trust building"
            desc="Credibility assets that increase conversion rates."
            bullets={[
              "Testimonials system",
              "Case study pages",
              "Brand proof assets",
              "FAQ + objection handling",
              "Authority content",
            ]}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Card
            icon={BarChart3}
            title="Execution roadmap"
            desc="Clear phases with deliverables and timelines."
            bullets={[
              "Phase 1: Foundation",
              "Phase 2: Visibility",
              "Phase 3: Performance",
              "Phase 4: Scale",
              "Monthly optimization",
            ]}
          />
        </Reveal>
      </div>

      <Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          <Stat icon={LayoutGrid} label="Foundation" value="Brand + website" />
          <Stat icon={Users} label="Visibility" value="Social + content" />
          <Stat icon={Target} label="Performance" value="Ads + conversion" />
        </div>
      </Reveal>

      <MiniCTA />
    </div>
  );
}

function TabPanel({ active }) {
  if (active === "web") return <PanelWeb />;
  if (active === "salesforce") return <PanelSalesforce />;
  if (active === "marketing") return <PanelMarketing />;
  if (active === "social") return <PanelSocial />;
  if (active === "design") return <PanelDesign />;
  if (active === "video") return <PanelVideo />;
  return <PanelBrand />;
}

export default function ServicesPage() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [activeTab, setActiveTab] = useState("web");

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 650], [0, -50]);
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0.9]);
  const heroRef = useRef(null);

  return (
    <>
      <Helmet>
        <title>IT Meta Solutions - Services | Web Development, Digital Marketing & Branding</title>
        <meta name="description" content="Explore IT Meta Solutions' comprehensive digital services: custom web development, SEO optimization, social media marketing, Google & Meta ads, graphic design, video editing, and brand building for businesses worldwide." />
        <meta name="keywords" content="web development services, digital marketing agency, SEO services, social media marketing, Meta ads, Google ads, TikTok marketing, graphic design, video editing, brand building, IT Meta Solutions" />
        <meta property="og:title" content="IT Meta Solutions - Services | Web Development, Digital Marketing & Branding" />
        <meta property="og:description" content="Explore IT Meta Solutions' comprehensive digital services: custom web development, SEO optimization, social media marketing, Google & Meta ads, graphic design, video editing, and brand building for businesses worldwide." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://itmetasolutions.com/services" />
        <meta property="og:url" content="https://itmetasolutions.com/services" />
        <meta property="og:image" content="https://itmetasolutions.com/favicon.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="IT Meta Solutions - Services | Web Development, Digital Marketing & Branding" />
        <meta name="twitter:description" content="Explore IT Meta Solutions' comprehensive digital services: custom web development, SEO optimization, social media marketing, Google & Meta ads, graphic design, video editing, and brand building for businesses worldwide." />
        <meta name="twitter:image" content="https://itmetasolutions.com/favicon.webp" />
      </Helmet>

      <div className="min-h-screen text-zinc-100 mb-16 overflow-x-hidden">
      <ScrollProgress />

      {/* Background accents */}
      <GradientBlob className="bg-[radial-gradient(closest-side,rgba(99,102,241,0.55),rgba(99,102,241,0))] bg-[length:560px_560px] bg-left-top" />
      <GradientBlob className="bg-[radial-gradient(closest-side,rgba(16,185,129,0.5),rgba(16,185,129,0))] bg-[length:560px_560px] bg-right-top" />

      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden">
        <Container className="pb-12 pt-24 sm:pb-16 sm:pt-32">
          <motion.div style={{ y: heroY, opacity: heroOpacity }}>
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <Pill icon={ShieldCheck}>Full-service agency</Pill>
                <Pill icon={LayoutGrid}>Web</Pill>
                <Pill icon={Cloud}>Salesforce</Pill>
                <Pill icon={Megaphone}>Ads</Pill>
                <Pill icon={Palette}>Design</Pill>
                <Pill icon={Clapperboard}>Video</Pill>
                <Pill icon={Wand2}>Brand</Pill>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <SectionTitle
                kicker="Services"
                title="Everything you need to build a premium brand and grow fast"
                desc="Choose a service tab to see deliverables, workflow, and what you get. This page is designed for quick understanding and strong conversions."
                level="h1"
              />
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                <Stat icon={LayoutGrid} label="Build" value="Website & Store" />
                <Stat icon={Megaphone} label="Grow" value="Meta/TikTok/Google" />
                <Stat icon={Palette} label="Create" value="Design & Video" />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                  <div className="max-w-2xl">
                    <div className="text-sm font-semibold text-white">Fast inquiry</div>
                    <div className="mt-1 text-sm text-zinc-300">
                      Want a quick quote? Share your industry, target city/country, and budget range — we’ll reply with a plan.
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="https://wa.me/923271804037"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:opacity-90"
                    >
                      WhatsApp us <Phone className="h-4 w-4" />
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                    >
                      Get a proposal <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </motion.div>
        </Container>
      </section>

      {/* STICKY TAB NAV */}
      <StickyTabs active={activeTab} onChange={setActiveTab} />

      {/* TAB CONTENT */}
      <section className="py-16 sm:py-24">
        <Container>
          <TabPanel active={activeTab} />

        </Container>
      </section>
    </div>
    </>
  );
}
