import { ArrowRight, BadgeCheck, Facebook, Globe, Instagram, Linkedin, Mail, MapPin, Phone, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/img/IT Meta Solutions Logo.webp";

export default function Footer({ year, nav, AnchorLink, Container }) {
  return (
      <footer className="border-t border-[#5025d1]/20" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url("/assets/img/ITMS Site BG Global.webp")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <Container className="py-10">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex flex-col">
                <img
                              src={logo}
                              alt="IT Meta Solutions Logo"
                              className="h-[50px] w-full max-w-full sm:max-w-[466px] object-contain object-left"
                            />
                <div className="text-xs text-zinc-300">Web • Social • Marketing</div>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-300">
                Modern websites, social media management, and marketing systems designed to look premium and perform.
              </p>
              <div className="mt-6 flex gap-4">
                <a href="https://www.linkedin.com/in/mehar-abdullah-khalid-375001331/" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://www.instagram.com/itmetasolutions.pvt.ltd/" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://www.facebook.com/itmetasolutions" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white">
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold text-white">Quick links</div>
              <div className="mt-3 grid gap-2 text-sm">
                {nav.map((n) => (
                  n.href.startsWith("/") ? (
                    <Link
                      key={n.href}
                      to={n.href}
                      className="text-zinc-300 hover:text-white"
                    >
                      {n.label}
                    </Link>
                  ) : (
                    <AnchorLink
                      key={n.href}
                      href={n.href}
                      className="text-zinc-300 hover:text-white"
                    >
                      {n.label}
                    </AnchorLink>
                  )
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold text-white">Let’s talk</div>
              <div className="mt-3 space-y-2 text-sm text-zinc-300">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  <span>info@itmetasolutions.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  <span>www.itmetasolutions.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  <span>+92 327 180 4037</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span className="text-xs">26A Office No F1, 1st Floor, PCSIR Society Block A, Ameer Chowk, Lahore</span>
                </div>
              </div>
              <div className="mt-5">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Start a project <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
            <div>© {year} IT Meta Solutions. All rights reserved.</div>
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-2">
                <BadgeCheck className="h-4 w-4" />
                Trusted delivery
              </span>
              <span className="inline-flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Fast & modern
              </span>
            </div>
          </div>
        </Container>
      </footer>
  );
}
