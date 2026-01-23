import React, { useMemo, useRef } from "react";
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
} from "lucide-react";

/**
 * More Homes Group — Case Study Page
 * Uses the SAME theme + components as the InHomes Direct reference:
 * - Dark, glass cards, gradients
 * - Scroll progress
 * - Parallax hero
 * - Reveal animations
 *
 * Content updated for:
 * morehomesgroup.co.uk
 * Property Lettings / Rental Management Platform
 */

const cx = (...c) => c.filter(Boolean).join(" ");

const nav = [
  { label: "Overview", href: "#overview" },
  { label: "Goals", href: "#goals" },
  { label: "Journeys", href: "#journeys" },
  { label: "What We Built", href: "#built" },
  { label: "SEO & Structure", href: "#seo" },
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
      className="
        group relative overflow-hidden
        rounded-3xl border border-white/10
        bg-gradient-to-b from-white/[0.07] to-white/[0.03]
        p-6 pb-8
        h-full
        flex
      "
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
            <Building2 className="h-4 w-4" />
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

export default function MoreHomesGroupCaseStudy() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, -60]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.88]);

  const heroRef = useRef(null);

  return (
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
                <Pill icon={Home}>Property Lettings</Pill>
                <Pill icon={Search}>Advanced search</Pill>
                <Pill icon={SlidersHorizontal}>Filters</Pill>
                <Pill icon={Users}>Tenant & landlord flows</Pill>
                <Pill icon={ShieldCheck}>Trust signals</Pill>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                More Homes Group — a modern property listings & rental services platform
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                We built a trustworthy, scalable letting platform with fast property discovery, strong filtering, and
                clearly separated journeys for tenants and landlords — designed to expand across cities, listings, and services.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <Reveal delay={0.1}>
                <Stat icon={Search} label="Discovery" value="Search + Filters" />
              </Reveal>
              <Reveal delay={0.15}>
                <Stat icon={Users} label="Journeys" value="Tenant / Landlord" />
              </Reveal>
              <Reveal delay={0.2}>
                <Stat icon={MapPin} label="Coverage" value="Multi-city" />
              </Reveal>
            </div>

            {/* Live website card */}
            <Reveal delay={0.15}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.03] p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-2xl">
                    <div className="text-sm font-semibold text-white">Live website</div>
                    <div className="mt-1 text-sm text-zinc-300">Replace with screenshots in your final build if needed.</div>
                  </div>
                  <a
                    href="https://morehomesgroup.co.uk"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:opacity-90"
                  >
                    Visit More Homes Group <ArrowRight className="h-4 w-4" />
                  </a>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
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

      {/* Sticky anchors (matches theme) */}
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

          <div className="mt-10 pb-6 grid gap-4 lg:grid-cols-3">
            <Reveal delay={0.05}>
              <Card
                icon={Globe}
                title="Category"
                desc="Property Lettings / Rental Management"
                bullets={["Property listings", "Tenant services", "Landlord services", "Multi-city expansion"]}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Card
                icon={Layout}
                title="Scope"
                desc="Discovery + service architecture"
                bullets={["Properties hub", "Find a Property", "Add Listing flow", "Service pages"]}
              />
            </Reveal>
            <Reveal delay={0.15}>
              <Card
                icon={ShieldCheck}
                title="Focus"
                desc="Trustworthy, modern brand presence"
                bullets={["Stats module", "Testimonials", "About positioning", "Privacy policy"]}
              />
            </Reveal>
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

          <div className="mt-10 pb-6 grid gap-4 md:grid-cols-2">
            <Reveal delay={0.05}>
              <Card
                icon={ShieldCheck}
                title="Trust & brand"
                desc="A professional letting brand that feels modern, credible, and easy to navigate."
                bullets={["Clear positioning", "Strong UI consistency", "Trust modules (stats, testimonials)"]}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Card
                icon={Search}
                title="Fast discovery"
                desc="A listing hub that supports real browsing behavior: search, filter, compare, and click-through."
                bullets={["Clear listing cards", "Advanced filters", "Quick path to details"]}
              />
            </Reveal>
            <Reveal delay={0.15}>
              <Card
                icon={Users}
                title="Two clear journeys"
                desc="Separate service architecture to avoid mixed messaging and boost conversions."
                bullets={["Tenant: browse/register/guides", "Landlord: management/find tenant/guide"]}
              />
            </Reveal>
            <Reveal delay={0.2}>
              <Card
                icon={MapPin}
                title="Scale across cities"
                desc="Modular structure to add new properties, cities, and services without refactoring."
                bullets={["Cities covered block", "Expandable listings", "Scalable content pages"]}
              />
            </Reveal>
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

          <div className="mt-10 pb-6 grid gap-4 lg:grid-cols-2">
            <Reveal delay={0.05}>
              <Card
                icon={UserCheck}
                title="Tenant journey"
                desc="A guided experience from discovery to registration and support content."
                bullets={[
                  "Find a Property landing",
                  "Properties hub (listings)",
                  "Register flow",
                  "Student accommodation",
                  "Tenant guide",
                ]}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Card
                icon={Briefcase}
                title="Landlord journey"
                desc="Service-first pathways built for landlords and agents."
                bullets={[
                  "Find a tenant",
                  "Property management",
                  "Landlord guide",
                  "Add Listing submission flow",
                  "Contact / enquiry CTAs",
                ]}
              />
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.06] to-white/[0.03] p-6">
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

      {/* What We Built */}
      <section id="built" className="scroll-mt-24">
        <Container className="pb-16">
          <Reveal>
            <SectionTitle
              kicker="What we built"
              title="Discovery system + listings structure + trust architecture"
              desc="The platform is designed to help users quickly find relevant properties, understand services, and take the next step confidently."
            />
          </Reveal>

          <div className="mt-10 pb-6 grid gap-4 lg:grid-cols-3">
            <Reveal delay={0.05}>
              <Card
                icon={SlidersHorizontal}
                title="Advanced search & filters"
                desc="A property discovery UI built for fast browsing and relevance."
                bullets={[
                  "Price min/max",
                  "Radius search (miles)",
                  "Tags & categories",
                  "Review / labels (where applicable)",
                ]}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Card
                icon={Home}
                title="Listings grid + detail pages"
                desc="Clear listing cards with CTA to dedicated detail pages."
                bullets={[
                  "Image previews / gallery",
                  "Title + price",
                  "Details CTA",
                  "Example detail pages supported",
                ]}
              />
            </Reveal>
            <Reveal delay={0.15}>
              <Card
                icon={Building2}
                title="City coverage + trust"
                desc="Coverage and credibility baked into homepage modules."
                bullets={[
                  "Cities covered: London, Manchester, Birmingham, etc.",
                  "Stats block (verified tenants, landlords, experts)",
                  "Testimonials module",
                ]}
              />
            </Reveal>
          </div>

          <div className="mt-6 pb-6 grid gap-4 lg:grid-cols-2">
            <Reveal delay={0.1}>
              <Card
                icon={ClipboardList}
                title="Service architecture"
                desc="Tenant and landlord pages are structured as separate, scalable clusters."
                bullets={[
                  "Tenant guide, register, student accommodation",
                  "Landlord guide, find tenant, management",
                  "Service submenus + internal linking",
                ]}
              />
            </Reveal>
            <Reveal delay={0.15}>
              <Card
                icon={Star}
                title="Conversion CTAs"
                desc="Clear CTAs positioned around browsing and services."
                bullets={[
                  "Explore Properties",
                  "View Details",
                  "Add Listing",
                  "Contact / enquiry flows",
                ]}
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <Container>
        <Divider />
      </Container>

      {/* SEO */}
      <section id="seo" className="scroll-mt-24">
        <Container>
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
                  <div key={r.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                    <div className="flex items-start gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5">
                        <r.icon className="h-5 w-5" />
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
        <Container>
          <Reveal>
            <SectionTitle
              kicker="Impact"
              title="Clear journeys, faster discovery, stronger trust"
              desc="With separate tenant vs landlord flows, advanced filtering, and credibility modules, the platform supports smoother user decisions and scalable growth."
              align="center"
            />
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Reveal delay={0.05}>
              <Stat icon={Users} label="Journey clarity" value="Improved" />
            </Reveal>
            <Reveal delay={0.1}>
              <Stat icon={Search} label="Property discovery" value="Faster" />
            </Reveal>
            <Reveal delay={0.15}>
              <Stat icon={ShieldCheck} label="Trust signals" value="Stronger" />
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-emerald-400/10 p-6">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div className="max-w-2xl">
                  <div className="text-sm font-semibold text-white">Want a similar property platform?</div>
                  <div className="mt-1 text-sm text-zinc-300">
                    We can build a scalable listings structure, service architecture, and discovery UX tailored to your cities and audience.
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

          <div className="mt-10 text-center text-xs text-zinc-500">
            © {year} • More Homes Group case study
          </div>
        </Container>
      </section>
    </div>
  );
}