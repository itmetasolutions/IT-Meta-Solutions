import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  Target,
  Users,
  Globe,
  Megaphone,
  ShoppingCart,
  BarChart3,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import SeoContentFaq from "../../components/SeoContentFaq";

import adsJuly from "../../assets/img/Ekommart Ads SS July.png";
import adsAugust from "../../assets/img/Ekommart Ads SS August.png";
import adsSeptember from "../../assets/img/Ekommart Ads SS September.png";
import adsOctober from "../../assets/img/Ekommart Ads SS October.png";
import adsNovember from "../../assets/img/Ekommart Ads SS November.png";

const cx = (...c) => c.filter(Boolean).join(" ");

function Container({ children, className }) {
  return (
    <div className={cx("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

/* ================= Scroll Progress ================= */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5025d1] via-purple-400 to-emerald-400 origin-left z-50"
      style={{ scaleX }}
    />
  );
}

/* ================= Placeholder Screenshot ================= */

function ScreenshotPlaceholder({ label }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] h-[420px] flex items-center justify-center text-zinc-400 text-sm">
      {label}
    </div>
  );
}

/* ================= Stat Card ================= */

function Stat({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6">
      <div className="text-3xl font-bold text-white">{value}</div>
      <div className="text-sm text-zinc-400 mt-1">{title}</div>
    </div>
  );
}

/* ================= Timeline Card ================= */

function TimelineCard({ month, spend, result, extra, screenshot }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-7">
      <div className="flex items-center gap-2 text-sm text-emerald-300 mb-3">
        <Calendar className="h-4 w-4" />
        {month}
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <Stat title="Ad Spend" value={spend} />
        <Stat title="Primary Result" value={result} />
        {extra && <Stat title="Performance" value={extra} />}
      </div>

      {screenshot ? (
        <img
          src={screenshot}
          alt={`${month} Ads Result Screenshot`}
          className="rounded-3xl border border-white/10 w-full object-cover"
        />
      ) : (
        <ScreenshotPlaceholder label={`${month} Ads Result Screenshot`} />
      )}
    </div>
  );
}

const seoContent = {
  kicker: "Case Study",
  title: "Ecommerce Growth via Meta Ads and Conversion Optimization",
  subtitle:
    "Ekommart scaled to 3,300+ purchases with performance marketing, brand build, and a conversion-focused ecommerce experience.",
  paragraphs: [
    "We built a fast-loading store, refined product presentation, and scaled Meta Ads with ROAS optimization.",
    "This case study highlights the system behind predictable growth for ecommerce brands.",
  ],
  bullets: [
    "Meta Ads agency for ecommerce growth",
    "Performance marketing with ROAS optimization",
    "High-converting ecommerce website design",
    "Creative testing and scalable acquisition",
  ],
};

const seoFaqs = [
  {
    q: "How many purchases were generated?",
    a: "We achieved 3,300+ purchases within five months of scaling the campaign.",
  },
  {
    q: "What channels drove results?",
    a: "Meta Ads were the primary driver, supported by optimized landing pages and creative testing.",
  },
  {
    q: "Can you replicate this for other ecommerce brands?",
    a: "Yes. We tailor the acquisition system based on product, market, and budget.",
  },
];

/* ================= PAGE ================= */

