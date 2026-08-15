import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useInView } from "framer-motion";
import {
  ArrowRight, ShieldCheck, Target, TrendingUp, Zap, LayoutGrid, MessageSquareText,
  BarChart3, PenTool, Images, LineChart, CalendarDays, ScrollText, MousePointerClick,
  CheckCircle2, Globe, Home, Briefcase, ShoppingCart, GraduationCap, Heart,
  DollarSign, Leaf, Wifi, Instagram, Phone,
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
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500"><Instagram className="h-3.5 w-3.5 text-[#1D4ED8]" />Social Media</div>
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
  { label: "Deliverables", href: "#deliverables" },
  { label: "Process", href: "#process" },
  { label: "Skills", href: "#skills" },
  { label: "Industries", href: "#industries" },
];

const seoContent = {
  kicker: "Social Media",
  title: "Social Media Systems that Support Paid Growth",
  subtitle: "We build social media growth strategies that align with Meta Ads, improve trust, and drive inquiries.",
  paragraphs: [
    "Our approach combines content pillars, brand consistency, and conversion paths that support performance marketing.",
    "We help ecommerce and service brands scale engagement while improving lead quality.",
  ],
  bullets: [
    "Social media growth strategies aligned with Meta Ads",
    "Content pillars, reels, and story systems that convert",
    "Brand building for ecommerce startups and local services",
    "Data-driven content calendars and reporting",
  ],
};

const seoFaqs = [
  { q: "Do you align organic content with Meta Ads?", a: "Yes. We align content pillars with paid campaigns to improve trust and conversion." },
  { q: "Can you manage Instagram and Facebook content?", a: "Yes. We manage IG/FB content calendars, reels, and story systems." },
  { q: "Do you provide reporting?", a: "Yes. We share engagement, reach, and conversion insights monthly." },
  { q: "Can you support ecommerce brands?", a: "Absolutely. We build product-led content that supports performance marketing." },
];

export default function SocialMediaManagementPage() {
  return (
    <>
      <Helmet>
        <title>Social Media Management - IT Meta Solutions</title>
        <meta name="description" content="Social media growth strategies aligned with Meta Ads, content pillars, and conversion-focused engagement." />
        <meta name="keywords" content="social media management, instagram management, facebook management, content planning, content pillars, brand identity, reels, stories, highlights, IT Meta Solutions" />
        <meta property="og:title" content="Social Media Management - IT Meta Solutions" />
        <meta property="og:description" content="5+ years of social media management: IG/FB optimization, content pillars, consistent identity, and conversion-ready content aligned with ads." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://itmetasolutions.com/social-media-management" />
      </Helmet>
      <ScrollProgress />

      {/* HERO */}
      <section className="relative bg-[#141A2E] overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="absolute inset-0 dot-grid-bg opacity-25 pointer-events-none" />
        <div className="absolute -top-32 right-0 w-[600px] h-[500px] rounded-full bg-[#1D4ED8]/10 blur-[120px] pointer-events-none" />
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex flex-wrap gap-2 mb-8">
              {[{ icon: Instagram, label: "Instagram" }, { icon: CalendarDays, label: "Content Planning" }, { icon: PenTool, label: "Creative Direction" }, { icon: Phone, label: "WhatsApp-first" }, { icon: MousePointerClick, label: "Conversion Paths" }].map((b) => (
                <span key={b.label} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-slate-300"><b.icon className="h-3.5 w-3.5 text-[#3AC9F5]" />{b.label}</span>
              ))}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Social Media <span className="animated-gradient-text">Management</span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-3xl leading-relaxed">We manage social media like a conversion system — not just "posting." With <span className="text-white font-semibold">5+ years</span> of experience, we build a consistent brand identity, define content pillars, and align organic content with paid campaigns to warm audiences and improve results.</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3 max-w-2xl">
              {[{ icon: ShieldCheck, label: "Identity", value: "Consistent", color: "#1D4ED8" }, { icon: MessageSquareText, label: "Messaging", value: "Trust-first", color: "#23A6E8" }, { icon: MousePointerClick, label: "Outcome", value: "More inquiries", color: "#3AC9F5" }].map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: `${s.color}30` }}><s.icon className="h-4 w-4" style={{ color: s.color }} /></div>
                    <div><div className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</div><div className="text-xs text-slate-400">{s.label}</div></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">Start Now <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/work?filter=social" className="btn-ghost-dark">View Social Work</Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* BANNER */}
      <section className="bg-white py-12">
        <Container>
          <div className="relative h-64 sm:h-80 overflow-hidden rounded-3xl shadow-xl shadow-slate-200">
            <img src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1400&q=80" alt="Social Media Management" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1D4ED8]/60 via-[#141A2E]/30 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8 sm:px-12">
              <div><p className="text-white/80 text-sm font-medium mb-2">Consistent content that builds trust</p><p className="text-white text-2xl font-bold sm:text-3xl max-w-xs" style={{ fontFamily: "var(--font-heading)" }}>Social as a conversion system</p></div>
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
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Consistent Content That Builds Trust and Conversions</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">We optimize profiles, define content pillars, and create a repeatable posting system across Instagram & Facebook — so your brand looks professional, stays consistent, and converts warmer traffic into leads.</p>
          </Reveal>
          <Reveal delay={0.05} className="mb-8">
            <div className="premium-card rounded-2xl p-7">
              <p className="text-slate-700 leading-relaxed">Most businesses lose leads because social feels random: inconsistent visuals, unclear offers, and no "next step." We fix that with structure — profile optimization, a content plan, and clear CTAs (WhatsApp / forms / calls).</p>
              <p className="mt-4 text-slate-700 leading-relaxed">For niche brands (like Islamic travel), we also maintain a respectful tone and audience-safe visuals — using an Urdu + English mix when needed.</p>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            <LightCard color="#1D4ED8" icon={LayoutGrid} title="Profile Optimization" bullets={["Bio + category + trust-first positioning", "Contact buttons (WhatsApp / call)", "Highlight covers + highlight structure", "Pinned posts that explain the offer"]} />
            <LightCard color="#23A6E8" icon={CalendarDays} title="Content Pillars" bullets={["Offers / packages / services", "Educational posts (build authority)", "Proof & testimonials (trust)", "Behind-the-scenes / process (human)"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={MousePointerClick} title="Conversion Paths" bullets={["CTA rules for every post", "Story + highlight navigation", "WhatsApp-first conversion flow", "Organic → paid retargeting synergy"]} delay={0.1} />
          </div>
        </Container>
      </section>

      {/* DELIVERABLES */}
      <section id="deliverables" className="scroll-mt-28 bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Deliverables</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>What We Manage for You</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">Everything needed to keep your social presence active, consistent, and conversion-ready.</p>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-2">
            <LightCard color="#1D4ED8" icon={PenTool} title="Creative Direction" desc="A clean design system so your brand looks premium and recognizable." bullets={["Brand colors + typography + layout style", "Post templates (feed + story)", "Visual rules for consistency", "Industry-safe creative guidelines"]} />
            <LightCard color="#23A6E8" icon={MessageSquareText} title="Copywriting & Captions" desc="Messaging that's easy to understand and built to convert." bullets={["Short + scannable captions", "Offer clarity + FAQs", "Urdu + English mix (if required)", "CTA structures for leads"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={Images} title="Content Production Plan" desc="A repeatable system for posts, reels, and stories." bullets={["Monthly content calendar", "Reels ideas (hooks + scripts)", "Story sequences (polls, Q&A, CTAs)", "Highlight planning + covers"]} delay={0.1} />
            <LightCard color="#1D4ED8" icon={BarChart3} title="Reporting & Optimization" desc="Review what worked and improve the next month." bullets={["Top content review", "Engagement & reach trends", "CTA clicks / WhatsApp intents", "Next month improvement plan"]} delay={0.15} />
          </div>
          <Reveal delay={0.15} className="mt-8">
            <div className="premium-card rounded-2xl p-7">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Optional add-ons</p>
                  <p className="mt-1 text-sm text-slate-600">Comment/reply management, influencer collaborations, UGC planning, and paid boost strategy for top-performing posts.</p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-[#1D4ED8] flex-shrink-0"><CheckCircle2 className="h-4 w-4" />Upgrade anytime</span>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* PROCESS */}
      <section id="process" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Process</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>A Simple Monthly Workflow</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">Clear steps so you always know what's happening, what's publishing, and what results we're improving.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <LightCard color="#1D4ED8" icon={Target} title="1) Strategy" desc="We confirm offer + audience + tone." bullets={["Goals + KPIs", "Target audience", "Content pillars", "CTA rules"]} />
            <LightCard color="#23A6E8" icon={PenTool} title="2) Create" desc="Templates, creatives, captions." bullets={["Design system", "Posts + stories", "Reels plan", "Approval flow"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={CalendarDays} title="3) Publish" desc="Scheduled posting + stories." bullets={["Weekly schedule", "Highlights updates", "Story sequences", "CTA placements"]} delay={0.1} />
            <LightCard color="#1D4ED8" icon={LineChart} title="4) Improve" desc="Review & optimize next month." bullets={["Top posts analysis", "Engagement review", "CTR/intent review", "New tests"]} delay={0.15} />
          </div>
          <Reveal delay={0.15} className="mt-8">
            <div className="premium-card rounded-2xl p-7">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>Featured Social Media Build — Ekommart</p>
                  <p className="mt-1 text-sm text-slate-600">Built Facebook & Instagram presence from scratch with trust-driven creatives, offer-led messaging, and performance-focused content driving 3,300+ purchases.</p>
                </div>
                <Link to="/case-study/ekommart" className="btn-primary flex-shrink-0">View Case Study <ArrowRight className="h-4 w-4" /></Link>
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
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Everything Needed to Run Social Properly</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">Design, copy, content planning, conversion paths, and reporting — built into one management system.</p>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-3">
            <LightCard color="#1D4ED8" icon={Instagram} title="Platform Expertise" bullets={["Instagram feed + reels + stories", "Facebook page management", "Highlights structure & covers", "Profile optimization", "Cross-posting best practices"]} />
            <LightCard color="#23A6E8" icon={ScrollText} title="Content Strategy" bullets={["Content pillars + calendar", "Hook writing for reels", "Educational & trust content", "Offer & FAQ posts", "Seasonal campaigns (Ramadan/Hajj etc.)"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={MousePointerClick} title="Conversion Thinking" bullets={["CTA rules for every post", "WhatsApp-first conversion", "Lead magnets / inquiry prompts", "Story sequences that convert", "Alignment with ad funnels"]} delay={0.1} />
          </div>
        </Container>
      </section>

      {/* INDUSTRIES */}
      <section id="industries" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Industries We Serve</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Brands That Need Trust + Consistency</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">We manage social for businesses where credibility and clear offers matter — and where DMs/WhatsApp leads are important.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Globe, color: "#1D4ED8", title: "Travel & Tourism", desc: "Packages, seasonal offers, WhatsApp inquiries, story highlights structure." },
              { icon: ShoppingCart, color: "#23A6E8", title: "E-Commerce", desc: "Product storytelling, UGC planning, offer posts, conversion CTAs." },
              { icon: Home, color: "#3AC9F5", title: "Real Estate", desc: "Listings content, trust cues, location-led posts, inquiry flows." },
              { icon: Briefcase, color: "#1D4ED8", title: "Agencies & Services", desc: "Proof-driven content, process posts, consultation CTAs." },
              { icon: Heart, color: "#23A6E8", title: "Wellness & Clinics", desc: "Educational trust content, safe messaging, appointment intent." },
              { icon: Wifi, color: "#3AC9F5", title: "Tech & SaaS", desc: "Feature highlights, use cases, thought leadership, lead capture." },
              { icon: Leaf, color: "#1D4ED8", title: "Natural / Organic Brands", desc: "Story-led content, trust building, consistent identity." },
              { icon: DollarSign, color: "#23A6E8", title: "Finance & Insurance", desc: "Compliance-friendly content, credibility-first tone." },
              { icon: GraduationCap, color: "#3AC9F5", title: "Education", desc: "Enrollment-led content, awareness + trust campaigns." },
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
              <span className="kicker" style={{ borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.07)", color: "#93c5fd" }}>Social that converts</span>
              <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Want a Social System That Converts?</h2>
              <p className="mt-5 text-lg text-slate-400 max-w-xl mx-auto">Let's build consistency, trust, and WhatsApp-first conversion paths — with a clear monthly plan.</p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link to="/contact" className="btn-primary">Start Now <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/work?filter=social" className="btn-ghost-dark">View Social Work</Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
