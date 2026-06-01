import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Cloud,
  Code2,
  Database,
  Globe,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Webhook,
  Zap,
  GraduationCap,
  Heart,
  ShoppingCart,
  DollarSign,
  Leaf,
  Wifi,
  Home,
  Briefcase,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import SeoContentFaq from "../../components/SeoContentFaq";
import SubpageVisualLayer from "../../components/SubpageVisualLayer";

/**
 * Salesforce Expertise Page - IT Meta Solutions
 * Showcasing company's Salesforce development capabilities and achievements
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
  kicker: "Salesforce Expertise",
  title: "Salesforce Implementation Partners for LWC and Experience Cloud",
  subtitle:
    "We design, build, and optimize Salesforce solutions with LWC development services, Experience Cloud portals, and automation.",
  paragraphs: [
    "Our team delivers Salesforce implementations that clean CRM data, automate lead generation, and streamline sales and service workflows.",
    "From custom Lightning Web Components to secure portals, we help organizations scale with measurable efficiency gains.",
  ],
  bullets: [
    "Salesforce automation experts and workflow optimization",
    "Experience Cloud portal development for customers and partners",
    "LWC development services for custom UI and integrations",
    "CRM data cleaning and duplicate check workflows",
  ],
};

const seoFaqs = [
  {
    q: "Do you offer Salesforce LWC development services?",
    a: "Yes. We build custom Lightning Web Components for tailored UI, productivity, and integrations.",
  },
  {
    q: "Can you build Experience Cloud portals?",
    a: "Yes. We design Experience Cloud portals for self-service, partner access, and customer onboarding.",
  },
  {
    q: "Do you handle CRM data cleaning?",
    a: "Yes. We clean Salesforce data, resolve duplicates, and improve reporting accuracy.",
  },
  {
    q: "Can I hire Salesforce developers for integration work only?",
    a: "Yes. We can support dedicated development for integrations and automation.",
  },
];

function Container({ children, className }) {
  return (
    <div className={cx("mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12", className)}>
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
    <div className="sticky top-16 z-30 border-b border-white/10 bg-zinc-950/80 backdrop-blur">
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

export default function SalesforceExpertisePage() {
  const heroRef = useRef(null);

  return (
    <>
      <Helmet>
        <title>Salesforce Development Expertise - IT Meta Solutions</title>
        <meta name="description" content="Salesforce implementation partners for LWC, Experience Cloud portals, automation, and CRM data cleanup." />
        <meta name="keywords" content="Salesforce development, Apex, Lightning Web Components, Salesforce integration, Sales Cloud, Service Cloud, Experience Cloud, IT Meta Solutions" />
        <meta property="og:title" content="Salesforce Development Expertise - IT Meta Solutions" />
        <meta property="og:description" content="IT Meta Solutions - 5+ years of Salesforce expertise. Custom CRM solutions, integrations, and automation across Sales Cloud, Service Cloud, and Experience Cloud." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://itmetasolutions.com/salesforce-expertise" />
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
            <motion.div>
              <Reveal>
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <Pill icon={Cloud}>Salesforce Development</Pill>
                  <Pill icon={Code2}>Custom Solutions</Pill>
                  <Pill icon={Webhook}>Integrations</Pill>
                  <Pill icon={Zap}>Automation</Pill>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  Salesforce Development Expertise
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-zinc-300 max-w-3xl">
                  IT Meta Solutions brings 5+ years of experience creating custom Salesforce solutions that help businesses streamline operations, optimize processes, and drive growth. We combine technical excellence with deep business understanding to deliver results-driven CRM implementations.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  <Stat icon={Cloud} label="Years of Experience" value="5+" />
                  <Stat icon={Webhook} label="Integrations Built" value="5+" />
                  <Stat icon={Zap} label="Lightning Apps" value="4+" />
                </div>
              </Reveal>
            </motion.div>
          </Container>
        </section>

        {/* Hero banner image */}
        <section className="pb-6">
          <Container>
            <div className="relative h-64 sm:h-80 overflow-hidden rounded-2xl border border-white/[0.07]">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80"
                alt="Salesforce Development"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090e]/80 via-[#09090e]/20 to-transparent" />
            </div>
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
                title="Technical Excellence Meets Business Impact"
                desc="We specialize in Salesforce development alongside web development and digital marketing, creating comprehensive solutions that drive real business results."
              />
            </Reveal>

            <Reveal delay={0.05}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-8">
                <p className="text-base leading-relaxed text-zinc-300">
                  IT Meta Solutions is a full-service technology partner specializing in Salesforce development, custom web applications, and performance-driven digital marketing. Our team combines technical expertise with strategic thinking to deliver solutions that streamline processes, reduce manual work, and boost productivity.
                </p>
                <p className="mt-4 text-base leading-relaxed text-zinc-300">
                  We're known for being reliable problem-solvers who prioritize outcomes over output. Every customization, automation, or integration we implement is designed with one goal: helping your business grow faster and work smarter.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <Card
                  icon={Target}
                  title="Results-Oriented"
                  bullets={[
                    "Outcomes over output",
                    "Measurable business impact",
                    "ROI-focused implementations",
                  ]}
                />
                <Card
                  icon={ShieldCheck}
                  title="Reliable Partner"
                  bullets={[
                    "On-time delivery",
                    "Transparent communication",
                    "Zero-fluff approach",
                  ]}
                />
                <Card
                  icon={Users}
                  title="Collaborative Team"
                  bullets={[
                    "Clear communication",
                    "Adaptable to your needs",
                    "Technical & business fluency",
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
                kicker="Salesforce Expertise"
                title="Comprehensive Salesforce Solutions"
                desc="From Sales Cloud to Experience Cloud, we build custom CRM solutions that align with your business processes and drive efficiency."
              />
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <Reveal delay={0.05}>
                <Card
                  icon={Cloud}
                  title="Sales & Service Cloud"
                  desc="Streamline sales pipelines and customer support with custom implementations."
                  bullets={[
                    "Custom sales processes & automation",
                    "Service desk optimization",
                    "Case management workflows",
                    "Territory & quota management",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.1}>
                <Card
                  icon={Globe}
                  title="Experience Cloud"
                  desc="Create self-service portals and branded customer communities."
                  bullets={[
                    "Customer & partner portals",
                    "Self-service knowledge bases",
                    "Community engagement features",
                    "Branded user experiences",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.15}>
                <Card
                  icon={Webhook}
                  title="Third-Party Integrations"
                  desc="Connect Salesforce with your existing business systems."
                  bullets={[
                    "Shopify e-commerce integration",
                    "QuickBooks accounting sync",
                    "Stripe payment processing",
                    "Custom API integrations",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.2}>
                <Card
                  icon={Code2}
                  title="Custom App Development"
                  desc="Build tailored solutions with modern Salesforce technologies."
                  bullets={[
                    "Apex classes & triggers",
                    "Lightning Web Components",
                    "Aura Components",
                    "Custom business logic",
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
                title="Proven Track Record"
                desc="Our work speaks for itself through measurable results and successful implementations."
              />
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <Reveal delay={0.05}>
                <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 mb-4">
                    <Webhook className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">5+</div>
                  <div className="mt-1 text-sm text-zinc-300">System Integrations</div>
                  <p className="mt-3 text-xs text-zinc-400">ERP, payment gateways, and marketing platforms</p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 mb-4">
                    <Zap className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">4+</div>
                  <div className="mt-1 text-sm text-zinc-300">Lightning Apps</div>
                  <p className="mt-3 text-xs text-zinc-400">Replacing manual processes with automation</p>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 mb-4">
                    <Database className="h-6 w-6 text-fuchsia-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">100K+</div>
                  <div className="mt-1 text-sm text-zinc-300">Records Migrated</div>
                  <p className="mt-3 text-xs text-zinc-400">Zero data loss across migrations</p>
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
                title="Comprehensive Technology Stack"
                desc="Expertise across the full Salesforce platform and complementary technologies."
              />
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              <Reveal delay={0.05}>
                <Card
                  icon={Code2}
                  title="Salesforce Technologies"
                  bullets={[
                    "Apex Programming",
                    "Lightning Web Components (LWC)",
                    "Aura Components",
                    "Visualforce Pages",
                    "Salesforce Flows",
                    "Process Builder",
                    "Validation Rules",
                    "Approval Processes",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.1}>
                <Card
                  icon={Database}
                  title="Data & Integration"
                  bullets={[
                    "REST/SOAP APIs",
                    "Data Loader Operations",
                    "ETL Processes",
                    "Custom Integrations",
                    "Real-time Synchronization",
                    "Data Migration",
                    "Business Logic Modeling",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.15}>
                <Card
                  icon={Settings}
                  title="Web & Marketing"
                  bullets={[
                    "JavaScript & PHP",
                    "HTML5 & CSS3",
                    "Shopify Development",
                    "Meta Ads Management",
                    "Marketing Strategy",
                    "ROI Optimization",
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
                title="Diverse Sector Expertise"
                desc="Our Salesforce solutions power businesses across multiple industries, each with unique challenges and requirements."
              />
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Reveal delay={0.05}>
                <Card
                  icon={Home}
                  title="Real Estate"
                  desc="Optimized property management, streamlined transactions, and enhanced customer experiences with integrated technology solutions."
                />
              </Reveal>

              <Reveal delay={0.1}>
                <Card
                  icon={DollarSign}
                  title="Financial & Insurance"
                  desc="Secure, efficient solutions for banking and insurance with a customer-centric approach ensuring compliance and excellence."
                />
              </Reveal>

              <Reveal delay={0.15}>
                <Card
                  icon={Heart}
                  title="Human Services"
                  desc="Revolutionized case management with holistic client support systems, fostering efficiency and promoting social impact."
                />
              </Reveal>

              <Reveal delay={0.2}>
                <Card
                  icon={ShoppingCart}
                  title="Retail & E-Commerce"
                  desc="Enhanced customer engagement, improved inventory management, and elevated operational efficiency for modern retail."
                />
              </Reveal>

              <Reveal delay={0.25}>
                <Card
                  icon={Briefcase}
                  title="Healthcare"
                  desc="Enhanced patient care, streamlined operations, and secure health data management at the intersection of technology and healthcare."
                />
              </Reveal>

              <Reveal delay={0.3}>
                <Card
                  icon={TrendingUp}
                  title="FinTech"
                  desc="Scalable and secure solutions that redefine financial services, from payments to investment platforms."
                />
              </Reveal>

              <Reveal delay={0.35}>
                <Card
                  icon={Leaf}
                  title="GreenTech"
                  desc="Sustainable technology advancements promoting environmental stewardship, energy efficiency, and a greener future."
                />
              </Reveal>

              <Reveal delay={0.4}>
                <Card
                  icon={Wifi}
                  title="Internet of Things"
                  desc="Intelligent ecosystems leveraging interconnected devices for efficiency, automation, and data-driven decision-making."
                />
              </Reveal>

              <Reveal delay={0.45}>
                <Card
                  icon={GraduationCap}
                  title="Education"
                  desc="Digital solutions enhancing learning experiences, streamlining administration, and promoting collaborative education."
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
                    Ready to Transform Your Salesforce Implementation?
                  </h2>
                  <p className="text-lg text-zinc-300 mb-8">
                    Let's discuss how our Salesforce expertise can streamline your business processes, automate workflows, and drive measurable growth.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-zinc-950 hover:opacity-90 transition"
                    >
                      Get Started <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href="/work?filter=salesforce"
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
                    >
                      View Salesforce Projects
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
