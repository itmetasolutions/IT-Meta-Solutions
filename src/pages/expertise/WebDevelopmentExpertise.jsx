import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
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
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import SeoContentFaq from "../../components/SeoContentFaq";
import SubpageVisualLayer from "../../components/SubpageVisualLayer";

/**
 * Web Development Expertise Page - IT Meta Solutions
 * Showcasing company's web development capabilities and achievements
 */

const cx = (...c) => c.filter(Boolean).join(" ");

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
  subtitle:
    "We build performance-optimized Shopify and WooCommerce stores, custom web apps, and conversion-focused websites.",
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
  {
    q: "Do you build performance-optimized Shopify stores?",
    a: "Yes. We build fast-loading Shopify stores with conversion-focused UX and clean code.",
  },
  {
    q: "Can you add custom calculators or pricing tools?",
    a: "Yes. We build custom product calculators, area-to-pack tools, and real-time pricing engines.",
  },
  {
    q: "Do you support WooCommerce store setup?",
    a: "Yes. We handle WooCommerce setup, migration, optimization, and ongoing improvements.",
  },
  {
    q: "Can you improve an existing ecommerce site?",
    a: "Absolutely. We optimize speed, UX, and conversion funnels without a full rebuild.",
  },
];

function Container({ children, className }) {
  return (
    <div className={cx("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
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

function GradientBlob({ className }) {
  return (
    <div
      aria-hidden
      className={cx(
        "pointer-events-none absolute -z-10 blur-3xl opacity-40",
        "bg-[radial-gradient(closest-side,rgba(99,102,241,0.6),rgba(99,102,241,0))]",
        className
      )}
    />
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 18, mass: 0.5 });
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-indigo-500 via-emerald-400 to-fuchsia-500"
      style={{ scaleX: w }}
    />
  );
}

function Reveal({ children, delay = 0, className }) {
  return (
    <motion.div
      className={className}
      initial={{ y: 16 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function Pill({ icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
      {Icon ? <Icon className="h-3.5 w-3.5 opacity-80" /> : null}
      {children}
    </span>
  );
}

function SectionTitle({ kicker, title, desc, align = "left", level = "h2" }) {
  const HeadingTag = level;
  return (
    <div className={cx("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
        <Sparkles className="h-3.5 w-3.5" />
        {kicker}
      </div>
      <HeadingTag className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</HeadingTag>
      <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">{desc}</p>
    </div>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 h-full flex flex-col justify-center">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-2xl font-semibold text-white">{value}</div>
          <div className="text-sm text-zinc-300">{label}</div>
        </div>
      </div>
    </div>
  );
}

function Card({ icon: Icon, title, desc, bullets }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-6 pb-8 h-full flex">
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />
      </div>

      <div className="relative flex h-full flex-col">
        <div className="mb-4 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>

        {desc && <p className="text-sm leading-relaxed text-zinc-300">{desc}</p>}

        {bullets?.length ? (
          <ul className="mt-5 space-y-2 text-sm text-zinc-200">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <BadgeCheck className="h-4 w-4 text-emerald-300 mt-0.5 flex-shrink-0" />
                <span className="opacity-90">{b}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto pt-4" />
      </div>
    </div>
  );
}

function StickyNav({ items }) {
  const [active, setActive] = React.useState("");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    items.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="sticky top-24 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur">
      <Container className="py-4">
        <nav className="flex flex-wrap gap-2">
          {items.map((item) => (
            <AnchorLink
              key={item.href}
              href={item.href}
              className={cx(
                "rounded-xl px-4 py-2 text-sm transition",
                active === item.href
                  ? "bg-white text-zinc-950"
                  : "text-zinc-300 hover:bg-white/10"
              )}
            >
              {item.label}
            </AnchorLink>
          ))}
        </nav>
      </Container>
    </div>
  );
}

function Divider() {
  return <div className="my-14 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />;
}

export default function WebDevelopmentExpertisePage() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -100]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.85]);
  const heroRef = useRef(null);

  return (
    <>
      <Helmet>
        <title>Web Development Expertise - IT Meta Solutions</title>
        <meta name="description" content="Shopify and WooCommerce experts building high-converting ecommerce sites, custom web apps, and fast-loading experiences." />
        <meta name="keywords" content="web development, HTML, CSS, JavaScript, React, Node.js, WordPress, Shopify, Shopware, e-commerce development, custom websites, IT Meta Solutions" />
        <meta property="og:title" content="Web Development Expertise - IT Meta Solutions" />
        <meta property="og:description" content="IT Meta Solutions - 5+ years of web development expertise. Custom websites, e-commerce solutions, and modern web applications built with HTML/CSS, JavaScript, React, Node.js, WordPress, Shopify & Shopware." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://itmetasolutions.com/web-development-expertise" />
      </Helmet>

      <div className="itms-subpage relative min-h-screen text-zinc-100 mb-16 overflow-hidden">
        <SubpageVisualLayer />

        <ScrollProgress />

        {/* Background accents */}
        <GradientBlob className="h-[600px] w-[600px] -left-32 -top-32" />
        <GradientBlob className="h-[600px] w-[600px] -right-32 top-96 bg-[radial-gradient(closest-side,rgba(16,185,129,0.5),rgba(16,185,129,0))]" />

        {/* HERO */}
        <section ref={heroRef} className="relative overflow-hidden">
          <Container className="pb-10 pt-24 sm:pb-14 sm:pt-32">
            <motion.div style={{ y: heroY, opacity: heroOpacity }}>
              <Reveal>
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <Pill icon={Code2}>Web Development</Pill>
                  <Pill icon={Globe}>Modern Websites</Pill>
                  <Pill icon={Store}>E-Commerce</Pill>
                  <Pill icon={Zap}>High Performance</Pill>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  Web Development Expertise
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-zinc-300 max-w-3xl">
                  IT Meta Solutions brings 5+ years of experience building high-performance websites and e-commerce platforms that drive business growth. We specialize in creating fast, responsive, and conversion-optimized web solutions across multiple platforms and technologies.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  <Stat icon={Code2} label="Years of Experience" value="5+" />
                  <Stat icon={Globe} label="Websites Built" value="50+" />
                  <Stat icon={Store} label="E-Commerce Stores" value="20+" />
                </div>
              </Reveal>
            </motion.div>
          </Container>
        </section>

        {/* STICKY NAV */}
        <StickyNav items={nav} />

        <Container>
          <Divider />

          {/* OVERVIEW */}
          <section id="overview">
            <Reveal>
              <SectionTitle
                kicker="Company Overview"
                title="Building Digital Experiences That Convert"
                desc="We create modern, high-performance websites and e-commerce platforms that combine beautiful design with cutting-edge technology to deliver measurable business results."
              />
            </Reveal>

            <Reveal delay={0.05}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-8">
                <p className="text-base leading-relaxed text-zinc-300">
                  IT Meta Solutions specializes in web development across multiple platforms and technologies. From custom-coded solutions using React and Node.js to powerful e-commerce stores on Shopify and Shopware, we deliver websites that are fast, secure, and built to scale.
                </p>
                <p className="mt-4 text-base leading-relaxed text-zinc-300">
                  Our development approach focuses on performance, user experience, and conversion optimization. We build websites that not only look great but also load quickly, rank well in search engines, and turn visitors into customers.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <Card
                  icon={Gauge}
                  title="Performance-First"
                  bullets={[
                    "Lightning-fast load times",
                    "Mobile-optimized responsive design",
                    "SEO-ready architecture",
                  ]}
                />
                <Card
                  icon={ShieldCheck}
                  title="Reliable & Secure"
                  bullets={[
                    "Clean, maintainable code",
                    "Security best practices",
                    "Regular updates & support",
                  ]}
                />
                <Card
                  icon={Users}
                  title="User-Centered"
                  bullets={[
                    "Intuitive navigation",
                    "Conversion-optimized layouts",
                    "Accessibility standards",
                  ]}
                />
              </div>
            </Reveal>
          </section>

          <Divider />

          {/* EXPERTISE */}
          <section id="expertise">
            <Reveal>
              <SectionTitle
                kicker="Web Development Expertise"
                title="Comprehensive Web Solutions"
                desc="From business websites to complex e-commerce platforms, we build digital solutions that drive growth and enhance user experiences."
              />
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <Reveal delay={0.05}>
                <Card
                  icon={LayoutGrid}
                  title="Business Websites"
                  desc="Professional websites designed to showcase your brand and convert visitors."
                  bullets={[
                    "Landing pages & portfolios",
                    "Corporate websites",
                    "Service-based business sites",
                    "Lead generation systems",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.1}>
                <Card
                  icon={Store}
                  title="E-Commerce Solutions"
                  desc="Full-featured online stores optimized for sales and customer experience."
                  bullets={[
                    "Shopify store development",
                    "Shopware implementations",
                    "Custom cart solutions",
                    "Payment gateway integration",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.15}>
                <Card
                  icon={Laptop}
                  title="Custom Web Applications"
                  desc="Tailored web applications built with modern frameworks and technologies."
                  bullets={[
                    "React single-page applications",
                    "Node.js backend development",
                    "RESTful API development",
                    "Database design & integration",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.2}>
                <Card
                  icon={Smartphone}
                  title="Responsive Design"
                  desc="Mobile-first approach ensuring perfect experiences on all devices."
                  bullets={[
                    "Mobile-optimized layouts",
                    "Cross-browser compatibility",
                    "Touch-friendly interfaces",
                    "Progressive enhancement",
                  ]}
                />
              </Reveal>
            </div>
          </section>

          <Divider />

          {/* ACHIEVEMENTS */}
          <section id="achievements">
            <Reveal>
              <SectionTitle
                kicker="Key Achievements"
                title="Delivering Measurable Results"
                desc="Our work drives real business outcomes through performance, reliability, and user-focused design."
              />
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <Reveal delay={0.05}>
                <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 mb-4">
                    <Globe className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">50+</div>
                  <div className="mt-1 text-sm text-zinc-300">Websites Delivered</div>
                  <p className="mt-3 text-xs text-zinc-400">From startups to established businesses</p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 mb-4">
                    <Gauge className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">90+</div>
                  <div className="mt-1 text-sm text-zinc-300">Performance Score</div>
                  <p className="mt-3 text-xs text-zinc-400">Average Google PageSpeed score</p>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 mb-4">
                    <Store className="h-6 w-6 text-fuchsia-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">20+</div>
                  <div className="mt-1 text-sm text-zinc-300">E-Commerce Stores</div>
                  <p className="mt-3 text-xs text-zinc-400">Successful online retail platforms</p>
                </div>
              </Reveal>
            </div>
          </section>

          <Divider />

          {/* SKILLS */}
          <section id="skills">
            <Reveal>
              <SectionTitle
                kicker="Technical Skills"
                title="Modern Technology Stack"
                desc="We work with industry-leading technologies and platforms to deliver cutting-edge web solutions."
              />
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              <Reveal delay={0.05}>
                <Card
                  icon={Code2}
                  title="Programming Languages"
                  bullets={[
                    "HTML5 & CSS3",
                    "JavaScript (ES6+)",
                    "React.js & Next.js",
                    "Node.js & Express",
                    "TypeScript",
                    "PHP",
                    "SQL & NoSQL databases",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.1}>
                <Card
                  icon={Store}
                  title="E-Commerce Platforms"
                  bullets={[
                    "Shopify & Shopify Plus",
                    "Shopware 6",
                    "WooCommerce",
                    "Custom cart solutions",
                    "Payment integrations",
                    "Inventory management",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.15}>
                <Card
                  icon={Settings}
                  title="CMS & Frameworks"
                  bullets={[
                    "WordPress development",
                    "React.js & Vue.js",
                    "Tailwind CSS & Bootstrap",
                    "REST & GraphQL APIs",
                    "Git version control",
                    "Responsive frameworks",
                  ]}
                />
              </Reveal>
            </div>
          </section>

          <Divider />

          {/* INDUSTRIES */}
          <section id="industries">
            <Reveal>
              <SectionTitle
                kicker="Industries We Serve"
                title="Diverse Market Expertise"
                desc="Our web solutions power businesses across multiple industries, each with unique digital requirements and challenges."
              />
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Reveal delay={0.05}>
                <Card
                  icon={ShoppingCart}
                  title="Retail & E-Commerce"
                  desc="High-converting online stores with seamless checkout experiences, inventory management, and marketing integrations."
                />
              </Reveal>

              <Reveal delay={0.1}>
                <Card
                  icon={Home}
                  title="Real Estate"
                  desc="Property listing websites with advanced search, interactive maps, and lead capture systems for real estate professionals."
                />
              </Reveal>

              <Reveal delay={0.15}>
                <Card
                  icon={Briefcase}
                  title="Professional Services"
                  desc="Corporate websites for agencies, consultants, and service providers focused on credibility and lead generation."
                />
              </Reveal>

              <Reveal delay={0.2}>
                <Card
                  icon={Heart}
                  title="Healthcare & Wellness"
                  desc="HIPAA-compliant websites and patient portals for healthcare providers, clinics, and wellness businesses."
                />
              </Reveal>

              <Reveal delay={0.25}>
                <Card
                  icon={GraduationCap}
                  title="Education"
                  desc="Learning management systems, course platforms, and educational websites with engaging user experiences."
                />
              </Reveal>

              <Reveal delay={0.3}>
                <Card
                  icon={DollarSign}
                  title="Finance & Insurance"
                  desc="Secure, professional websites for financial services with advanced security and compliance features."
                />
              </Reveal>

              <Reveal delay={0.35}>
                <Card
                  icon={Leaf}
                  title="Green & Sustainability"
                  desc="Websites for eco-friendly businesses and sustainability initiatives promoting environmental responsibility."
                />
              </Reveal>

              <Reveal delay={0.4}>
                <Card
                  icon={Wifi}
                  title="Technology & SaaS"
                  desc="Modern web platforms for tech companies, startups, and software-as-a-service businesses."
                />
              </Reveal>

              <Reveal delay={0.45}>
                <Card
                  icon={TrendingUp}
                  title="Marketing & Advertising"
                  desc="Portfolio and showcase websites for creative agencies and marketing firms that demand visual excellence."
                />
              </Reveal>
            </div>
          </section>

          <Divider />

          <SeoContentFaq content={seoContent} faqs={seoFaqs} />

          {/* CTA */}
          <section>
            <Reveal>
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-emerald-400/10 p-8 md:p-12">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Ready to Build Your Next Web Project?
                  </h2>
                  <p className="text-lg text-zinc-300 mb-8">
                    Let's discuss how our web development expertise can bring your vision to life with a fast, beautiful, and high-converting website.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-zinc-950 hover:opacity-90 transition"
                    >
                      Get Started <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href="/work?filter=web"
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
                    >
                      View Web Projects
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>
        </Container>

        <div className="h-20" />
      </div>
    </>
  );
}
