import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useInView } from "framer-motion";
import {
  ArrowRight, ShieldCheck, Target, Gauge, LayoutGrid, BarChart3, FileSearch,
  LineChart, Store, Home, Briefcase, Heart, GraduationCap, DollarSign, Leaf, Wifi,
  MapPin, Landmark, Search, CheckCircle2,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import SeoContentFaq from "../../components/SeoContentFaq";
import Container from "../../components/Container";

const cx = (...c) => c.filter(Boolean).join(" ");

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div aria-hidden className="fixed left-0 top-0 z-50 h-0.5 w-full origin-left bg-gradient-to-r from-[#1D4ED8] via-[#23A6E8] to-[#3AC9F5]" style={{ scaleX: scrollYProgress }} />;
}

function Reveal({ children, delay = 0, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function AnchorLink({ href, children, className }) {
  return <a href={href} onClick={(e) => { if (href?.startsWith?.("#")) { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" }); } }} className={className}>{children}</a>;
}

function LightCard({ icon: Icon, color = "#1D4ED8", title, desc, bullets, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div className="premium-card h-full rounded-2xl p-6">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: `${color}15` }}>
          <Icon className="h-5 w-5" style={{ color }} />
        </div>
        <h3 className="mb-2 text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
        {desc && <p className="text-sm text-slate-600 leading-relaxed mb-3">{desc}</p>}
        {bullets?.length ? (
          <ul className="space-y-2">{bullets.map((b, i) => <li key={i} className="flex items-start gap-2 text-sm text-slate-700"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color }} />{b}</li>)}</ul>
        ) : null}
      </div>
    </Reveal>
  );
}

function StickyNav({ items }) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const obs = new IntersectionObserver((e) => e.forEach((en) => { if (en.isIntersecting) setActive(`#${en.target.id}`); }), { rootMargin: "-20% 0px -70% 0px" });
    items.forEach(({ href }) => { const el = document.querySelector(href); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [items]);
  return (
    <div className="sticky top-[64px] z-40 border-b border-slate-100 bg-white/95 backdrop-blur-sm shadow-sm">
      <Container className="py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500"><Search className="h-3.5 w-3.5 text-[#1D4ED8]" />SEO Services</div>
          <div className="flex flex-wrap items-center gap-2">
            {items.map((item) => <AnchorLink key={item.href} href={item.href} className={cx("rounded-full border px-3 py-1.5 text-xs font-medium transition", active === item.href ? "border-[#1D4ED8] bg-[#1D4ED8] text-white" : "border-slate-200 bg-[#F1F4F9] text-slate-600 hover:border-[#1D4ED8]/40 hover:text-[#1D4ED8]")}>{item.label}</AnchorLink>)}
          </div>
        </div>
      </Container>
    </div>
  );
}

const nav = [
  { label: "Overview", href: "#overview" },
  { label: "Expertise", href: "#expertise" },
  { label: "Results", href: "#results" },
  { label: "Skills", href: "#skills" },
  { label: "Industries", href: "#industries" },
];

const seoContent = {
  kicker: "SEO",
  title: "Search Visibility That Drives Qualified Leads",
  subtitle: "We combine technical SEO, content strategy, and on-page optimization to grow traffic that converts.",
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
  { q: "Do you handle technical SEO audits?", a: "Yes. We audit crawlability, indexing, speed, and Core Web Vitals, then implement fixes." },
  { q: "Can you improve rankings for local businesses?", a: "Yes. We optimize Google Business Profiles, local pages, and citations to improve local visibility." },
  { q: "Do you provide SEO content strategy?", a: "Yes. We map keyword intent to pages, build topic clusters, and plan content for growth." },
  { q: "How do you report SEO progress?", a: "We provide reports on rankings, traffic, leads, and technical health with clear next steps." },
];

export default function SeoExpertisePage() {
  return (
    <>
      <Helmet>
        <title>SEO Services - IT Meta Solutions</title>
        <meta name="description" content="Technical SEO, on-page optimization, and content strategy to grow organic traffic and qualified leads." />
        <meta name="keywords" content="SEO services, technical SEO, on-page SEO, content strategy, local SEO, search optimization, IT Meta Solutions" />
        <meta property="og:title" content="SEO Services - IT Meta Solutions" />
        <meta property="og:description" content="Search optimization services focused on technical health, content strategy, and lead-ready pages." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://itmetasolutions.com/seo-expertise" />
      </Helmet>
      <ScrollProgress />

      {/* HERO */}
      <section className="relative bg-[#141A2E] overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="absolute inset-0 dot-grid-bg opacity-25 pointer-events-none" />
        <div className="absolute -top-32 right-0 w-[600px] h-[500px] rounded-full bg-[#1D4ED8]/10 blur-[120px] pointer-events-none" />
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex flex-wrap gap-2 mb-8">
              {[{ icon: Search, label: "SEO Services" }, { icon: FileSearch, label: "Technical SEO" }, { icon: LineChart, label: "Organic Growth" }, { icon: Gauge, label: "Core Web Vitals" }, { icon: Target, label: "Lead Intent" }].map((b) => (
                <span key={b.label} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-slate-300"><b.icon className="h-3.5 w-3.5 text-[#3AC9F5]" />{b.label}</span>
              ))}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              SEO <span className="animated-gradient-text">Expertise</span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-3xl leading-relaxed">IT Meta Solutions brings <span className="text-white font-semibold">5+ years</span> of SEO experience building search-ready websites that rank, convert, and scale. We focus on technical health, clear page structure, and content that matches real search intent.</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3 max-w-2xl">
              {[{ icon: LineChart, label: "Experience", value: "5+ years", color: "#1D4ED8" }, { icon: Search, label: "Focus", value: "Visibility + leads", color: "#23A6E8" }, { icon: Gauge, label: "Method", value: "Technical + content", color: "#3AC9F5" }].map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: `${s.color}30` }}><s.icon className="h-4 w-4" style={{ color: s.color }} /></div>
                    <div><div className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</div><div className="text-xs text-slate-400">{s.label}</div></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">Get an SEO Plan <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/work?filter=marketing" className="btn-ghost-dark">View Related Work</Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* BANNER */}
      <section className="bg-white py-12">
        <Container>
          <div className="relative h-64 sm:h-80 overflow-hidden rounded-3xl shadow-xl shadow-slate-200">
            <img src="https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=1400&q=80" alt="SEO Expertise" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1D4ED8]/60 via-[#141A2E]/30 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8 sm:px-12">
              <div><p className="text-white/80 text-sm font-medium mb-2">Fix → structure → grow</p><p className="text-white text-2xl font-bold sm:text-3xl max-w-xs" style={{ fontFamily: "var(--font-heading)" }}>Rankings that turn into revenue</p></div>
            </div>
          </div>
        </Container>
      </section>

      <StickyNav items={nav} />

      {/* OVERVIEW */}
      <section id="overview" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mb-10">
            <span className="kicker">Company Overview</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>SEO Built for Clarity, Speed, and Conversion</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">We help brands rank with clean site architecture, fast load times, and content that answers what people are actually searching for.</p>
          </Reveal>
          <Reveal delay={0.05} className="mb-8">
            <div className="premium-card rounded-2xl p-7">
              <p className="text-slate-700 leading-relaxed">Our approach is simple: remove technical blockers, create an intent-based page structure, and build content that turns traffic into inquiries. This keeps rankings stable and growth consistent.</p>
              <p className="mt-4 text-slate-700 leading-relaxed">Whether you need local SEO for services or scalable ecommerce SEO, we align strategy with your actual revenue goals and reporting.</p>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            <LightCard color="#1D4ED8" icon={ShieldCheck} title="Technical Foundation" bullets={["Crawlability and indexing fixes", "Schema and metadata structure", "Core Web Vitals improvements"]} />
            <LightCard color="#23A6E8" icon={LayoutGrid} title="Intent-based Structure" bullets={["Service and location pages", "Internal linking hierarchy", "Conversion-ready layouts"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={Target} title="Lead-ready Content" bullets={["Topic clusters and landing pages", "Clear CTAs and proof blocks", "Content built for decision-makers"]} delay={0.1} />
          </div>
        </Container>
      </section>

      {/* EXPERTISE */}
      <section id="expertise" className="scroll-mt-28 bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">SEO Expertise</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Full-Scope SEO Services</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">We cover technical, on-page, content, and local SEO with clear deliverables and measurable impact.</p>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-2">
            <LightCard color="#1D4ED8" icon={FileSearch} title="Technical SEO" desc="Fix indexing, speed, and structure issues that block rankings." bullets={["Site audits and fixes", "Core Web Vitals optimization", "Structured data and schema", "Indexing and crawl control"]} />
            <LightCard color="#23A6E8" icon={LayoutGrid} title="On-page SEO" desc="Pages built around intent with strong internal linking." bullets={["Title/metadata improvements", "Content hierarchy and headings", "Internal linking strategy", "Conversion-focused layout"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={BarChart3} title="Content Strategy" desc="Topic clusters and content planning that builds authority." bullets={["Keyword and intent mapping", "Service and blog structure", "Content briefs and outlines", "Authority-building content plan"]} delay={0.1} />
            <LightCard color="#1D4ED8" icon={MapPin} title="Local SEO" desc="Rank for local intent and convert nearby customers." bullets={["Google Business Profile setup", "Location and service pages", "Citations and NAP consistency", "Review generation guidance"]} delay={0.15} />
          </div>
        </Container>
      </section>

      {/* RESULTS */}
      <section id="results" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Results</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Search Systems That Improve Visibility</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">We focus on technical health, content clarity, and conversions so rankings turn into revenue.</p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Search, color: "#1D4ED8", value: "Visibility", label: "Search-ready structure", desc: "Clean architecture and intent-based pages that rank consistently." },
              { icon: Gauge, color: "#23A6E8", value: "Performance", label: "Core Web Vitals", desc: "Speed improvements that support both rankings and conversions." },
              { icon: Target, color: "#3AC9F5", value: "Intent", label: "Lead-ready pages", desc: "Content that matches search intent and drives inquiries." },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.07}>
                <div className="premium-card rounded-2xl p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl mb-4" style={{ backgroundColor: `${s.color}15` }}><s.icon className="h-6 w-6" style={{ color: s.color }} /></div>
                  <div className="text-3xl font-black mb-1" style={{ fontFamily: "var(--font-heading)", color: s.color }}>{s.value}</div>
                  <div className="text-base font-bold text-slate-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>{s.label}</div>
                  <p className="text-sm text-slate-500">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* SKILLS */}
      <section id="skills" className="scroll-mt-28 bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Core Skills</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Modern SEO Stack + Execution</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">We combine technical fixes, content planning, and conversion strategy into one system.</p>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-3">
            <LightCard color="#1D4ED8" icon={FileSearch} title="Technical SEO" bullets={["Crawl and index control", "Schema and structured data", "Core Web Vitals improvements", "Redirects and canonical strategy", "Sitemap and robots setup"]} />
            <LightCard color="#23A6E8" icon={LayoutGrid} title="On-page Optimization" bullets={["Title and meta optimization", "Heading structure", "Internal linking", "Content clarity and formatting", "CTR and SERP improvements"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={BarChart3} title="Content Strategy" bullets={["Keyword intent mapping", "Topic clusters", "Service page planning", "Editorial calendars", "Content briefs and outlines"]} delay={0.1} />
            <LightCard color="#1D4ED8" icon={MapPin} title="Local SEO" bullets={["Google Business Profile", "Local landing pages", "Citations and NAP", "Review strategy", "Location tracking"]} delay={0.15} />
            <LightCard color="#23A6E8" icon={LineChart} title="Reporting & Analytics" bullets={["Rank tracking", "Traffic and lead reporting", "Page-level insights", "Monthly SEO roadmap", "Conversion tracking"]} delay={0.2} />
            <LightCard color="#3AC9F5" icon={Target} title="Conversion Alignment" bullets={["CTA placement strategy", "Trust and proof blocks", "Lead form improvements", "UX clarity for mobile", "Landing page optimization"]} delay={0.25} />
          </div>
        </Container>
      </section>

      {/* INDUSTRIES */}
      <section id="industries" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Industries We Serve</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>High-Intent Niches + Growth Brands</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">We build SEO systems for brands that rely on trust, clarity, and conversions.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Landmark, color: "#1D4ED8", title: "Travel & Tourism", desc: "Search intent targeting for seasonal demand and bookings." },
              { icon: Store, color: "#23A6E8", title: "Ecommerce & Retail", desc: "Category structure, product SEO, and content for buyers." },
              { icon: Home, color: "#3AC9F5", title: "Real Estate", desc: "Local pages and lead capture for high-intent searches." },
              { icon: Briefcase, color: "#1D4ED8", title: "Agencies & Professional Services", desc: "Trust-focused pages that turn visits into inquiries." },
              { icon: Heart, color: "#23A6E8", title: "Healthcare & Wellness", desc: "Local SEO and credibility-focused content." },
              { icon: GraduationCap, color: "#3AC9F5", title: "Education", desc: "Authority content and structured pages for enrollments." },
              { icon: DollarSign, color: "#1D4ED8", title: "Finance & Insurance", desc: "Compliance-first content and lead-ready pages." },
              { icon: Leaf, color: "#23A6E8", title: "Natural & Organic Brands", desc: "Story-led content + search visibility." },
              { icon: Wifi, color: "#3AC9F5", title: "Technology & SaaS", desc: "Value proposition messaging and search acquisition." },
            ].map((c, i) => <LightCard key={c.title} color={c.color} icon={c.icon} title={c.title} desc={c.desc} delay={(i % 3) * 0.07} />)}
          </div>
        </Container>
      </section>

      <div className="bg-[#F1F4F9]"><SeoContentFaq content={seoContent} faqs={seoFaqs} lightTheme={true} /></div>

      {/* CTA */}
      <section className="bg-[#141A2E] py-20 sm:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="kicker" style={{ borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.07)", color: "#93c5fd" }}>Grow Your SEO</span>
              <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Ready to Grow Your SEO?</h2>
              <p className="mt-5 text-lg text-slate-400 max-w-xl mx-auto">Let us build your technical foundation and content roadmap for long-term rankings and leads.</p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link to="/contact" className="btn-primary">Get an SEO Plan <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/work?filter=marketing" className="btn-ghost-dark">View Related Work</Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
