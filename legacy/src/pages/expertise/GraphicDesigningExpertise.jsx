import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useInView } from "framer-motion";
import {
  ArrowRight, ShieldCheck, Target, TrendingUp, Zap, LayoutGrid, Megaphone,
  BarChart3, PenTool, Images, Palette, Type, Layers, Package, Sticker, Shirt,
  BookOpen, Layout, CheckCircle2, Globe, Home, Briefcase, ShoppingCart,
  GraduationCap, Heart, DollarSign, Leaf, Wifi,
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
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500"><Palette className="h-3.5 w-3.5 text-[#1D4ED8]" />Graphic Design</div>
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
  { label: "Design Systems", href: "#systems" },
  { label: "Skills", href: "#skills" },
  { label: "Industries", href: "#industries" },
];

const seoContent = {
  kicker: "Graphic Design",
  title: "Branding and Creative Systems Built to Convert",
  subtitle: "We design brand identities, ad creatives, and social visuals that align with performance marketing.",
  paragraphs: [
    "Our graphic design team creates conversion-ready assets for ecommerce, real estate, and service brands.",
    "We build consistent visual systems that improve trust and scale across ads, social, and web.",
  ],
  bullets: [
    "Brand identity systems and logo design",
    "Ad creative for Meta Ads performance",
    "Social media templates and product visuals",
    "Packaging and print-ready design assets",
  ],
};

const seoFaqs = [
  { q: "Do you create ad creatives for Meta Ads?", a: "Yes. We design performance-focused creatives for scaling Meta Ads campaigns." },
  { q: "Can you design complete brand identity systems?", a: "Yes. We deliver logo, color, typography, and brand guideline systems." },
  { q: "Do you provide social media templates?", a: "Yes. We build reusable templates for reels, stories, and posts." },
  { q: "Can you support ecommerce packaging?", a: "Yes. We design packaging and product visuals for ecommerce brands." },
];

export default function GraphicDesigningPage() {
  return (
    <>
      <Helmet>
        <title>Graphic Designing - IT Meta Solutions</title>
        <meta name="description" content="Graphic design for branding, Meta Ads creatives, social templates, and ecommerce-ready packaging systems." />
        <meta name="keywords" content="graphic design, brand identity, social media design, packaging design, logo design, marketing creatives, thumbnails, IT Meta Solutions" />
        <meta property="og:title" content="Graphic Designing - IT Meta Solutions" />
        <meta property="og:description" content="5+ years of graphic design: brand identity, social creatives, packaging, and conversion-ready marketing visuals." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://itmetasolutions.com/graphic-designing" />
      </Helmet>
      <ScrollProgress />

      {/* HERO */}
      <section className="relative bg-[#141A2E] overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="absolute inset-0 dot-grid-bg opacity-25 pointer-events-none" />
        <div className="absolute -top-32 right-0 w-[600px] h-[500px] rounded-full bg-[#1D4ED8]/10 blur-[120px] pointer-events-none" />
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex flex-wrap gap-2 mb-8">
              {[{ icon: Palette, label: "Brand Identity" }, { icon: Images, label: "Social Creatives" }, { icon: Package, label: "Packaging" }, { icon: Layers, label: "Design Systems" }, { icon: Zap, label: "Conversion Visuals" }].map((b) => (
                <span key={b.label} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-slate-300"><b.icon className="h-3.5 w-3.5 text-[#3AC9F5]" />{b.label}</span>
              ))}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Graphic Design <span className="animated-gradient-text">Expertise</span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-3xl leading-relaxed">We design visuals that make brands look premium and sell better. With <span className="text-white font-semibold">5+ years</span> of experience, we create brand systems, social media designs, packaging, and marketing assets that stay consistent across every platform.</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3 max-w-2xl">
              {[{ icon: Palette, label: "Consistency", value: "Brand System", color: "#1D4ED8" }, { icon: Images, label: "Output", value: "Ads + Social", color: "#23A6E8" }, { icon: TrendingUp, label: "Goal", value: "More Conversion", color: "#3AC9F5" }].map((s) => (
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
              <Link to="/work?filter=design" className="btn-ghost-dark">View Design Work</Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* BANNER */}
      <section className="bg-white py-12">
        <Container>
          <div className="relative h-64 sm:h-80 overflow-hidden rounded-3xl shadow-xl shadow-slate-200">
            <img src="https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=1400&q=80" alt="Graphic Design" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1D4ED8]/60 via-[#141A2E]/30 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8 sm:px-12">
              <div><p className="text-white/80 text-sm font-medium mb-2">Consistent, premium design</p><p className="text-white text-2xl font-bold sm:text-3xl max-w-xs" style={{ fontFamily: "var(--font-heading)" }}>Visuals that build trust &amp; convert</p></div>
            </div>
          </div>
        </Container>
      </section>

      <StickyNav items={nav} />

      {/* OVERVIEW */}
      <section id="overview" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mb-10">
            <span className="kicker">Overview</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Design That Builds Trust and Improves Conversion</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">We don't just make "pretty posts." We build a design system that stays consistent, supports your marketing message, and makes people trust your brand at first glance.</p>
          </Reveal>
          <Reveal delay={0.05} className="mb-8">
            <div className="premium-card rounded-2xl p-7">
              <p className="text-slate-700 leading-relaxed">Most brands fail visually because every post looks different. We fix that with templates, typography rules, color palettes, and layout systems — then apply them across social, ads, websites, and packaging.</p>
              <p className="mt-4 text-slate-700 leading-relaxed">You get a professional look, faster production, and better results because the brand becomes recognizable.</p>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            <LightCard color="#1D4ED8" icon={ShieldCheck} title="Trust-first Visuals" bullets={["Clean hierarchy & spacing", "Premium layout feel", "Clear offer communication"]} />
            <LightCard color="#23A6E8" icon={Target} title="Marketing-ready" bullets={["Ad creative templates", "Offer-led designs", "CTA-focused layout systems"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={Zap} title="Fast Production" bullets={["Reusable templates", "Consistent components", "Easy monthly output"]} delay={0.1} />
          </div>
        </Container>
      </section>

      {/* EXPERTISE */}
      <section id="expertise" className="scroll-mt-28 bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Expertise</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Everything Your Brand Needs — Designed Properly</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">From identity to social to packaging — we design assets that match the platform and the buyer's mindset.</p>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-2">
            <LightCard color="#1D4ED8" icon={Palette} title="Brand Identity" desc="A consistent identity system that works everywhere." bullets={["Logo (primary + variations)", "Color palette + typography", "Brand patterns & icons", "Brand guide (usage rules)"]} />
            <LightCard color="#23A6E8" icon={Images} title="Social Media Design" desc="Templates and creatives built for reach + conversion." bullets={["Post templates (feed)", "Story templates", "Carousel layouts", "Reels cover designs", "Highlight covers"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={Megaphone} title="Ads Creative Design" desc="Conversion-first creatives that support paid campaigns." bullets={["Offer creatives (static)", "Before/after & proof layouts", "Retargeting creatives", "WhatsApp/lead form creatives"]} delay={0.1} />
            <LightCard color="#1D4ED8" icon={Package} title="Packaging & Labels" desc="Product packaging designed for trust, shelf appeal, and compliance." bullets={["Label systems (jars/boxes)", "Ingredient + benefit layouts", "Barcode + batch space planning", "Print-ready exports"]} delay={0.15} />
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            <LightCard color="#23A6E8" icon={Layout} title="Website Visuals" desc="UI visuals that make websites look premium." bullets={["Hero banners", "Icons & illustrations", "Section graphics", "Trust badges"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={Sticker} title="Print & Marketing" desc="Offline designs that match the brand." bullets={["Flyers", "Brochures", "Standee/banners", "Business cards"]} delay={0.1} />
            <LightCard color="#1D4ED8" icon={Shirt} title="Merch / Branding" desc="Brand assets applied across physical touchpoints." bullets={["T-shirt mockups", "Stickers", "Packaging inserts", "Uniform branding"]} delay={0.15} />
          </div>
        </Container>
      </section>

      {/* DESIGN SYSTEMS */}
      <section id="systems" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Design Systems</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>A Reusable Template System for Consistent Output</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">We create a library of components so your brand stays consistent and content production becomes easy.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 mb-8">
            <LightCard color="#1D4ED8" icon={Layers} title="Template Library" desc="Reusable layouts for fast daily/weekly posting." bullets={["Post templates (offers, proof, education)", "Story templates (poll, FAQ, CTA)", "Carousel grid system", "Reels cover system"]} />
            <LightCard color="#23A6E8" icon={Type} title="Typography + Layout Rules" desc="Rules that keep everything looking premium." bullets={["Font hierarchy (H1/H2/body)", "Spacing & grid rules", "CTA placement standards", "Consistent icon style"]} delay={0.05} />
          </div>
          <Reveal delay={0.1}>
            <div className="premium-card rounded-2xl p-7">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>Outcome: Systemized Design</p>
                  <p className="mt-1 text-sm text-slate-600">Consistency + speed. Your brand becomes recognizable, content production becomes easier, and ads look more professional.</p>
                </div>
                <CheckCircle2 className="h-8 w-8 flex-shrink-0 text-[#1D4ED8]" />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* SKILLS */}
      <section id="skills" className="scroll-mt-28 bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Skills</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Design Skills That Support Marketing</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">Visual design + marketing thinking — so everything looks good AND sells.</p>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-3">
            <LightCard color="#1D4ED8" icon={PenTool} title="Creative Execution" bullets={["Premium typography", "Modern layout composition", "Image selection & treatment", "Iconography & visual language", "Mockups & presentation"]} />
            <LightCard color="#23A6E8" icon={Target} title="Conversion-first Design" bullets={["Offer clarity hierarchy", "Proof & trust layouts", "CTA placement standards", "Ad creative variants", "Platform-specific formats"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={BarChart3} title="Marketing Alignment" bullets={["Content pillars visuals", "Campaign creative sets", "Seasonal launches", "Brand consistency across channels", "Creative testing mindset"]} delay={0.1} />
          </div>
        </Container>
      </section>

      {/* INDUSTRIES */}
      <section id="industries" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Industries We Serve</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Design for Brands That Need Trust + Premium Visuals</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">We design for industries where visuals directly impact credibility and conversion.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: ShoppingCart, color: "#1D4ED8", title: "E-Commerce", desc: "Product creatives, offers, UGC layouts, packaging support." },
              { icon: Globe, color: "#23A6E8", title: "Travel & Tourism", desc: "Package creatives, highlights structure, story CTAs, trust posts." },
              { icon: Home, color: "#3AC9F5", title: "Real Estate", desc: "Property creatives, listing posts, inquiry flows, brochure design." },
              { icon: Briefcase, color: "#1D4ED8", title: "Agencies & Services", desc: "Credibility visuals, case studies, offer-led ads, branding." },
              { icon: Heart, color: "#23A6E8", title: "Healthcare & Wellness", desc: "Educational trust content, safe visuals, premium identity." },
              { icon: Wifi, color: "#3AC9F5", title: "Tech & SaaS", desc: "Product graphics, feature layouts, presentation decks, icons." },
              { icon: Leaf, color: "#1D4ED8", title: "Organic / Natural Brands", desc: "Premium earthy identity, label systems, clean benefit visuals." },
              { icon: DollarSign, color: "#23A6E8", title: "Finance & Insurance", desc: "Trust-first layouts, compliance-friendly clarity, premium tone." },
              { icon: GraduationCap, color: "#3AC9F5", title: "Education", desc: "Course creatives, enrollment posts, brochures, landing assets." },
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
              <span className="kicker" style={{ borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.07)", color: "#93c5fd" }}>Premium Creatives</span>
              <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Need Premium Creatives for Your Brand?</h2>
              <p className="mt-5 text-lg text-slate-400 max-w-xl mx-auto">Let's build a consistent design system + marketing creatives that match your brand and convert better.</p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link to="/contact" className="btn-primary">Get Started <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/work?filter=design" className="btn-ghost-dark">View Design Work</Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
