import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  Sparkles,
  Search,
  FileSearch,
  LineChart,
  Gauge,
  Target,
  ShieldCheck,
  BarChart3,
  LayoutGrid,
  MapPin,
  Landmark,
  Store,
  Home,
  Briefcase,
  Heart,
  GraduationCap,
  DollarSign,
  Leaf,
  Wifi,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import SeoContentFaq from "../../components/SeoContentFaq";
import SubpageVisualLayer from "../../components/SubpageVisualLayer";

/**
 * SEO Service / Expertise Page - IT Meta Solutions
 * Template aligned with existing expertise pages:
 * - Dark glass cards + gradients
 * - Scroll progress
 * - Static hero
 * - Sticky section nav
 */

const cx = (...c) => c.filter(Boolean).join(" ");

const nav = [
  { label: "Overview", href: "#overview" },
  { label: "Expertise", href: "#expertise" },
  { label: "Results", href: "#results" },
  { label: "Skills", href: "#skills" },
  { label: "Industries", href: "#industries" },
];

const seoContent = {
  kicker: "SEO",
  title: "Search visibility that drives qualified leads",
  subtitle:
    "We combine technical SEO, content strategy, and on-page optimization to grow traffic that converts.",
  paragraphs: [
    "Our SEO process is built for clarity and growth: fix technical blockers, structure pages around intent, and publish content that earns trust.",
    "From local services to ecommerce brands, we focus on sustainable rankings and measurable lead impact.",
  ],
  bullets: [
    "Technical audits and Core Web Vitals improvements",
    "On-page SEO and internal linking structure",
    "Content strategy and topic clusters",
    "Local SEO and Google Business Profile optimization",
  ],
};

const seoFaqs = [
  {
    q: "Do you handle technical SEO audits?",
    a: "Yes. We audit crawlability, indexing, speed, and Core Web Vitals, then implement fixes.",
  },
  {
    q: "Can you improve rankings for local businesses?",
    a: "Yes. We optimize Google Business Profiles, local pages, and citations to improve local visibility.",
  },
  {
    q: "Do you provide SEO content strategy?",
    a: "Yes. We map keyword intent to pages, build topic clusters, and plan content for growth.",
  },
  {
    q: "How do you report SEO progress?",
    a: "We provide reports on rankings, traffic, leads, and technical health with clear next steps.",
  },
];

