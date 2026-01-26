import { ArrowRight, ChevronDown, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/IT Meta Solutions Logo.webp";

const serviceSubMenu = [
  { label: "Web Development", href: "/web-development-expertise" },
  { label: "Salesforce", href: "/salesforce-expertise" },
  { label: "Digital Marketing", href: "/digital-marketing-expertise" },
  { label: "Social Media", href: "/social-media-expertise" },
  { label: "Graphic Design", href: "/graphic-designing-expertise" },
  { label: "Video Editing", href: "/video-editing-expertise" },
  { label: "Brand Building", href: "/brand-building-expertise" },
];

export default function Header({ nav, AnchorLink }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header id="site-header" className="fixed top-0 left-0 right-0 z-[9998] border-b border-[#5025d1]/20" style={{ willChange: 'transform', transform: 'translateZ(0)', backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("/assets/img/ITMS Site BG Global.webp")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-[auto,auto] items-center justify-between">
          <div className="flex flex-col">
            <img
              src={logo}
              alt="IT Meta Solutions Logo"
              className="h-[40px] sm:h-[50px] max-w-full object-contain object-left"
            />
            <div className="text-[10px] sm:text-xs text-zinc-300">Web • Social • Marketing</div>
          </div>

          <Link
            to="/contact"
            className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10 md:inline-flex mr-4"
          >
            Get a proposal <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col justify-center items-center w-8 h-8 space-y-1 md:hidden"
            aria-label="Open menu"
          >
            <div className="w-5 h-0.5 bg-white"></div>
            <div className="w-5 h-0.5 bg-white"></div>
            <div className="w-5 h-0.5 bg-white"></div>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 md:flex">
          {nav.map((n) => {
            // Services with dropdown
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
                    className="flex items-center gap-1 text-sm text-zinc-300 transition-colors hover:text-white"
                  >
                    {n.label}
                    <ChevronDown className={`h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                  </Link>

                  {/* Dropdown Menu */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 transition-all duration-200 ${
                      isServicesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                  >
                    <div className="min-w-[200px] rounded-xl border border-white/10 bg-black/95 backdrop-blur-md p-2 shadow-xl">
                      {serviceSubMenu.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="block rounded-lg px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            // Regular nav items
            return n.href.startsWith("/") ? (
              <Link
                key={n.href}
                to={n.href}
                className="text-sm text-zinc-300 transition-colors hover:text-white"
              >
                {n.label}
              </Link>
            ) : (
              <AnchorLink
                key={n.href}
                href={n.href}
                className="text-sm text-zinc-300 transition-colors hover:text-white"
              >
                {n.label}
              </AnchorLink>
            );
          })}
        </nav>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110]"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Off-canvas Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-4/5 bg-black/90 backdrop-blur-md transform transition-transform duration-300 z-[120] overflow-y-auto ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="self-end mb-8 text-white"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
          <nav className="flex flex-col space-y-4">
            {nav.map((n) => {
              // Services with expandable submenu
              if (n.label === "Services") {
                return (
                  <div key={n.href}>
                    <div className="flex items-center justify-between">
                      <Link
                        to={n.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-lg text-zinc-300 transition-colors hover:text-white"
                      >
                        {n.label}
                      </Link>
                      <button
                        onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                        className="p-2 text-zinc-300 hover:text-white"
                        aria-label="Toggle services submenu"
                      >
                        <ChevronDown className={`h-5 w-5 transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {/* Mobile Submenu */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isMobileServicesOpen ? 'max-h-[500px] mt-2' : 'max-h-0'
                      }`}
                    >
                      <div className="pl-4 border-l border-white/10 space-y-3">
                        {serviceSubMenu.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block text-base text-zinc-400 transition-colors hover:text-white"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              // Regular nav items
              return n.href.startsWith("/") ? (
                <Link
                  key={n.href}
                  to={n.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg text-zinc-300 transition-colors hover:text-white"
                >
                  {n.label}
                </Link>
              ) : (
                <AnchorLink
                  key={n.href}
                  href={n.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg text-zinc-300 transition-colors hover:text-white"
                >
                  {n.label}
                </AnchorLink>
              );
            })}
          </nav>
          <div className="mt-auto pt-6">
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Get a proposal <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
