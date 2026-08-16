import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Code2, Cloud, Megaphone, Search, Palette, LayoutGrid,
  Users, PlayCircle, Sparkles, CheckCircle2, Zap, Target,
  ShieldCheck, Award,
} from "lucide-react";
import Container from "../../components/Container";
import SeoContentFaq from "../../components/SeoContentFaq";

const services = [
  {
    id: "web-development",
    icon: Code2,
    title: "Web Development",
    subtitle: "Fast. Beautiful. High-Converting.",
    description: "We build performance-first websites, e-commerce stores, and landing pages that convert visitors into customers. From Shopify storefronts to custom-coded solutions.",
    highlights: [
      "Shopify & WooCommerce stores",
      "Custom theme development",
      "Landing pages & corporate sites",
      "Performance optimization & speed",
      "Mobile-first responsive design",
    ],
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=700&auto=format&fit=crop&q=80",
    link: "/web-development-expertise",
    color: "#1D4ED8",
  },
  {
    id: "custom-web-apps",
    icon: LayoutGrid,
    title: "Custom Web Apps",
    subtitle: "Built for Your Business Logic.",
    description: "Bespoke portals, dashboards, and internal tools tailored exactly to your workflows. React-powered, API-integrated, and built to scale.",
    highlights: [
      "Business portals & dashboards",
      "Admin panels & back-office tools",
      "API integrations & automation",
      "Real-time data applications",
      "SaaS product development",
    ],
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=700&auto=format&fit=crop&q=80",
    link: "/custom-web-apps-expertise",
    color: "#23A6E8",
  },
  {
    id: "salesforce",
    icon: Cloud,
    title: "Salesforce",
    subtitle: "CRM That Works the Way You Do.",
    description: "Full Salesforce implementation, LWC development, and workflow automation. We help businesses harness the full power of their CRM investment.",
    highlights: [
      "Sales Cloud & Service Cloud",
      "Lightning Web Components (LWC)",
      "Experience Cloud portals",
      "CRM data migration & cleanup",
      "Custom automation & flows",
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&auto=format&fit=crop&q=80",
    link: "/salesforce-expertise",
    color: "#3AC9F5",
  },
  {
    id: "digital-marketing",
    icon: Megaphone,
    title: "Digital Marketing",
    subtitle: "Campaigns That Drive Revenue.",
    description: "Data-driven marketing strategies across Google Ads, Meta, and email that generate qualified leads and deliver measurable ROI for your business.",
    highlights: [
      "Google Ads & PPC campaigns",
      "Meta Ads (Facebook & Instagram)",
      "Email marketing automation",
      "Lead generation funnels",
      "Performance tracking & ROAS",
    ],
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=700&auto=format&fit=crop&q=80",
    link: "/digital-marketing-expertise",
    color: "#1D4ED8",
  },
  {
    id: "seo",
    icon: Search,
    title: "SEO",
    subtitle: "Rank Higher. Get Found.",
    description: "Technical SEO, on-page optimization, and content strategy that moves your business to the top of search results and keeps it there.",
    highlights: [
      "Technical SEO audits & fixes",
      "On-page optimization",
      "Content strategy & creation",
      "Local SEO & Google Business",
      "Link building & authority",
    ],
    image: "https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?w=700&auto=format&fit=crop&q=80",
    link: "/seo-expertise",
    color: "#23A6E8",
  },
  {
    id: "social-media",
    icon: Users,
    title: "Social Media",
    subtitle: "Grow Your Audience, Build Community.",
    description: "Strategic social media management that grows your following, increases engagement, and turns followers into loyal customers.",
    highlights: [
      "Content creation & calendars",
      "Community management",
      "Instagram, LinkedIn, Facebook",
      "Influencer campaigns",
      "Analytics & reporting",
    ],
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=700&auto=format&fit=crop&q=80",
    link: "/social-media-expertise",
    color: "#3AC9F5",
  },
  {
    id: "graphic-design",
    icon: Palette,
    title: "Graphic Design",
    subtitle: "Visuals That Make an Impression.",
    description: "Brand identities, marketing materials, and digital assets that communicate your value clearly and memorably. Design that works.",
    highlights: [
      "Brand identity & logo design",
      "Social media graphics & ads",
      "Pitch decks & presentations",
      "Print & digital collateral",
      "UI design & prototyping",
    ],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=700&auto=format&fit=crop&q=80",
    link: "/graphic-designing-expertise",
    color: "#1D4ED8",
  },
  {
    id: "video-editing",
    icon: PlayCircle,
    title: "Video Editing",
    subtitle: "Stories Worth Watching.",
    description: "Professional video editing for social media, ads, explainers, and corporate content. We turn raw footage into compelling stories.",
    highlights: [
      "Social media reels & shorts",
      "Ad creatives & promos",
      "Corporate & product videos",
      "Motion graphics & animations",
      "YouTube channel optimization",
    ],
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=700&auto=format&fit=crop&q=80",
    link: "/video-editing-expertise",
    color: "#23A6E8",
  },
  {
    id: "brand-building",
    icon: Sparkles,
    title: "Brand Building",
    subtitle: "Brands That Stand the Test of Time.",
    description: "End-to-end brand strategy and identity development that gives your business a distinctive voice, look, and personality.",
    highlights: [
      "Brand strategy & positioning",
      "Logo & visual identity",
      "Brand guidelines & voice",
      "Naming & messaging",
      "Rebranding & brand refresh",
    ],
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=700&auto=format&fit=crop&q=80",
    link: "/brand-building-expertise",
    color: "#3AC9F5",
  },
];

const whyPoints = [
  { icon: Zap,         title: "Full-service agency",   desc: "One team, every service — no freelancer juggling." },
  { icon: Target,      title: "Results-first mindset", desc: "We measure success by your growth, not our hours." },
  { icon: ShieldCheck, title: "SECP Registered",       desc: "Legitimate, accountable, and built for long-term." },
  { icon: Award,       title: "5+ years experience",   desc: "Proven across 50+ projects and 40+ happy clients." },
];

const seoContent = {
  kicker: "Digital Agency Services",
  title: "Full-Service Digital Agency in Pakistan",
  subtitle: "IT Meta Solutions delivers web development, Salesforce CRM, digital marketing, SEO, and branding for businesses in Pakistan, the UK, and the US.",
  paragraphs: [
    "From Shopify stores to Salesforce implementations and Meta Ads campaigns, we provide every digital service your business needs under one roof.",
    "Our cross-functional team works as an extension of your business, delivering consistent quality across web, marketing, and brand services.",
  ],
  bullets: [
    "Web development, custom apps, and Salesforce CRM",
    "Digital marketing: Google Ads, Meta Ads, email",
    "SEO, social media, graphic design, and video editing",
    "Full brand strategy and identity development",
  ],
};

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Services - IT Meta Solutions | Web, Marketing, Salesforce & Design</title>
        <meta name="description" content="Full-service digital agency offering web development, Salesforce CRM, digital marketing, SEO, graphic design, video editing, and brand building." />
        <link rel="canonical" href="https://itmetasolutions.com/services" />
      </Helmet>

      <div>
        {/* PAGE HERO */}
        <section className="bg-[#141A2E] pt-28 pb-16 sm:pt-36 sm:pb-20 relative overflow-hidden">
          <div className="absolute inset-0 dot-grid-bg opacity-40 pointer-events-none" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(29,78,216,0.12) 0%, transparent 70%)" }}
          />
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
                <span
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white mb-6"
                  style={{ fontFamily: "var(--font-heading)", background: "rgba(29,78,216,0.12)", border: "1px solid rgba(29,78,216,0.35)" }}
                >
                  <Sparkles className="h-3.5 w-3.5 text-[#60A5FA]" />
                  What We Do
                </span>
              </motion.div>

              <motion.h1
                initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Every Digital Service
                <span className="block animated-gradient-text">Under One Roof</span>
              </motion.h1>

              <motion.p
                initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.18 }}
                className="mt-5 text-base text-zinc-400 leading-relaxed max-w-xl mx-auto"
              >
                From building your digital presence to growing it — web development, Salesforce CRM, marketing, branding, and beyond.
              </motion.p>

              <motion.div
                initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.26 }}
                className="mt-8 flex flex-wrap gap-3 justify-center"
              >
                <Link to="/contact" className="btn-primary">
                  Start a Project <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/work" className="btn-ghost-dark">See Our Work</Link>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* SERVICES — alternating side-by-side */}
        {services.map((service, i) => {
          const Icon = service.icon;
          const isEven = i % 2 === 0;
          return (
            <section key={service.id} className={`py-16 sm:py-20 relative ${isEven ? "bg-white" : "bg-[#F1F4F9]"}`}>
              {i > 0 && <div className="absolute top-0 left-0 right-0 section-divider-light" />}
              <Container>
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                  {/* Image */}
                  <motion.div
                    initial={{ x: isEven ? -24 : 24, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65 }}
                    className={`relative ${!isEven ? "lg:order-2" : ""}`}
                  >
                    <div className="rounded-2xl overflow-hidden relative" style={{ boxShadow: `0 20px 60px ${service.color}14, 0 4px 16px rgba(0,0,0,0.07)` }}>
                      <img src={service.image} alt={service.title} className="w-full h-[300px] sm:h-[380px] object-cover" loading="lazy" />
                      <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: `linear-gradient(135deg, ${service.color}18 0%, transparent 50%)` }} />
                    </div>

                    <div className="absolute -bottom-4 sm:-bottom-5 -right-2 sm:-right-5 flex items-center gap-2.5 rounded-xl bg-white border border-slate-100 px-4 py-2.5 shadow-lg">
                      <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ background: `${service.color}14` }}>
                        <Icon className="h-5 w-5" style={{ color: service.color }} />
                      </div>
                      <span className="text-sm font-bold text-[#141A2E]" style={{ fontFamily: "var(--font-heading)" }}>{service.title}</span>
                    </div>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    initial={{ x: isEven ? 24 : -24, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65, delay: 0.1 }}
                    className={!isEven ? "lg:order-1" : ""}
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: service.color, fontFamily: "var(--font-heading)" }}>
                      {service.subtitle}
                    </p>
                    <h2 className="text-2xl sm:text-3xl lg:text-[2.1rem] font-extrabold text-[#141A2E] leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                      {service.title}
                    </h2>
                    <p className="mt-4 text-base text-slate-500 leading-relaxed">{service.description}</p>

                    <ul className="mt-6 space-y-2.5">
                      {service.highlights.map((h, j) => (
                        <li key={j} className="flex items-center gap-2.5 text-sm text-slate-700">
                          <CheckCircle2 className="h-4 w-4 flex-shrink-0" style={{ color: service.color }} />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <Link
                      to={service.link}
                      className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02]"
                      style={{ fontFamily: "var(--font-heading)", background: `linear-gradient(135deg, ${service.color}, ${service.color}cc)`, boxShadow: `0 4px 16px ${service.color}28` }}
                    >
                      Learn More <ArrowRight className="h-4 w-4" />
                    </Link>
                  </motion.div>
                </div>
              </Container>
            </section>
          );
        })}

        {/* WHY US */}
        <section className="bg-[#141A2E] py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 dot-grid-bg opacity-35 pointer-events-none" />
          <Container>
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#60A5FA", fontFamily: "var(--font-heading)" }}>
                Why IT Meta Solutions
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                One Agency. Every Service. Zero Compromise.
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {whyPoints.map((pt, i) => {
                const Icon = pt.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ y: 16, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 hover:border-[#1D4ED8]/28 transition-all"
                  >
                    <div className="h-10 w-10 rounded-xl bg-[#1D4ED8]/15 flex items-center justify-center mb-4">
                      <Icon className="h-5 w-5 text-[#60A5FA]" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-1.5" style={{ fontFamily: "var(--font-heading)" }}>{pt.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">{pt.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <Link to="/contact" className="btn-primary">
                Start a Project Today <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Container>
        </section>

        {/* SEO */}
        <div className="bg-white">
          <SeoContentFaq content={seoContent} lightTheme={true} />
        </div>
      </div>
    </>
  );
}
