import { ArrowRight, Globe, MousePointerClick } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header({ nav, AnchorLink }) {
  return (
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-[#5025d1]/20 bg-gradient-to-r from-black to-[#5025d1]/20 backdrop-blur-md" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">IT Meta Solutions</div>
                <div className="text-xs text-zinc-300">Web • Social • Marketing</div>
              </div>
            </div>

            <nav className="hidden items-center gap-6 md:flex">
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

            <Link
              to="/contact"
              className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 md:inline-flex"
            >
              Get a proposal <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>
  );
}