export default function EkommartCaseStudy() {
  return (
    <>
      <Helmet>
        <title>Ekommart — Brand Build & Marketing Case Study | IT Meta Solutions</title>
        <meta
          name="description"
          content="Ekommart case study: 3,300+ purchases via Meta Ads, ecommerce optimization, and performance marketing."
        />
        <meta
          property="og:title"
          content="Ekommart — Brand Build & Marketing Case Study | IT Meta Solutions"
        />
        <meta
          property="og:description"
          content="Built Ekommart's e-commerce brand with a new website and performance marketing, generating 3,300+ purchases in 5 months."
        />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://itmetasolutions.com/case-study/ekommart" />
        <meta property="og:url" content="https://itmetasolutions.com/case-study/ekommart" />
        <meta property="og:image" content="https://itmetasolutions.com/favicon.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Ekommart — Brand Build & Marketing Case Study | IT Meta Solutions"
        />
        <meta
          name="twitter:description"
          content="Built Ekommart's e-commerce brand with a new website and performance marketing, generating 3,300+ purchases in 5 months."
        />
        <meta name="twitter:image" content="https://itmetasolutions.com/favicon.webp" />
      </Helmet>

      <div className="min-h-screen text-zinc-100 overflow-x-hidden">

        <ScrollProgress />

        {/* HERO */}

        <section className="pt-28 pb-16">
          <Container>

            <div className="max-w-4xl">

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs mb-6">
                <TrendingUp className="h-4 w-4" />
                Complete Brand Build + Performance Marketing
              </div>

              <h1 className="text-5xl font-bold tracking-tight mb-6">
                Scaling Ekommart into a High-Converting E-Commerce Brand
              </h1>

              <p className="text-lg text-zinc-300 leading-relaxed">
                IT Meta Solutions partnered with Ekommart to build the brand from the ground up —
                designing the store, crafting the identity, launching social channels,
                and executing performance marketing campaigns that generated thousands of purchases
                within months.
              </p>

              <div className="flex gap-4 mt-8 flex-wrap">
                <a className="px-6 py-3 rounded-2xl bg-white text-black font-semibold flex items-center gap-2">
                  Visit Website
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

            </div>

          </Container>
        </section>

        {/* WEBSITE BUILD */}

        <section className="py-16 border-t border-white/10">
          <Container>

            <h2 className="text-3xl font-semibold mb-6">
              Building the Foundation — WordPress Store
            </h2>

            <p className="text-zinc-300 max-w-3xl mb-10">
              The journey started in June 2024 with a fully customized WordPress
              e-commerce experience focused on speed, trust, and conversion.
            </p>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#5025d1]/20 to-emerald-400/10 p-10">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#5025d1] to-purple-600 flex items-center justify-center">
                    <Globe className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">Ekommart.shop</h3>
                  <p className="text-zinc-300 mb-4">
                    A modern, mobile-first e-commerce store built on WordPress + WooCommerce.
                    Optimized for fast loading, seamless checkout, and maximum conversions.
                  </p>
                  <a
                    href="https://ekommart.shop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-zinc-100 transition-colors"
                  >
                    Visit Live Store
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-10">

              <Stat title="Launch Date" value="June 2024" />
              <Stat title="Platform" value="WordPress + WooCommerce" />
              <Stat title="Goal" value="Conversion First UX" />

            </div>

          </Container>
        </section>

        {/* SOCIAL MEDIA */}

        <section className="py-16 border-t border-white/10">
          <Container>

            <h2 className="text-3xl font-semibold mb-6">
              Social Media Presence
            </h2>

            <p className="text-zinc-300 max-w-3xl mb-10">
              We built Ekommart's digital presence across Facebook and Instagram,
              focusing on trust-driven creatives, offer-led messaging,
              and performance-focused content.
            </p>

            <div className="grid md:grid-cols-2 gap-8">

              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/20 to-blue-400/10 p-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mb-6">
                  <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Facebook Business Page</h3>
                <p className="text-zinc-300 mb-6">
                  Engaging product showcases, customer testimonials, and promotional content
                  driving direct messages and website traffic.
                </p>
                <a
                  href="https://www.facebook.com/Ekommart.shop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                >
                  Follow on Facebook
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-pink-600/20 via-purple-500/15 to-orange-400/10 p-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 flex items-center justify-center mb-6">
                  <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Instagram Profile</h3>
                <p className="text-zinc-300 mb-6">
                  Visual storytelling with product reels, behind-the-scenes content,
                  and lifestyle imagery that resonates with the target audience.
                </p>
                <a
                  href="https://www.instagram.com/ekommart.shop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  Follow on Instagram
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

            </div>

          </Container>
        </section>

        {/* MARKETING TIMELINE */}

        <section className="py-16 border-t border-white/10">
          <Container>

            <h2 className="text-3xl font-semibold mb-10">
              Performance Marketing Journey
            </h2>

            <div className="space-y-10">

              <TimelineCard
                month="July — Test Messaging Campaign"
                spend="PKR 10.5K"
                result="661 Messages"
                extra="~16 PKR / Message | 300 Purchases"
                screenshot={adsJuly}
              />

              <TimelineCard
                month="August — Scaling Messaging"
                spend="PKR 22K"
                result="1,492 Messages"
                extra="14.7 PKR / Message | 400 Customers"
                screenshot={adsAugust}
              />

              <TimelineCard
                month="September — Sales Campaign Launch"
                spend="PKR 141K"
                result="787 Purchases"
                extra="179 PKR / Purchase"
                screenshot={adsSeptember}
              />

              <TimelineCard
                month="October — Aggressive Scale"
                spend="PKR 211K"
                result="1,258 Purchases"
                extra="168 PKR / Purchase"
                screenshot={adsOctober}
              />

              <TimelineCard
                month="November — Optimized Performance"
                spend="PKR 102K"
                result="618 Purchases"
                extra="164.5 PKR / Purchase"
                screenshot={adsNovember}
              />

            </div>

          </Container>
        </section>

        {/* RESULTS */}

        <section className="py-20 border-t border-white/10">
          <Container>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#5025d1]/20 to-emerald-400/10 p-10 text-center">

              <h2 className="text-3xl font-bold mb-6">
                The Outcome
              </h2>

              <p className="text-zinc-300 max-w-2xl mx-auto mb-10">
                Within months, Ekommart transformed from a newly launched store
                into a structured, revenue-generating e-commerce brand with predictable acquisition costs.
              </p>

              <div className="grid md:grid-cols-3 gap-6">

                <Stat title="Total Purchases" value="3,300+" />
                <Stat title="Best CPA" value="164 PKR" />
                <Stat title="Growth Phase" value="5 Months" />

              </div>

            </div>

          </Container>
        </section>

        <SeoContentFaq content={seoContent} faqs={seoFaqs} />

        {/* CTA */}

        <section className="py-20">
          <Container>

            <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-10 text-center">

              <h2 className="text-3xl font-bold mb-4">
                Want Results Like This?
              </h2>

              <p className="text-zinc-300 mb-8">
                Let IT Meta Solutions build your brand, launch your store,
                and scale your revenue with performance marketing.
              </p>

              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-white text-black font-semibold"
              >
                Start Your Growth Journey
                <ArrowRight className="h-4 w-4" />
              </a>

            </div>

          </Container>
        </section>

      </div>
    </>
  );
}

