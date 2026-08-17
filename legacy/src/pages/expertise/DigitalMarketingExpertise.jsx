import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useInView } from "framer-motion";
import {
  ArrowRight, ShieldCheck, Target, TrendingUp, Zap, Gauge, LayoutGrid, Megaphone,
  BarChart3, MessageSquareText, FileSearch, LineChart, PenTool, Instagram,
  Store, Home, Briefcase, ShoppingCart, GraduationCap, Heart, DollarSign, Leaf, Wifi,
  MapPin, Phone, MousePointerClick, CalendarDays, Landmark, CheckCircle2,
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
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500"><Megaphone className="h-3.5 w-3.5 text-[#1D4ED8]" />Digital Marketing</div>
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
  { label: "Achievements", href: "#achievements" },
  { label: "Skills", href: "#skills" },
  { label: "Industries", href: "#industries" },
];

const seoContent = {
  kicker: "Digital Marketing",
  title: "Performance Marketing and Meta Ads for Growth",
  subtitle: "We build scalable Meta Ads strategies, lower CPA, and improve ROAS for ecommerce and lead generation.",
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
  { q: "Do you specialize in Meta Ads for ecommerce?", a: "Yes. We run performance marketing for online stores with ROAS and CPA targets." },
  { q: "Can you improve ROAS and lower CPA?", a: "Yes. We test creatives, optimize audiences, and improve landing pages to raise ROAS." },
  { q: "Do you handle lead generation campaigns?", a: "Yes. We build lead gen funnels for real estate, services, and SaaS brands." },
  { q: "What reporting do you provide?", a: "Weekly and monthly reports covering spend, ROAS, CPA, and conversion growth." },
];

export default function DigitalMarketingExpertisePage() {
  return (
    <>
      <Helmet>
        <title>Digital Marketing Services - IT Meta Solutions</title>
        <meta name="description" content="Performance marketing and Meta Ads for ecommerce and lead gen, focused on ROAS optimization and lower CPA." />
        <meta name="keywords" content="digital marketing, social media marketing, meta ads, facebook ads, instagram growth, lead generation, content strategy, analytics, SEO, IT Meta Solutions" />
        <meta property="og:title" content="Digital Marketing Services - IT Meta Solutions" />
        <meta property="og:description" content="5+ years of digital marketing expertise: data-driven strategy, social media growth, Meta Ads funnel, SEO-ready content architecture, and lead-focused conversion systems." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://itmetasolutions.com/digital-marketing-services" />
      </Helmet>
      <ScrollProgress />

      {/* HERO */}
      <section className="relative bg-[#141A2E] overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="absolute inset-0 dot-grid-bg opacity-25 pointer-events-none" />
        <div className="absolute -top-32 right-0 w-[600px] h-[500px] rounded-full bg-[#1D4ED8]/10 blur-[120px] pointer-events-none" />
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex flex-wrap gap-2 mb-8">
              {[{ icon: Megaphone, label: "Digital Marketing" }, { icon: Target, label: "Growth Strategy" }, { icon: BarChart3, label: "Data-Driven" }, { icon: Instagram, label: "Social Media" }, { icon: MousePointerClick, label: "Lead Generation" }].map((b) => (
                <span key={b.label} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-slate-300"><b.icon className="h-3.5 w-3.5 text-[#3AC9F5]" />{b.label}</span>
              ))}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Digital Marketing <span className="animated-gradient-text">Services</span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-3xl leading-relaxed">IT Meta Solutions brings <span className="text-white font-semibold">5+ years</span> of experience building growth systems that convert: clear positioning, content strategy, social media management, Meta Ads funnels, and analytics-driven optimization.</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3 max-w-2xl">
              {[{ icon: TrendingUp, label: "Experience", value: "5+ years", color: "#1D4ED8" }, { icon: Target, label: "Focus", value: "Lead-ready funnels", color: "#23A6E8" }, { icon: LineChart, label: "Approach", value: "Strategy → results", color: "#3AC9F5" }].map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: `${s.color}30` }}><s.icon className="h-4 w-4" style={{ color: s.color }} /></div>
                    <div><div className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</div><div className="text-xs text-slate-400">{s.label}</div></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">Get a Proposal <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/work?filter=marketing" className="btn-ghost-dark">View Marketing Work</Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* BANNER */}
      <section className="bg-white py-12">
        <Container>
          <div className="relative h-64 sm:h-80 overflow-hidden rounded-3xl shadow-xl shadow-slate-200">
            <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1400&q=80" alt="Digital Marketing" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1D4ED8]/60 via-[#141A2E]/30 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8 sm:px-12">
              <div><p className="text-white/80 text-sm font-medium mb-2">Full-funnel growth systems</p><p className="text-white text-2xl font-bold sm:text-3xl max-w-xs" style={{ fontFamily: "var(--font-heading)" }}>Strategy → Content → Ads → Results</p></div>
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
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Marketing That Feels Clear — and Performs</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">We structure brands like decision-makers think: clear offers, simple messaging, strong proof, and conversion paths that turn attention into inquiries.</p>
          </Reveal>
          <Reveal delay={0.05} className="mb-8">
            <div className="premium-card rounded-2xl p-7">
              <p className="text-slate-700 leading-relaxed">Our core method is simple: build a clean brand foundation, then deploy a repeatable growth system. That means content pillars, SEO-ready pages, and paid campaigns that match user intent (Awareness → Retargeting → Leads).</p>
              <p className="mt-4 text-slate-700 leading-relaxed">Whether it's an agency-style brand or a high-intent niche like Islamic travel, we focus on clarity, trust, and conversion — especially on mobile-first traffic.</p>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            <LightCard color="#1D4ED8" icon={MessageSquareText} title="Clear Messaging" bullets={["Value props written for decision-makers", "Outcomes-focused copy", "Simple explanations of complex strategy"]} />
            <LightCard color="#23A6E8" icon={ShieldCheck} title="Trust-first System" bullets={["Proof modules (case studies / outcomes)", "Consistent identity across channels", "Compliance-ready pages"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={Zap} title="Conversion Paths" bullets={["Lead-focused CTAs", "WhatsApp-first / form workflows", "Funnel-ready landing structure"]} delay={0.1} />
          </div>
        </Container>
      </section>

      {/* EXPERTISE */}
      <section id="expertise" className="scroll-mt-28 bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Digital Marketing Expertise</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Full-Funnel Growth Services</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">From brand positioning to social content and paid acquisition — we build the structure, then optimize it with data.</p>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-2">
            <LightCard color="#1D4ED8" icon={Target} title="Strategy & Positioning" desc="Make your offer instantly understandable and differentiable." bullets={["Positioning & messaging framework", "Offer clarity + service architecture", "Content pillars & campaign themes", "Audience segmentation plan"]} />
            <LightCard color="#23A6E8" icon={Instagram} title="Social Media Management" desc="A consistent identity that builds recall and trust." bullets={["IG/FB content planning + calendar", "Highlights structure & profile optimization", "Creative direction (brand-safe visuals)", "Synergy with paid campaigns"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={Megaphone} title="Meta Ads & Lead Generation" desc="Funnels designed to convert on low-to-mid budgets." bullets={["Awareness → retargeting → leads funnel", "Click-to-WhatsApp + instant forms", "Creative & copy variants testing", "Tracking foundations (pixel/events setup)"]} delay={0.1} />
            <LightCard color="#1D4ED8" icon={BarChart3} title="Analytics & Optimization" desc="Measure what matters and improve performance continuously." bullets={["Campaign reporting & insights", "Creative performance review", "Landing page conversion improvements", "Scaling plan for seasonal campaigns"]} delay={0.15} />
          </div>
        </Container>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Key Achievements</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Systems That Create Outcomes</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">Our focus is not "posting more" — it's building funnels, clarity, and conversion paths that perform.</p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: TrendingUp, value: "5+", label: "Years Experience", desc: "Growth systems across multiple industries and budgets", color: "#1D4ED8" },
              { icon: MousePointerClick, value: "Funnels", label: "Awareness → Leads", desc: "Repeatable, scalable structure for seasonal and evergreen offers", color: "#23A6E8" },
              { icon: Phone, value: "Lead paths", label: "WhatsApp + forms", desc: "Mobile-first conversion flows that reduce drop-off", color: "#3AC9F5" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.07}>
                <div className="premium-card rounded-2xl p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl mb-4" style={{ backgroundColor: `${s.color}15` }}><s.icon className="h-6 w-6" style={{ color: s.color }} /></div>
                  <div className="text-4xl font-black mb-1" style={{ fontFamily: "var(--font-heading)", color: s.color }}>{s.value}</div>
                  <div className="text-base font-bold text-slate-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>{s.label}</div>
                  <p className="text-sm text-slate-500">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} className="mt-8">
            <div className="premium-card rounded-2xl p-7">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>Ekommart — 3,300+ Purchases in 5 Months</p>
                  <p className="mt-1 text-sm text-slate-600">Complete e-commerce brand build with Meta Ads funnel achieving 164 PKR cost per purchase. From messaging campaigns to purchase-optimized sales ads.</p>
                </div>
                <Link to="/case-study/ekommart" className="btn-primary flex-shrink-0">View Case Study <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* SKILLS */}
      <section id="skills" className="scroll-mt-28 bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Core Skills</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Modern Marketing Stack + Creative Execution</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">We combine brand strategy, creative, performance marketing, and reporting into one system.</p>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-3">
            <LightCard color="#1D4ED8" icon={Megaphone} title="Paid Acquisition" bullets={["Meta Ads (FB/IG)", "Funnel planning & retargeting", "Lead forms + Click-to-WhatsApp", "Creative testing frameworks", "Campaign optimization"]} />
            <LightCard color="#23A6E8" icon={PenTool} title="Content & Social" bullets={["Content pillars + calendars", "Brand-safe creative direction", "IG/FB profile optimization", "Highlights structure", "Copywriting (Urdu + English mix)"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={FileSearch} title="SEO + Structure" bullets={["Intent-based page architecture", "Service pages + internal linking", "Content blocks for inbound growth", "Conversion-ready landing structure", "Performance-friendly layout"]} delay={0.1} />
            <LightCard color="#1D4ED8" icon={BarChart3} title="Analytics & Reporting" bullets={["Performance dashboards & summaries", "Campaign insights → actions", "Conversion path analysis", "Creative performance reviews", "Scaling roadmap"]} delay={0.15} />
            <LightCard color="#23A6E8" icon={Gauge} title="Conversion Optimization" bullets={["CTA placements & hierarchy", "Lead-focused forms", "WhatsApp-first flow design", "Trust modules (proof, structure, clarity)", "Mobile-first UX improvements"]} delay={0.2} />
            <LightCard color="#3AC9F5" icon={CalendarDays} title="Campaign Planning" bullets={["Seasonal planning (Ramadan / Hajj peaks)", "Offer + creative mapping", "Audience segmentation plan", "Launch → optimize → scale cycle", "Consistency systems"]} delay={0.25} />
          </div>
        </Container>
      </section>

      {/* INDUSTRIES */}
      <section id="industries" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Industries We Serve</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>High-Intent Niches + Growth Brands</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">We've structured marketing systems for brands that rely on trust, clarity, and conversions across multiple categories.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Landmark, color: "#1D4ED8", title: "Travel & Religious Tourism", desc: "High-intent leads for Umrah/Hajj, seasonal campaigns, WhatsApp conversion paths." },
              { icon: Store, color: "#23A6E8", title: "E-Commerce & Retail", desc: "Offer clarity, creatives, and paid funnels built for product sales and repeat buyers." },
              { icon: Home, color: "#3AC9F5", title: "Real Estate & Property", desc: "Lead capture structures for rentals, sales, listings, and trust-first positioning." },
              { icon: Briefcase, color: "#1D4ED8", title: "Agencies & Professional Services", desc: "Positioning-led messaging, portfolio structure, consultation CTAs, and inbound growth." },
              { icon: Heart, color: "#23A6E8", title: "Healthcare & Wellness", desc: "Trust messaging, service clarity, and ethical communication with conversion paths." },
              { icon: GraduationCap, color: "#3AC9F5", title: "Education", desc: "Enrollment funnels, awareness campaigns, and content for authority building." },
              { icon: DollarSign, color: "#1D4ED8", title: "Finance & Insurance", desc: "Compliance-first trust and structured lead capture with careful messaging." },
              { icon: Leaf, color: "#23A6E8", title: "Natural & Organic Brands", desc: "Story-led content + performance campaigns for premium, trust-based products." },
              { icon: Wifi, color: "#3AC9F5", title: "Technology & SaaS", desc: "Value proposition messaging, conversion pages, and measurable acquisition systems." },
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
              <span className="kicker" style={{ borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.07)", color: "#93c5fd" }}>Start Your Growth</span>
              <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Ready to Grow with a Real Funnel?</h2>
              <p className="mt-5 text-lg text-slate-400 max-w-xl mx-auto">Let's build your strategy, content, and paid system — designed to convert visitors into leads and customers.</p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link to="/contact" className="btn-primary">Get a Proposal <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/work?filter=marketing" className="btn-ghost-dark">View Marketing Work</Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
