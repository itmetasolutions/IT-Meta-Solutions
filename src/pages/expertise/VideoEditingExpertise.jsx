import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useInView } from "framer-motion";
import {
  ArrowRight, ShieldCheck, Target, Zap, Gauge, Film, Clapperboard, Video, Captions,
  AudioLines, Megaphone, Timer, Wand2, Layers, Scissors, LayoutGrid, CheckCircle2,
  Globe, Home, Briefcase, ShoppingCart, GraduationCap, Heart, DollarSign, Leaf, Wifi,
  Instagram, Youtube, MessageSquareText,
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
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500"><Film className="h-3.5 w-3.5 text-[#1D4ED8]" />Video Editing</div>
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
  { label: "Workflow", href: "#workflow" },
  { label: "Skills", href: "#skills" },
  { label: "Industries", href: "#industries" },
];

const seoContent = {
  kicker: "Video Editing",
  title: "Video Editing for Ads, Reels, and Conversion",
  subtitle: "We create high-retention edits for reels, TikTok, YouTube, and performance marketing.",
  paragraphs: [
    "Our video editing workflow blends fast-paced storytelling, subtitles, and motion graphics that improve watch time and conversions.",
    "We support ecommerce, real estate, and service brands with ad-ready edits and consistent content systems.",
  ],
  bullets: [
    "Short-form reels and ads for Meta campaigns",
    "YouTube long-form edits with retention pacing",
    "Captioning, motion graphics, and sound design",
    "UGC and testimonial edits for ecommerce",
  ],
};

const seoFaqs = [
  { q: "Do you edit reels and TikTok videos?", a: "Yes. We deliver high-retention edits for reels, TikTok, and shorts." },
  { q: "Can you edit ad creatives for Meta Ads?", a: "Yes. We edit ad creatives with hooks, subtitles, and CTA-ready pacing." },
  { q: "Do you handle long-form YouTube edits?", a: "Yes. We edit YouTube content with structured pacing, b-roll, and captions." },
  { q: "Can you build a monthly content system?", a: "Yes. We help plan and deliver consistent video output each month." },
];

export default function VideoEditingExpertise() {
  return (
    <>
      <Helmet>
        <title>Video Editing - IT Meta Solutions</title>
        <meta name="description" content="Video editing for reels, ads, and YouTube with high-retention hooks, subtitles, and conversion-focused pacing." />
        <meta name="keywords" content="video editing, reels editing, shorts editing, youtube editing, ads editing, subtitles, motion graphics, capcut, premiere, after effects, IT Meta Solutions" />
        <meta property="og:title" content="Video Editing - IT Meta Solutions" />
        <meta property="og:description" content="5+ years of video editing: short-form, YouTube long-form, ads creatives, captions, and motion graphics." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://itmetasolutions.com/video-editing" />
      </Helmet>
      <ScrollProgress />

      {/* HERO */}
      <section className="relative bg-[#141A2E] overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="absolute inset-0 dot-grid-bg opacity-25 pointer-events-none" />
        <div className="absolute -top-32 right-0 w-[600px] h-[500px] rounded-full bg-[#1D4ED8]/10 blur-[120px] pointer-events-none" />
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex flex-wrap gap-2 mb-8">
              {[{ icon: Film, label: "Short-form" }, { icon: Youtube, label: "YouTube" }, { icon: Captions, label: "Captions" }, { icon: Wand2, label: "Motion Graphics" }, { icon: Target, label: "Ad Creatives" }].map((b) => (
                <span key={b.label} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-slate-300"><b.icon className="h-3.5 w-3.5 text-[#3AC9F5]" />{b.label}</span>
              ))}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Video Editing <span className="animated-gradient-text">Expertise</span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-3xl leading-relaxed">We edit videos that keep attention and drive action. With <span className="text-white font-semibold">5+ years</span> of experience, we deliver high-retention short-form (Reels/Shorts), YouTube long-form, and ad creatives — with captions, pacing, and brand-consistent visuals.</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3 max-w-2xl">
              {[{ icon: Timer, label: "Retention", value: "Hook-first edits", color: "#1D4ED8" }, { icon: Captions, label: "Clarity", value: "Captions + punch", color: "#23A6E8" }, { icon: Target, label: "Goal", value: "Clicks / leads", color: "#3AC9F5" }].map((s) => (
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
              <Link to="/work?filter=video" className="btn-ghost-dark">View Video Work</Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* BANNER */}
      <section className="bg-white py-12">
        <Container>
          <div className="relative h-64 sm:h-80 overflow-hidden rounded-3xl shadow-xl shadow-slate-200">
            <img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1400&q=80" alt="Video Editing" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1D4ED8]/60 via-[#141A2E]/30 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8 sm:px-12">
              <div><p className="text-white/80 text-sm font-medium mb-2">Hook-first editing for every platform</p><p className="text-white text-2xl font-bold sm:text-3xl max-w-xs" style={{ fontFamily: "var(--font-heading)" }}>Edits built for attention &amp; conversion</p></div>
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
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Edits Built for Attention, Clarity, and Conversion</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">We focus on pacing, story structure, and clean visuals — so your content feels premium and performs better on social and ads.</p>
          </Reveal>
          <Reveal delay={0.05} className="mb-8">
            <div className="premium-card rounded-2xl p-7">
              <p className="text-slate-700 leading-relaxed">Most videos fail in the first 2 seconds. We fix that with hook-first editing, clear messaging, captions, sound design, and platform-native formatting (9:16, 1:1, 16:9).</p>
              <p className="mt-4 text-slate-700 leading-relaxed">You get consistent branding, faster turnaround, and edits that match your audience — whether it's a travel reel, product ad, or an educational YouTube video.</p>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            <LightCard color="#1D4ED8" icon={Gauge} title="Performance-first" bullets={["Hook + payoff structure", "Retention pacing", "Platform-native formats"]} />
            <LightCard color="#23A6E8" icon={ShieldCheck} title="Brand-safe" bullets={["Consistent colors/fonts", "Clean visuals & overlays", "Non-distracting effects"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={Zap} title="Fast Delivery" bullets={["Reusable templates", "Batch editing workflow", "Revision-friendly process"]} delay={0.1} />
          </div>
        </Container>
      </section>

      {/* EXPERTISE */}
      <section id="expertise" className="scroll-mt-28 bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Expertise</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Short-form, Long-form, and Ads — Edited the Right Way</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">We edit across formats while keeping brand consistency and platform performance in mind.</p>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-2">
            <LightCard color="#1D4ED8" icon={Video} title="Short-form (Reels / Shorts / TikTok)" desc="High-retention edits designed for scrolling audiences." bullets={["Hook in first 1–2 seconds", "Fast cuts + jump cut cleanup", "Captions + keywords emphasis", "B-roll overlays & transitions (clean)", "9:16 export + safe areas"]} />
            <LightCard color="#23A6E8" icon={Clapperboard} title="YouTube Long-form" desc="Structured, clean edits that improve watch time." bullets={["Intro tightening + pacing", "Chapters / segments structure", "B-roll inserts + callouts", "Audio cleanup + leveling", "Thumbnail-friendly moments"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={Megaphone} title="Ad Creatives (Meta / Google / TikTok)" desc="Edits optimized for CTR and conversions." bullets={["Offer-led structure", "Proof/UGC style edits", "CTA overlays + end cards", "Multiple variants A/B", "1:1 / 4:5 / 9:16 versions"]} delay={0.1} />
            <LightCard color="#1D4ED8" icon={Captions} title="Captions & Language Support" desc="Captions that improve retention and clarity." bullets={["Auto + manual corrections", "Urdu/English mixed captions (when needed)", "Highlight keywords / punchlines", "Clean subtitle styling"]} delay={0.15} />
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            <LightCard color="#23A6E8" icon={Wand2} title="Motion Graphics" desc="Modern motion that supports the message." bullets={["Lower thirds", "Pop-up callouts", "Kinetic text (clean)", "Logo stings"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={AudioLines} title="Sound Design" desc="Audio that feels professional." bullets={["Noise reduction", "Leveling", "SFX accents", "Music sync"]} delay={0.1} />
            <LightCard color="#1D4ED8" icon={Layers} title="Brand Templates" desc="Reusable assets for scale." bullets={["Intro/outro templates", "Caption styles", "CTA cards", "Brand overlays"]} delay={0.15} />
          </div>
        </Container>
      </section>

      {/* WORKFLOW */}
      <section id="workflow" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Workflow</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>A Simple System to Deliver Consistently</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">Fast onboarding, clear requirements, and a repeatable editing pipeline — so you can post and run ads without delays.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            <LightCard color="#1D4ED8" icon={MessageSquareText} title="1) Brief + Content Intake" desc="We collect goals, style references, and raw footage." bullets={["Platform + format (9:16 / 16:9 / 1:1)", "Brand kit (fonts/colors/logo)", "Examples you like", "CTA goal (leads, sales, views)"]} />
            <LightCard color="#23A6E8" icon={Scissors} title="2) Editing + Structure" desc="We build pacing, story, and clean visuals." bullets={["Hook-first structure", "B-roll + overlays", "Captions + callouts", "Audio polish"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={CheckCircle2} title="3) Review + Revisions" desc="Fast review loop, minimal friction." bullets={["Time-stamped feedback", "1–2 revision rounds (typical)", "Variants for ads if needed"]} delay={0.1} />
            <LightCard color="#1D4ED8" icon={LayoutGrid} title="4) Exports + Delivery" desc="Multi-format delivery ready to publish." bullets={["9:16 / 4:5 / 1:1 / 16:9 exports", "File naming system", "Thumbnail frame suggestions", "Archive for future edits"]} delay={0.15} />
          </div>
          <Reveal delay={0.15} className="mt-8">
            <div className="premium-card rounded-2xl p-7">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div><p className="text-sm font-semibold text-slate-900">Output options</p><p className="mt-1 text-sm text-slate-600">Monthly content batches, ad creative sets, or ongoing YouTube editing — based on your needs.</p></div>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-[#1D4ED8] flex-shrink-0"><Film className="h-4 w-4" />Scalable editing</span>
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
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Editing Skills That Directly Impact Performance</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">We combine creative editing with marketing thinking — so videos look premium and perform better.</p>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-3">
            <LightCard color="#1D4ED8" icon={Timer} title="Retention Editing" bullets={["Hook pacing", "Pattern interrupts (clean)", "Dead-air trimming", "Story tightening", "Re-watch moments"]} />
            <LightCard color="#23A6E8" icon={Captions} title="Clarity & Captions" bullets={["Readable subtitle styling", "Keyword emphasis", "Bilingual support (Urdu/English)", "Safe-area placement"]} delay={0.05} />
            <LightCard color="#3AC9F5" icon={Target} title="Conversion Focus" bullets={["Offer-first ad structure", "Proof/UGC style edits", "CTA end cards", "Multiple creative variants"]} delay={0.1} />
          </div>
        </Container>
      </section>

      {/* INDUSTRIES */}
      <section id="industries" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12">
            <span className="kicker">Industries We Serve</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Video Editing for Brands That Need Attention + Trust</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl">We edit for industries where storytelling and credibility drive clicks, inquiries, and sales.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: ShoppingCart, color: "#1D4ED8", title: "E-Commerce", desc: "UGC style ads, product demos, offer reels, testimonials." },
              { icon: Globe, color: "#23A6E8", title: "Travel & Tourism", desc: "Cinematic reels, itinerary highlights, hotel/route edits." },
              { icon: Home, color: "#3AC9F5", title: "Real Estate", desc: "Property walkthroughs, listing reels, inquiry CTA edits." },
              { icon: Briefcase, color: "#1D4ED8", title: "Agencies & Services", desc: "Case study reels, proof edits, lead-gen creatives." },
              { icon: Heart, color: "#23A6E8", title: "Healthcare & Wellness", desc: "Educational videos, trust-first tone, clean captions." },
              { icon: Wifi, color: "#3AC9F5", title: "Tech & SaaS", desc: "Feature explainers, product updates, motion callouts." },
              { icon: Leaf, color: "#1D4ED8", title: "Organic / Natural Brands", desc: "Premium lifestyle edits, product benefits, reviews." },
              { icon: DollarSign, color: "#23A6E8", title: "Finance & Insurance", desc: "Simple explainers, credibility-first design, subtitles." },
              { icon: GraduationCap, color: "#3AC9F5", title: "Education", desc: "Course promos, lectures, reels for enrollments." },
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
              <span className="kicker" style={{ borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.07)", color: "#93c5fd" }}>High-retention edits</span>
              <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Want High-Retention Edits for Your Brand?</h2>
              <p className="mt-5 text-lg text-slate-400 max-w-xl mx-auto">Let's create a consistent editing system for reels, ads, and YouTube — built for attention and conversion.</p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link to="/contact" className="btn-primary">Get Started <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/work?filter=video" className="btn-ghost-dark">View Video Work</Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
