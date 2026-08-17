import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight, ArrowUpRight, TrendingUp, Users, Zap, Code2, Palette,
  Megaphone, Star, Rocket, Shield, Award, Globe, PlayCircle, Cloud,
  Search, LayoutGrid, Target, CheckCircle2, Sparkles, Database,
  ShoppingBag, BarChart2, Briefcase, Building2, HeartHandshake,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import Container from "../../components/Container";
import SeoContentFaq from "../../components/SeoContentFaq";
import TechMeshBg from "../../components/TechMeshBg";

import ekommartLogo        from "../../assets/img/Ekommart Logo ITMS.webp";
import eSahulatMartLogo    from "../../assets/img/E Sahulat Mart Logo ITMS.webp";
import moreHomesGroupLogo  from "../../assets/img/More Homes Group Logo ITMS.webp";
import heavenlyPurchaseLogo from "../../assets/img/Heavenly Purchase Logo ITMS.webp";
import shenLogo            from "../../assets/img/SHEN Logo.webp";
import showcaseBannerImage from "../../assets/img/Crafting Digital Excellence Since Day One BG Image.webp";

const GoogleReviewsSection = React.lazy(() => import("../../components/GoogleReviewsSection"));

const clientSliderData = [
  { name: "Ekommart",          logo: ekommartLogo },
  { name: "E Sahulat Mart",    logo: eSahulatMartLogo },
  { name: "More Homes Group",  logo: moreHomesGroupLogo },
  { name: "Heavenly Purchase", logo: heavenlyPurchaseLogo },
  { name: "SHEN",              logo: shenLogo },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m      = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia?.("(max-width: 1023px)");
    if (!m && !mobile) return;
    const onChange = () => setReduced(!!m?.matches || !!mobile?.matches);
    onChange();
    m?.addEventListener("change", onChange);
    mobile?.addEventListener("change", onChange);
    return () => {
      m?.removeEventListener("change", onChange);
      mobile?.removeEventListener("change", onChange);
    };
  }, []);
  return reduced;
}

function useDesktopViewport() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1024 : false
  );
  useEffect(() => {
    const media = window.matchMedia?.("(min-width: 1024px)");
    if (!media) return;
    const onChange = () => setIsDesktop(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
}

function DeferredRender({ children, minHeight = 420 }) {
  const ref = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      const timer = window.setTimeout(() => setShouldRender(true), 1400);
      return () => window.clearTimeout(timer);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "800px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={shouldRender ? undefined : { minHeight }}>
      {shouldRender ? children() : null}
    </div>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div
      className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left"
      style={{ transform: `scaleX(${progress})`, background: "linear-gradient(90deg,#1D4ED8,#23A6E8,#3AC9F5)" }}
    />
  );
}

/* ─── DATA ─── */

const stats = [
  { icon: Rocket,     value: "50+",  label: "Projects Delivered",   color: "#1D4ED8" },
  { icon: Users,      value: "40+",  label: "Happy Clients",         color: "#23A6E8" },
  { icon: TrendingUp, value: "200%", label: "Avg. Growth Rate",      color: "#1D4ED8" },
  { icon: Award,      value: "100%", label: "Client Satisfaction",   color: "#3AC9F5" },
];

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Fast, conversion-optimized websites and storefronts built for growth.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&auto=format&fit=crop&q=80",
    link: "/web-development-expertise",
    tag: "Development",
  },
  {
    icon: Cloud,
    title: "Salesforce",
    description: "Expert CRM implementation, LWC development, and workflow automation.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
    link: "/salesforce-expertise",
    tag: "CRM",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Data-driven campaigns that generate qualified leads and measurable ROI.",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&auto=format&fit=crop&q=80",
    link: "/digital-marketing-expertise",
    tag: "Marketing",
  },
  {
    icon: Search,
    title: "SEO",
    description: "Technical SEO, on-page optimization, and content strategy to dominate rankings.",
    image: "https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?w=600&auto=format&fit=crop&q=80",
    link: "/seo-expertise",
    tag: "Search",
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description: "Stunning brand visuals that capture attention and build lasting recognition.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop&q=80",
    link: "/graphic-designing-expertise",
    tag: "Design",
  },
  {
    icon: LayoutGrid,
    title: "Custom Web Apps",
    description: "Bespoke portals, dashboards, and business platforms for your workflow.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&auto=format&fit=crop&q=80",
    link: "/custom-web-apps-expertise",
    tag: "Development",
  },
];

