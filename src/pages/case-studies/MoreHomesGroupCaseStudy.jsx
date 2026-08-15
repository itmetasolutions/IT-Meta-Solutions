import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, useScroll, useInView } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardList,
  FileSearch,
  Gauge,
  Globe,
  Home,
  Layout,
  MapPin,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  Users,
  UserCheck,
  Briefcase,
} from "lucide-react";
import SeoContentFaq from "../../components/SeoContentFaq";
import Container from "../../components/Container";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-50 h-0.5 w-full origin-left bg-gradient-to-r from-[#1D4ED8] via-[#23A6E8] to-[#3AC9F5]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

function Reveal({ children, delay = 0, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function LightCard({ icon: Icon, color = "#1D4ED8", title, desc, bullets, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div className="premium-card h-full rounded-2xl p-6">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: `${color}15` }}>
          <Icon className="h-5 w-5" style={{ color }} />
        </div>
        <h3 className="mb-2 text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
        {desc && <p className="mb-3 text-sm leading-relaxed text-slate-600">{desc}</p>}
        {bullets?.length ? (
          <ul className="space-y-2">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color }} />{b}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Reveal>
  );
}

function AnchorLink({ href, children, className }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        if (href?.startsWith("#")) {
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

const navItems = [
  { label: "Overview", href: "#overview" },
  { label: "Discovery", href: "#discovery" },
  { label: "Journeys", href: "#journeys" },
  { label: "What We Built", href: "#built" },
  { label: "SEO", href: "#seo" },
  { label: "Results", href: "#results" },
];

function StickyNav() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) setActive(`#${en.target.id}`); }),
      { rootMargin: "-20% 0px -70% 0px" }
    );
    navItems.forEach(({ href }) => { const el = document.querySelector(href); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return (
    <div className="sticky top-[64px] z-40 border-b border-slate-100 bg-white/95 backdrop-blur-sm shadow-sm">
      <Container>
        <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-none">
          {navItems.map(({ label, href }) => (
            <AnchorLink
              key={href}
              href={href}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                active === href ? "bg-[#1D4ED8] text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {label}
            </AnchorLink>
          ))}
        </div>
      </Container>
    </div>
  );
}

const seoContent = {
  kicker: "Case Study",
  title: "Property Lettings Platform for Lead Generation",
  subtitle: "More Homes Group launched a real estate platform with clear tenant and landlord journeys.",
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
  { q: "What was built for More Homes Group?", a: "A full property lettings platform with search, listings, and service journeys." },
  { q: "Does it support lead generation?", a: "Yes. Tenant and landlord flows were designed to convert inquiries." },
  { q: "Can you build similar real estate platforms?", a: "Yes. We tailor architecture, UX, and lead capture to your market." },
];

export default function MoreHomesGroupCaseStudy() {
  return (
    <>
      <Helmet>
        <title>More Homes Group Case Study — Property Lettings Platform | IT Meta Solutions</title>
        <meta name="description" content="More Homes Group case study: property lettings platform with advanced search, lead capture, and tenant & landlord journeys." />
        <meta name="keywords" content="More Homes Group, property lettings website, real estate platform, property management, advanced search, IT Meta Solutions" />
        <meta property="og:title" content="More Homes Group Case Study — Property Lettings Platform | IT Meta Solutions" />
        <meta property="og:description" content="A modern property listings & rental services platform with clear tenant & landlord journeys." />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://itmetasolutions.com/case-study/more-homes-group" />
        <meta property="og:image" content="https://itmetasolutions.com/favicon.webp" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <ScrollProgress />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#141A2E] pb-20 pt-28 sm:pb-28 sm:pt-36">
        <div aria-hidden className="absolute inset-0 dot-grid-bg opacity-25 pointer-events-none" />
        <div aria-hidden className="absolute -top-32 right-0 w-[600px] h-[500px] rounded-full bg-[#1D4ED8]/10 blur-[120px] pointer-events-none" />
        <div aria-hidden className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full bg-[#23A6E8]/8 blur-[100px] pointer-events-none" />
        <Container>
          <Reveal>
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { icon: Home, label: "Property Lettings" },
                { icon: Search, label: "Advanced Search" },
                { icon: Users, label: "Tenant & Landlord" },
                { icon: MapPin, label: "Multi-city" },
                { icon: ShieldCheck, label: "Trust Signals" },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
                  <Icon className="h-3.5 w-3.5 text-[#3AC9F5]" />{label}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-heading)" }}>
              More Homes Group —{" "}
              <span className="animated-gradient-text">Property Lettings Platform</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-base text-zinc-300 leading-relaxed">
              A trustworthy, scalable letting platform with fast property discovery, strong filtering, and clearly
              separated journeys for tenants and landlords — designed to expand across cities, listings, and services.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Search, value: "Search + Filters", label: "Discovery system" },
                { icon: Users, value: "Tenant / Landlord", label: "Separate journeys" },
                { icon: MapPin, value: "Multi-city", label: "Coverage" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Icon className="mb-3 h-6 w-6 text-[#3AC9F5]" />
                  <div className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{value}</div>
                  <div className="mt-1 text-sm text-zinc-400">{label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 overflow-hidden rounded-3xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&q=80"
                alt="More Homes Group property lettings platform"
                className="w-full h-56 sm:h-72 object-cover opacity-80"
              />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://morehomesgroup.co.uk"
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                Visit More Homes Group <ArrowRight className="h-4 w-4" />
              </a>
              <Link to="/work?filter=web-development" className="btn-ghost-dark inline-flex items-center gap-2">
                More Web Projects <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <StickyNav />

      {/* OVERVIEW */}
      <section id="overview" className="scroll-mt-20 bg-white py-20">
        <Container>
          <Reveal>
            <span className="kicker">Overview</span>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Elevating the rental experience — for landlords and tenants
            </h2>
            <p className="mt-4 max-w-2xl text-base text-slate-600">
              More Homes Group is a property lettings platform combining listings, rental support services, and scalable
              content architecture. The aim: make discovery fast, journeys clear, and the platform easy to expand.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <LightCard icon={Globe} title="Category" desc="Property Lettings / Rental Management" bullets={["Property listings", "Tenant services", "Landlord services", "Multi-city expansion"]} delay={0.05} />
            <LightCard icon={Layout} color="#23A6E8" title="Scope" desc="Discovery + service architecture" bullets={["Properties hub", "Find a Property", "Add Listing flow", "Service pages"]} delay={0.1} />
            <LightCard icon={ShieldCheck} color="#3AC9F5" title="Focus" desc="Trustworthy, modern brand presence" bullets={["Stats module", "Testimonials", "About positioning", "Privacy policy"]} delay={0.15} />
          </div>
        </Container>
      </section>

      {/* DISCOVERY */}
      <section id="discovery" className="scroll-mt-20 bg-[#F1F4F9] py-20">
        <Container>
          <Reveal>
            <span className="kicker">Discovery System</span>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Fast property discovery with real browsing behavior
            </h2>
            <p className="mt-4 max-w-2xl text-base text-slate-600">
              A listing hub that supports real browsing behavior: search, filter, compare, and click-through.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <LightCard icon={SlidersHorizontal} title="Advanced filters" bullets={["Price min/max", "Radius search (miles)", "Tags & categories"]} delay={0.05} />
            <LightCard icon={Home} color="#23A6E8" title="Listings grid" bullets={["Image previews / gallery", "Title + price", "Detail CTAs"]} delay={0.1} />
            <LightCard icon={Building2} color="#3AC9F5" title="City coverage" bullets={["London, Manchester, Birmingham", "Expandable across cities", "Stats block"]} delay={0.15} />
            <LightCard icon={Star} color="#1D4ED8" title="Trust signals" bullets={["Testimonials module", "Clear positioning", "Strong UI consistency"]} delay={0.2} />
          </div>
        </Container>
      </section>

      {/* JOURNEYS */}
      <section id="journeys" className="scroll-mt-20 bg-white py-20">
        <Container>
          <Reveal>
            <span className="kicker">User Journeys</span>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Clear page hierarchy for tenants and landlords
            </h2>
            <p className="mt-4 max-w-2xl text-base text-slate-600">
              We designed navigation and page structure so each audience gets relevant actions and content immediately.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <LightCard
              icon={UserCheck}
              title="Tenant journey"
              desc="A guided experience from discovery to registration and support content."
              bullets={["Find a Property landing", "Properties hub (listings)", "Register flow", "Student accommodation", "Tenant guide"]}
              delay={0.05}
            />
            <LightCard
              icon={Briefcase}
              color="#23A6E8"
              title="Landlord journey"
              desc="Service-first pathways built for landlords and agents."
              bullets={["Find a tenant", "Property management", "Landlord guide", "Add Listing submission flow", "Contact / enquiry CTAs"]}
              delay={0.1}
            />
          </div>
          <Reveal delay={0.15}>
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold text-slate-900">Key pages</p>
              <p className="mt-1 text-sm text-slate-600">
                Home · Properties · Find a Property · Add Listing · Tenant Services · Landlord Services · About · Privacy Policy
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* WHAT WE BUILT */}
      <section id="built" className="scroll-mt-20 bg-[#F1F4F9] py-20">
        <Container>
          <Reveal>
            <span className="kicker">What We Built</span>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Discovery system + listings + trust architecture
            </h2>
            <p className="mt-4 max-w-2xl text-base text-slate-600">
              The platform helps users quickly find relevant properties, understand services, and take the next step confidently.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <LightCard icon={SlidersHorizontal} title="Advanced search & filters" bullets={["Price min/max", "Radius search (miles)", "Tags & categories"]} delay={0.05} />
            <LightCard icon={Home} color="#23A6E8" title="Listings grid + detail pages" bullets={["Image previews / gallery", "Title + price", "Details CTA"]} delay={0.1} />
            <LightCard icon={Building2} color="#3AC9F5" title="City coverage + trust" bullets={["Cities covered across UK", "Stats block (verified tenants)", "Testimonials module"]} delay={0.15} />
            <LightCard icon={ClipboardList} title="Service architecture" bullets={["Tenant guide, register, student accommodation", "Landlord guide, find tenant, management", "Service submenus + internal linking"]} delay={0.2} />
            <LightCard icon={Star} color="#23A6E8" title="Conversion CTAs" bullets={["Explore Properties", "View Details", "Add Listing", "Contact / enquiry flows"]} delay={0.25} />
          </div>
        </Container>
      </section>

      {/* SEO */}
      <section id="seo" className="scroll-mt-20 bg-white py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <span className="kicker">SEO & Structure</span>
              <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
                Clean hierarchy designed for intent-based pages
              </h2>
              <p className="mt-4 text-base text-slate-600">
                We set up the site to support strong on-page SEO with separate pages per intent, clean internal linking, and compliance trust.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-4">
                {[
                  { icon: FileSearch, title: "Intent-based page setup", desc: "Properties hub, Find a Property, Student accommodation, Add Listing, and dedicated service pages." },
                  { icon: Layout, title: "Structured internal linking", desc: "Navbar and service submenus connect relevant pages to guide users and search engines." },
                  { icon: ShieldCheck, title: "Compliance trust", desc: "Privacy Policy page present for credibility and user confidence." },
                  { icon: Gauge, title: "Performance-ready", desc: "Modular layout built to scale without heavy bloat as listings and cities grow." },
                  { icon: BarChart3, title: "Analytics-ready", desc: "Foundation to track discovery behavior, service interest, and conversion actions." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="premium-card flex items-start gap-4 rounded-xl p-4">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#1D4ED8]/10">
                      <Icon className="h-4 w-4 text-[#1D4ED8]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{title}</p>
                      <p className="mt-0.5 text-sm text-slate-600">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* RESULTS */}
      <section id="results" className="scroll-mt-20 relative bg-[#141A2E] py-20">
        <div aria-hidden className="absolute inset-0 dot-grid-bg opacity-10 pointer-events-none" />
        <Container className="relative">
          <Reveal>
            <span className="kicker" style={{ color: "#3AC9F5", borderColor: "#3AC9F5" }}>Impact</span>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold text-white sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Clear journeys, faster discovery, stronger trust
            </h2>
            <p className="mt-4 max-w-xl text-base text-zinc-300">
              With separate tenant vs landlord flows, advanced filtering, and credibility modules, the platform supports smoother user decisions and scalable growth.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Users, value: "Improved", label: "Journey clarity" },
                { icon: Search, value: "Faster", label: "Property discovery" },
                { icon: ShieldCheck, value: "Stronger", label: "Trust signals" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Icon className="mb-3 h-6 w-6 text-[#3AC9F5]" />
                  <div className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{value}</div>
                  <div className="mt-1 text-sm text-zinc-400">{label}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                Request a proposal <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/work?filter=web-development" className="btn-ghost-dark inline-flex items-center gap-2">
                More Web Projects <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="bg-[#F1F4F9]">
        <SeoContentFaq content={seoContent} faqs={seoFaqs} lightTheme={true} />
      </div>
    </>
  );
}
