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
  LayoutGrid,
  Megaphone,
  BarChart3,
  PenTool,
  Images,
  Palette,
  Type,
  Layers,
  Package,
  Sticker,
  Shirt,
  BookOpen,
  Layout,
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
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import SeoContentFaq from "../../components/SeoContentFaq";
import SubpageVisualLayer from "../../components/SubpageVisualLayer";

/**
 * Graphic Designing Service / Expertise Page — IT Meta Solutions
 * Matches your template:
 * - Dark glass cards + gradients
 * - Scroll progress
 * - Parallax hero
 * - Sticky section nav (active state)
 *
 * Uses your brand style:
 * - Black + #5025d1 accent feel
 * - Evidence-friendly sections (placeholders, deliverables, process)
 */

const cx = (...c) => c.filter(Boolean).join(" ");

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
  subtitle:
    "We design brand identities, ad creatives, and social visuals that align with performance marketing.",
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
  {
    q: "Do you create ad creatives for Meta Ads?",
    a: "Yes. We design performance-focused creatives for scaling Meta Ads campaigns.",
  },
  {
    q: "Can you design complete brand identity systems?",
    a: "Yes. We deliver logo, color, typography, and brand guideline systems.",
  },
  {
    q: "Do you provide social media templates?",
    a: "Yes. We build reusable templates for reels, stories, and posts.",
  },
  {
    q: "Can you support ecommerce packaging?",
    a: "Yes. We design packaging and product visuals for ecommerce brands.",
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

export default function GraphicDesigningPage() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -100]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.85]);
  const heroRef = useRef(null);

  return (
    <>
      <Helmet>
        <title>Graphic Designing - IT Meta Solutions</title>
        <meta
          name="description"
          content="Graphic design for branding, Meta Ads creatives, social templates, and ecommerce-ready packaging systems."
        />
        <meta
          name="keywords"
          content="graphic design, brand identity, social media design, packaging design, logo design, marketing creatives, thumbnails, IT Meta Solutions"
        />
        <meta property="og:title" content="Graphic Designing - IT Meta Solutions" />
        <meta
          property="og:description"
          content="5+ years of graphic design: brand identity, social creatives, packaging, and conversion-ready marketing visuals."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://itmetasolutions.com/graphic-designing" />
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
                  <Pill icon={Palette}>Brand identity</Pill>
                  <Pill icon={Images}>Social creatives</Pill>
                  <Pill icon={Package}>Packaging</Pill>
                  <Pill icon={Layers}>Design systems</Pill>
                  <Pill icon={Zap}>Conversion visuals</Pill>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Graphic Designing</h1>
                <p className="mt-6 text-lg leading-relaxed text-zinc-300 max-w-3xl">
                  We design visuals that make brands look premium and sell better. With{" "}
                  <span className="text-white font-semibold">5+ years</span> of experience, we create brand systems,
                  social media designs, packaging, and marketing assets that stay consistent across every platform.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  <Stat icon={Palette} label="Consistency" value="Brand system" />
                  <Stat icon={Images} label="Output" value="Ads + social" />
                  <Stat icon={TrendingUp} label="Goal" value="More conversion" />
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
                title="Design that builds trust and improves conversion"
                desc="We don’t just make “pretty posts.” We build a design system that stays consistent, supports your marketing message, and makes people trust your brand at first glance."
              />
            </Reveal>

            <Reveal delay={0.05}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-8">
                <p className="text-base leading-relaxed text-zinc-300">
                  Most brands fail visually because every post looks different. We fix that with templates, typography rules,
                  color palettes, and layout systems — then apply them across social, ads, websites, and packaging.
                </p>
                <p className="mt-4 text-base leading-relaxed text-zinc-300">
                  You get a professional look, faster production, and better results because the brand becomes recognizable.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <Card
                  icon={ShieldCheck}
                  title="Trust-first visuals"
                  bullets={["Clean hierarchy & spacing", "Premium layout feel", "Clear offer communication"]}
                />
                <Card
                  icon={Target}
                  title="Marketing-ready"
                  bullets={["Ad creative templates", "Offer-led designs", "CTA-focused layout systems"]}
                />
                <Card
                  icon={Zap}
                  title="Fast production"
                  bullets={["Reusable templates", "Consistent components", "Easy monthly output"]}
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
                title="Everything your brand needs — designed properly"
                desc="From identity to social to packaging — we design assets that match the platform and the buyer’s mindset."
              />
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <Reveal delay={0.05}>
                <Card
                  icon={Palette}
                  title="Brand identity"
                  desc="A consistent identity system that works everywhere."
                  bullets={[
                    "Logo (primary + variations)",
                    "Color palette + typography",
                    "Brand patterns & icons",
                    "Brand guide (usage rules)",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.1}>
                <Card
                  icon={Images}
                  title="Social media design"
                  desc="Templates and creatives built for reach + conversion."
                  bullets={[
                    "Post templates (feed)",
                    "Story templates",
                    "Carousel layouts",
                    "Reels cover designs",
                    "Highlight covers",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.15}>
                <Card
                  icon={Megaphone}
                  title="Ads creative design"
                  desc="Conversion-first creatives that support paid campaigns."
                  bullets={[
                    "Offer creatives (static)",
                    "Before/after & proof layouts",
                    "Retargeting creatives",
                    "WhatsApp/lead form creatives",
                  ]}
                />
              </Reveal>

              <Reveal delay={0.2}>
                <Card
                  icon={Package}
                  title="Packaging & labels"
                  desc="Product packaging designed for trust, shelf appeal, and compliance."
                  bullets={[
                    "Label systems (jars/boxes)",
                    "Ingredient + benefit layouts",
                    "Barcode + batch space planning",
                    "Print-ready exports",
                  ]}
                />
              </Reveal>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <Reveal delay={0.05}>
                <Card
                  icon={Layout}
                  title="Website visuals"
                  desc="UI visuals that make websites look premium."
                  bullets={["Hero banners", "Icons & illustrations", "Section graphics", "Trust badges"]}
                />
              </Reveal>
              <Reveal delay={0.1}>
                <Card
                  icon={Sticker}
                  title="Print & marketing"
                  desc="Offline designs that match the brand."
                  bullets={["Flyers", "Brochures", "Standee/banners", "Business cards"]}
                />
              </Reveal>
              <Reveal delay={0.15}>
                <Card
                  icon={Shirt}
                  title="Merch / branding"
                  desc="Brand assets applied across physical touchpoints."
                  bullets={["T-shirt mockups", "Stickers", "Packaging inserts", "Uniform branding"]}
                />
              </Reveal>
            </div>
          </section>

          <Divider />

          {/* DESIGN SYSTEMS */}
          <section id="systems">
            <Reveal>
              <SectionTitle
                kicker="Design systems"
                title="A reusable template system for consistent output"
                desc="We create a library of components so your brand stays consistent and content production becomes easy."
              />
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <Reveal delay={0.05}>
                <Card
                  icon={Layers}
                  title="Template library"
                  desc="Reusable layouts for fast daily/weekly posting."
                  bullets={[
                    "Post templates (offers, proof, education)",
                    "Story templates (poll, FAQ, CTA)",
                    "Carousel grid system",
                    "Reels cover system",
                  ]}
                />
              </Reveal>
              <Reveal delay={0.1}>
                <Card
                  icon={Type}
                  title="Typography + layout rules"
                  desc="Rules that keep everything looking premium."
                  bullets={[
                    "Font hierarchy (H1/H2/body)",
                    "Spacing & grid rules",
                    "CTA placement standards",
                    "Consistent icon style",
                  ]}
                />
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#5025d1]/15 to-emerald-400/10 p-7">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-2xl">
                    <div className="text-sm font-semibold text-white">Outcome</div>
                    <div className="mt-1 text-sm text-zinc-300">
                      Consistency + speed. Your brand becomes recognizable, content production becomes easier, and ads look more professional.
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white">
                    <CheckCircle2 className="h-4 w-4" />
                    Systemized design
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
                title="Design skills that support marketing"
                desc="Visual design + marketing thinking — so everything looks good AND sells."
              />
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              <Reveal delay={0.05}>
                <Card
                  icon={PenTool}
                  title="Creative execution"
                  bullets={[
                    "Premium typography",
                    "Modern layout composition",
                    "Image selection & treatment",
                    "Iconography & visual language",
                    "Mockups & presentation",
                  ]}
                />
              </Reveal>
              <Reveal delay={0.1}>
                <Card
                  icon={Target}
                  title="Conversion-first design"
                  bullets={[
                    "Offer clarity hierarchy",
                    "Proof & trust layouts",
                    "CTA placement standards",
                    "Ad creative variants",
                    "Platform-specific formats",
                  ]}
                />
              </Reveal>
              <Reveal delay={0.15}>
                <Card
                  icon={BarChart3}
                  title="Marketing alignment"
                  bullets={[
                    "Content pillars visuals",
                    "Campaign creative sets",
                    "Seasonal launches",
                    "Brand consistency across channels",
                    "Creative testing mindset",
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
                title="Design for brands that need trust + premium visuals"
                desc="We design for industries where visuals directly impact credibility and conversion."
              />
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Reveal delay={0.05}>
                <Card icon={ShoppingCart} title="E-Commerce" desc="Product creatives, offers, UGC layouts, packaging support." />
              </Reveal>
              <Reveal delay={0.1}>
                <Card icon={Globe} title="Travel & Tourism" desc="Package creatives, highlights structure, story CTAs, trust posts." />
              </Reveal>
              <Reveal delay={0.15}>
                <Card icon={Home} title="Real Estate" desc="Property creatives, listing posts, inquiry flows, brochure design." />
              </Reveal>
              <Reveal delay={0.2}>
                <Card icon={Briefcase} title="Agencies & Services" desc="Credibility visuals, case studies, offer-led ads, branding." />
              </Reveal>
              <Reveal delay={0.25}>
                <Card icon={Heart} title="Healthcare & Wellness" desc="Educational trust content, safe visuals, premium identity." />
              </Reveal>
              <Reveal delay={0.3}>
                <Card icon={Wifi} title="Tech & SaaS" desc="Product graphics, feature layouts, presentation decks, icons." />
              </Reveal>
              <Reveal delay={0.35}>
                <Card icon={Leaf} title="Organic / Natural Brands" desc="Premium earthy identity, label systems, clean benefit visuals." />
              </Reveal>
              <Reveal delay={0.4}>
                <Card icon={DollarSign} title="Finance & Insurance" desc="Trust-first layouts, compliance-friendly clarity, premium tone." />
              </Reveal>
              <Reveal delay={0.45}>
                <Card icon={GraduationCap} title="Education" desc="Course creatives, enrollment posts, brochures, landing assets." />
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
                  <h2 className="text-3xl font-bold text-white mb-4">Need premium creatives for your brand?</h2>
                  <p className="text-lg text-zinc-300 mb-8">
                    Let’s build a consistent design system + marketing creatives that match your brand and convert better.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-zinc-950 hover:opacity-90 transition"
                    >
                      Get Started <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href="/work?filter=design"
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
                    >
                      View Design Work
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
