import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useInView } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Code2,
  Database,
  Globe,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
  GraduationCap,
  Heart,
  ShoppingCart,
  DollarSign,
  Leaf,
  Wifi,
  Home,
  Briefcase,
  Laptop,
  Smartphone,
  Store,
  Boxes,
  Gauge,
  LayoutGrid,
  CheckCircle2,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import SeoContentFaq from "../../components/SeoContentFaq";
import Container from "../../components/Container";

/* ==================== HELPERS ==================== */

const cx = (...c) => c.filter(Boolean).join(" ");

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

function AnchorLink({ href, children, className }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        if (href?.startsWith?.("#")) {
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

/* ==================== LIGHT CARD ==================== */

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
          <ul className="space-y-2">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color }} />
                {b}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Reveal>
  );
}

/* ==================== STICKY NAV ==================== */

function StickyNav({ items }) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(`#${e.target.id}`); }),
      { rootMargin: "-20% 0px -70% 0px" }
    );
    items.forEach(({ href }) => { const el = document.querySelector(href); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="sticky top-[64px] z-40 border-b border-slate-100 bg-white/95 backdrop-blur-sm shadow-sm">
      <Container className="py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500">
            <Code2 className="h-3.5 w-3.5 text-[#1D4ED8]" />
            Web Development
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {items.map((item) => (
              <AnchorLink
                key={item.href}
                href={item.href}
                className={cx(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                  active === item.href
                    ? "border-[#1D4ED8] bg-[#1D4ED8] text-white"
                    : "border-slate-200 bg-[#F1F4F9] text-slate-600 hover:border-[#1D4ED8]/40 hover:text-[#1D4ED8]"
                )}
              >
                {item.label}
              </AnchorLink>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

/* ==================== DATA ==================== */

const nav = [
  { label: "Overview", href: "#overview" },
  { label: "Expertise", href: "#expertise" },
  { label: "Achievements", href: "#achievements" },
  { label: "Skills", href: "#skills" },
  { label: "Industries", href: "#industries" },
];

const seoContent = {
  kicker: "Web Development",
  title: "High-Converting Ecommerce and Custom Web Apps",
  subtitle: "We build performance-optimized Shopify and WooCommerce stores, custom web apps, and conversion-focused websites.",
  paragraphs: [
    "Our web team combines speed, UX, and SEO to deliver fast-loading ecommerce experiences that convert.",
    "We also create custom calculators, real-time pricing engines, and integration-ready web apps.",
  ],
  bullets: [
    "Shopify custom theme development and CRO improvements",
    "WooCommerce store setup services with speed optimization",
    "Custom product calculators and pricing engines",
    "Performance-optimized ecommerce websites",
  ],
};

const seoFaqs = [
  { q: "Do you build performance-optimized Shopify stores?", a: "Yes. We build fast-loading Shopify stores with conversion-focused UX and clean code." },
  { q: "Can you add custom calculators or pricing tools?", a: "Yes. We build custom product calculators, area-to-pack tools, and real-time pricing engines." },
  { q: "Do you support WooCommerce store setup?", a: "Yes. We handle WooCommerce setup, migration, optimization, and ongoing improvements." },
  { q: "Can you improve an existing ecommerce site?", a: "Absolutely. We optimize speed, UX, and conversion funnels without a full rebuild." },
];

/* ==================== PAGE ==================== */

export default function WebDevelopmentExpertisePage() {
  return (
    <>
      <Helmet>
        <title>Web Development Expertise - IT Meta Solutions</title>
        <meta name="description" content="Shopify and WooCommerce experts building high-converting ecommerce sites, custom web apps, and fast-loading experiences." />
        <meta name="keywords" content="web development, HTML, CSS, JavaScript, React, Node.js, WordPress, Shopify, e-commerce development, custom websites, IT Meta Solutions" />
        <meta property="og:title" content="Web Development Expertise - IT Meta Solutions" />
        <meta property="og:description" content="IT Meta Solutions — 5+ years of web development expertise. Custom websites, e-commerce solutions, and modern web applications." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://itmetasolutions.com/web-development-expertise" />
      </Helmet>

      <ScrollProgress />

      {/* ==================== HERO (dark) ==================== */}
      <section className="relative bg-[#141A2E] overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="absolute inset-0 dot-grid-bg opacity-25 pointer-events-none" />
        <div className="absolute -top-32 right-0 w-[600px] h-[500px] rounded-full bg-[#1D4ED8]/10 blur-[120px] pointer-events-none" />

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                { icon: Code2, label: "Web Development" },
                { icon: Globe, label: "Modern Websites" },
                { icon: Store, label: "E-Commerce" },
                { icon: Zap, label: "High Performance" },
              ].map((b) => (
                <span key={b.label} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-slate-300">
                  <b.icon className="h-3.5 w-3.5 text-[#3AC9F5]" />
                  {b.label}
                </span>
              ))}
            </div>

            <h1
              className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Web Development{" "}
              <span className="animated-gradient-text">Expertise</span>
            </h1>

            <p className="mt-6 text-lg text-slate-400 max-w-3xl leading-relaxed">
              IT Meta Solutions brings 5+ years of experience building high-performance websites and e-commerce platforms that drive business growth. We specialize in creating fast, responsive, and conversion-optimized web solutions across multiple platforms and technologies.
            </p>

            {/* Stats */}
            <div className="mt-10 grid gap-4 sm:grid-cols-3 max-w-2xl">
              {[
                { icon: Code2, label: "Years of Experience", value: "5+", color: "#1D4ED8" },
                { icon: Globe, label: "Websites Built", value: "50+", color: "#23A6E8" },
                { icon: Store, label: "E-Commerce Stores", value: "20+", color: "#3AC9F5" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: `${s.color}30` }}>
                      <s.icon className="h-4 w-4" style={{ color: s.color }} />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</div>
                      <div className="text-xs text-slate-400">{s.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">
                Start a Project <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/work?filter=web" className="btn-ghost-dark">
                View Web Projects
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ==================== BANNER IMAGE (white) ==================== */}
      <section className="bg-white py-12">
        <Container>
          <div className="relative h-64 sm:h-80 overflow-hidden rounded-3xl shadow-xl shadow-slate-200">
            <img
              src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1400&q=80"
              alt="Web Development"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1D4ED8]/60 via-[#141A2E]/30 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8 sm:px-12">
              <div>
                <p className="text-white/80 text-sm font-medium mb-2">Our web development stack</p>
                <p className="text-white text-2xl font-bold sm:text-3xl max-w-xs" style={{ fontFamily: "var(--font-heading)" }}>
                  Fast, clean &amp; conversion-focused
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ==================== STICKY NAV ==================== */}
      <StickyNav items={nav} />

      {/* ==================== OVERVIEW (white) ==================== */}
      <section id="overview" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mb-10">
            <span className="kicker">Company Overview</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Building Digital Experiences That Convert
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">
              We create modern, high-performance websites and e-commerce platforms that combine beautiful design with cutting-edge technology to deliver measurable business results.
            </p>
          </Reveal>

          <Reveal delay={0.05} className="mb-8">
            <div className="premium-card rounded-2xl p-7">
              <p className="text-slate-700 leading-relaxed">
                IT Meta Solutions specializes in web development across multiple platforms and technologies. From custom-coded solutions using React and Node.js to powerful e-commerce stores on Shopify and WooCommerce, we deliver websites that are fast, secure, and built to scale.
              </p>
              <p className="mt-4 text-slate-700 leading-relaxed">
                Our development approach focuses on performance, user experience, and conversion optimization. We build websites that not only look great but also load quickly, rank well in search engines, and turn visitors into customers.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            <LightCard color="#1D4ED8" icon={Gauge} title="Performance-First" bullets={["Lightning-fast load times", "Mobile-optimized responsive design", "SEO-ready architecture"]} />
            <LightCard color="#23A6E8" icon={ShieldCheck} title="Reliable & Secure" bullets={["Clean, maintainable code", "Security best practices", "Regular updates & support"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={Users} title="User-Centered" bullets={["Intuitive navigation", "Conversion-optimized layouts", "Accessibility standards"]} delay={0.1} />
          </div>
        </Container>
      </section>

      {/* ==================== EXPERTISE (mist) ==================== */}
      <section id="expertise" className="scroll-mt-28 bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Web Development Expertise</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Comprehensive Web Solutions
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">
              From business websites to complex e-commerce platforms, we build digital solutions that drive growth and enhance user experiences.
            </p>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-2">
            <LightCard color="#1D4ED8" icon={LayoutGrid} title="Business Websites" desc="Professional websites designed to showcase your brand and convert visitors." bullets={["Landing pages & portfolios", "Corporate websites", "Service-based business sites", "Lead generation systems"]} />
            <LightCard color="#23A6E8" icon={Store} title="E-Commerce Solutions" desc="Full-featured online stores optimized for sales and customer experience." bullets={["Shopify store development", "WooCommerce implementations", "Custom cart solutions", "Payment gateway integration"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={Laptop} title="Custom Web Applications" desc="Tailored web applications built with modern frameworks and technologies." bullets={["React single-page applications", "Node.js backend development", "RESTful API development", "Database design & integration"]} delay={0.1} />
            <LightCard color="#1D4ED8" icon={Smartphone} title="Responsive Design" desc="Mobile-first approach ensuring perfect experiences on all devices." bullets={["Mobile-optimized layouts", "Cross-browser compatibility", "Touch-friendly interfaces", "Progressive enhancement"]} delay={0.15} />
          </div>
        </Container>
      </section>

      {/* ==================== ACHIEVEMENTS (white) ==================== */}
      <section id="achievements" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Key Achievements</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Delivering Measurable Results
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">
              Our work drives real business outcomes through performance, reliability, and user-focused design.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Globe, value: "50+", label: "Websites Delivered", desc: "From startups to established businesses", color: "#1D4ED8" },
              { icon: Gauge, value: "90+", label: "Performance Score", desc: "Average Google PageSpeed score", color: "#23A6E8" },
              { icon: Store, value: "20+", label: "E-Commerce Stores", desc: "Successful online retail platforms", color: "#3AC9F5" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.07}>
                <div className="premium-card rounded-2xl p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl mb-4" style={{ backgroundColor: `${stat.color}15` }}>
                    <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
                  </div>
                  <div className="text-4xl font-black mb-1" style={{ fontFamily: "var(--font-heading)", color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-base font-bold text-slate-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>{stat.label}</div>
                  <p className="text-sm text-slate-500">{stat.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ==================== SKILLS (mist) ==================== */}
      <section id="skills" className="scroll-mt-28 bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Technical Skills</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Modern Technology Stack
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">
              We work with industry-leading technologies and platforms to deliver cutting-edge web solutions.
            </p>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-3">
            <LightCard color="#1D4ED8" icon={Code2} title="Programming Languages" bullets={["HTML5 & CSS3", "JavaScript (ES6+)", "React.js & Next.js", "Node.js & Express", "TypeScript", "PHP", "SQL & NoSQL databases"]} />
            <LightCard color="#23A6E8" icon={Store} title="E-Commerce Platforms" bullets={["Shopify & Shopify Plus", "WooCommerce", "Custom cart solutions", "Payment integrations", "Inventory management"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={Settings} title="CMS & Frameworks" bullets={["WordPress development", "React.js & Vue.js", "Tailwind CSS & Bootstrap", "REST & GraphQL APIs", "Git version control", "Responsive frameworks"]} delay={0.1} />
          </div>
        </Container>
      </section>

      {/* ==================== INDUSTRIES (white) ==================== */}
      <section id="industries" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Industries We Serve</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Diverse Market Expertise
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">
              Our web solutions power businesses across multiple industries, each with unique digital requirements and challenges.
            </p>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: ShoppingCart, color: "#1D4ED8", title: "Retail & E-Commerce", desc: "High-converting online stores with seamless checkout, inventory management, and marketing integrations." },
              { icon: Home, color: "#23A6E8", title: "Real Estate", desc: "Property listing websites with advanced search, interactive maps, and lead capture systems." },
              { icon: Briefcase, color: "#3AC9F5", title: "Professional Services", desc: "Corporate websites for agencies, consultants, and service providers focused on credibility and lead generation." },
              { icon: Heart, color: "#1D4ED8", title: "Healthcare & Wellness", desc: "Compliant websites and patient portals for healthcare providers, clinics, and wellness businesses." },
              { icon: GraduationCap, color: "#23A6E8", title: "Education", desc: "Learning management systems, course platforms, and educational websites with engaging user experiences." },
              { icon: DollarSign, color: "#3AC9F5", title: "Finance & Insurance", desc: "Secure, professional websites for financial services with advanced security and compliance features." },
              { icon: Leaf, color: "#1D4ED8", title: "Green & Sustainability", desc: "Websites for eco-friendly businesses and sustainability initiatives promoting environmental responsibility." },
              { icon: Wifi, color: "#23A6E8", title: "Technology & SaaS", desc: "Modern web platforms for tech companies, startups, and software-as-a-service businesses." },
              { icon: TrendingUp, color: "#3AC9F5", title: "Marketing & Advertising", desc: "Portfolio and showcase websites for creative agencies and marketing firms that demand visual excellence." },
            ].map((card, i) => (
              <LightCard key={card.title} color={card.color} icon={card.icon} title={card.title} desc={card.desc} delay={(i % 3) * 0.07} />
            ))}
          </div>
        </Container>
      </section>

      {/* ==================== SEO / FAQ (mist) ==================== */}
      <div className="bg-[#F1F4F9]">
        <SeoContentFaq content={seoContent} faqs={seoFaqs} lightTheme={true} />
      </div>

      {/* ==================== CTA (dark) ==================== */}
      <section className="bg-[#141A2E] py-20 sm:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="kicker" style={{ borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.07)", color: "#93c5fd" }}>
                Start Your Project
              </span>
              <h2
                className="mt-6 text-3xl font-extrabold text-white sm:text-4xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Ready to Build Your Next Web Project?
              </h2>
              <p className="mt-5 text-lg text-slate-400 max-w-xl mx-auto">
                Let's discuss how our web development expertise can bring your vision to life with a fast, beautiful, and high-converting website.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link to="/contact" className="btn-primary">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/work?filter=web" className="btn-ghost-dark">
                  View Web Projects
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
