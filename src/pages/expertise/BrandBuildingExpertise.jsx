import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
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
  LayoutGrid,
  Globe,
  Briefcase,
  ShoppingCart,
  Home,
  GraduationCap,
  Heart,
  DollarSign,
  Leaf,
  Wifi,
  PenTool,
  Palette,
  Megaphone,
  MessageSquareText,
  Layers,
  BadgeCheckIcon,
  CheckCircle2,
  Building2,
  Lightbulb,
  FileSearch,
  BarChart3,
  Rocket,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import SeoContentFaq from "../../components/SeoContentFaq";
import SubpageVisualLayer from "../../components/SubpageVisualLayer";

/**
 * Brand Building Service / Expertise Page — IT Meta Solutions
 * Matches your template:
 * - Dark glass cards + gradients
 * - Scroll progress
 * - Static hero
 * - Sticky section nav (active state)
 *
 * Uses data from your case studies style:
 * - Trust-first brand builds (Website + Social + Ads + Content)
 * - 5+ years experience
 */

const cx = (...c) => c.filter(Boolean).join(" ");

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
  subtitle:
    "We build brand systems, messaging, and visuals that align with performance marketing and conversion.",
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
  {
    q: "What does a brand build include?",
    a: "Brand strategy, messaging, visual identity, web design, and conversion-ready assets.",
  },
  {
    q: "Do you build websites with the brand system?",
    a: "Yes. We deliver the website and marketing assets aligned with the brand.",
  },
  {
    q: "Can you handle ecommerce brand building?",
    a: "Yes. We build ecommerce brand systems with product storytelling and conversion focus.",
  },
  {
    q: "How long does a brand build take?",
    a: "Most brand builds take 4 to 8 weeks depending on scope and approvals.",
  },
];

