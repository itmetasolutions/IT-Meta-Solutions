import {
  ArrowRight, BadgeCheck, MessageCircle,
  Facebook, Globe, Instagram, Linkedin,
  Mail, MapPin, Phone, Zap, Shield,
} from "lucide-react";
import { Link } from "react-router-dom";
import logo    from "../assets/img/IT Meta Solutions Logo Updated.webp";
import { PHONE_NUMBERS, OFFICE_ADDRESS, EMAIL } from "../lib/contact";
import { openLiveChat } from "../lib/liveChat";

const services = [
  { label: "Web Development",   href: "/web-development-expertise"  },
  { label: "Custom Web Apps",   href: "/custom-web-apps-expertise"  },
  { label: "Salesforce",        href: "/salesforce-expertise"       },
  { label: "Digital Marketing", href: "/digital-marketing-expertise"},
  { label: "SEO",               href: "/seo-expertise"              },
  { label: "Social Media",      href: "/social-media-expertise"     },
  { label: "Graphic Design",    href: "/graphic-designing-expertise"},
  { label: "Video Editing",     href: "/video-editing-expertise"    },
  { label: "Brand Building",    href: "/brand-building-expertise"   },
];

const socialLinks = [
  { icon: Linkedin,  href: "https://www.linkedin.com/in/mehar-abdullah-khalid-375001331/", label: "LinkedIn",  color: "#0A66C2" },
  { icon: Instagram, href: "https://www.instagram.com/itmetasolutions.pvt.ltd/",           label: "Instagram", color: "#E1306C" },
  { icon: Facebook,  href: "https://web.facebook.com/itmetasolutions",                     label: "Facebook",  color: "#1877F2" },
];

