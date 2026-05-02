import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useScroll } from "framer-motion";
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
  LayoutGrid,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import Container from "../../components/Container";
import GoogleReviewsSection from "../../components/GoogleReviewsSection";
import SeoContentFaq from "../../components/SeoContentFaq";
import TechMeshBg from "../../components/TechMeshBg";

// FEATURED BANNER BACKGROUND IMAGE
import showcaseBannerImage from "../../assets/img/Crafting Digital Excellence Since Day One BG Image.webp";

// CLIENT SLIDER LOGOS
import ekommartLogo from "../../assets/img/Ekommart Logo ITMS.webp";
import eSahulatMartLogo from "../../assets/img/E Sahulat Mart Logo ITMS.webp";
import moreHomesGroupLogo from "../../assets/img/More Homes Group Logo ITMS.webp";
import heavenlyPurchaseLogo from "../../assets/img/Heavenly Purchase Logo ITMS.webp";
import shenLogo from "../../assets/img/SHEN Logo.webp";

const clientSliderData = [
  { name: "Ekommart",         logo: ekommartLogo },
  { name: "E Sahulat Mart",   logo: eSahulatMartLogo },
  { name: "More Homes Group", logo: moreHomesGroupLogo },
  { name: "Heavenly Purchase",logo: heavenlyPurchaseLogo },
  { name: "SHEN",             logo: shenLogo },
];

const homeAboutImage = "/assets/img/vitaly-gariev-3vBESHYwRkE-unsplash.jpg";

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

/* ==================== GLOBE COMPONENT ==================== */

