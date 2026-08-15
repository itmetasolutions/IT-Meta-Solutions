import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useInView } from "framer-motion";
import {
  ArrowRight, Cloud, Code2, Database, Globe, Settings, ShieldCheck, Target,
  TrendingUp, Users, Webhook, Zap, GraduationCap, Heart, ShoppingCart,
  DollarSign, Leaf, Wifi, Home, Briefcase, CheckCircle2,
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
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500"><Cloud className="h-3.5 w-3.5 text-[#1D4ED8]" />Salesforce</div>
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
  { label: "Expertise", href: "#expertise" },
  { label: "Achievements", href: "#achievements" },
  { label: "Skills", href: "#skills" },
  { label: "Industries", href: "#industries" },
];

const seoContent = {
  kicker: "Salesforce Expertise",
  title: "Salesforce Implementation Partners for LWC and Experience Cloud",
  subtitle: "We design, build, and optimize Salesforce solutions with LWC development services, Experience Cloud portals, and automation.",
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
  { q: "Do you offer Salesforce LWC development services?", a: "Yes. We build custom Lightning Web Components for tailored UI, productivity, and integrations." },
  { q: "Can you build Experience Cloud portals?", a: "Yes. We design Experience Cloud portals for self-service, partner access, and customer onboarding." },
  { q: "Do you handle CRM data cleaning?", a: "Yes. We clean Salesforce data, resolve duplicates, and improve reporting accuracy." },
  { q: "Can I hire Salesforce developers for integration work only?", a: "Yes. We can support dedicated development for integrations and automation." },
];

export default function SalesforceExpertisePage() {
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
      <ScrollProgress />

      {/* HERO */}
      <section className="relative bg-[#141A2E] overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="absolute inset-0 dot-grid-bg opacity-25 pointer-events-none" />
        <div className="absolute -top-32 right-0 w-[600px] h-[500px] rounded-full bg-[#1D4ED8]/10 blur-[120px] pointer-events-none" />
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex flex-wrap gap-2 mb-8">
              {[{ icon: Cloud, label: "Salesforce Development" }, { icon: Code2, label: "Custom Solutions" }, { icon: Webhook, label: "Integrations" }, { icon: Zap, label: "Automation" }].map((b) => (
                <span key={b.label} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-slate-300"><b.icon className="h-3.5 w-3.5 text-[#3AC9F5]" />{b.label}</span>
              ))}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Salesforce Development <span className="animated-gradient-text">Expertise</span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-3xl leading-relaxed">IT Meta Solutions brings <span className="text-white font-semibold">5+ years</span> of experience creating custom Salesforce solutions that help businesses streamline operations, optimize processes, and drive growth. We combine technical excellence with deep business understanding to deliver results-driven CRM implementations.</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3 max-w-2xl">
              {[{ icon: Cloud, label: "Years of Experience", value: "5+", color: "#1D4ED8" }, { icon: Webhook, label: "Integrations Built", value: "5+", color: "#23A6E8" }, { icon: Zap, label: "Lightning Apps", value: "4+", color: "#3AC9F5" }].map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: `${s.color}30` }}><s.icon className="h-4 w-4" style={{ color: s.color }} /></div>
                    <div><div className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</div><div className="text-xs text-slate-400">{s.label}</div></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">Get Started <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/work?filter=salesforce" className="btn-ghost-dark">View Salesforce Projects</Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* BANNER */}
      <section className="bg-white py-12">
        <Container>
          <div className="relative h-64 sm:h-80 overflow-hidden rounded-3xl shadow-xl shadow-slate-200">
            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80" alt="Salesforce Development" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1D4ED8]/60 via-[#141A2E]/30 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8 sm:px-12">
              <div><p className="text-white/80 text-sm font-medium mb-2">Technical excellence meets business impact</p><p className="text-white text-2xl font-bold sm:text-3xl max-w-xs" style={{ fontFamily: "var(--font-heading)" }}>CRM solutions that scale with you</p></div>
            </div>
          </div>
        </Container>
      </section>

      <StickyNav items={nav} />

      {/* OVERVIEW */}
      <section id="overview" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mb-10">
            <span className="kicker">Company Overview</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Technical Excellence Meets Business Impact</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">We specialize in Salesforce development alongside web development and digital marketing, creating comprehensive solutions that drive real business results.</p>
          </Reveal>
          <Reveal delay={0.05} className="mb-8">
            <div className="premium-card rounded-2xl p-7">
              <p className="text-slate-700 leading-relaxed">IT Meta Solutions is a full-service technology partner specializing in Salesforce development, custom web applications, and performance-driven digital marketing. Our team combines technical expertise with strategic thinking to deliver solutions that streamline processes, reduce manual work, and boost productivity.</p>
              <p className="mt-4 text-slate-700 leading-relaxed">We're known for being reliable problem-solvers who prioritize outcomes over output. Every customization, automation, or integration we implement is designed with one goal: helping your business grow faster and work smarter.</p>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            <LightCard color="#1D4ED8" icon={Target} title="Results-Oriented" bullets={["Outcomes over output", "Measurable business impact", "ROI-focused implementations"]} />
            <LightCard color="#23A6E8" icon={ShieldCheck} title="Reliable Partner" bullets={["On-time delivery", "Transparent communication", "Zero-fluff approach"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={Users} title="Collaborative Team" bullets={["Clear communication", "Adaptable to your needs", "Technical & business fluency"]} delay={0.1} />
          </div>
        </Container>
      </section>

      {/* EXPERTISE */}
      <section id="expertise" className="scroll-mt-28 bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Salesforce Expertise</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Comprehensive Salesforce Solutions</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">From Sales Cloud to Experience Cloud, we build custom CRM solutions that align with your business processes and drive efficiency.</p>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-2">
            <LightCard color="#1D4ED8" icon={Cloud} title="Sales & Service Cloud" desc="Streamline sales pipelines and customer support with custom implementations." bullets={["Custom sales processes & automation", "Service desk optimization", "Case management workflows", "Territory & quota management"]} />
            <LightCard color="#23A6E8" icon={Globe} title="Experience Cloud" desc="Create self-service portals and branded customer communities." bullets={["Customer & partner portals", "Self-service knowledge bases", "Community engagement features", "Branded user experiences"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={Webhook} title="Third-Party Integrations" desc="Connect Salesforce with your existing business systems." bullets={["Shopify e-commerce integration", "QuickBooks accounting sync", "Stripe payment processing", "Custom API integrations"]} delay={0.1} />
            <LightCard color="#1D4ED8" icon={Code2} title="Custom App Development" desc="Build tailored solutions with modern Salesforce technologies." bullets={["Apex classes & triggers", "Lightning Web Components", "Aura Components", "Custom business logic"]} delay={0.15} />
          </div>
        </Container>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Key Achievements</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Proven Track Record</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">Our work speaks for itself through measurable results and successful implementations.</p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Webhook, value: "5+", label: "System Integrations", desc: "ERP, payment gateways, and marketing platforms", color: "#1D4ED8" },
              { icon: Zap, value: "4+", label: "Lightning Apps", desc: "Replacing manual processes with automation", color: "#23A6E8" },
              { icon: Database, value: "100K+", label: "Records Migrated", desc: "Zero data loss across migrations", color: "#3AC9F5" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.07}>
                <div className="premium-card rounded-2xl p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl mb-4" style={{ backgroundColor: `${s.color}15` }}><s.icon className="h-6 w-6" style={{ color: s.color }} /></div>
                  <div className="text-4xl font-black mb-1" style={{ fontFamily: "var(--font-heading)", color: s.color }}>{s.value}</div>
                  <div className="text-base font-bold text-slate-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>{s.label}</div>
                  <p className="text-sm text-slate-500">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* SKILLS */}
      <section id="skills" className="scroll-mt-28 bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Technical Skills</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Comprehensive Technology Stack</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">Expertise across the full Salesforce platform and complementary technologies.</p>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-3">
            <LightCard color="#1D4ED8" icon={Code2} title="Salesforce Technologies" bullets={["Apex Programming", "Lightning Web Components (LWC)", "Aura Components", "Visualforce Pages", "Salesforce Flows", "Process Builder", "Validation Rules", "Approval Processes"]} />
            <LightCard color="#23A6E8" icon={Database} title="Data & Integration" bullets={["REST/SOAP APIs", "Data Loader Operations", "ETL Processes", "Custom Integrations", "Real-time Synchronization", "Data Migration", "Business Logic Modeling"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={Settings} title="Web & Marketing" bullets={["JavaScript & PHP", "HTML5 & CSS3", "Shopify Development", "Meta Ads Management", "Marketing Strategy", "ROI Optimization"]} delay={0.1} />
          </div>
        </Container>
      </section>

      {/* INDUSTRIES */}
      <section id="industries" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Industries We Serve</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Diverse Sector Expertise</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">Our Salesforce solutions power businesses across multiple industries, each with unique challenges and requirements.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Home, color: "#1D4ED8", title: "Real Estate", desc: "Optimized property management, streamlined transactions, and enhanced customer experiences." },
              { icon: DollarSign, color: "#23A6E8", title: "Financial & Insurance", desc: "Secure, efficient solutions for banking and insurance with compliance-first approach." },
              { icon: Heart, color: "#3AC9F5", title: "Human Services", desc: "Revolutionized case management with holistic client support systems and social impact." },
              { icon: ShoppingCart, color: "#1D4ED8", title: "Retail & E-Commerce", desc: "Enhanced customer engagement, improved inventory management, and operational efficiency." },
              { icon: Briefcase, color: "#23A6E8", title: "Healthcare", desc: "Enhanced patient care, streamlined operations, and secure health data management." },
              { icon: TrendingUp, color: "#3AC9F5", title: "FinTech", desc: "Scalable and secure solutions that redefine financial services, from payments to investments." },
              { icon: Leaf, color: "#1D4ED8", title: "GreenTech", desc: "Sustainable technology advancements promoting environmental stewardship and efficiency." },
              { icon: Wifi, color: "#23A6E8", title: "Internet of Things", desc: "Intelligent ecosystems leveraging interconnected devices for automation and data-driven decisions." },
              { icon: GraduationCap, color: "#3AC9F5", title: "Education", desc: "Digital solutions enhancing learning experiences, streamlining administration, and collaboration." },
            ].map((c, i) => <LightCard key={c.title} color={c.color} icon={c.icon} title={c.title} desc={c.desc} delay={(i % 3) * 0.07} />)}
          </div>
        </Container>
      </section>

      <div className="bg-[#F1F4F9]"><SeoContentFaq content={seoContent} faqs={seoFaqs} lightTheme={true} /></div>

      {/* CTA */}
      <section className="bg-[#141A2E] py-20 sm:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="kicker" style={{ borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.07)", color: "#93c5fd" }}>Transform Your CRM</span>
              <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Ready to Transform Your Salesforce Implementation?</h2>
              <p className="mt-5 text-lg text-slate-400 max-w-xl mx-auto">Let's discuss how our Salesforce expertise can streamline your business processes, automate workflows, and drive measurable growth.</p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link to="/contact" className="btn-primary">Get Started <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/work?filter=salesforce" className="btn-ghost-dark">View Salesforce Projects</Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
