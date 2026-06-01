import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useInView } from "framer-motion";
import {
  ArrowRight,
  Brush,
  CheckCircle2,
  Clapperboard,
  Cloud,
  Code2,
  Film,
  Gauge,
  Instagram,
  LayoutGrid,
  Megaphone,
  Palette,
  Phone,
  Search,
  Settings,
  Share2,
  Sparkles,
  Store,
  Video,
  Captions,
  PenTool,
  Layers,
  Wand2,
  FileSearch,
  MapPin,
  Zap,
  Users,
  TrendingUp,
  HeartHandshake,
  Clock,
  Star,
  ChevronRight,
  Globe,
  ShoppingBag,
  BarChart3,
  Award,
  Rocket,
  Target,
  Lightbulb,
  MonitorSmartphone,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import SeoContentFaq from "../../components/SeoContentFaq";
import Container from "../../components/Container";
import SubpageVisualLayer from "../../components/SubpageVisualLayer";

/* ==================== HELPERS ==================== */

const cx = (...classes) => classes.filter(Boolean).join(" ");

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

/* ==================== DATA ==================== */

const SERVICES = [
  {
    id: "web-development",
    icon: Code2,
    title: "Web Development",
    short: "High-performance websites built for conversion.",
    description: "Custom, fast, and scalable websites tailored to your brand identity and business goals.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    link: "/services/web-development",
    accent: "#5025d1",
  },
  {
    id: "custom-apps",
    icon: MonitorSmartphone,
    title: "Custom Web Apps",
    short: "Bespoke software for complex business needs.",
    description: "Full-stack web applications engineered for performance, scalability, and user delight.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    link: "/services/custom-web-apps",
    accent: "#7c3aed",
  },
  {
    id: "salesforce",
    icon: Cloud,
    title: "Salesforce CRM",
    short: "Unlock revenue growth with Salesforce expertise.",
    description: "Implementation, customisation, and automation for Sales Cloud, Service Cloud, and Experience Cloud.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    link: "/services/salesforce",
    accent: "#0ea5e9",
  },
  {
    id: "digital-marketing",
    icon: Megaphone,
    title: "Digital Marketing",
    short: "Data-driven campaigns that drive real results.",
    description: "Performance marketing across Google, Meta, and LinkedIn — built around ROI.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    link: "/services/digital-marketing",
    accent: "#ec4899",
  },
  {
    id: "seo",
    icon: Search,
    title: "SEO Optimisation",
    short: "Dominate search rankings with proven strategies.",
    description: "Technical SEO, content strategy, and link building to grow organic traffic sustainably.",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&q=80",
    link: "/services/seo",
    accent: "#10b981",
  },
  {
    id: "social-media",
    icon: Instagram,
    title: "Social Media",
    short: "Build an audience that converts.",
    description: "Strategy, content creation, and community management across all major platforms.",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80",
    link: "/services/social-media",
    accent: "#f59e0b",
  },
  {
    id: "graphic-design",
    icon: Palette,
    title: "Graphic Design",
    short: "Visuals that stop the scroll.",
    description: "Brand-aligned design across digital, print, and social — from logos to full campaigns.",
    image: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=800&q=80",
    link: "/services/graphic-designing",
    accent: "#ba55d3",
  },
  {
    id: "video-editing",
    icon: Film,
    title: "Video Editing",
    short: "Cinematic storytelling for your brand.",
    description: "Professional video production and editing — explainers, reels, ads, and corporate videos.",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
    link: "/services/video-editing",
    accent: "#ef4444",
  },
];

const FEATURED = [
  {
    id: "web",
    label: "Web & Apps",
    icon: Code2,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
    headline: "Websites & Apps That Work as Hard as You Do",
    description: "We design and build high-performance digital products — from marketing sites to complex web applications. Every project starts with strategy and ends with measurable results.",
    benefits: [
      "Mobile-first responsive design",
      "Core Web Vitals optimised",
      "Next.js & React architecture",
      "API integrations & automations",
      "Post-launch support included",
    ],
  },
  {
    id: "marketing",
    label: "Digital Marketing",
    icon: Megaphone,
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1200&q=80",
    headline: "Marketing Campaigns That Actually Convert",
    description: "Data-first campaigns across Google, Meta, and LinkedIn. We combine paid performance with organic SEO and social strategy to build a compounding growth engine for your brand.",
    benefits: [
      "Google & Meta advertising",
      "SEO & content marketing",
      "Social media management",
      "Conversion rate optimisation",
      "Monthly performance reports",
    ],
  },
  {
    id: "salesforce",
    label: "Salesforce",
    icon: Cloud,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
    headline: "Salesforce Implementations That Drive Revenue",
    description: "Certified Salesforce expertise for Sales Cloud, Service Cloud, and Experience Cloud. We turn your CRM into a revenue-generating powerhouse with custom flows, automations, and portals.",
    benefits: [
      "Sales Cloud & Service Cloud",
      "Experience Cloud portals",
      "Custom Lightning components",
      "Flow & Process Builder automation",
      "Data migration & training",
    ],
  },
  {
    id: "brand",
    label: "Branding & Design",
    icon: Palette,
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&q=80",
    headline: "Brands That Stand Out in Any Market",
    description: "From brand identity and logo design to motion graphics and video production — we craft visual stories that leave a lasting impression and build brand equity over time.",
    benefits: [
      "Brand identity & guidelines",
      "Logo & visual design",
      "Social media content packs",
      "Video production & editing",
      "Print & digital collateral",
    ],
  },
];

const REASONS = [
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "We move quickly without sacrificing quality. Most projects are delivered 20–30% faster than industry average with our agile workflow.",
    gradient: "from-[#5025d1]/20 to-[#7c3aed]/10",
    border: "border-[#5025d1]/30",
    iconColor: "text-[#a78bfa]",
    glow: "rgba(80,37,209,0.35)",
  },
  {
    icon: Users,
    title: "Experienced Team",
    description: "Our team brings 10+ years of combined expertise across development, design, and marketing — with real-world results to show for it.",
    gradient: "from-[#0ea5e9]/20 to-[#0284c7]/10",
    border: "border-[#0ea5e9]/30",
    iconColor: "text-[#38bdf8]",
    glow: "rgba(14,165,233,0.35)",
  },
  {
    icon: Target,
    title: "Conversion Focused",
    description: "Everything we build is optimised for business outcomes — more leads, higher sales, better retention. Vanity metrics aren't our style.",
    gradient: "from-[#ec4899]/20 to-[#db2777]/10",
    border: "border-[#ec4899]/30",
    iconColor: "text-[#f472b6]",
    glow: "rgba(236,72,153,0.35)",
  },
  {
    icon: HeartHandshake,
    title: "Ongoing Support",
    description: "We don't disappear after launch. Every client gets dedicated post-launch support, monthly check-ins, and proactive improvement suggestions.",
    gradient: "from-[#10b981]/20 to-[#059669]/10",
    border: "border-[#10b981]/30",
    iconColor: "text-[#34d399]",
    glow: "rgba(16,185,129,0.35)",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    icon: Lightbulb,
    title: "Discovery",
    description: "We learn your business, goals, and audience through a detailed discovery session.",
  },
  {
    step: "02",
    icon: Target,
    title: "Strategy",
    description: "A clear roadmap is built — scope, timelines, tech stack, and success metrics defined.",
  },
  {
    step: "03",
    icon: Palette,
    title: "Design",
    description: "High-fidelity designs crafted with your brand identity and conversion goals in mind.",
  },
  {
    step: "04",
    icon: Code2,
    title: "Build",
    description: "Engineers bring the designs to life with clean, performant, production-ready code.",
  },
  {
    step: "05",
    icon: Rocket,
    title: "Launch",
    description: "Rigorous QA, deployment, and a smooth handover — then we monitor and optimise.",
  },
];

