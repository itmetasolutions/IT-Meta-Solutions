import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import {
  ArrowRight,
  Award,
  CalendarDays,
  CheckCircle2,
  Code2,
  Globe,
  HeartHandshake,
  Mail,
  MapPin,
  Megaphone,
  Palette,
  Phone,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Search,
  Users,
  Wand2,
  Cloud,
  Handshake,
  Layers,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import Container from "../../components/Container";
import GoogleReviewsSection from "../../components/GoogleReviewsSection";
import SeoContentFaq from "../../components/SeoContentFaq";
import { PHONE_NUMBERS, OFFICE_ADDRESS, EMAIL } from "../../lib/contact";
import { openLiveChat } from "../../lib/liveChat";

const aboutDeliveryImage = "/assets/img/lyubomyr-reverchuk-rtD_lcsN6_U-unsplash.jpg";

/* ==================== HELPERS ==================== */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!m) return;
    const onChange = () => setReduced(!!m.matches);
    onChange();
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-0.5 w-full origin-left bg-gradient-to-r from-[#1D4ED8] via-[#23A6E8] to-[#3AC9F5]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

/* ==================== DATA ==================== */

const seoContent = {
  kicker: "About Us",
  title: "A Lahore-Based Salesforce and Ecommerce Growth Team",
  subtitle:
    "We are a SECP registered IT firm delivering Salesforce implementation, LWC development, Experience Cloud portals, and high-converting Shopify builds.",
  paragraphs: [
    "Our team blends CRM automation, performance marketing, and conversion-focused web development to create measurable growth for local and global clients.",
    "From data cleaning in Salesforce to Meta Ads ROAS optimization, we focus on clarity, speed, and results.",
  ],
  bullets: [
    "Salesforce automation experts and LWC development services",
    "Experience Cloud portal development for customer self-service",
    "Shopify and WooCommerce conversion optimization",
    "Performance marketing with ROAS and CPA improvements",
  ],
};

const seoFaqs = [
  {
    q: "Are you a SECP registered IT firm?",
    a: "Yes. We are SECP and FBR registered, with our registered office in London and a delivery team in Lahore.",
  },
  {
    q: "Do you specialize in Salesforce implementation?",
    a: "Yes. We deliver Salesforce implementation, LWC development, Experience Cloud portals, and CRM automation.",
  },
  {
    q: "Do you build high-converting ecommerce stores?",
    a: "Yes. We build performance-optimized Shopify and WooCommerce stores with CRO and custom functionality.",
  },
  {
    q: "Do you work with UK and US startups?",
    a: "Yes. We support international clients with clear timelines, communication, and performance reporting.",
  },
];

/* ==================== PAGE ==================== */

export default function AboutUsPage() {
  const reduced = usePrefersReducedMotion();

  return (
    <>
      <Helmet>
        <title>IT Meta Solutions - About Us | Premium Digital Growth Agency</title>
        <meta
          name="description"
          content="SECP registered Lahore agency for Salesforce implementation, LWC, Experience Cloud, ecommerce, and performance marketing."
        />
        <meta
          name="keywords"
          content="digital agency, web development company, SEO services, social media marketing, digital marketing agency, IT Meta Solutions"
        />
        <meta property="og:title" content="IT Meta Solutions - About Us | Premium Digital Growth Agency" />
        <meta
          property="og:description"
          content="Learn about IT Meta Solutions - a premium digital growth agency specializing in web development, SEO, social media marketing, and performance advertising for businesses in Pakistan, Canada, UK, and USA."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://itmetasolutions.com/about" />
        <meta property="og:url" content="https://itmetasolutions.com/about" />
        <meta property="og:image" content="https://itmetasolutions.com/favicon.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="IT Meta Solutions - About Us | Premium Digital Growth Agency" />
        <meta
          name="twitter:description"
          content="Learn about IT Meta Solutions - a premium digital growth agency specializing in web development, SEO, social media marketing, and performance advertising for businesses in Pakistan, Canada, UK, and USA."
        />
        <meta name="twitter:image" content="https://itmetasolutions.com/favicon.webp" />
      </Helmet>

      <ScrollProgress />

      {/* ==================== HERO ==================== */}
      <section className="relative bg-[#141A2E] overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        {/* Subtle grid */}
        <div className="absolute inset-0 dot-grid-bg opacity-30 pointer-events-none" />
        {/* Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#1D4ED8]/10 blur-[100px] pointer-events-none" />

        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={reduced ? false : { y: 12, opacity: 0 }}
              animate={reduced ? {} : { y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-2 mb-6"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-sm">
                <Globe className="h-3.5 w-3.5 text-[#23A6E8]" />
                PK · CA · UK · USA
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-sm">
                <Star className="h-3.5 w-3.5 text-amber-400" />
                5-Star Rated Agency
              </span>
            </motion.div>

            <motion.h1
              initial={reduced ? false : { y: 16, opacity: 0 }}
              animate={reduced ? {} : { y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Building Brands &amp;
              <br />
              <span className="animated-gradient-text">Growth Systems</span>
            </motion.h1>

            <motion.p
              initial={reduced ? false : { y: 16, opacity: 0 }}
              animate={reduced ? {} : { y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-slate-400 sm:text-xl max-w-2xl mx-auto leading-relaxed"
            >
              We help businesses in Pakistan, Canada, UK, and USA build a premium digital presence
              and scale with performance marketing — focused on conversion, trust, and measurable results.
            </motion.p>

            <motion.div
              initial={reduced ? false : { y: 16, opacity: 0 }}
              animate={reduced ? {} : { y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <Link to="/contact" className="btn-primary">
                Start a Project
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/work" className="btn-ghost-dark">
                View Our Work
              </Link>
            </motion.div>

            {/* Hero stats */}
            <motion.div
              initial={reduced ? false : { y: 16, opacity: 0 }}
              animate={reduced ? {} : { y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-14 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10"
            >
              {[
                { value: "5+", label: "Years Experience" },
                { value: "50+", label: "Projects Delivered" },
                { value: "4 Markets", label: "Global Reach" },
              ].map((s) => (
                <div key={s.label} className="bg-white/[0.04] px-6 py-5 text-center backdrop-blur-sm">
                  <div
                    className="text-2xl font-bold text-white sm:text-3xl"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs text-slate-400">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ==================== CONTACT BAR ==================== */}
      <section className="bg-white border-b border-slate-100 py-6">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm">
            {PHONE_NUMBERS.map((p) => (
              <a
                key={p.tel}
                href={`tel:${p.tel}`}
                className="flex items-center gap-2.5 text-slate-600 hover:text-[#1D4ED8] transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1D4ED8]/10">
                  <Phone className="h-3.5 w-3.5 text-[#1D4ED8]" />
                </div>
                <span className="font-medium">{p.display}</span>
              </a>
            ))}
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-2.5 text-slate-600 hover:text-[#1D4ED8] transition-colors"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1D4ED8]/10">
                <Mail className="h-3.5 w-3.5 text-[#1D4ED8]" />
              </div>
              <span className="font-medium">{EMAIL}</span>
            </a>
            <div className="flex items-center gap-2.5 text-slate-500">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1D4ED8]/10">
                <MapPin className="h-3.5 w-3.5 text-[#1D4ED8]" />
              </div>
              <span>{OFFICE_ADDRESS}</span>
            </div>
          </div>
        </Container>
      </section>

      {/* ==================== DELIVERY SNAPSHOT ==================== */}
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <motion.div
              initial={reduced ? false : { x: -24, opacity: 0 }}
              whileInView={reduced ? {} : { x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-slate-200">
                <img
                  src={aboutDeliveryImage}
                  alt="IT Meta Solutions team collaborating in office"
                  className="h-[380px] w-full object-cover sm:h-[460px]"
                  style={{ objectPosition: "center 74%" }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur-sm border border-slate-100">
                  <div className="text-sm font-semibold text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Strategy, design, development, and growth in one workflow
                  </div>
                  <div className="mt-1 text-xs text-slate-500">Built for clear communication and reliable delivery.</div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -right-4 top-8 rounded-2xl bg-[#1D4ED8] px-4 py-3 shadow-xl shadow-[#1D4ED8]/30 hidden sm:block">
                <div className="text-xs font-semibold text-white/80">Since</div>
                <div className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>2020</div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={reduced ? false : { x: 24, opacity: 0 }}
              whileInView={reduced ? {} : { x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="kicker">How We Deliver</span>
              <h2
                className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                A Team Built Around
                <br />
                <span className="text-[#1D4ED8]">Complete Digital Execution</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                We connect planning, creative, development, Salesforce, and marketing into one organized
                process so every project moves with clarity from idea to launch.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Discovery before design",
                  "Weekly progress visibility",
                  "Conversion-focused execution",
                  "Launch and optimization support",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-[#F1F4F9] p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1D4ED8]" />
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/process"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1D4ED8] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1D4ED8]/25 transition-all hover:bg-[#162f8f] hover:scale-105"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                View Our Process
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ==================== STATS ==================== */}
      <section className="bg-[#F1F4F9] py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { icon: CalendarDays, value: "5+", label: "Years Experience", color: "#1D4ED8" },
              { icon: TrendingUp, value: "50+", label: "Projects Delivered", color: "#23A6E8" },
              { icon: Globe, value: "4", label: "Markets Served", color: "#3AC9F5" },
              { icon: Star, value: "5★", label: "Google Rating", color: "#1D4ED8" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={reduced ? false : { y: 16, opacity: 0 }}
                whileInView={reduced ? {} : { y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="premium-card rounded-2xl p-6 text-center"
              >
                <div
                  className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
                </div>
                <div
                  className="text-3xl font-bold text-slate-900"
                  style={{ fontFamily: "var(--font-heading)", color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ==================== VISION & MISSION ==================== */}
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <motion.div
            initial={reduced ? false : { y: 16, opacity: 0 }}
            whileInView={reduced ? {} : { y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="kicker">Our Foundation</span>
            <h2
              className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Vision &amp; Mission
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              What drives us and what we aim to achieve for every client
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            {[
              {
                icon: Wand2,
                color: "#1D4ED8",
                title: "Our Vision",
                description:
                  "To become a trusted global digital growth partner for businesses by building brands and marketing systems that deliver measurable results.",
                features: [
                  "Premium brand experiences",
                  "International-quality execution",
                  "Trust-driven digital presence",
                  "Long-term growth systems",
                ],
              },
              {
                icon: HeartHandshake,
                color: "#23A6E8",
                title: "Our Mission",
                description:
                  "To help businesses grow through modern web development, creative production, and performance marketing — with clear communication, fast delivery, and honest reporting.",
                features: [
                  "Build conversion-first websites & stores",
                  "Create high-impact design & video",
                  "Run ads with tracking & optimization",
                  "Support clients with clear processes",
                ],
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={reduced ? false : { y: 16, opacity: 0 }}
                whileInView={reduced ? {} : { y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="premium-card rounded-3xl p-8"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl mb-5"
                  style={{ backgroundColor: `${card.color}15` }}
                >
                  <card.icon className="h-6 w-6" style={{ color: card.color }} />
                </div>
                <h3
                  className="text-xl font-bold text-slate-900"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {card.title}
                </h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{card.description}</p>
                <ul className="mt-6 space-y-2.5">
                  {card.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: card.color }} />
                      <span className="text-sm text-slate-700">{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ==================== WHY CHOOSE US ==================== */}
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <motion.div
            initial={reduced ? false : { y: 16, opacity: 0 }}
            whileInView={reduced ? {} : { y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="kicker">Why Choose Us</span>
            <h2
              className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              What Makes Us Different
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              We don't just 'post' or 'run ads' — we build complete systems
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                color: "#1D4ED8",
                title: "Strategy + Execution",
                description: "We don't just execute — we plan strategically and deliver with precision.",
                points: ["Strategy + execution combined", "Conversion-first approach", "Creative testing mindset", "Transparent reporting"],
              },
              {
                icon: Handshake,
                color: "#23A6E8",
                title: "How We Work",
                description: "Simple approvals, fast iterations, and weekly updates keep you in the loop.",
                points: ["Discovery → plan → execution", "Weekly progress updates", "Clear deliverables", "Optimization & scaling roadmap"],
              },
              {
                icon: Globe,
                color: "#3AC9F5",
                title: "Markets We Serve",
                description: "We understand local and international buyer behavior across multiple markets.",
                points: ["Pakistan (PKR, COD, local trust)", "Canada (service-first conversion)", "UK (premium minimal + compliance)", "USA (fast funnels + strong CTAs)"],
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={reduced ? false : { y: 16, opacity: 0 }}
                whileInView={reduced ? {} : { y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="premium-card rounded-3xl p-7"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl mb-5"
                  style={{ backgroundColor: `${card.color}15` }}
                >
                  <card.icon className="h-6 w-6" style={{ color: card.color }} />
                </div>
                <h3
                  className="text-lg font-bold text-slate-900 mb-3"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {card.title}
                </h3>
                <p className="text-sm text-slate-600 mb-5 leading-relaxed">{card.description}</p>
                <ul className="space-y-2">
                  {card.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: card.color }} />
                      <span className="text-sm text-slate-600">{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ==================== SERVICES OVERVIEW ==================== */}
      <section className="bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <motion.div
            initial={reduced ? false : { y: 16, opacity: 0 }}
            whileInView={reduced ? {} : { y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="kicker">What We Do</span>
            <h2
              className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              A Complete System, Not Scattered Services
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              Whether you need a website, branding, ads, or full management — everything connects into one growth engine
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Code2, color: "#1D4ED8", title: "Web Development", desc: "Business websites, landing pages, and e-commerce stores designed to convert.", points: ["Mobile-first UI", "WhatsApp / forms integration", "Speed optimization", "SEO-ready structure"] },
              { icon: Megaphone, color: "#23A6E8", title: "Performance Marketing", desc: "Meta Ads systems built for leads and sales — with tracking & optimization.", points: ["Funnel campaigns", "Retargeting pools", "Creative testing", "Detailed reporting"] },
              { icon: Search, color: "#3AC9F5", title: "SEO & Content", desc: "Search optimization that drives qualified traffic and long-term visibility.", points: ["Technical SEO fixes", "On-page optimization", "Content strategy", "Local SEO structure"] },
              { icon: Palette, color: "#1D4ED8", title: "Design & Video", desc: "Modern creatives that make your brand look premium and improve ad performance.", points: ["Ad creatives", "Brand kits", "Reels editing", "Social templates"] },
              { icon: Layers, color: "#23A6E8", title: "Custom Web Apps", desc: "Bespoke portals and business systems built around your exact workflows.", points: ["Role-based admin portals", "Next.js + PostgreSQL stack", "OTP auth & audit logs", "Dialer & API integrations"] },
              { icon: Cloud, color: "#3AC9F5", title: "Salesforce", desc: "Custom Salesforce solutions to streamline CRM, automate workflows, and power your team.", points: ["LWC development", "Experience Cloud portals", "Automation & flows", "CRM data management"] },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={reduced ? false : { y: 16, opacity: 0 }}
                whileInView={reduced ? {} : { y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="premium-card rounded-3xl p-6"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl mb-4"
                  style={{ backgroundColor: `${card.color}15` }}
                >
                  <card.icon className="h-5 w-5" style={{ color: card.color }} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  {card.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{card.desc}</p>
                <ul className="space-y-1.5">
                  {card.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-xs text-slate-600">
                      <div className="h-1 w-1 rounded-full flex-shrink-0" style={{ backgroundColor: card.color }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={reduced ? false : { y: 16, opacity: 0 }}
            whileInView={reduced ? {} : { y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 text-center"
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full bg-[#1D4ED8] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#1D4ED8]/25 transition-all hover:bg-[#162f8f] hover:scale-105"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              View All Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </Container>
      </section>

      {/* ==================== REVIEWS ==================== */}
      <div className="bg-[#F1F4F9]">
        <GoogleReviewsSection
          title="Read Our Google Reviews"
          description="Public Google reviews for IT Meta Solutions, pulled directly from our live Google Business Profile."
          lightTheme={true}
        />
      </div>

      {/* ==================== CTA BANNER ==================== */}
      <section className="bg-[#141A2E] py-20 sm:py-28">
        <Container>
          <motion.div
            initial={reduced ? false : { y: 16, opacity: 0 }}
            whileInView={reduced ? {} : { y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="kicker" style={{ borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.07)", color: "#93c5fd" }}>
              Let's Work Together
            </span>
            <h2
              className="mt-6 text-4xl font-bold text-white sm:text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Ready to Build Something Strong?
            </h2>
            <p className="mt-5 text-lg text-slate-400 max-w-xl mx-auto">
              If you want a premium website + marketing system that generates results, contact us and we'll share a clear plan.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: ShieldCheck, title: "Trust-First", desc: "Clear communication and honest reporting" },
                { icon: Target, title: "Performance", desc: "Focused on leads, sales, and ROAS" },
                { icon: Zap, title: "Fast Delivery", desc: "Quick execution with clean approvals" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-[#1D4ED8]/30">
                    <item.icon className="h-4 w-4 text-[#93c5fd]" />
                  </div>
                  <div className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                    {item.title}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">{item.desc}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link to="/contact" className="btn-primary">
                Get a Proposal
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button type="button" onClick={openLiveChat} className="btn-ghost-dark">
                <Phone className="h-4 w-4" />
                Live Chat Now
              </button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ==================== SEO / FAQ ==================== */}
      <div className="bg-white">
        <SeoContentFaq content={seoContent} faqs={seoFaqs} lightTheme={true} />
      </div>
    </>
  );
}