export default function Footer({ year, nav, AnchorLink, Container }) {
  return (
    <footer className="relative overflow-hidden bg-[#0D1222]">
      {/* Top gradient border */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(29,78,216,0.55) 30%, rgba(35,166,232,0.45) 50%, rgba(29,78,216,0.55) 70%, transparent)" }}
      />

      {/* Subtle ambient glow */}
      <div
        className="absolute top-0 left-1/3 w-[500px] h-[350px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(29,78,216,0.07) 0%, transparent 70%)" }}
      />

      <div className="relative">

        {/* ── CTA Banner ── */}
        <Container className="pt-14 sm:pt-20 pb-0">
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ background: "linear-gradient(135deg, #1D4ED8 0%, #1a45c2 40%, #162f8f 100%)", boxShadow: "0 20px 60px rgba(29,78,216,0.30)" }}
          >
            {/* Subtle pattern */}
            <div className="absolute inset-0 dot-grid-bg opacity-20 pointer-events-none" />
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 60%)" }}
            />

            <div className="relative px-8 sm:px-12 py-10 sm:py-14">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-center lg:text-left max-w-xl">
                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-200 mb-3"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Let's Collaborate
                  </p>
                  <h3
                    className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Ready to transform your
                    <br />
                    <span className="text-blue-200">digital presence?</span>
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-blue-100/75 leading-relaxed">
                    Let's build something extraordinary together. Get in touch and discuss your project today.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm text-[#1D4ED8] transition-all duration-200 hover:bg-blue-50 hover:scale-[1.02]"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 700, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
                  >
                    Start a Project
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={openLiveChat}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/[0.16] border border-white/20 px-6 py-3.5 text-sm text-white transition-all duration-200 hover:scale-[1.02]"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                  >
                    <MessageCircle className="h-5 w-5" />
                    Live Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* ── Main Columns ── */}
        <Container className="pt-14 sm:pt-16 pb-10">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">

            {/* Brand column */}
            <div className="lg:col-span-4">
              <Link to="/" className="inline-block group mb-4">
                <img
                  src={logo}
                  alt="IT Meta Solutions"
                  className="h-[62px] w-auto object-contain object-left transition-all duration-300 group-hover:scale-[1.03]"
                  style={{ filter: "drop-shadow(0 0 0 transparent)", transition: "filter 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.filter = "drop-shadow(0 0 10px rgba(29,78,216,0.4))"}
                  onMouseLeave={e => e.currentTarget.style.filter = "drop-shadow(0 0 0 transparent)"}
                />
              </Link>

              <p className="text-sm leading-relaxed text-zinc-500 max-w-xs">
                Modern websites, social media management, Salesforce CRM, and marketing systems designed to look premium and perform at scale.
              </p>

              {/* Mini trust stats */}
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  { value: "50+", label: "Projects" },
                  { value: "40+", label: "Clients"  },
                  { value: "100%", label: "Satisfaction" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1.5"
                  >
                    <span
                      className="text-sm font-bold text-white"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {s.value}
                    </span>
                    <span className="text-[11px] text-zinc-600">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="mt-5 flex gap-2.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-xl border border-white/[0.07] bg-white/[0.03] text-zinc-500 hover:text-white transition-all duration-200"
                    onMouseEnter={e => {
                      e.currentTarget.style.background   = `${social.color}20`;
                      e.currentTarget.style.borderColor  = `${social.color}45`;
                      e.currentTarget.style.boxShadow    = `0 0 14px ${social.color}28`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background   = "rgba(255,255,255,0.03)";
                      e.currentTarget.style.borderColor  = "rgba(255,255,255,0.07)";
                      e.currentTarget.style.boxShadow    = "none";
                    }}
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h4
                className="text-sm font-semibold text-white mb-5"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Quick Links
              </h4>
              <nav className="flex flex-col gap-2.5">
                {nav.map((n) => {
                  const cls = "group text-[13px] text-zinc-500 hover:text-white transition-colors duration-200 flex items-center gap-1.5";
                  return n.href.startsWith("/") ? (
                    <Link key={n.href} to={n.href} className={cls}>
                      <span className="w-0 group-hover:w-2 h-px rounded-full bg-gradient-to-r from-[#1D4ED8] to-[#3AC9F5] transition-all duration-200 shrink-0" />
                      {n.label}
                    </Link>
                  ) : (
                    <AnchorLink key={n.href} href={n.href} className={cls}>
                      <span className="w-0 group-hover:w-2 h-px rounded-full bg-gradient-to-r from-[#1D4ED8] to-[#3AC9F5] transition-all duration-200 shrink-0" />
                      {n.label}
                    </AnchorLink>
                  );
                })}
              </nav>
            </div>

            {/* Services */}
            <div className="lg:col-span-3">
              <h4
                className="text-sm font-semibold text-white mb-5"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Services
              </h4>
              <nav className="flex flex-col gap-2">
                {services.map((service) => (
                  <Link
                    key={service.href}
                    to={service.href}
                    className="group flex items-center gap-1.5 text-[13px] text-zinc-500 hover:text-white transition-colors duration-200"
                  >
                    <span className="w-0 group-hover:w-2 h-px rounded-full bg-gradient-to-r from-[#1D4ED8] to-[#3AC9F5] transition-all duration-200 shrink-0" />
                    {service.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div className="lg:col-span-3">
              <h4
                className="text-sm font-semibold text-white mb-5"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Get in Touch
              </h4>
              <div className="space-y-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className="group flex items-center gap-3 text-sm text-zinc-500 hover:text-white transition-colors"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/[0.06] bg-white/[0.02] group-hover:bg-[#1D4ED8]/18 group-hover:border-[#1D4ED8]/28 transition-all shrink-0">
                    <Mail className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[13px] truncate">{EMAIL}</span>
                </a>
                {PHONE_NUMBERS.map((p) => (
                  <a
                    key={p.tel}
                    href={`tel:${p.tel}`}
                    className="group flex items-center gap-3 text-sm text-zinc-500 hover:text-white transition-colors"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/[0.06] bg-white/[0.02] group-hover:bg-[#1D4ED8]/18 group-hover:border-[#1D4ED8]/28 transition-all shrink-0">
                      <Phone className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[13px] truncate">{p.display} <span className="text-zinc-600">({p.region})</span></span>
                  </a>
                ))}
                <a
                  href="https://www.itmetasolutions.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm text-zinc-500 hover:text-white transition-colors"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/[0.06] bg-white/[0.02] group-hover:bg-[#1D4ED8]/18 group-hover:border-[#1D4ED8]/28 transition-all shrink-0">
                    <Globe className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[13px] truncate">www.itmetasolutions.com</span>
                </a>
                <div className="flex items-start gap-3 text-sm text-zinc-600">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/[0.06] bg-white/[0.02] shrink-0 mt-0.5">
                    <MapPin className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[12px] leading-relaxed">
                    {OFFICE_ADDRESS}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/[0.05]">
          <Container className="py-6 lg:pr-24">
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4 sm:gap-3 text-center">

              {/* Copyright — left */}
              <p className="text-[12px] text-zinc-600 order-1 sm:text-left">
                © {year} IT Meta Solutions (Pvt) Ltd. All rights reserved.
              </p>

              {/* Legal links — center */}
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 order-3 sm:order-2">
                <Link to="/privacy-policy" className="text-[12px] text-zinc-600 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
                <span className="text-zinc-800">•</span>
                <Link to="/terms-and-conditions" className="text-[12px] text-zinc-600 hover:text-white transition-colors duration-200">
                  Terms &amp; Conditions
                </Link>
              </div>

              {/* Trust badges — right */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 order-2 sm:order-3 sm:justify-end">
                {[
                  { label: "Trusted Delivery", Icon: BadgeCheck, color: "#1D4ED8" },
                  { label: "Fast & Modern",    Icon: Zap,        color: "#23A6E8" },
                  { label: "Secure Solutions", Icon: Shield,     color: "#10b981" },
                ].map(({ label, Icon, color }) => (
                  <span key={label} className="inline-flex items-center gap-1.5 text-[11px] text-zinc-600">
                    <span
                      className="flex items-center justify-center w-5 h-5 rounded-full"
                      style={{ background: `${color}14` }}
                    >
                      <Icon className="h-3 w-3" style={{ color }} />
                    </span>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </footer>
  );
}