function Container({ children, className }) {
  return <div className={cx("mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12", className)}>{children}</div>;
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
        "bg-[radial-gradient(closest-side,rgba(29,78,216,0.55),rgba(29,78,216,0))]",
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
      className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-[#1D4ED8] via-emerald-400 to-fuchsia-500"
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
        <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-[#1D4ED8]/25 blur-3xl" />
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

export default function SeoExpertisePage() {
  const heroRef = useRef(null);

  return (
    <>
      <Helmet>
        <title>SEO Services - IT Meta Solutions</title>
        <meta
          name="description"
          content="Technical SEO, on-page optimization, and content strategy to grow organic traffic and qualified leads."
        />
        <meta
          name="keywords"
          content="SEO services, technical SEO, on-page SEO, content strategy, local SEO, search optimization, IT Meta Solutions"
        />
        <meta property="og:title" content="SEO Services - IT Meta Solutions" />
        <meta
          property="og:description"
          content="Search optimization services focused on technical health, content strategy, and lead-ready pages."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://itmetasolutions.com/seo-expertise" />
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
            <motion.div>
              <Reveal>
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <Pill icon={Search}>SEO Services</Pill>
                  <Pill icon={FileSearch}>Technical SEO</Pill>
                  <Pill icon={LineChart}>Organic Growth</Pill>
                  <Pill icon={Gauge}>Core Web Vitals</Pill>
                  <Pill icon={Target}>Lead Intent</Pill>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  SEO Expertise
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-zinc-300 max-w-3xl">
                  IT Meta Solutions brings <span className="text-white font-semibold">5+ years</span> of SEO experience
                  building search-ready websites that rank, convert, and scale. We focus on technical health, clear page
                  structure, and content that matches real search intent.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  <Stat icon={LineChart} label="Experience" value="5+ years" />
                  <Stat icon={Search} label="Focus" value="Visibility + leads" />
                  <Stat icon={Gauge} label="Method" value="Technical + content" />
                </div>
              </Reveal>
            </motion.div>
          </Container>
        </section>

        {/* Hero banner image */}
        <section className="pb-6">
          <Container>
            <div className="relative h-64 sm:h-80 overflow-hidden rounded-2xl border border-white/[0.07]">
              <img
                src="https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=1400&q=80"
                alt="SEO Expertise"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141A2E]/80 via-[#141A2E]/20 to-transparent" />
            </div>
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
                title="SEO built for clarity, speed, and conversion"
                desc="We help brands rank with clean site architecture, fast load times, and content that answers what people are actually searching for."
              />
            </Reveal>

            <Reveal delay={0.05}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-8">
                <p className="text-base leading-relaxed text-zinc-300">
                  Our approach is simple: remove technical blockers, create an intent-based page structure, and build
                  content that turns traffic into inquiries. This keeps rankings stable and growth consistent.
                </p>
                <p className="mt-4 text-base leading-relaxed text-zinc-300">
                  Whether you need local SEO for services or scalable ecommerce SEO, we align strategy with your actual
                  revenue goals and reporting.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <Card
                  icon={ShieldCheck}
                  title="Technical foundation"
                  bullets={[
                    "Crawlability and indexing fixes",
                    "Schema and metadata structure",
                    "Core Web Vitals improvements",
                  ]}
                />
                <Card
                  icon={LayoutGrid}
                  title="Intent-based structure"
                  bullets={[
                    "Service and location pages",
                    "Internal linking hierarchy",
                    "Conversion-ready layouts",
                  ]}
                />
                <Card
                  icon={Target}
                  title="Lead-ready content"
                  bullets={[
                    "Topic clusters and landing pages",
                    "Clear CTAs and proof blocks",
                    "Content built for decision-makers",
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
                kicker="SEO Expertise"
                title="Full-scope SEO services"
                desc="We cover technical, on-page, content, and local SEO with clear deliverables and measurable impact."
              />
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <Reveal delay={0.05}>
                <Card
                  icon={FileSearch}
                  title="Technical SEO"
                  desc="Fix indexing, speed, and structure issues that block rankings."
                  bullets={[
                    "Site audits and fixes",
                    "Core Web Vitals optimization",
                    "Structured data and schema",
                    "Indexing and crawl control",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.1}>
                <Card
                  icon={LayoutGrid}
                  title="On-page SEO"
                  desc="Pages built around intent with strong internal linking."
                  bullets={[
                    "Title/metadata improvements",
                    "Content hierarchy and headings",
                    "Internal linking strategy",
                    "Conversion-focused layout",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.15}>
                <Card
                  icon={BarChart3}
                  title="Content strategy"
                  desc="Topic clusters and content planning that builds authority."
                  bullets={[
                    "Keyword and intent mapping",
                    "Service and blog structure",
                    "Content briefs and outlines",
                    "Authority-building content plan",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.2}>
                <Card
                  icon={MapPin}
                  title="Local SEO"
                  desc="Rank for local intent and convert nearby customers."
                  bullets={[
                    "Google Business Profile setup",
                    "Location and service pages",
                    "Citations and NAP consistency",
                    "Review generation guidance",
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
                      A structured SEO roadmap with technical fixes, content priorities, and a clear plan to improve
                      rankings and lead flow.
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
                    <ChevronRight className="h-4 w-4" />
                    Fix {"\u2192"} structure {"\u2192"} grow
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          <Divider />

          {/* RESULTS */}
          <section id="results">
            <Reveal>
              <SectionTitle
                kicker="Results"
                title="Search systems that improve visibility"
                desc="We focus on technical health, content clarity, and conversions so rankings turn into revenue."
              />
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <Reveal delay={0.05}>
                <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 mb-4">
                    <Search className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">Visibility</div>
                  <div className="mt-1 text-sm text-zinc-300">Search-ready structure</div>
                  <p className="mt-3 text-xs text-zinc-400">Clean architecture and intent-based pages that rank consistently.</p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 mb-4">
                    <Gauge className="h-6 w-6 text-[#1D4ED8]" />
                  </div>
                  <div className="text-3xl font-bold text-white">Performance</div>
                  <div className="mt-1 text-sm text-zinc-300">Core Web Vitals</div>
                  <p className="mt-3 text-xs text-zinc-400">Speed improvements that support both rankings and conversions.</p>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 mb-4">
                    <Target className="h-6 w-6 text-fuchsia-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">Intent</div>
                  <div className="mt-1 text-sm text-zinc-300">Lead-ready pages</div>
                  <p className="mt-3 text-xs text-zinc-400">Content that matches search intent and drives inquiries.</p>
                </div>
              </Reveal>
            </div>
          </section>

          <Divider />

          {/* SKILLS */}
          <section id="skills">
            <Reveal>
              <SectionTitle
                kicker="Core Skills"
                title="Modern SEO stack + execution"
                desc="We combine technical fixes, content planning, and conversion strategy into one system."
              />
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              <Reveal delay={0.05}>
                <Card
                  icon={FileSearch}
                  title="Technical SEO"
                  bullets={[
                    "Crawl and index control",
                    "Schema and structured data",
                    "Core Web Vitals improvements",
                    "Redirects and canonical strategy",
                    "Sitemap and robots setup",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.1}>
                <Card
                  icon={LayoutGrid}
                  title="On-page optimization"
                  bullets={[
                    "Title and meta optimization",
                    "Heading structure",
                    "Internal linking",
                    "Content clarity and formatting",
                    "CTR and SERP improvements",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.15}>
                <Card
                  icon={BarChart3}
                  title="Content strategy"
                  bullets={[
                    "Keyword intent mapping",
                    "Topic clusters",
                    "Service page planning",
                    "Editorial calendars",
                    "Content briefs and outlines",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.2}>
                <Card
                  icon={MapPin}
                  title="Local SEO"
                  bullets={[
                    "Google Business Profile",
                    "Local landing pages",
                    "Citations and NAP",
                    "Review strategy",
                    "Location tracking",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.25}>
                <Card
                  icon={LineChart}
                  title="Reporting and analytics"
                  bullets={[
                    "Rank tracking",
                    "Traffic and lead reporting",
                    "Page-level insights",
                    "Monthly SEO roadmap",
                    "Conversion tracking",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.3}>
                <Card
                  icon={Target}
                  title="Conversion alignment"
                  bullets={[
                    "CTA placement strategy",
                    "Trust and proof blocks",
                    "Lead form improvements",
                    "UX clarity for mobile",
                    "Landing page optimization",
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
                desc="We build SEO systems for brands that rely on trust, clarity, and conversions."
              />
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Reveal delay={0.05}>
                <Card
                  icon={Landmark}
                  title="Travel & Tourism"
                  desc="Search intent targeting for seasonal demand and bookings."
                />
              </Reveal>

              <Reveal delay={0.1}>
                <Card
                  icon={Store}
                  title="Ecommerce & Retail"
                  desc="Category structure, product SEO, and content for buyers."
                />
              </Reveal>

              <Reveal delay={0.15}>
                <Card
                  icon={Home}
                  title="Real Estate"
                  desc="Local pages and lead capture for high-intent searches."
                />
              </Reveal>

              <Reveal delay={0.2}>
                <Card
                  icon={Briefcase}
                  title="Agencies & Professional Services"
                  desc="Trust-focused pages that turn visits into inquiries."
                />
              </Reveal>

              <Reveal delay={0.25}>
                <Card
                  icon={Heart}
                  title="Healthcare & Wellness"
                  desc="Local SEO and credibility-focused content."
                />
              </Reveal>

              <Reveal delay={0.3}>
                <Card
                  icon={GraduationCap}
                  title="Education"
                  desc="Authority content and structured pages for enrollments."
                />
              </Reveal>

              <Reveal delay={0.35}>
                <Card
                  icon={DollarSign}
                  title="Finance & Insurance"
                  desc="Compliance-first content and lead-ready pages."
                />
              </Reveal>

              <Reveal delay={0.4}>
                <Card
                  icon={Leaf}
                  title="Natural & Organic Brands"
                  desc="Story-led content + search visibility."
                />
              </Reveal>

              <Reveal delay={0.45}>
                <Card
                  icon={Wifi}
                  title="Technology & SaaS"
                  desc="Value proposition messaging and search acquisition."
                />
              </Reveal>
            </div>
          </section>

          <Divider />

          <SeoContentFaq content={seoContent} faqs={seoFaqs} />

          {/* CTA */}
          <section>
            <Reveal>
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#1D4ED8]/15 to-emerald-400/10 p-8 md:p-12">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl font-bold text-white mb-4">Ready to grow your SEO?</h2>
                  <p className="text-lg text-zinc-300 mb-8">
                    Let us build your technical foundation and content roadmap for long-term rankings and leads.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-zinc-950 hover:opacity-90 transition"
                    >
                      Get an SEO Plan <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href="/work?filter=marketing"
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
                    >
                      View Related Work
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

