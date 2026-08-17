import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useInView } from "framer-motion";
import {
  ArrowRight, ShieldCheck, Target, TrendingUp, Users, Zap, Palette, PenTool,
  Megaphone, MessageSquareText, Layers, BarChart3, Rocket, Lightbulb, FileSearch,
  LayoutGrid, CheckCircle2, ShoppingCart, Home, Briefcase, Globe, Heart, Wifi,
  Leaf, DollarSign, GraduationCap,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import SeoContentFaq from "../../components/SeoContentFaq";
import Container from "../../components/Container";

const cx = (...c) => c.filter(Boolean).join(" ");

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div aria-hidden className="fixed left-0 top-0 z-50 h-0.5 w-full origin-left bg-gradient-to-r from-[#1D4ED8] via-[#23A6E8] to-[#3AC9F5]" style={{ scaleX: scrollYProgress }} />
  );
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
  return (
    <a href={href} onClick={(e) => { if (href?.startsWith?.("#")) { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" }); } }} className={className}>
      {children}
    </a>
  );
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

function StickyNav({ items }) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(`#${e.target.id}`); }), { rootMargin: "-20% 0px -70% 0px" });
    items.forEach(({ href }) => { const el = document.querySelector(href); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [items]);
  return (
    <div className="sticky top-[64px] z-40 border-b border-slate-100 bg-white/95 backdrop-blur-sm shadow-sm">
      <Container className="py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500"><Lightbulb className="h-3.5 w-3.5 text-[#1D4ED8]" />Brand Building</div>
          <div className="flex flex-wrap items-center gap-2">
            {items.map((item) => (
              <AnchorLink key={item.href} href={item.href} className={cx("rounded-full border px-3 py-1.5 text-xs font-medium transition", active === item.href ? "border-[#1D4ED8] bg-[#1D4ED8] text-white" : "border-slate-200 bg-[#F1F4F9] text-slate-600 hover:border-[#1D4ED8]/40 hover:text-[#1D4ED8]")}>
                {item.label}
              </AnchorLink>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

const nav = [
  { label: "Overview", href: "#overview" },
  { label: "Expertise", href: "#expertise" },
  { label: "Process", href: "#process" },
  { label: "Deliverables", href: "#deliverables" },
  { label: "Industries", href: "#industries" },
];

const seoContent = {
  kicker: "Brand Building",
  title: "Brand Building That Supports Ecommerce and Growth",
  subtitle: "We build brand systems, messaging, and visuals that align with performance marketing and conversion.",
  paragraphs: [
    "Our brand building combines positioning, creative systems, and web delivery to create measurable growth.",
    "We support ecommerce, real estate, and service businesses that need trust, clarity, and scalable marketing.",
  ],
  bullets: [
    "Positioning and brand messaging frameworks",
    "Conversion-focused website and landing pages",
    "Creative systems for ads, social, and email",
    "Trust signals, authority content, and proof assets",
  ],
};

const seoFaqs = [
  { q: "What does a brand build include?", a: "Brand strategy, messaging, visual identity, web design, and conversion-ready assets." },
  { q: "Do you build websites with the brand system?", a: "Yes. We deliver the website and marketing assets aligned with the brand." },
  { q: "Can you handle ecommerce brand building?", a: "Yes. We build ecommerce brand systems with product storytelling and conversion focus." },
  { q: "How long does a brand build take?", a: "Most brand builds take 4 to 8 weeks depending on scope and approvals." },
];

export default function BrandBuildingExpertise() {
  return (
    <>
      <Helmet>
        <title>Brand Building - IT Meta Solutions</title>
        <meta name="description" content="Brand building for ecommerce and growth: positioning, identity, conversion-focused websites, and creative systems." />
        <meta name="keywords" content="brand building, brand identity, logo design, brand strategy, brand guidelines, social media branding, website branding, IT Meta Solutions" />
        <meta property="og:title" content="Brand Building - IT Meta Solutions" />
        <meta property="og:description" content="5+ years of brand building: strategy, identity, website + social consistency, and conversion-ready brand systems." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://itmetasolutions.com/brand-building" />
      </Helmet>
      <ScrollProgress />

      {/* HERO */}
      <section className="relative bg-[#141A2E] overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="absolute inset-0 dot-grid-bg opacity-25 pointer-events-none" />
        <div className="absolute -top-32 right-0 w-[600px] h-[500px] rounded-full bg-[#1D4ED8]/10 blur-[120px] pointer-events-none" />
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex flex-wrap gap-2 mb-8">
              {[{ icon: Lightbulb, label: "Strategy" }, { icon: PenTool, label: "Identity" }, { icon: LayoutGrid, label: "Website" }, { icon: Palette, label: "Visual System" }, { icon: Megaphone, label: "Growth" }].map((b) => (
                <span key={b.label} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-slate-300">
                  <b.icon className="h-3.5 w-3.5 text-[#3AC9F5]" />{b.label}
                </span>
              ))}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Brand Building <span className="animated-gradient-text">Expertise</span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-3xl leading-relaxed">
              We build brands that look premium, feel trustworthy, and convert. With <span className="text-white font-semibold">5+ years</span> of experience, we combine strategy, identity, and execution across website + social + ads — so everything matches and scales.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3 max-w-2xl">
              {[{ icon: ShieldCheck, label: "Trust", value: "Credibility-first", color: "#1D4ED8" }, { icon: Target, label: "Clarity", value: "Offer positioning", color: "#23A6E8" }, { icon: TrendingUp, label: "Growth", value: "Conversion system", color: "#3AC9F5" }].map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: `${s.color}30` }}><s.icon className="h-4 w-4" style={{ color: s.color }} /></div>
                    <div><div className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</div><div className="text-xs text-slate-400">{s.label}</div></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">Build My Brand <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/work?filter=branding" className="btn-ghost-dark">View Brand Builds</Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* BANNER */}
      <section className="bg-white py-12">
        <Container>
          <div className="relative h-64 sm:h-80 overflow-hidden rounded-3xl shadow-xl shadow-slate-200">
            <img src="https://images.unsplash.com/photo-1558655146-d09347e92766?w=1400&q=80" alt="Brand Building" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1D4ED8]/60 via-[#141A2E]/30 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8 sm:px-12">
              <div><p className="text-white/80 text-sm font-medium mb-2">From idea to full brand system</p><p className="text-white text-2xl font-bold sm:text-3xl max-w-xs" style={{ fontFamily: "var(--font-heading)" }}>Strategy → Identity → Launch</p></div>
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
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>From Idea → Identity → Full Brand System</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">Brand building isn't only a logo. It's the full system: positioning, messaging, visuals, website structure, social presence, and conversion paths.</p>
          </Reveal>
          <Reveal delay={0.05} className="mb-8">
            <div className="premium-card rounded-2xl p-7">
              <p className="text-slate-700 leading-relaxed">We build brands with a clear "why" and "why choose us" — then translate that into a consistent design system across web, social, ads, and content. This creates trust, improves recognition, and reduces marketing cost because everything feels aligned.</p>
              <p className="mt-4 text-slate-700 leading-relaxed">Perfect for startups launching, businesses rebranding, and companies that want a consistent premium identity.</p>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            <LightCard color="#1D4ED8" icon={ShieldCheck} title="Trust-first" bullets={["Professional look & tone", "Clear proof + credibility cues", "Consistent brand system"]} />
            <LightCard color="#23A6E8" icon={Target} title="Positioning-led" bullets={["Offer clarity", "Audience-specific messaging", "Simple outcomes language"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={Rocket} title="Built to scale" bullets={["Templates & guidelines", "Reusable content formats", "Ready for ads + growth"]} delay={0.1} />
          </div>
        </Container>
      </section>

      {/* EXPERTISE */}
      <section id="expertise" className="scroll-mt-28 bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Brand Building Expertise</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Brand Systems Across Website, Social & Marketing</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">We build and unify everything so your brand feels consistent everywhere your audience meets you.</p>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-2">
            <LightCard color="#1D4ED8" icon={Lightbulb} title="Brand Strategy" desc="The foundation: clarity + differentiation." bullets={["Brand positioning statement", "Audience & intent mapping", "Offer architecture (services/packages)", "Tone of voice"]} />
            <LightCard color="#23A6E8" icon={PenTool} title="Identity Design" desc="A clean, premium look that fits your market." bullets={["Logo concepts & refinements", "Color palette + typography", "Icon/shape style system", "Brand patterns & visual cues"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={LayoutGrid} title="Website as Trust Hub" desc="Conversion-ready structure built for sales/leads." bullets={["Homepage messaging hierarchy", "Service/package pages", "Trust blocks (stats, testimonials)", "Fast CTA paths (WhatsApp, forms)", "SEO-ready structure"]} delay={0.1} />
            <LightCard color="#1D4ED8" icon={Megaphone} title="Launch & Growth Assets" desc="Brand rollout that supports marketing performance." bullets={["Social profile optimization", "Post/story templates", "Ad creative direction (hooks/offers)", "Content pillars & calendar", "Campaign landing pages"]} delay={0.15} />
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            <LightCard color="#23A6E8" icon={MessageSquareText} title="Messaging Kit" bullets={["Taglines & headlines", "Offer/benefit bullets", "FAQ & objection handling", "Short-form script direction"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={BarChart3} title="Performance Mindset" bullets={["Conversion-focused layout", "Creative angles & hooks", "A/B-ready assets", "Analytics foundations"]} delay={0.1} />
            <LightCard color="#1D4ED8" icon={FileSearch} title="SEO Foundation" bullets={["Intent-based pages", "Internal linking structure", "Metadata guidelines", "Content growth plan"]} delay={0.15} />
          </div>
        </Container>
      </section>

      {/* PROCESS */}
      <section id="process" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Process</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>A Clean Brand-Build Workflow (Fast + Reliable)</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">We keep it simple: discovery → direction → design → rollout. You always know what's next.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            <LightCard color="#1D4ED8" icon={Users} title="1) Discovery" desc="We understand the business, market, and goals." bullets={["Audience & competitor review", "Offer clarity + packages/services", "Brand vibe references", "Content & channel plan"]} />
            <LightCard color="#23A6E8" icon={Lightbulb} title="2) Brand Direction" desc="We decide what the brand should feel like." bullets={["Positioning + messaging", "Moodboard + style direction", "Color & typography direction", "Content pillars"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={Palette} title="3) Design System" desc="Identity & templates built for consistency." bullets={["Logo + refinements", "Brand patterns/icons", "Post/story templates", "Guidelines (usage rules)"]} delay={0.1} />
            <LightCard color="#1D4ED8" icon={Rocket} title="4) Rollout" desc="Launch website + social + campaign assets." bullets={["Website + landing pages", "Social profile optimization", "Launch content set", "Ad creatives direction"]} delay={0.15} />
          </div>
          <Reveal delay={0.15} className="mt-8">
            <div className="premium-card rounded-2xl p-7">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>Featured Brand Build — Ekommart</p>
                  <p className="mt-1 text-sm text-slate-600">Complete e-commerce brand built from scratch: WordPress store, brand identity, social media presence, and performance marketing generating 3,300+ purchases in 5 months.</p>
                </div>
                <Link to="/case-study/ekommart" className="btn-primary flex-shrink-0">View Case Study <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* DELIVERABLES */}
      <section id="deliverables" className="scroll-mt-28 bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Deliverables</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Everything Bundled into a Consistent Brand System</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">Pick what you need: complete brand build or modular deliverables.</p>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-3">
            <LightCard color="#1D4ED8" icon={PenTool} title="Identity Pack" bullets={["Logo suite (main + icon)", "Color palette + typography", "Icons/patterns", "Brand guidelines PDF"]} />
            <LightCard color="#23A6E8" icon={LayoutGrid} title="Website Pack" bullets={["Homepage + key pages", "Service/package templates", "Trust modules", "WhatsApp/forms conversion paths", "SEO-ready structure"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={Layers} title="Social & Marketing Pack" bullets={["Profile optimization", "Post/story templates", "Content pillars + calendar", "Ad creative direction", "Launch content set"]} delay={0.1} />
          </div>
        </Container>
      </section>

      {/* INDUSTRIES */}
      <section id="industries" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Industries We Serve</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Brand Building for Growth-Focused Businesses</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">We've built brands across multiple industries — especially where trust and clarity matter.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: ShoppingCart, color: "#1D4ED8", title: "E-Commerce", desc: "Premium identity + product storytelling + conversion web." },
              { icon: Home, color: "#23A6E8", title: "Real Estate", desc: "Trust-first brand + listings UX + lead generation structure." },
              { icon: Briefcase, color: "#3AC9F5", title: "Agencies & Services", desc: "Positioning-led branding + portfolio + consultation flow." },
              { icon: Globe, color: "#1D4ED8", title: "Travel & Tourism", desc: "Brand identity + packages architecture + WhatsApp conversions." },
              { icon: Heart, color: "#23A6E8", title: "Healthcare & Wellness", desc: "Clean, credible brand system + educational content design." },
              { icon: Wifi, color: "#3AC9F5", title: "Technology & SaaS", desc: "Modern brand system + product messaging + landing pages." },
              { icon: Leaf, color: "#1D4ED8", title: "Organic / Natural Brands", desc: "Premium packaging-ready branding + story-led content." },
              { icon: DollarSign, color: "#23A6E8", title: "Finance & Insurance", desc: "Authority-first brand + clarity messaging + trust modules." },
              { icon: GraduationCap, color: "#3AC9F5", title: "Education", desc: "Brand system + course funnel + content strategy templates." },
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
              <span className="kicker" style={{ borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.07)", color: "#93c5fd" }}>Start Your Brand Build</span>
              <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Ready to Build a Complete Brand System?</h2>
              <p className="mt-5 text-lg text-slate-400 max-w-xl mx-auto">We'll create strategy + identity + website + templates — so your brand looks premium and grows consistently.</p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link to="/contact" className="btn-primary">Start Brand Build <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/work?filter=branding" className="btn-ghost-dark">View Case Studies</Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
