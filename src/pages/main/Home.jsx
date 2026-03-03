import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
  Code2,
  Palette,
  Megaphone,
  Target,
  CheckCircle2,
  Star,
  Quote,
  Rocket,
  Shield,
  Clock,
  Award,
  Mail,
  Phone,
  Globe,
  PlayCircle,
  ChevronRight,
  Building2,
  Cloud,
  Database,
  ShieldCheck,
  ShoppingCart,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import SeoContentFaq from "../../components/SeoContentFaq";

/* ==================== IMAGE PLACEHOLDERS ====================
 * Add your image imports here. Replace placeholder paths with actual image URLs.
 *
 * SUGGESTED IMAGE SIZES:
 * - heroShowcaseImage: 1200x800px (main showcase/featured image)
 * - trustedByLogos: 180x60px each (client/partner logos, transparent PNG preferred)
 * - teamImage: 800x600px (team or office photo)
 * - featuredWorkImage: 1000x600px (portfolio highlight image)
 * - clientSliderLogos: 200x80px each (auto-scrolling brand slider logos, transparent PNG)
 *
 * Example usage:
 * const heroShowcaseImage = "/images/hero-showcase.jpg";
 * const trustedByLogos = [
 *   "/images/logos/client1.png",
 *   "/images/logos/client2.png",
 * ];
 */

// TODO: Add your image imports below this line
// const heroShowcaseImage = ""; // Suggested size: 1200x800px
// const trustedByLogos = []; // Suggested size: 180x60px each

// FEATURED BANNER BACKGROUND IMAGE
// Suggested size: 1920x600px (wide banner), high quality JPG or WebP
import showcaseBannerImage from "../../assets/img/Crafting Digital Excellence Since Day One BG Image.webp";

// CLIENT SLIDER LOGOS
import ekommartLogo from "../../assets/img/Ekommart Logo ITMS.webp";
import eSahulatMartLogo from "../../assets/img/E Sahulat Mart Logo ITMS.webp";
import inHomesDirectLogo from "../../assets/img/INHomes Direct Logo ITMS.webp";
import moreHomesGroupLogo from "../../assets/img/More Homes Group Logo ITMS.webp";
import unitedMuslimTravelsLogo from "../../assets/img/United Muslim Travels Logo ITMS.webp";
import hallaGullaLogo from "../../assets/img/Halla Gulla Logo ITMS.webp";
import hikmabioticsLogo from "../../assets/img/Hikmabiotics Logo ITMS.webp";
import heavenlyPurchaseLogo from "../../assets/img/Heavenly Purchase Logo ITMS.webp";
import theRoyalPeaksLogo from "../../assets/img/The Royal Peaks Logo ITMS.webp";

// Client slider data
const clientSliderData = [
  { name: "Ekommart", logo: ekommartLogo },
  { name: "E Sahulat Mart", logo: eSahulatMartLogo },
  { name: "IN Homes Direct", logo: inHomesDirectLogo },
  { name: "More Homes Group", logo: moreHomesGroupLogo },
  { name: "United Muslim Travels", logo: unitedMuslimTravelsLogo },
  { name: "Halla Gulla", logo: hallaGullaLogo },
  { name: "Hikmabiotics", logo: hikmabioticsLogo },
  { name: "Heavenly Purchase", logo: heavenlyPurchaseLogo },
  { name: "The Royal Peaks", logo: theRoyalPeaksLogo },
];

/* ==================== HELPERS ==================== */

const cx = (...classes) => classes.filter(Boolean).join(" ");

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

function GradientBlob({ className, color = "rgba(80,37,209,0.3)" }) {
  return (
    <div
      aria-hidden
      className={cx("pointer-events-none absolute -z-10 blur-3xl", className)}
      style={{
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
      }}
    />
  );
}

function Badge({ children, icon: Icon }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white backdrop-blur-sm">
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </span>
  );
}

function SectionHeading({ badge, title, description, centered = false }) {
  return (
    <div className={cx("mb-12", centered && "text-center")}>
      {badge && (
        <div className={cx("mb-4", centered && "flex justify-center")}>
          <Badge icon={Sparkles}>{badge}</Badge>
        </div>
      )}
      <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && (
        <p className={cx("mt-4 text-lg text-zinc-300 sm:text-xl max-w-3xl", centered && "mx-auto")}>
          {description}
        </p>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, value, label, delay = 0 }) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { y: 16 }}
      whileInView={reduced ? {} : { y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-5 sm:p-6 backdrop-blur-sm"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-2.5 sm:p-3">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </div>
        <div className="min-w-0">
          <div className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">{value}</div>
          <div className="mt-1 text-xs sm:text-sm text-zinc-400">{label}</div>
        </div>
      </div>
    </motion.div>
  );
}

function ServiceCard({ service, delay = 0 }) {
  const reduced = usePrefersReducedMotion();
  const Icon = service.icon;
  const gradient = service.gradient || "from-[#5025d1] to-purple-600";

  return (
    <Link to={service.link || "/services"} className="block h-full">
      <motion.div
        initial={reduced ? false : { y: 16 }}
        whileInView={reduced ? {} : { y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, delay, ease: "easeOut" }}
        whileHover={reduced ? {} : { y: -8, transition: { duration: 0.2 } }}
        className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm transition-all hover:border-white/20"
      >
        {/* Animated gradient background on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500`} />

        {/* Glow effect */}
        <div className={`absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br ${gradient} opacity-20 blur-3xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-30`} />

        <div className="relative p-6 sm:p-8">
          {/* Icon with gradient background */}
          <div className="flex items-start justify-between">
            <div className={`inline-flex rounded-2xl bg-gradient-to-br ${gradient} p-4 shadow-lg`}>
              <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
            </div>
            <ArrowRight className="h-5 w-5 text-white/30 transition-all duration-300 group-hover:text-white group-hover:translate-x-1" />
          </div>

          <h3 className="mt-6 text-xl sm:text-2xl font-bold text-white">{service.title}</h3>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">{service.description}</p>

          <ul className="mt-6 space-y-3">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className={`mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-r ${gradient} flex-shrink-0`} />
                <span className="text-sm text-zinc-300">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Bottom gradient line */}
          <div className={`mt-6 h-1 w-0 rounded-full bg-gradient-to-r ${gradient} transition-all duration-500 group-hover:w-full`} />
        </div>
      </motion.div>
    </Link>
  );
}

