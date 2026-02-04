import React, { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import SeoContentFaq from "../../components/SeoContentFaq";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  ChevronRight,
  FileSearch,
  Gauge,
  Globe,
  Layout,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
  Home,
  Search,
  SlidersHorizontal,
  ClipboardList,
  UserCheck,
  Briefcase,
  Star,
  CheckCircle2,
  MousePointerClick,
} from "lucide-react";

/**
 * More Homes Group — Case Study (UPDATED to match your NEW Home theme)
 * - Primary: #5025d1 (ITMS purple)
 * - Dark glass + gradients + blobs
 * - Scroll progress bar
 * - Parallax hero
 * - Reveal animations
 * - Sticky subnav (anchors)
 * - Equal-height cards in grids (items-stretch + h-full + flex)
 * - Mobile safe (overflow-x-hidden)
 */

const cx = (...c) => c.filter(Boolean).join(" ");

/* ==================== REDUCED MOTION ==================== */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!m) return;
    const onChange = () => setReduced(!!m.matches);
    onChange();
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

const nav = [
  { label: "Overview", href: "#overview" },
  { label: "Goals", href: "#goals" },
  { label: "Journeys", href: "#journeys" },
  { label: "What We Built", href: "#built" },
  { label: "SEO & Structure", href: "#seo" },
  { label: "Results", href: "#results" },
];

/* ==================== UI ==================== */
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

function GradientBlob({ className, color = "rgba(80,37,209,0.20)" }) {
  return (
    <div
      aria-hidden
      className={cx("pointer-events-none absolute -z-10 blur-3xl", className)}
      style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }}
    />
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 18, mass: 0.5 });
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-[#5025d1] via-purple-500 to-pink-500"
      style={{ scaleX: w }}
    />
  );
}