const featuredWork = [
  {
    title: "InHomes Direct",
    category: "Shopify Development",
    description: "Logic-driven Shopify storefront with custom calculators, real-time pricing, and survey-based estimates.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80",
    tags: ["Shopify", "E-commerce", "CRO"],
    link: "/case-study/inhomes-direct",
    metric: "+40% conversion",
  },
  {
    title: "More Homes Group Portal",
    category: "Salesforce CRM",
    description: "CRM-style letting operations portal with agent workflows, property records, dialer tools, and audit logs.",
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&auto=format&fit=crop&q=80",
    tags: ["Salesforce", "CRM", "Real Estate"],
    link: "/case-study/letting-agency-portal",
    metric: "3× faster workflows",
  },
  {
    title: "Ekommart",
    category: "Digital Marketing",
    description: "Complete brand transformation — store build, social presence, and Meta Ads campaigns delivering growth.",
    image: "https://images.unsplash.com/photo-1661956602153-23384936a1d3?w=800&auto=format&fit=crop&q=80",
    tags: ["Meta Ads", "Branding", "E-commerce"],
    link: "/case-study/ekommart",
    metric: "5× ROAS achieved",
  },
];

const whyFeatures = [
  {
    icon: Rocket,
    title: "Launch Fast",
    description: "From idea to live product in weeks, not months. We move at the speed of your ambition.",
  },
  {
    icon: Target,
    title: "Results Focused",
    description: "Every pixel, campaign, and line of code is optimized for conversions and measurable growth.",
  },
  {
    icon: Zap,
    title: "Always Innovating",
    description: "We stay ahead of trends so you stay ahead of competition — cutting-edge solutions, always.",
  },
  {
    icon: HeartHandshake,
    title: "Partnership Mindset",
    description: "We don't just deliver and disappear. We're invested in your long-term success.",
  },
];

const processSteps = [
  { step: "01", title: "Discovery",     description: "We dive deep into your business, goals, and audience to understand what success looks like for you." },
  { step: "02", title: "Strategy",      description: "Based on our findings, we craft a tailored strategy and roadmap aligned to your objectives." },
  { step: "03", title: "Create",        description: "Our team brings the strategy to life with stunning design and flawless execution." },
  { step: "04", title: "Launch & Grow", description: "We launch your project and continuously optimize for maximum performance and growth." },
];

const industries = [
  { icon: ShoppingBag, label: "E-commerce" },
  { icon: Building2,   label: "Real Estate" },
  { icon: Cloud,       label: "SaaS & Tech" },
  { icon: BarChart2,   label: "Finance" },
  { icon: HeartHandshake, label: "Healthcare" },
  { icon: Briefcase,   label: "Professional Services" },
  { icon: Globe,       label: "Travel & Hospitality" },
  { icon: Sparkles,    label: "Retail & Fashion" },
];

const seoContent = {
  kicker: "Full-Service Agency",
  title: "Salesforce, E-commerce, and Performance Marketing Under One Roof",
  subtitle: "IT Meta Solutions is a Salesforce implementation partner and digital agency helping brands scale with LWC development, Experience Cloud portals, and high-converting ecommerce.",
  paragraphs: [
    "We build performance-optimized Shopify and WooCommerce stores, custom web apps, and CRM automation that connect sales, marketing, and service teams.",
    "From Meta Ads ROAS optimization to data-driven lead generation, our team delivers measurable growth for startups and enterprise brands in Pakistan, the UK, and the US.",
  ],
  bullets: [
    "Salesforce LWC development services and Experience Cloud portals",
    "Shopify custom theme development and conversion-focused UX",
    "CRM data cleaning, duplicate checks, and automation workflows",
    "Scalable Meta Ads strategies with ROAS optimization",
  ],
};

/* ─── PAGE ─── */

