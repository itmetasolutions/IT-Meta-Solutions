import { ArrowRight, ArrowUpRight, BadgeCheck, Facebook, Globe, Instagram, Linkedin, Mail, MapPin, Phone, Zap, Sparkles, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/img/IT Meta Solutions Logo.webp";

const services = [
  { label: "Web Development", href: "/web-development-expertise" },
  { label: "Salesforce", href: "/salesforce-expertise" },
  { label: "Digital Marketing", href: "/digital-marketing-expertise" },
  { label: "Social Media", href: "/social-media-expertise" },
  { label: "Graphic Design", href: "/graphic-designing-expertise" },
  { label: "Video Editing", href: "/video-editing-expertise" },
  { label: "Brand Building", href: "/brand-building-expertise" },
];

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/mehar-abdullah-khalid-375001331/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/itmetasolutions.pvt.ltd/", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/itmetasolutions", label: "Facebook" },
];

const WHATSAPP_NUMBER = "923271804037";
const WHATSAPP_MESSAGE = "Hi! I'm interested in your services.";

export default function Footer({ year, nav, AnchorLink, Container }) {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <footer className="relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />

      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#5025d1]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#ba55d3]/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#5025d1]/50 to-transparent" />

      <div className="relative">
        {/* CTA Section */}
        <Container className="py-12 sm:py-16">
          <div className="relative rounded-3xl border border-[#5025d1]/20 bg-gradient-to-br from-[#5025d1]/10 via-transparent to-[#ba55d3]/5 p-8 sm:p-12 overflow-hidden">
            {/* CTA Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#5025d1]/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#ba55d3]/15 rounded-full blur-[60px] pointer-events-none" />

            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Ready to transform your digital presence?
                </h3>
                <p className="text-zinc-400 max-w-xl">
                  Let's collaborate to create something extraordinary. Get in touch and let's discuss your project.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5025d1] to-[#6d3de8] hover:from-[#5d32e0] hover:to-[#7a4af0] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#5025d1]/40 hover:scale-105"
                >
                  Start a project
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#25D366]/30 hover:scale-105"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </Container>

        {/* Main Footer Content */}
        <Container className="pb-8">
          <div className="grid gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-12">
            {/* Brand Column */}
            <div className="lg:col-span-4">
              <Link to="/" className="inline-block group">
                <img
                  src={logo}
                  alt="IT Meta Solutions Logo"
                  className="h-[48px] max-w-full object-contain object-left transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <div className="text-xs text-zinc-500 tracking-wider mt-1 mb-4">Web • Social • Marketing</div>
              <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
                Modern websites, social media management, and marketing systems designed to look premium and perform at scale.
              </p>

              {/* Social Links */}
              <div className="mt-6 flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-[#5025d1]/20 hover:border-[#5025d1]/30 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-gradient-to-b from-[#5025d1] to-[#ba55d3] rounded-full" />
                Quick Links
              </h4>
              <nav className="grid gap-2.5">
                {nav.map((n) => (
                  n.href.startsWith("/") ? (
                    <Link
                      key={n.href}
                      to={n.href}
                      className="text-sm text-zinc-400 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-[#5025d1] transition-all duration-200" />
                      {n.label}
                    </Link>
                  ) : (
                    <AnchorLink
                      key={n.href}
                      href={n.href}
                      className="text-sm text-zinc-400 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-[#5025d1] transition-all duration-200" />
                      {n.label}
                    </AnchorLink>
                  )
                ))}
              </nav>
            </div>

            {/* Services */}
            <div className="lg:col-span-3">
              <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-gradient-to-b from-[#5025d1] to-[#ba55d3] rounded-full" />
                Services
              </h4>
              <nav className="grid gap-2.5">
                {services.map((service) => (
                  <Link
                    key={service.href}
                    to={service.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-[#ba55d3] transition-all duration-200" />
                    {service.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-3">
              <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-gradient-to-b from-[#5025d1] to-[#ba55d3] rounded-full" />
                Get in Touch
              </h4>
              <div className="space-y-3">
                <a
                  href="mailto:info@itmetasolutions.com"
                  className="flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors group"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 group-hover:bg-[#5025d1]/20 transition-colors">
                    <Mail className="h-4 w-4" />
                  </span>
                  info@itmetasolutions.com
                </a>
                <a
                  href="https://www.itmetasolutions.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors group"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 group-hover:bg-[#5025d1]/20 transition-colors">
                    <Globe className="h-4 w-4" />
                  </span>
                  www.itmetasolutions.com
                </a>
                <a
                  href="tel:+923271804037"
                  className="flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors group"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 group-hover:bg-[#5025d1]/20 transition-colors">
                    <Phone className="h-4 w-4" />
                  </span>
                  +92 327 180 4037
                </a>
                <div className="flex items-start gap-3 text-sm text-zinc-400">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 flex-shrink-0">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span className="text-xs leading-relaxed">
                    26A Office No F1, 1st Floor, PCSIR Society Block A, Ameer Chowk, Lahore
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* Bottom Bar */}
        <div className="border-t border-white/5">
          <Container className="py-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Copyright */}
              <div className="text-xs text-zinc-500">
                © {year} IT Meta Solutions. All rights reserved.
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <span className="inline-flex items-center gap-2 text-xs text-zinc-400">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#5025d1]/10">
                    <BadgeCheck className="h-3.5 w-3.5 text-[#5025d1]" />
                  </span>
                  Trusted Delivery
                </span>
                <span className="inline-flex items-center gap-2 text-xs text-zinc-400">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#ba55d3]/10">
                    <Zap className="h-3.5 w-3.5 text-[#ba55d3]" />
                  </span>
                  Fast & Modern
                </span>
                <span className="inline-flex items-center gap-2 text-xs text-zinc-400">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/10">
                    <Shield className="h-3.5 w-3.5 text-emerald-500" />
                  </span>
                  Secure Solutions
                </span>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </footer>
  );
}