function RotatingGlobe() {
  const canvasRef = useRef(null);
  const stateRef = useRef({ rot: 0, animId: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr  = Math.min(window.devicePixelRatio || 1, 2);
    const SIZE = 400;
    canvas.width  = SIZE * dpr;
    canvas.height = SIZE * dpr;
    canvas.style.width  = `${SIZE}px`;
    canvas.style.height = `${SIZE}px`;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    const CX = SIZE / 2;
    const CY = SIZE / 2;
    const R  = SIZE * 0.4;

    function proj(lat, lng, rotY) {
      const phi = (90 - lat) * (Math.PI / 180);
      const th  = (lng + rotY) * (Math.PI / 180);
      return {
        x:  Math.sin(phi) * Math.cos(th),
        y:  Math.cos(phi),
        z:  Math.sin(phi) * Math.sin(th),
      };
    }

    const cities = [
      { lat: 51.5,  lng: -0.1   }, // London
      { lat: 40.7,  lng: -74.0  }, // New York
      { lat: 31.5,  lng: 74.3   }, // Lahore
      { lat: 25.2,  lng: 55.3   }, // Dubai
      { lat: 1.3,   lng: 103.8  }, // Singapore
      { lat: 48.9,  lng: 2.3    }, // Paris
      { lat: -33.9, lng: 151.2  }, // Sydney
      { lat: 37.8,  lng: -122.4 }, // San Francisco
    ];

    const conns = [[2,3],[2,0],[0,1],[3,4],[0,5],[1,7],[4,6]];

    // Dot grid on globe surface
    const gridDots = [];
    for (let lat = -80; lat <= 80; lat += 15) {
      for (let lng = -180; lng < 180; lng += 18) {
        gridDots.push({ lat, lng });
      }
    }

    function drawFrame() {
      stateRef.current.rot += 0.11;
      const rot = stateRef.current.rot;

      ctx.clearRect(0, 0, SIZE, SIZE);

      // Atmosphere glow (outer ring)
      const atmo = ctx.createRadialGradient(CX, CY, R * 0.88, CX, CY, R * 1.15);
      atmo.addColorStop(0,   "rgba(80,37,209,0.12)");
      atmo.addColorStop(0.5, "rgba(80,37,209,0.06)");
      atmo.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(CX, CY, R * 1.15, 0, Math.PI * 2);
      ctx.fillStyle = atmo;
      ctx.fill();

      // Globe base gradient
      const bg = ctx.createRadialGradient(CX * 0.75, CY * 0.75, R * 0.05, CX, CY, R);
      bg.addColorStop(0,   "rgba(80,37,209,0.09)");
      bg.addColorStop(0.5, "rgba(15,12,40,0.12)");
      bg.addColorStop(1,   "rgba(0,0,0,0.15)");
      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, Math.PI * 2);
      ctx.fillStyle = bg;
      ctx.fill();

      // Globe edge ring
      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(80,37,209,0.55)";
      ctx.lineWidth = 1.2;
      ctx.shadowBlur  = 18;
      ctx.shadowColor = "rgba(80,37,209,0.7)";
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Latitude rings
      [-60, -30, 0, 30, 60].forEach((lat) => {
        ctx.beginPath();
        let down = false;
        for (let lng = -180; lng <= 180; lng += 3) {
          const p  = proj(lat, lng, rot);
          if (p.z < -0.05) { down = false; continue; }
          const sx = CX + p.x * R;
          const sy = CY - p.y * R;
          if (!down) { ctx.moveTo(sx, sy); down = true; } else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = lat === 0 ? "rgba(80,37,209,0.5)" : "rgba(80,37,209,0.22)";
        ctx.lineWidth   = lat === 0 ? 0.8 : 0.5;
        ctx.stroke();
      });

      // Longitude lines
      for (let lng = -180; lng < 180; lng += 20) {
        ctx.beginPath();
        let down = false;
        for (let lat = -88; lat <= 88; lat += 3) {
          const p  = proj(lat, lng, rot);
          if (p.z < -0.05) { down = false; continue; }
          const sx = CX + p.x * R;
          const sy = CY - p.y * R;
          if (!down) { ctx.moveTo(sx, sy); down = true; } else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = "rgba(80,37,209,0.18)";
        ctx.lineWidth   = 0.5;
        ctx.stroke();
      }

      // Surface dots
      gridDots.forEach(({ lat, lng }) => {
        const p = proj(lat, lng, rot);
        if (p.z < 0) return;
        const sx = CX + p.x * R;
        const sy = CY - p.y * R;
        const a  = Math.pow((p.z + 1) / 2, 1.5);
        ctx.beginPath();
        ctx.arc(sx, sy, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(120,80,255,${a * 0.45})`;
        ctx.fill();
      });

      // Connection arcs (neon cyan)
      conns.forEach(([i, j]) => {
        const c1 = cities[i]; const c2 = cities[j];
        ctx.beginPath();
        let down = false;
        for (let t = 0; t <= 1; t += 0.012) {
          const lat = c1.lat + (c2.lat - c1.lat) * t;
          const lng = c1.lng + (c2.lng - c1.lng) * t;
          const p   = proj(lat, lng, rot);
          if (p.z < 0) { down = false; continue; }
          const sx = CX + p.x * R;
          const sy = CY - p.y * R;
          if (!down) { ctx.moveTo(sx, sy); down = true; } else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle  = "rgba(0,245,255,0.55)";
        ctx.lineWidth    = 1.3;
        ctx.shadowBlur   = 8;
        ctx.shadowColor  = "rgba(0,245,255,0.5)";
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // City dots
      cities.forEach((city) => {
        const p = proj(city.lat, city.lng, rot);
        if (p.z < 0) return;
        const sx = CX + p.x * R;
        const sy = CY - p.y * R;
        const a  = (p.z + 1) / 2;

        const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, 8);
        grd.addColorStop(0, `rgba(0,245,255,${a * 0.65})`);
        grd.addColorStop(1, "rgba(0,245,255,0)");
        ctx.beginPath(); ctx.arc(sx, sy, 8, 0, Math.PI * 2);
        ctx.fillStyle = grd; ctx.fill();

        ctx.beginPath(); ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
        ctx.fillStyle  = `rgba(0,245,255,${a * 0.95})`;
        ctx.shadowBlur  = 12;
        ctx.shadowColor = "rgba(0,245,255,0.9)";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      stateRef.current.animId = requestAnimationFrame(drawFrame);
    }

    stateRef.current.animId = requestAnimationFrame(drawFrame);

    return () => {
      if (stateRef.current.animId) cancelAnimationFrame(stateRef.current.animId);
    };
  }, []);

  return (
    <div className="relative inline-flex">
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: "-30px",
          background: "radial-gradient(circle, rgba(80,37,209,0.18) 0%, transparent 70%)",
        }}
      />
      <canvas ref={canvasRef} className="relative z-10 rounded-full" />
    </div>
  );
}

/* ==================== SHARED COMPONENTS ==================== */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left"
      style={{
        scaleX: scrollYProgress,
        background: "linear-gradient(90deg, #5025d1, #a855f7, #00f5ff)",
      }}
    />
  );
}

function GradientBlob({ className, color = "rgba(80,37,209,0.3)" }) {
  return (
    <div
      aria-hidden
      className={cx("pointer-events-none absolute -z-10 blur-3xl", className)}
      style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }}
    />
  );
}

function Badge({ children, icon: Icon }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-zinc-800 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white">
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </span>
  );
}

function SectionHeading({ badge, title, description, centered = false }) {
  return (
    <div className={cx("mb-12", centered && "text-center")}>
      {badge && (
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a78bfa] mb-4">
          {badge}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
        {title}
      </h2>
      {description && (
        <p className={cx("mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl", centered && "mx-auto")}>
          {description}
        </p>
      )}
    </div>
  );
}

function ServiceCard({ service, delay = 0 }) {
  const reduced = usePrefersReducedMotion();
  const Icon = service.icon;
  return (
    <Link to={service.link || "/services"} className="block h-full">
      <motion.div
        initial={reduced ? false : { y: 20, opacity: 0 }}
        whileInView={reduced ? {} : { y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, delay, ease: "easeOut" }}
        className="group flex h-full flex-col rounded-2xl bg-[#0d0d18] border border-white/[0.07] p-6 sm:p-7 neon-card relative overflow-hidden"
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#5025d1]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#1c1a3a]"
          style={{ boxShadow: "0 0 20px rgba(80,37,209,0.2)" }}>
          <Icon className="h-5 w-5 text-[#a78bfa]" />
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-white">{service.title}</h3>
        <p className="mt-2.5 text-sm text-zinc-400 leading-relaxed">{service.description}</p>

        <ul className="mt-5 space-y-2.5 flex-1">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#7c6fcd]" />
              <span className="text-sm text-zinc-300 leading-snug">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-[#7c6fcd] group-hover:text-[#a78bfa] group-hover:gap-3 transition-all duration-200">
          <span>Learn More</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </motion.div>
    </Link>
  );
}

function WorkCategoryCard({ category, delay = 0 }) {
  const reduced = usePrefersReducedMotion();
  const Icon = category.icon;
  return (
    <motion.div
      initial={reduced ? false : { y: 16, opacity: 0 }}
      whileInView={reduced ? {} : { y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d0d18] neon-card"
    >
      <Link to={category.link} className="relative block h-44 overflow-hidden border-b border-white/[0.07]">
        <img
          src={category.image}
          alt={category.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d18] via-[#0d0d18]/45 to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center gap-3">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#1c1a3a]/95"
            style={{ boxShadow: `0 0 22px ${category.glow}` }}>
            <Icon className="h-5 w-5" style={{ color: category.accent }} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c4b5fd]">{category.kicker}</p>
            <h3 className="mt-1 text-xl font-bold leading-tight text-white">{category.title}</h3>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-sm leading-relaxed text-zinc-400">{category.description}</p>

        <div className="mt-6 space-y-3">
          {category.projects.map((project) => (
            <Link
              key={project.title}
              to={project.link}
              className="group/item block rounded-xl border border-white/[0.07] bg-[#13122a] p-4 transition-all duration-200 hover:border-[#5025d1]/40 hover:bg-[#171537]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-white leading-snug">{project.title}</h4>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-zinc-400">{project.description}</p>
                </div>
                <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#a78bfa] transition-transform group-hover/item:translate-x-1" />
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-[#1c1a3a] px-2 py-0.5 text-[11px] font-medium text-[#a78bfa]">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <Link
          to={category.link}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#7c6fcd] transition-all hover:gap-3 hover:text-[#a78bfa]"
        >
          View all {category.title} work
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}

function IndustryCard({ industry, delay = 0 }) {
  const reduced = usePrefersReducedMotion();
  const Icon = industry.icon;
  return (
    <motion.div
      initial={reduced ? false : { y: 16, opacity: 0 }}
      whileInView={reduced ? {} : { y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="group flex h-full flex-col rounded-2xl bg-[#0d0d18] border border-white/[0.07] p-6 sm:p-7 neon-card"
    >
      <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#1c1a3a]">
        <Icon className="h-5 w-5 text-[#a78bfa]" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-white">{industry.title}</h3>
      <p className="mt-2.5 text-sm text-zinc-400 leading-relaxed">{industry.description}</p>
      <ul className="mt-5 space-y-2.5 flex-1">
        {industry.highlights.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-300">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#7c6fcd]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function FaqItem({ item, delay = 0 }) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.details
      initial={reduced ? false : { y: 16, opacity: 0 }}
      whileInView={reduced ? {} : { y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="group rounded-2xl bg-[#0d0d18] border border-white/[0.07] p-6 transition-all duration-200 open:border-[#5025d1]/30 open:bg-[#0f0e22]"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-white">{item.question}</h4>
        <ChevronRight className="h-5 w-5 flex-shrink-0 text-[#a78bfa] transition-transform group-open:rotate-90" />
      </summary>
      <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{item.answer}</p>
    </motion.details>
  );
}

/* ==================== DATA ==================== */

const stats = [
  { icon: Rocket, value: "50+", label: "Projects Launched" },
  { icon: Users,  value: "40+", label: "Happy Clients" },
  { icon: TrendingUp, value: "200%", label: "Avg. Growth Rate" },
  { icon: Award,  value: "100%", label: "Client Satisfaction" },
];

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Fast, modern websites built with cutting-edge technologies for maximum performance and conversion.",
    features: ["Custom responsive websites", "E-commerce platforms (Shopify, WooCommerce)", "Web applications & dashboards", "Performance optimization & SEO"],
    link: "/web-development-expertise",
  },
  {
    icon: Palette,
    title: "Graphic Designing",
    description: "Stunning visuals that capture attention, communicate your message, and elevate your brand identity.",
    features: ["Logo & brand identity design", "Marketing materials & print design", "Social media graphics", "Packaging & merchandise design"],
    link: "/graphic-designing-expertise",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Data-driven marketing strategies that generate leads, boost sales, and grow your brand.",
    features: ["Social media marketing", "Google & Meta Ads campaigns", "Content marketing & SEO", "Analytics & reporting"],
    link: "/digital-marketing-expertise",
  },
  {
    icon: Search,
    title: "SEO",
    description: "Technical SEO, on-page structure, and content strategy to grow organic traffic and leads.",
    features: ["Technical audits and fixes", "Keyword intent mapping", "On-page optimization", "Local SEO and GBP setup"],
    link: "/seo-expertise",
  },
  {
    icon: Cloud,
    title: "Salesforce",
    description: "Expert Salesforce solutions to streamline your CRM, automate workflows, and drive business growth.",
    features: ["Salesforce implementation & customization", "Lightning Web Components (LWC)", "Experience Cloud portals", "Integration & automation"],
    link: "/salesforce-expertise",
  },
  {
    icon: LayoutGrid,
    title: "Custom Web Apps",
    description: "Bespoke web portals, operations dashboards, and business systems built around your exact workflows.",
    features: ["Role-based portals & admin panels", "Next.js 14 + PostgreSQL stack", "OTP auth & audit logging", "Dialer, chat & API integrations"],
    link: "/custom-web-apps-expertise",
  },
];

const projectCategories = [
  {
    title: "Web Development",
    kicker: "Web projects",
    description: "E-commerce sites, custom storefronts, and business platforms built for speed, conversion, and day-to-day clarity.",
    icon: Code2,
    accent: "#a78bfa",
    glow: "rgba(167,139,250,0.28)",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&auto=format&fit=crop&q=80",
    link: "/work?filter=web",
    projects: [
      {
        title: "InHomes Direct",
        description: "Logic-driven Shopify storefront with custom calculators, real-time pricing, and survey-based estimates.",
        tags: ["Shopify", "Calculators"],
        link: "/case-study/inhomes-direct",
      },
      {
        title: "ESahulat Mart",
        description: "Modern e-commerce platform with catalog, cart, payment integration, and order management.",
        tags: ["E-commerce", "Retail"],
        link: "/case-study/esahulat-mart",
      },
      {
        title: "More Homes Group",
        description: "Property platform with listings, tenant workflows, maintenance tracking, and reporting.",
        tags: ["Real Estate", "Platform"],
        link: "/case-study/more-homes-group",
      },
    ],
  },
  {
    title: "Salesforce & CRM",
    kicker: "CRM builds",
    description: "Salesforce implementations, Experience Cloud portals, LWC components, and automation systems for cleaner operations.",
    icon: Cloud,
    accent: "#00f5ff",
    glow: "rgba(0,245,255,0.2)",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&auto=format&fit=crop&q=80",
    link: "/work?filter=salesforce",
    projects: [
      {
        title: "More Homes Group CRM",
        description: "CRM-style letting operations portal with agent workflows, property records, dialer tools, and audit logs.",
        tags: ["CRM", "Real Estate"],
        link: "/case-study/letting-agency-portal",
      },
      {
        title: "Environmental Issue Reporting Portal",
        description: "Experience Cloud portal for reports, property management, payments, and request tracking.",
        tags: ["Experience Cloud", "Portal"],
        link: "/case-study/salesforce-experience-cloud-government-cloud",
      },
      {
        title: "Service Cloud Case Management",
        description: "LWC case management and property-data automation for qualified lead generation.",
        tags: ["Service Cloud", "LWC"],
        link: "/case-study/salesforce-service-cloud-implementation",
      },
    ],
  },
  {
    title: "Digital Marketing",
    kicker: "Growth work",
    description: "Brand building, performance campaigns, social strategy, and content systems that turn attention into sales.",
    icon: Megaphone,
    accent: "#f472b6",
    glow: "rgba(244,114,182,0.22)",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=900&auto=format&fit=crop&q=80",
    link: "/work?filter=digital-marketing",
    projects: [
      {
        title: "Ekommart",
        description: "Complete brand and marketing transformation with store build, social presence, and Meta Ads.",
        tags: ["Meta Ads", "E-commerce"],
        link: "/case-study/ekommart",
      },
      {
        title: "Halla Gulla",
        description: "Brand identity, website, social setup, and digital marketing strategy for a tourism brand.",
        tags: ["Branding", "Social"],
        link: "/case-study/halla-gulla",
      },
      {
        title: "United Muslim Travels",
        description: "Travel brand build with identity, website, social presence, and performance marketing.",
        tags: ["Travel", "Marketing"],
        link: "/case-studies/united-muslim-travels-brand-build",
      },
    ],
  },
];

const industries = [
  { title: "E-commerce", description: "High-converting storefronts that drive revenue and repeat customers.", highlights: ["Product discovery and UX", "Conversion rate optimization", "Performance ads and tracking"], icon: ShoppingCart },
  { title: "Real Estate", description: "Property platforms that simplify listings, lead capture, and client journeys.", highlights: ["Custom listing systems", "Lead routing and CRM sync", "Automation for follow-ups"], icon: Building2 },
  { title: "SaaS and Platforms", description: "Scalable products built for performance, retention, and growth.", highlights: ["Product UX and onboarding", "Usage analytics and insights", "Reliable architecture"], icon: Database },
  { title: "Travel and Hospitality", description: "Experiences that build trust and turn visitors into bookings.", highlights: ["Booking journeys", "Multi-channel marketing", "Reputation and review growth"], icon: Globe },
  { title: "Healthcare and Wellness", description: "Clear messaging and conversions for services that need credibility.", highlights: ["Patient-first UX", "Secure forms and workflows", "Local SEO and visibility"], icon: ShieldCheck },
  { title: "Professional Services", description: "Brand systems that position expertise and generate qualified leads.", highlights: ["Lead capture funnels", "Authority content", "Reputation building"], icon: Target },
];

const faqs = [
  { question: "Are you Salesforce implementation partners?", answer: "Yes. We handle Salesforce implementation, LWC development services, Experience Cloud portal development, and CRM automation." },
  { question: "Do you build high-converting e-commerce websites?", answer: "We build performance-optimized Shopify and WooCommerce stores, including custom calculators, real-time pricing, and CRO-focused UX." },
  { question: "Can you improve ROAS and lower CPA on Meta Ads?", answer: "Yes. Our performance marketing team runs data-driven Meta Ads with testing, creative optimization, and ROAS-focused scaling." },
  { question: "Do you offer Salesforce data cleaning and automation?", answer: "We clean CRM data, resolve duplicates, and automate lead generation using Salesforce Flow, rules, and custom LWC interfaces." },
  { question: "Are you a SECP registered IT firm in Lahore?", answer: "Yes. We are an SECP and FBR registered IT firm based in City Star Plaza, Township, Lahore, serving Pakistan and global clients." },
  { question: "How do we get started?", answer: "Book a discovery call and we will map scope, timeline, and pricing for Salesforce, e-commerce, or performance marketing." },
];

const seoContent = {
  kicker: "Full-Service Agency",
  title: "Salesforce, E-commerce, and Performance Marketing Under One Roof",
  subtitle: "IT Meta Solutions is a Salesforce implementation partner and digital agency helping brands scale with LWC development, Experience Cloud portals, and high-converting ecommerce.",
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

// Tech showcase images (Unsplash)
const techShowcaseImages = [
  {
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&auto=format&fit=crop&q=80",
    title: "Web Development",
    desc: "Modern, high-performance sites",
    colSpan: "col-span-1",
  },
  {
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&auto=format&fit=crop&q=80",
    title: "Performance Marketing",
    desc: "Data-driven growth campaigns",
    colSpan: "col-span-1 row-span-2",
  },
  {
    url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=700&auto=format&fit=crop&q=80",
    title: "Custom Web Apps",
    desc: "Complex portals & platforms",
    colSpan: "col-span-1",
  },
  {
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80",
    title: "Salesforce CRM",
    desc: "Enterprise CRM solutions",
    colSpan: "col-span-2",
  },
];

/* ==================== PAGE ==================== */

export default function Home() {
  const reduced = usePrefersReducedMotion();

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim())  newErrors.name  = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setErrors({});
    setStatus("sending");
    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      data.services = formData.getAll("services");
      const payload = { ...data, createdAt: new Date().toISOString(), source: "home-page" };
      const res = await fetch("https://it-meta-solutions.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
      e.target.querySelectorAll('input[type="checkbox"]').forEach((cb) => (cb.checked = false));
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Helmet>
        <title>IT Meta Solutions - Premium Web Development & Digital Marketing</title>
        <meta name="description" content="Salesforce implementation partners delivering LWC, Experience Cloud, Shopify, and performance marketing for high-converting growth." />
        <link rel="canonical" href="https://itmetasolutions.com/" />
      </Helmet>

      <div>
        <ScrollProgress />

        {/* ==================== HERO ==================== */}
        <section className="relative bg-[#09090e] pt-28 pb-16 sm:pt-36 sm:pb-20 overflow-hidden">
          {/* Tech mesh background */}
          <TechMeshBg variant="full" iconOpacityBase={0.04} />
          {/* Animated background grid */}
          <div className="absolute inset-0 dot-grid-bg opacity-60 pointer-events-none" />
          {/* Radial gradient overlay */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(80,37,209,0.12) 0%, transparent 70%)" }} />

          <Container>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

              {/* LEFT: Content */}
              <motion.div>
                <motion.div
                  initial={reduced ? false : { y: 16, opacity: 0 }}
                  animate={reduced ? {} : { y: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Badge icon={Zap}>Trusted by 40+ businesses worldwide</Badge>
                </motion.div>

                <motion.h1
                  initial={reduced ? false : { y: 16, opacity: 0 }}
                  animate={reduced ? {} : { y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
                >
                  Build. Grow. Dominate.
                  <br />
                  <span className="animated-gradient-text">
                    Your Digital Success
                  </span>
                </motion.h1>

                <motion.p
                  initial={reduced ? false : { y: 16, opacity: 0 }}
                  animate={reduced ? {} : { y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-4 text-base text-zinc-300 sm:text-lg max-w-xl"
                >
                  We craft high-converting websites, launch powerful marketing campaigns, and build brands that stand out. Let's turn your vision into reality.
                </motion.p>

                <motion.div
                  initial={reduced ? false : { y: 16, opacity: 0 }}
                  animate={reduced ? {} : { y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-10 flex flex-col gap-4 sm:flex-row"
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
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-zinc-800 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-zinc-700 hover:border-white/30"
                  >
                    <PlayCircle className="h-5 w-5" />
                    View Our Work
                  </Link>
                </motion.div>

                <motion.div
                  initial={reduced ? false : { y: 8, opacity: 0 }}
                  animate={reduced ? {} : { y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-12 flex flex-wrap items-center gap-6 text-sm text-zinc-400"
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

              {/* RIGHT: Browser + Mobile Prototype */}
              <motion.div
                initial={reduced ? false : { x: 50, opacity: 0 }}
                animate={reduced ? {} : { x: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
                className="relative hidden lg:flex items-center justify-center"
              >
                <div className="relative w-full max-w-[480px]">

                  {/* Browser Window */}
                  <div className="rounded-2xl border border-white/10 bg-zinc-900/90 backdrop-blur-xl shadow-2xl shadow-[#5025d1]/25 overflow-hidden">

                    {/* Chrome bar */}
                    <div className="flex items-center gap-3 px-4 py-3 bg-zinc-800/80 border-b border-white/10">
                      <div className="flex gap-1.5 shrink-0">
                        <div className="h-3 w-3 rounded-full bg-red-500/80" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                        <div className="h-3 w-3 rounded-full bg-green-500/80" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 rounded-md bg-zinc-700/60 px-3 py-1.5 text-xs text-zinc-400">
                          <Globe className="h-3 w-3 shrink-0" />
                          <span className="truncate">client-portal.itmetasolutions.com</span>
                        </div>
                      </div>
                    </div>

                    {/* Client Portal Content */}
                    <div className="p-4 space-y-3 bg-[#0d0d14]">

                      {/* Service status cards */}
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { label: "Website",   value: "Live",     icon: Globe,      badge: "✓",  glow: "from-emerald-500/10", iconColor: "text-emerald-400", badgeColor: "text-emerald-400" },
                          { label: "SEO",       value: "94 / 100", icon: Search,     badge: "↑",  glow: "from-purple-500/10",  iconColor: "text-purple-400",  badgeColor: "text-purple-400"  },
                          { label: "Web App",   value: "v2.1",     icon: LayoutGrid, badge: "●",  glow: "from-blue-500/10",    iconColor: "text-blue-400",    badgeColor: "text-blue-400"    },
                          { label: "Marketing", value: "3 Active", icon: Megaphone,  badge: "↗",  glow: "from-pink-500/10",    iconColor: "text-pink-400",    badgeColor: "text-pink-400"    },
                        ].map((s) => {
                          const Icon = s.icon;
                          return (
                            <div key={s.label} className={`rounded-xl bg-gradient-to-b ${s.glow} to-transparent border border-white/10 p-2`}>
                              <div className="flex items-center justify-between mb-1">
                                <Icon className={`h-3 w-3 ${s.iconColor}`} />
                                <span className={`text-[9px] font-bold ${s.badgeColor}`}>{s.badge}</span>
                              </div>
                              <div className="text-[9px] text-zinc-500 uppercase tracking-wide">{s.label}</div>
                              <div className="text-[11px] font-bold text-white mt-0.5">{s.value}</div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Middle row */}
                      <div className="grid grid-cols-2 gap-2">

                        {/* Website wireframe */}
                        <div className="rounded-xl bg-white/[0.04] border border-white/10 p-2.5">
                          <div className="text-[10px] font-semibold text-zinc-400 mb-2 uppercase tracking-wide flex items-center gap-1">
                            <Globe className="h-2.5 w-2.5" /> Website
                          </div>
                          <div className="flex items-center justify-between bg-zinc-800/70 rounded px-1.5 py-1 mb-1.5">
                            <div className="h-1.5 w-7 rounded bg-[#5025d1]/70" />
                            <div className="flex gap-1">
                              {[10, 8, 10].map((w, i) => <div key={i} className="h-1 rounded bg-white/15" style={{ width: w }} />)}
                            </div>
                          </div>
                          <div className="rounded bg-gradient-to-br from-[#5025d1]/25 to-purple-900/10 p-1.5 mb-1.5">
                            <div className="h-1.5 w-16 rounded bg-white/30 mb-1" />
                            <div className="h-1 w-12 rounded bg-white/15 mb-0.5" />
                            <div className="h-1 w-10 rounded bg-white/10 mb-1.5" />
                            <div className="h-3 w-10 rounded-full bg-[#5025d1]/80" />
                          </div>
                          <div className="grid grid-cols-3 gap-1 mb-1.5">
                            {["#5025d1", "#ba55d3", "#3b82f6"].map((c, i) => (
                              <div key={i} className="rounded p-1" style={{ background: `${c}18`, border: `1px solid ${c}30` }}>
                                <div className="h-2 w-2 rounded-sm mb-0.5" style={{ background: `${c}50` }} />
                                <div className="h-0.5 rounded" style={{ width: "75%", background: "rgba(255,255,255,0.2)" }} />
                              </div>
                            ))}
                          </div>
                          <div className="h-2 rounded bg-zinc-800/60 flex items-center gap-1 px-1">
                            {[0, 1, 2, 3].map((i) => <div key={i} className="h-0.5 w-3 rounded bg-white/10" />)}
                          </div>
                        </div>

                        {/* SEO rankings */}
                        <div className="rounded-xl bg-white/[0.04] border border-white/10 p-2.5">
                          <div className="text-[10px] font-semibold text-zinc-400 mb-2 uppercase tracking-wide flex items-center gap-1">
                            <Search className="h-2.5 w-2.5" /> SEO Rankings
                          </div>
                          {[
                            { kw: "web design agency", pos: 1,  chg: "+5" },
                            { kw: "digital marketing",  pos: 3,  chg: "+2" },
                            { kw: "seo services",       pos: 4,  chg: "+8" },
                            { kw: "crm development",    pos: 7,  chg: "+3" },
                          ].map((r) => (
                            <div key={r.kw} className="flex items-center gap-1.5 mb-1.5 last:mb-0">
                              <span className={`text-[10px] font-bold w-4 text-center shrink-0 ${r.pos === 1 ? "text-yellow-400" : r.pos <= 3 ? "text-emerald-400" : "text-zinc-500"}`}>#{r.pos}</span>
                              <span className="text-[10px] text-zinc-400 flex-1 truncate">{r.kw}</span>
                              <span className="text-[9px] text-emerald-400 shrink-0">↑{r.chg}</span>
                            </div>
                          ))}
                          <div className="mt-2 flex items-center gap-1 rounded-md bg-purple-500/10 border border-purple-500/20 px-1.5 py-1">
                            <TrendingUp className="h-2.5 w-2.5 text-purple-400 shrink-0" />
                            <span className="text-[9px] text-purple-300">Avg. +4.5 positions this month</span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom row */}
                      <div className="grid grid-cols-2 gap-2">

                        {/* Marketing campaigns */}
                        <div className="rounded-xl bg-white/[0.04] border border-white/10 p-2.5">
                          <div className="text-[10px] font-semibold text-zinc-400 mb-2 uppercase tracking-wide flex items-center gap-1">
                            <Megaphone className="h-2.5 w-2.5" /> Marketing
                          </div>
                          {[
                            { name: "Google Ads", pct: 82, color: "bg-blue-500" },
                            { name: "Meta Ads",   pct: 67, color: "bg-pink-500" },
                            { name: "Email",      pct: 91, color: "bg-purple-500" },
                          ].map((c) => (
                            <div key={c.name} className="mb-1.5 last:mb-0">
                              <div className="flex justify-between mb-0.5">
                                <span className="text-[10px] text-zinc-400">{c.name}</span>
                                <span className="text-[10px] text-zinc-500">{c.pct}%</span>
                              </div>
                              <div className="h-1.5 rounded-full bg-white/10">
                                <div className={`h-full rounded-full ${c.color}`} style={{ width: `${c.pct}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* CRM pipeline */}
                        <div className="rounded-xl bg-white/[0.04] border border-white/10 p-2.5">
                          <div className="text-[10px] font-semibold text-zinc-400 mb-2 uppercase tracking-wide flex items-center gap-1">
                            <Database className="h-2.5 w-2.5" /> CRM Pipeline
                          </div>
                          {[
                            { stage: "New Leads", count: 24, color: "bg-blue-400",    bar: 90 },
                            { stage: "Qualified", count: 18, color: "bg-purple-400",  bar: 68 },
                            { stage: "Proposal",  count: 11, color: "bg-yellow-400",  bar: 42 },
                            { stage: "Closed",    count: 8,  color: "bg-emerald-400", bar: 30 },
                          ].map((s) => (
                            <div key={s.stage} className="flex items-center gap-1.5 mb-1.5 last:mb-0">
                              <div className={`h-1.5 w-1.5 rounded-full shrink-0 ${s.color}`} />
                              <span className="text-[10px] text-zinc-400 flex-1 truncate">{s.stage}</span>
                              <span className="text-[10px] font-semibold text-zinc-300 shrink-0">{s.count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Mobile Mockup */}
                  <div className="absolute -bottom-10 -right-10 w-[108px] rounded-[20px] border-[3px] border-zinc-700 bg-[#0d0d14] shadow-2xl shadow-[#5025d1]/30 overflow-hidden">
                    <div className="h-3 bg-zinc-800 flex items-center justify-center">
                      <div className="h-1 w-10 rounded-full bg-zinc-600" />
                    </div>
                    <div className="p-2 space-y-1.5">
                      <div className="flex items-center justify-between bg-zinc-800/80 rounded px-1.5 py-1">
                        <div className="h-1.5 w-6 rounded bg-[#5025d1]/80" />
                        <div className="flex flex-col gap-0.5">
                          {[0, 1, 2].map((i) => <div key={i} className="h-px w-3 rounded bg-white/30" />)}
                        </div>
                      </div>
                      <div className="rounded-lg bg-gradient-to-br from-[#5025d1]/30 to-purple-900/10 border border-[#5025d1]/25 p-1.5">
                        <div className="h-1.5 w-14 rounded bg-white/30 mb-1" />
                        <div className="h-1 w-10 rounded bg-white/15 mb-0.5" />
                        <div className="h-1 w-8 rounded bg-white/10 mb-1.5" />
                        <div className="h-3 w-9 rounded-full bg-[#5025d1]/80" />
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        {[
                          { label: "SEO", color: "#5025d1" },
                          { label: "Ads", color: "#ba55d3" },
                          { label: "CRM", color: "#3b82f6" },
                          { label: "Web", color: "#10b981" },
                        ].map((pill) => (
                          <div key={pill.label} className="rounded px-1 py-0.5 flex items-center gap-0.5"
                            style={{ background: `${pill.color}20`, border: `1px solid ${pill.color}35` }}>
                            <div className="h-1 w-1 rounded-full" style={{ background: pill.color }} />
                            <span style={{ fontSize: "7px", color: "#ccc" }}>{pill.label}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 rounded-md bg-emerald-500/15 border border-emerald-500/25 px-1.5 py-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span style={{ fontSize: "7px" }} className="text-emerald-300 font-medium">Mobile Ready</span>
                      </div>
                    </div>
                  </div>

                  {/* Floating Badges */}
                  <motion.div
                    animate={{ y: [-4, 4, -4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-5 -left-6 flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/90 backdrop-blur-sm px-3 py-2 shadow-xl shadow-black/40"
                  >
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-xs font-semibold text-white">+127% Traffic Growth</span>
                  </motion.div>

                  <motion.div
                    animate={{ y: [4, -4, 4] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-16 -left-8 flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/90 backdrop-blur-sm px-3 py-2 shadow-xl shadow-black/40"
                  >
                    <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-semibold text-white">98% Client Satisfaction</span>
                  </motion.div>

                  <motion.div
                    animate={{ y: [-3, 3, -3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 -right-8 -translate-y-1/2 flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/90 backdrop-blur-sm px-3 py-2 shadow-xl shadow-black/40"
                  >
                    <Rocket className="h-3.5 w-3.5 text-purple-400" />
                    <span className="text-xs font-semibold text-white">40+ Projects Delivered</span>
                  </motion.div>
                </div>
              </motion.div>

            </div>
          </Container>
        </section>

        {/* ==================== STATS ==================== */}
        <section className="bg-[#0b0b14] py-14 sm:py-20 relative overflow-hidden">
          <TechMeshBg variant="marketing" iconColor="#5025d1" iconOpacityBase={0.03} />
          <div className="absolute inset-0 dot-grid-bg opacity-40 pointer-events-none" />
          {/* Top & bottom divider glow */}
          <div className="absolute top-0 left-0 right-0 section-divider" />
          <div className="absolute bottom-0 left-0 right-0 section-divider" />

          <Container>
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={reduced ? false : { y: 20, opacity: 0 }}
                    whileInView={reduced ? {} : { y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={cx(
                      "text-center px-6 py-10 relative group",
                      index % 2 !== 0 ? "border-l border-white/[0.08]" : "",
                      index >= 2 ? "border-t border-white/[0.08] lg:border-t-0" : "",
                      index !== 0 ? "lg:border-l lg:border-white/[0.08]" : ""
                    )}
                  >
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#1c1a3a] mb-4 mx-auto"
                      style={{ boxShadow: "0 0 20px rgba(80,37,209,0.25)" }}>
                      <Icon className="h-5 w-5 text-[#a78bfa]" />
                    </div>
                    <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white neon-stat">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-sm text-zinc-400">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ==================== BRANDS SLIDER ==================== */}
        <section className="py-16 sm:py-24 bg-[#09090e] relative overflow-hidden">
          <TechMeshBg variant="marketing" iconColor="#5025d1" iconOpacityBase={0.03} />
          <div className="absolute inset-0 dot-grid-bg opacity-30 pointer-events-none" />
          <Container>
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={reduced ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#5025d1] mb-5">
                Trusted Partners
              </p>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Brands That Trust Us
              </h3>
              <p className="mt-4 text-zinc-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                We've partnered with amazing brands to deliver exceptional digital experiences
              </p>
              <p className="mt-2 text-base sm:text-lg italic font-medium animated-gradient-text">
                and growing
              </p>
            </motion.div>
          </Container>

          <div style={{ overflow: "hidden" }}>
            <Marquee speed={40} pauseOnHover gradient gradientColor="#09090e" gradientWidth={120}>
              {[...clientSliderData, ...clientSliderData, ...clientSliderData, ...clientSliderData].map((client, i) => (
                <div key={i} className="group mx-8 flex-shrink-0 flex items-center justify-center">
                  {client.logo && (
                    <img
                      src={client.logo}
                      alt={`${client.name} logo`}
                      className="h-[52px] w-auto object-contain opacity-50 transition-all duration-300 group-hover:opacity-100"
                      style={{ filter: "brightness(1.1)" }}
                    />
                  )}
                </div>
              ))}
            </Marquee>
          </div>
        </section>

        {/* ==================== ABOUT SECTION ==================== */}
        <section className="py-20 sm:py-28 bg-[#0b0b14] relative overflow-hidden">
          <TechMeshBg variant="devtech" iconColor="#5025d1" iconOpacityBase={0.032} />
          <div className="absolute inset-0 dot-grid-bg opacity-50 pointer-events-none" />
          {/* Background blobs */}
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(80,37,209,0.08) 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(0,245,255,0.05) 0%, transparent 70%)" }} />

          <Container>
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

              {/* Left: Image */}
              <motion.div
                initial={reduced ? false : { x: -30, opacity: 0 }}
                whileInView={reduced ? {} : { x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                {/* Neon frame glow */}
                <div className="absolute -inset-[2px] rounded-2xl -z-10 opacity-70"
                  style={{ background: "linear-gradient(135deg, rgba(80,37,209,0.8), transparent 50%, rgba(0,245,255,0.4))" }} />

                <div className="relative rounded-2xl overflow-hidden"
                  style={{ boxShadow: "0 0 50px rgba(80,37,209,0.3), 0 0 100px rgba(80,37,209,0.1)" }}>
                  <img
                    src={homeAboutImage}
                    alt="Professional woman representing digital growth"
                    className="w-full h-[460px] object-cover"
                    loading="lazy"
                  />
                  {/* Dark gradient overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b14]/70 via-transparent to-transparent" />
                  {/* Scan line effect */}
                  <div className="absolute inset-0 scan-line opacity-30 pointer-events-none" />
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 flex items-center gap-2 rounded-xl border border-[#5025d1]/40 bg-zinc-900/95 backdrop-blur-sm px-4 py-3 shadow-xl"
                  style={{ boxShadow: "0 0 20px rgba(80,37,209,0.3)" }}
                >
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-semibold text-white">SECP Registered</span>
                </motion.div>

                <motion.div
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-xl border border-[#5025d1]/40 bg-zinc-900/95 backdrop-blur-sm px-4 py-3 shadow-xl"
                  style={{ boxShadow: "0 0 20px rgba(80,37,209,0.25)" }}
                >
                  <Award className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm font-semibold text-white">5+ Years Excellence</span>
                </motion.div>

                {/* Corner accent dots */}
                <div className="absolute top-4 left-4 h-3 w-3 rounded-full bg-[#5025d1]"
                  style={{ boxShadow: "0 0 12px rgba(80,37,209,0.9)" }} />
                <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-[#00f5ff]/60"
                  style={{ boxShadow: "0 0 8px rgba(0,245,255,0.7)" }} />
              </motion.div>

              {/* Right: Content */}
              <motion.div
                initial={reduced ? false : { x: 30, opacity: 0 }}
                whileInView={reduced ? {} : { x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#a78bfa] mb-5">
                  About Us
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Your Digital Growth
                  <span className="block animated-gradient-text mt-1">
                    Partner Since Day One
                  </span>
                </h2>
                <p className="mt-6 text-base sm:text-lg text-zinc-400 leading-relaxed">
                  IT Meta Solutions is a full-service digital agency based in Lahore, Pakistan, serving clients across the UK, US, and Middle East. We combine technical mastery with creative strategy to deliver results that matter.
                </p>
                <p className="mt-4 text-sm text-zinc-500 leading-relaxed">
                  From Salesforce implementations and custom web apps to performance marketing and brand building — we're the team that turns ambition into achievement.
                </p>

                {/* Key facts grid */}
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {[
                    { icon: Shield,    label: "SECP & FBR Registered", desc: "Officially registered IT firm" },
                    { icon: Globe,     label: "Global Clients",         desc: "UK, US, Pakistan, Middle East" },
                    { icon: Users,     label: "40+ Happy Clients",      desc: "Long-term partnerships" },
                    { icon: Rocket,    label: "50+ Projects Shipped",   desc: "Startups to enterprise scale" },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={reduced ? false : { y: 12, opacity: 0 }}
                        whileInView={reduced ? {} : { y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: 0.3 + i * 0.08 }}
                        className="flex items-start gap-3 rounded-xl bg-zinc-900/60 border border-white/[0.07] p-4 glass-card"
                      >
                        <div className="flex-shrink-0 h-9 w-9 rounded-lg bg-[#1c1a3a] flex items-center justify-center">
                          <Icon className="h-4 w-4 text-[#a78bfa]" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white leading-tight">{item.label}</div>
                          <div className="text-xs text-zinc-500 mt-0.5">{item.desc}</div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Tech stack pills */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {["React", "Next.js", "Salesforce LWC", "Shopify", "Node.js", "PostgreSQL"].map((tech) => (
                    <span key={tech}
                      className="rounded-full border border-[#5025d1]/30 bg-[#5025d1]/10 px-3 py-1 text-xs font-medium text-[#a78bfa]"
                      style={{ boxShadow: "0 0 10px rgba(80,37,209,0.1)" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5025d1] to-purple-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#5025d1]/35 transition-all hover:scale-105 hover:shadow-xl"
                  >
                    Work With Us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/work"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-zinc-800/60 px-7 py-3.5 text-base font-semibold text-white transition-all hover:bg-zinc-700"
                  >
                    Our Work
                  </Link>
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* ==================== WHY CHOOSE US ==================== */}
        <section className="py-16 sm:py-24 bg-[#09090e] relative overflow-hidden">
          <TechMeshBg variant="marketing" iconColor="#5025d1" iconOpacityBase={0.035} />
          <div className="absolute inset-0 hex-grid-bg opacity-35 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(80,37,209,0.07) 0%, transparent 70%)" }} />
          <Container>
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

              {/* Left: Content */}
              <motion.div
                initial={reduced ? false : { x: -24, opacity: 0 }}
                whileInView={reduced ? {} : { x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#5025d1] mb-5">
                  Why Brands Choose Us
                </p>
                <h2 className="text-4xl sm:text-5xl font-bold text-white leading-[1.1]">
                  We combine creativity with strategy to deliver exceptional results
                </h2>
                <p className="mt-6 text-base sm:text-lg text-zinc-400 leading-relaxed">
                  Join 40+ brands growing with us. We don't just build websites; we build engines for business growth.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link to="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-[#5025d1] px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#5025d1]/30 transition-all hover:bg-[#5025d1]/90 hover:scale-105">
                    Let's Talk
                  </Link>
                  <Link to="/work"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-zinc-800 px-7 py-3.5 text-base font-semibold text-white transition-all hover:bg-zinc-700">
                    See Our Work
                  </Link>
                </div>
              </motion.div>

              {/* Right: Feature cards */}
              <div className="flex flex-col gap-4">
                {[
                  { icon: Rocket, title: "Launch Fast", description: "From idea to live product in weeks, not months. We move at the speed of your ambition.", accent: "#5025d1" },
                  { icon: Target, title: "Results Focused", description: "Every pixel, every campaign, every line of code is optimized for conversions and growth.", accent: "#a855f7" },
                  { icon: Zap,    title: "Always Innovating", description: "We stay ahead of trends so you stay ahead of competition. Cutting-edge solutions, always.", accent: "#00f5ff" },
                ].map((item, index) => (
                  <motion.div key={index}
                    initial={reduced ? false : { x: 24, opacity: 0 }}
                    whileInView={reduced ? {} : { x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.12 }}
                  >
                    <Link to="/services" className="block group">
                      <div className="flex gap-5 rounded-2xl border border-white/[0.08] bg-zinc-900/60 p-6 transition-all duration-300 hover:border-[#5025d1]/40 glass-card"
                        style={{ "--accent": item.accent }}>
                        {/* Colored left accent bar */}
                        <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-xl bg-[#1c1a3a]"
                          style={{ boxShadow: `0 0 20px ${item.accent}30` }}>
                          <item.icon className="h-6 w-6" style={{ color: item.accent }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-bold text-white">{item.title}</h4>
                          <p className="mt-1.5 text-sm text-zinc-400 leading-relaxed">{item.description}</p>
                          <div className="mt-3 flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all duration-200"
                            style={{ color: item.accent }}>
                            <span>Explore</span>
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ==================== SERVICES ==================== */}
        <section className="py-16 sm:py-24 bg-[#0b0b14] relative overflow-hidden">
          <TechMeshBg variant="devtech" iconColor="#5025d1" iconOpacityBase={0.035} />
          <div className="absolute inset-0 hex-grid-bg opacity-60 pointer-events-none" />
          <Container>
            <motion.div
              initial={reduced ? false : { y: 20, opacity: 0 }}
              whileInView={reduced ? {} : { y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#5025d1] mb-5">
                What We Do Best
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Services That{" "}
                <span className="animated-gradient-text">Transform</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto">
                From concept to execution, we deliver complete digital solutions tailored to your business goals
              </p>
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <ServiceCard key={index} service={service} delay={index * 0.08} />
              ))}
            </div>

            <motion.div
              initial={reduced ? false : { y: 16, opacity: 0 }}
              whileInView={reduced ? {} : { y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <Link to="/services"
                className="inline-flex items-center gap-2 rounded-full bg-[#5025d1] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#5025d1]/30 transition-all hover:bg-[#5025d1]/90 hover:scale-105">
                Explore All Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </Container>
        </section>

        {/* ==================== HOW WE WORK ==================== */}
        <section className="py-16 sm:py-24 bg-[#0b0b14] relative overflow-hidden">
          <TechMeshBg variant="marketing" iconColor="#5025d1" iconOpacityBase={0.035} />
          <div className="absolute inset-0 dot-grid-bg opacity-35 pointer-events-none" />
          <Container>
            <div className="mb-14 sm:mb-20 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a78bfa] mb-4">
                Our Process
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                How We Bring Your Vision to Life
              </h2>
              <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                A proven 4-step process that delivers results every time.
              </p>
            </div>

            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 sm:gap-x-8">
              {/* Horizontal connecting line */}
              <div className="absolute top-[38px] left-[calc(12.5%+19px)] right-[calc(12.5%+19px)] hidden lg:block">
                <div className="h-px w-full shimmer-border" />
              </div>

              {[
                { step: "01", title: "Discovery",    description: "We dive deep into your business, goals, and target audience to understand what success looks like for you." },
                { step: "02", title: "Strategy",     description: "Based on our findings, we craft a tailored strategy and roadmap aligned to your objectives." },
                { step: "03", title: "Create",       description: "Our team brings the strategy to life with stunning designs and flawless execution." },
                { step: "04", title: "Launch & Grow",description: "We launch your project and continuously optimize for maximum performance and growth." },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={reduced ? false : { y: 20, opacity: 0 }}
                  whileInView={reduced ? {} : { y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: index * 0.12, ease: "easeOut" }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative z-10 flex h-[76px] w-[76px] flex-shrink-0 items-center justify-center rounded-full bg-[#13122a] border border-[#2d2a5e]"
                    style={{ boxShadow: "0 0 20px rgba(80,37,209,0.3), 0 0 40px rgba(80,37,209,0.1)" }}>
                    <span className="text-2xl font-extrabold text-[#a78bfa] leading-none">{item.step}</span>
                  </div>
                  <h4 className="mt-6 text-base sm:text-lg font-bold text-white">{item.title}</h4>
                  <p className="mt-2.5 text-sm text-zinc-400 leading-relaxed max-w-[200px]">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* ==================== GLOBE / GLOBAL REACH ==================== */}
        <section className="py-20 sm:py-28 bg-[#0b0b14] relative overflow-hidden">
          <TechMeshBg variant="devtech" iconColor="#5025d1" iconOpacityBase={0.03} />
          {/* Background */}
          <div className="absolute inset-0 dot-grid-bg opacity-40 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(80,37,209,0.07) 0%, transparent 65%)" }} />
          <div className="absolute top-0 left-0 right-0 section-divider" />

          <Container>
            {/* Section header */}
            <motion.div
              initial={reduced ? false : { y: 20, opacity: 0 }}
              whileInView={reduced ? {} : { y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#5025d1] mb-5">
                Global Reach
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Serving Clients Across{" "}
                <span className="animated-gradient-text">Every Time Zone</span>
              </h2>
              <p className="mt-4 text-zinc-400 text-base sm:text-lg max-w-xl mx-auto">
                From Lahore to London to New York — we deliver measurable results regardless of geography.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Left: Globe */}
              <motion.div
                initial={reduced ? false : { opacity: 0, scale: 0.9 }}
                whileInView={reduced ? {} : { opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex justify-center"
              >
                {!reduced && <RotatingGlobe />}
                {reduced && (
                  <div className="w-[400px] h-[400px] rounded-full border border-[#5025d1]/40 flex items-center justify-center"
                    style={{ background: "radial-gradient(circle, rgba(80,37,209,0.1) 0%, transparent 70%)" }}>
                    <Globe className="h-24 w-24 text-[#5025d1]" />
                  </div>
                )}
              </motion.div>

              {/* Right: Stats & location info */}
              <div className="flex flex-col gap-5">
                <motion.div
                  initial={reduced ? false : { x: 30, opacity: 0 }}
                  whileInView={reduced ? {} : { x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-3">Where Our Clients Are</h3>
                  <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
                    Our distributed client base spans multiple continents. We operate fully remote with time-zone-aware communication, ensuring every client feels like they're our only client.
                  </p>
                </motion.div>

                {/* Stat cards */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "3+",   label: "Countries Served",  icon: Globe,      color: "from-[#5025d1] to-purple-600",  glow: "rgba(80,37,209,0.3)" },
                    { value: "40+",  label: "Global Clients",    icon: Users,      color: "from-cyan-500 to-blue-500",      glow: "rgba(0,245,255,0.2)" },
                    { value: "50+",  label: "Projects Shipped",  icon: Rocket,     color: "from-pink-500 to-rose-500",      glow: "rgba(236,72,153,0.2)" },
                    { value: "24/7", label: "Support Coverage",  icon: Zap,        color: "from-emerald-500 to-teal-500",   glow: "rgba(16,185,129,0.2)" },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <motion.div key={i}
                        initial={reduced ? false : { y: 16, opacity: 0 }}
                        whileInView={reduced ? {} : { y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="rounded-2xl bg-zinc-900 border border-white/[0.08] p-5 relative overflow-hidden group neon-card"
                      >
                        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${item.color}`} />
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-xl bg-[#1c1a3a] flex items-center justify-center flex-shrink-0"
                            style={{ boxShadow: `0 0 15px ${item.glow}` }}>
                            <Icon className="h-4 w-4 text-[#a78bfa]" />
                          </div>
                          <div>
                            <div className="text-2xl font-extrabold text-white leading-none">{item.value}</div>
                            <div className="text-xs text-zinc-500 mt-0.5">{item.label}</div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Active countries */}
                <motion.div
                  initial={reduced ? false : { y: 12, opacity: 0 }}
                  whileInView={reduced ? {} : { y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="rounded-2xl border border-[#5025d1]/25 bg-[#5025d1]/5 p-5"
                  style={{ boxShadow: "0 0 30px rgba(80,37,209,0.08)" }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-sm font-semibold text-white">Currently Active In</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { flag: "🇵🇰", label: "Pakistan" },
                      { flag: "🇬🇧", label: "United Kingdom" },
                      { flag: "🇺🇸", label: "United States" },
                      { flag: "🇦🇪", label: "UAE" },
                    ].map((country) => (
                      <span key={country.label}
                        className="inline-flex items-center gap-1.5 rounded-full bg-zinc-800 border border-white/10 px-3 py-1.5 text-sm text-zinc-300">
                        <span>{country.flag}</span>
                        <span>{country.label}</span>
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Connection lines decoration */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#00f5ff]" style={{ boxShadow: "0 0 8px rgba(0,245,255,0.8)" }} />
                    <div className="h-px w-12 bg-gradient-to-r from-[#00f5ff]/60 to-transparent" />
                    <MapPin className="h-4 w-4 text-[#5025d1]" />
                  </div>
                  <span className="text-xs text-zinc-500">Lahore HQ → Global Delivery</span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ==================== PROJECTS & WORK ==================== */}
        <section className="py-16 sm:py-24 bg-[#09090e] relative overflow-hidden">
          <TechMeshBg variant="marketing" iconColor="#5025d1" iconOpacityBase={0.03} />
          <div className="absolute inset-0 dot-grid-bg opacity-35 pointer-events-none" />
          <Container>
            <SectionHeading
              badge="Projects & Work"
              title="Explore Work by Expertise"
              description="Browse featured outcomes by category, or jump straight into the filtered project library."
              centered
            />
            <div className="grid gap-6 lg:grid-cols-3">
              {projectCategories.map((category, index) => (
                <WorkCategoryCard key={category.title} category={category} delay={index * 0.1} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link to="/work"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#a78bfa] transition-all hover:gap-3">
                View Complete Project Library
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Container>
        </section>

        {/* ==================== INDUSTRIES ==================== */}
        <section className="py-16 sm:py-24 bg-[#0b0b14] relative overflow-hidden">
          <TechMeshBg variant="marketing" iconColor="#5025d1" iconOpacityBase={0.03} />
          <div className="absolute inset-0 dot-grid-bg opacity-40 pointer-events-none" />
          <Container>
            <SectionHeading
              badge="Industries"
              title="Built for the Way You Work"
              description="From high-growth startups to established enterprises, we tailor solutions that fit your market, customers, and goals."
              centered
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {industries.map((industry, index) => (
                <IndustryCard key={index} industry={industry} delay={index * 0.08} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#5025d1] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#5025d1]/30 transition-all hover:bg-[#5025d1]/90 hover:scale-105">
                Discuss Your Industry
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Container>
        </section>

        {/* ==================== TECH IMAGE SHOWCASE ==================== */}
        <section className="py-16 sm:py-24 bg-[#09090e] relative overflow-hidden">
          <TechMeshBg variant="devtech" iconColor="#5025d1" iconOpacityBase={0.03} />
          <div className="absolute inset-0 dot-grid-bg opacity-30 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 section-divider" />
          <Container>
            <motion.div
              initial={reduced ? false : { y: 20, opacity: 0 }}
              whileInView={reduced ? {} : { y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#5025d1] mb-5">
                What We Build
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Digital Experiences That{" "}
                <span className="animated-gradient-text">Captivate</span>
              </h2>
              <p className="mt-4 text-zinc-400 text-base sm:text-lg max-w-xl mx-auto">
                A glimpse into the kind of work we craft — from high-performance web apps to ROI-driven campaigns.
              </p>
            </motion.div>

            {/* Image grid — 3-col, uniform row height */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[300px]">
              {[
                {
                  url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&auto=format&fit=crop&q=80",
                  title: "Web Development",
                  desc: "Modern, high-performance websites",
                  className: "lg:col-span-1",
                },
                {
                  url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&auto=format&fit=crop&q=80",
                  title: "Performance Marketing",
                  desc: "Data-driven campaigns that convert",
                  className: "lg:col-span-1",
                },
                {
                  url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=700&auto=format&fit=crop&q=80",
                  title: "Custom Web Apps",
                  desc: "Complex portals & dashboards",
                  className: "lg:col-span-1",
                },
                {
                  url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80",
                  title: "Salesforce & CRM",
                  desc: "Enterprise-grade CRM solutions",
                  className: "lg:col-span-2",
                },
                {
                  url: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=700&auto=format&fit=crop&q=80",
                  title: "Digital Marketing",
                  desc: "SEO, ads & social campaigns",
                  className: "lg:col-span-1",
                },
              ].map((img, i) => (
                <motion.div
                  key={i}
                  initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                  whileInView={reduced ? {} : { opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={cx("group relative overflow-hidden rounded-2xl", img.className)}
                  style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.06)" }}
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ objectPosition: img.objectPosition || "center" }}
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  {/* Neon border on hover */}
                  <div className="absolute inset-0 border border-transparent group-hover:border-[#5025d1]/50 rounded-2xl transition-all duration-300 pointer-events-none"
                    style={{ boxShadow: "inset 0 0 0 0px rgba(80,37,209,0)" }} />
                  {/* Top-right neon dot */}
                  <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-[#5025d1] opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ boxShadow: "0 0 10px rgba(80,37,209,1)" }} />
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 p-5">
                    <div className="text-base font-bold text-white leading-tight">{img.title}</div>
                    <div className="text-zinc-400 text-sm mt-0.5">{img.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tech stack visual row */}
            <motion.div
              initial={reduced ? false : { y: 20, opacity: 0 }}
              whileInView={reduced ? {} : { y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 rounded-2xl border border-white/[0.07] bg-zinc-900/40 p-6 sm:p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a78bfa] mb-6 text-center">
                Technologies We Master
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { name: "React",          color: "#61dafb" },
                  { name: "Next.js",        color: "#ffffff" },
                  { name: "Salesforce LWC", color: "#00a1e0" },
                  { name: "Shopify",        color: "#96bf48" },
                  { name: "Node.js",        color: "#68a063" },
                  { name: "PostgreSQL",     color: "#336791" },
                  { name: "TypeScript",     color: "#3178c6" },
                  { name: "Solana",         color: "#9945ff" },
                  { name: "Tailwind CSS",   color: "#38bdf8" },
                  { name: "Prisma",         color: "#5a67d8" },
                  { name: "Meta Ads",       color: "#1877f2" },
                  { name: "Google Ads",     color: "#ea4335" },
                ].map((tech) => (
                  <span key={tech.name}
                    className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium text-zinc-300 transition-all hover:text-white"
                    style={{
                      borderColor: `${tech.color}30`,
                      background: `${tech.color}08`,
                      boxShadow: `0 0 0 0 ${tech.color}`,
                      transition: "box-shadow 0.3s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 16px ${tech.color}35`}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: tech.color }} />
                    {tech.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </Container>
        </section>

        <GoogleReviewsSection
          title="See What Clients Say On Google"
          description="Latest public Google feedback from our business profile."
        />

        <SeoContentFaq content={seoContent} />

        {/* ==================== FEATURED SHOWCASE BANNER ==================== */}
        <section className="py-16 sm:py-24 bg-[#0b0b14] relative overflow-hidden">
          <TechMeshBg variant="marketing" iconColor="#5025d1" iconOpacityBase={0.03} />
          <div className="absolute inset-0 hex-grid-bg opacity-30 pointer-events-none" />
          <Container>
            <motion.div
              initial={reduced ? false : { y: 16, opacity: 0 }}
              whileInView={reduced ? {} : { y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl"
              style={{ boxShadow: "0 0 60px rgba(80,37,209,0.2)" }}
            >
              <div className="absolute inset-0">
                {showcaseBannerImage
                  ? <img src={showcaseBannerImage} alt="Showcase background" className="h-full w-full object-cover" />
                  : <div className="h-full w-full bg-[#0e0e1d]" />}
              </div>
              <div className="absolute inset-0 bg-black/65 z-[5]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#09090e]/80 via-[#5025d1]/40 to-transparent z-10" />
              {/* Neon corner accents */}
              <div className="absolute top-0 left-0 w-24 h-24 z-20 pointer-events-none"
                style={{ background: "linear-gradient(135deg, rgba(80,37,209,0.4) 0%, transparent 50%)" }} />
              <div className="absolute bottom-0 right-0 w-32 h-32 z-20 pointer-events-none"
                style={{ background: "linear-gradient(315deg, rgba(0,245,255,0.1) 0%, transparent 50%)" }} />

              <div className="relative z-20 h-[380px] sm:h-[460px] flex items-center px-8 sm:px-12 lg:px-16">
                <div className="max-w-xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a78bfa] mb-5">
                    Award-Winning Agency
                  </p>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    Crafting Digital Excellence Since Day One
                  </h3>
                  <p className="mt-5 text-base text-white/80 leading-relaxed">
                    We've helped 40+ businesses transform their digital presence with custom solutions that drive real results.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-8">
                    {[{ value: "50+", label: "Projects" }, { value: "40+", label: "Clients" }, { value: "100%", label: "Satisfaction" }].map((stat, i) => (
                      <div key={i}>
                        <div className="text-2xl sm:text-3xl font-bold text-white neon-stat">{stat.value}</div>
                        <div className="text-xs text-white/60 mt-0.5">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* ==================== CONTACT FORM ==================== */}
        <section className="py-16 sm:py-24 bg-[#0b0b14] relative overflow-hidden" id="contact">
          <TechMeshBg variant="marketing" iconColor="#5025d1" iconOpacityBase={0.032} />
          <div className="absolute inset-0 hex-grid-bg opacity-40 pointer-events-none" />
          <Container>
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">

              {/* Left Column - Info */}
              <div>
                <SectionHeading
                  badge="Get in Touch"
                  title="Let's Start a Conversation"
                  description="Have a project in mind? We'd love to hear about it. Send us a message and we'll respond within 24 hours."
                />

                <div className="mt-8 space-y-3">
                  <a href="mailto:info@itmetasolutions.com"
                    className="flex items-center gap-4 rounded-2xl bg-zinc-900/60 border border-white/[0.07] p-5 glass-card transition-all duration-200">
                    <div className="flex-shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#1c1a3a]"
                      style={{ boxShadow: "0 0 15px rgba(80,37,209,0.2)" }}>
                      <Mail className="h-5 w-5 text-[#a78bfa]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-zinc-500">Email</div>
                      <div className="font-semibold text-white text-sm break-words">info@itmetasolutions.com</div>
                    </div>
                  </a>

                  <a href="tel:+923271804037"
                    className="flex items-center gap-4 rounded-2xl bg-zinc-900/60 border border-white/[0.07] p-5 glass-card transition-all duration-200">
                    <div className="flex-shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#1c1a3a]"
                      style={{ boxShadow: "0 0 15px rgba(80,37,209,0.2)" }}>
                      <Phone className="h-5 w-5 text-[#a78bfa]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-zinc-500">Phone / WhatsApp</div>
                      <div className="font-semibold text-white text-sm">+92 327 180 4037</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 rounded-2xl bg-zinc-900/60 border border-white/[0.07] p-5">
                    <div className="flex-shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#1c1a3a]"
                      style={{ boxShadow: "0 0 15px rgba(80,37,209,0.2)" }}>
                      <Globe className="h-5 w-5 text-[#a78bfa]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-zinc-500">Website</div>
                      <div className="font-semibold text-white text-sm break-words">www.itmetasolutions.com</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <motion.div
                initial={reduced ? false : { x: 16, opacity: 0 }}
                whileInView={reduced ? {} : { x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl bg-zinc-900/60 border border-white/[0.07] p-8"
                style={{ boxShadow: "0 0 40px rgba(80,37,209,0.07)" }}
              >
                <h3 className="text-2xl font-bold text-white">Send us a message</h3>
                <p className="mt-2 text-zinc-400">Fill out the form and we'll get back to you shortly.</p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white">Name *</label>
                    <input
                      type="text" name="name" value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={cx(
                        "mt-2 w-full rounded-xl border bg-[#13122a] px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2",
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
                        type="email" name="email" value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={cx(
                          "mt-2 w-full rounded-xl border bg-[#13122a] px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2",
                          errors.email ? "border-red-500 focus:ring-red-500" : "border-white/10 focus:ring-[#5025d1]"
                        )}
                        placeholder="you@example.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white">Phone *</label>
                      <input
                        type="tel" name="phone" value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={cx(
                          "mt-2 w-full rounded-xl border bg-[#13122a] px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2",
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
                          <input type="checkbox" name="services" value={service}
                            className="h-5 w-5 rounded border-white/20 bg-[#13122a] text-[#5025d1] focus:ring-[#5025d1]" />
                          <span className="text-sm text-zinc-300">{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white">Message *</label>
                    <textarea
                      name="message" value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={4}
                      className={cx(
                        "mt-2 w-full rounded-xl border bg-[#13122a] px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 resize-none",
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
                      "w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5025d1] to-purple-600 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-[#5025d1]/30 transition-all",
                      status === "sending" ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl hover:scale-[1.02]"
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

        {/* ==================== FAQ ==================== */}
        <section className="py-16 sm:py-24 bg-[#0b0b14] relative overflow-hidden">
          <TechMeshBg variant="devtech" iconColor="#5025d1" iconOpacityBase={0.03} />
          <div className="absolute inset-0 dot-grid-bg opacity-30 pointer-events-none" />
          <Container>
            <SectionHeading
              badge="FAQ"
              title="Answers to Common Questions"
              description="Everything you need to know before starting a project with us."
              centered
            />
            <div className="grid gap-4 md:grid-cols-2">
              {faqs.map((item, index) => (
                <FaqItem key={index} item={item} delay={index * 0.06} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link to="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#a78bfa] transition-all hover:gap-3">
                Still have questions? Talk to us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
