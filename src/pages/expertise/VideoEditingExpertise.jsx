import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Sparkles,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Zap,
  Gauge,
  Film,
  Clapperboard,
  Video,
  Captions,
  AudioLines,
  Megaphone,
  Mic,
  Timer,
  Wand2,
  Layers,
  Scissors,
  Subtitles,
  Sparkle,
  LayoutGrid,
  CheckCircle2,
  Globe,
  Home,
  Briefcase,
  ShoppingCart,
  GraduationCap,
  Heart,
  DollarSign,
  Leaf,
  Wifi,
  Instagram,
  Youtube,
  Facebook,
  MessageSquareText,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import SeoContentFaq from "../../components/SeoContentFaq";
import SubpageVisualLayer from "../../components/SubpageVisualLayer";

/**
 * Video Editing Service / Expertise Page — IT Meta Solutions
 * Matches your template:
 * - Dark glass cards + gradients
 * - Scroll progress
 * - Parallax hero
 * - Sticky section nav (active state)
 *
 * Built for modern short-form + ads workflows (Reels/TikTok/Shorts) + long-form YouTube.
 */

const cx = (...c) => c.filter(Boolean).join(" ");

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
  subtitle:
    "We create high-retention edits for reels, TikTok, YouTube, and performance marketing.",
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
  {
    q: "Do you edit reels and TikTok videos?",
    a: "Yes. We deliver high-retention edits for reels, TikTok, and shorts.",
  },
  {
    q: "Can you edit ad creatives for Meta Ads?",
    a: "Yes. We edit ad creatives with hooks, subtitles, and CTA-ready pacing.",
  },
  {
    q: "Do you handle long-form YouTube edits?",
    a: "Yes. We edit YouTube content with structured pacing, b-roll, and captions.",
  },
  {
    q: "Can you build a monthly content system?",
    a: "Yes. We help plan and deliver consistent video output each month.",
  },
];

