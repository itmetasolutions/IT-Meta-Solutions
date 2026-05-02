import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Home, Search, Sparkles, AlertTriangle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SeoContentFaq from "../../components/SeoContentFaq";
import SubpageVisualLayer from "../../components/SubpageVisualLayer";

const cx = (...c) => c.filter(Boolean).join(" ");

function Container({ children, className }) {
  return (
    <div className={cx("mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}

function GradientBlob({ className, color = "rgba(80,37,209,0.55)" }) {
  return (
    <div
      aria-hidden
      className={cx("pointer-events-none absolute -z-10 blur-3xl opacity-40", className)}
      style={{ background: `radial-gradient(closest-side, ${color}, rgba(80,37,209,0))` }}
    />
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-200">
      <Sparkles className="h-4 w-4 opacity-70" />
      {children}
    </span>
  );
}

function Divider() {
  return <div className="my-8 sm:my-12 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />;
}

const seoContent = {
  kicker: "Page Not Found",
  title: "Salesforce, Ecommerce, and Performance Marketing",
  subtitle:
    "Looking for Salesforce implementation, LWC development, Experience Cloud portals, or performance-optimized Shopify builds?",
  paragraphs: [
    "Explore our services and case studies to find the right solution for CRM automation, ecommerce conversion, and Meta Ads growth.",
  ],
  bullets: [
    "Salesforce implementation partners and automation experts",
    "Experience Cloud portal development and LWC components",
    "Shopify and WooCommerce conversion optimization",
    "Meta Ads strategy with ROAS optimization",
  ],
};

const seoFaqs = [
  {
    q: "Where can I see Salesforce case studies?",
    a: "Visit our Work page for Salesforce Experience Cloud, Service Cloud, and automation case studies.",
  },
  {
    q: "Do you build high-converting ecommerce stores?",
    a: "Yes. We build performance-optimized Shopify and WooCommerce stores with CRO and custom functionality.",
  },
  {
    q: "How can I contact your team?",
    a: "Go to the Contact page to book a consultation or chat on WhatsApp.",
  },
];

export default function NotFoundPage() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const location = useLocation();

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | IT Meta Solutions</title>
        <meta name="description" content="Page not found. Explore Salesforce, ecommerce, and performance marketing services from IT Meta Solutions." />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="404 - Page Not Found | IT Meta Solutions" />
        <meta property="og:description" content="The page you're looking for doesn't exist. Return to IT Meta Solutions homepage or explore our services, portfolio, and contact information." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://itmetasolutions.com/favicon.webp" />
        <meta name="twitter:image" content="https://itmetasolutions.com/favicon.webp" />
      </Helmet>

      <div className="itms-subpage relative min-h-screen overflow-hidden text-zinc-100">
        <SubpageVisualLayer />

        <Container className="py-24 sm:py-32">
        <motion.div
          initial={{ y: 14 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="flex flex-wrap items-center gap-3">
            <Pill>Page not found</Pill>
            <span className="text-xs text-zinc-400">Error 404</span>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr,0.8fr] lg:items-start">
            {/* Left */}
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                This page doesn’t exist.
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                The link might be broken, or the page may have been moved. If you think this is an error,
                go back to the homepage or contact us.
              </p>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <div className="flex items-start gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5">
                    <Search className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white">Tried URL</div>
                    <div className="mt-1 break-words text-sm text-zinc-300">
                      {location?.pathname || "/"}
                    </div>
                    <div className="mt-3 text-xs text-zinc-400">
                      If you pasted this manually, check spelling.
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#5025d1] px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
                >
                  Back to home <Home className="h-4 w-4" />
                </Link>

                <Link
                  to="/work"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  View work <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Contact <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <Divider />

              <div className="text-xs text-zinc-500">© {year} • IT Meta Solutions</div>
            </div>

            {/* Right */}
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-6"
            >
              <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-[#5025d1]/20 blur-3xl" />
              <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />

              <div className="relative">
                <div className="flex items-start gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Quick links</div>
                    <div className="mt-1 text-sm text-zinc-300">
                      Try one of these pages:
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  {[
                    { to: "/services", label: "Services" },
                    { to: "/process", label: "Process" },
                    { to: "/about", label: "About us" },
                    { to: "/work", label: "Work / Case studies" },
                    { to: "/contact", label: "Contact" },
                  ].map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200 hover:bg-white/10"
                    >
                      <span>{l.label}</span>
                      <ArrowRight className="h-4 w-4 opacity-80 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
        <SeoContentFaq content={seoContent} faqs={seoFaqs} />
      </div>
    </>
  );
}
