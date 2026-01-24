import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BedDouble,
  ChevronRight,
  FileSearch,
  Gauge,
  LayoutGrid,
  Landmark,
  Megaphone,
  MessageSquareText,
  Phone,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users,
  Wallet,
  Instagram,
  Facebook,
  Target,
  MousePointerClick,
  Images,
  CheckCircle2,
  Globe,
  ScrollText,
  CalendarDays,
} from "lucide-react";

/**
 * United Muslim Travels — Complete Brand Build (Tabbed)
 * Tabs:
 *  - Website & SEO
 *  - Paid Marketing
 *  - Social Media Management
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
  { key: "website", label: "Website & SEO", icon: LayoutGrid },
  { key: "paid", label: "Paid Marketing", icon: Megaphone },
  { key: "social", label: "Social Media Management", icon: Instagram },
];

const inPageNav = [
  { label: "Overview", href: "#overview" },
  { label: "Tabs", href: "#tabs" },
  { label: "Screenshots", href: "#screens" },
  { label: "Results", href: "#results" },
];

function Container({ children, className }) {
  return (
    <div className={cx("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>
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

function SectionTitle({ kicker, title, desc, align = "left" }) {
  return (
    <div className={cx("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
        <Sparkles className="h-3.5 w-3.5" />
        {kicker}
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
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
    <div
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-6 pb-8 h-full flex"
    >
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
            United Muslim Travels — Brand Build
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
            kicker="Website & SEO"
            title="A conversion-ready trust hub for Hajj & Umrah leads"
            desc="The website was built as the foundation of the brand: clear package architecture, hotel/accommodation detail pages, and fast inquiry + WhatsApp conversion paths — optimized for mobile-first traffic from ads and social."
          />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          <Reveal delay={0.05}>
            <Card
              icon={LayoutGrid}
              title="Site architecture"
              desc="A structure that makes pilgrimage services easy to find and compare."
              bullets={[
                "Home (trust messaging + brand)",
                "Umrah Packages",
                "Hajj Packages",
                "Ramadan Packages",
                "Hotels / accommodation pages",
                "Visa + Transport",
                "Contact & inquiry forms",
              ]}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Card
              icon={Ticket}
              title="Package detail templates"
              desc="Dedicated package pages designed for scannability and quick action."
              bullets={[
                "Duration",
                "Inclusions",
                "Hotel distance from Haram",
                "Pricing cues",
                "Call / WhatsApp CTAs",
              ]}
            />
          </Reveal>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Reveal delay={0.05}>
            <Card
              icon={Gauge}
              title="Mobile-first UX"
              desc="Most leads arrive via mobile — so layouts are optimized for quick reading and one-tap actions."
              bullets={["Sticky CTAs", "Readable sections", "Fast navigation", "WhatsApp-first flow"]}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Card
              icon={BedDouble}
              title="Hotels & amenities"
              desc="Accommodation pages set expectations and support decision-making for families and elders."
              bullets={["Amenity lists", "Galleries", "Proximity context", "Linked from packages"]}
            />
          </Reveal>
          <Reveal delay={0.15}>
            <Card
              icon={FileSearch}
              title="SEO structure"
              desc="Built for intent-based search around packages, seasons, and locations."
              bullets={["Package hubs", "Long-tail package pages", "Service pages", "Clean internal linking"]}
            />
          </Reveal>
        </div>

        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.06] to-white/[0.03] p-6">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <div className="text-sm font-semibold text-white">Website goals</div>
                <div className="mt-1 text-sm text-zinc-300">
                  Act as a trust hub for ads & social traffic, explain Umrah/Hajj/Ramadan packages clearly, and provide fast
                  inquiry + WhatsApp conversion paths.
                </div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
                <ChevronRight className="h-4 w-4" />
                Info → inquiry
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
            kicker="Paid Marketing"
            title="Meta Ads funnel built for low-budget, high-intent inquiries"
            desc="We built a complete Meta setup with domain verification, pixel foundations, WhatsApp + instant lead forms, and a 3-stage funnel (Awareness → Retargeting → Leads) designed for Hajj/Umrah intent targeting."
          />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          <Reveal delay={0.05}>
            <Card
              icon={ShieldCheck}
              title="Meta setup"
              desc="Professional infrastructure so ads and tracking remain reliable."
              bullets={[
                "Meta Business Manager",
                "Domain verification",
                "Ad account setup",
                "Pixel foundations",
                "WhatsApp + lead form integration",
              ]}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Card
              icon={Users}
              title="Audience segmentation"
              desc="Interest + behavior-based segments optimized for pilgrimage intent."
              bullets={["Umrah/Hajj interests", "Ramadan seasonal intent", "Engagers retargeting", "Warm audiences"]}
            />
          </Reveal>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Reveal delay={0.05}>
            <Card
              icon={Megaphone}
              title="Awareness campaign"
              desc="Introduce the brand with respectful Islamic visuals and emotional messaging."
              bullets={["Image + video creatives", "Umrah calling copy", "Ramadan blessings angle", "Trust messaging"]}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Card
              icon={Target}
              title="Retargeting"
              desc="Re-engage warm users who watched videos or interacted with the page."
              bullets={["Video viewers", "Page engagers", "Profile visitors", "Reminder creatives"]}
            />
          </Reveal>
          <Reveal delay={0.15}>
            <Card
              icon={MousePointerClick}
              title="Lead campaigns"
              desc="Conversion-focused ads sending users to WhatsApp and instant forms."
              bullets={["Click-to-WhatsApp", "Instant lead forms", "Clear package messaging", "Direct CTAs"]}
            />
          </Reveal>
        </div>

        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-emerald-400/10 p-6">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <div className="text-sm font-semibold text-white">Performance snapshot (test budget)</div>
                <div className="mt-1 text-sm text-zinc-300">
                  Total spend: <span className="text-white font-semibold">500</span> (local PKR-based test budget) •
                  Leads: <span className="text-white font-semibold">200+</span> via WhatsApp chats + instant forms •
                  Strong relevance due to niche targeting.
                </div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950">
                <Wallet className="h-4 w-4" />
                Low CPL system
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          <Reveal delay={0.05}>
            <Card
              icon={MessageSquareText}
              title="Creative & copy strategy"
              desc="A respectful Islamic tone with Urdu + English mixed copy and urgency-based CTAs."
              bullets={["Licensed travel trust", "Hotels near Haram", "Complete Umrah support", "Limited seats", "Ramadan specials"]}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Card
              icon={BarChart3}
              title="Lead handling"
              desc="Leads routed to WhatsApp and forms for fast responses and better close rates."
              bullets={["WhatsApp conversations", "Instant form follow-ups", "Package-specific intent", "Scalable for Hajj/Ramadan"]}
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
          kicker="Social Media Management"
          title="Consistent Islamic identity across Instagram & Facebook"
          desc="We optimized profiles, defined content pillars, and built a consistent brand style to support trust and conversion — aligning organic content with ad messaging for stronger recall."
        />
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2">
        <Reveal delay={0.05}>
          <Card
            icon={Instagram}
            title="Platforms"
            desc="Brand presence across high-intent social channels."
            bullets={["Instagram", "Facebook", "WhatsApp-first conversion"]}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Card
            icon={ShieldCheck}
            title="Brand setup"
            desc="Profile optimization and visual consistency built for trust."
            bullets={["Bio + category", "Contact buttons", "Consistent logo/colors", "Islamic theme cues"]}
          />
        </Reveal>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Reveal delay={0.05}>
          <Card
            icon={CalendarDays}
            title="Content pillars"
            desc="Content designed to inform, build trust, and convert."
            bullets={["Package promotions", "Islamic education", "Ziyarat & history", "Testimonials/trust posts"]}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Card
            icon={ScrollText}
            title="Tone & messaging"
            desc="Respectful, spiritual, and easy to understand for all age groups."
            bullets={["Urdu + English mix", "Trust messaging", "Clear CTAs", "Seasonal campaigns"]}
          />
        </Reveal>
        <Reveal delay={0.15}>
          <Card
            icon={Ticket}
            title="Highlights structure"
            desc="Highlights that answer common pilgrim intents quickly."
            bullets={["Umrah Packages", "Hajj Packages", "Hotels", "Ziyarat"]}
          />
        </Reveal>
      </div>

      <Reveal>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.06] to-white/[0.03] p-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold text-white">Why this works</div>
              <div className="mt-1 text-sm text-zinc-300">
                Consistent identity + clear offers + trust messaging makes organic traffic warmer — improving retargeting and
                lowering ad costs.
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

export default function UnitedMuslimTravelsCaseStudy() {
  useEffect(() => {
    document.title = "ITMS | United Muslim Travels";
  }, []);

  const year = useMemo(() => new Date().getFullYear(), []);
  const [activeTab, setActiveTab] = useState("website");

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, -60]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.88]);
  const heroRef = useRef(null);

  return (
    <div className="min-h-screen text-zinc-100 mb-16 overflow-x-hidden">
      <ScrollProgress />

      {/* Background accents */}
      <GradientBlob className="inset-0 bg-[radial-gradient(closest-side,rgba(99,102,241,0.6),rgba(99,102,241,0))] bg-[length:40vw_40vw] sm:bg-[length:520px_520px] bg-left-top" />
      <GradientBlob className="inset-0 bg-[radial-gradient(closest-side,rgba(16,185,129,0.55),rgba(16,185,129,0))] bg-[length:40vw_40vw] sm:bg-[length:520px_520px] bg-right-top" />

      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden">
        <Container className="pb-10 pt-16 sm:pb-16 sm:pt-24">
          <motion.div style={{ y: heroY, opacity: heroOpacity }}>
            <Reveal>
              <div className="flex flex-wrap items-center gap-2">
                <Pill icon={Landmark}>Islamic travel brand</Pill>
                <Pill icon={LayoutGrid}>Website</Pill>
                <Pill icon={Instagram}>Social</Pill>
                <Pill icon={Megaphone}>Meta Ads</Pill>
                <Pill icon={ShieldCheck}>Lead generation</Pill>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                United Muslim Travels — complete brand build across website, social & Meta Ads
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                A faith-focused travel brand for Hajj, Umrah, Ramadan, visa, hotels, and transport — built to increase trust,
                visibility, and consistent inquiries in a competitive religious travel market.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <Reveal delay={0.1}>
                <Stat icon={LayoutGrid} label="Foundation" value="Conversion website" />
              </Reveal>
              <Reveal delay={0.15}>
                <Stat icon={Instagram} label="Presence" value="IG + Facebook" />
              </Reveal>
              <Reveal delay={0.2}>
                <Stat icon={Megaphone} label="Growth" value="Meta leads" />
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.03] p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-2xl">
                    <div className="text-sm font-semibold text-white">Live website</div>
                    <div className="mt-1 text-sm text-zinc-300">Use this page as your portfolio “Complete Brand Build” case study.</div>
                  </div>
                  <a
                    href="https://unitedmuslimtravels.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:opacity-90"
                  >
                    Visit Website <ArrowRight className="h-4 w-4" />
                  </a>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {[
                    { icon: Ticket, title: "Packages", desc: "Hajj, Umrah, Ramadan with structured detail pages." },
                    { icon: Phone, title: "WhatsApp paths", desc: "Fast conversion routes for mobile-first leads." },
                    { icon: BarChart3, title: "Ad funnel", desc: "Awareness → retargeting → leads system." },
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
              title="Trust-first Islamic travel brand with full-funnel lead generation"
              desc="United Muslim Travels offers Hajj, Umrah, Ramadan packages, visa support, hotels, and transport. This build focused on credibility, consistent identity, and a repeatable ads system that generates qualified inquiries on a low budget."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <Reveal delay={0.05}>
              <Card
                icon={Landmark}
                title="Industry"
                desc="Hajj • Umrah • Islamic Travel Services"
                bullets={["Spiritually respectful tone", "Competitive market", "Seasonal demand"]}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Card
                icon={LayoutGrid}
                title="Scope"
                desc="Website • Social • Meta Ads • Lead Gen"
                bullets={["Conversion website", "IG/FB brand identity", "Meta setup + funnel", "WhatsApp integration"]}
              />
            </Reveal>
            <Reveal delay={0.15}>
              <Card
                icon={ShieldCheck}
                title="Objectives"
                desc="Visibility + trust + consistent inquiries"
                bullets={["Credible brand", "Conversion-ready website", "Awareness → Leads funnel", "Low-budget performance"]}
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
              desc="Switch between Website & SEO, Paid Marketing, and Social Media Management — each tab shows the full structure, features, and outcomes."
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
              title="Drop your evidence here for a high-trust portfolio"
              desc="These placeholders match your requested sizes so you can swap images in later (desktop, package page, mobile, social, ads manager)."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <Reveal delay={0.05}>
              <Shot
                title="[WEBSITE HOME PAGE]"
                size="1920 × 1080 (Desktop)"
                comment="Hero section, trust messaging, Umrah focus"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Shot
                title="[PACKAGE DETAIL PAGE]"
                size="1440 × 900"
                comment="Umrah package with itinerary & inquiry CTA"
              />
            </Reveal>
            <Reveal delay={0.15}>
              <Shot
                title="[MOBILE VIEW]"
                size="390 × 844"
                comment="Mobile-first layout with WhatsApp CTA"
              />
            </Reveal>
            <Reveal delay={0.2}>
              <Shot
                title="[INSTAGRAM PROFILE]"
                size="1080 × 1080"
                comment="Bio, highlights, grid preview"
              />
            </Reveal>
            <Reveal delay={0.25}>
              <Shot
                title="[CONTENT POSTS GRID]"
                size="1080 × 1350"
                comment="Package posts + Islamic informational content"
              />
            </Reveal>
            <Reveal delay={0.3}>
              <Shot
                title="[STORY HIGHLIGHTS]"
                size="1080 × 1920"
                comment="Umrah, Hajj, Hotels highlights"
              />
            </Reveal>
            <Reveal delay={0.35}>
              <Shot
                title="[ADS MANAGER DASHBOARD]"
                size="1920 × 1080"
                comment="Campaign overview with spend & results"
              />
            </Reveal>
            <Reveal delay={0.4}>
              <Shot
                title="[LEADS REPORT]"
                size="1440 × 900"
                comment="200+ leads shown in Ads Manager"
              />
            </Reveal>
            <Reveal delay={0.45}>
              <Shot
                title="[WHATSAPP AD PREVIEW]"
                size="1080 × 1920"
                comment="Click-to-WhatsApp creative"
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
              title="200+ qualified leads on a minimal test budget"
              desc="A complete brand presence (website + social + ads) with verified Meta setup, clear package architecture, and a funnel that consistently generates Umrah/Hajj inquiries."
              align="center"
            />
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Reveal delay={0.05}>
              <Stat icon={Wallet} label="Test ad spend" value="500" />
            </Reveal>
            <Reveal delay={0.1}>
              <Stat icon={Users} label="Potential leads" value="200+" />
            </Reveal>
            <Reveal delay={0.15}>
              <Stat icon={Phone} label="Conversions" value="WhatsApp + forms" />
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-emerald-400/10 p-6">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div className="max-w-2xl">
                  <div className="text-sm font-semibold text-white">Scalable next steps</div>
                  <div className="mt-1 text-sm text-zinc-300">
                    This system scales into Hajj peak season and Ramadan campaigns by duplicating the funnel and swapping offers,
                    creatives, and package pages.
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

          <div className="mt-10 text-center text-xs text-zinc-500">© {year} • United Muslim Travels brand build</div>
        </Container>
      </section>
    </div>
  );
}