function Container({ children, className }) {
  return <div className={cx("mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12", className)}>{children}</div>;
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

export default function BrandBuildingExpertise() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const heroRef = useRef(null);

  return (
    <>
      <Helmet>
        <title>Brand Building - IT Meta Solutions</title>
        <meta
          name="description"
          content="Brand building for ecommerce and growth: positioning, identity, conversion-focused websites, and creative systems."
        />
        <meta
          name="keywords"
          content="brand building, brand identity, logo design, brand strategy, brand guidelines, social media branding, website branding, IT Meta Solutions"
        />
        <meta property="og:title" content="Brand Building - IT Meta Solutions" />
        <meta
          property="og:description"
          content="5+ years of brand building: strategy, identity, website + social consistency, and conversion-ready brand systems."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://itmetasolutions.com/brand-building" />
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
            <motion.div>
              <Reveal>
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <Pill icon={Lightbulb}>Strategy</Pill>
                  <Pill icon={PenTool}>Identity</Pill>
                  <Pill icon={LayoutGrid}>Website</Pill>
                  <Pill icon={Palette}>Visual system</Pill>
                  <Pill icon={Megaphone}>Growth</Pill>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Brand Building</h1>
                <p className="mt-6 text-lg leading-relaxed text-zinc-300 max-w-3xl">
                  We build brands that look premium, feel trustworthy, and convert. With{" "}
                  <span className="text-white font-semibold">5+ years</span> of experience, we combine strategy, identity, and
                  execution across website + social + ads — so everything matches and scales.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  <Stat icon={ShieldCheck} label="Trust" value="Credibility-first" />
                  <Stat icon={Target} label="Clarity" value="Offer positioning" />
                  <Stat icon={TrendingUp} label="Growth" value="Conversion system" />
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-zinc-950 hover:opacity-90 transition"
                  >
                    Build my brand <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="/work?filter=branding"
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
                  >
                    View Brand Builds
                  </a>
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
                title="From idea → identity → full brand system"
                desc="Brand building isn’t only a logo. It’s the full system: positioning, messaging, visuals, website structure, social presence, and the conversion paths that turn attention into sales/leads."
              />
            </Reveal>

            <Reveal delay={0.05}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-8">
                <p className="text-base leading-relaxed text-zinc-300">
                  We build brands with a clear “why” and “why choose us” — then translate that into a consistent design system
                  across web, social, ads, and content. This creates trust, improves recognition, and reduces marketing cost
                  because everything feels aligned.
                </p>
                <p className="mt-4 text-base leading-relaxed text-zinc-300">
                  Perfect for startups launching, businesses rebranding, and companies that want a consistent premium identity.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <Card
                  icon={ShieldCheck}
                  title="Trust-first"
                  bullets={["Professional look & tone", "Clear proof + credibility cues", "Consistent brand system"]}
                />
                <Card
                  icon={Target}
                  title="Positioning-led"
                  bullets={["Offer clarity", "Audience-specific messaging", "Simple outcomes language"]}
                />
                <Card
                  icon={Rocket}
                  title="Built to scale"
                  bullets={["Templates & guidelines", "Reusable content formats", "Ready for ads + growth"]}
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
                title="Brand systems across website, social & marketing"
                desc="We build and unify everything so your brand feels consistent everywhere your audience meets you."
              />
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <Reveal delay={0.05}>
                <Card
                  icon={Lightbulb}
                  title="Brand strategy"
                  desc="The foundation: clarity + differentiation."
                  bullets={[
                    "Brand positioning statement",
                    "Audience & intent mapping",
                    "Offer architecture (services/packages)",
                    "Tone of voice (Urdu/English if needed)",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.1}>
                <Card
                  icon={PenTool}
                  title="Identity design"
                  desc="A clean, premium look that fits your market."
                  bullets={[
                    "Logo concepts & refinements",
                    "Color palette + typography",
                    "Icon/shape style system",
                    "Brand patterns & visual cues",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.15}>
                <Card
                  icon={LayoutGrid}
                  title="Website as trust hub"
                  desc="Conversion-ready structure built for sales/leads."
                  bullets={[
                    "Homepage messaging hierarchy",
                    "Service/package pages",
                    "Trust blocks (stats, testimonials)",
                    "Fast CTA paths (WhatsApp, forms)",
                    "SEO-ready structure",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.2}>
                <Card
                  icon={Megaphone}
                  title="Launch & growth assets"
                  desc="Brand rollout that supports marketing performance."
                  bullets={[
                    "Social profile optimization",
                    "Post/story templates",
                    "Ad creative direction (hooks/offers)",
                    "Content pillars & calendar",
                    "Campaign landing pages",
                  ]}
                />
              </Reveal>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <Reveal delay={0.05}>
                <Card
                  icon={MessageSquareText}
                  title="Messaging kit"
                  desc="Words that match the visuals."
                  bullets={[
                    "Taglines & headlines",
                    "Offer/benefit bullets",
                    "FAQ & objection handling",
                    "Short-form script direction",
                  ]}
                />
              </Reveal>
              <Reveal delay={0.1}>
                <Card
                  icon={BarChart3}
                  title="Performance mindset"
                  desc="Brand built to help marketing win."
                  bullets={[
                    "Conversion-focused layout",
                    "Creative angles & hooks",
                    "A/B-ready assets",
                    "Analytics foundations",
                  ]}
                />
              </Reveal>
              <Reveal delay={0.15}>
                <Card
                  icon={FileSearch}
                  title="SEO foundation"
                  desc="Structure that ranks and scales."
                  bullets={[
                    "Intent-based pages",
                    "Internal linking structure",
                    "Metadata guidelines",
                    "Content growth plan",
                  ]}
                />
              </Reveal>
            </div>
          </section>

          <Divider />

          {/* PROCESS */}
          <section id="process">
            <Reveal>
              <SectionTitle
                kicker="Process"
                title="A clean brand-build workflow (fast + reliable)"
                desc="We keep it simple: discovery → direction → design → rollout. You always know what’s next."
              />
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <Reveal delay={0.05}>
                <Card
                  icon={Users}
                  title="1) Discovery"
                  desc="We understand the business, market, and goals."
                  bullets={[
                    "Audience & competitor review",
                    "Offer clarity + packages/services",
                    "Brand vibe references",
                    "Content & channel plan",
                  ]}
                />
              </Reveal>
              <Reveal delay={0.1}>
                <Card
                  icon={Lightbulb}
                  title="2) Brand direction"
                  desc="We decide what the brand should feel like."
                  bullets={[
                    "Positioning + messaging",
                    "Moodboard + style direction",
                    "Color & typography direction",
                    "Content pillars",
                  ]}
                />
              </Reveal>
              <Reveal delay={0.15}>
                <Card
                  icon={Palette}
                  title="3) Design system"
                  desc="Identity & templates built for consistency."
                  bullets={[
                    "Logo + refinements",
                    "Brand patterns/icons",
                    "Post/story templates",
                    "Guidelines (usage rules)",
                  ]}
                />
              </Reveal>
              <Reveal delay={0.2}>
                <Card
                  icon={Rocket}
                  title="4) Rollout"
                  desc="Launch website + social + campaign assets."
                  bullets={[
                    "Website + landing pages",
                    "Social profile optimization",
                    "Launch content set",
                    "Ad creatives direction",
                  ]}
                />
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#5025d1]/15 to-emerald-400/10 p-7">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-2xl">
                    <div className="text-sm font-semibold text-white">What you get at the end</div>
                    <div className="mt-1 text-sm text-zinc-300">
                      A complete brand kit + website + templates — ready for content, ads, and consistent growth.
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white">
                    <CheckCircle2 className="h-4 w-4" />
                    Ready-to-launch
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-6 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/15 to-[#5025d1]/10 p-7">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-medium text-emerald-300">
                        <TrendingUp className="h-3 w-3" />
                        Featured Brand Build
                      </span>
                    </div>
                    <div className="text-lg font-semibold text-white">Ekommart — From Zero to 3,300+ Sales</div>
                    <div className="mt-1 text-sm text-zinc-300">
                      Complete e-commerce brand built from scratch: WordPress store, brand identity, social media presence, and performance marketing generating 3,300+ purchases in 5 months.
                    </div>
                  </div>
                  <a
                    href="/case-study/ekommart"
                    className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-600 transition"
                  >
                    View Case Study <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Reveal>
          </section>

          <Divider />

          {/* DELIVERABLES */}
          <section id="deliverables">
            <Reveal>
              <SectionTitle
                kicker="Deliverables"
                title="Everything bundled into a consistent brand system"
                desc="Pick what you need: complete brand build or modular deliverables."
              />
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              <Reveal delay={0.05}>
                <Card
                  icon={PenTool}
                  title="Identity pack"
                  bullets={[
                    "Logo suite (main + icon)",
                    "Color palette + typography",
                    "Icons/patterns",
                    "Brand guidelines PDF",
                  ]}
                />
              </Reveal>
              <Reveal delay={0.1}>
                <Card
                  icon={LayoutGrid}
                  title="Website pack"
                  bullets={[
                    "Homepage + key pages",
                    "Service/package templates",
                    "Trust modules",
                    "WhatsApp/forms conversion paths",
                    "SEO-ready structure",
                  ]}
                />
              </Reveal>
              <Reveal delay={0.15}>
                <Card
                  icon={Layers}
                  title="Social & marketing pack"
                  bullets={[
                    "Profile optimization",
                    "Post/story templates",
                    "Content pillars + calendar",
                    "Ad creative direction",
                    "Launch content set",
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
                title="Brand building for growth-focused businesses"
                desc="We’ve built brands across multiple industries — especially where trust and clarity matter."
              />
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Reveal delay={0.05}>
                <Card icon={ShoppingCart} title="E-Commerce" desc="Premium identity + product storytelling + conversion web." />
              </Reveal>
              <Reveal delay={0.1}>
                <Card icon={Home} title="Real Estate" desc="Trust-first brand + listings UX + lead generation structure." />
              </Reveal>
              <Reveal delay={0.15}>
                <Card icon={Briefcase} title="Agencies & Services" desc="Positioning-led branding + portfolio + consultation flow." />
              </Reveal>
              <Reveal delay={0.2}>
                <Card icon={Globe} title="Travel & Tourism" desc="Brand identity + packages architecture + WhatsApp conversions." />
              </Reveal>
              <Reveal delay={0.25}>
                <Card icon={Heart} title="Healthcare & Wellness" desc="Clean, credible brand system + educational content design." />
              </Reveal>
              <Reveal delay={0.3}>
                <Card icon={Wifi} title="Technology & SaaS" desc="Modern brand system + product messaging + landing pages." />
              </Reveal>
              <Reveal delay={0.35}>
                <Card icon={Leaf} title="Organic / Natural Brands" desc="Premium packaging-ready branding + story-led content." />
              </Reveal>
              <Reveal delay={0.4}>
                <Card icon={DollarSign} title="Finance & Insurance" desc="Authority-first brand + clarity messaging + trust modules." />
              </Reveal>
              <Reveal delay={0.45}>
                <Card icon={GraduationCap} title="Education" desc="Brand system + course funnel + content strategy templates." />
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
                  <h2 className="text-3xl font-bold text-white mb-4">Ready to build a complete brand system?</h2>
                  <p className="text-lg text-zinc-300 mb-8">
                    We’ll create strategy + identity + website + templates — so your brand looks premium and grows consistently.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-zinc-950 hover:opacity-90 transition"
                    >
                      Start Brand Build <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href="/work?filter=brand-build"
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
                    >
                      View Case Studies
                    </a>
                  </div>
                  <div className="mt-6 text-xs text-zinc-500">© {year} • Brand Building — IT Meta Solutions</div>
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
