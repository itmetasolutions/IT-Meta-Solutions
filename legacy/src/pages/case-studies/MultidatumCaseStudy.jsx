import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, useScroll, useInView } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileSearch,
  Gauge,
  Layout,
  LineChart,
  Megaphone,
  MessageSquareText,
  PenTool,
  PieChart,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import SeoContentFaq from "../../components/SeoContentFaq";
import Container from "../../components/Container";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-50 h-0.5 w-full origin-left bg-gradient-to-r from-[#1D4ED8] via-[#23A6E8] to-[#3AC9F5]"
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
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function LightCard({ icon: Icon, color = "#1D4ED8", title, desc, bullets, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div className="premium-card h-full rounded-2xl p-6">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: `${color}15` }}>
          <Icon className="h-5 w-5" style={{ color }} />
        </div>
        <h3 className="mb-2 text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
        {desc && <p className="mb-3 text-sm leading-relaxed text-slate-600">{desc}</p>}
        {bullets?.length ? (
          <ul className="space-y-2">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color }} />{b}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Reveal>
  );
}

function AnchorLink({ href, children, className }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        if (href?.startsWith("#")) {
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

const navItems = [
  { label: "Overview", href: "#overview" },
  { label: "Services", href: "#services" },
  { label: "Objectives", href: "#objectives" },
  { label: "Features", href: "#features" },
  { label: "SEO", href: "#seo" },
  { label: "Results", href: "#results" },
];

function StickyNav() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) setActive(`#${en.target.id}`); }),
      { rootMargin: "-20% 0px -70% 0px" }
    );
    navItems.forEach(({ href }) => { const el = document.querySelector(href); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return (
    <div className="sticky top-[64px] z-40 border-b border-slate-100 bg-white/95 backdrop-blur-sm shadow-sm">
      <Container>
        <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-none">
          {navItems.map(({ label, href }) => (
            <AnchorLink
              key={href}
              href={href}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                active === href ? "bg-[#1D4ED8] text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {label}
            </AnchorLink>
          ))}
        </div>
      </Container>
    </div>
  );
}

const seoContent = {
  kicker: "Case Study",
  title: "Lead-Focused Agency Website Architecture",
  subtitle: "Multidatum launched a digital marketing website with clear services, positioning, and consultation CTAs.",
  paragraphs: [
    "We structured the website for clarity and conversion, with lead capture placed where intent is highest.",
    "The result is a scalable marketing site built to win inbound consultations.",
  ],
  bullets: [
    "Lead-focused website structure and CTAs",
    "Service architecture and positioning clarity",
    "Conversion-focused UX for agency sites",
    "Trust-building proof and messaging",
  ],
};

const seoFaqs = [
  { q: "What was the goal of this website?", a: "Create a clear services architecture and lead-focused consultation flow." },
  { q: "Does this improve lead capture?", a: "Yes. CTAs and sections were designed to convert intent into inquiries." },
  { q: "Can you build similar agency sites?", a: "Yes. We build positioning-led agency websites for lead generation." },
];

export default function MultidatumCaseStudy() {
  return (
    <>
      <Helmet>
        <title>Multidatum Case Study — Digital Marketing Agency Website | IT Meta Solutions</title>
        <meta name="description" content="Multidatum case study: data-driven agency website with clear services, positioning, and lead-focused CTAs." />
        <meta name="keywords" content="Multidatum, digital marketing agency, social media marketing, website development, brand strategy, lead generation, IT Meta Solutions" />
        <meta property="og:title" content="Multidatum Case Study — Digital Marketing Agency Website | IT Meta Solutions" />
        <meta property="og:description" content="A data-driven digital marketing website with clear service architecture, strong positioning, and lead-focused CTAs." />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://itmetasolutions.com/case-study/multidatum" />
        <meta property="og:image" content="https://itmetasolutions.com/favicon.webp" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <ScrollProgress />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#141A2E] pb-20 pt-28 sm:pb-28 sm:pt-36">
        <div aria-hidden className="absolute inset-0 dot-grid-bg opacity-25 pointer-events-none" />
        <div aria-hidden className="absolute -top-32 right-0 w-[600px] h-[500px] rounded-full bg-[#1D4ED8]/10 blur-[120px] pointer-events-none" />
        <div aria-hidden className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full bg-[#23A6E8]/8 blur-[100px] pointer-events-none" />
        <Container>
          <Reveal>
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { icon: Megaphone, label: "Digital Marketing" },
                { icon: Target, label: "Growth Strategy" },
                { icon: BarChart3, label: "Data-driven" },
                { icon: PenTool, label: "Creative Execution" },
                { icon: ShieldCheck, label: "Lead-focused" },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
                  <Icon className="h-3.5 w-3.5 text-[#3AC9F5]" />{label}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-heading)" }}>
              Multidatum — data-driven{" "}
              <span className="animated-gradient-text">social media growth</span>{" "}
              for measurable brand impact
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-base text-zinc-300 leading-relaxed">
              We structured a growth-focused digital marketing website that clearly communicates services, differentiates
              the brand with strong positioning, showcases credibility, and drives consultations through prominent contact pathways.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Layout, value: "Service architecture", label: "Clarity" },
                { icon: Target, value: "Lead-ready CTAs", label: "Conversion" },
                { icon: LineChart, value: "Strategy → results", label: "Positioning" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Icon className="mb-3 h-6 w-6 text-[#3AC9F5]" />
                  <div className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{value}</div>
                  <div className="mt-1 text-sm text-zinc-400">{label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 overflow-hidden rounded-3xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80"
                alt="Multidatum digital marketing agency website"
                className="w-full h-56 sm:h-72 object-cover opacity-80"
              />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://lemonchiffon-buffalo-514190.hostingersite.com/"
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                Visit Multidatum <ArrowRight className="h-4 w-4" />
              </a>
              <Link to="/work?filter=web-development" className="btn-ghost-dark inline-flex items-center gap-2">
                More Web Projects <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <StickyNav />

      {/* OVERVIEW */}
      <section id="overview" className="scroll-mt-20 bg-white py-20">
        <Container>
          <Reveal>
            <span className="kicker">Overview</span>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              A growth-focused digital marketing brand with a conversion-ready website
            </h2>
            <p className="mt-4 max-w-2xl text-base text-slate-600">
              Multidatum helps businesses grow through smart, creative, and data-driven social media strategies. The website presents
              core services, positioning, credibility cues, and consultation contact paths in a clear structure.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <LightCard icon={Megaphone} title="Industry" desc="Branding · Strategy · Growth Marketing" bullets={["Digital marketing services", "Social media growth", "Creative + analytics"]} delay={0.05} />
            <LightCard icon={Layout} color="#23A6E8" title="Goal" desc="Clarity + differentiation + lead capture" bullets={["Service structure", "Value proposition messaging", "Consultation CTAs"]} delay={0.1} />
            <LightCard icon={ShieldCheck} color="#3AC9F5" title="Outcome focus" desc="Make strategy feel simple and measurable" bullets={["Insights → action messaging", "Campaign outcomes framing", "Credibility cues"]} delay={0.15} />
          </div>
        </Container>
      </section>

      {/* SERVICES */}
      <section id="services" className="scroll-mt-20 bg-[#F1F4F9] py-20">
        <Container>
          <Reveal>
            <span className="kicker">Services</span>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Five core services, clearly structured
            </h2>
            <p className="mt-4 max-w-2xl text-base text-slate-600">
              Each service was given a dedicated section to help prospects quickly understand the offer and take action.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <LightCard icon={Target} title="Strategy" bullets={["Market positioning", "Audience research", "Growth roadmap"]} delay={0.05} />
            <LightCard icon={Megaphone} color="#23A6E8" title="Paid campaigns" bullets={["Meta Ads", "Google Ads", "Campaign management"]} delay={0.1} />
            <LightCard icon={PenTool} color="#3AC9F5" title="Content & design" bullets={["Creative production", "Brand consistency", "Scroll-stopping visuals"]} delay={0.15} />
            <LightCard icon={BarChart3} title="Analytics & reporting" bullets={["Performance tracking", "Clear dashboards", "Actionable insights"]} delay={0.2} />
            <LightCard icon={TrendingUp} color="#23A6E8" title="Growth framework" bullets={["Scalable systems", "Optimization cadence", "Measurable outcomes"]} delay={0.25} />
          </div>
        </Container>
      </section>

      {/* OBJECTIVES */}
      <section id="objectives" className="scroll-mt-20 bg-white py-20">
        <Container>
          <Reveal>
            <span className="kicker">Objectives</span>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Explain services fast — and turn attention into consultations
            </h2>
            <p className="mt-4 max-w-2xl text-base text-slate-600">
              We focused on scannable sections, strong value propositions, and multiple contact touchpoints so prospects can understand the offer and request a consultation quickly.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <LightCard icon={Layout} title="Professional service layout" desc="Present offerings clearly for business owners and marketing leads." bullets={["Service overview", "Clear CTAs", "Easy navigation"]} delay={0.05} />
            <LightCard icon={Target} color="#23A6E8" title="Value propositions" desc="Communicate strategy, creativity, and measurable results in plain language." bullets={["Outcomes-focused copy", "Simple explanations", "Trust-first tone"]} delay={0.1} />
            <LightCard icon={Users} color="#3AC9F5" title="Credibility signals" desc="Support decision-making through proof, team, and outcomes." bullets={["Success stories/portfolio blocks", "Team section", "Brand consistency"]} delay={0.15} />
            <LightCard icon={MessageSquareText} title="Lead generation" desc="Make it easy for prospects to inquire for consultations." bullets={["Contact CTAs", "Lead-focused forms", "Clear next steps"]} delay={0.2} />
          </div>
        </Container>
      </section>

      {/* FEATURES */}
      <section id="features" className="scroll-mt-20 bg-[#F1F4F9] py-20">
        <Container>
          <Reveal>
            <span className="kicker">Key Features</span>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Services, strategy, and conversion paths — clearly presented
            </h2>
            <p className="mt-4 max-w-2xl text-base text-slate-600">
              These were the core website components designed to communicate value fast and capture consultation leads.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <LightCard icon={BarChart3} title="Data-driven strategy messaging" bullets={["Insights → action framing", "Outcome-first copy", "Simple explanations"]} delay={0.05} />
            <LightCard icon={Layout} color="#23A6E8" title="Service highlight sections" bullets={["Strategy", "Content & design", "Campaign management"]} delay={0.1} />
            <LightCard icon={Target} color="#3AC9F5" title="Lead-focused CTAs" bullets={["Contact prompts", "Consultation workflow", "Clear next steps"]} delay={0.15} />
            <LightCard icon={Megaphone} title="Paid ads + analytics" bullets={["Paid campaigns", "Analytics & reporting", "Optimization mindset"]} delay={0.2} />
            <LightCard icon={FileSearch} color="#23A6E8" title="Content sections for SEO" bullets={["Thought leadership", "Search targeting", "Scalable publishing"]} delay={0.25} />
          </div>
        </Container>
      </section>

      {/* SEO */}
      <section id="seo" className="scroll-mt-20 bg-white py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <span className="kicker">SEO & Structure</span>
              <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
                Service pages + content blocks built for search intent
              </h2>
              <p className="mt-4 text-base text-slate-600">
                We organized service architecture for clearer targeting, and supported future growth with content sections to attract inbound traffic and build authority.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-4">
                {[
                  { icon: FileSearch, title: "Clear service targeting", desc: "Structured service pages help search engines map offerings to user intent." },
                  { icon: Layout, title: "Segmented navigation", desc: "About, Services, Blog, Contact to keep users oriented and reduce bounce." },
                  { icon: Gauge, title: "Performance-ready layout", desc: "Clean sections and modular content prevent bloat as the site grows." },
                  { icon: BarChart3, title: "Measurement mindset", desc: "Messaging supports measurable outcomes and reporting expectations." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="premium-card flex items-start gap-4 rounded-xl p-4">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#1D4ED8]/10">
                      <Icon className="h-4 w-4 text-[#1D4ED8]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{title}</p>
                      <p className="mt-0.5 text-sm text-slate-600">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* RESULTS */}
      <section id="results" className="scroll-mt-20 relative bg-[#141A2E] py-20">
        <div aria-hidden className="absolute inset-0 dot-grid-bg opacity-10 pointer-events-none" />
        <Container className="relative">
          <Reveal>
            <span className="kicker" style={{ color: "#3AC9F5", borderColor: "#3AC9F5" }}>Impact</span>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold text-white sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Clearer services, stronger trust, better lead capture
            </h2>
            <p className="mt-4 max-w-xl text-base text-zinc-300">
              The website improves clarity around offerings, supports brand credibility with structured content, and provides consultation contact paths designed to convert visitors into leads.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Layout, value: "Improved", label: "Service clarity" },
                { icon: Target, value: "Stronger", label: "Lead capture" },
                { icon: TrendingUp, value: "Ready", label: "Scalability" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Icon className="mb-3 h-6 w-6 text-[#3AC9F5]" />
                  <div className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{value}</div>
                  <div className="mt-1 text-sm text-zinc-400">{label}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                Request a proposal <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/work?filter=web-development" className="btn-ghost-dark inline-flex items-center gap-2">
                More Web Projects <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="bg-[#F1F4F9]">
        <SeoContentFaq content={seoContent} faqs={seoFaqs} lightTheme={true} />
      </div>
    </>
  );
}