const STATS = [
  { value: 50, suffix: "+", label: "Projects Completed" },
  { value: 40, suffix: "+", label: "Happy Clients" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 200, suffix: "%", label: "Average Growth" },
];

const seoContent = `
IT Meta Solutions offers a comprehensive suite of digital services designed to help businesses grow and succeed online. From web development and custom applications to Salesforce CRM implementation, digital marketing, SEO, social media management, graphic design, and video production — we bring the full spectrum of digital expertise under one roof.

Our web development team specialises in building high-performance, conversion-optimised websites and web applications using modern frameworks including React, Next.js, and Node.js. Every project is engineered for speed, scalability, and security.

Our digital marketing and SEO specialists craft data-driven strategies that deliver measurable ROI. Whether you need paid advertising on Google and Meta, organic search growth, or a full social media presence — we build campaigns that convert.

As a Salesforce partner, we implement and customise Sales Cloud, Service Cloud, and Experience Cloud solutions that streamline operations and accelerate revenue growth for businesses of all sizes.

Our creative team delivers world-class branding, graphic design, and video production that builds brand equity and drives engagement across all touchpoints.
`;

const seoFaqs = [
  {
    question: "What services does IT Meta Solutions offer?",
    answer:
      "IT Meta Solutions offers web development, custom web applications, Salesforce CRM implementation, digital marketing, SEO, social media management, graphic design, video editing, and brand building services.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary by scope. A standard website takes 4–8 weeks. Custom applications typically take 8–16 weeks. Digital marketing campaigns are ongoing with results visible within 60–90 days.",
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer:
      "Yes. Every project includes post-launch support. We offer monthly retainer packages for ongoing maintenance, updates, and continuous improvement.",
  },
  {
    question: "How does IT Meta Solutions price its services?",
    answer:
      "Pricing is tailored to each project's scope and requirements. We offer fixed-price packages for standard services and custom quotes for complex projects. Contact us for a free consultation.",
  },
  {
    question: "Are you a Salesforce certified partner?",
    answer:
      "Our team includes Salesforce-certified developers with hands-on experience implementing Sales Cloud, Service Cloud, and Experience Cloud for clients across multiple industries.",
  },
];

