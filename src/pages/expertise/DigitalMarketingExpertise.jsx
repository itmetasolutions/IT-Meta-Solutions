import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  Globe,
  Landmark,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
  Gauge,
  LayoutGrid,
  Megaphone,
  BarChart3,
  MessageSquareText,
  FileSearch,
  LineChart,
  PieChart,
  PenTool,
  Instagram,
  Store,
  Home,
  Briefcase,
  ShoppingCart,
  GraduationCap,
  Heart,
  DollarSign,
  Leaf,
  Wifi,
  MapPin,
  Phone,
  MousePointerClick,
  CalendarDays,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import SeoContentFaq from "../../components/SeoContentFaq";
import SubpageVisualLayer from "../../components/SubpageVisualLayer";

/**
 * Digital Marketing Service / Expertise Page — IT Meta Solutions
 * Template matches your provided Web Dev Expertise page:
 * - Dark glass cards + gradients
 * - Scroll progress
 * - Parallax hero
 * - Sticky section nav (active state)
 *
 * Uses data/style from your Multidatum + UMT case studies:
 * - Data-driven strategy, social media growth
 * - Meta Ads funnel (Awareness → Retargeting → Leads)
 * - Lead-focused CTAs + WhatsApp conversion paths
 * - 5+ years experience
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
  kicker: "Digital Marketing",
  title: "Performance Marketing and Meta Ads for Growth",
  subtitle:
    "We build scalable Meta Ads strategies, lower CPA, and improve ROAS for ecommerce and lead generation.",
  paragraphs: [
    "Our performance marketing team combines creative testing, audience segmentation, and analytics to drive consistent results.",
    "We support ecommerce brands, real estate lead gen, and startups looking for data-driven growth.",
  ],
  bullets: [
    "Meta Ads agency for ecommerce and lead generation",
    "Scalable advertising strategies with ROAS optimization",
    "Lower CPA through testing and funnel optimization",
    "Data-driven marketing campaigns across channels",
  ],
};

const seoFaqs = [
  {
    q: "Do you specialize in Meta Ads for ecommerce?",
    a: "Yes. We run performance marketing for online stores with ROAS and CPA targets.",
  },
  {
    q: "Can you improve ROAS and lower CPA?",
    a: "Yes. We test creatives, optimize audiences, and improve landing pages to raise ROAS.",
  },
  {
    q: "Do you handle lead generation campaigns?",
    a: "Yes. We build lead gen funnels for real estate, services, and SaaS brands.",
  },
  {
    q: "What reporting do you provide?",
    a: "Weekly and monthly reports covering spend, ROAS, CPA, and conversion growth.",
  },
];

function Container({ children, className }) {
  return <div className={cx("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
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
        "bg-[radial-gradient(closest-side,rgba(80,37,209,0.55),rgba(80,37,209,0))]",
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
      className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-[#5025d1] via-emerald-400 to-fuchsia-500"
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
        <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-[#5025d1]/25 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />
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
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
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
    <div className="sticky top-24 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur">
      <Container className="py-4">
        <nav className="flex flex-wrap gap-2">
          {items.map((item) => (
            <AnchorLink
              key={item.href}
              href={item.href}
              className={cx(
                "rounded-xl px-4 py-2 text-sm transition",
                active === item.href ? "bg-white text-zinc-950" : "text-zinc-300 hover:bg-white/10"
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

export default function DigitalMarketingExpertisePage() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -100]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.85]);
  const heroRef = useRef(null);

  return (
    <>
      <Helmet>
        <title>Digital Marketing Services - IT Meta Solutions</title>
        <meta
          name="description"
          content="Performance marketing and Meta Ads for ecommerce and lead gen, focused on ROAS optimization and lower CPA."
        />
        <meta
          name="keywords"
          content="digital marketing, social media marketing, meta ads, facebook ads, instagram growth, lead generation, content strategy, analytics, SEO, IT Meta Solutions"
        />
        <meta property="og:title" content="Digital Marketing Services - IT Meta Solutions" />
        <meta
          property="og:description"
          content="5+ years of digital marketing expertise: data-driven strategy, social media growth, Meta Ads funnel, SEO-ready content architecture, and lead-focused conversion systems."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://itmetasolutions.com/digital-marketing-services" />
      </Helmet>

      <div className="itms-subpage relative min-h-screen text-zinc-100 mb-16 overflow-hidden">
        <SubpageVisualLayer />

        <ScrollProgress />

        {/* Background accents */}
        <GradientBlob className="h-[640px] w-[640px] -left-40 -top-40" />
        <GradientBlob className="h-[620px] w-[620px] -right-40 top-72 bg-[radial-gradient(closest-side,rgba(16,185,129,0.5),rgba(16,185,129,0))]" />

        {/* HERO */}
        <section ref={heroRef} className="relative overflow-hidden">
          <Container className="pb-10 pt-24 sm:pb-14 sm:pt-32">
            <motion.div style={{ y: heroY, opacity: heroOpacity }}>
              <Reveal>
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <Pill icon={Megaphone}>Digital Marketing</Pill>
                  <Pill icon={Target}>Growth Strategy</Pill>
                  <Pill icon={BarChart3}>Data-Driven</Pill>
                  <Pill icon={Instagram}>Social Media</Pill>
                  <Pill icon={MousePointerClick}>Lead Generation</Pill>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  Digital Marketing Services
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-zinc-300 max-w-3xl">
                  IT Meta Solutions brings <span className="text-white font-semibold">5+ years</span> of experience building
                  growth systems that convert: clear positioning, content strategy, social media management, Meta Ads funnels,
                  and analytics-driven optimization — designed for measurable brand impact.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  <Stat icon={TrendingUp} label="Experience" value="5+ years" />
                  <Stat icon={Target} label="Focus" value="Lead-ready funnels" />
                  <Stat icon={LineChart} label="Approach" value="Strategy → results" />
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
                title="Marketing that feels clear — and performs"
                desc="We structure brands like decision-makers think: clear offers, simple messaging, strong proof, and conversion paths that turn attention into inquiries."
              />
            </Reveal>

            <Reveal delay={0.05}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-8">
                <p className="text-base leading-relaxed text-zinc-300">
                  Our core method is simple: build a clean brand foundation, then deploy a repeatable growth system.
                  That means content pillars, SEO-ready pages, and paid campaigns that match user intent (Awareness → Retargeting → Leads).
                </p>
                <p className="mt-4 text-base leading-relaxed text-zinc-300">
                  Whether it’s an agency-style brand like Multidatum (data-driven growth) or a high-intent niche like Islamic travel,
                  we focus on clarity, trust, and conversion — especially on mobile-first traffic.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <Card
                  icon={MessageSquareText}
                  title="Clear messaging"
                  bullets={[
                    "Value props written for decision-makers",
                    "Outcomes-focused copy",
                    "Simple explanations of complex strategy",
                  ]}
                />
                <Card
                  icon={ShieldCheck}
                  title="Trust-first system"
                  bullets={[
                    "Proof modules (case studies / outcomes)",
                    "Consistent identity across channels",
                    "Compliance-ready pages (privacy, credibility)",
                  ]}
                />
                <Card
                  icon={Zap}
                  title="Conversion paths"
                  bullets={[
                    "Lead-focused CTAs",
                    "WhatsApp-first / form workflows",
                    "Funnel-ready landing structure",
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
                kicker="Digital Marketing Expertise"
                title="Full-funnel growth services"
                desc="From brand positioning to social content and paid acquisition — we build the structure, then optimize it with data."
              />
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <Reveal delay={0.05}>
                <Card
                  icon={Target}
                  title="Strategy & positioning"
                  desc="Make your offer instantly understandable and differentiable."
                  bullets={[
                    "Positioning & messaging framework",
                    "Offer clarity + service architecture",
                    "Content pillars & campaign themes",
                    "Audience segmentation plan",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.1}>
                <Card
                  icon={Instagram}
                  title="Social media management"
                  desc="A consistent identity that builds recall and trust."
                  bullets={[
                    "IG/FB content planning + calendar",
                    "Highlights structure & profile optimization",
                    "Creative direction (Islamic tone, brand-safe visuals)",
                    "Synergy with paid campaigns",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.15}>
                <Card
                  icon={Megaphone}
                  title="Meta Ads & lead generation"
                  desc="Funnels designed to convert on low-to-mid budgets."
                  bullets={[
                    "Awareness → retargeting → leads funnel",
                    "Click-to-WhatsApp + instant forms",
                    "Creative & copy variants testing",
                    "Tracking foundations (pixel/events setup)",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.2}>
                <Card
                  icon={BarChart3}
                  title="Analytics & optimization"
                  desc="Measure what matters and improve performance continuously."
                  bullets={[
                    "Campaign reporting & insights",
                    "Creative performance review",
                    "Landing page conversion improvements",
                    "Scaling plan for seasonal campaigns",
                  ]}
                />
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.03] p-6">
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                  <div className="max-w-2xl">
                    <div className="text-sm font-semibold text-white">What you get</div>
                    <div className="mt-1 text-sm text-zinc-300">
                      A clear brand foundation + a repeatable acquisition system: strategy, creative, social management, paid funnels,
                      and measurement — built to generate inquiries and sales.
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
                    <ChevronRight className="h-4 w-4" />
                    Build → optimize → scale
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          <Divider />

          {/* ACHIEVEMENTS */}
          <section id="achievements">
            <Reveal>
              <SectionTitle
                kicker="Key Achievements"
                title="Systems that create outcomes"
                desc="Our focus is not “posting more” — it’s building funnels, clarity, and conversion paths that perform."
              />
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <Reveal delay={0.05}>
                <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 mb-4">
                    <TrendingUp className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">5+</div>
                  <div className="mt-1 text-sm text-zinc-300">Years Experience</div>
                  <p className="mt-3 text-xs text-zinc-400">Growth systems across multiple industries and budgets</p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 mb-4">
                    <MousePointerClick className="h-6 w-6 text-[#5025d1]" />
                  </div>
                  <div className="text-3xl font-bold text-white">Funnels</div>
                  <div className="mt-1 text-sm text-zinc-300">Awareness → Leads</div>
                  <p className="mt-3 text-xs text-zinc-400">Repeatable, scalable structure for seasonal and evergreen offers</p>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 mb-4">
                    <Phone className="h-6 w-6 text-fuchsia-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">Lead paths</div>
                  <div className="mt-1 text-sm text-zinc-300">WhatsApp + forms</div>
                  <p className="mt-3 text-xs text-zinc-400">Mobile-first conversion flows that reduce drop-off</p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="mt-10 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/15 to-[#5025d1]/10 p-7">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-medium text-emerald-300">
                        <TrendingUp className="h-3 w-3" />
                        Featured Case Study
                      </span>
                    </div>
                    <div className="text-lg font-semibold text-white">Ekommart — 3,300+ Purchases in 5 Months</div>
                    <div className="mt-1 text-sm text-zinc-300">
                      Complete e-commerce brand build with Meta Ads funnel achieving 164 PKR cost per purchase. From messaging campaigns to purchase-optimized sales ads.
                    </div>
                  </div>
                  <a
                    href="/case-study/ekommart"
                    className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-600 transition"
                  >
                    View Case Study <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Reveal>
          </section>

          <Divider />

          {/* SKILLS */}
          <section id="skills">
            <Reveal>
              <SectionTitle
                kicker="Core Skills"
                title="Modern marketing stack + creative execution"
                desc="We combine brand strategy, creative, performance marketing, and reporting into one system."
              />
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              <Reveal delay={0.05}>
                <Card
                  icon={Megaphone}
                  title="Paid acquisition"
                  bullets={[
                    "Meta Ads (FB/IG)",
                    "Funnel planning & retargeting",
                    "Lead forms + Click-to-WhatsApp",
                    "Creative testing frameworks",
                    "Campaign optimization mindset",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.1}>
                <Card
                  icon={PenTool}
                  title="Content & social"
                  bullets={[
                    "Content pillars + calendars",
                    "Brand-safe creative direction",
                    "IG/FB profile optimization",
                    "Highlights structure",
                    "Copywriting (Urdu + English mix if needed)",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.15}>
                <Card
                  icon={FileSearch}
                  title="SEO + structure"
                  bullets={[
                    "Intent-based page architecture",
                    "Service pages + internal linking",
                    "Content blocks for inbound growth (blog/insights)",
                    "Conversion-ready landing structure",
                    "Performance-friendly layout planning",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.2}>
                <Card
                  icon={BarChart3}
                  title="Analytics & reporting"
                  bullets={[
                    "Performance dashboards & summaries",
                    "Campaign insights → actions",
                    "Conversion path analysis",
                    "Creative performance reviews",
                    "Scaling roadmap",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.25}>
                <Card
                  icon={Gauge}
                  title="Conversion optimization"
                  bullets={[
                    "CTA placements & hierarchy",
                    "Lead-focused forms",
                    "WhatsApp-first flow design",
                    "Trust modules (proof, structure, clarity)",
                    "Mobile-first UX improvements",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.3}>
                <Card
                  icon={CalendarDays}
                  title="Campaign planning"
                  bullets={[
                    "Seasonal planning (Ramadan / Hajj peaks)",
                    "Offer + creative mapping",
                    "Audience segmentation plan",
                    "Launch → optimize → scale cycle",
                    "Consistency systems",
                  ]}
                />
              </Reveal>
            </div>
          </section>

          <Divider />

          {/* INDUSTRIES */}
          <section id="industries">
            <Reveal>
              <SectionTitle
                kicker="Industries We Serve"
                title="High-intent niches + growth brands"
                desc="We’ve structured marketing systems for brands that rely on trust, clarity, and conversions — across multiple categories."
              />
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Reveal delay={0.05}>
                <Card
                  icon={Landmark}
                  title="Travel & Religious Tourism"
                  desc="High-intent leads for Umrah/Hajj, seasonal campaigns, WhatsApp conversion paths."
                />
              </Reveal>

              <Reveal delay={0.1}>
                <Card
                  icon={Store}
                  title="E-Commerce & Retail"
                  desc="Offer clarity, creatives, and paid funnels built for product sales and repeat buyers."
                />
              </Reveal>

              <Reveal delay={0.15}>
                <Card
                  icon={Home}
                  title="Real Estate & Property"
                  desc="Lead capture structures for rentals, sales, listings, and trust-first positioning."
                />
              </Reveal>

              <Reveal delay={0.2}>
                <Card
                  icon={Briefcase}
                  title="Agencies & Professional Services"
                  desc="Positioning-led messaging, portfolio structure, consultation CTAs, and inbound growth."
                />
              </Reveal>

              <Reveal delay={0.25}>
                <Card
                  icon={Heart}
                  title="Healthcare & Wellness"
                  desc="Trust messaging, service clarity, and ethical communication with conversion paths."
                />
              </Reveal>

              <Reveal delay={0.3}>
                <Card
                  icon={GraduationCap}
                  title="Education"
                  desc="Enrollment funnels, awareness campaigns, and content for authority building."
                />
              </Reveal>

              <Reveal delay={0.35}>
                <Card
                  icon={DollarSign}
                  title="Finance & Insurance"
                  desc="Compliance-first trust and structured lead capture with careful messaging."
                />
              </Reveal>

              <Reveal delay={0.4}>
                <Card
                  icon={Leaf}
                  title="Natural & Organic Brands"
                  desc="Story-led content + performance campaigns for premium, trust-based products."
                />
              </Reveal>

              <Reveal delay={0.45}>
                <Card
                  icon={Wifi}
                  title="Technology & SaaS"
                  desc="Value proposition messaging, conversion pages, and measurable acquisition systems."
                />
              </Reveal>
            </div>
          </section>

          <Divider />

          <SeoContentFaq content={seoContent} faqs={seoFaqs} />

          {/* CTA */}
          <section>
            <Reveal>
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#5025d1]/15 to-emerald-400/10 p-8 md:p-12">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl font-bold text-white mb-4">Ready to grow with a real funnel?</h2>
                  <p className="text-lg text-zinc-300 mb-8">
                    Let’s build your strategy, content, and paid system — designed to convert visitors into leads and customers.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-zinc-950 hover:opacity-90 transition"
                    >
                      Get a Proposal <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href="/work?filter=marketing"
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
                    >
                      View Marketing Work
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>
        </Container>

        <div className="h-20" />
      </div>
    </>
  );
}
