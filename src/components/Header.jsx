import {
  ArrowRight, ChevronDown, X, Phone,
  Code2, LayoutGrid, Cloud, Megaphone, Search, Palette,
  PlayCircle, Sparkles, Users,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import TechMeshBg from "./TechMeshBg";
import logo from "../assets/img/ITMS Logo Updated.webp";

const serviceSubMenu = [
  { label: "Web Development",   href: "/web-development-expertise",   icon: Code2      },
  { label: "Custom Web Apps",   href: "/custom-web-apps-expertise",    icon: LayoutGrid },
  { label: "Salesforce",        href: "/salesforce-expertise",         icon: Cloud      },
  { label: "Digital Marketing", href: "/digital-marketing-expertise",  icon: Megaphone  },
  { label: "SEO",               href: "/seo-expertise",                icon: Search     },
  { label: "Social Media",      href: "/social-media-expertise",       icon: Users      },
  { label: "Graphic Design",    href: "/graphic-designing-expertise",  icon: Palette    },
  { label: "Video Editing",     href: "/video-editing-expertise",      icon: PlayCircle },
  { label: "Brand Building",    href: "/brand-building-expertise",     icon: Sparkles   },
];

const WHATSAPP_NUMBER  = "923271804037";
const WHATSAPP_MESSAGE = "Hi! I'm interested in your services.";

function useDesktopViewport() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1024 : false
  );

  useEffect(() => {
    const media = window.matchMedia?.("(min-width: 1024px)");
    if (!media) return;
    const onChange = () => setIsDesktop(media.matches);
    onChange();
    media.addEventListener?.("change", onChange);
    return () => media.removeEventListener?.("change", onChange);
  }, []);

  return isDesktop;
}