/* ==================== COMPONENTS ==================== */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-[#5025d1] via-purple-500 to-pink-500"
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
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ target, suffix, reduced }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || reduced) {
      setCount(target);
      return;
    }
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target, reduced]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ==================== PAGE ==================== */

export default function Services() {
  const reduced = usePrefersReducedMotion();
  const [activeFeatured, setActiveFeatured] = useState(0);

  return (
    <div className="itms-subpage min-h-screen bg-[#09090e] text-white">
      <Helmet>
        <title>Our Services | IT Meta Solutions</title>
        <meta
          name="description"
          content="Explore IT Meta Solutions' full range of digital services — web development, Salesforce CRM, digital marketing, SEO, social media, graphic design, video editing, and brand building."
        />
      </Helmet>

      <SubpageVisualLayer />
      {!reduced && <ScrollProgress />}

      {/* ==================== 1. HERO ==================== */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        {/* Background image */}
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1800&q=80"
            alt=""
            className="h-full w-full object-cover object-center opacity-20"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#09090e]/60 via-[#09090e]/70 to-[#09090e]" />
        </div>

        {/* Glow blobs */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full bg-[#5025d1]/20 blur-[120px] -z-10" />
        <div className="pointer-events-none absolute -top-20 right-0 h-[400px] w-[400px] rounded-full bg-[#ba55d3]/15 blur-[100px] -z-10" />

        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={reduced ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#5025d1]/40 bg-[#5025d1]/10 px-4 py-2 text-sm font-medium text-[#a78bfa]"
            >
              <Sparkles className="h-4 w-4" />
              Full-Service Digital Agency
            </motion.div>

            <motion.h1
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={reduced ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Everything Your Business
              <br />
              <span className="animated-gradient-text">Needs to Grow Online</span>
            </motion.h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={reduced ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-zinc-400 sm:text-xl max-w-2xl mx-auto"
            >
              From first click to loyal customer — we provide end-to-end digital services that generate real, measurable business results.
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={reduced ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#5025d1] to-purple-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#5025d1]/30 transition-all hover:shadow-[#5025d1]/50 hover:scale-105"
              >
                Book a Free Consultation
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-base font-semibold text-white transition-all hover:bg-white/10 hover:border-white/25"
              >
                View Our Work
                <ChevronRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ==================== 2. SERVICES OVERVIEW GRID ==================== */}
      <section className="py-20 sm:py-28 bg-[#0b0b14]">
        <Container>
          <Reveal className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#a78bfa] mb-3">What We Do</p>
            <h2 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">Our Core Services</h2>
            <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
              Eight specialist disciplines, one integrated team — built to accelerate your business.
            </p>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <Reveal key={svc.id} delay={i * 0.05}>
                  <Link
                    to={svc.link}
                    className="group block rounded-2xl border border-white/[0.07] bg-[#111118] overflow-hidden transition-all duration-300 hover:border-white/20 hover:-translate-y-1 hover:shadow-xl"
                    style={{ "--svc-glow": svc.accent }}
                  >
                    {/* Image */}
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={svc.image}
                        alt={svc.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111118]/90 via-[#111118]/30 to-transparent" />
                      <div
                        className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#1c1a3a]/90 backdrop-blur-sm"
                        style={{ boxShadow: `0 0 14px ${svc.accent}55` }}
                      >
                        <Icon className="h-4 w-4" style={{ color: svc.accent }} />
                      </div>
                    </div>
                    {/* Text */}
                    <div className="p-5">
                      <h3 className="font-bold text-white text-base mb-1.5 group-hover:text-[#a78bfa] transition-colors">
                        {svc.title}
                      </h3>
                      <p className="text-xs text-zinc-500 leading-relaxed">{svc.short}</p>
                      <div className="mt-4 flex items-center gap-1 text-xs font-medium" style={{ color: svc.accent }}>
                        Learn more
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ==================== 3. FEATURED SERVICE SHOWCASE ==================== */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#a78bfa] mb-3">Deep Dive</p>
            <h2 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">Explore Our Specialisations</h2>
            <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
              Click any service to see what we deliver, why it matters, and what you can expect.
            </p>
          </Reveal>

          {/* Tab buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {FEATURED.map((f, i) => {
              const Icon = f.icon;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFeatured(i)}
                  className={cx(
                    "inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200",
                    activeFeatured === i
                      ? "bg-gradient-to-r from-[#5025d1] to-purple-600 text-white shadow-lg shadow-[#5025d1]/30"
                      : "border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <AnimatePresence mode="wait">
            {FEATURED.map((f, i) => {
              if (i !== activeFeatured) return null;
              return (
                <motion.div
                  key={f.id}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={reduced ? {} : { opacity: 1, y: 0 }}
                  exit={reduced ? {} : { opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="grid gap-8 lg:grid-cols-2 items-center rounded-3xl border border-white/[0.07] bg-[#0f0f17] overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-72 lg:h-full min-h-[320px] overflow-hidden">
                    <img
                      src={f.image}
                      alt={f.label}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0f0f17] hidden lg:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f17]/80 via-transparent to-transparent lg:hidden" />
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-10 lg:pl-4">
                    <h3 className="text-2xl font-extrabold text-white mb-3 leading-snug">{f.headline}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-7">{f.description}</p>
                    <ul className="space-y-2.5 mb-8">
                      {f.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-sm text-zinc-300">
                          <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#a78bfa]" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#5025d1] to-purple-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-[#5025d1]/30 hover:scale-105"
                    >
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </Container>
      </section>

      {/* ==================== 4. WHY CLIENTS CHOOSE US ==================== */}
      <section className="py-20 sm:py-28 bg-[#0b0b14]">
        <Container>
          <Reveal className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#a78bfa] mb-3">Why IT Meta</p>
            <h2 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">Why Clients Choose Us</h2>
            <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
              We combine technical excellence with business acumen to deliver outcomes that matter.
            </p>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {REASONS.map((r, i) => {
              const Icon = r.icon;
              return (
                <Reveal key={r.title} delay={i * 0.08}>
                  <div
                    className={cx(
                      "group rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1",
                      `bg-gradient-to-br ${r.gradient}`,
                      r.border
                    )}
                  >
                    <div
                      className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#09090e]/60"
                      style={{ boxShadow: `0 0 20px ${r.glow}` }}
                    >
                      <Icon className={cx("h-6 w-6", r.iconColor)} />
                    </div>
                    <h3 className="mb-2 text-base font-bold text-white">{r.title}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">{r.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ==================== 5. OUR PROCESS ==================== */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1800&q=80"
            alt=""
            className="h-full w-full object-cover opacity-10"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#09090e] via-[#09090e]/90 to-[#09090e]" />
        </div>

        <Container>
          <Reveal className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#a78bfa] mb-3">How We Work</p>
            <h2 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">Our Proven Process</h2>
            <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
              A clear, collaborative process that keeps you informed at every stage.
            </p>
          </Reveal>

          {/* Desktop: horizontal timeline */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-0 relative">
            {/* Connector line */}
            <div className="absolute top-10 left-[10%] right-[10%] h-px bg-gradient-to-r from-[#5025d1]/20 via-[#5025d1]/60 to-[#5025d1]/20" />

            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.step} delay={i * 0.1}>
                  <div className="flex flex-col items-center text-center px-4 pt-2">
                    <div
                      className="relative z-10 mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-[#5025d1]/40 bg-gradient-to-br from-[#5025d1]/20 to-[#09090e]"
                      style={{ boxShadow: "0 0 24px rgba(80,37,209,0.3)" }}
                    >
                      <Icon className="h-7 w-7 text-[#a78bfa]" />
                      <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#5025d1] text-[10px] font-bold text-white">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="font-bold text-white text-base mb-2">{step.title}</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">{step.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Mobile: vertical */}
          <div className="lg:hidden space-y-0">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.step} delay={i * 0.07}>
                  <div className="flex gap-5 pb-8 last:pb-0 relative">
                    {i < PROCESS_STEPS.length - 1 && (
                      <div className="absolute left-6 top-14 bottom-0 w-px bg-[#5025d1]/30" />
                    )}
                    <div
                      className="relative z-10 flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full border border-[#5025d1]/40 bg-gradient-to-br from-[#5025d1]/20 to-[#09090e]"
                      style={{ boxShadow: "0 0 16px rgba(80,37,209,0.3)" }}
                    >
                      <Icon className="h-5 w-5 text-[#a78bfa]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-[#5025d1]">{step.step}</span>
                        <h3 className="font-bold text-white text-sm">{step.title}</h3>
                      </div>
                      <p className="text-xs text-zinc-500 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ==================== 6. STATS ==================== */}
      <section className="py-20 sm:py-24 bg-[#0b0b14]">
        <Container>
          <Reveal className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#a78bfa] mb-3">By the Numbers</p>
            <h2 className="text-3xl font-extrabold sm:text-4xl">Results We're Proud Of</h2>
          </Reveal>

          <div className="relative rounded-3xl border border-white/[0.07] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#5025d1]/10 via-transparent to-[#ba55d3]/5" />
            <div className="relative grid grid-cols-2 divide-x divide-y divide-white/[0.06] lg:grid-cols-4 lg:divide-y-0">
              {STATS.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.1}>
                  <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                    <div className="text-5xl font-black text-white mb-2" style={{ fontVariantNumeric: "tabular-nums" }}>
                      <CountUp target={stat.value} suffix={stat.suffix} reduced={reduced} />
                    </div>
                    <p className="text-sm text-zinc-500">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ==================== SEO CONTENT ==================== */}
      <SeoContentFaq content={seoContent} faqs={seoFaqs} />

      {/* ==================== 7. CTA ==================== */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/10">
              {/* Background */}
              <div className="absolute inset-0 -z-10">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80"
                  alt=""
                  className="h-full w-full object-cover opacity-15"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#5025d1]/40 via-[#09090e]/80 to-[#ba55d3]/20" />
              </div>
              <div className="relative py-16 px-8 sm:py-20 sm:px-16 text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#a78bfa]/30 bg-[#5025d1]/10 px-4 py-1.5 text-sm font-medium text-[#a78bfa]">
                  <Sparkles className="h-4 w-4" />
                  Let's Build Something Great
                </div>
                <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl md:text-5xl text-white max-w-2xl mx-auto leading-tight">
                  Ready to Grow Your Business?
                </h2>
                <p className="mt-5 text-zinc-400 text-lg max-w-xl mx-auto">
                  Book a free 30-minute strategy call. No obligation — just a focused conversation about your goals and how we can help.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-bold text-[#09090e] shadow-lg transition-all hover:shadow-white/20 hover:scale-105"
                  >
                    Book Consultation
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link
                    to="/work"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-white/10"
                  >
                    See Our Projects
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
