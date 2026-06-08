import {
  ArrowRight, ArrowUpRight, BadgeCheck,
  Facebook, Globe, Instagram, Linkedin,
  Mail, MapPin, Phone, Zap, Sparkles, Shield,
} from "lucide-react";
import { Link } from "react-router-dom";
import TechMeshBg from "./TechMeshBg";
import logo    from "../assets/img/IT Meta Solutions Logo Updated.webp";
import secpLogo from "../assets/img/SECP Logo ITMS.webp";
import fbrLogo  from "../assets/img/FBR Logo ITMS.webp";

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

const WHATSAPP_NUMBER  = "923271804037";
const WHATSAPP_MESSAGE = "Hi! I'm interested in your services.";

const WA_ICON = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Footer({ year, nav, AnchorLink, Container }) {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <footer className="relative overflow-hidden bg-[#141A2E]">

      {/* ── Full-footer tech mesh background ── */}
      <TechMeshBg variant="footer" iconOpacityBase={0.04} />

      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(29,78,216,0.6) 30%, rgba(35,166,232,0.5) 50%, rgba(29,78,216,0.6) 70%, transparent)" }} />

      {/* Ambient glow blobs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(29,78,216,0.08) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(35,166,232,0.06) 0%, transparent 70%)" }} />

      <div className="relative">

        {/* ============================================================
            CTA BANNER
        ============================================================ */}
        <Container className="pt-14 sm:pt-20 pb-0">
          <div className="relative rounded-3xl overflow-hidden"
            style={{ boxShadow: "0 0 60px rgba(29,78,216,0.15), 0 0 0 1px rgba(29,78,216,0.2)" }}>

            {/* Animated shimmer border */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{ padding: "1px", background: "linear-gradient(135deg, rgba(29,78,216,0.5), rgba(35,166,232,0.3), rgba(58,201,245,0.2), rgba(29,78,216,0.5))" }}>
              <div className="absolute inset-[1px] rounded-[23px] bg-[#0F1826]" />
            </div>

            {/* CTA inner content */}
            <div className="relative bg-gradient-to-br from-[#1D4ED8]/12 via-[#0F1826] to-[#23A6E8]/6 px-8 sm:px-12 py-10 sm:py-14">
              {/* Corner neon accents */}
              <div className="absolute top-0 left-0 w-20 h-20 pointer-events-none"
                style={{ background: "linear-gradient(135deg, rgba(29,78,216,0.3) 0%, transparent 60%)" }} />
              <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none"
                style={{ background: "linear-gradient(315deg, rgba(58,201,245,0.12) 0%, transparent 60%)" }} />

              {/* Top shimmer line */}
              <div className="absolute top-0 left-8 right-8 h-[1.5px] shimmer-border opacity-50" />

              <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-center lg:text-left max-w-xl">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#60A5FA] mb-3">
                    Let's Collaborate
                  </p>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                    Ready to transform your
                    <span className="block animated-gradient-text">digital presence?</span>
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">
                    Let's build something extraordinary together. Get in touch and discuss your project today.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1D4ED8] to-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
                    style={{ boxShadow: "0 0 20px rgba(29,78,216,0.4)" }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 36px rgba(29,78,216,0.6)"}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = "0 0 20px rgba(29,78,216,0.4)"}
                  >
                    Start a Project
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366]/90 hover:bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
                    style={{ boxShadow: "0 0 16px rgba(37,211,102,0.25)" }}
                  >
                    <WA_ICON />
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* ============================================================
            MAIN FOOTER COLUMNS
        ============================================================ */}
        <Container className="pt-14 sm:pt-16 pb-10">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">

            {/* ── Brand column ── */}
            <div className="lg:col-span-4">
              <Link to="/" className="inline-block group mb-1">
                <img
                  src={logo}
                  alt="IT Meta Solutions"
                  className="h-[68px] w-auto object-contain object-left transition-all duration-300 group-hover:scale-[1.04]"
                  style={{ filter: "drop-shadow(0 0 0 transparent)", transition: "filter 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.filter = "drop-shadow(0 0 10px rgba(29,78,216,0.4))"}
                  onMouseLeave={e => e.currentTarget.style.filter = "drop-shadow(0 0 0 transparent)"}
                />
              </Link>

              <p className="text-sm leading-relaxed text-zinc-400 max-w-xs">
                Modern websites, social media management, and marketing systems designed to look premium and perform at scale.
              </p>

              {/* Mini trust stats */}
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  { value: "50+", label: "Projects" },
                  { value: "40+", label: "Clients"  },
                  { value: "100%",label: "Sat."      },
                ].map((s) => (
                  <div key={s.label}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#1D4ED8]/20 bg-[#1D4ED8]/8 px-3 py-1.5">
                    <span className="text-sm font-bold text-white">{s.value}</span>
                    <span className="text-[11px] text-zinc-500">{s.label}</span>
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
                    className="flex items-center justify-center w-9 h-9 rounded-xl border border-white/[0.08] bg-white/[0.04] text-zinc-400 hover:text-white transition-all duration-300"
                    style={{ transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s" }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background   = `${social.color}22`;
                      e.currentTarget.style.borderColor  = `${social.color}50`;
                      e.currentTarget.style.boxShadow    = `0 0 16px ${social.color}30`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background   = "rgba(255,255,255,0.04)";
                      e.currentTarget.style.borderColor  = "rgba(255,255,255,0.08)";
                      e.currentTarget.style.boxShadow    = "none";
                    }}
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* ── Quick Links ── */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-semibold text-white mb-5 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-gradient-to-b from-[#1D4ED8] to-[#23A6E8]" />
                Quick Links
              </h4>
              <nav className="flex flex-col gap-2">
                {nav.map((n) => {
                  const cls = "group text-sm text-zinc-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5";
                  return n.href.startsWith("/") ? (
                    <Link key={n.href} to={n.href} className={cls}>
                      <span className="w-0 group-hover:w-2.5 h-px rounded-full bg-gradient-to-r from-[#1D4ED8] to-[#23A6E8] transition-all duration-200 shrink-0" />
                      {n.label}
                    </Link>
                  ) : (
                    <AnchorLink key={n.href} href={n.href} className={cls}>
                      <span className="w-0 group-hover:w-2.5 h-px rounded-full bg-gradient-to-r from-[#1D4ED8] to-[#23A6E8] transition-all duration-200 shrink-0" />
                      {n.label}
                    </AnchorLink>
                  );
                })}
              </nav>
            </div>

            {/* ── Services ── */}
            <div className="lg:col-span-3">
              <h4 className="text-sm font-semibold text-white mb-5 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-gradient-to-b from-[#1D4ED8] to-[#23A6E8]" />
                Services
              </h4>
              <nav className="flex flex-col gap-2">
                {services.map((service) => (
                  <Link
                    key={service.href}
                    to={service.href}
                    className="group flex items-center gap-1.5 text-[12.5px] text-zinc-400 hover:text-white transition-colors duration-200"
                  >
                    <span className="w-0 group-hover:w-2.5 h-px rounded-full bg-gradient-to-r from-[#1D4ED8] to-[#23A6E8] transition-all duration-200 shrink-0" />
                    {service.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* ── Contact ── */}
            <div className="lg:col-span-3">
              <h4 className="text-sm font-semibold text-white mb-5 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-gradient-to-b from-[#1D4ED8] to-[#23A6E8]" />
                Get in Touch
              </h4>
              <div className="space-y-3">
                {[
                  { href: "mailto:info@itmetasolutions.com", Icon: Mail,  label: "info@itmetasolutions.com" },
                  { href: "tel:+923271804037",               Icon: Phone, label: "+92 327 180 4037"        },
                  { href: "https://www.itmetasolutions.com", Icon: Globe, label: "www.itmetasolutions.com", ext: true },
                ].map(({ href, Icon, label, ext }) => (
                  <a
                    key={href}
                    href={href}
                    target={ext ? "_blank" : undefined}
                    rel={ext ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/[0.07] bg-white/[0.03] group-hover:bg-[#1D4ED8]/20 group-hover:border-[#1D4ED8]/30 transition-all shrink-0">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[13px] truncate">{label}</span>
                  </a>
                ))}
                <div className="flex items-start gap-3 text-sm text-zinc-500">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/[0.07] bg-white/[0.03] shrink-0 mt-0.5">
                    <MapPin className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[12px] leading-relaxed">
                    Office No M32 1st Floor, City Star Plaza,<br />Township Block 1, Lahore 54700
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* ============================================================
            REGISTRATION + BOTTOM BAR
        ============================================================ */}
        <div className="border-t border-white/[0.05]">
          <Container className="py-6">
            <div className="flex flex-col gap-5">

              {/* Registration badges */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 backdrop-blur-sm"
                  style={{ boxShadow: "0 0 20px rgba(29,78,216,0.06)" }}>
                  <img src={secpLogo} alt="SECP" className="h-9 w-auto object-contain" />
                  <div>
                    <div className="text-[9px] font-semibold uppercase tracking-widest text-zinc-500">SECP Registered</div>
                    <div className="text-[11px] font-bold text-white">No. N0298154</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 backdrop-blur-sm"
                  style={{ boxShadow: "0 0 20px rgba(29,78,216,0.06)" }}>
                  <img src={fbrLogo} alt="FBR" className="h-9 w-auto object-contain" />
                  <div>
                    <div className="text-[9px] font-semibold uppercase tracking-widest text-zinc-500">FBR Tax Registered</div>
                    <div className="text-[11px] font-bold text-white">NTN: G903294</div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

              {/* Copyright row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[12px] text-zinc-600 text-center sm:text-left">
                  © {year} IT Meta Solutions (Pvt) Ltd. All rights reserved.
                </p>

                {/* Trust badges */}
                <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-5">
                  {[
                    { label: "Trusted Delivery", Icon: BadgeCheck, color: "#1D4ED8" },
                    { label: "Fast & Modern",    Icon: Zap,        color: "#23A6E8" },
                    { label: "Secure Solutions", Icon: Shield,     color: "#10b981" },
                  ].map(({ label, Icon, color }) => (
                    <span key={label} className="inline-flex items-center gap-1.5 text-[11px] text-zinc-500">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full"
                        style={{ background: `${color}15` }}>
                        <Icon className="h-3 w-3" style={{ color }} />
                      </span>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </footer>
  );
}

