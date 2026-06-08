import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight, ArrowUpRight, TrendingUp, Users, Zap, Code2, Palette,
  Megaphone, Star, Rocket, Shield, Award, Globe, PlayCircle, Cloud,
  Search, LayoutGrid, Target, CheckCircle2, Sparkles, Database,
} from "lucide-react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
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

/* ─── HELPERS ─── */

const cx = (...classes) => classes.filter(Boolean).join(" ");

const strippedMotionProps = new Set([
  "animate","exit","initial","layout","transition","variants",
  "viewport","whileHover","whileInView","whileTap",
]);

function createStaticMotionComponent(Tag) {
  return React.forwardRef(function StaticMotionComponent(props, ref) {
    const cleanProps = {};
    Object.entries(props).forEach(([k, v]) => {
      if (!strippedMotionProps.has(k)) cleanProps[k] = v;
    });
    return <Tag ref={ref} {...cleanProps} />;
  });
}

const motion = {
  div: createStaticMotionComponent("div"),
  h1:  createStaticMotionComponent("h1"),
  p:   createStaticMotionComponent("p"),
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m      = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia?.("(max-width: 1023px)");
    if (!m && !mobile) return;
    const onChange = () => setReduced(!!m?.matches || !!mobile?.matches);
    onChange();
    m.addEventListener?.("change", onChange);
    mobile?.addEventListener?.("change", onChange);
    return () => {
      m.removeEventListener?.("change", onChange);
      mobile?.removeEventListener?.("change", onChange);
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
    media.addEventListener?.("change", onChange);
    return () => media.removeEventListener?.("change", onChange);
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
      { rootMargin: "1000px 0px" }
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
  { icon: Rocket,     value: "50+",  label: "Projects Launched" },
  { icon: Users,      value: "40+",  label: "Happy Clients" },
  { icon: TrendingUp, value: "200%", label: "Avg. Growth Rate" },
  { icon: Award,      value: "100%", label: "Client Satisfaction" },
];

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Fast, conversion-optimized websites and storefronts built with modern technology.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&auto=format&fit=crop&q=80",
    link: "/web-development-expertise",
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description: "Stunning brand visuals that capture attention and build lasting recognition.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop&q=80",
    link: "/graphic-designing-expertise",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Data-driven campaigns that generate qualified leads and drive measurable ROI.",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&auto=format&fit=crop&q=80",
    link: "/digital-marketing-expertise",
  },
  {
    icon: Search,
    title: "SEO",
    description: "Technical SEO, on-page optimization, and content strategy to dominate rankings.",
    image: "https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?w=600&auto=format&fit=crop&q=80",
    link: "/seo-expertise",
  },
  {
    icon: Cloud,
    title: "Salesforce",
    description: "Expert CRM implementation, LWC development, and workflow automation.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
    link: "/salesforce-expertise",
  },
  {
    icon: LayoutGrid,
    title: "Custom Web Apps",
    description: "Bespoke portals, dashboards, and business platforms built for your workflow.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&auto=format&fit=crop&q=80",
    link: "/custom-web-apps-expertise",
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
  },
  {
    title: "More Homes Group CRM",
    category: "Salesforce",
    description: "CRM-style letting operations portal with agent workflows, property records, dialer tools, and audit logs.",
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&auto=format&fit=crop&q=80",
    tags: ["Salesforce", "CRM", "Real Estate"],
    link: "/case-study/letting-agency-portal",
  },
  {
    title: "Ekommart",
    category: "Digital Marketing",
    description: "Complete brand transformation — store build, social presence, and Meta Ads campaigns.",
    image: "https://images.unsplash.com/photo-1661956602153-23384936a1d3?w=800&auto=format&fit=crop&q=80",
    tags: ["Meta Ads", "Branding", "E-commerce"],
    link: "/case-study/ekommart",
  },
];

const whyFeatures = [
  { icon: Rocket, title: "Launch Fast",         description: "From idea to live product in weeks, not months. We move at the speed of your ambition.",                   accent: "#1D4ED8" },
  { icon: Target, title: "Results Focused",     description: "Every pixel, campaign, and line of code is optimized for conversions and measurable growth.",              accent: "#23A6E8" },
  { icon: Zap,    title: "Always Innovating",   description: "We stay ahead of trends so you stay ahead of competition. Cutting-edge solutions, always.",                accent: "#3AC9F5" },
];

