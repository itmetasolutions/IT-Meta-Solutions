import { ArrowRight, ChevronDown, X, MessageCircle, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/IT Meta Solutions Logo.webp";

const serviceSubMenu = [
  { label: "Web Development", href: "/web-development-expertise" },
  { label: "Custom Web Apps", href: "/custom-web-apps-expertise" },
  { label: "Salesforce", href: "/salesforce-expertise" },
  { label: "Digital Marketing", href: "/digital-marketing-expertise" },
  { label: "SEO", href: "/seo-expertise" },
  { label: "Social Media", href: "/social-media-expertise" },
  { label: "Graphic Design", href: "/graphic-designing-expertise" },
  { label: "Video Editing", href: "/video-editing-expertise" },
  { label: "Brand Building", href: "/brand-building-expertise" },
];

const WHATSAPP_NUMBER = "923271804037";
const WHATSAPP_MESSAGE = "Hi! I'm interested in your services.";

export default function Header({ nav, AnchorLink }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-[9998] transition-all duration-300 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-xl border-b border-[#5025d1]/30 shadow-lg shadow-[#5025d1]/10'
          : 'bg-black/70 backdrop-blur-md border-b border-white/5'
      }`}
    >
      {/* Gradient line accent at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#5025d1] to-transparent opacity-60" />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Section */}
          <Link to="/" className="flex flex-col group">
            <img
              src={logo}
              alt="IT Meta Solutions Logo"
              className="h-[36px] sm:h-[44px] max-w-full object-contain object-left transition-transform duration-300 group-hover:scale-105"
            />
            <div className="text-[9px] sm:text-[11px] text-zinc-400 tracking-wider mt-0.5 group-hover:text-zinc-300 transition-colors">
              Web • Social • Marketing
            </div>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center gap-1">
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
                      className="flex items-center gap-1 px-4 py-2 text-sm text-zinc-300 transition-all duration-200 hover:text-white rounded-lg hover:bg-white/5"
                    >
                      {n.label}
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                    </Link>

                    {/* Dropdown Menu */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 transition-all duration-300 ${
                        isServicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                      }`}
                    >
                      <div className="min-w-[220px] rounded-2xl border border-[#5025d1]/20 bg-black/95 backdrop-blur-xl p-2 shadow-2xl shadow-[#5025d1]/10">
                        {/* Dropdown gradient accent */}
                        <div className="absolute -top-px left-1/2 -translate-x-1/2 w-20 h-[2px] bg-gradient-to-r from-transparent via-[#5025d1] to-transparent" />
                        {serviceSubMenu.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-zinc-300 transition-all duration-200 hover:bg-gradient-to-r hover:from-[#5025d1]/20 hover:to-transparent hover:text-white group"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#5025d1]/50 group-hover:bg-[#ba55d3] transition-colors" />
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return n.href.startsWith("/") ? (
                <Link
                  key={n.href}
                  to={n.href}
                  className="px-4 py-2 text-sm text-zinc-300 transition-all duration-200 hover:text-white rounded-lg hover:bg-white/5"
                >
                  {n.label}
                </Link>
              ) : (
                <AnchorLink
                  key={n.href}
                  href={n.href}
                  className="px-4 py-2 text-sm text-zinc-300 transition-all duration-200 hover:text-white rounded-lg hover:bg-white/5"
                >
                  {n.label}
                </AnchorLink>
              );
            })}
          </nav>

          {/* Right Section - CTA Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* WhatsApp Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#25D366]/30 hover:scale-105"
              aria-label="Chat on WhatsApp"
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            {/* Get a Proposal Button - Desktop */}
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#5025d1] to-[#6d3de8] hover:from-[#5d32e0] hover:to-[#7a4af0] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#5025d1]/40 hover:scale-105"
            >
              Get a proposal
              <ArrowRight className="h-4 w-4" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex flex-col justify-center items-center w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors lg:hidden"
              aria-label="Open menu"
            >
              <div className="w-5 h-0.5 bg-white mb-1"></div>
              <div className="w-5 h-0.5 bg-white mb-1"></div>
              <div className="w-5 h-0.5 bg-white"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Off-canvas Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-[85%] max-w-[360px] bg-gradient-to-b from-black via-black/98 to-black/95 backdrop-blur-xl transform transition-transform duration-300 ease-out z-[120] overflow-y-auto ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Mobile menu gradient accent */}
        <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-[#5025d1] via-[#ba55d3]/50 to-transparent" />

        <div className="flex flex-col h-full p-6">
          {/* Close Button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="self-end mb-6 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Mobile Logo */}
          <div className="mb-8 pb-6 border-b border-white/10">
            <img
              src={logo}
              alt="IT Meta Solutions Logo"
              className="h-[40px] max-w-full object-contain object-left"
            />
            <div className="text-[10px] text-zinc-400 mt-1 tracking-wider">Web • Social • Marketing</div>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex flex-col space-y-1">
            {nav.map((n) => {
              if (n.label === "Services") {
                return (
                  <div key={n.href}>
                    <div className="flex items-center justify-between">
                      <Link
                        to={n.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex-1 py-3 text-lg text-zinc-200 transition-colors hover:text-white"
                      >
                        {n.label}
                      </Link>
                      <button
                        onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                        className="p-3 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                        aria-label="Toggle services submenu"
                      >
                        <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {/* Mobile Submenu */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-out ${
                        isMobileServicesOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="pl-4 ml-2 border-l-2 border-[#5025d1]/30 space-y-1 py-2">
                        {serviceSubMenu.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block py-2.5 px-3 text-base text-zinc-400 transition-all hover:text-white hover:bg-white/5 rounded-lg"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return n.href.startsWith("/") ? (
                <Link
                  key={n.href}
                  to={n.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="py-3 text-lg text-zinc-200 transition-colors hover:text-white"
                >
                  {n.label}
                </Link>
              ) : (
                <AnchorLink
                  key={n.href}
                  href={n.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="py-3 text-lg text-zinc-200 transition-colors hover:text-white"
                >
                  {n.label}
                </AnchorLink>
              );
            })}
          </nav>

          {/* Mobile CTA Section */}
          <div className="mt-auto pt-6 space-y-3 border-t border-white/10">
            {/* WhatsApp Button Mobile */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center gap-3 w-full rounded-xl bg-[#25D366] hover:bg-[#20BD5A] px-4 py-3.5 text-base font-semibold text-white transition-all duration-300"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>

            {/* Get Proposal Button Mobile */}
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-[#5025d1] to-[#6d3de8] px-4 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#5025d1]/40"
            >
              Get a proposal
              <ArrowRight className="h-4 w-4" />
            </Link>

            {/* Phone Number */}
            <a
              href="tel:+923271804037"
              className="flex items-center justify-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors py-2"
            >
              <Phone className="h-4 w-4" />
              +92 327 180 4037
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
