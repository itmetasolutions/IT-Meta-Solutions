import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Code2,
  Globe,
  HeartHandshake,
  Mail,
  MapPin,
  Megaphone,
  Palette,
  Phone,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Search,
  Users,
  Wand2,
  BriefcaseBusiness,
  Handshake,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import Container from "../../components/Container";
import SeoContentFaq from "../../components/SeoContentFaq";

// Import team member images
import abdullahKhalidImg from "../../assets/img/Abdullah Khalid ITMS.webp";
import moeezUlHaqImg from "../../assets/img/Moeez Ul Haq ITMS.webp";
import danishAhmadImg from "../../assets/img/Danish Ahmad ITMS.webp";
import hussainAliImg from "../../assets/img/Hussain Ali ITMS.webp";
import abdullahAbdulRazzaqImg from "../../assets/img/Abdullah Abdul Razzaq ITMS.webp";
import abdulMoeezImg from "../../assets/img/Abdul Moeez ITMS.webp";

// Import certificates and registration logos
import secpCertificate from "../../assets/img/SECP Certificate ITMS.png";
import fbrCertificate from "../../assets/img/FBR Certificate ITMS.png";
import secpLogo from "../../assets/img/SECP Logo ITMS.webp";
import fbrLogo from "../../assets/img/FBR Logo ITMS.webp";

/* ==================== HELPERS ==================== */

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

/* ==================== COMPONENTS ==================== */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-[#5025d1] via-purple-500 to-pink-500"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

function Badge({ children, icon: Icon }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </span>
  );
}

function StatCard({ icon: Icon, label, value, delay = 0 }) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { y: 16 }}
      whileInView={reduced ? {} : { y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-2.5 sm:p-3">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </div>
        <div className="min-w-0">
          <div className="text-lg sm:text-2xl font-bold text-white">{value}</div>
          <div className="text-xs sm:text-sm text-zinc-400">{label}</div>
        </div>
      </div>
    </motion.div>
  );
}