const processSteps = [
  { step: "01", title: "Discovery",     description: "We dive deep into your business, goals, and audience to understand what success looks like for you." },
  { step: "02", title: "Strategy",      description: "Based on our findings, we craft a tailored strategy and roadmap aligned to your objectives." },
  { step: "03", title: "Create",        description: "Our team brings the strategy to life with stunning design and flawless execution." },
  { step: "04", title: "Launch & Grow", description: "We launch your project and continuously optimize for maximum performance and growth." },
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

  return (
    <>
      <Helmet>
        <title>IT Meta Solutions - Premium Web Development &amp; Digital Marketing</title>
        <meta name="description" content="Salesforce implementation partners delivering LWC, Experience Cloud, Shopify, and performance marketing for high-converting growth." />
        <link rel="canonical" href="https://itmetasolutions.com/" />
      </Helmet>

      <div>
        <ScrollProgress />

        {/* ════════════════════════════════════════
            HERO
        ════════════════════════════════════════ */}
        <section className="relative bg-[#141A2E] pt-28 pb-16 sm:pt-36 sm:pb-20 overflow-hidden">
          {/* Subtle real-world BG image */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&auto=format&fit=crop&q=40"
              alt=""
              className="w-full h-full object-cover"
              style={{ opacity: 0.04 }}
            />
          </div>

          <TechMeshBg variant="full" iconOpacityBase={0.04} />
          <div className="absolute inset-0 dot-grid-bg opacity-60 pointer-events-none" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(29,78,216,0.14) 0%, transparent 70%)" }}
          />

          <Container>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

              {/* ── LEFT ── */}
              <motion.div>
                {/* Premium badge */}
                <motion.div
                  initial={reduced ? false : { y: 16, opacity: 0 }}
                  animate={reduced ? {} : { y: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <span
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold text-white"
                    style={{
                      background: "rgba(29,78,216,0.12)",
                      border: "1px solid rgba(29,78,216,0.40)",
                      boxShadow: "0 0 24px rgba(29,78,216,0.18)",
                    }}
                  >
                    <Sparkles className="h-3.5 w-3.5 text-[#60A5FA]" />
                    Trusted by 40+ businesses worldwide
                  </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  initial={reduced ? false : { y: 16, opacity: 0 }}
                  animate={reduced ? {} : { y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[72px] leading-[1.05]"
                >
                  Build. Grow.
                  <br />
                  <span className="animated-gradient-text">Dominate.</span>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                  initial={reduced ? false : { y: 16, opacity: 0 }}
                  animate={reduced ? {} : { y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-5 text-base text-zinc-400 sm:text-lg max-w-[440px] leading-relaxed"
                >
                  We craft high-converting websites, launch powerful marketing campaigns, and build brands that stand out in the digital world.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={reduced ? false : { y: 16, opacity: 0 }}
                  animate={reduced ? {} : { y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-8 flex flex-col gap-3 sm:flex-row"
                >
                  <Link
                    to="/contact"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1D4ED8] to-blue-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#1D4ED8]/40 transition-all hover:shadow-xl hover:shadow-[#1D4ED8]/60 hover:scale-105"
                  >
                    Start Your Project
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/work"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.04] px-7 py-3.5 text-base font-semibold text-white transition-all hover:bg-white/[0.08] hover:border-white/25"
                  >
                    <PlayCircle className="h-4 w-4" />
                    View Our Work
                  </Link>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                  initial={reduced ? false : { y: 8, opacity: 0 }}
                  animate={reduced ? {} : { y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-10 flex flex-wrap items-center gap-5 text-sm text-zinc-500"
                >
                  {[
                    { icon: Shield,       color: "text-emerald-400", label: "100% Satisfaction" },
                    { icon: CheckCircle2, color: "text-blue-400",    label: "On-Time Delivery"  },
                    { icon: Award,        color: "text-yellow-400",  label: "SECP Registered"   },
                  ].map(({ icon: Icon, color, label }, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <Icon className={cx("h-4 w-4", color)} />
                      <span>{label}</span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* ── RIGHT: Interactive browser + mobile mockup ── */}
              {isDesktop && (
                <motion.div
                  initial={reduced ? false : { x: 50, opacity: 0 }}
                  animate={reduced ? {} : { x: 0, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
                  className="relative flex items-center justify-center"
                >
                  <div className="relative w-full max-w-[480px]">

                    {/* Browser Window */}
                    <div className="rounded-2xl border border-white/10 bg-zinc-900/90 backdrop-blur-xl shadow-2xl shadow-[#1D4ED8]/25 overflow-hidden">

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

                        {/* Service status row */}
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { label: "Website",   value: "Live",     icon: Globe,      badge: "✓", glow: "from-emerald-500/10", iconColor: "text-emerald-400", badgeColor: "text-emerald-400" },
                            { label: "SEO",       value: "94/100",   icon: Search,     badge: "↑", glow: "from-blue-500/10",  iconColor: "text-sky-400",  badgeColor: "text-sky-400"  },
                            { label: "Web App",   value: "v2.1",     icon: LayoutGrid, badge: "●", glow: "from-blue-500/10",    iconColor: "text-blue-400",    badgeColor: "text-blue-400"    },
                            { label: "Marketing", value: "3 Active", icon: Megaphone,  badge: "↗", glow: "from-pink-500/10",    iconColor: "text-pink-400",    badgeColor: "text-pink-400"    },
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
                          {/* Website wireframe */}
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
                            <div className="grid grid-cols-3 gap-1 mb-1.5">
                              {["#1D4ED8","#23A6E8","#3b82f6"].map((c,i) => (
                                <div key={i} className="rounded p-1" style={{background:`${c}18`,border:`1px solid ${c}30`}}>
                                  <div className="h-2 w-2 rounded-sm mb-0.5" style={{background:`${c}50`}} />
                                  <div className="h-0.5 rounded" style={{width:"75%",background:"rgba(255,255,255,0.2)"}} />
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* SEO rankings */}
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
                                <span className={`text-[10px] font-bold w-4 text-center shrink-0 ${r.pos===1?"text-yellow-400":r.pos<=3?"text-emerald-400":"text-zinc-500"}`}>
                                  #{r.pos}
                                </span>
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
                          {/* Marketing campaigns */}
                          <div className="rounded-xl bg-white/[0.04] border border-white/10 p-2.5">
                            <div className="text-[10px] font-semibold text-zinc-400 mb-2 uppercase tracking-wide flex items-center gap-1">
                              <Megaphone className="h-2.5 w-2.5" /> Marketing
                            </div>
                            {[
                              {name:"Google Ads",pct:82,color:"bg-blue-500"},
                              {name:"Meta Ads",  pct:67,color:"bg-pink-500"},
                              {name:"Email",     pct:91,color:"bg-blue-500"},
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

                          {/* CRM pipeline */}
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
                    <div className="absolute -bottom-10 -right-10 w-[108px] rounded-[20px] border-[3px] border-zinc-700 bg-[#0d0d14] shadow-2xl shadow-[#1D4ED8]/30 overflow-hidden">
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
                        <div className="grid grid-cols-2 gap-1">
                          {[
                            {label:"SEO",color:"#1D4ED8"},
                            {label:"Ads",color:"#23A6E8"},
                            {label:"CRM",color:"#3b82f6"},
                            {label:"Web",color:"#10b981"},
                          ].map(pill => (
                            <div key={pill.label} className="rounded px-1 py-0.5 flex items-center gap-0.5"
                              style={{background:`${pill.color}20`,border:`1px solid ${pill.color}35`}}>
                              <div className="h-1 w-1 rounded-full" style={{background:pill.color}} />
                              <span style={{fontSize:"7px",color:"#ccc"}}>{pill.label}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-1 rounded-md bg-emerald-500/15 border border-emerald-500/25 px-1.5 py-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span style={{fontSize:"7px"}} className="text-emerald-300 font-medium">Mobile Ready</span>
                        </div>
                      </div>
                    </div>

                    {/* Floating achievement badges */}
                    <div
                      className="absolute -top-5 -left-6 flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/90 backdrop-blur-sm px-3 py-2 shadow-xl shadow-black/40"
                      style={{ animation: "floatY 3s ease-in-out infinite" }}
                    >
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-xs font-semibold text-white">+127% Traffic Growth</span>
                    </div>

                    <div
                      className="absolute bottom-16 -left-8 flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/90 backdrop-blur-sm px-3 py-2 shadow-xl shadow-black/40"
                      style={{ animation: "floatYReverse 3.5s ease-in-out infinite" }}
                    >
                      <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-semibold text-white">98% Client Satisfaction</span>
                    </div>

                    <div
                      className="absolute top-1/2 -right-8 -translate-y-1/2 flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/90 backdrop-blur-sm px-3 py-2 shadow-xl shadow-black/40"
                      style={{ animation: "floatY 4s ease-in-out infinite" }}
                    >
                      <Rocket className="h-3.5 w-3.5 text-sky-400" />
                      <span className="text-xs font-semibold text-white">40+ Projects Delivered</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </Container>
        </section>

        {/* ════════════════════════════════════════
            CLIENT LOGOS — compact trust strip
        ════════════════════════════════════════ */}
        <section className="py-10 sm:py-14 bg-[#141A2E] relative overflow-hidden border-y border-white/[0.06]">
          <Container>
            <p className="text-center text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-zinc-600 mb-8">
              Trusted by 40+ growing businesses worldwide
            </p>
          </Container>
          <div style={{ overflow: "hidden" }}>
            <Marquee speed={38} pauseOnHover gradient gradientColor="#141A2E" gradientWidth={100}>
              {[...clientSliderData, ...clientSliderData, ...clientSliderData].map((client, i) => (
                <div key={i} className="group mx-10 flex-shrink-0 flex items-center justify-center">
                  {client.logo && (
                    <img
                      src={client.logo}
                      alt={`${client.name} logo`}
                      className="h-[44px] w-auto object-contain opacity-35 transition-all duration-300 group-hover:opacity-75"
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
            STATS
        ════════════════════════════════════════ */}
        <section className="bg-[#0F1628] py-16 sm:py-20 relative overflow-hidden">
          <TechMeshBg variant="marketing" iconColor="#1D4ED8" iconOpacityBase={0.03} />
          <div className="absolute inset-0 dot-grid-bg opacity-40 pointer-events-none" />
          <Container>
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={i}
                    initial={reduced ? false : { y: 20, opacity: 0 }}
                    whileInView={reduced ? {} : { y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={cx(
                      "text-center px-6 py-10 relative",
                      i % 2 !== 0 ? "border-l border-white/[0.07]" : "",
                      i >= 2 ? "border-t border-white/[0.07] lg:border-t-0" : "",
                      i !== 0 ? "lg:border-l lg:border-white/[0.07]" : ""
                    )}
                  >
                    <div
                      className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#1c1a3a] mb-4 mx-auto"
                      style={{ boxShadow: "0 0 20px rgba(29,78,216,0.25)" }}
                    >
                      <Icon className="h-5 w-5 text-[#60A5FA]" />
                    </div>
                    <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white neon-stat">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-sm text-zinc-500">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ════════════════════════════════════════
            SERVICES — image-based cards
        ════════════════════════════════════════ */}
        <section className="py-20 sm:py-28 bg-[#141A2E] relative overflow-hidden">
          <TechMeshBg variant="devtech" iconColor="#1D4ED8" iconOpacityBase={0.035} />
          <div className="absolute inset-0 hex-grid-bg opacity-50 pointer-events-none" />

          <Container>
            <motion.div
              initial={reduced ? false : { y: 20, opacity: 0 }}
              whileInView={reduced ? {} : { y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#1D4ED8] mb-4">
                What We Do Best
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Services That{" "}
                <span className="animated-gradient-text">Transform</span>
              </h2>
              <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-sm sm:text-base">
                End-to-end digital solutions designed to scale your business.
              </p>
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={i}
                    initial={reduced ? false : { y: 20, opacity: 0 }}
                    whileInView={reduced ? {} : { y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: i * 0.07, ease: "easeOut" }}
                    className="h-full"
                  >
                    <Link
                      to={service.link}
                      className="group relative block h-full rounded-2xl overflow-hidden border border-white/[0.07] bg-[#0d0d18] hover:border-[#1D4ED8]/45 transition-all duration-300 neon-card"
                    >
                      {/* Top hover accent line */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#1D4ED8]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                      {/* Cover image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d18] via-[#0d0d18]/40 to-transparent" />
                        {/* Icon badge overlay */}
                        <div
                          className="absolute bottom-4 left-4 h-10 w-10 rounded-xl bg-[#1c1a3a]/95 backdrop-blur-sm flex items-center justify-center"
                          style={{ boxShadow: "0 0 18px rgba(29,78,216,0.40)" }}
                        >
                          <Icon className="h-5 w-5 text-[#60A5FA]" />
                        </div>
                      </div>

                      {/* Text content */}
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-white">{service.title}</h3>
                        <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{service.description}</p>
                        <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-[#7c6fcd] group-hover:text-[#60A5FA] group-hover:gap-3 transition-all duration-200">
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
              initial={reduced ? false : { y: 16, opacity: 0 }}
              whileInView={reduced ? {} : { y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-12 text-center"
            >
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full bg-[#1D4ED8] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#1D4ED8]/30 transition-all hover:bg-[#1D4ED8]/90 hover:scale-105"
              >
                Explore All Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </Container>
        </section>

        {/* ════════════════════════════════════════
            FEATURED WORK
        ════════════════════════════════════════ */}
        <section className="py-20 sm:py-28 bg-[#0F1628] relative overflow-hidden">
          <TechMeshBg variant="marketing" iconColor="#1D4ED8" iconOpacityBase={0.03} />
          <div className="absolute inset-0 dot-grid-bg opacity-35 pointer-events-none" />

          <Container>
            <motion.div
              initial={reduced ? false : { y: 20, opacity: 0 }}
              whileInView={reduced ? {} : { y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
            >
              <div>
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#60A5FA] mb-3">
                  Our Work
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                  Featured Projects
                </h2>
              </div>
              <Link
                to="/work"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#7c6fcd] hover:text-[#60A5FA] hover:gap-3 transition-all shrink-0"
              >
                View all projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-3">
              {featuredWork.map((work, i) => (
                <motion.div
                  key={i}
                  initial={reduced ? false : { y: 20, opacity: 0 }}
                  whileInView={reduced ? {} : { y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
                >
                  <Link
                    to={work.link}
                    className="group block rounded-2xl overflow-hidden border border-white/[0.07] hover:border-[#1D4ED8]/45 transition-all duration-300 neon-card"
                  >
                    {/* Project image */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={work.image}
                        alt={work.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      {/* Category pill */}
                      <div className="absolute top-4 left-4 rounded-full bg-[#1D4ED8]/80 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white border border-[#1D4ED8]/30">
                        {work.category}
                      </div>
                      {/* Arrow reveal */}
                      <div
                        className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 transition-all"
                        style={{ border: "1px solid rgba(255,255,255,0.2)" }}
                      >
                        <ArrowUpRight className="h-4 w-4 text-white" />
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="bg-[#0d0d18] p-5">
                      <h3 className="text-lg font-bold text-white">{work.title}</h3>
                      <p className="mt-2 text-sm text-zinc-400 leading-relaxed line-clamp-2">{work.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {work.tags.map(tag => (
                          <span key={tag} className="rounded-full bg-[#1c1a3a] px-2.5 py-0.5 text-[11px] font-medium text-[#60A5FA]">
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
            WHY CHOOSE US
        ════════════════════════════════════════ */}
        <section className="py-20 sm:py-28 bg-[#141A2E] relative overflow-hidden">
          <TechMeshBg variant="marketing" iconColor="#1D4ED8" iconOpacityBase={0.035} />
          <div className="absolute inset-0 hex-grid-bg opacity-35 pointer-events-none" />

          <Container>
            <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

              {/* Left: Agency image */}
              <motion.div
                initial={reduced ? false : { x: -30, opacity: 0 }}
                whileInView={reduced ? {} : { x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{ boxShadow: "0 0 60px rgba(29,78,216,0.22), 0 0 120px rgba(29,78,216,0.08)" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
                    alt="IT Meta Solutions team collaborating"
                    className="w-full h-[380px] sm:h-[460px] object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141A2E]/55 via-transparent to-transparent" />
                  {/* Neon border frame */}
                  <div
                    className="absolute -inset-[1px] rounded-2xl pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, rgba(29,78,216,0.55) 0%, transparent 50%, rgba(58,201,245,0.22) 100%)",
                      padding: "1px",
                      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    }}
                  />
                </div>

                {/* Floating badges */}
                <div
                  className="absolute top-5 -right-4 sm:-right-5 flex items-center gap-2 rounded-xl border border-[#1D4ED8]/40 bg-zinc-900/95 backdrop-blur-sm px-4 py-3 shadow-xl"
                  style={{ boxShadow: "0 0 20px rgba(29,78,216,0.28)", animation: "floatY 3s ease-in-out infinite" }}
                >
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-semibold text-white">SECP Registered</span>
                </div>

                <div
                  className="absolute bottom-5 -left-4 sm:-left-5 flex items-center gap-2 rounded-xl border border-[#1D4ED8]/40 bg-zinc-900/95 backdrop-blur-sm px-4 py-3 shadow-xl"
                  style={{ boxShadow: "0 0 20px rgba(29,78,216,0.22)", animation: "floatYReverse 3.5s ease-in-out infinite" }}
                >
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-semibold text-white">5+ Years Excellence</span>
                </div>
              </motion.div>

              {/* Right: Features */}
              <motion.div
                initial={reduced ? false : { x: 30, opacity: 0 }}
                whileInView={reduced ? {} : { x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1D4ED8] mb-5">
                  Why Brands Choose Us
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Creativity meets
                  <span className="block animated-gradient-text mt-1">strategy & results</span>
                </h2>
                <p className="mt-5 text-base text-zinc-400 leading-relaxed">
                  Join 40+ brands growing with us. We don't just build websites — we build engines for business growth.
                </p>

                <div className="mt-8 space-y-4">
                  {whyFeatures.map((item, i) => (
                    <div
                      key={i}
                      className="flex gap-4 rounded-2xl border border-white/[0.07] bg-zinc-900/40 p-5 glass-card hover:border-[#1D4ED8]/35 transition-all duration-200"
                    >
                      <div
                        className="flex-shrink-0 h-11 w-11 rounded-xl bg-[#1c1a3a] flex items-center justify-center"
                        style={{ boxShadow: `0 0 20px ${item.accent}35` }}
                      >
                        <item.icon className="h-5 w-5" style={{ color: item.accent }} />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">{item.title}</h4>
                        <p className="mt-1 text-sm text-zinc-400 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1D4ED8] to-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#1D4ED8]/30 transition-all hover:scale-105 hover:shadow-xl"
                  >
                    Let's Talk
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/work"
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/[0.08]"
                  >
                    See Our Work
                  </Link>
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* ════════════════════════════════════════
            PROCESS — 4 steps
        ════════════════════════════════════════ */}
        <section className="py-20 sm:py-28 bg-[#0F1628] relative overflow-hidden">
          <TechMeshBg variant="marketing" iconColor="#1D4ED8" iconOpacityBase={0.035} />
          <div className="absolute inset-0 dot-grid-bg opacity-35 pointer-events-none" />
          {/* Subtle top BG image */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1800&auto=format&fit=crop&q=30"
              alt=""
              className="w-full h-full object-cover"
              style={{ opacity: 0.03 }}
            />
          </div>

          <Container>
            <motion.div
              initial={reduced ? false : { y: 20, opacity: 0 }}
              whileInView={reduced ? {} : { y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#60A5FA] mb-4">
                Our Process
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                How We Bring Your Vision to Life
              </h2>
              <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-sm sm:text-base">
                A proven 4-step process that delivers results every time.
              </p>
            </motion.div>

            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 sm:gap-x-8">
              {/* Horizontal connector line */}
              <div className="absolute top-[38px] left-[calc(12.5%+19px)] right-[calc(12.5%+19px)] hidden lg:block">
                <div className="h-px w-full shimmer-border" />
              </div>

              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={reduced ? false : { y: 20, opacity: 0 }}
                  whileInView={reduced ? {} : { y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.12, ease: "easeOut" }}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className="relative z-10 flex h-[76px] w-[76px] flex-shrink-0 items-center justify-center rounded-full bg-[#13122a] border border-[#2d2a5e]"
                    style={{ boxShadow: "0 0 20px rgba(29,78,216,0.30), 0 0 40px rgba(29,78,216,0.10)" }}
                  >
                    <span className="text-2xl font-extrabold text-[#60A5FA] leading-none">{step.step}</span>
                  </div>
                  <h4 className="mt-6 text-base sm:text-lg font-bold text-white">{step.title}</h4>
                  <p className="mt-2.5 text-sm text-zinc-400 leading-relaxed max-w-[200px]">{step.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={reduced ? false : { y: 16, opacity: 0 }}
              whileInView={reduced ? {} : { y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-14 text-center"
            >
              <Link
                to="/process"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#60A5FA] hover:gap-3 transition-all"
              >
                Learn more about our process
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </Container>
        </section>

        {/* ════════════════════════════════════════
            GOOGLE REVIEWS
        ════════════════════════════════════════ */}
        <DeferredRender minHeight={400}>
          {() => (
            <React.Suspense fallback={<div className="py-20 bg-[#141A2E]" />}>
              <GoogleReviewsSection
                title="See What Clients Say On Google"
                description="Latest public Google feedback from our business profile."
              />
            </React.Suspense>
          )}
        </DeferredRender>

        {/* ════════════════════════════════════════
            CTA BANNER — full-width with image
        ════════════════════════════════════════ */}
        <section className="py-20 sm:py-28 bg-[#141A2E] relative overflow-hidden">
          <TechMeshBg variant="marketing" iconColor="#1D4ED8" iconOpacityBase={0.03} />
          <Container>
            <motion.div
              initial={reduced ? false : { y: 16, opacity: 0 }}
              whileInView={reduced ? {} : { y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl"
              style={{ boxShadow: "0 0 80px rgba(29,78,216,0.20), 0 0 0 1px rgba(29,78,216,0.22)" }}
            >
              {/* Background image */}
              <div className="absolute inset-0">
                {showcaseBannerImage
                  ? <img src={showcaseBannerImage} alt="" className="h-full w-full object-cover" loading="lazy" />
                  : <img
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&auto=format&fit=crop&q=50"
                      alt=""
                      className="h-full w-full object-cover"
                    />
                }
              </div>
              <div className="absolute inset-0 bg-black/65 z-[5]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#141A2E]/88 via-[#1D4ED8]/30 to-transparent z-10" />
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-24 h-24 z-20 pointer-events-none"
                style={{ background: "linear-gradient(135deg, rgba(29,78,216,0.4) 0%, transparent 50%)" }} />
              <div className="absolute bottom-0 right-0 w-32 h-32 z-20 pointer-events-none"
                style={{ background: "linear-gradient(315deg, rgba(58,201,245,0.1) 0%, transparent 50%)" }} />

              <div className="relative z-20 h-[380px] sm:h-[440px] flex items-center px-8 sm:px-12 lg:px-16">
                <div className="max-w-lg">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#60A5FA] mb-4">
                    Ready to Grow?
                  </p>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    Let's build something
                    <span className="block animated-gradient-text">extraordinary together.</span>
                  </h3>
                  <p className="mt-5 text-base text-white/70 leading-relaxed max-w-md">
                    Join 40+ businesses that trust IT Meta Solutions to deliver digital results that matter.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1D4ED8] to-blue-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#1D4ED8]/40 transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#1D4ED8]/60"
                    >
                      Start Your Project
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/work"
                      className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm px-7 py-3.5 text-base font-semibold text-white transition-all hover:bg-white/20"
                    >
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
                        <div className="text-2xl sm:text-3xl font-bold text-white neon-stat">{s.value}</div>
                        <div className="text-xs text-white/50 mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* SEO content block */}
        <SeoContentFaq content={seoContent} />

      </div>
    </>
  );
}