function Container({ children, className }) {
  return <div className={cx("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
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
        "bg-[radial-gradient(closest-side,rgba(80,37,209,0.55),rgba(80,37,209,0))]",
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
      className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-[#5025d1] via-emerald-400 to-fuchsia-500"
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
        <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-[#5025d1]/25 blur-3xl" />
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
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
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
                active === item.href ? "bg-white text-zinc-950" : "text-zinc-300 hover:bg-white/10"
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

export default function VideoEditingExpertise() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -100]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.85]);
  const heroRef = useRef(null);

  return (
    <>
      <Helmet>
        <title>Video Editing - IT Meta Solutions</title>
        <meta
          name="description"
          content="Video editing for reels, ads, and YouTube with high-retention hooks, subtitles, and conversion-focused pacing."
        />
        <meta
          name="keywords"
          content="video editing, reels editing, shorts editing, youtube editing, ads editing, subtitles, motion graphics, capcut, premiere, after effects, IT Meta Solutions"
        />
        <meta property="og:title" content="Video Editing - IT Meta Solutions" />
        <meta
          property="og:description"
          content="5+ years of video editing: short-form, YouTube long-form, ads creatives, captions, and motion graphics."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://itmetasolutions.com/video-editing" />
      </Helmet>

      <div className="itms-subpage relative min-h-screen text-zinc-100 mb-16 overflow-hidden">
        <SubpageVisualLayer />

        <ScrollProgress />

        {/* Background accents */}
        <GradientBlob className="h-[640px] w-[640px] -left-40 -top-40" />
        <GradientBlob className="h-[620px] w-[620px] -right-40 top-72 bg-[radial-gradient(closest-side,rgba(16,185,129,0.5),rgba(16,185,129,0))]" />

        {/* HERO */}
        <section ref={heroRef} className="relative overflow-hidden">
          <Container className="pb-10 pt-24 sm:pb-14 sm:pt-32">
            <motion.div style={{ y: heroY, opacity: heroOpacity }}>
              <Reveal>
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <Pill icon={Film}>Short-form</Pill>
                  <Pill icon={Youtube}>YouTube</Pill>
                  <Pill icon={Captions}>Captions</Pill>
                  <Pill icon={Wand2}>Motion graphics</Pill>
                  <Pill icon={Target}>Ad creatives</Pill>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Video Editing</h1>
                <p className="mt-6 text-lg leading-relaxed text-zinc-300 max-w-3xl">
                  We edit videos that keep attention and drive action. With{" "}
                  <span className="text-white font-semibold">5+ years</span> of experience, we deliver high-retention short-form
                  (Reels/Shorts), YouTube long-form, and ad creatives — with captions, pacing, and brand-consistent visuals.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  <Stat icon={Timer} label="Retention" value="Hook-first edits" />
                  <Stat icon={Captions} label="Clarity" value="Captions + punch" />
                  <Stat icon={Target} label="Goal" value="Clicks/leads" />
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
                kicker="Overview"
                title="Edits built for attention, clarity, and conversion"
                desc="We focus on pacing, story structure, and clean visuals — so your content feels premium and performs better on social and ads."
              />
            </Reveal>

            <Reveal delay={0.05}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-8">
                <p className="text-base leading-relaxed text-zinc-300">
                  Most videos fail in the first 2 seconds. We fix that with hook-first editing, clear messaging, captions, sound
                  design, and platform-native formatting (9:16, 1:1, 16:9).
                </p>
                <p className="mt-4 text-base leading-relaxed text-zinc-300">
                  You get consistent branding, faster turnaround, and edits that match your audience — whether it’s a travel
                  reel, product ad, or an educational YouTube video.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <Card
                  icon={Gauge}
                  title="Performance-first"
                  bullets={["Hook + payoff structure", "Retention pacing", "Platform-native formats"]}
                />
                <Card
                  icon={ShieldCheck}
                  title="Brand-safe"
                  bullets={["Consistent colors/fonts", "Clean visuals & overlays", "Non-distracting effects"]}
                />
                <Card
                  icon={Zap}
                  title="Fast delivery"
                  bullets={["Reusable templates", "Batch editing workflow", "Revision-friendly process"]}
                />
              </div>
            </Reveal>
          </section>

          <Divider />

          {/* EXPERTISE */}
          <section id="expertise">
            <Reveal>
              <SectionTitle
                kicker="Expertise"
                title="Short-form, long-form, and ads — edited the right way"
                desc="We edit across formats while keeping brand consistency and platform performance in mind."
              />
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <Reveal delay={0.05}>
                <Card
                  icon={Video}
                  title="Short-form (Reels / Shorts / TikTok)"
                  desc="High-retention edits designed for scrolling audiences."
                  bullets={[
                    "Hook in first 1–2 seconds",
                    "Fast cuts + jump cut cleanup",
                    "Captions + keywords emphasis",
                    "B-roll overlays & transitions (clean)",
                    "9:16 export + safe areas",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.1}>
                <Card
                  icon={Clapperboard}
                  title="YouTube long-form"
                  desc="Structured, clean edits that improve watch time."
                  bullets={[
                    "Intro tightening + pacing",
                    "Chapters / segments structure",
                    "B-roll inserts + callouts",
                    "Audio cleanup + leveling",
                    "Thumbnail-friendly moments",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.15}>
                <Card
                  icon={Megaphone}
                  title="Ad creatives (Meta / Google / TikTok)"
                  desc="Edits optimized for CTR and conversions."
                  bullets={[
                    "Offer-led structure",
                    "Proof/UGC style edits",
                    "CTA overlays + end cards",
                    "Multiple variants A/B",
                    "1:1 / 4:5 / 9:16 versions",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.2}>
                <Card
                  icon={Subtitles}
                  title="Captions & language support"
                  desc="Captions that improve retention and clarity."
                  bullets={[
                    "Auto + manual corrections",
                    "Urdu/English mixed captions (when needed)",
                    "Highlight keywords / punchlines",
                    "Clean subtitle styling",
                  ]}
                />
              </Reveal>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <Reveal delay={0.05}>
                <Card
                  icon={Wand2}
                  title="Motion graphics"
                  desc="Modern motion that supports the message."
                  bullets={["Lower thirds", "Pop-up callouts", "Kinetic text (clean)", "Logo stings"]}
                />
              </Reveal>
              <Reveal delay={0.1}>
                <Card
                  icon={AudioLines}
                  title="Sound design"
                  desc="Audio that feels professional."
                  bullets={["Noise reduction", "Leveling", "SFX accents", "Music sync"]}
                />
              </Reveal>
              <Reveal delay={0.15}>
                <Card
                  icon={Layers}
                  title="Brand templates"
                  desc="Reusable assets for scale."
                  bullets={["Intro/outro templates", "Caption styles", "CTA cards", "Brand overlays"]}
                />
              </Reveal>
            </div>
          </section>

          <Divider />

          {/* WORKFLOW */}
          <section id="workflow">
            <Reveal>
              <SectionTitle
                kicker="Workflow"
                title="A simple system to deliver consistently"
                desc="Fast onboarding, clear requirements, and a repeatable editing pipeline — so you can post and run ads without delays."
              />
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <Reveal delay={0.05}>
                <Card
                  icon={MessageSquareText}
                  title="1) Brief + content intake"
                  desc="We collect goals, style references, and raw footage."
                  bullets={[
                    "Platform + format (9:16 / 16:9 / 1:1)",
                    "Brand kit (fonts/colors/logo)",
                    "Examples you like",
                    "CTA goal (leads, sales, views)",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.1}>
                <Card
                  icon={Scissors}
                  title="2) Editing + structure"
                  desc="We build pacing, story, and clean visuals."
                  bullets={[
                    "Hook-first structure",
                    "B-roll + overlays",
                    "Captions + callouts",
                    "Audio polish",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.15}>
                <Card
                  icon={CheckCircle2}
                  title="3) Review + revisions"
                  desc="Fast review loop, minimal friction."
                  bullets={[
                    "Time-stamped feedback",
                    "1–2 revision rounds (typical)",
                    "Variants for ads if needed",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.2}>
                <Card
                  icon={LayoutGrid}
                  title="4) Exports + delivery"
                  desc="Multi-format delivery ready to publish."
                  bullets={[
                    "9:16 / 4:5 / 1:1 / 16:9 exports",
                    "File naming system",
                    "Thumbnail frame suggestions",
                    "Archive for future edits",
                  ]}
                />
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#5025d1]/15 to-emerald-400/10 p-7">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-2xl">
                    <div className="text-sm font-semibold text-white">Output options</div>
                    <div className="mt-1 text-sm text-zinc-300">
                      Monthly content batches, ad creative sets, or ongoing YouTube editing — based on your needs.
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white">
                    <Film className="h-4 w-4" />
                    Scalable editing
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          <Divider />

          {/* SKILLS */}
          <section id="skills">
            <Reveal>
              <SectionTitle
                kicker="Skills"
                title="Editing skills that directly impact performance"
                desc="We combine creative editing with marketing thinking — so videos look premium and perform better."
              />
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              <Reveal delay={0.05}>
                <Card
                  icon={Timer}
                  title="Retention editing"
                  bullets={[
                    "Hook pacing",
                    "Pattern interrupts (clean)",
                    "Dead-air trimming",
                    "Story tightening",
                    "Re-watch moments",
                  ]}
                />
              </Reveal>
              <Reveal delay={0.1}>
                <Card
                  icon={Captions}
                  title="Clarity & captions"
                  bullets={[
                    "Readable subtitle styling",
                    "Keyword emphasis",
                    "Bilingual support (Urdu/English)",
                    "Safe-area placement",
                  ]}
                />
              </Reveal>
              <Reveal delay={0.15}>
                <Card
                  icon={Target}
                  title="Conversion focus"
                  bullets={[
                    "Offer-first ad structure",
                    "Proof/UGC style edits",
                    "CTA end cards",
                    "Multiple creative variants",
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
                title="Video editing for brands that need attention + trust"
                desc="We edit for industries where storytelling and credibility drive clicks, inquiries, and sales."
              />
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Reveal delay={0.05}>
                <Card icon={ShoppingCart} title="E-Commerce" desc="UGC style ads, product demos, offer reels, testimonials." />
              </Reveal>
              <Reveal delay={0.1}>
                <Card icon={Globe} title="Travel & Tourism" desc="Cinematic reels, itinerary highlights, hotel/route edits." />
              </Reveal>
              <Reveal delay={0.15}>
                <Card icon={Home} title="Real Estate" desc="Property walkthroughs, listing reels, inquiry CTA edits." />
              </Reveal>
              <Reveal delay={0.2}>
                <Card icon={Briefcase} title="Agencies & Services" desc="Case study reels, proof edits, lead-gen creatives." />
              </Reveal>
              <Reveal delay={0.25}>
                <Card icon={Heart} title="Healthcare & Wellness" desc="Educational videos, trust-first tone, clean captions." />
              </Reveal>
              <Reveal delay={0.3}>
                <Card icon={Wifi} title="Tech & SaaS" desc="Feature explainers, product updates, motion callouts." />
              </Reveal>
              <Reveal delay={0.35}>
                <Card icon={Leaf} title="Organic / Natural Brands" desc="Premium lifestyle edits, product benefits, reviews." />
              </Reveal>
              <Reveal delay={0.4}>
                <Card icon={DollarSign} title="Finance & Insurance" desc="Simple explainers, credibility-first design, subtitles." />
              </Reveal>
              <Reveal delay={0.45}>
                <Card icon={GraduationCap} title="Education" desc="Course promos, lectures, reels for enrollments." />
              </Reveal>
            </div>
          </section>

          <Divider />

          <SeoContentFaq content={seoContent} faqs={seoFaqs} />

          {/* CTA */}
          <section>
            <Reveal>
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#5025d1]/15 to-emerald-400/10 p-8 md:p-12">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl font-bold text-white mb-4">Want high-retention edits for your brand?</h2>
                  <p className="text-lg text-zinc-300 mb-8">
                    Let’s create a consistent editing system for reels, ads, and YouTube — built for attention and conversion.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-zinc-950 hover:opacity-90 transition"
                    >
                      Get Started <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href="/work?filter=video"
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
                    >
                      View Video Work
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