function FeatureCard({ icon: Icon, title, description, features, delay = 0 }) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { y: 16 }}
      whileInView={reduced ? {} : { y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={reduced ? {} : { y: -6, transition: { duration: 0.2 } }}
      className="group h-full rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm transition-all hover:border-[#5025d1]/50"
    >
      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="flex-shrink-0 rounded-2xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-2.5 sm:p-3">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-white">{title}</h3>
          </div>
        </div>

        {/* Description */}
        <p className="mt-3 sm:mt-4 text-sm leading-relaxed text-zinc-300">{description}</p>

        {/* Features */}
        {features && features.length > 0 && (
          <ul className="mt-5 sm:mt-6 space-y-2.5 sm:space-y-3">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                <span className="text-sm text-zinc-200">{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

function TeamCard({ name, role, skills, image, delay = 0 }) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { y: 16, opacity: 0 }}
      whileInView={reduced ? {} : { y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={reduced ? {} : { y: -8, transition: { duration: 0.25 } }}
      className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] via-white/[0.04] to-transparent backdrop-blur-md transition-all duration-300 hover:border-[#5025d1]/60 hover:shadow-2xl hover:shadow-[#5025d1]/20"
    >
      {/* Gradient Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#5025d1]/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative p-6 sm:p-8">
        {/* Centered Image */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Decorative Ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#5025d1] via-purple-500 to-pink-500 opacity-60 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative rounded-full border-2 border-white/20 bg-zinc-900 p-1">
              {image ? (
                <img
                  src={image}
                  alt={name}
                  className="h-28 w-28 sm:h-32 sm:w-32 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-full border border-dashed border-white/20 bg-white/[0.02] grid place-items-center text-xs text-zinc-500">
                  Photo
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Name */}
        <h3 className="mt-5 text-center text-xl sm:text-2xl font-bold text-white tracking-tight">
          {name}
        </h3>

        {/* Role Badges */}
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {role.split(" • ").map((r, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#5025d1]/30 to-purple-600/30 px-3 py-1.5 text-xs font-semibold text-purple-200 ring-1 ring-inset ring-[#5025d1]/40"
            >
              <BriefcaseBusiness className="h-3.5 w-3.5" />
              {r}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Skills */}
        <ul className="space-y-2.5">
          {skills.map((skill, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                <BadgeCheck className="h-3.5 w-3.5 text-emerald-400" />
              </div>
              <span className="text-sm text-zinc-300 leading-relaxed">{skill}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function ContactCard() {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { y: 16 }}
      whileInView={reduced ? {} : { y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 backdrop-blur-sm"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <div className="text-lg font-bold text-white">Get in Touch</div>
          <div className="mt-4 grid gap-3 text-sm text-zinc-300">
            <a
              href="tel:+923271804037"
              className="flex items-center gap-3 hover:text-white transition-colors"
            >
              <div className="rounded-lg bg-gradient-to-br from-[#5025d1] to-purple-600 p-2">
                <Phone className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-white">+92 327 180 4037</span>
            </a>
            <a
              href="mailto:info@itmetasolutions.com"
              className="flex items-center gap-3 hover:text-white transition-colors"
            >
              <div className="rounded-lg bg-gradient-to-br from-[#5025d1] to-purple-600 p-2">
                <Mail className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-white">info@itmetasolutions.com</span>
            </a>
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-gradient-to-br from-[#5025d1] to-purple-600 p-2">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <span>Office No M32 1st Floor, City Star Plaza, Maulana Shaukat Ali Rd, Township Block 1 Sector B 1 Lahore, 54700</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#5025d1] shadow-lg transition-all hover:scale-105"
          >
            Get a Proposal
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="https://wa.me/923271804037"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
          >
            <Phone className="h-4 w-4" />
            WhatsApp Now
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ==================== DATA ==================== */

const teamMembers = [
  {
    name: "Abdullah Khalid",
    role: "Web Developer • SEO Expert",
    image: abdullahKhalidImg,
    skills: [
      "Conversion-focused website builds",
      "Technical SEO structure",
      "Speed + mobile optimization",
      "Landing pages for ads",
    ],
  },
  {
    name: "Moeez ul Haq",
    role: "Digital Marketer",
    image: moeezUlHaqImg,
    skills: [
      "Meta Ads funnel strategy",
      "Audience targeting + retargeting",
      "Creative testing & scaling",
      "Lead + sales optimization",
    ],
  },
  {
    name: "Abdul Moeez",
    role: "Salesforce Expert",
    image: abdulMoeezImg,
    skills: [
      "Salesforce implementation & customization",
      "Sales Cloud & Service Cloud",
      "Lightning Web Components",
      "Workflow automation & integrations",
    ],
  },
  {
    name: "Danish Ahmad",
    role: "Graphic Designer",
    image: danishAhmadImg,
    skills: [
      "Brand identity & social templates",
      "Ad creatives for performance",
      "Packaging & print-ready designs",
      "Modern UI visuals",
    ],
  },
  {
    name: "Hussain Ali",
    role: "Dropshipping Expert",
    image: hussainAliImg,
    skills: [
      "Product research & validation",
      "Store setup + optimization",
      "Offer strategy & positioning",
      "Order flow + scaling basics",
    ],
  },
  {
    name: "Abdullah Abdul Razzaq",
    role: "Video Editor • Graphic Designer",
    image: abdullahAbdulRazzaqImg,
    skills: [
      "Video editing and production",
      "Graphic design for social media",
      "Motion graphics",
      "Brand visuals",
    ],
  },
];

const seoContent = {
  kicker: "About Us",
  title: "A Lahore-Based Salesforce and Ecommerce Growth Team",
  subtitle:
    "We are a SECP registered IT firm delivering Salesforce implementation, LWC development, Experience Cloud portals, and high-converting Shopify builds.",
  paragraphs: [
    "Our team blends CRM automation, performance marketing, and conversion-focused web development to create measurable growth for local and global clients.",
    "From data cleaning in Salesforce to Meta Ads ROAS optimization, we focus on clarity, speed, and results.",
  ],
  bullets: [
    "Salesforce automation experts and LWC development services",
    "Experience Cloud portal development for customer self-service",
    "Shopify and WooCommerce conversion optimization",
    "Performance marketing with ROAS and CPA improvements",
  ],
};

const seoFaqs = [
  {
    q: "Are you a SECP registered IT firm in Lahore?",
    a: "Yes. We are SECP and FBR registered and operate from City Star Plaza, Township, Lahore.",
  },
  {
    q: "Do you specialize in Salesforce implementation?",
    a: "Yes. We deliver Salesforce implementation, LWC development, Experience Cloud portals, and CRM automation.",
  },
  {
    q: "Do you build high-converting ecommerce stores?",
    a: "Yes. We build performance-optimized Shopify and WooCommerce stores with CRO and custom functionality.",
  },
  {
    q: "Do you work with UK and US startups?",
    a: "Yes. We support international clients with clear timelines, communication, and performance reporting.",
  },
];

/* ==================== PAGE ==================== */

export default function AboutUsPage() {
  const reduced = usePrefersReducedMotion();

  return (
    <>
      <Helmet>
        <title>IT Meta Solutions - About Us | Premium Digital Growth Agency</title>
        <meta
          name="description"
          content="SECP registered Lahore agency for Salesforce implementation, LWC, Experience Cloud, ecommerce, and performance marketing."
        />
        <meta
          name="keywords"
          content="digital agency, web development company, SEO services, social media marketing, digital marketing agency, IT Meta Solutions"
        />
        <meta property="og:title" content="IT Meta Solutions - About Us | Premium Digital Growth Agency" />
        <meta
          property="og:description"
          content="Learn about IT Meta Solutions - a premium digital growth agency specializing in web development, SEO, social media marketing, and performance advertising for businesses in Pakistan, Canada, UK, and USA."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://itmetasolutions.com/about" />
        <meta property="og:url" content="https://itmetasolutions.com/about" />
        <meta property="og:image" content="https://itmetasolutions.com/favicon.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="IT Meta Solutions - About Us | Premium Digital Growth Agency" />
        <meta
          name="twitter:description"
          content="Learn about IT Meta Solutions - a premium digital growth agency specializing in web development, SEO, social media marketing, and performance advertising for businesses in Pakistan, Canada, UK, and USA."
        />
        <meta name="twitter:image" content="https://itmetasolutions.com/favicon.webp" />
      </Helmet>

      <div className="relative min-h-screen">
        <ScrollProgress />

        {/* ==================== HERO SECTION ==================== */}
        <section className="relative pt-28 pb-12 sm:pt-36 sm:pb-16">
          <Container>
            <div className="mx-auto max-w-5xl text-center">
              <motion.div
                initial={reduced ? false : { y: 16 }}
                animate={reduced ? {} : { y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-wrap items-center justify-center gap-3"
              >
                <Badge icon={ShieldCheck}>Trust-First Execution</Badge>
                <Badge icon={Target}>Performance-Driven</Badge>
                <Badge icon={Globe}>Global Markets</Badge>
              </motion.div>

              <motion.h1
                initial={reduced ? false : { y: 16 }}
                animate={reduced ? {} : { y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-8 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
              >
                Building Brands &
                <br />
                <span className="bg-gradient-to-r from-[#5025d1] via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Growth Systems
                </span>
              </motion.h1>

              <motion.p
                initial={reduced ? false : { y: 16 }}
                animate={reduced ? {} : { y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 text-xl text-zinc-300 sm:text-2xl max-w-3xl mx-auto"
              >
                We help businesses in Pakistan, Canada, UK, and USA build a premium digital presence
                and scale with performance marketing — focused on conversion, trust, and measurable
                results.
              </motion.p>

              {/* Stats Grid */}
              <motion.div
                initial={reduced ? false : { y: 16 }}
                animate={reduced ? {} : { y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-10 grid gap-4 sm:grid-cols-3"
              >
                <StatCard icon={CalendarDays} label="Total Experience" value="5+ Years" delay={0.1} />
                <StatCard icon={ShieldCheck} label="Professional" value="3+ Years" delay={0.2} />
                <StatCard icon={Globe} label="Markets Served" value="PK • CA • UK • USA" delay={0.3} />
              </motion.div>
            </div>
          </Container>
        </section>

        {/* ==================== CONTACT CARD ==================== */}
        <section className="py-8 sm:py-12">
          <Container>
            <ContactCard />
          </Container>
        </section>

        {/* ==================== VISION & MISSION ==================== */}
        <section className="py-16 sm:py-20">
          <Container>
            <motion.div
              initial={reduced ? false : { y: 16 }}
              whileInView={reduced ? {} : { y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <Badge icon={Sparkles}>Our Foundation</Badge>
              <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
                Vision & Mission
              </h2>
              <p className="mt-4 text-lg text-zinc-300 max-w-3xl mx-auto">
                What drives us and what we aim to achieve for every client
              </p>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-2">
              <FeatureCard
                icon={Wand2}
                title="Our Vision"
                description="To become a trusted global digital growth partner for businesses by building brands and marketing systems that deliver measurable results."
                features={[
                  "Premium brand experiences",
                  "International-quality execution",
                  "Trust-driven digital presence",
                  "Long-term growth systems",
                ]}
                delay={0.1}
              />
              <FeatureCard
                icon={HeartHandshake}
                title="Our Mission"
                description="To help businesses grow through modern web development, creative production, and performance marketing — with clear communication, fast delivery, and honest reporting."
                features={[
                  "Build conversion-first websites & stores",
                  "Create high-impact design & video",
                  "Run ads with tracking & optimization",
                  "Support clients with clear processes",
                ]}
                delay={0.2}
              />
            </div>
          </Container>
        </section>

        {/* ==================== WHAT MAKES US DIFFERENT ==================== */}
        <section className="py-16 sm:py-20">
          <Container>
            <motion.div
              initial={reduced ? false : { y: 16 }}
              whileInView={reduced ? {} : { y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <Badge icon={Sparkles}>Why Choose Us</Badge>
              <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
                What Makes Us Different
              </h2>
              <p className="mt-4 text-lg text-zinc-300 max-w-3xl mx-auto">
                We don't just 'post' or 'run ads' — we build complete systems
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={ShieldCheck}
                title="Strategy + Execution"
                description="We don't just execute — we plan strategically and then deliver with precision."
                features={[
                  "Strategy + execution combined",
                  "Conversion-first approach",
                  "Creative testing mindset",
                  "Transparent reporting",
                ]}
                delay={0.1}
              />
              <FeatureCard
                icon={Handshake}
                title="How We Work"
                description="Simple approvals, fast iterations, and weekly updates keep you in the loop."
                features={[
                  "Discovery → plan → execution",
                  "Weekly progress updates",
                  "Clear deliverables",
                  "Optimization & scaling roadmap",
                ]}
                delay={0.2}
              />
              <FeatureCard
                icon={Globe}
                title="Markets We Serve"
                description="We understand local and international buyer behavior across multiple markets."
                features={[
                  "Pakistan (PKR, COD, local trust)",
                  "Canada (service-first conversion)",
                  "UK (premium minimal + compliance)",
                  "USA (fast funnels + strong CTAs)",
                ]}
                delay={0.3}
              />
            </div>
          </Container>
        </section>

        {/* ==================== WHAT WE DELIVER ==================== */}
        <section className="py-16 sm:py-20">
          <Container>
            <motion.div
              initial={reduced ? false : { y: 16 }}
              whileInView={reduced ? {} : { y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <Badge icon={Sparkles}>Our Services</Badge>
              <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
                A Complete System, Not Scattered Services
              </h2>
              <p className="mt-4 text-lg text-zinc-300 max-w-3xl mx-auto">
                Whether you need a website, branding, ads, or full management — everything connects
                into one growth engine
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={Code2}
                title="Web Development"
                description="Business websites, landing pages, and e-commerce stores designed to convert."
                features={[
                  "Mobile-first UI",
                  "WhatsApp / forms integration",
                  "Speed optimization",
                  "SEO-ready structure",
                ]}
                delay={0.1}
              />
              <FeatureCard
                icon={Megaphone}
                title="Performance Marketing"
                description="Meta Ads systems built for leads and sales — with tracking & optimization."
                features={[
                  "Funnel campaigns",
                  "Retargeting pools",
                  "Creative testing",
                  "Detailed reporting",
                ]}
                delay={0.2}
              />
              <FeatureCard
                icon={Search}
                title="SEO & Content"
                description="Search optimization that drives qualified traffic and long-term visibility."
                features={[
                  "Technical SEO fixes",
                  "On-page optimization",
                  "Content strategy",
                  "Local SEO structure",
                ]}
                delay={0.3}
              />
              <FeatureCard
                icon={Palette}
                title="Design & Video"
                description="Modern creatives that make your brand look premium and improve ad performance."
                features={[
                  "Ad creatives",
                  "Brand kits",
                  "Reels editing",
                  "Social templates",
                ]}
                delay={0.4}
              />
            </div>

            <motion.div
              initial={reduced ? false : { y: 16 }}
              whileInView={reduced ? {} : { y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex justify-center"
            >
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5025d1] to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-[#5025d1]/30 transition-all hover:shadow-xl hover:shadow-[#5025d1]/40 hover:scale-105"
              >
                View All Services
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </Container>
        </section>

        {/* ==================== TEAM SECTION ==================== */}
        <section className="py-16 sm:py-20">
          <Container>
            <motion.div
              initial={reduced ? false : { y: 16 }}
              whileInView={reduced ? {} : { y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <Badge icon={Users}>Our Team</Badge>
              <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
                Skilled Specialists, One System
              </h2>
              <p className="mt-4 text-lg text-zinc-300 max-w-3xl mx-auto">
                A focused team with clear roles — so design, development, SEO, and ads work together
                seamlessly
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member, index) => (
                <TeamCard
                  key={member.name}
                  name={member.name}
                  role={member.role}
                  image={member.image}
                  skills={member.skills}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </Container>
        </section>

        {/* ==================== CERTIFICATIONS SECTION ==================== */}
        <section className="py-16 sm:py-20">
          <Container>
            <motion.div
              initial={reduced ? false : { y: 16 }}
              whileInView={reduced ? {} : { y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <Badge icon={Award}>Verified & Trusted</Badge>
              <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
                Registered & Certified
              </h2>
              <p className="mt-4 text-lg text-zinc-300 max-w-3xl mx-auto">
                IT Meta Solutions is a legally registered company with the Government of Pakistan,
                ensuring complete transparency and trust in our business operations.
              </p>
            </motion.div>

            {/* Registration Info Cards */}
            <div className="grid gap-6 md:grid-cols-2 mb-12">
              {/* SECP Registration */}
              <motion.div
                initial={reduced ? false : { y: 16, opacity: 0 }}
                whileInView={reduced ? {} : { y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 sm:p-8 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img src={secpLogo} alt="SECP Logo" className="h-14 w-auto object-contain" />
                  <div>
                    <h3 className="text-xl font-bold text-white">SECP Registered</h3>
                    <p className="text-sm text-zinc-400">Securities and Exchange Commission of Pakistan</p>
                  </div>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-1">Company Registration Number</div>
                  <div className="text-2xl font-bold text-white tracking-wide">N0298154</div>
                </div>
              </motion.div>

              {/* FBR Registration */}
              <motion.div
                initial={reduced ? false : { y: 16, opacity: 0 }}
                whileInView={reduced ? {} : { y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 sm:p-8 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img src={fbrLogo} alt="FBR Logo" className="h-14 w-auto object-contain" />
                  <div>
                    <h3 className="text-xl font-bold text-white">FBR Tax Registered</h3>
                    <p className="text-sm text-zinc-400">Federal Board of Revenue, Pakistan</p>
                  </div>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-1">National Tax Number (NTN)</div>
                  <div className="text-2xl font-bold text-white tracking-wide">G903294</div>
                </div>
              </motion.div>
            </div>

            {/* Certificates Display */}
            <motion.div
              initial={reduced ? false : { y: 16 }}
              whileInView={reduced ? {} : { y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mb-8"
            >
              <h3 className="text-2xl font-bold text-white mb-2">Official Certificates</h3>
              <p className="text-zinc-400">View our registration certificates for complete transparency</p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* SECP Certificate */}
              <motion.div
                initial={reduced ? false : { y: 16, opacity: 0 }}
                whileInView={reduced ? {} : { y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-4 backdrop-blur-sm overflow-hidden transition-all hover:border-[#5025d1]/50"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[#5025d1]/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <div className="text-center mb-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#5025d1]/20 px-3 py-1.5 text-xs font-semibold text-purple-200">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      SECP Certificate
                    </span>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-white">
                    <img
                      src={secpCertificate}
                      alt="SECP Registration Certificate - IT Meta Solutions"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </motion.div>

              {/* FBR Certificate */}
              <motion.div
                initial={reduced ? false : { y: 16, opacity: 0 }}
                whileInView={reduced ? {} : { y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-4 backdrop-blur-sm overflow-hidden transition-all hover:border-[#5025d1]/50"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[#5025d1]/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <div className="text-center mb-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-200">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      FBR Certificate
                    </span>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-white">
                    <img
                      src={fbrCertificate}
                      alt="FBR Tax Registration Certificate - IT Meta Solutions"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Trust Note */}
            <motion.div
              initial={reduced ? false : { y: 16 }}
              whileInView={reduced ? {} : { y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 text-center"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
                <CheckCircle2 className="h-4 w-4" />
                Verified legal entity operating under Pakistan's corporate laws
              </div>
            </motion.div>
          </Container>
        </section>

        <SeoContentFaq content={seoContent} faqs={seoFaqs} />

        {/* ==================== CTA SECTION ==================== */}
        <section className="py-16 sm:py-20">
          <Container>
            <motion.div
              initial={reduced ? false : { y: 16 }}
              whileInView={reduced ? {} : { y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#5025d1]/20 to-purple-600/20 p-12 backdrop-blur-sm sm:p-16"
            >
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-4xl font-bold text-white sm:text-5xl">
                  Ready to Build Something Strong?
                </h2>
                <p className="mt-6 text-xl text-zinc-300">
                  If you want a premium website + marketing system that generates results, contact us
                  and we'll share a clear plan.
                </p>

                {/* Trust Badges */}
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    { icon: ShieldCheck, title: "Trust-First", desc: "Clear communication and honest reporting" },
                    { icon: Target, title: "Performance", desc: "Focused on leads, sales, and ROAS" },
                    { icon: Rocket, title: "Fast Delivery", desc: "Quick execution with clean approvals" },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <div className="rounded-xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-2">
                          <item.icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-semibold text-white">{item.title}</div>
                          <div className="text-xs text-zinc-400">{item.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-[#5025d1] shadow-lg transition-all hover:scale-105"
                  >
                    Request a Proposal
                    <ArrowRight className="h-5 w-5" />
                  </Link>

                  <a
                    href="https://wa.me/923271804037"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
                  >
                    <Phone className="h-5 w-5" />
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>
      </div>
    </>
  );
}