export default function Header({ nav, AnchorLink }) {
  const [isMenuOpen,          setIsMenuOpen]          = useState(false);
  const [isServicesOpen,      setIsServicesOpen]      = useState(false);
  const [isMobileServicesOpen,setIsMobileServicesOpen]= useState(false);
  const [scrolled,            setScrolled]            = useState(false);
  const location = useLocation();
  const isDesktop = useDesktopViewport();

  useEffect(() => {
    document.body.style.overflow = !isDesktop && isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isDesktop, isMenuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);
  useEffect(() => { if (isDesktop) setIsMenuOpen(false); }, [isDesktop]);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const isActive = (href) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-[9998] transition-all duration-500 ${
        scrolled
          ? "bg-[#09090e]/92 backdrop-blur-2xl border-b border-[#5025d1]/35"
          : "bg-[#09090e]/75 backdrop-blur-lg border-b border-white/[0.06]"
      }`}
      style={scrolled ? { boxShadow: "0 4px 40px rgba(80,37,209,0.12), 0 1px 0 rgba(80,37,209,0.25)" } : {}}
    >
      {/* Shimmer accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] shimmer-border opacity-70" />

      {/* Subtle tech mesh in header background */}
      {isDesktop && <TechMeshBg variant="header" iconOpacityBase={0.028} />}

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px] sm:h-[76px]">

          {/* ── Logo ── */}
          <Link to="/" className="flex flex-col group shrink-0">
            <img
              src={logo}
              alt="IT Meta Solutions"
              className="h-[34px] sm:h-[42px] w-auto object-contain object-left transition-all duration-300 group-hover:scale-[1.04]"
              style={{ filter: "drop-shadow(0 0 0px transparent)", transition: "filter 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.filter = "drop-shadow(0 0 12px rgba(80,37,209,0.5))"}
              onMouseLeave={e => e.currentTarget.style.filter = "drop-shadow(0 0 0px transparent)"}
            />
          </Link>

          {/* ── Desktop nav ── */}
          {isDesktop && <nav className="flex items-center gap-0.5">
            {nav.map((n) => {
              if (n.label === "Services") {
                return (
                  <div
                    key={n.href}
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <Link
                      to={n.href}
                      className={`relative flex items-center gap-1 px-4 py-2 text-[13.5px] font-medium rounded-lg transition-all duration-200 ${
                        isActive(n.href)
                          ? "text-white bg-[#5025d1]/10"
                          : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                      }`}
                    >
                      {isActive(n.href) && (
                        <span className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-[#5025d1] to-[#ba55d3]"
                          style={{ boxShadow: "0 0 8px rgba(80,37,209,0.8)" }} />
                      )}
                      {n.label}
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isServicesOpen ? "rotate-180 text-[#a78bfa]" : ""}`} />
                    </Link>

                    {/* ── Services mega-dropdown ── */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 transition-all duration-250 ${
                        isServicesOpen
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2 pointer-events-none"
                      }`}
                      style={{ width: "600px" }}
                    >
                      <div className="rounded-2xl border border-[#5025d1]/25 bg-[#0a0a12] backdrop-blur-2xl overflow-hidden"
                        style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(80,37,209,0.18), 0 0 50px rgba(80,37,209,0.09)" }}>

                        {/* Top shimmer line */}
                        <div className="h-[2px] shimmer-border w-full" />

                        <div className="flex">
                          {/* ── Left accent panel ── */}
                          <div className="w-[170px] flex-shrink-0 flex flex-col justify-between p-5 relative overflow-hidden"
                            style={{ background: "linear-gradient(160deg, rgba(80,37,209,0.22) 0%, rgba(186,85,211,0.10) 60%, rgba(0,0,0,0) 100%)", borderRight: "1px solid rgba(80,37,209,0.18)" }}>
                            {/* Soft glow orb */}
                            <div className="absolute -top-6 -left-6 w-28 h-28 rounded-full pointer-events-none"
                              style={{ background: "radial-gradient(circle, rgba(80,37,209,0.35), transparent 70%)" }} />

                            <div className="relative">
                              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#5025d1] to-[#ba55d3] flex items-center justify-center mb-4"
                                style={{ boxShadow: "0 0 20px rgba(80,37,209,0.45)" }}>
                                <Sparkles className="h-4.5 w-4.5 text-white" />
                              </div>
                              <p className="text-sm font-bold text-white leading-snug">Our Services</p>
                              <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed">
                                End-to-end digital solutions for modern businesses
                              </p>
                            </div>

                            <div className="relative mt-6">
                              <div className="text-[10px] text-zinc-600 uppercase tracking-widest mb-2">SECP Registered</div>
                              <Link to="/services"
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#a78bfa] hover:text-white transition-colors group/all">
                                View all
                                <ArrowRight className="h-3 w-3 group-hover/all:translate-x-0.5 transition-transform" />
                              </Link>
                            </div>
                          </div>

                          {/* ── Right services grid ── */}
                          <div className="flex-1 p-4">
                            <div className="grid grid-cols-3 gap-1">
                              {serviceSubMenu.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item.href);
                                return (
                                  <Link
                                    key={item.href}
                                    to={item.href}
                                    className={`group/item flex flex-col items-start gap-2 rounded-xl px-3 py-3 text-[12.5px] transition-all duration-200 ${
                                      active
                                        ? "bg-[#5025d1]/15 text-white border border-[#5025d1]/30"
                                        : "text-zinc-400 hover:bg-white/[0.05] hover:text-white border border-transparent hover:border-[#5025d1]/20"
                                    }`}
                                  >
                                    <div className={`flex items-center justify-center h-8 w-8 rounded-lg transition-all duration-200 ${
                                      active
                                        ? "bg-[#5025d1]/30"
                                        : "bg-white/[0.05] group-hover/item:bg-[#5025d1]/20"
                                    }`}
                                      style={active ? { boxShadow: "0 0 12px rgba(80,37,209,0.4)" } : {}}
                                    >
                                      <Icon className={`h-4 w-4 transition-colors duration-200 ${active ? "text-[#a78bfa]" : "text-zinc-500 group-hover/item:text-[#a78bfa]"}`} />
                                    </div>
                                    <span className="font-medium leading-tight">{item.label}</span>
                                  </Link>
                                );
                              })}
                            </div>

                            <div className="mt-3 pt-3 border-t border-white/[0.05] flex items-center justify-between">
                              <span className="text-[11px] text-zinc-600">9 services · IT Meta Solutions</span>
                              <div className="flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                <span className="text-[11px] text-zinc-500">All available</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              /* Normal nav link */
              const active = isActive(n.href);
              const linkClass = `relative px-4 py-2 text-[13.5px] font-medium rounded-lg transition-all duration-200 ${
                active
                  ? "text-white bg-[#5025d1]/10"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
              }`;
              const activeBar = active ? (
                <span className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-[#5025d1] to-[#ba55d3]"
                  style={{ boxShadow: "0 0 8px rgba(80,37,209,0.8)" }} />
              ) : null;

              return n.href.startsWith("/") ? (
                <Link key={n.href} to={n.href} className={linkClass}>
                  {activeBar}
                  {n.label}
                </Link>
              ) : (
                <AnchorLink key={n.href} href={n.href} className={linkClass}>
                  {n.label}
                </AnchorLink>
              );
            })}
          </nav>}

          {/* ── Right CTAs ── */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">

            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366]/90 hover:bg-[#25D366] px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{ boxShadow: "0 0 0 0 transparent", transition: "box-shadow 0.3s, transform 0.2s, background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 20px rgba(37,211,102,0.35)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "0 0 0 0 transparent"}
              aria-label="Chat on WhatsApp"
            >
              <svg className="h-4 w-4 sm:h-4.5 sm:w-4.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="hidden sm:inline text-[13px]">WhatsApp</span>
            </a>

            {/* Get a Proposal — desktop */}
            {isDesktop && <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#5025d1] to-purple-600 px-4 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{ boxShadow: "0 0 0 0 transparent", transition: "box-shadow 0.3s, transform 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 24px rgba(80,37,209,0.55)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "0 0 0 0 transparent"}
            >
              Get a Proposal
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>}

            {/* Hamburger — mobile */}
            {!isDesktop && <button
              onClick={() => setIsMenuOpen(true)}
              className="relative flex flex-col justify-center items-center w-10 h-10 rounded-xl border border-white/[0.08] bg-white/[0.04] hover:bg-[#5025d1]/15 hover:border-[#5025d1]/30 transition-all duration-200"
              aria-label="Open menu"
            >
              <span className="w-5 h-[1.5px] bg-white mb-[5px] rounded-full block" />
              <span className="w-4 h-[1.5px] bg-zinc-400 mb-[5px] rounded-full block" />
              <span className="w-5 h-[1.5px] bg-white rounded-full block" />
            </button>}
          </div>
        </div>
      </div>

      {!isDesktop && isMenuOpen && (
      <>
      {/* ── Overlay ── */}
      <div
        className={`fixed inset-0 bg-black/65 backdrop-blur-sm z-[110] transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* ── Off-canvas mobile menu ── */}
      <div
        className={`fixed top-0 right-0 h-screen w-[88%] max-w-[360px] bg-[#09090e] transform transition-transform duration-350 ease-out z-[120] overflow-y-auto flex flex-col ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ borderLeft: "1px solid rgba(80,37,209,0.25)" }}
      >
        {/* Left accent bar */}
        <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-[#5025d1] via-[#ba55d3]/60 to-transparent" />
        {/* Tech mesh in mobile menu */}
        <TechMeshBg variant="minimal" iconOpacityBase={0.03} />

        <div className="relative flex flex-col h-full p-5 pt-6">
          {/* Header row */}
          <div className="flex items-center justify-between mb-7">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <img src={logo} alt="IT Meta Solutions" className="h-[36px] object-contain object-left" />
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.07] text-zinc-400 hover:text-white transition-all"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-[#5025d1]/40 via-[#ba55d3]/30 to-transparent mb-6" />

          {/* Nav links */}
          <nav className="flex flex-col gap-0.5 flex-1">
            {nav.map((n) => {
              if (n.label === "Services") {
                return (
                  <div key={n.href}>
                    <div className="flex items-center justify-between">
                      <Link
                        to={n.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex-1 py-3 px-3 text-base rounded-xl transition-all ${
                          isActive(n.href) ? "text-white bg-[#5025d1]/10" : "text-zinc-300 hover:text-white hover:bg-white/[0.05]"
                        }`}
                      >
                        {n.label}
                      </Link>
                      <button
                        onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                        className="p-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-all"
                        aria-label="Toggle services"
                      >
                        <ChevronDown className={`h-4.5 w-4.5 transition-transform duration-300 ${isMobileServicesOpen ? "rotate-180 text-[#a78bfa]" : ""}`} />
                      </button>
                    </div>

                    {/* Mobile services sub-menu */}
                    <div className={`overflow-hidden transition-all duration-350 ease-out ${
                      isMobileServicesOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                    }`}>
                      <div className="ml-3 pl-3 border-l border-[#5025d1]/25 mt-1 mb-2 grid grid-cols-2 gap-1">
                        {serviceSubMenu.map((item) => {
                          const Icon = item.icon;
                          const active = isActive(item.href);
                          return (
                            <Link
                              key={item.href}
                              to={item.href}
                              onClick={() => setIsMenuOpen(false)}
                              className={`flex items-center gap-2 rounded-xl px-2.5 py-2.5 text-[13px] transition-all ${
                                active
                                  ? "bg-[#5025d1]/15 text-white border border-[#5025d1]/25"
                                  : "text-zinc-400 hover:text-white hover:bg-white/[0.05] border border-transparent"
                              }`}
                            >
                              <div className={`h-6 w-6 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                active ? "bg-[#5025d1]/30" : "bg-white/[0.05]"
                              }`}>
                                <Icon className={`h-3 w-3 ${active ? "text-[#a78bfa]" : "text-zinc-500"}`} />
                              </div>
                              <span className="font-medium leading-tight">{item.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              const active = isActive(n.href);
              const cls = `py-3 px-3 text-base rounded-xl transition-all ${
                active ? "text-white bg-[#5025d1]/10" : "text-zinc-300 hover:text-white hover:bg-white/[0.05]"
              }`;

              return n.href.startsWith("/") ? (
                <Link key={n.href} to={n.href} onClick={() => setIsMenuOpen(false)} className={cls}>{n.label}</Link>
              ) : (
                <AnchorLink key={n.href} href={n.href} onClick={() => setIsMenuOpen(false)} className={cls}>{n.label}</AnchorLink>
              );
            })}
          </nav>

          {/* Mobile CTA */}
          <div className="pt-5 mt-4 space-y-3 border-t border-white/[0.07]">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center gap-3 w-full rounded-xl bg-[#25D366] px-4 py-3.5 text-[14px] font-semibold text-white transition-all"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-[#5025d1] to-purple-600 px-4 py-3.5 text-[14px] font-semibold text-white transition-all"
              style={{ boxShadow: "0 0 20px rgba(80,37,209,0.3)" }}
            >
              Get a Proposal
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+923271804037"
              className="flex items-center justify-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors py-1"
            >
              <Phone className="h-3.5 w-3.5" />
              +92 327 180 4037
            </a>
          </div>
        </div>
      </div>
      </>
      )}
    </header>
  );
}
