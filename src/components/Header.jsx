import { ArrowRight, MousePointerClick, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/IT Meta Solutions Logo.webp";

export default function Header({ nav, AnchorLink }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-[#5025d1]/20 bg-gradient-to-r from-black to-[#5025d1]/20 backdrop-blur-md" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
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
        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 md:flex">
          {nav.map((n) => (
            n.href.startsWith("/") ? (
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
            )
          ))}
        </nav>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Off-canvas Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-4/5 bg-black/90 backdrop-blur-md transform transition-transform duration-300 z-50 ${
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
          <nav className="flex flex-col space-y-6">
            {nav.map((n) => (
              n.href.startsWith("/") ? (
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
              )
            ))}
          </nav>
          <div className="mt-auto">
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
