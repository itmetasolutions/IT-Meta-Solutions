import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useInView } from "framer-motion";
import {
  ArrowRight, CheckCircle2, Globe, Megaphone, Instagram, BarChart3, Target,
  Users, Wallet, CalendarDays, MousePointerClick, Leaf, LayoutGrid, ShieldCheck,
  ExternalLink, ShoppingCart, BookOpen, HeartPulse, BadgeDollarSign,
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
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500"><Leaf className="h-3.5 w-3.5 text-[#1D4ED8]" />Hikmabiotics — Case Study</div>
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
  { label: "Websites", href: "#websites" },
  { label: "Meta Ads", href: "#ads" },
  { label: "Social", href: "#social" },
  { label: "Results", href: "#results" },
];

const seoContent = {
  kicker: "Case Study",
  title: "Dual-Market Ecommerce Brand Launch",
  subtitle: "Hikmabiotics launched PK and UK brands with localized sites, social, and Meta Ads performance.",
  paragraphs: [
    "We built two localized ecommerce experiences and content systems for market-specific positioning.",
    "The launch used Meta Ads validation to generate early revenue with controlled cost per sale.",
  ],
  bullets: [
    "Localized ecommerce websites for PK and UK",
    "Meta Ads launch strategy and ROAS optimization",
    "Brand positioning and product storytelling",
    "Conversion-focused product pages and creatives",
  ],
};

const seoFaqs = [
  { q: "What markets were launched?", a: "We launched separate PK and UK websites with localized messaging." },
  { q: "Did Meta Ads drive early sales?", a: "Yes. Launch Meta Ads generated early revenue with efficient cost per sale." },
  { q: "Can you run dual-market brand launches?", a: "Yes. We build localized funnels and content systems for each market." },
];

export default function HikmabioticsCaseStudy() {
  return (
    <>
      <Helmet>
        <title>Hikmabiotics Case Study - Dual-Market Wellness Brand | IT Meta Solutions</title>
        <meta name="description" content="Hikmabiotics case study: dual-market ecommerce launch with PK/UK sites and Meta Ads generating early revenue." />
        <meta property="og:title" content="Hikmabiotics Case Study - Dual-Market Wellness Brand | IT Meta Solutions" />
        <meta property="og:description" content="Dual-market brand build with PK + UK websites, dual social identity, and PK Meta Ads validation." />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://itmetasolutions.com/case-study/hikmabiotics" />
      </Helmet>
      <ScrollProgress />

      {/* HERO */}
      <section className="relative bg-[#141A2E] overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="absolute inset-0 dot-grid-bg opacity-25 pointer-events-none" />
        <div className="absolute -top-32 right-0 w-[600px] h-[500px] rounded-full bg-[#1D4ED8]/10 blur-[120px] pointer-events-none" />
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex flex-wrap gap-2 mb-8">
              {[{ icon: Leaf, label: "Natural Wellness" }, { icon: Globe, label: "Dual Market (PK + UK)" }, { icon: LayoutGrid, label: "Two Websites" }, { icon: Instagram, label: "Dual Social" }, { icon: Megaphone, label: "Meta Ads (PK)" }].map((b) => (
                <span key={b.label} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-slate-300"><b.icon className="h-3.5 w-3.5 text-[#3AC9F5]" />{b.label}</span>
              ))}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Hikmabiotics — Dual-Market Brand Build across <span className="animated-gradient-text">Websites, Social & Meta Ads</span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-3xl leading-relaxed">A premium natural supplements and herbal wellness brand targeting Pakistan and the UK — built with localized websites, separate social identities, and performance-driven ads in Pakistan while maintaining one unified premium brand voice.</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-4 max-w-3xl">
              {[{ icon: LayoutGrid, label: "Websites", value: "PK + UK", color: "#1D4ED8" }, { icon: Instagram, label: "Social", value: "PK + UK", color: "#23A6E8" }, { icon: Wallet, label: "Revenue (PK)", value: "~20,000 PKR", color: "#3AC9F5" }, { icon: Target, label: "Cost per Sale", value: "250–300 PKR", color: "#1D4ED8" }].map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: `${s.color}30` }}><s.icon className="h-4 w-4" style={{ color: s.color }} /></div>
                    <div><div className="text-base font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</div><div className="text-xs text-slate-400">{s.label}</div></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://hikmabiotics.com" target="_blank" rel="noreferrer" className="btn-primary">PK Website <ExternalLink className="h-4 w-4" /></a>
              <a href="https://hikmabiotics.co.uk" target="_blank" rel="noreferrer" className="btn-ghost-dark">UK Website <ExternalLink className="h-4 w-4" /></a>
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
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>A Scalable International Wellness Brand System (PK + UK)</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">Hikmabiotics is a premium natural supplements brand offering herbal wellness products including shilajit. The build focused on two localized websites, dual social identities, and a performance-driven launch in Pakistan — while keeping one unified premium brand voice.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            <LightCard color="#1D4ED8" icon={Leaf} title="Industry" desc="Natural Supplements · Wellness · Herbal Products" bullets={["Premium positioning", "Education-led buying", "Trust and compliance needs"]} />
            <LightCard color="#23A6E8" icon={LayoutGrid} title="Scope" desc="Dual websites · Social · Organic · Meta Ads" bullets={["PK + UK domains", "Dual social presence", "Organic brand building", "Meta Ads purchase funnel (PK)"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={ShieldCheck} title="Objectives" desc="Localization + scalability + early sales validation" bullets={["Two market-specific websites", "Localized social content", "PK paid launch validation", "UK organic authority foundation"]} delay={0.1} />
          </div>
        </Container>
      </section>

      {/* WEBSITES */}
      <section id="websites" className="scroll-mt-28 bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Websites (Dual-Market Architecture)</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Two Localized Stores Under One Premium Brand System</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">Separate domains for Pakistan and the UK, localized messaging and currency, and one consistent identity across both experiences.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <LightCard color="#1D4ED8" icon={ShoppingCart} title="🇵🇰 Pakistan Website" desc="Sales-driven e-commerce designed for COD and local delivery confidence." bullets={["Conversion-focused layout", "Benefits / usage / ingredients", "Local delivery messaging", "COD support cues", "Optimized for Meta Ads traffic"]} />
            <LightCard color="#23A6E8" icon={Leaf} title="🇬🇧 UK Website" desc="Premium minimal design with compliance-ready product pages." bullets={["Premium, minimal aesthetic", "International shipping focus", "Compliance-ready product pages", "Brand-first content for SEO", "Long-term organic trust"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={BookOpen} title="Product Education" desc="Content structure designed to answer key buyer questions quickly." bullets={["Ingredients & sourcing", "Benefits & outcomes", "Usage instructions", "Trust signals & proof", "Clear CTA placement"]} delay={0.1} />
          </div>
        </Container>
      </section>

      {/* ADS */}
      <section id="ads" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Meta Ads (Pakistan Sales Validation)</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Low-Budget Launch That Validated Profitable Purchases Early</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">A conversion-ready Meta Ads structure with pixel + purchase events, product-level tracking, and a 3-stage funnel to validate early sales performance on controlled spend.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <LightCard color="#1D4ED8" icon={ShieldCheck} title="Meta Setup" bullets={["Meta Business Manager", "Pixel configured", "Purchase events enabled", "Product-level tracking", "Conversion-focused structure"]} />
            <LightCard color="#23A6E8" icon={Users} title="Retargeting" bullets={["Video viewers", "Website visitors", "Warm audience retargeting", "Buyer-intent segments"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={MousePointerClick} title="Purchase Campaigns" bullets={["Buy Now CTA", "Conversion optimization", "Limited-time offer messaging", "Checkout-focused path"]} delay={0.1} />
          </div>
          <Reveal delay={0.15} className="mt-6">
            <div className="premium-card rounded-2xl p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>Performance snapshot (launch phase)</p>
                  <p className="text-sm text-slate-600 mt-1">Daily budget: <strong>~800 PKR</strong> · First 3 days · Cost per sale: <strong>~250–300 PKR</strong> · Revenue: <strong>~20,000 PKR</strong></p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-[#1D4ED8] flex-shrink-0"><BadgeDollarSign className="h-4 w-4" />Early ROAS win</span>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* SOCIAL */}
      <section id="social" className="scroll-mt-28 bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Social & Organic (Dual Presence)</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Localized Content for PK + Premium Authority for UK</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">Pakistan accounts focused on education and offers with bilingual content; UK accounts focused on premium wellness aesthetics, English-only storytelling, and long-term authority building.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <LightCard color="#1D4ED8" icon={Instagram} title="Pakistan Social" desc="Product-first content designed to sell and educate locally." bullets={["Urdu + English mixed content", "Offer-driven posts", "Product education reels", "Testimonials & reviews", "Sales-focused CTAs"]} />
            <LightCard color="#23A6E8" icon={Leaf} title="UK/Global Social" desc="Premium wellness identity for global trust and authority." bullets={["Clean premium aesthetics", "English-only content", "Lifestyle + storytelling", "Trust & authority positioning", "Foundation for future paid scaling"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={HeartPulse} title="Content Pillars" desc="A repeatable system used across both markets." bullets={["Product education", "Health & wellness tips", "Usage & benefits", "Testimonials & reviews", "Reels for reach"]} delay={0.1} />
          </div>
        </Container>
      </section>

      {/* RESULTS */}
      <section id="results" className="scroll-mt-28 bg-[#141A2E] py-20 sm:py-28">
        <Container>
          <Reveal className="text-center mb-12">
            <span className="kicker" style={{ borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.07)", color: "#93c5fd" }}>Results</span>
            <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Dual Websites + Dual Social + Early Profitable Ads Validation</h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">A complete international-ready brand presence with localized PK/UK websites, separate social identities, and a purchase-optimized Meta Ads launch in Pakistan that generated early profitable sales on low spend.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-4 mb-10">
            {[{ icon: LayoutGrid, label: "Websites", value: "2 (PK + UK)", color: "#1D4ED8" }, { icon: Instagram, label: "Social Presence", value: "PK + UK", color: "#23A6E8" }, { icon: Wallet, label: "Revenue (PK)", value: "~20,000 PKR", color: "#3AC9F5" }, { icon: Target, label: "Cost per Sale", value: "250–300 PKR", color: "#1D4ED8" }].map((s, i) => (
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
                <div className="max-w-2xl"><div className="text-base font-bold text-white mb-1" style={{ fontFamily: "var(--font-heading)" }}>Scale both markets with one system</div><div className="text-sm text-slate-400">Scale PK by expanding best-seller campaigns and retargeting; scale UK through authority-led organic growth and future paid once the foundation is mature.</div></div>
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
