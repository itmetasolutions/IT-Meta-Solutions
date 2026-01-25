import React, { useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  ChevronRight,
  FileSearch,
  Gauge,
  LayoutGrid,
  Landmark,
  Megaphone,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
  Instagram,
  Target,
  MousePointerClick,
  Images,
  CheckCircle2,
  Globe,
  ScrollText,
  CalendarDays,
  MapPin,
  Phone,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

/**
 * Halla Gulla — Complete Brand Build (Tabbed)
 * Tabs:
 *  - Website (Foundation)
 *  - Meta Ads (Paid Marketing)
 *  - Social Media (IG/FB)
 *
 * Matches your reference theme:
 * - Dark, glass cards, gradients
 * - Scroll progress
 * - Parallax hero
 * - Reveal animations
 * - Sticky section subnav
 */

const cx = (...c) => c.filter(Boolean).join(" ");

const tabs = [
  { key: "website", label: "Website (Foundation)", icon: LayoutGrid },
  { key: "paid", label: "Meta Ads (Lead Gen)", icon: Megaphone },
  { key: "social", label: "Social Media (IG/FB)", icon: Instagram },
];

const inPageNav = [
  { label: "Overview", href: "#overview" },
  { label: "Tabs", href: "#tabs" },
  { label: "Screenshots", href: "#screens" },
  { label: "Results", href: "#results" },
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
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
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

        <p className="text-sm leading-relaxed text-zinc-300">{desc}</p>

        {bullets?.length ? (
          <ul className="mt-5 space-y-2 text-sm text-zinc-200">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-emerald-300" />
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

function Divider() {
  return <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />;
}

function StickySubnav() {
  return (
    <div className="sticky top-[72px] z-40 border-b border-white/10 bg-zinc-950/60 backdrop-blur">
      <Container className="py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-300">
            <Landmark className="h-4 w-4" />
            Halla Gulla — Brand Build
          </div>

          <div className="flex flex-wrap items-center gap-2 justify-end">
            {inPageNav.map((n) => (
              <AnchorLink
                key={n.href}
                href={n.href}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200 hover:bg-white/10"
              >
                {n.label}
              </AnchorLink>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

function Tabs({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((t) => {
        const Icon = t.icon;
        const isActive = active === t.key;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            className={cx(
              "inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm transition",
              isActive
                ? "border-white/20 bg-white text-zinc-950"
                : "border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10"
            )}
          >
            <Icon className={cx("h-4 w-4", isActive ? "" : "opacity-80")} />
            {t.label}
            {isActive ? <CheckCircle2 className="h-4 w-4" /> : null}
          </button>
        );
      })}
    </div>
  );
}

function Shot({ title, size, comment }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5">
          <Images className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-white">{title}</div>
          <div className="mt-1 text-xs text-zinc-400">{size}</div>
          <div className="mt-2 text-sm text-zinc-300">{comment}</div>
          <div className="mt-4 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-6 text-xs text-zinc-400">
            Screenshot placeholder — drop image here
          </div>
        </div>
      </div>
    </div>
  );
}

function TabPanel({ active }) {
  if (active === "website") {
    return (
      <div className="grid gap-6">
        <Reveal>
          <SectionTitle
            kicker="Website (Foundation)"
            title="A visual travel hub built for excitement + fast inquiries"
            desc="The website was built as the brand foundation: destinations, tours, gallery, transport, and quick inquiry paths — optimized for mobile-first traffic coming from Instagram, Facebook, and ads."
          />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          <Reveal delay={0.05}>
            <Card
              icon={LayoutGrid}
              title="Site structure"
              desc="Simple, conversion-friendly navigation for travel browsing."
              bullets={[
                "Home (brand vibe + destinations)",
                "Destinations pages",
                "Tours & packages",
                "Gallery",
                "Transport / cars section",
                "Contact & inquiry page",
              ]}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <Card
              icon={MousePointerClick}
              title="Clear CTAs"
              desc="Designed to reduce friction and turn interest into inquiry."
              bullets={["Book Your Trip", "Explore Destinations", "Contact Us", "WhatsApp-friendly inquiry flow"]}
            />
          </Reveal>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Reveal delay={0.05}>
            <Card
              icon={Gauge}
              title="Mobile-first UX"
              desc="Most travel audiences browse on mobile — layouts are built for quick scanning and one-tap action."
              bullets={["Mobile-first layout", "Fast sections", "Clear headings", "Low-friction inquiry paths"]}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <Card
              icon={Images}
              title="Visual storytelling"
              desc="Travel sells with visuals — so the website is image-led and vibe-focused."
              bullets={["Hero destination visuals", "Gallery section", "Destination listings", "Tour highlights"]}
            />
          </Reveal>

          <Reveal delay={0.15}>
            <Card
              icon={FileSearch}
              title="Ads-ready pages"
              desc="Built as a landing hub for paid traffic with minimal distractions."
              bullets={["Clean layout", "Strong CTAs", "Tour & destination clarity", "Quick contact options"]}
            />
          </Reveal>
        </div>

        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.06] to-white/[0.03] p-6">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <div className="text-sm font-semibold text-white">Website goals</div>
                <div className="mt-1 text-sm text-zinc-300">
                  Showcase destinations & tours, build travel excitement through visuals, and convert traffic into inquiries
                  using clear “Book Your Trip” actions.
                </div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
                <ChevronRight className="h-4 w-4" />
                Browse → inquire
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    );
  }

  if (active === "paid") {
    return (
      <div className="grid gap-6">
        <Reveal>
          <SectionTitle
            kicker="Meta Ads (Lead Gen)"
            title="Awareness → retargeting → leads funnel on a controlled budget"
            desc="We built a complete Meta Ads setup with travel-interest targeting and lead capture through WhatsApp + instant lead forms — then validated lead volume and cost using a 3-day controlled test."
          />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          <Reveal delay={0.05}>
            <Card
              icon={ShieldCheck}
              title="Meta setup"
              desc="Performance-ready configuration so tracking and lead capture stays reliable."
              bullets={[
                "Meta Business Manager",
                "Ad account configuration",
                "Audience targeting (travel interest based)",
                "WhatsApp integration",
                "Instant lead form integration",
                "Campaign tracking & optimization",
              ]}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <Card
              icon={Target}
              title="Targeting approach"
              desc="Built around travel intent for Pakistan tourism."
              bullets={[
                "Travel & tourism interests",
                "Northern areas intent",
                "Engagers retargeting (IG/FB)",
                "Video viewers retargeting",
              ]}
            />
          </Reveal>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Reveal delay={0.05}>
            <Card
              icon={Megaphone}
              title="Awareness campaign"
              desc="High-quality destination visuals and short travel reels for fast traction."
              bullets={["Destination visuals", "Short reels", "Youth hooks", "Brand vibe storytelling"]}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <Card
              icon={Users}
              title="Engagement retargeting"
              desc="Warm audiences who interacted with content were retargeted with stronger offers."
              bullets={["Video viewers", "Instagram engagers", "Facebook engagers", "Profile visitors"]}
            />
          </Reveal>

          <Reveal delay={0.15}>
            <Card
              icon={MousePointerClick}
              title="Lead campaigns"
              desc="Conversion ads optimized for inquiries and booking intent."
              bullets={["Click-to-WhatsApp", "Instant lead forms", "Clear “Book Your Trip” message", "Offer + urgency hooks"]}
            />
          </Reveal>
        </div>

        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-emerald-400/10 p-6">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <div className="text-sm font-semibold text-white">Performance snapshot (3-day test)</div>
                <div className="mt-1 text-sm text-zinc-300">
                  Total spend: <span className="text-white font-semibold">5,500 PKR</span> • Duration:{" "}
                  <span className="text-white font-semibold">3 days</span> • Leads:{" "}
                  <span className="text-white font-semibold">67</span> • Cost per lead:{" "}
                  <span className="text-white font-semibold">~78 PKR</span> via WhatsApp + instant forms.
                </div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950">
                <Wallet className="h-4 w-4" />
                Low CPL validated
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          <Reveal delay={0.05}>
            <Card
              icon={MessageSquareText}
              title="Creative & copy system"
              desc="Energetic, youth-focused tone with strong travel hooks and clear value."
              bullets={[
                "Affordable trips messaging",
                "Group & family tours angle",
                "Scenic destinations highlights",
                "Urgency CTAs (Limited Seats / Book Now)",
                "Visual-first storytelling",
              ]}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <Card
              icon={BarChart3}
              title="Lead capture & handling"
              desc="Leads routed to WhatsApp and forms for fast response and better close rates."
              bullets={[
                "WhatsApp inquiries",
                "Instant Meta lead forms",
                "High-intent routing",
                "Scalable for seasonal travel campaigns",
              ]}
            />
          </Reveal>
        </div>
      </div>
    );
  }

  // social
  return (
    <div className="grid gap-6">
      <Reveal>
        <SectionTitle
          kicker="Social Media (IG/FB)"
          title="A youthful, energetic travel identity built for consistency"
          desc="We optimized Instagram and Facebook profiles, built a clear content system, and created highlight categories to support conversion — aligning organic storytelling with paid messaging for stronger recall."
        />
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2">
        <Reveal delay={0.05}>
          <Card
            icon={Instagram}
            title="Platforms"
            desc="Brand presence across high-intent channels."
            bullets={["Instagram", "Facebook", "WhatsApp-first inquiry behavior"]}
          />
        </Reveal>

        <Reveal delay={0.1}>
          <Card
            icon={ShieldCheck}
            title="Brand setup"
            desc="Profiles optimized for clarity, trust, and quick action."
            bullets={["Bio + category", "CTA buttons", "Consistent brand colors", "Travel visual style"]}
          />
        </Reveal>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Reveal delay={0.05}>
          <Card
            icon={CalendarDays}
            title="Content pillars"
            desc="Content designed to inspire, inform, and convert."
            bullets={[
              "Destination showcases",
              "Tour promotions",
              "Travel reels",
              "Engagement content (polls/Q&A)",
            ]}
          />
        </Reveal>

        <Reveal delay={0.1}>
          <Card
            icon={ScrollText}
            title="Tone & messaging"
            desc="Youthful hooks + clear value in short, scannable formats."
            bullets={["Energetic voice", "Visual-first storytelling", "Clear offers", "Strong CTAs"]}
          />
        </Reveal>

        <Reveal delay={0.15}>
          <Card
            icon={MapPin}
            title="Highlights structure"
            desc="Highlights organized around travel intent for fast browsing."
            bullets={["Tours", "Destinations", "Gallery", "Transport"]}
          />
        </Reveal>
      </div>

      <Reveal>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.06] to-white/[0.03] p-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold text-white">Why this works</div>
              <div className="mt-1 text-sm text-zinc-300">
                Consistent travel identity + strong visuals makes audiences warmer — improving retargeting performance and
                reducing lead costs over time.
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
              <ChevronRight className="h-4 w-4" />
              Organic → ads synergy
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default function HallaGullaCaseStudy() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [activeTab, setActiveTab] = useState("website");

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, -60]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.88]);
  const heroRef = useRef(null);

  return (
    <>
      <Helmet>
        <title>Halla Gulla Case Study - Complete Travel Brand Build | IT Meta Solutions</title>
        <meta name="description" content="Explore Halla Gulla travel brand case study - a complete digital marketing solution with website development, social media management, and Meta Ads generating 67 leads in 3 days." />
        <meta name="keywords" content="Halla Gulla, travel brand case study, Pakistan tourism, Meta Ads, social media marketing, website development, travel agency branding, IT Meta Solutions" />
        <meta property="og:title" content="Halla Gulla Case Study - Complete Travel Brand Build | IT Meta Solutions" />
        <meta property="og:description" content="Explore Halla Gulla travel brand case study - a complete digital marketing solution with website development, social media management, and Meta Ads generating 67 leads in 3 days." />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://itmetasolutions.com/case-study/halla-gulla" />
        <meta property="og:url" content="https://itmetasolutions.com/case-study/halla-gulla" />
        <meta property="og:image" content="https://itmetasolutions.com/favicon.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Halla Gulla Case Study - Complete Travel Brand Build | IT Meta Solutions" />
        <meta name="twitter:description" content="Explore Halla Gulla travel brand case study - a complete digital marketing solution with website development, social media management, and Meta Ads generating 67 leads in 3 days." />
        <meta name="twitter:image" content="https://itmetasolutions.com/favicon.webp" />
      </Helmet>

      <div className="min-h-screen text-zinc-100 mb-16">
      <ScrollProgress />

      {/* Background accents */}
      <GradientBlob className="left-[-120px] top-[-120px] h-[520px] w-[520px]" />
      <GradientBlob className="right-[-160px] top-[220px] h-[520px] w-[520px] bg-[radial-gradient(closest-side,rgba(16,185,129,0.55),rgba(16,185,129,0))]" />

      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden">
        <Container className="pb-10 pt-16 sm:pb-16 sm:pt-24">
          <motion.div style={{ y: heroY, opacity: heroOpacity }}>
            <Reveal>
              <div className="flex flex-wrap items-center gap-2">
                <Pill icon={Globe}>Pakistan tourism</Pill>
                <Pill icon={LayoutGrid}>Website</Pill>
                <Pill icon={Instagram}>Social</Pill>
                <Pill icon={Megaphone}>Meta Ads</Pill>
                <Pill icon={ShieldCheck}>Lead generation</Pill>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                Halla Gulla — complete travel brand build across website, social & Meta Ads
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                A youthful, energetic tours & travel brand focused on Pakistan tourism — built for digital visibility,
                strong travel storytelling, and a performance-driven lead system to generate real inquiries at low cost.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <Reveal delay={0.1}>
                <Stat icon={LayoutGrid} label="Foundation" value="Modern travel website" />
              </Reveal>
              <Reveal delay={0.15}>
                <Stat icon={Instagram} label="Presence" value="IG + Facebook" />
              </Reveal>
              <Reveal delay={0.2}>
                <Stat icon={Megaphone} label="Performance" value="67 leads (3 days)" />
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.03] p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-2xl">
                    <div className="text-sm font-semibold text-white">Live website</div>
                    <div className="mt-1 text-sm text-zinc-300">
                      Use this page as your portfolio “Complete Brand Build” case study for Halla Gulla.
                    </div>
                  </div>
                  <a
                    href="https://hallagulla.pk"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:opacity-90"
                  >
                    Visit Website <ArrowRight className="h-4 w-4" />
                  </a>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {[
                    { icon: MapPin, title: "Destinations", desc: "Northern areas listings + travel vibe layout." },
                    { icon: Phone, title: "Quick inquiry", desc: "Fast contact + WhatsApp-friendly actions." },
                    { icon: BarChart3, title: "Ads funnel", desc: "Awareness → retargeting → leads system." },
                  ].map((b) => (
                    <div
                      key={b.title}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 h-full flex flex-col justify-center"
                    >
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5">
                          <b.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{b.title}</div>
                          <div className="mt-1 text-sm text-zinc-300">{b.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </motion.div>
        </Container>
      </section>

      {/* Sticky anchors */}
      <StickySubnav />

      <Container>
        <Divider />
      </Container>

      {/* Overview */}
      <section id="overview" className="scroll-mt-24">
        <Container className="pb-16">
          <Reveal>
            <SectionTitle
              kicker="Brand overview"
              title="Youthful travel brand with a full-funnel lead engine"
              desc="Halla Gulla offers northern areas tours, group trips, family tours, and customized travel experiences. This build focused on creating a recognizable identity, a conversion-ready website, and a repeatable Meta Ads system that generates qualified inquiries at low cost."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <Reveal delay={0.05}>
              <Card
                icon={Globe}
                title="Industry"
                desc="Tours • Travel • Pakistan Tourism"
                bullets={["Youth-focused vibe", "Visual storytelling", "Seasonal & destination-driven demand"]}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Card
                icon={LayoutGrid}
                title="Scope"
                desc="Website • Social • Meta Ads • Lead Gen"
                bullets={["Modern website structure", "IG/FB brand setup", "Meta funnel build", "WhatsApp + lead forms"]}
              />
            </Reveal>
            <Reveal delay={0.15}>
              <Card
                icon={ShieldCheck}
                title="Objectives"
                desc="Visibility + excitement + inquiries"
                bullets={["Recognizable brand", "Mobile-first website", "Awareness → leads funnel", "Low-budget validation"]}
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <Container>
        <Divider />
      </Container>

      {/* Tabs */}
      <section id="tabs" className="scroll-mt-24">
        <Container className="pb-16">
          <Reveal>
            <SectionTitle
              kicker="Brand build sections"
              title="Everything organized into three deliverables"
              desc="Switch between Website, Meta Ads, and Social Media — each tab shows the structure, features, and outcomes."
            />
          </Reveal>

          <div className="mt-8">
            <Reveal delay={0.05}>
              <Tabs active={activeTab} onChange={setActiveTab} />
            </Reveal>
          </div>

          <div className="mt-8">
            <TabPanel active={activeTab} />
          </div>
        </Container>
      </section>

      <Container>
        <Divider />
      </Container>

      {/* Screenshots */}
      <section id="screens" className="scroll-mt-24">
        <Container className="pb-16">
          <Reveal>
            <SectionTitle
              kicker="Screenshot placeholders"
              title="Drop your proof here for a high-trust portfolio"
              desc="These placeholders match your requested sizes so you can swap images in later (website, mobile, social, and Ads Manager)."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <Reveal delay={0.05}>
              <Shot
                title="[WEBSITE HOME PAGE]"
                size="1920 × 1080 (Desktop)"
                comment="Hero banner, destinations, travel vibe"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Shot
                title="[DESTINATIONS PAGE]"
                size="1440 × 900"
                comment="Northern areas tours & travel listings"
              />
            </Reveal>
            <Reveal delay={0.15}>
              <Shot
                title="[MOBILE VIEW]"
                size="390 × 844"
                comment="Mobile-first travel browsing experience"
              />
            </Reveal>
            <Reveal delay={0.2}>
              <Shot
                title="[INSTAGRAM PROFILE]"
                size="1080 × 1080"
                comment="Bio, highlights, grid overview"
              />
            </Reveal>
            <Reveal delay={0.25}>
              <Shot
                title="[REELS & POSTS]"
                size="1080 × 1920"
                comment="Travel reels & destination visuals"
              />
            </Reveal>
            <Reveal delay={0.3}>
              <Shot
                title="[STORY HIGHLIGHTS]"
                size="1080 × 1920"
                comment="Tours, destinations & transport highlights"
              />
            </Reveal>
            <Reveal delay={0.35}>
              <Shot
                title="[ADS MANAGER OVERVIEW]"
                size="1920 × 1080"
                comment="Campaign spend, reach & leads"
              />
            </Reveal>
            <Reveal delay={0.4}>
              <Shot
                title="[LEADS PERFORMANCE]"
                size="1440 × 900"
                comment="67 leads with cost per lead shown"
              />
            </Reveal>
            <Reveal delay={0.45}>
              <Shot
                title="[WHATSAPP AD PREVIEW]"
                size="1080 × 1920"
                comment="Click-to-WhatsApp travel ad creative"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <Container>
        <Divider />
      </Container>

      {/* Results */}
      <section id="results" className="scroll-mt-24">
        <Container>
          <Reveal>
            <SectionTitle
              kicker="Results"
              title="67 potential leads in 3 days on a controlled test budget"
              desc="A complete brand presence (website + social + ads) with a validated Meta funnel generating travel inquiries via WhatsApp and instant lead forms at a very cost-effective CPL."
              align="center"
            />
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            <Reveal delay={0.05}>
              <Stat icon={Wallet} label="Total ad spend" value="5,500 PKR" />
            </Reveal>
            <Reveal delay={0.1}>
              <Stat icon={CalendarDays} label="Campaign duration" value="3 days" />
            </Reveal>
            <Reveal delay={0.15}>
              <Stat icon={Users} label="Potential leads" value="67" />
            </Reveal>
            <Reveal delay={0.2}>
              <Stat icon={Target} label="Cost per lead" value="~78 PKR" />
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-emerald-400/10 p-6">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div className="max-w-2xl">
                  <div className="text-sm font-semibold text-white">Scalable next steps</div>
                  <div className="mt-1 text-sm text-zinc-300">
                    Scale this system seasonally by duplicating the funnel and swapping destination offers, creatives, and
                    landing page sections for peak travel windows.
                  </div>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:opacity-90"
                >
                  Request a proposal <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 text-center text-xs text-zinc-500">© {year} • Halla Gulla brand build</div>
        </Container>
      </section>
    </div>
    </>
  );
}