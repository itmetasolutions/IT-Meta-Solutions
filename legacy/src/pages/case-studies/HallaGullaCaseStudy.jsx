import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useInView } from "framer-motion";
import {
  ArrowRight, CheckCircle2, Globe, Megaphone, Instagram, BarChart3, Target,
  Users, Wallet, CalendarDays, MousePointerClick, MapPin, Phone, LayoutGrid,
  ShieldCheck, ExternalLink, TrendingUp,
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
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500"><MapPin className="h-3.5 w-3.5 text-[#1D4ED8]" />Halla Gulla — Case Study</div>
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
  { label: "Website", href: "#website" },
  { label: "Meta Ads", href: "#ads" },
  { label: "Social", href: "#social" },
  { label: "Results", href: "#results" },
];

const seoContent = {
  kicker: "Case Study",
  title: "Travel Brand Leads via Meta Ads and Conversion UX",
  subtitle: "Halla Gulla generated 67 travel leads in 3 days with a conversion-focused funnel and Meta Ads.",
  paragraphs: [
    "We built a travel brand system with clear offers, WhatsApp-first flows, and lead-ready landing pages.",
    "Meta Ads testing delivered fast lead volume with controlled spend.",
  ],
  bullets: [
    "Lead generation services with Meta Ads",
    "High-converting landing pages for travel",
    "Offer positioning and urgency CTAs",
    "WhatsApp-first inquiry flows",
  ],
};

const seoFaqs = [
  { q: "How many leads were generated?", a: "We generated 67 potential leads within a 3-day campaign." },
  { q: "What drove the results?", a: "Meta Ads combined with clear offers and fast WhatsApp inquiry flows." },
  { q: "Can this approach work for other travel brands?", a: "Yes. We can replicate the funnel with new offers and seasonal campaigns." },
];

export default function HallaGullaCaseStudy() {
  return (
    <>
      <Helmet>
        <title>Halla Gulla Case Study - Complete Travel Brand Build | IT Meta Solutions</title>
        <meta name="description" content="Halla Gulla case study: travel brand build with Meta Ads generating 67 leads in 3 days." />
        <meta property="og:title" content="Halla Gulla Case Study - Complete Travel Brand Build | IT Meta Solutions" />
        <meta property="og:description" content="Website development, social media management, and Meta Ads generating 67 leads in 3 days." />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://itmetasolutions.com/case-study/halla-gulla" />
      </Helmet>
      <ScrollProgress />

      {/* HERO */}
      <section className="relative bg-[#141A2E] overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="absolute inset-0 dot-grid-bg opacity-25 pointer-events-none" />
        <div className="absolute -top-32 right-0 w-[600px] h-[500px] rounded-full bg-[#1D4ED8]/10 blur-[120px] pointer-events-none" />
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex flex-wrap gap-2 mb-8">
              {[{ icon: Globe, label: "Pakistan Tourism" }, { icon: LayoutGrid, label: "Website" }, { icon: Instagram, label: "Social" }, { icon: Megaphone, label: "Meta Ads" }, { icon: ShieldCheck, label: "Lead Generation" }].map((b) => (
                <span key={b.label} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-slate-300"><b.icon className="h-3.5 w-3.5 text-[#3AC9F5]" />{b.label}</span>
              ))}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Halla Gulla — Complete Travel Brand Build across <span className="animated-gradient-text">Website, Social & Meta Ads</span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-3xl leading-relaxed">A youthful, energetic tours & travel brand focused on Pakistan tourism — built for digital visibility, strong travel storytelling, and a performance-driven lead system to generate real inquiries at low cost.</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-4 max-w-3xl">
              {[{ icon: Wallet, label: "Total Ad Spend", value: "5,500 PKR", color: "#1D4ED8" }, { icon: CalendarDays, label: "Campaign Duration", value: "3 days", color: "#23A6E8" }, { icon: Users, label: "Potential Leads", value: "67", color: "#3AC9F5" }, { icon: Target, label: "Cost per Lead", value: "~78 PKR", color: "#1D4ED8" }].map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: `${s.color}30` }}><s.icon className="h-4 w-4" style={{ color: s.color }} /></div>
                    <div><div className="text-base font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</div><div className="text-xs text-slate-400">{s.label}</div></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://hallagulla.pk" target="_blank" rel="noreferrer" className="btn-primary">Visit Website <ExternalLink className="h-4 w-4" /></a>
              <Link to="/contact" className="btn-ghost-dark">Request a Similar Build</Link>
            </div>
          </motion.div>
        </Container>
      </section>

      <StickyNav items={nav} />

      {/* OVERVIEW */}
      <section id="overview" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Overview</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Youthful Travel Brand with a Full-Funnel Lead Engine</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">Halla Gulla offers northern areas tours, group trips, family tours, and customized travel experiences. This build focused on a conversion-ready website, consistent social identity, and a repeatable Meta Ads funnel that generates qualified inquiries at low cost.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            <LightCard color="#1D4ED8" icon={Globe} title="Industry" desc="Tours · Travel · Pakistan Tourism" bullets={["Youth-focused vibe", "Visual storytelling", "Seasonal & destination-driven demand"]} />
            <LightCard color="#23A6E8" icon={LayoutGrid} title="Scope" desc="Website · Social · Meta Ads · Lead Gen" bullets={["Modern website structure", "IG/FB brand setup", "Meta funnel build", "WhatsApp + lead forms"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={Target} title="Objectives" desc="Visibility + excitement + inquiries" bullets={["Recognizable brand", "Mobile-first website", "Awareness → leads funnel", "Low-budget validation"]} delay={0.1} />
          </div>
        </Container>
      </section>

      {/* WEBSITE */}
      <section id="website" className="scroll-mt-28 bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Website (Foundation)</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>A Visual Travel Hub Built for Excitement + Fast Inquiries</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">The website was built as the brand foundation: destinations, tours, gallery, transport, and quick inquiry paths — optimized for mobile-first traffic coming from Instagram, Facebook, and ads.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <LightCard color="#1D4ED8" icon={LayoutGrid} title="Site Structure" bullets={["Home (brand vibe + destinations)", "Destinations pages", "Tours & packages", "Gallery", "Transport / cars section", "Contact & inquiry"]} />
            <LightCard color="#23A6E8" icon={MousePointerClick} title="Clear CTAs" bullets={["Book Your Trip", "Explore Destinations", "Contact Us", "WhatsApp-friendly inquiry flow"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={Phone} title="Quick Actions" bullets={["Mobile-first layout", "Fast sections", "Clear headings", "Low-friction inquiry paths"]} delay={0.1} />
          </div>
        </Container>
      </section>

      {/* ADS */}
      <section id="ads" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Meta Ads (Lead Gen)</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Awareness → Retargeting → Leads Funnel on a Controlled Budget</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">A complete Meta Ads setup with travel-interest targeting and lead capture through WhatsApp + instant lead forms — validated lead volume and CPL using a controlled 3-day test.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <LightCard color="#1D4ED8" icon={ShieldCheck} title="Meta Setup" bullets={["Meta Business Manager", "Ad account configuration", "Travel-interest audience targeting", "WhatsApp integration", "Instant lead form integration"]} />
            <LightCard color="#23A6E8" icon={Users} title="Retargeting" bullets={["Video viewers", "Instagram engagers", "Facebook engagers", "Profile visitors"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={MousePointerClick} title="Lead Campaigns" bullets={["Click-to-WhatsApp", "Instant Meta lead forms", "Clear Book Your Trip message", "Offer + urgency hooks"]} delay={0.1} />
          </div>
          <Reveal delay={0.15} className="mt-6">
            <div className="premium-card rounded-2xl p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>Performance snapshot (3-day test)</p>
                  <p className="text-sm text-slate-600 mt-1">Total spend: <strong>5,500 PKR</strong> · Duration: <strong>3 days</strong> · Leads: <strong>67</strong> · Cost per lead: <strong>~78 PKR</strong></p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-[#1D4ED8] flex-shrink-0"><TrendingUp className="h-4 w-4" />Low CPL validated</span>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* SOCIAL */}
      <section id="social" className="scroll-mt-28 bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Social Media (IG/FB)</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>A Youthful, Energetic Travel Identity Built for Consistency</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">Profiles optimized, content pillars set, and highlight categories created to support conversion — aligning organic storytelling with paid messaging for stronger recall.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <LightCard color="#1D4ED8" icon={Instagram} title="Platforms" desc="Brand presence across high-intent channels." bullets={["Instagram", "Facebook", "WhatsApp-first inquiry behavior"]} />
            <LightCard color="#23A6E8" icon={CalendarDays} title="Content Pillars" desc="Content designed to inspire, inform, and convert." bullets={["Destination showcases", "Tour promotions", "Travel reels", "Polls & Q&A"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={MapPin} title="Highlights Structure" desc="Highlights organized around travel intent for fast browsing." bullets={["Tours", "Destinations", "Gallery", "Transport"]} delay={0.1} />
          </div>
        </Container>
      </section>

      {/* RESULTS */}
      <section id="results" className="scroll-mt-28 bg-[#141A2E] py-20 sm:py-28">
        <Container>
          <Reveal className="text-center mb-12">
            <span className="kicker" style={{ borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.07)", color: "#93c5fd" }}>Results</span>
            <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>67 Potential Leads in 3 Days on a Controlled Test Budget</h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">A complete brand presence with a validated Meta funnel generating travel inquiries via WhatsApp and instant lead forms at a very cost-effective CPL.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-4 mb-10">
            {[{ icon: Wallet, label: "Total Ad Spend", value: "5,500 PKR", color: "#1D4ED8" }, { icon: CalendarDays, label: "Duration", value: "3 days", color: "#23A6E8" }, { icon: Users, label: "Leads Generated", value: "67", color: "#3AC9F5" }, { icon: Target, label: "Cost per Lead", value: "~78 PKR", color: "#1D4ED8" }].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: `${s.color}30` }}><s.icon className="h-5 w-5" style={{ color: s.color }} /></div>
                    <div><div className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</div><div className="text-xs text-slate-400">{s.label}</div></div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-[#1D4ED8]/30 bg-[#1D4ED8]/10 p-7">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div className="max-w-2xl"><div className="text-base font-bold text-white mb-1" style={{ fontFamily: "var(--font-heading)" }}>Scale seasonally with the same funnel</div><div className="text-sm text-slate-400">Duplicate the funnel, swap destination offers and creatives, and run for peak travel windows each season.</div></div>
                <Link to="/contact" className="inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1D4ED8] shadow-lg transition-all hover:scale-105" style={{ fontFamily: "var(--font-heading)" }}>Request a Proposal <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="bg-[#F1F4F9]"><SeoContentFaq content={seoContent} faqs={seoFaqs} lightTheme={true} /></div>
    </>
  );
}
