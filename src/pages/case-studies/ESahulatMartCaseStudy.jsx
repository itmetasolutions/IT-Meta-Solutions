import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useInView } from "framer-motion";
import {
  ArrowRight, CheckCircle2, Globe, ShoppingCart, ShoppingBag, Megaphone, Instagram,
  BarChart3, Target, TrendingUp, Users, Wallet, CalendarDays, MousePointerClick, Truck,
  LayoutGrid, ExternalLink,
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
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500"><ShoppingBag className="h-3.5 w-3.5 text-[#1D4ED8]" />E Sahulat Mart — Case Study</div>
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
  title: "Ecommerce Brand Build and Meta Ads Performance",
  subtitle: "E Sahulat Mart grew sales with a conversion-focused store, social content, and performance marketing.",
  paragraphs: [
    "We combined storefront optimization, clear product positioning, and Meta Ads testing to grow revenue with controlled spend.",
    "The result is a repeatable ecommerce growth system focused on ROAS and conversion rate improvements.",
  ],
  bullets: [
    "Meta Ads agency for ecommerce growth",
    "High-converting ecommerce website design",
    "Creative testing and offer optimization",
    "Conversion tracking and ROAS optimization",
  ],
};

const seoFaqs = [
  { q: "What was the primary outcome?", a: "The brand achieved 2+ lac PKR in sales with controlled daily ad spend." },
  { q: "Which channels drove growth?", a: "Meta Ads and conversion-optimized ecommerce pages drove most results." },
  { q: "Can this system scale for other stores?", a: "Yes. We tailor the funnel and creative strategy to product and market." },
];

export default function ESahulatMartCaseStudy() {
  return (
    <>
      <Helmet>
        <title>E Sahulat Mart Case Study - E-commerce Sales Growth | IT Meta Solutions</title>
        <meta name="description" content="E Sahulat Mart case study: ecommerce brand build with Meta Ads delivering 2+ lac PKR sales and controlled spend." />
        <meta property="og:title" content="E Sahulat Mart Case Study - E-commerce Sales Growth | IT Meta Solutions" />
        <meta property="og:description" content="Complete brand build with website, social media, and Meta Ads generating 2+ lac PKR in sales with sustainable daily spend." />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://itmetasolutions.com/case-study/esahulat-mart" />
      </Helmet>
      <ScrollProgress />

      {/* HERO */}
      <section className="relative bg-[#141A2E] overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="absolute inset-0 dot-grid-bg opacity-25 pointer-events-none" />
        <div className="absolute -top-32 right-0 w-[600px] h-[500px] rounded-full bg-[#1D4ED8]/10 blur-[120px] pointer-events-none" />
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex flex-wrap gap-2 mb-8">
              {[{ icon: ShoppingBag, label: "E-Commerce" }, { icon: Globe, label: "Pakistan" }, { icon: LayoutGrid, label: "Website" }, { icon: Instagram, label: "Social" }, { icon: Megaphone, label: "Meta Ads" }].map((b) => (
                <span key={b.label} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-slate-300"><b.icon className="h-3.5 w-3.5 text-[#3AC9F5]" />{b.label}</span>
              ))}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              E Sahulat Mart — Complete Brand Build for <span className="animated-gradient-text">Daily Sales Growth</span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-3xl leading-relaxed">A Pakistan-based general store e-commerce brand for daily essentials — built with a conversion-focused website, trust-first social presence, and a purchase-optimized Meta Ads system to drive consistent orders at low cost.</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-4 max-w-3xl">
              {[{ icon: Wallet, label: "Sales Generated", value: "2+ lac PKR", color: "#1D4ED8" }, { icon: CalendarDays, label: "Duration", value: "~3 months", color: "#23A6E8" }, { icon: Target, label: "Cost per Sale", value: "250–300 PKR", color: "#3AC9F5" }, { icon: Megaphone, label: "Daily Spend", value: "800–1,200 PKR", color: "#1D4ED8" }].map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: `${s.color}30` }}><s.icon className="h-4 w-4" style={{ color: s.color }} /></div>
                    <div><div className="text-base font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</div><div className="text-xs text-slate-400">{s.label}</div></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://esahulatmart.pk" target="_blank" rel="noreferrer" className="btn-primary">Visit Website <ExternalLink className="h-4 w-4" /></a>
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
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>A Sales-Driven Daily Essentials Store Built for Consistent Orders</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">This build focused on conversion UX, trust on social, and a purchase-optimized Meta Ads system that scales sales steadily on controlled spend.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            <LightCard color="#1D4ED8" icon={ShoppingBag} title="Industry" desc="E-commerce · General Store · Daily Essentials (Pakistan)" bullets={["Daily-use products", "Price-sensitive market", "Trust-first buying behavior"]} />
            <LightCard color="#23A6E8" icon={LayoutGrid} title="Scope" desc="Website · Social · Meta Ads · Sales Growth" bullets={["E-commerce website", "IG/FB trust content", "Pixel + conversion events", "Purchase funnel"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={Target} title="Objectives" desc="Conversion + trust + profitable sales" bullets={["Conversion-focused store", "Trust on Instagram & Facebook", "Performance Meta Ads system", "Low cost per purchase"]} delay={0.1} />
          </div>
        </Container>
      </section>

      {/* WEBSITE */}
      <section id="website" className="scroll-mt-28 bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Website (E-commerce Foundation)</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Fast Shopping Experience Built for Conversion</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">A sales-focused e-commerce foundation: clean product discovery, clear pricing and offers, and a smooth cart → checkout flow — optimized for mobile buyers coming from Meta Ads.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <LightCard color="#1D4ED8" icon={LayoutGrid} title="Store Structure" bullets={["Home (offers + featured products)", "Product categories", "Product detail pages", "Cart & checkout flow", "Contact & support"]} />
            <LightCard color="#23A6E8" icon={ShoppingCart} title="Conversion UX" bullets={["Buy Now + Add to Cart", "Limited Stock urgency", "Simple UX for checkout", "Trust cues"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={Truck} title="Trust for Buyers" bullets={["Clear pricing", "COD availability", "Support/contact access", "First-time buyer UX"]} delay={0.1} />
          </div>
        </Container>
      </section>

      {/* ADS */}
      <section id="ads" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Meta Ads (Sales Growth)</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Purchase-Optimized Funnel with Controlled Spend</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">A sales-focused Meta Ads system with pixel tracking, conversion events, product retargeting, and purchase campaigns — enabling consistent daily orders and scalable ROAS without aggressive spend.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <LightCard color="#1D4ED8" icon={Target} title="Meta + Pixel Setup" bullets={["Meta Business Manager", "Ad account setup", "Pixel tracking", "Purchase conversion events", "CBO campaigns"]} />
            <LightCard color="#23A6E8" icon={Users} title="Targeting & Retargeting" bullets={["Product-based targeting", "Website visitors retargeting", "Add-to-cart retargeting", "IG/FB engagers"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={MousePointerClick} title="Purchase Campaigns" bullets={["Purchase objective", "Limited-time offers", "Clear Order Now CTA", "Checkout-driven creatives"]} delay={0.1} />
          </div>
          <Reveal delay={0.15} className="mt-6">
            <div className="premium-card rounded-2xl p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>Performance snapshot (~3 months)</p>
                  <p className="text-sm text-slate-600 mt-1">Daily spend: <strong>800–1,200 PKR</strong> · Cost per sale: <strong>~250–300 PKR</strong> · Total sales: <strong>2+ lac PKR</strong></p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-[#1D4ED8] flex-shrink-0"><BarChart3 className="h-4 w-4" />Profitable sales</span>
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
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Trust-Building Social Presence for Everyday Essentials</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">Profiles, branding, and a content system focused on products, offers, and proof — aligning organic content with paid ads for higher purchase confidence.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <LightCard color="#1D4ED8" icon={Instagram} title="Platforms" desc="Daily essentials audiences across high-reach channels." bullets={["Instagram", "Facebook", "Local buyer trust content"]} />
            <LightCard color="#23A6E8" icon={Globe} title="Brand Setup" desc="Optimized profiles and consistent visuals built for trust." bullets={["Bio + category", "Contact buttons", "Consistent colors", "Product visual style"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={CalendarDays} title="Content Pillars" desc="Content designed to sell and build proof." bullets={["Product showcases", "Offers & discounts", "Order dispatch / trust posts", "Reels for awareness"]} delay={0.1} />
          </div>
        </Container>
      </section>

      {/* RESULTS */}
      <section id="results" className="scroll-mt-28 bg-[#141A2E] py-20 sm:py-28">
        <Container>
          <Reveal className="text-center mb-12">
            <span className="kicker" style={{ borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.07)", color: "#93c5fd" }}>Results</span>
            <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>2+ lac PKR in Sales with a Sustainable Daily Spend Model</h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">A complete e-commerce brand presence with purchase tracking, retargeting, and consistent daily orders — achieving profitable cost per sale on controlled budgets.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-4 mb-10">
            {[{ icon: Wallet, label: "Sales Generated", value: "2+ lac PKR", color: "#1D4ED8" }, { icon: CalendarDays, label: "Campaign Duration", value: "~3 months", color: "#23A6E8" }, { icon: Target, label: "Cost per Sale", value: "250–300 PKR", color: "#3AC9F5" }, { icon: Megaphone, label: "Daily Ad Spend", value: "800–1,200 PKR", color: "#1D4ED8" }].map((s, i) => (
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
                <div className="max-w-2xl"><div className="text-base font-bold text-white mb-1" style={{ fontFamily: "var(--font-heading)" }}>Want a similar growth system?</div><div className="text-sm text-slate-400">We build complete ecommerce brand systems — website, social, and Meta Ads — for your market and product.</div></div>
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