export default function Home() {
  const reduced   = usePrefersReducedMotion();
  const isDesktop = useDesktopViewport();

  const rv = (props) => reduced ? {} : props;

  return (
    <>
      <Helmet>
        <title>IT Meta Solutions - Premium Web Development &amp; Digital Marketing Agency</title>
        <meta name="description" content="Salesforce implementation partners delivering LWC, Experience Cloud, Shopify, and performance marketing for high-converting growth." />
        <link rel="canonical" href="https://itmetasolutions.com/" />
      </Helmet>

      <div>
        <ScrollProgress />

        {/* ════════════════════════════════════════
            HERO — Dark, premium
        ════════════════════════════════════════ */}
        <section className="relative bg-[#141A2E] pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
          {/* Subtle office BG */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&auto=format&fit=crop&q=30"
              alt=""
              className="w-full h-full object-cover"
              style={{ opacity: 0.04 }}
            />
          </div>
          <TechMeshBg variant="full" iconOpacityBase={0.032} />
          <div className="absolute inset-0 dot-grid-bg opacity-55 pointer-events-none" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 75% 55% at 50% 0%, rgba(29,78,216,0.13) 0%, transparent 70%)" }}
          />

          <Container>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

              {/* LEFT */}
              <div>
                <motion.div
                  {...rv({ initial: { y: 16, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.6 } })}
                >
                  <span
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold text-white"
                    style={{
                      fontFamily: "var(--font-heading)",
                      background: "rgba(29,78,216,0.12)",
                      border: "1px solid rgba(29,78,216,0.38)",
                      boxShadow: "0 0 20px rgba(29,78,216,0.16)",
                    }}
                  >
                    <Sparkles className="h-3.5 w-3.5 text-[#60A5FA]" />
                    Trusted by 40+ businesses worldwide
                  </span>
                </motion.div>

                <motion.h1
                  {...rv({ initial: { y: 16, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.6, delay: 0.1 } })}
                  className="mt-6 text-[2.6rem] sm:text-5xl lg:text-6xl xl:text-[68px] font-extrabold tracking-tight text-white leading-[1.04]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Build. Grow.
                  <br />
                  <span className="animated-gradient-text">Dominate.</span>
                </motion.h1>

                <motion.p
                  {...rv({ initial: { y: 16, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.6, delay: 0.18 } })}
                  className="mt-5 text-base text-zinc-400 sm:text-lg max-w-[440px] leading-relaxed"
                >
                  We craft high-converting websites, launch powerful marketing campaigns, and build brands that stand out in the digital world.
                </motion.p>

                <motion.div
                  {...rv({ initial: { y: 16, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.6, delay: 0.26 } })}
                  className="mt-8 flex flex-col gap-3 sm:flex-row"
                >
                  <Link to="/contact" className="btn-primary">
                    Start Your Project
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link to="/work" className="btn-ghost-dark">
                    <PlayCircle className="h-4 w-4" />
                    View Our Work
                  </Link>
                </motion.div>

                <motion.div
                  {...rv({ initial: { y: 8, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.6, delay: 0.36 } })}
                  className="mt-10 flex flex-wrap items-center gap-5 text-sm text-zinc-500"
                >
                  {[
                    { icon: Shield,       color: "text-emerald-400", label: "100% Satisfaction" },
                    { icon: CheckCircle2, color: "text-blue-400",    label: "On-Time Delivery"  },
                    { icon: Award,        color: "text-yellow-400",  label: "SECP Registered"   },
                  ].map(({ icon: Icon, color, label }, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <Icon className={`h-4 w-4 ${color}`} />
                      <span>{label}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* RIGHT — Browser + mobile mockup */}
              {isDesktop && (
                <motion.div
                  {...rv({ initial: { x: 48, opacity: 0 }, animate: { x: 0, opacity: 1 }, transition: { duration: 0.9, delay: 0.22, ease: "easeOut" } })}
                  className="relative flex items-center justify-center"
                >
                  <div className="relative w-full max-w-[480px]">
                    {/* Browser Window */}
                    <div className="rounded-2xl border border-white/10 bg-zinc-900/90 backdrop-blur-xl shadow-2xl shadow-[#1D4ED8]/20 overflow-hidden">
                      {/* Chrome bar */}
                      <div className="flex items-center gap-3 px-4 py-3 bg-zinc-800/80 border-b border-white/10">
                        <div className="flex gap-1.5 shrink-0">
                          <div className="h-3 w-3 rounded-full bg-red-500/80" />
                          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                          <div className="h-3 w-3 rounded-full bg-green-500/80" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 rounded-md bg-zinc-700/60 px-3 py-1.5 text-xs text-zinc-400">
                            <Globe className="h-3 w-3 shrink-0" />
                            <span className="truncate">client-portal.itmetasolutions.com</span>
                          </div>
                        </div>
                      </div>

                      {/* Dashboard content */}
                      <div className="p-4 space-y-3 bg-[#0d0d14]">
                        {/* Status row */}
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { label: "Website",   value: "Live",     icon: Globe,      glow: "from-emerald-500/10", iconColor: "text-emerald-400", badge: "✓", badgeColor: "text-emerald-400" },
                            { label: "SEO",       value: "94/100",   icon: Search,     glow: "from-blue-500/10",    iconColor: "text-sky-400",     badge: "↑", badgeColor: "text-sky-400" },
                            { label: "Web App",   value: "v2.1",     icon: LayoutGrid, glow: "from-blue-500/10",    iconColor: "text-blue-400",    badge: "●", badgeColor: "text-blue-400" },
                            { label: "Marketing", value: "3 Active", icon: Megaphone,  glow: "from-pink-500/10",    iconColor: "text-pink-400",    badge: "↗", badgeColor: "text-pink-400" },
                          ].map((s) => {
                            const Icon = s.icon;
                            return (
                              <div key={s.label} className={`rounded-xl bg-gradient-to-b ${s.glow} to-transparent border border-white/10 p-2`}>
                                <div className="flex items-center justify-between mb-1">
                                  <Icon className={`h-3 w-3 ${s.iconColor}`} />
                                  <span className={`text-[9px] font-bold ${s.badgeColor}`}>{s.badge}</span>
                                </div>
                                <div className="text-[9px] text-zinc-500 uppercase tracking-wide">{s.label}</div>
                                <div className="text-[11px] font-bold text-white mt-0.5">{s.value}</div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Middle panels */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="rounded-xl bg-white/[0.04] border border-white/10 p-2.5">
                            <div className="text-[10px] font-semibold text-zinc-400 mb-2 uppercase tracking-wide flex items-center gap-1">
                              <Globe className="h-2.5 w-2.5" /> Website
                            </div>
                            <div className="flex items-center justify-between bg-zinc-800/70 rounded px-1.5 py-1 mb-1.5">
                              <div className="h-1.5 w-7 rounded bg-[#1D4ED8]/70" />
                              <div className="flex gap-1">
                                {[10,8,10].map((w,i) => <div key={i} className="h-1 rounded bg-white/15" style={{width:w}} />)}
                              </div>
                            </div>
                            <div className="rounded bg-gradient-to-br from-[#1D4ED8]/25 to-purple-900/10 p-1.5 mb-1.5">
                              <div className="h-1.5 w-16 rounded bg-white/30 mb-1" />
                              <div className="h-1 w-12 rounded bg-white/15 mb-0.5" />
                              <div className="h-1 w-10 rounded bg-white/10 mb-1.5" />
                              <div className="h-3 w-10 rounded-full bg-[#1D4ED8]/80" />
                            </div>
                            <div className="grid grid-cols-3 gap-1">
                              {["#1D4ED8","#23A6E8","#3b82f6"].map((c,i) => (
                                <div key={i} className="rounded p-1" style={{background:`${c}18`,border:`1px solid ${c}30`}}>
                                  <div className="h-2 w-2 rounded-sm mb-0.5" style={{background:`${c}50`}} />
                                  <div className="h-0.5 rounded" style={{width:"75%",background:"rgba(255,255,255,0.2)"}} />
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="rounded-xl bg-white/[0.04] border border-white/10 p-2.5">
                            <div className="text-[10px] font-semibold text-zinc-400 mb-2 uppercase tracking-wide flex items-center gap-1">
                              <Search className="h-2.5 w-2.5" /> SEO Rankings
                            </div>
                            {[
                              {kw:"web design agency",pos:1,chg:"+5"},
                              {kw:"digital marketing", pos:3,chg:"+2"},
                              {kw:"seo services",      pos:4,chg:"+8"},
                              {kw:"crm development",   pos:7,chg:"+3"},
                            ].map(r => (
                              <div key={r.kw} className="flex items-center gap-1.5 mb-1.5 last:mb-0">
                                <span className={`text-[10px] font-bold w-4 text-center shrink-0 ${r.pos===1?"text-yellow-400":r.pos<=3?"text-emerald-400":"text-zinc-500"}`}>#{r.pos}</span>
                                <span className="text-[10px] text-zinc-400 flex-1 truncate">{r.kw}</span>
                                <span className="text-[9px] text-emerald-400 shrink-0">↑{r.chg}</span>
                              </div>
                            ))}
                            <div className="mt-2 flex items-center gap-1 rounded-md bg-blue-500/10 border border-blue-500/20 px-1.5 py-1">
                              <TrendingUp className="h-2.5 w-2.5 text-sky-400 shrink-0" />
                              <span className="text-[9px] text-sky-300">Avg. +4.5 positions this month</span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom panels */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="rounded-xl bg-white/[0.04] border border-white/10 p-2.5">
                            <div className="text-[10px] font-semibold text-zinc-400 mb-2 uppercase tracking-wide flex items-center gap-1">
                              <Megaphone className="h-2.5 w-2.5" /> Marketing
                            </div>
                            {[
                              {name:"Google Ads",pct:82,color:"bg-blue-500"},
                              {name:"Meta Ads",  pct:67,color:"bg-pink-500"},
                              {name:"Email",     pct:91,color:"bg-[#1D4ED8]"},
                            ].map(c => (
                              <div key={c.name} className="mb-1.5 last:mb-0">
                                <div className="flex justify-between mb-0.5">
                                  <span className="text-[10px] text-zinc-400">{c.name}</span>
                                  <span className="text-[10px] text-zinc-500">{c.pct}%</span>
                                </div>
                                <div className="h-1.5 rounded-full bg-white/10">
                                  <div className={`h-full rounded-full ${c.color}`} style={{width:`${c.pct}%`}} />
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="rounded-xl bg-white/[0.04] border border-white/10 p-2.5">
                            <div className="text-[10px] font-semibold text-zinc-400 mb-2 uppercase tracking-wide flex items-center gap-1">
                              <Database className="h-2.5 w-2.5" /> CRM Pipeline
                            </div>
                            {[
                              {stage:"New Leads",count:24,color:"bg-blue-400"},
                              {stage:"Qualified", count:18,color:"bg-sky-400"},
                              {stage:"Proposal",  count:11,color:"bg-yellow-400"},
                              {stage:"Closed",    count:8, color:"bg-emerald-400"},
                            ].map(s => (
                              <div key={s.stage} className="flex items-center gap-1.5 mb-1.5 last:mb-0">
                                <div className={`h-1.5 w-1.5 rounded-full shrink-0 ${s.color}`} />
                                <span className="text-[10px] text-zinc-400 flex-1 truncate">{s.stage}</span>
                                <span className="text-[10px] font-semibold text-zinc-300 shrink-0">{s.count}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating Mobile Mockup */}
                    <div className="absolute -bottom-10 -right-10 w-[108px] rounded-[20px] border-[3px] border-zinc-700 bg-[#0d0d14] shadow-2xl shadow-[#1D4ED8]/25 overflow-hidden">
                      <div className="h-3 bg-zinc-800 flex items-center justify-center">
                        <div className="h-1 w-10 rounded-full bg-zinc-600" />
                      </div>
                      <div className="p-2 space-y-1.5">
                        <div className="flex items-center justify-between bg-zinc-800/80 rounded px-1.5 py-1">
                          <div className="h-1.5 w-6 rounded bg-[#1D4ED8]/80" />
                          <div className="flex flex-col gap-0.5">
                            {[0,1,2].map(i => <div key={i} className="h-px w-3 rounded bg-white/30" />)}
                          </div>
                        </div>
                        <div className="rounded-lg bg-gradient-to-br from-[#1D4ED8]/30 to-purple-900/10 border border-[#1D4ED8]/25 p-1.5">
                          <div className="h-1.5 w-14 rounded bg-white/30 mb-1" />
                          <div className="h-1 w-10 rounded bg-white/15 mb-0.5" />
                          <div className="h-1 w-8 rounded bg-white/10 mb-1.5" />
                          <div className="h-3 w-9 rounded-full bg-[#1D4ED8]/80" />
                        </div>
                        <div className="flex items-center gap-1 rounded-md bg-emerald-500/15 border border-emerald-500/25 px-1.5 py-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span style={{fontSize:"7px"}} className="text-emerald-300 font-medium">Mobile Ready</span>
                        </div>
                      </div>
                    </div>

                    {/* Floating badges */}
                    <div
                      className="absolute -top-5 -left-6 flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/90 backdrop-blur-sm px-3 py-2 shadow-xl shadow-black/40"
                      style={{ animation: "floatY 3s ease-in-out infinite" }}
                    >
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-xs font-semibold text-white" style={{fontFamily:"var(--font-heading)"}}>+127% Traffic Growth</span>
                    </div>

                    <div
                      className="absolute bottom-16 -left-8 flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/90 backdrop-blur-sm px-3 py-2 shadow-xl shadow-black/40"
                      style={{ animation: "floatYReverse 3.5s ease-in-out infinite" }}
                    >
                      <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-semibold text-white" style={{fontFamily:"var(--font-heading)"}}>98% Client Satisfaction</span>
                    </div>

                    <div
                      className="absolute top-1/2 -right-8 -translate-y-1/2 flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/90 backdrop-blur-sm px-3 py-2 shadow-xl shadow-black/40"
                      style={{ animation: "floatY 4s ease-in-out infinite" }}
                    >
                      <Rocket className="h-3.5 w-3.5 text-sky-400" />
                      <span className="text-xs font-semibold text-white" style={{fontFamily:"var(--font-heading)"}}>50+ Projects Delivered</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </Container>
        </section>

        {/* ════════════════════════════════════════
            CLIENT LOGOS — trust strip
        ════════════════════════════════════════ */}
        <section className="py-10 sm:py-14 bg-[#141A2E] relative overflow-hidden border-b border-white/[0.06]">
          <Container>
            <p className="text-center text-[11px] sm:text-xs font-semibold uppercase tracking-[0.26em] text-zinc-600 mb-8">
              Trusted by 40+ growing businesses worldwide
            </p>
          </Container>
          <div style={{ overflow: "hidden" }}>
            <Marquee speed={36} pauseOnHover gradient gradientColor="#141A2E" gradientWidth={100}>
              {[...clientSliderData, ...clientSliderData, ...clientSliderData].map((client, i) => (
                <div key={i} className="group mx-10 flex-shrink-0 flex items-center justify-center">
                  {client.logo && (
                    <img
                      src={client.logo}
                      alt={`${client.name} logo`}
                      className="h-[42px] w-auto object-contain opacity-30 transition-all duration-300 group-hover:opacity-70"
                      style={{ filter: "brightness(1.1)" }}
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </div>
              ))}
            </Marquee>
          </div>
        </section>

        {/* ════════════════════════════════════════
            STATS — Light section
        ════════════════════════════════════════ */}
        <section className="bg-white py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 light-grid-bg opacity-70 pointer-events-none" />
          <Container>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={i}
                    {...rv({ initial: { y: 20, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.5, delay: i * 0.1 } })}
                    className={`text-center px-6 py-10 relative ${
                      i % 2 !== 0 ? "border-l border-slate-100" : ""
                    } ${
                      i >= 2 ? "border-t border-slate-100 lg:border-t-0" : ""
                    } ${
                      i !== 0 ? "lg:border-l lg:border-slate-100" : ""
                    }`}
                  >
                    <div
                      className="inline-flex h-11 w-11 items-center justify-center rounded-xl mb-4 mx-auto"
                      style={{ background: `${stat.color}15`, boxShadow: `0 0 18px ${stat.color}20` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: stat.color }} />
                    </div>
                    <div
                      className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#141A2E]"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {stat.value}
                    </div>
                    <div className="mt-2 text-sm text-slate-500">{stat.label}</div>
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-full"
                      style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ════════════════════════════════════════
            SERVICES — Mist section
        ════════════════════════════════════════ */}
        <section className="bg-[#F1F4F9] py-20 sm:py-28 relative overflow-hidden">
          <Container>
            <motion.div
              {...rv({ initial: { y: 20, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.5 } })}
              className="text-center mb-14"
            >
              <p className="kicker mb-4">What We Do Best</p>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#141A2E] leading-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Services That <span className="gradient-text">Transform</span>
              </h2>
              <p className="mt-4 text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
                End-to-end digital solutions designed to scale your business and deliver measurable results.
              </p>
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={i}
                    {...rv({ initial: { y: 20, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true, margin: "-40px" }, transition: { duration: 0.45, delay: i * 0.07 } })}
                    className="h-full"
                  >
                    <Link
                      to={service.link}
                      className="group relative flex flex-col h-full rounded-2xl overflow-hidden bg-white border border-slate-100 transition-all duration-300 hover:shadow-xl hover:shadow-[#1D4ED8]/08 hover:border-[#1D4ED8]/25 hover:-translate-y-1"
                      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 6px 20px rgba(0,0,0,0.04)" }}
                    >
                      {/* Top accent on hover */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#1D4ED8] to-[#3AC9F5] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm border border-slate-100 px-2.5 py-1 text-[11px] font-semibold text-[#1D4ED8]">
                            {service.tag}
                          </span>
                        </div>
                        <div
                          className="absolute bottom-4 left-4 h-10 w-10 rounded-xl bg-white flex items-center justify-center"
                          style={{ boxShadow: "0 4px 16px rgba(29,78,216,0.18)" }}
                        >
                          <Icon className="h-5 w-5 text-[#1D4ED8]" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1">
                        <h3
                          className="text-lg font-bold text-[#141A2E]"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {service.title}
                        </h3>
                        <p className="mt-2 text-sm text-slate-500 leading-relaxed flex-1">{service.description}</p>
                        <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-[#1D4ED8] group-hover:gap-2.5 transition-all duration-200">
                          <span>Learn more</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              {...rv({ initial: { y: 16, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.5 } })}
              className="mt-12 text-center"
            >
              <Link to="/services" className="btn-primary">
                Explore All Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </Container>
        </section>

        {/* ════════════════════════════════════════
            WHY CHOOSE US — White, side-by-side
        ════════════════════════════════════════ */}
        <section className="bg-white py-20 sm:py-28 relative overflow-hidden">
          <Container>
            <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

              {/* Left: image */}
              <motion.div
                {...rv({ initial: { x: -30, opacity: 0 }, whileInView: { x: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.7 } })}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[#1D4ED8]/10">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
                    alt="IT Meta Solutions team collaborating"
                    className="w-full h-[380px] sm:h-[480px] object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141A2E]/30 via-transparent to-transparent" />
                  {/* Brand overlay frame */}
                  <div
                    className="absolute -inset-[1px] rounded-2xl pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, rgba(29,78,216,0.4) 0%, transparent 50%, rgba(58,201,245,0.18) 100%)",
                      padding: "1px",
                      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    }}
                  />
                </div>

                {/* Floating badges */}
                <div
                  className="absolute top-5 -right-4 sm:-right-6 flex items-center gap-2 rounded-xl border border-[#1D4ED8]/20 bg-white px-4 py-2.5 shadow-lg"
                  style={{ animation: "floatY 3s ease-in-out infinite" }}
                >
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-semibold text-[#141A2E]" style={{fontFamily:"var(--font-heading)"}}>SECP Registered</span>
                </div>

                <div
                  className="absolute bottom-5 -left-4 sm:-left-6 flex items-center gap-2 rounded-xl border border-[#1D4ED8]/20 bg-white px-4 py-2.5 shadow-lg"
                  style={{ animation: "floatYReverse 3.5s ease-in-out infinite" }}
                >
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-semibold text-[#141A2E]" style={{fontFamily:"var(--font-heading)"}}>5+ Years of Excellence</span>
                </div>
              </motion.div>

              {/* Right: features */}
              <motion.div
                {...rv({ initial: { x: 30, opacity: 0 }, whileInView: { x: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.7, delay: 0.15 } })}
              >
                <p className="kicker mb-5">Why Brands Choose Us</p>
                <h2
                  className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-[#141A2E] leading-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Creativity meets
                  <br />
                  <span className="gradient-text">strategy & results</span>
                </h2>
                <p className="mt-5 text-base text-slate-500 leading-relaxed">
                  Join 40+ brands growing with us. We don't just build websites — we build engines for business growth that compound over time.
                </p>

                <div className="mt-8 space-y-4">
                  {whyFeatures.map((item, i) => (
                    <motion.div
                      key={i}
                      {...rv({ initial: { x: 20, opacity: 0 }, whileInView: { x: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.4, delay: 0.1 + i * 0.08 } })}
                      className="flex gap-4 rounded-2xl border border-slate-100 bg-[#F8FAFD] p-4 hover:border-[#1D4ED8]/25 hover:bg-white transition-all duration-200"
                      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
                    >
                      <div
                        className="flex-shrink-0 h-10 w-10 rounded-xl bg-[#1D4ED8]/10 flex items-center justify-center"
                      >
                        <item.icon className="h-5 w-5 text-[#1D4ED8]" />
                      </div>
                      <div>
                        <h4
                          className="text-base font-bold text-[#141A2E]"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {item.title}
                        </h4>
                        <p className="mt-1 text-sm text-slate-500 leading-relaxed">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/contact" className="btn-primary">
                    Let's Talk
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/work" className="btn-ghost-light">
                    See Our Work
                  </Link>
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* ════════════════════════════════════════
            FEATURED WORK — Mist section
        ════════════════════════════════════════ */}
        <section className="bg-[#F1F4F9] py-20 sm:py-28 relative overflow-hidden">
          <Container>
            <motion.div
              {...rv({ initial: { y: 20, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.5 } })}
              className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
            >
              <div>
                <p className="kicker mb-3">Our Work</p>
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#141A2E]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Featured Projects
                </h2>
              </div>
              <Link to="/work" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1D4ED8] hover:gap-3 transition-all shrink-0">
                View all projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-3">
              {featuredWork.map((work, i) => (
                <motion.div
                  key={i}
                  {...rv({ initial: { y: 20, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true, margin: "-40px" }, transition: { duration: 0.45, delay: i * 0.1 } })}
                >
                  <Link
                    to={work.link}
                    className="group flex flex-col h-full rounded-2xl overflow-hidden bg-white border border-slate-100 transition-all duration-300 hover:shadow-xl hover:shadow-[#1D4ED8]/08 hover:border-[#1D4ED8]/25 hover:-translate-y-1"
                    style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 6px 20px rgba(0,0,0,0.04)" }}
                  >
                    {/* Project image */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={work.image}
                        alt={work.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141A2E]/70 via-transparent to-transparent" />
                      {/* Category pill */}
                      <div className="absolute top-4 left-4 rounded-full bg-[#1D4ED8] px-3 py-1 text-xs font-semibold text-white">
                        {work.category}
                      </div>
                      {/* Arrow */}
                      <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 transition-all border border-white/25">
                        <ArrowUpRight className="h-4 w-4 text-white" />
                      </div>
                      {/* Metric badge */}
                      <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-black/50 backdrop-blur-sm px-3 py-1">
                        <TrendingUp className="h-3 w-3 text-emerald-400" />
                        <span className="text-[11px] font-semibold text-white">{work.metric}</span>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3
                        className="text-lg font-bold text-[#141A2E]"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {work.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-500 leading-relaxed line-clamp-2 flex-1">{work.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {work.tags.map(tag => (
                          <span key={tag} className="rounded-full bg-[#1D4ED8]/08 border border-[#1D4ED8]/15 px-2.5 py-0.5 text-[11px] font-semibold text-[#1D4ED8]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* ════════════════════════════════════════
            PROCESS — Dark section
        ════════════════════════════════════════ */}
        <section className="bg-[#141A2E] py-20 sm:py-28 relative overflow-hidden">
          <TechMeshBg variant="marketing" iconColor="#1D4ED8" iconOpacityBase={0.025} />
          <div className="absolute inset-0 dot-grid-bg opacity-35 pointer-events-none" />

          <Container>
            <motion.div
              {...rv({ initial: { y: 20, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.5 } })}
              className="text-center mb-16"
            >
              <p className="kicker mb-4 text-[#60A5FA]" style={{ color: "#60A5FA" }}>Our Process</p>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                How We Bring Your Vision to Life
              </h2>
              <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-sm sm:text-base">
                A proven 4-step process that delivers results every time — on time, on budget.
              </p>
            </motion.div>

            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 sm:gap-x-8">
              {/* Connector line */}
              <div className="absolute top-[38px] left-[calc(12.5%+19px)] right-[calc(12.5%+19px)] hidden lg:block">
                <div className="h-px w-full shimmer-border" />
              </div>

              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  {...rv({ initial: { y: 20, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true, margin: "-40px" }, transition: { duration: 0.45, delay: i * 0.12 } })}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className="relative z-10 flex h-[76px] w-[76px] flex-shrink-0 items-center justify-center rounded-full bg-[#13122a] border border-[#2d2a5e]"
                    style={{ boxShadow: "0 0 18px rgba(29,78,216,0.28), 0 0 36px rgba(29,78,216,0.08)" }}
                  >
                    <span
                      className="text-2xl font-extrabold text-[#60A5FA] leading-none"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {step.step}
                    </span>
                  </div>
                  <h4
                    className="mt-6 text-base sm:text-lg font-bold text-white"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {step.title}
                  </h4>
                  <p className="mt-2.5 text-sm text-zinc-400 leading-relaxed max-w-[200px]">{step.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              {...rv({ initial: { y: 16, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.5, delay: 0.3 } })}
              className="mt-14 text-center"
            >
              <Link to="/process" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#60A5FA] hover:gap-3 transition-all">
                Learn more about our process
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </Container>
        </section>

        {/* ════════════════════════════════════════
            INDUSTRIES — White section
        ════════════════════════════════════════ */}
        <section className="bg-white py-16 sm:py-20 relative overflow-hidden">
          <Container>
            <motion.div
              {...rv({ initial: { y: 20, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.5 } })}
              className="text-center mb-10"
            >
              <p className="kicker mb-3">Industries We Serve</p>
              <h2
                className="text-2xl sm:text-3xl font-extrabold text-[#141A2E]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Solutions for Every Industry
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {industries.map((industry, i) => {
                const Icon = industry.icon;
                return (
                  <motion.div
                    key={i}
                    {...rv({ initial: { scale: 0.9, opacity: 0 }, whileInView: { scale: 1, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.35, delay: i * 0.05 } })}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#F8FAFD] border border-slate-100 hover:border-[#1D4ED8]/25 hover:bg-white transition-all duration-200 group cursor-default"
                  >
                    <div className="h-9 w-9 rounded-lg bg-[#1D4ED8]/10 flex items-center justify-center group-hover:bg-[#1D4ED8]/15 transition-colors">
                      <Icon className="h-4.5 w-4.5 text-[#1D4ED8]" />
                    </div>
                    <span className="text-xs font-semibold text-slate-600 text-center leading-tight">{industry.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ════════════════════════════════════════
            GOOGLE REVIEWS — Mist section
        ════════════════════════════════════════ */}
        <div className="bg-[#F1F4F9]">
          <DeferredRender minHeight={400}>
            {() => (
              <React.Suspense fallback={<div className="py-20 bg-[#F1F4F9]" />}>
                <GoogleReviewsSection
                  title="What Our Clients Say"
                  description="Real feedback from our Google Business profile."
                  lightTheme={true}
                />
              </React.Suspense>
            )}
          </DeferredRender>
        </div>

        {/* ════════════════════════════════════════
            CTA BANNER — Dark, dramatic
        ════════════════════════════════════════ */}
        <section className="py-20 sm:py-28 bg-[#141A2E] relative overflow-hidden">
          <TechMeshBg variant="marketing" iconColor="#1D4ED8" iconOpacityBase={0.028} />
          <Container>
            <motion.div
              {...rv({ initial: { y: 16, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.5 } })}
              className="relative overflow-hidden rounded-3xl"
              style={{ boxShadow: "0 0 70px rgba(29,78,216,0.18), 0 0 0 1px rgba(29,78,216,0.20)" }}
            >
              {/* Background */}
              <div className="absolute inset-0">
                {showcaseBannerImage
                  ? <img src={showcaseBannerImage} alt="" className="h-full w-full object-cover" loading="lazy" />
                  : <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&auto=format&fit=crop&q=50" alt="" className="h-full w-full object-cover" />
                }
              </div>
              <div className="absolute inset-0 bg-black/65 z-[5]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#141A2E]/90 via-[#1D4ED8]/25 to-transparent z-10" />

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-24 h-24 z-20 pointer-events-none"
                style={{ background: "linear-gradient(135deg, rgba(29,78,216,0.35) 0%, transparent 50%)" }} />
              <div className="absolute bottom-0 right-0 w-32 h-32 z-20 pointer-events-none"
                style={{ background: "linear-gradient(315deg, rgba(58,201,245,0.10) 0%, transparent 50%)" }} />

              <div className="relative z-20 h-[360px] sm:h-[420px] flex items-center px-8 sm:px-12 lg:px-16">
                <div className="max-w-lg">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#60A5FA] mb-4">Ready to Grow?</p>
                  <h3
                    className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Let's build something
                    <span className="block animated-gradient-text">extraordinary together.</span>
                  </h3>
                  <p className="mt-5 text-base text-white/65 leading-relaxed max-w-md">
                    Join 40+ businesses that trust IT Meta Solutions to deliver digital results that actually matter.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link to="/contact" className="btn-primary">
                      Start Your Project
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link to="/work" className="btn-ghost-dark">
                      View Our Work
                    </Link>
                  </div>
                  {/* Quick stats */}
                  <div className="mt-8 flex flex-wrap gap-8">
                    {[
                      { value: "50+",  label: "Projects" },
                      { value: "40+",  label: "Clients"  },
                      { value: "100%", label: "Satisfaction" },
                    ].map((s, i) => (
                      <div key={i}>
                        <div
                          className="text-2xl sm:text-3xl font-extrabold text-white"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {s.value}
                        </div>
                        <div className="text-xs text-white/45 mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* SEO content block */}
        <div className="bg-white">
          <SeoContentFaq content={seoContent} lightTheme={true} />
        </div>

      </div>
    </>
  );
}