function Reveal({ children, delay = 0, className }) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { y: 16 }}
      whileInView={reduced ? {} : { y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function Badge({ children, icon: Icon }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
      {Icon ? <Icon className="h-4 w-4" /> : null}
      {children}
    </span>
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
    <div className={cx("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <div className={cx("inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200", align === "center" && "mx-auto")}>
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
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-5 h-full flex flex-col justify-center backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-3">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="text-2xl font-semibold text-white">{value}</div>
          <div className="text-sm text-zinc-300">{label}</div>
        </div>
      </div>
    </div>
  );
}

function Card({ icon: Icon, title, desc, bullets, delay = 0 }) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { y: 16 }}
      whileInView={reduced ? {} : { y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      whileHover={reduced ? {} : { y: -8, transition: { duration: 0.2 } }}
      className="
        group relative overflow-hidden
        rounded-3xl border border-white/10
        bg-gradient-to-br from-white/[0.08] to-white/[0.02]
        p-6 pb-8
        h-full
        flex
        backdrop-blur-sm
      "
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-[#5025d1]/25 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-purple-500/20 blur-3xl" />
      </div>

      <div className="relative flex h-full flex-col">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-3">
            <Icon className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>

        <p className="text-sm leading-relaxed text-zinc-300">{desc}</p>

        {bullets?.length ? (
          <ul className="mt-5 space-y-2 text-sm text-zinc-200">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                <span className="opacity-90">{b}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto pt-4" />
      </div>
    </motion.div>
  );
}

function Divider() {
  return <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />;
}

function StickySubnav() {
  return (
    <div className="sticky top-[72px] z-40 border-b border-white/10 bg-black/50 backdrop-blur">
      <Container className="py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-300">
            <Building2 className="h-4 w-4 text-[#5025d1]" />
            More Homes Group — Case Study
          </div>

          <div className="flex flex-wrap items-center gap-2 justify-end">
            {nav.map((n) => (
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

const seoContent = {
  kicker: "Case Study",
  title: "Property Lettings Platform for Lead Generation",
  subtitle:
    "More Homes Group launched a real estate platform with clear tenant and landlord journeys.",
  paragraphs: [
    "We built advanced search, listing architecture, and service pages to improve discovery and trust.",
    "The platform supports lead generation and scalable property management workflows.",
  ],
  bullets: [
    "Real estate platform and listings UX",
    "Lead generation flows for tenants and landlords",
    "Conversion-focused landing and service pages",
    "Scalable property management architecture",
  ],
};

const seoFaqs = [
  {
    q: "What was built for More Homes Group?",
    a: "A full property lettings platform with search, listings, and service journeys.",
  },
  {
    q: "Does it support lead generation?",
    a: "Yes. Tenant and landlord flows were designed to convert inquiries.",
  },
  {
    q: "Can you build similar real estate platforms?",
    a: "Yes. We tailor architecture, UX, and lead capture to your market.",
  },
];

/* ==================== PAGE ==================== */
export default function MoreHomesGroupCaseStudy() {
  const reduced = usePrefersReducedMotion();
  const year = useMemo(() => new Date().getFullYear(), []);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, reduced ? 0 : -60]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.9]);
  const heroRef = useRef(null);

  return (
    <>
      <Helmet>
        <title>More Homes Group Case Study - Property Lettings Platform | IT Meta Solutions</title>
        <meta
          name="description"
          content="More Homes Group case study: property lettings platform with advanced search, lead capture, and management tools."
        />
        <meta
          name="keywords"
          content="More Homes Group, property lettings website, real estate platform, property management system, advanced search, customer portal, IT Meta Solutions"
        />
        <meta property="og:title" content="More Homes Group Case Study - Property Lettings Platform | IT Meta Solutions" />
        <meta
          property="og:description"
          content="A modern property listings & rental services platform with clear tenant & landlord journeys."
        />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://itmetasolutions.com/case-study/more-homes-group" />
        <meta property="og:url" content="https://itmetasolutions.com/case-study/more-homes-group" />
        <meta property="og:image" content="https://itmetasolutions.com/favicon.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="More Homes Group Case Study - Property Lettings Platform | IT Meta Solutions" />
        <meta
          name="twitter:description"
          content="A modern property listings & rental services platform with clear tenant & landlord journeys."
        />
        <meta name="twitter:image" content="https://itmetasolutions.com/favicon.webp" />
      </Helmet>

      <div className="relative min-h-screen text-zinc-100 mb-16 overflow-x-hidden">
        <ScrollProgress />

        {/* Background accents (Home style) */}
        <GradientBlob className="left-[-140px] top-[-140px] h-[650px] w-[650px]" color="rgba(80,37,209,0.20)" />
        <GradientBlob className="right-[-190px] top-[220px] h-[700px] w-[700px]" color="rgba(16,185,129,0.14)" />
        <GradientBlob className="bottom-[-180px] left-[18%] h-[780px] w-[780px]" color="rgba(236,72,153,0.10)" />

        {/* Hero */}
        <section ref={heroRef} className="relative overflow-hidden">
          <Container className="pb-16 pt-24 sm:pb-24 sm:pt-32">
            <motion.div style={{ y: heroY, opacity: heroOpacity }}>
              <Reveal>
                <Badge icon={Sparkles}>Property Lettings + Rental Services Platform</Badge>
              </Reveal>

              <Reveal delay={0.06} className="mt-6">
                <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  More Homes Group — a modern{" "}
                  <span className="bg-gradient-to-r from-[#5025d1] via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    property listings & rental services
                  </span>{" "}
                  platform
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="mt-5 max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                  We built a trustworthy, scalable letting platform with fast property discovery, strong filtering, and clearly
                  separated journeys for tenants and landlords — designed to expand across cities, listings, and services.
                </p>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="mt-7 flex flex-wrap items-center gap-2">
                  <Pill icon={Home}>Property Lettings</Pill>
                  <Pill icon={Search}>Advanced search</Pill>
                  <Pill icon={SlidersHorizontal}>Filters</Pill>
                  <Pill icon={Users}>Tenant & landlord flows</Pill>
                  <Pill icon={ShieldCheck}>Trust signals</Pill>
                </div>
              </Reveal>

              <div className="mt-10 grid gap-4 sm:grid-cols-3 items-stretch">
                <Stat icon={Search} label="Discovery" value="Search + Filters" />
                <Stat icon={Users} label="Journeys" value="Tenant / Landlord" />
                <Stat icon={MapPin} label="Coverage" value="Multi-city" />
              </div>

              <Reveal delay={0.18}>
                <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-7 backdrop-blur-sm">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-2xl">
                      <div className="text-sm font-semibold text-white">Live website</div>
                      <div className="mt-1 text-sm text-zinc-300">
                        Replace with screenshots in your final portfolio page if needed.
                      </div>
                    </div>
                    <a
                      href="https://morehomesgroup.co.uk"
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5025d1] to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5025d1]/35 transition-all hover:shadow-xl hover:shadow-[#5025d1]/55 hover:scale-[1.02]"
                    >
                      Visit More Homes Group{" "}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-3 items-stretch">
                    {[
                      { icon: Layout, title: "Modern UI", desc: "Clean hierarchy built for trust and conversion." },
                      { icon: SlidersHorizontal, title: "Fast filtering", desc: "Price, tags, radius and clear listing cards." },
                      { icon: ClipboardList, title: "Service flows", desc: "Tenant and landlord journeys with dedicated pages." },
                    ].map((b) => (
                      <div
                        key={b.title}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4 h-full flex flex-col justify-center"
                      >
                        <div className="flex items-center gap-3">
                          <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5">
                            <b.icon className="h-5 w-5 text-white/85" />
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
                kicker="Overview"
                title="Elevating the rental experience — for landlords and tenants alike"
                desc="More Homes Group is a property lettings platform combining property listings, rental support services, and scalable content architecture. The aim: make discovery fast, journeys clear, and the platform easy to expand across cities and services."
              />
            </Reveal>

            <div className="mt-10 grid gap-4 lg:grid-cols-3 items-stretch">
              <Card
                icon={Globe}
                title="Category"
                desc="Property Lettings / Rental Management"
                bullets={["Property listings", "Tenant services", "Landlord services", "Multi-city expansion"]}
                delay={0.05}
              />
              <Card
                icon={Layout}
                title="Scope"
                desc="Discovery + service architecture"
                bullets={["Properties hub", "Find a Property", "Add Listing flow", "Service pages"]}
                delay={0.1}
              />
              <Card
                icon={ShieldCheck}
                title="Focus"
                desc="Trustworthy, modern brand presence"
                bullets={["Stats module", "Testimonials", "About positioning", "Privacy policy"]}
                delay={0.15}
              />
            </div>
          </Container>
        </section>

        <Container>
          <Divider />
        </Container>

        {/* Goals */}
        <section id="goals" className="scroll-mt-24">
          <Container className="pb-16">
            <Reveal>
              <SectionTitle
                kicker="Goals"
                title="Make property discovery easy — and journeys unmissable"
                desc="We focused on clarity, trust, and a structure that scales: simple browsing, strong filters, and separate tenant vs landlord pathways."
              />
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-2 items-stretch">
              <Card
                icon={ShieldCheck}
                title="Trust & brand"
                desc="A professional letting brand that feels modern, credible, and easy to navigate."
                bullets={["Clear positioning", "Strong UI consistency", "Trust modules (stats, testimonials)"]}
                delay={0.05}
              />
              <Card
                icon={Search}
                title="Fast discovery"
                desc="A listing hub that supports real browsing behavior: search, filter, compare, and click-through."
                bullets={["Clear listing cards", "Advanced filters", "Quick path to details"]}
                delay={0.1}
              />
              <Card
                icon={Users}
                title="Two clear journeys"
                desc="Separate service architecture to avoid mixed messaging and boost conversions."
                bullets={["Tenant: browse/register/guides", "Landlord: management/find tenant/guide"]}
                delay={0.15}
              />
              <Card
                icon={MapPin}
                title="Scale across cities"
                desc="Modular structure to add new properties, cities, and services without refactoring."
                bullets={["Cities covered block", "Expandable listings", "Scalable content pages"]}
                delay={0.2}
              />
            </div>
          </Container>
        </section>

        <Container>
          <Divider />
        </Container>

        {/* Journeys */}
        <section id="journeys" className="scroll-mt-24">
          <Container className="pb-16">
            <Reveal>
              <SectionTitle
                kicker="Journeys"
                title="Clear page hierarchy for tenants and landlords"
                desc="We designed navigation and page structure so each audience gets relevant actions and content — immediately."
              />
            </Reveal>

            <div className="mt-10 grid gap-4 lg:grid-cols-2 items-stretch">
              <Card
                icon={UserCheck}
                title="Tenant journey"
                desc="A guided experience from discovery to registration and support content."
                bullets={["Find a Property landing", "Properties hub (listings)", "Register flow", "Student accommodation", "Tenant guide"]}
                delay={0.05}
              />
              <Card
                icon={Briefcase}
                title="Landlord journey"
                desc="Service-first pathways built for landlords and agents."
                bullets={["Find a tenant", "Property management", "Landlord guide", "Add Listing submission flow", "Contact / enquiry CTAs"]}
                delay={0.1}
              />
            </div>

            <Reveal delay={0.15}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 backdrop-blur-sm">
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                  <div className="max-w-2xl">
                    <div className="text-sm font-semibold text-white">Key pages</div>
                    <div className="mt-1 text-sm text-zinc-300">
                      Home • Properties • Find a Property • Add Listing • Tenant Services • Landlord Services • About • Privacy Policy
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
                    <ChevronRight className="h-4 w-4" />
                    Separate intent pages
                  </div>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        <Container>
          <Divider />
        </Container>

        {/* What we built */}
        <section id="built" className="scroll-mt-24">
          <Container className="pb-16">
            <Reveal>
              <SectionTitle
                kicker="What we built"
                title="Discovery system + listings structure + trust architecture"
                desc="The platform is designed to help users quickly find relevant properties, understand services, and take the next step confidently."
              />
            </Reveal>

            <div className="mt-10 grid gap-4 lg:grid-cols-3 items-stretch">
              <Card
                icon={SlidersHorizontal}
                title="Advanced search & filters"
                desc="A property discovery UI built for fast browsing and relevance."
                bullets={["Price min/max", "Radius search (miles)", "Tags & categories", "Review / labels (where applicable)"]}
                delay={0.05}
              />
              <Card
                icon={Home}
                title="Listings grid + detail pages"
                desc="Clear listing cards with CTA to dedicated detail pages."
                bullets={["Image previews / gallery", "Title + price", "Details CTA", "Example detail pages supported"]}
                delay={0.1}
              />
              <Card
                icon={Building2}
                title="City coverage + trust"
                desc="Coverage and credibility baked into homepage modules."
                bullets={["Cities covered: London, Manchester, Birmingham, etc.", "Stats block (verified tenants, landlords, experts)", "Testimonials module"]}
                delay={0.15}
              />
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2 items-stretch">
              <Card
                icon={ClipboardList}
                title="Service architecture"
                desc="Tenant and landlord pages are structured as separate, scalable clusters."
                bullets={["Tenant guide, register, student accommodation", "Landlord guide, find tenant, management", "Service submenus + internal linking"]}
                delay={0.1}
              />
              <Card
                icon={Star}
                title="Conversion CTAs"
                desc="Clear CTAs positioned around browsing and services."
                bullets={["Explore Properties", "View Details", "Add Listing", "Contact / enquiry flows"]}
                delay={0.15}
              />
            </div>
          </Container>
        </section>

        <Container>
          <Divider />
        </Container>

        {/* SEO */}
        <section id="seo" className="scroll-mt-24">
          <Container className="pb-16">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <Reveal>
                <SectionTitle
                  kicker="SEO & structure"
                  title="Clean hierarchy designed for intent-based pages"
                  desc="We set up the site to support strong on-page SEO with separate pages per intent, clean internal linking, and compliance trust."
                />
              </Reveal>

              <Reveal delay={0.1}>
                <div className="grid gap-4">
                  {[
                    {
                      icon: FileSearch,
                      title: "Intent-based page setup",
                      desc: "Properties hub, Find a Property, Student accommodation, Add Listing, and dedicated service pages.",
                    },
                    {
                      icon: Layout,
                      title: "Structured internal linking",
                      desc: "Navbar and service submenus connect relevant pages to guide users and search engines.",
                    },
                    {
                      icon: ShieldCheck,
                      title: "Compliance trust",
                      desc: "Privacy Policy page present for credibility and user confidence.",
                    },
                    {
                      icon: Gauge,
                      title: "Performance-ready",
                      desc: "Modular layout built to scale without heavy bloat as listings and cities grow.",
                    },
                    {
                      icon: BarChart3,
                      title: "Analytics-ready",
                      desc: "Foundation to track discovery behavior, service interest, and conversion actions.",
                    },
                  ].map((r) => (
                    <div
                      key={r.title}
                      className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-5 backdrop-blur-sm"
                    >
                      <div className="flex items-start gap-3">
                        <div className="rounded-2xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-3">
                          <r.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{r.title}</div>
                          <div className="mt-1 text-sm text-zinc-300">{r.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        <Container>
          <Divider />
        </Container>

        {/* Results */}
        <section id="results" className="scroll-mt-24">
          <Container className="pb-10">
            <Reveal>
              <SectionTitle
                kicker="Impact"
                title="Clear journeys, faster discovery, stronger trust"
                desc="With separate tenant vs landlord flows, advanced filtering, and credibility modules, the platform supports smoother user decisions and scalable growth."
                align="center"
              />
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-3 items-stretch">
              <Stat icon={Users} label="Journey clarity" value="Improved" />
              <Stat icon={Search} label="Property discovery" value="Faster" />
              <Stat icon={ShieldCheck} label="Trust signals" value="Stronger" />
            </div>

            <Reveal delay={0.15}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#5025d1]/20 to-emerald-400/10 p-6 backdrop-blur-sm">
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                  <div className="max-w-2xl">
                    <div className="text-sm font-semibold text-white">Want a similar property platform?</div>
                    <div className="mt-1 text-sm text-zinc-300">
                      We can build a scalable listings structure, service architecture, and discovery UX tailored to your cities and audience.
                    </div>
                  </div>
                  <a
                    href="/contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#5025d1] shadow-lg transition-all hover:scale-[1.02]"
                  >
                    Request a proposal <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </Reveal>

            <div className="mt-10 text-center text-xs text-zinc-500">© {year} • More Homes Group case study</div>
          </Container>
        </section>

        <SeoContentFaq content={seoContent} faqs={seoFaqs} />
      </div>
    </>
  );
}

