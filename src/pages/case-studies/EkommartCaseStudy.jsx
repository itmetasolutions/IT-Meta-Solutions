import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useInView } from "framer-motion";
import {
  ArrowRight, CheckCircle2, Globe, ShoppingCart, Megaphone, Instagram,
  BarChart3, Calendar, Target, TrendingUp, Users, ExternalLink, MousePointerClick,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import SeoContentFaq from "../../components/SeoContentFaq";
import Container from "../../components/Container";

import adsJuly from "../../assets/img/Ekommart Ads SS July.png";
import adsAugust from "../../assets/img/Ekommart Ads SS August.png";
import adsSeptember from "../../assets/img/Ekommart Ads SS September.png";
import adsOctober from "../../assets/img/Ekommart Ads SS October.png";
import adsNovember from "../../assets/img/Ekommart Ads SS November.png";

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
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500"><TrendingUp className="h-3.5 w-3.5 text-[#1D4ED8]" />Ekommart — Case Study</div>
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
  { label: "Social", href: "#social" },
  { label: "Performance", href: "#performance" },
  { label: "Results", href: "#results" },
];

const seoContent = {
  kicker: "Case Study",
  title: "Ecommerce Growth via Meta Ads and Conversion Optimization",
  subtitle: "Ekommart scaled to 3,300+ purchases with performance marketing, brand build, and a conversion-focused ecommerce experience.",
  paragraphs: [
    "We built a fast-loading store, refined product presentation, and scaled Meta Ads with ROAS optimization.",
    "This case study highlights the system behind predictable growth for ecommerce brands.",
  ],
  bullets: [
    "Meta Ads agency for ecommerce growth",
    "Performance marketing with ROAS optimization",
    "High-converting ecommerce website design",
    "Creative testing and scalable acquisition",
  ],
};

const seoFaqs = [
  { q: "How many purchases were generated?", a: "We achieved 3,300+ purchases within five months of scaling the campaign." },
  { q: "What channels drove results?", a: "Meta Ads were the primary driver, supported by optimized landing pages and creative testing." },
  { q: "Can you replicate this for other ecommerce brands?", a: "Yes. We tailor the acquisition system based on product, market, and budget." },
];

const months = [
  { month: "July — Test Messaging Campaign", spend: "PKR 10.5K", result: "661 Messages", extra: "~16 PKR / Message | 300 Purchases", screenshot: adsJuly },
  { month: "August — Scaling Messaging", spend: "PKR 22K", result: "1,492 Messages", extra: "14.7 PKR / Message | 400 Customers", screenshot: adsAugust },
  { month: "September — Sales Campaign Launch", spend: "PKR 141K", result: "787 Purchases", extra: "179 PKR / Purchase", screenshot: adsSeptember },
  { month: "October — Aggressive Scale", spend: "PKR 211K", result: "1,258 Purchases", extra: "168 PKR / Purchase", screenshot: adsOctober },
  { month: "November — Optimized Performance", spend: "PKR 102K", result: "618 Purchases", extra: "164.5 PKR / Purchase", screenshot: adsNovember },
];

export default function EkommartCaseStudy() {
  return (
    <>
      <Helmet>
        <title>Ekommart — Brand Build & Marketing Case Study | IT Meta Solutions</title>
        <meta name="description" content="Ekommart case study: 3,300+ purchases via Meta Ads, ecommerce optimization, and performance marketing." />
        <meta property="og:title" content="Ekommart — Brand Build & Marketing Case Study | IT Meta Solutions" />
        <meta property="og:description" content="Built Ekommart's e-commerce brand with a new website and performance marketing, generating 3,300+ purchases in 5 months." />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://itmetasolutions.com/case-study/ekommart" />
      </Helmet>
      <ScrollProgress />

      {/* HERO */}
      <section className="relative bg-[#141A2E] overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="absolute inset-0 dot-grid-bg opacity-25 pointer-events-none" />
        <div className="absolute -top-32 right-0 w-[600px] h-[500px] rounded-full bg-[#1D4ED8]/10 blur-[120px] pointer-events-none" />
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex flex-wrap gap-2 mb-8">
              {[{ icon: TrendingUp, label: "Brand Build" }, { icon: ShoppingCart, label: "E-Commerce" }, { icon: Globe, label: "WordPress" }, { icon: Megaphone, label: "Meta Ads" }, { icon: Instagram, label: "Social" }].map((b) => (
                <span key={b.label} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-slate-300"><b.icon className="h-3.5 w-3.5 text-[#3AC9F5]" />{b.label}</span>
              ))}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Scaling Ekommart into a <span className="animated-gradient-text">High-Converting E-Commerce Brand</span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-3xl leading-relaxed">IT Meta Solutions built the Ekommart brand from the ground up — designing the store, launching social channels, and executing performance marketing campaigns that generated thousands of purchases within months.</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3 max-w-2xl">
              {[{ icon: ShoppingCart, label: "Total Purchases", value: "3,300+", color: "#1D4ED8" }, { icon: Target, label: "Best CPA", value: "164 PKR", color: "#23A6E8" }, { icon: Calendar, label: "Growth Phase", value: "5 Months", color: "#3AC9F5" }].map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: `${s.color}30` }}><s.icon className="h-4 w-4" style={{ color: s.color }} /></div>
                    <div><div className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</div><div className="text-xs text-slate-400">{s.label}</div></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://ekommart.shop" target="_blank" rel="noreferrer" className="btn-primary">Visit Website <ExternalLink className="h-4 w-4" /></a>
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
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>A Complete Brand Build — Store, Social, and Performance</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">From zero to a revenue-generating ecommerce brand — we handled the full stack: website, social identity, and a Meta Ads system that scaled to thousands of purchases.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            <LightCard color="#1D4ED8" icon={Globe} title="WordPress E-commerce" desc="Custom WooCommerce store built for conversion, mobile speed, and trust." bullets={["Mobile-first design", "Fast product browsing", "Smooth cart → checkout", "Offer clarity"]} />
            <LightCard color="#23A6E8" icon={Instagram} title="Social Channels" desc="Facebook and Instagram presence for product visibility and trust." bullets={["Facebook Business Page", "Instagram profile", "Product showcases", "Offer-led content"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={Megaphone} title="Meta Ads System" desc="Pixel, purchase events, and a full funnel from awareness to conversion." bullets={["Messaging campaigns (Phase 1)", "Sales campaigns (Phase 2)", "Retargeting + purchase", "ROAS optimization"]} delay={0.1} />
          </div>
        </Container>
      </section>

      {/* WEBSITE */}
      <section id="website" className="scroll-mt-28 bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Website Build</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>A Fast, Conversion-Ready WordPress Store</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">Launched in June 2024 — built on WordPress + WooCommerce, optimized for mobile buyers coming directly from Meta Ads traffic.</p>
          </Reveal>
          <Reveal delay={0.05} className="mb-8">
            <div className="premium-card rounded-2xl p-7">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>Ekommart.shop</p>
                  <p className="text-sm text-slate-600">A modern, mobile-first e-commerce store built on WordPress + WooCommerce. Optimized for fast loading, seamless checkout, and maximum conversions.</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["June 2024 Launch", "WordPress + WooCommerce", "Conversion-first UX"].map((t) => <span key={t} className="inline-flex items-center rounded-full border border-[#1D4ED8]/20 bg-[#1D4ED8]/5 px-3 py-1 text-xs font-semibold text-[#1D4ED8]">{t}</span>)}
                  </div>
                </div>
                <a href="https://ekommart.shop" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#1D4ED8] px-6 py-3 text-sm font-semibold text-white flex-shrink-0"><Globe className="h-4 w-4" />Visit Live Store</a>
              </div>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            <LightCard color="#1D4ED8" icon={ShoppingCart} title="Conversion UX" bullets={["Buy Now + Add to Cart", "Limited Stock urgency", "Simple checkout flow", "Mobile-first design"]} />
            <LightCard color="#23A6E8" icon={Target} title="Trust Signals" bullets={["Clear pricing + offers", "Support/contact access", "First-time buyer UX", "COD support cues"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={BarChart3} title="Ads-Ready Pages" bullets={["Direct product paths", "Low-distraction layout", "Fast add-to-cart", "Checkout-focused flow"]} delay={0.1} />
          </div>
        </Container>
      </section>

      {/* SOCIAL */}
      <section id="social" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Social Presence</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Trust-Driven Content on Facebook & Instagram</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">We built Ekommart's social identity to support the ads funnel — offer-led posts, product showcases, and dispatch proof to increase purchase confidence.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            <Reveal>
              <div className="premium-card h-full rounded-2xl p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="mb-2 text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>Facebook Business Page</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">Engaging product showcases, customer testimonials, and promotional content driving messages and website traffic.</p>
                <ul className="space-y-2 mb-4">{["Product showcases", "Offer-led posts", "Trust messaging", "Dispatch proof"].map((b) => <li key={b} className="flex items-start gap-2 text-sm text-slate-700"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />{b}</li>)}</ul>
                <a href="https://www.facebook.com/Ekommart.shop" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D4ED8] hover:underline">Follow on Facebook <ExternalLink className="h-3.5 w-3.5" /></a>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="premium-card h-full rounded-2xl p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-50">
                  <Instagram className="h-5 w-5 text-pink-500" />
                </div>
                <h3 className="mb-2 text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>Instagram Profile</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">Visual storytelling with product reels, offers, and lifestyle imagery that resonates with the target audience.</p>
                <ul className="space-y-2 mb-4">{["Product reels", "Lifestyle imagery", "New arrivals posts", "Customer reviews"].map((b) => <li key={b} className="flex items-start gap-2 text-sm text-slate-700"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-pink-500" />{b}</li>)}</ul>
                <a href="https://www.instagram.com/ekommart.shop" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D4ED8] hover:underline">Follow on Instagram <ExternalLink className="h-3.5 w-3.5" /></a>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* PERFORMANCE */}
      <section id="performance" className="scroll-mt-28 bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Performance Marketing Journey</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>From Test Campaign to 3,300+ Purchases</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">We started with messaging campaigns to validate the audience and product, then scaled into purchase campaigns with ROAS-focused optimization.</p>
          </Reveal>
          <div className="space-y-6">
            {months.map((m, i) => (
              <Reveal key={m.month} delay={i * 0.05}>
                <div className="premium-card rounded-2xl p-6">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#1D4ED8] mb-4"><Calendar className="h-4 w-4" />{m.month}</div>
                  <div className="grid sm:grid-cols-3 gap-4 mb-5">
                    {[{ label: "Ad Spend", value: m.spend }, { label: "Primary Result", value: m.result }, { label: "Performance", value: m.extra }].map((s) => (
                      <div key={s.label} className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                        <div className="text-sm font-bold text-slate-900">{s.value}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="overflow-hidden rounded-xl border border-slate-100">
                    <img src={m.screenshot} alt={`${m.month} Ads Result`} className="w-full object-cover" loading="lazy" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* RESULTS */}
      <section id="results" className="scroll-mt-28 bg-[#141A2E] py-20 sm:py-28">
        <Container>
          <Reveal className="text-center mb-12">
            <span className="kicker" style={{ borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.07)", color: "#93c5fd" }}>The Outcome</span>
            <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>From Launch to a Revenue-Generating Brand</h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">Within months, Ekommart transformed from a newly launched store into a structured, revenue-generating e-commerce brand with predictable acquisition costs.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3 mb-10">
            {[{ icon: ShoppingCart, label: "Total Purchases", value: "3,300+", color: "#1D4ED8" }, { icon: Target, label: "Best CPA", value: "164 PKR", color: "#23A6E8" }, { icon: Calendar, label: "Growth Phase", value: "5 Months", color: "#3AC9F5" }].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: `${s.color}30` }}><s.icon className="h-5 w-5" style={{ color: s.color }} /></div>
                    <div><div className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</div><div className="text-sm text-slate-400">{s.label}</div></div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-[#1D4ED8]/30 bg-[#1D4ED8]/10 p-7">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div className="max-w-2xl"><div className="text-base font-bold text-white mb-1" style={{ fontFamily: "var(--font-heading)" }}>Want results like this?</div><div className="text-sm text-slate-400">Let IT Meta Solutions build your brand, launch your store, and scale your revenue with performance marketing.</div></div>
                <Link to="/contact" className="inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1D4ED8] shadow-lg transition-all hover:scale-105" style={{ fontFamily: "var(--font-heading)" }}>Start Your Growth Journey <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="bg-[#F1F4F9]"><SeoContentFaq content={seoContent} faqs={seoFaqs} lightTheme={true} /></div>
    </>
  );
}