function ProjectCard({ project, delay = 0 }) {
  const reduced = usePrefersReducedMotion();
  const Icon = project.icon;

  return (
    <Link to={project.link} className="block">
      <motion.div
        initial={reduced ? false : { y: 16 }}
        whileInView={reduced ? {} : { y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        whileHover={reduced ? {} : { y: -4, transition: { duration: 0.2 } }}
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm transition-all hover:border-[#5025d1]/50"
      >
        {/* Animated background glow */}
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-[#5025d1]/20 to-purple-600/20 blur-3xl transition-all group-hover:scale-150" />

        <div className="relative flex flex-col sm:flex-row">
          {/* Left: Icon & Tags */}
          <div className="flex items-center gap-4 p-5 sm:w-auto sm:flex-shrink-0 sm:border-r sm:border-white/10">
            <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-3">
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div className="sm:hidden">
              <h3 className="text-lg font-bold text-white">{project.title}</h3>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {project.tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded-full bg-[#5025d1]/20 px-2 py-0.5 text-xs font-medium text-purple-300 border border-[#5025d1]/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Center: Content */}
          <div className="flex-1 p-5 pt-0 sm:pt-5">
            <div className="hidden sm:block">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-lg font-bold text-white">{project.title}</h3>
                {project.tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded-full bg-[#5025d1]/20 px-2.5 py-0.5 text-xs font-medium text-purple-300 border border-[#5025d1]/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-2 text-sm text-zinc-300 line-clamp-2">{project.description}</p>
          </div>

          {/* Right: Results & CTA */}
          <div className="flex items-center gap-4 border-t border-white/10 p-5 sm:border-l sm:border-t-0 sm:w-auto sm:flex-shrink-0">
            {project.results?.slice(0, 2).map((result, idx) => (
              <div key={idx} className="text-center min-w-[70px]">
                <div className="text-lg font-bold text-white">{result.value}</div>
                <div className="text-xs text-zinc-400">{result.label}</div>
              </div>
            ))}
            <div className="flex items-center gap-1 text-[#5025d1] transition-all group-hover:gap-2 ml-auto sm:ml-2">
              <ArrowRight className="h-5 w-5" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

function SalesforceProjectCard({ project, delay = 0 }) {
  const reduced = usePrefersReducedMotion();
  const Icon = project.icon;

  return (
    <Link to={project.link} className="block h-full">
      <motion.div
        initial={reduced ? false : { y: 16 }}
        whileInView={reduced ? {} : { y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        whileHover={reduced ? {} : { y: -8, transition: { duration: 0.2 } }}
        className={cx(
          "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm transition-all",
          !project.placeholder && "hover:border-[#5025d1]/50"
        )}
      >
        {/* Animated background glow */}
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-[#5025d1]/20 to-purple-600/20 blur-3xl transition-all group-hover:scale-150" />

        {/* Icon Header */}
        <div className="relative p-6 pb-4">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 rounded-2xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-3">
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-[#5025d1]/20 px-3 py-1 text-xs font-medium text-purple-300 border border-[#5025d1]/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <h3 className={cx("mt-4 text-xl font-bold leading-tight", project.placeholder ? "text-zinc-500" : "text-white")}>
            {project.title}
          </h3>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col px-6 pb-6">
          <p className={cx("text-sm leading-relaxed line-clamp-3", project.placeholder ? "text-zinc-600" : "text-zinc-300")}>
            {project.description}
          </p>

          {/* Spacer to push results to bottom */}
          <div className="flex-1 min-h-4" />

          {project.results && project.results.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              {project.results.map((result, idx) => (
                <div key={idx} className="rounded-xl bg-white/5 p-3 text-center">
                  <div className="text-lg font-bold text-white">{result.value}</div>
                  <div className="text-xs text-zinc-400">{result.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* View case study link */}
          <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#5025d1] transition-all group-hover:gap-3">
            <span>View case study</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

function TestimonialCard({ testimonial, delay = 0 }) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { y: 16 }}
      whileInView={reduced ? {} : { y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-8 backdrop-blur-sm"
    >
      <Quote className="h-12 w-12 text-[#5025d1]/30" />

      <div className="mt-4 flex gap-1">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      <p className="mt-4 text-zinc-200 leading-relaxed">{testimonial.quote}</p>

      <div className="mt-6 flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#5025d1] to-purple-600 p-0.5">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-black">
            <span className="text-lg font-bold text-white">
              {testimonial.name.charAt(0)}
            </span>
          </div>
        </div>
        <div>
          <div className="font-semibold text-white">{testimonial.name}</div>
          <div className="text-sm text-zinc-400">{testimonial.role}</div>
        </div>
      </div>
    </motion.div>
  );
}

function IndustryCard({ industry, delay = 0 }) {
  const reduced = usePrefersReducedMotion();
  const Icon = industry.icon;
  const gradient = industry.gradient || "from-[#5025d1] to-purple-600";

  return (
    <motion.div
      initial={reduced ? false : { y: 16 }}
      whileInView={reduced ? {} : { y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={reduced ? {} : { y: -6, transition: { duration: 0.2 } }}
      className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-7 backdrop-blur-sm transition-all hover:border-white/20"
    >
      <div className={`absolute -right-24 -top-24 h-40 w-40 rounded-full bg-gradient-to-br ${gradient} opacity-20 blur-3xl transition-all duration-500 group-hover:scale-125`} />

      <div className="relative">
        <div className={`inline-flex rounded-2xl bg-gradient-to-br ${gradient} p-3 shadow-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="mt-5 text-xl font-bold text-white">{industry.title}</h3>
        <p className="mt-2 text-sm text-zinc-300 leading-relaxed">{industry.description}</p>

        <ul className="mt-5 space-y-2">
          {industry.highlights.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-zinc-300">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function FaqItem({ item, delay = 0 }) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.details
      initial={reduced ? false : { y: 16 }}
      whileInView={reduced ? {} : { y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
      className="group rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 backdrop-blur-sm"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
        <h4 className="text-lg font-semibold text-white">{item.question}</h4>
        <ChevronRight className="h-5 w-5 flex-shrink-0 text-zinc-300 transition group-open:rotate-90" />
      </summary>
      <p className="mt-3 text-sm text-zinc-300 leading-relaxed">{item.answer}</p>
    </motion.details>
  );
}

/* ==================== DATA ==================== */

const stats = [
  { icon: Rocket, value: "50+", label: "Projects Launched" },
  { icon: Users, value: "40+", label: "Happy Clients" },
  { icon: TrendingUp, value: "200%", label: "Avg. Growth Rate" },
  { icon: Award, value: "100%", label: "Client Satisfaction" },
];

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Fast, modern websites built with cutting-edge technologies for maximum performance and conversion.",
    features: [
      "Custom responsive websites",
      "E-commerce platforms (Shopify, WooCommerce)",
      "Web applications & dashboards",
      "Performance optimization & SEO",
    ],
    gradient: "from-blue-500 to-cyan-500",
    link: "/web-development-expertise",
  },
  {
    icon: Palette,
    title: "Graphic Designing",
    description: "Stunning visuals that capture attention, communicate your message, and elevate your brand identity.",
    features: [
      "Logo & brand identity design",
      "Marketing materials & print design",
      "Social media graphics",
      "Packaging & merchandise design",
    ],
    gradient: "from-pink-500 to-rose-500",
    link: "/graphic-designing-expertise",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Data-driven marketing strategies that generate leads, boost sales, and grow your brand.",
    features: [
      "Social media marketing",
      "Google & Meta Ads campaigns",
      "Content marketing & SEO",
      "Analytics & reporting",
    ],
    gradient: "from-orange-500 to-amber-500",
    link: "/digital-marketing-expertise",
  },
  {
    icon: Search,
    title: "SEO",
    description: "Technical SEO, on-page structure, and content strategy to grow organic traffic and leads.",
    features: [
      "Technical audits and fixes",
      "Keyword intent mapping",
      "On-page optimization",
      "Local SEO and GBP setup",
    ],
    gradient: "from-emerald-500 to-teal-500",
    link: "/seo-expertise",
  },
  {
    icon: Cloud,
    title: "Salesforce",
    description: "Expert Salesforce solutions to streamline your CRM, automate workflows, and drive business growth.",
    features: [
      "Salesforce implementation & customization",
      "Lightning Web Components (LWC)",
      "Experience Cloud portals",
      "Integration & automation",
    ],
    gradient: "from-[#5025d1] to-purple-600",
    link: "/salesforce-expertise",
  },
];

const featuredProjects = [
  {
    title: "Ekommart",
    description: "Complete e-commerce brand build from scratch — website, social media, and Meta Ads generating 3,300+ purchases in 5 months.",
    tags: ["Brand Build", "Meta Ads"],
    icon: Sparkles,
    results: [
      { value: "3,300+", label: "Purchases" },
      { value: "164 PKR", label: "Best CPA" },
    ],
    link: "/case-study/ekommart",
  },
  {
    title: "E Sahulat Mart",
    description: "Modern e-commerce platform with product catalog, shopping cart, payment integration, and complete order management system.",
    tags: ["E-commerce", "Web Dev"],
    icon: ShoppingCart,
    results: [
      { value: "Modern", label: "Storefront" },
      { value: "Secure", label: "Payments" },
    ],
    link: "/case-study/esahulat-mart",
  },
  {
    title: "IN Homes Direct",
    description: "Logic-driven Shopify storefront with custom calculators for area-to-pack conversion, real-time pricing, and survey-based estimates.",
    tags: ["Shopify", "Custom Dev"],
    icon: Code2,
    results: [
      { value: "Custom", label: "Calculators" },
      { value: "Real-time", label: "Pricing" },
    ],
    link: "/case-study/inhomes-direct",
  },
  {
    title: "More Homes Group",
    description: "Comprehensive property management platform with listings, tenant management, maintenance tracking, and financial reporting.",
    tags: ["Web App", "Platform"],
    icon: Building2,
    results: [
      { value: "Streamlined", label: "Operations" },
      { value: "Automated", label: "Reports" },
    ],
    link: "/case-study/more-homes-group",
  },
  {
    title: "United Muslim Travels",
    description: "Complete brand building and digital marketing campaign including brand identity, website development, and performance marketing.",
    tags: ["Branding", "Marketing"],
    icon: Megaphone,
    results: [
      { value: "Brand", label: "Built" },
      { value: "Marketing", label: "Executed" },
    ],
    link: "/case-studies/united-muslim-travels-brand-build",
  },
];

const salesforceProjects = [
  {
    title: "Duplicate Check & Data Validation",
    description: "Salesforce components for duplicate prevention and data validation — keeping CRM data clean and reporting accurate.",
    tags: ["Salesforce", "Data Quality"],
    icon: ShieldCheck,
    results: [
      { value: "Cleaner", label: "CRM Data" },
      { value: "Better", label: "Reporting" },
    ],
    link: "/case-study/salesforce-duplicate-check",
  },
  {
    title: "Customer Portal for Environmental Issue Reporting",
    description: "User-friendly portal on Salesforce Experience Cloud for citizens to report environmental concerns, manage properties, process payments, and track requests.",
    tags: ["Salesforce", "Experience Cloud", "Custom Development"],
    icon: Globe,
    results: [
      { value: "Improved", label: "Transparency" },
      { value: "Better", label: "Citizen UX" },
    ],
    link: "/case-study/salesforce-experience-cloud-government-cloud",
  },
  {
    title: "Service Cloud Case Management + Property Data Automation",
    description: "Lightning Web Components application integrated with automation engine for real-time property data lead generation, agent dashboards, and role-based access.",
    tags: ["Salesforce", "Service Cloud", "LWC", "Automation"],
    icon: Cloud,
    results: [
      { value: "Qualified", label: "Leads" },
      { value: "Real-time", label: "Data" },
    ],
    link: "/case-study/salesforce-service-cloud-implementation",
  },
];

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "CEO, E-commerce Store",
    rating: 5,
    quote: "Our online sales tripled within 3 months. The website is beautiful, fast, and our customers love it. Best investment we've made!",
  },
  {
    name: "Michael Chen",
    role: "Marketing Director",
    rating: 5,
    quote: "The team's strategic approach to digital marketing transformed our online presence. We're now generating consistent leads every week.",
  },
  {
    name: "Fatima Khan",
    role: "Business Owner",
    rating: 5,
    quote: "Professional, responsive, and results-driven. They built our complete brand from scratch and the results speak for themselves.",
  },
];

const industries = [
  {
    title: "E-commerce",
    description: "High-converting storefronts that drive revenue and repeat customers.",
    highlights: ["Product discovery and UX", "Conversion rate optimization", "Performance ads and tracking"],
    icon: ShoppingCart,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    title: "Real Estate",
    description: "Property platforms that simplify listings, lead capture, and client journeys.",
    highlights: ["Custom listing systems", "Lead routing and CRM sync", "Automation for follow-ups"],
    icon: Building2,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "SaaS and Platforms",
    description: "Scalable products built for performance, retention, and growth.",
    highlights: ["Product UX and onboarding", "Usage analytics and insights", "Reliable architecture"],
    icon: Database,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Travel and Hospitality",
    description: "Experiences that build trust and turn visitors into bookings.",
    highlights: ["Booking journeys", "Multi-channel marketing", "Reputation and review growth"],
    icon: Globe,
    gradient: "from-orange-500 to-amber-500",
  },
  {
    title: "Healthcare and Wellness",
    description: "Clear messaging and conversions for services that need credibility.",
    highlights: ["Patient-first UX", "Secure forms and workflows", "Local SEO and visibility"],
    icon: ShieldCheck,
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    title: "Professional Services",
    description: "Brand systems that position expertise and generate qualified leads.",
    highlights: ["Lead capture funnels", "Authority content", "Reputation building"],
    icon: Target,
    gradient: "from-[#5025d1] to-purple-600",
  },
];

const faqs = [
  {
    question: "Are you Salesforce implementation partners?",
    answer: "Yes. We handle Salesforce implementation, LWC development services, Experience Cloud portal development, and CRM automation.",
  },
  {
    question: "Do you build high-converting e-commerce websites?",
    answer: "We build performance-optimized Shopify and WooCommerce stores, including custom calculators, real-time pricing, and CRO-focused UX.",
  },
  {
    question: "Can you improve ROAS and lower CPA on Meta Ads?",
    answer: "Yes. Our performance marketing team runs data-driven Meta Ads with testing, creative optimization, and ROAS-focused scaling.",
  },
  {
    question: "Do you offer Salesforce data cleaning and automation?",
    answer: "We clean CRM data, resolve duplicates, and automate lead generation using Salesforce Flow, rules, and custom LWC interfaces.",
  },
  {
    question: "Are you a SECP registered IT firm in Lahore?",
    answer: "Yes. We are an SECP and FBR registered IT firm based in City Star Plaza, Township, Lahore, serving Pakistan and global clients.",
  },
  {
    question: "How do we get started?",
    answer: "Book a discovery call and we will map scope, timeline, and pricing for Salesforce, e-commerce, or performance marketing.",
  },
];

const seoContent = {
  kicker: "Full-Service Agency",
  title: "Salesforce, E-commerce, and Performance Marketing Under One Roof",
  subtitle:
    "IT Meta Solutions is a Salesforce implementation partner and digital agency helping brands scale with LWC development, Experience Cloud portals, and high-converting ecommerce.",
  paragraphs: [
    "We build performance-optimized Shopify and WooCommerce stores, custom web apps, and CRM automation that connect sales, marketing, and service teams.",
    "From Meta Ads ROAS optimization to data-driven lead generation, our team delivers measurable growth for startups and enterprise brands in Pakistan, the UK, and the US.",
  ],
  bullets: [
    "Salesforce LWC development services and Experience Cloud portals",
    "Shopify custom theme development and conversion-focused UX",
    "CRM data cleaning, duplicate checks, and automation workflows",
    "Scalable Meta Ads strategies with ROAS optimization",
  ],
};

/* ==================== PAGE ==================== */

export default function Home() {
  const reduced = usePrefersReducedMotion();
  const { scrollY } = useScroll();

  // Parallax effects
  const heroY = useTransform(scrollY, [0, 500], [0, reduced ? 0 : 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      data.services = formData.getAll('services');

      const payload = {
        ...data,
        createdAt: new Date().toISOString(),
        source: "home-page",
      };

      const res = await fetch("https://it-meta-solutions.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
      e.target.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <>
      <Helmet>
        <title>IT Meta Solutions - Premium Web Development & Digital Marketing</title>
        <meta
          name="description"
          content="Salesforce implementation partners delivering LWC, Experience Cloud, Shopify, and performance marketing for high-converting growth."
        />
        <link rel="canonical" href="https://itmetasolutions.com/" />
      </Helmet>

      <div className="relative min-h-screen overflow-hidden">
        <ScrollProgress />

        {/* Background Elements */}
        <GradientBlob className="left-0 top-0 h-[600px] w-[600px]" color="rgba(80,37,209,0.2)" />
        <GradientBlob className="right-0 top-1/4 h-[800px] w-[800px]" color="rgba(186,85,211,0.15)" />
        <GradientBlob className="bottom-0 left-1/3 h-[700px] w-[700px]" color="rgba(80,37,209,0.18)" />

        {/* ==================== HERO SECTION ==================== */}
        <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-20">
          <Container>
            <motion.div
              style={{ y: heroY, opacity: heroOpacity }}
              className="mx-auto max-w-5xl text-center"
            >
              <motion.div
                initial={reduced ? false : { y: 16 }}
                animate={reduced ? {} : { y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge icon={Zap}>Trusted by 40+ businesses worldwide</Badge>
              </motion.div>

              <motion.h1
                initial={reduced ? false : { y: 16 }}
                animate={reduced ? {} : { y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-8 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
              >
                Build. Grow. Dominate.
                <br />
                <span className="bg-gradient-to-r from-[#5025d1] via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Your Digital Success
                </span>
              </motion.h1>

              <motion.p
                initial={reduced ? false : { y: 16 }}
                animate={reduced ? {} : { y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 text-xl text-zinc-300 sm:text-2xl max-w-3xl mx-auto"
              >
                We craft high-converting websites, launch powerful marketing campaigns, and build brands that stand out. Let's turn your vision into reality.
              </motion.p>

              <motion.div
                initial={reduced ? false : { y: 16 }}
                animate={reduced ? {} : { y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center"
              >
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#5025d1] to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-[#5025d1]/50 transition-all hover:shadow-xl hover:shadow-[#5025d1]/60 hover:scale-105"
                >
                  Start Your Project
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/work"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30"
                >
                  <PlayCircle className="h-5 w-5" />
                  View Our Work
                </Link>
              </motion.div>

              <motion.div
                initial={reduced ? false : { y: 8 }}
                animate={reduced ? {} : { y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-400"
              >
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-400" />
                  <span>100% Satisfaction Guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-400" />
                  <span>On-Time Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-400" />
                  <span>Award-Winning Design</span>
                </div>
              </motion.div>
            </motion.div>
          </Container>
        </section>

        {/* ==================== STATS SECTION ==================== */}
        <section className="py-16 sm:py-20">
          <Container>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} delay={index * 0.1} />
              ))}
            </div>
          </Container>
        </section>

        {/* ==================== BRANDS WE'VE WORKED WITH - AUTO SLIDER ==================== */}
        <section className="py-16 sm:py-24 overflow-hidden relative">
          {/* Background gradient effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#5025d1]/5 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#5025d1]/10 rounded-full blur-[100px]" />

          <Container className="relative z-10">
            <motion.div
              initial={reduced ? false : { y: 16 }}
              whileInView={reduced ? {} : { y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#5025d1]/30 bg-[#5025d1]/10 px-4 py-2 text-sm font-medium text-purple-300 mb-4">
                <Star className="h-4 w-4 fill-purple-400 text-purple-400" />
                Trusted Partners
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Brands That{" "}
                <span className="bg-gradient-to-r from-[#5025d1] via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Trust Us
                </span>
              </h3>
              <p className="mt-3 text-zinc-400 max-w-lg mx-auto">
                We've partnered with amazing brands to deliver exceptional digital experiences
              </p>
            </motion.div>
          </Container>

          {/* Double row infinite scrolling slider */}
          <div className="space-y-6">
            {/* First row - scrolling left */}
            <div
              className="overflow-hidden py-2"
              style={{
                maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              }}
            >
              <motion.div
                className="flex gap-6 sm:gap-8"
                animate={reduced ? {} : {
                  x: ["0%", "-50%"],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 35,
                    ease: "linear",
                  },
                }}
              >
                {[...clientSliderData, ...clientSliderData].map((client, i) => (
                  <motion.div
                    key={`row1-${i}`}
                    className="group flex-shrink-0"
                    whileHover={reduced ? {} : { scale: 1.05, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="relative h-24 w-52 sm:h-28 sm:w-60 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm p-4 flex items-center justify-center transition-all duration-300 group-hover:border-[#5025d1]/40 group-hover:bg-white/[0.12] group-hover:shadow-lg group-hover:shadow-[#5025d1]/20">
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#5025d1]/0 to-purple-600/0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

                      {client.logo ? (
                        <img
                          src={client.logo}
                          alt={`${client.name} logo`}
                          className="h-full w-full object-contain brightness-100 contrast-100 transition-all duration-300 group-hover:brightness-110"
                        />
                      ) : (
                        <span className="text-base font-semibold text-zinc-300 group-hover:text-white transition-colors">
                          {client.name}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Second row - scrolling right (opposite direction) */}
            <div
              className="overflow-hidden py-2"
              style={{
                maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              }}
            >
              <motion.div
                className="flex gap-6 sm:gap-8"
                animate={reduced ? {} : {
                  x: ["-50%", "0%"],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 40,
                    ease: "linear",
                  },
                }}
              >
                {[...clientSliderData.slice().reverse(), ...clientSliderData.slice().reverse()].map((client, i) => (
                  <motion.div
                    key={`row2-${i}`}
                    className="group flex-shrink-0"
                    whileHover={reduced ? {} : { scale: 1.05, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="relative h-24 w-52 sm:h-28 sm:w-60 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm p-4 flex items-center justify-center transition-all duration-300 group-hover:border-[#5025d1]/40 group-hover:bg-white/[0.12] group-hover:shadow-lg group-hover:shadow-[#5025d1]/20">
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#5025d1]/0 to-purple-600/0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

                      {client.logo ? (
                        <img
                          src={client.logo}
                          alt={`${client.name} logo`}
                          className="h-full w-full object-contain brightness-100 contrast-100 transition-all duration-300 group-hover:brightness-110"
                        />
                      ) : (
                        <span className="text-base font-semibold text-zinc-300 group-hover:text-white transition-colors">
                          {client.name}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Bottom decorative line */}
          <Container className="relative z-10">
            <div className="mt-12 flex items-center justify-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span className="text-sm text-zinc-500 whitespace-nowrap">And many more...</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
          </Container>
        </section>

        {/* ==================== INTERACTIVE SHOWCASE ==================== */}
        <section className="py-16 sm:py-20 overflow-hidden">
          <Container>
            <div className="text-center mb-12">
              <motion.h3
                initial={reduced ? false : { y: 16 }}
                whileInView={reduced ? {} : { y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
              >
                Why Brands{" "}
                <span className="bg-gradient-to-r from-[#5025d1] via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Choose Us
                </span>
              </motion.h3>
              <motion.p
                initial={reduced ? false : { y: 16 }}
                whileInView={reduced ? {} : { y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto"
              >
                We combine creativity with strategy to deliver exceptional results
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Rocket,
                  title: "Launch Fast",
                  description: "From idea to live product in weeks, not months. We move at the speed of your ambition.",
                  gradient: "from-orange-500 to-red-500",
                  bgGradient: "from-orange-500/20 to-red-500/10",
                },
                {
                  icon: Target,
                  title: "Results Focused",
                  description: "Every pixel, every campaign, every line of code is optimized for conversions and growth.",
                  gradient: "from-[#5025d1] to-purple-600",
                  bgGradient: "from-[#5025d1]/20 to-purple-600/10",
                },
                {
                  icon: Zap,
                  title: "Always Innovating",
                  description: "We stay ahead of trends so you stay ahead of competition. Cutting-edge solutions, always.",
                  gradient: "from-emerald-500 to-teal-500",
                  bgGradient: "from-emerald-500/20 to-teal-500/10",
                },
              ].map((item, index) => (
                <Link to="/services" key={index}>
                  <motion.div
                    initial={reduced ? false : { y: 20 }}
                    whileInView={reduced ? {} : { y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    whileHover={reduced ? {} : { y: -10, scale: 1.02 }}
                    className={`group relative h-full rounded-3xl border border-white/10 bg-gradient-to-br ${item.bgGradient} p-8 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:border-white/20`}
                  >
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <motion.div
                      className={`inline-flex rounded-2xl bg-gradient-to-br ${item.gradient} p-4 shadow-lg`}
                      whileHover={reduced ? {} : { rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                    >
                      <item.icon className="h-8 w-8 text-white" />
                    </motion.div>

                    <h4 className="mt-6 text-2xl font-bold text-white">{item.title}</h4>
                    <p className="mt-3 text-zinc-300 leading-relaxed">{item.description}</p>

                    <div className="mt-6 flex items-center gap-2 text-white/60 group-hover:text-white/90 transition-colors">
                      <span className="text-sm font-medium">Explore</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Animated gradient glow background */}
            <div className="relative mt-10 sm:mt-12">
              {/* Subtle pulsing glow orbs */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <motion.div
                  animate={reduced ? {} : {
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full bg-gradient-to-br from-[#5025d1]/30 to-purple-600/20 blur-3xl"
                />
                <motion.div
                  animate={reduced ? {} : {
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] rounded-full bg-gradient-to-tr from-pink-500/20 to-purple-500/30 blur-3xl"
                />
                <motion.div
                  animate={reduced ? {} : {
                    scale: [1, 1.15, 1],
                    opacity: [0.25, 0.45, 0.25]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  className="absolute w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] rounded-full bg-gradient-to-bl from-emerald-500/15 to-[#5025d1]/25 blur-3xl"
                />
              </div>

              <div className="relative z-10 text-center py-6 sm:py-8 pb-4 sm:pb-6">
                <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-sm">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5025d1] to-purple-600 border-2 border-black flex items-center justify-center text-xs font-bold text-white"
                      >
                        {["M", "A", "K", "E"][i]}
                      </div>
                    ))}
                  </div>
                  <span className="text-white font-medium">Join 40+ brands growing with us</span>
                </div>

                <motion.h3
                  className="mt-8 text-4xl sm:text-5xl font-bold text-white"
                  initial={reduced ? false : { y: 16 }}
                  whileInView={reduced ? {} : { y: 0 }}
                  viewport={{ once: true }}
                >
                  Ready to{" "}
                  <span className="relative">
                    <span className="bg-gradient-to-r from-[#5025d1] via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      Stand Out
                    </span>
                    <motion.span
                      className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#5025d1] via-purple-500 to-pink-500 rounded-full"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                  </span>
                  ?
                </motion.h3>

                <motion.div
                  className="mt-8 flex flex-wrap justify-center gap-4"
                  initial={reduced ? false : { y: 16 }}
                  whileInView={reduced ? {} : { y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-[#5025d1] shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                  >
                    Let's Talk
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/work"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
                  >
                    See Our Work
                  </Link>
                </motion.div>
              </div>
            </div>
          </Container>
        </section>

        {/* ==================== SERVICES SECTION ==================== */}
        <section className="py-16 sm:py-24 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />

          <Container className="relative z-10">
            <motion.div
              initial={reduced ? false : { y: 20 }}
              whileInView={reduced ? {} : { y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#5025d1]/30 bg-[#5025d1]/10 px-4 py-2 text-sm font-medium text-purple-300 mb-6">
                <Zap className="h-4 w-4" />
                What We Do Best
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                Services That{" "}
                <span className="bg-gradient-to-r from-[#5025d1] via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Transform
                </span>
              </h2>
              <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto">
                From concept to execution, we deliver complete digital solutions tailored to your business goals
              </p>
            </motion.div>

            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
              {services.map((service, index) => (
                <ServiceCard key={index} service={service} delay={index * 0.1} />
              ))}
            </div>

            <motion.div
              initial={reduced ? false : { y: 16 }}
              whileInView={reduced ? {} : { y: 0 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <Link
                to="/services"
                className="group inline-flex items-center gap-3 rounded-full border-2 border-[#5025d1]/50 bg-[#5025d1]/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-[#5025d1]/20 hover:border-[#5025d1]"
              >
                Explore All Services
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </Container>
        </section>

        {/* ==================== HOW WE WORK / PROCESS ==================== */}
        <section className="py-16 sm:py-20 overflow-hidden">
          <Container>
            <SectionHeading
              badge="Our Process"
              title={
                <>
                  How We Bring Your
                  <br />
                  <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                    Vision to Life
                  </span>
                </>
              }
              description="A proven 4-step process that delivers results every time."
              centered
            />

            <div className="relative mt-12">
              {/* Connecting line */}
              <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-[#5025d1]/50 via-purple-500/30 to-transparent lg:block" />

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    step: "01",
                    title: "Discovery",
                    description: "We dive deep into your business, goals, and target audience to understand what success looks like for you.",
                    icon: Target,
                  },
                  {
                    step: "02",
                    title: "Strategy",
                    description: "Based on our findings, we craft a tailored strategy and roadmap to achieve your objectives.",
                    icon: Sparkles,
                  },
                  {
                    step: "03",
                    title: "Create",
                    description: "Our team brings the strategy to life with stunning designs and flawless execution.",
                    icon: Palette,
                  },
                  {
                    step: "04",
                    title: "Launch & Grow",
                    description: "We launch your project and continuously optimize for maximum performance and growth.",
                    icon: Rocket,
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={reduced ? false : { y: 20 }}
                    whileInView={reduced ? {} : { y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="group relative"
                  >
                    {/* Step number badge */}
                    <div className="absolute -top-4 left-6 z-10 flex h-8 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#5025d1] to-purple-600 text-sm font-bold text-white shadow-lg shadow-[#5025d1]/30">
                      {item.step}
                    </div>

                    <div className="h-full rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-8 pt-10 backdrop-blur-sm transition-all hover:border-[#5025d1]/30 group-hover:shadow-lg group-hover:shadow-[#5025d1]/10">
                      {/* Large icon display */}
                      <div className="mb-6 flex justify-center">
                        <div className="relative">
                          {/* Glow effect behind icon */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#5025d1]/30 to-purple-600/20 blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="relative rounded-2xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-5 shadow-lg shadow-[#5025d1]/30">
                            <item.icon className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                          </div>
                        </div>
                      </div>

                      <h4 className="text-xl font-bold text-white text-center">{item.title}</h4>
                      <p className="mt-3 text-sm text-zinc-400 leading-relaxed text-center">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ==================== INDUSTRIES SECTION ==================== */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionHeading
              badge="Industries"
              title={
                <>
                  Built for the
                  <br />
                  <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                    Way You Work
                  </span>
                </>
              }
              description="From high-growth startups to established enterprises, we tailor solutions that fit your market, customers, and goals."
              centered
            />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {industries.map((industry, index) => (
                <IndustryCard key={index} industry={industry} delay={index * 0.08} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30"
              >
                Discuss Your Industry
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </Container>
        </section>

        {/* ==================== FEATURED PROJECTS ==================== */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionHeading
              badge="Our Work"
              title={
                <>
                  Projects We're
                  <br />
                  <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                    Proud Of
                  </span>
                </>
              }
              description="Real businesses, real results. See how we've helped brands grow and succeed."
              centered
            />

            <div className="flex flex-col gap-4">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={index} project={project} delay={index * 0.08} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/work"
                className="inline-flex items-center gap-2 text-lg font-semibold text-[#5025d1] transition-all hover:gap-4"
              >
                View All Projects
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          </Container>
        </section>

        {/* ==================== SALESFORCE FEATURED PROJECTS ==================== */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionHeading
              badge="Salesforce Expertise"
              title={
                <>
                  Salesforce Projects
                  <br />
                  <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                    That Deliver Results
                  </span>
                </>
              }
              description="Custom Salesforce solutions that streamline operations, improve data quality, and drive business growth."
              centered
            />

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {salesforceProjects.map((project, index) => (
                <SalesforceProjectCard key={index} project={project} delay={index * 0.1} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/work?filter=salesforce"
                className="inline-flex items-center gap-2 text-lg font-semibold text-[#5025d1] transition-all hover:gap-4"
              >
                View All Salesforce Projects
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          </Container>
        </section>

        {/* ==================== TESTIMONIALS ==================== */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionHeading
              badge="Testimonials"
              title={
                <>
                  Loved by Businesses
                  <br />
                  <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                    Around the World
                  </span>
                </>
              }
              description="Don't just take our word for it. Here's what our clients say about working with us."
              centered
            />

            <div className="grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} delay={index * 0.1} />
              ))}
            </div>
          </Container>
        </section>

        <SeoContentFaq content={seoContent} />

        {/* ==================== FAQ ==================== */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionHeading
              badge="FAQ"
              title={
                <>
                  Answers to
                  <br />
                  <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                    Common Questions
                  </span>
                </>
              }
              description="Everything you need to know before starting a project with us."
              centered
            />

            <div className="grid gap-6 md:grid-cols-2">
              {faqs.map((item, index) => (
                <FaqItem key={index} item={item} delay={index * 0.06} />
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-lg font-semibold text-[#5025d1] transition-all hover:gap-4"
              >
                Still have questions? Talk to us
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          </Container>
        </section>

        {/* ==================== FEATURED SHOWCASE / BANNER ==================== */}
        <section className="py-16 sm:py-20">
          <Container>
            <motion.div
              initial={reduced ? false : { y: 16 }}
              whileInView={reduced ? {} : { y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl"
            >
              {/* Background image with overlay */}
              {/* Suggested size: 1920x600px (wide banner image) */}
              <div className="absolute inset-0">
                {showcaseBannerImage ? (
                  <img
                    src={showcaseBannerImage}
                    alt="Showcase background"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  /* Placeholder gradient when no image */
                  <div className="h-full w-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900" />
                )}
              </div>

              {/* Dark overlay for text readability - adjust opacity as needed */}
              <div className="absolute inset-0 bg-black/60 z-[5]" />

              {/* Gradient color overlay on top */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#5025d1]/70 via-purple-600/50 to-pink-500/40 z-10" />

              {/* Content container with min-height */}
              <div className="relative z-20 h-[400px] sm:h-[500px] flex items-center">
                <Container>
                  <div className="max-w-2xl">
                    <motion.div
                      initial={reduced ? false : { y: 20 }}
                      whileInView={reduced ? {} : { y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                        <Award className="h-4 w-4" />
                        Award-Winning Agency
                      </span>
                    </motion.div>

                    <motion.h3
                      initial={reduced ? false : { y: 20 }}
                      whileInView={reduced ? {} : { y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="mt-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl drop-shadow-lg"
                    >
                      Crafting Digital
                      <br />
                      Excellence Since Day One
                    </motion.h3>

                    <motion.p
                      initial={reduced ? false : { y: 20 }}
                      whileInView={reduced ? {} : { y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                      className="mt-6 text-lg text-white/90 drop-shadow-md"
                    >
                      We've helped 40+ businesses transform their digital presence with
                      custom solutions that drive real results.
                    </motion.p>

                    <motion.div
                      initial={reduced ? false : { y: 20 }}
                      whileInView={reduced ? {} : { y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      className="mt-8 flex flex-wrap gap-6"
                    >
                      {[
                        { value: "50+", label: "Projects" },
                        { value: "40+", label: "Clients" },
                        { value: "100%", label: "Satisfaction" },
                      ].map((stat, i) => (
                        <div key={i} className="text-center">
                          <div className="text-3xl font-bold text-white drop-shadow-lg">{stat.value}</div>
                          <div className="text-sm text-white/70">{stat.label}</div>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </Container>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* ==================== CTA SECTION ==================== */}
        <section className="py-16 sm:py-20">
          <Container>
            <motion.div
              initial={reduced ? false : { y: 16 }}
              whileInView={reduced ? {} : { y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#5025d1]/20 to-purple-600/20 p-12 backdrop-blur-sm sm:p-16"
            >
              <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#5025d1]/30 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-600/30 blur-3xl" />

              <div className="relative mx-auto max-w-3xl text-center">
                <h2 className="text-4xl font-bold text-white sm:text-5xl">
                  Ready to Transform Your Business?
                </h2>
                <p className="mt-6 text-xl text-zinc-300">
                  Let's create something amazing together. Get in touch and let's discuss your project.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-[#5025d1] shadow-lg transition-all hover:scale-105"
                  >
                    Get Started Now
                    <ArrowRight className="h-5 w-5" />
                  </Link>

                  <a
                    href="tel:+923271804037"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
                  >
                    <Phone className="h-5 w-5" />
                    Call Us Now
                  </a>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* ==================== CONTACT FORM ==================== */}
        <section className="py-16 sm:py-20" id="contact">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Left Column - Info */}
              <div>
                <SectionHeading
                  badge="Get in Touch"
                  title="Let's Start a Conversation"
                  description="Have a project in mind? We'd love to hear about it. Send us a message and we'll respond within 24 hours."
                />

                <div className="mt-8 space-y-4 sm:space-y-6">
                  <a
                    href="mailto:info@itmetasolutions.com"
                    className="flex items-center gap-3 sm:gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-sm transition-all hover:bg-white/10"
                  >
                    <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-2 sm:p-3">
                      <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs sm:text-sm text-zinc-400">Email</div>
                      <div className="font-semibold text-white text-sm sm:text-base break-words">info@itmetasolutions.com</div>
                    </div>
                  </a>

                  <a
                    href="tel:+923271804037"
                    className="flex items-center gap-3 sm:gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-sm transition-all hover:bg-white/10"
                  >
                    <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-2 sm:p-3">
                      <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs sm:text-sm text-zinc-400">Phone / WhatsApp</div>
                      <div className="font-semibold text-white text-sm sm:text-base">+92 327 180 4037</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 sm:gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-sm">
                    <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-2 sm:p-3">
                      <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs sm:text-sm text-zinc-400">Website</div>
                      <div className="font-semibold text-white text-sm sm:text-base break-words">www.itmetasolutions.com</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <motion.div
                initial={reduced ? false : { x: 16 }}
                whileInView={reduced ? {} : { x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-8 backdrop-blur-sm"
              >
                <h3 className="text-2xl font-bold text-white">Send us a message</h3>
                <p className="mt-2 text-zinc-400">Fill out the form and we'll get back to you shortly.</p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={cx(
                        "mt-2 w-full rounded-xl border bg-white/5 px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2",
                        errors.name ? "border-red-500 focus:ring-red-500" : "border-white/10 focus:ring-[#5025d1]"
                      )}
                      placeholder="Your name"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-white">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={cx(
                          "mt-2 w-full rounded-xl border bg-white/5 px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2",
                          errors.email ? "border-red-500 focus:ring-red-500" : "border-white/10 focus:ring-[#5025d1]"
                        )}
                        placeholder="you@example.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={cx(
                          "mt-2 w-full rounded-xl border bg-white/5 px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2",
                          errors.phone ? "border-red-500 focus:ring-red-500" : "border-white/10 focus:ring-[#5025d1]"
                        )}
                        placeholder="+92 XXX XXXXXXX"
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white">Services Needed</label>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {["Website", "E-commerce", "Branding", "Marketing", "SEO", "Social Media", "Salesforce", "Video Editing"].map((service) => (
                        <label key={service} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="services"
                            value={service}
                            className="h-5 w-5 rounded border-white/20 bg-white/5 text-[#5025d1] focus:ring-[#5025d1]"
                          />
                          <span className="text-sm text-zinc-300">{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white">Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={4}
                      className={cx(
                        "mt-2 w-full rounded-xl border bg-white/5 px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 resize-none",
                        errors.message ? "border-red-500 focus:ring-red-500" : "border-white/10 focus:ring-[#5025d1]"
                      )}
                      placeholder="Tell us about your project..."
                    />
                    {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className={cx(
                      "w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5025d1] to-purple-600 px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all",
                      status === "sending" ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl hover:scale-105"
                    )}
                  >
                    {status === "sending" ? "Sending..." : "Send Message"}
                    <ArrowRight className="h-5 w-5" />
                  </button>

                  {status === "success" && (
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-400">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-semibold">Message sent successfully!</span>
                      </div>
                      <p className="mt-1 text-sm">We'll get back to you within 24 hours.</p>
                    </div>
                  )}

                  {status === "error" && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
                      <p className="font-semibold">Failed to send message. Please try again or contact us directly.</p>
                    </div>
                  )}
                </form>
              </motion.div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
