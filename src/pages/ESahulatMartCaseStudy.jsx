import React, { useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  ChevronRight,
  CheckCircle2,
  FileSearch,
  Gauge,
  Globe,
  Images,
  Instagram,
  Landmark,
  LayoutGrid,
  Megaphone,
  MessageSquareText,
  MousePointerClick,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Target,
  Truck,
  Users,
  Wallet,
  CalendarDays,
  Facebook,
  Percent,
  PackageCheck,
} from "lucide-react";

/**
 * E Sahulat Mart — Complete Brand Build (Tabbed)
 * Tabs:
 *  - Website (E-commerce Foundation)
 *  - Meta Ads (Sales Growth)
 *  - Social Media (IG/FB)
 *
 * Matches your reference theme:
 * - Dark, glass cards, gradients
 * - Scroll progress
 * - Parallax hero
 * - Reveal animations
 * - Sticky section subnav
 */

const cx = (...c) => c.filter(Boolean).join(" ");

const tabs = [
  { key: "website", label: "Website (E-commerce)", icon: LayoutGrid },
  { key: "paid", label: "Meta Ads (Sales Growth)", icon: Megaphone },
  { key: "social", label: "Social Media (IG/FB)", icon: Instagram },
];

const inPageNav = [
  { label: "Overview", href: "#overview" },
  { label: "Tabs", href: "#tabs" },
  { label: "Screenshots", href: "#screens" },
  { label: "Results", href: "#results" },
];

function Container({ children, className }) {
  return (
    <div className={cx("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

function AnchorLink({ href, children, className }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        if (href?.startsWith?.("#")) {
          e.preventDefault();
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }}
      className={className}
    >
      {children}
    </a>
  );
}

function GradientBlob({ className }) {
  return (
    <div
      aria-hidden
      className={cx(
        "pointer-events-none absolute -z-10 blur-3xl opacity-40",
        "bg-[radial-gradient(closest-side,rgba(99,102,241,0.6),rgba(99,102,241,0))]",
        className
      )}
    />
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 18, mass: 0.5 });
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-indigo-500 via-emerald-400 to-fuchsia-500"
      style={{ scaleX: w }}
    />
  );
}

function Reveal({ children, delay = 0, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function Pill({ icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
      {Icon ? <Icon className="h-3.5 w-3.5 opacity-80" /> : null}
      {children}
    </span>
  );
}

function SectionTitle({ kicker, title, desc, align = "left" }) {
  return (
    <div className={cx("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
        <Sparkles className="h-3.5 w-3.5" />
        {kicker}
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">{desc}</p>
    </div>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 h-full flex flex-col justify-center">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-2xl font-semibold text-white">{value}</div>
          <div className="text-sm text-zinc-300">{label}</div>
        </div>
      </div>
    </div>
  );
}

function Card({ icon: Icon, title, desc, bullets }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-6 pb-8 h-full flex">
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />
      </div>

      <div className="relative flex h-full flex-col">
        <div className="mb-4 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>

        <p className="text-sm leading-relaxed text-zinc-300">{desc}</p>

        {bullets?.length ? (
          <ul className="mt-5 space-y-2 text-sm text-zinc-200">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-emerald-300" />
                <span className="opacity-90">{b}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto pt-4" />
      </div>
    </div>
  );
}

function Divider() {
  return <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />;
}

function StickySubnav() {
  return (
    <div className="sticky top-[72px] z-40 border-b border-white/10 bg-zinc-950/60 backdrop-blur">
      <Container className="py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-300">
            <Landmark className="h-4 w-4" />
            ESahulat Mart — Brand Build
          </div>

          <div className="flex flex-wrap items-center gap-2 justify-end">
            {inPageNav.map((n) => (
              <AnchorLink
                key={n.href}
                href={n.href}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200 hover:bg-white/10"
              >
                {n.label}
              </AnchorLink>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

function Tabs({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((t) => {
        const Icon = t.icon;
        const isActive = active === t.key;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            className={cx(
              "inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm transition",
              isActive
                ? "border-white/20 bg-white text-zinc-950"
                : "border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10"
            )}
          >
            <Icon className={cx("h-4 w-4", isActive ? "" : "opacity-80")} />
            {t.label}
            {isActive ? <CheckCircle2 className="h-4 w-4" /> : null}
          </button>
        );
      })}
    </div>
  );
}

function Shot({ title, size, comment }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5">
          <Images className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-white">{title}</div>
          <div className="mt-1 text-xs text-zinc-400">{size}</div>
          <div className="mt-2 text-sm text-zinc-300">{comment}</div>
          <div className="mt-4 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-6 text-xs text-zinc-400">
            Screenshot placeholder — drop image here
          </div>
        </div>
      </div>
    </div>
  );
}

function TabPanel({ active }) {
  if (active === "website") {
    return (
      <div className="grid gap-6">
        <Reveal>
          <SectionTitle
            kicker="Website (E-commerce Foundation)"
            title="Fast shopping experience built for conversion"
            desc="The website was built as a sales-focused e-commerce foundation: clean product discovery, clear pricing and offers, and a smooth cart → checkout flow — optimized for mobile buyers coming from Meta ads."
          />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          <Reveal delay={0.05}>
            <Card
              icon={LayoutGrid}
              title="Store structure"
              desc="Simple navigation that makes it easy to find essentials and purchase quickly."
              bullets={[
                "Home (offers + featured products)",
                "Product categories",
                "Product detail pages",
                "Cart & checkout flow",
                "Contact & support pages",
              ]}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <Card
              icon={ShoppingCart}
              title="Conversion UX"
              desc="Clear CTAs and friction-reduction elements designed to improve checkout completion."
              bullets={["Buy Now", "Add to Cart", "Limited Stock", "Simple UX to reduce checkout friction"]}
            />
          </Reveal>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Reveal delay={0.05}>
            <Card
              icon={Gauge}
              title="Mobile-first shopping"
              desc="Majority of buyers come from mobile — layouts are optimized for fast browsing and checkout."
              bullets={["Mobile-first design", "Readable layout", "Fast product browsing", "Quick checkout flow"]}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <Card
              icon={ShieldCheck}
              title="Trust for first-time buyers"
              desc="Built-in trust signals to reduce hesitation and increase purchase confidence."
              bullets={["Clear pricing", "Support/contact access", "Offer clarity", "First-time buyer friendly UX"]}
            />
          </Reveal>

          <Reveal delay={0.15}>
            <Card
              icon={FileSearch}
              title="Ads-ready checkout path"
              desc="Designed as a landing hub for ads traffic → product → checkout."
              bullets={["Direct product paths", "Low distraction pages", "Fast add-to-cart", "Checkout-focused flow"]}
            />
          </Reveal>
        </div>

        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.06] to-white/[0.03] p-6">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <div className="text-sm font-semibold text-white">Website goals</div>
                <div className="mt-1 text-sm text-zinc-300">
                  Provide a fast buying experience, clearly show products/prices/offers, support direct ads traffic, and build
                  trust for first-time buyers.
                </div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
                <ChevronRight className="h-4 w-4" />
                Browse → cart → checkout
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    );
  }

  if (active === "paid") {
    return (
      <div className="grid gap-6">
        <Reveal>
          <SectionTitle
            kicker="Meta Ads (Sales Growth)"
            title="Purchase-optimized funnel with controlled daily spend"
            desc="We built a sales-focused Meta Ads system with pixel tracking, conversion events, product retargeting, and purchase campaigns — enabling consistent daily orders and scalable ROAS without aggressive ad spend."
          />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          <Reveal delay={0.05}>
            <Card
              icon={ShieldCheck}
              title="Meta + pixel setup"
              desc="Tracking and conversion foundations for purchase optimization."
              bullets={[
                "Meta Business Manager",
                "Ad account setup",
                "Pixel tracking",
                "Conversion events (ViewContent, AddToCart, Purchase)",
                "Campaign budget optimization (CBO)",
              ]}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <Card
              icon={Target}
              title="Product targeting"
              desc="Buyer-intent audiences and retargeting to increase purchase volume."
              bullets={["Product-based targeting", "Website visitors retargeting", "Add-to-cart retargeting", "Engagers retargeting"]}
            />
          </Reveal>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Reveal delay={0.05}>
            <Card
              icon={Megaphone}
              title="Product awareness ads"
              desc="Short videos + images with offer hooks for fast product discovery."
              bullets={["Short product videos", "Offer-based hooks", "Price-focused creatives", "Simple product messaging"]}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <Card
              icon={Users}
              title="Retargeting campaigns"
              desc="Warm audiences nurtured back to product pages and checkout."
              bullets={["Website visitors", "Add-to-cart users", "IG/FB engagers", "Offer reminders"]}
            />
          </Reveal>

          <Reveal delay={0.15}>
            <Card
              icon={MousePointerClick}
              title="Purchase campaigns"
              desc="Conversion-optimized ads designed for consistent sales."
              bullets={["Purchase objective", "Limited-time offers", "Clear “Order Now” CTA", "Checkout-driven creatives"]}
            />
          </Reveal>
        </div>

        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-emerald-400/10 p-6">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <div className="text-sm font-semibold text-white">Performance snapshot (~3 months)</div>
                <div className="mt-1 text-sm text-zinc-300">
                  Daily spend: <span className="text-white font-semibold">800–1,200 PKR</span> • Duration:{" "}
                  <span className="text-white font-semibold">~3 months</span> • Cost per sale:{" "}
                  <span className="text-white font-semibold">~250–300 PKR</span> • Total sales:{" "}
                  <span className="text-white font-semibold">2+ lac PKR</span> with consistent daily orders and scalable ROAS.
                </div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950">
                <PackageCheck className="h-4 w-4" />
                Profitable sales
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          <Reveal delay={0.05}>
            <Card
              icon={MessageSquareText}
              title="Creative & copy system"
              desc="Simple, price-driven messaging built for local Pakistani buyers."
              bullets={[
                "Urdu + English mixed copy",
                "Clear pricing & offers",
                "Trust signals (COD, delivery)",
                "Real product visuals",
                "Strong CTAs (Order Now / Limited Offer)",
              ]}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <Card
              icon={BarChart3}
              title="Optimization loop"
              desc="A repeatable method to improve ROAS while keeping spend controlled."
              bullets={[
                "Budget scaling without spikes",
                "Retargeting for lower CPA",
                "Best-seller focus",
                "Creative rotation",
              ]}
            />
          </Reveal>
        </div>
      </div>
    );
  }

  // social
  return (
    <div className="grid gap-6">
      <Reveal>
        <SectionTitle
          kicker="Social Media (IG/FB)"
          title="Trust-building social presence for everyday essentials"
          desc="We optimized profiles, standardized branding, and built a content system focused on products, offers, and proof — aligning organic content with paid ads for better purchase confidence."
        />
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2">
        <Reveal delay={0.05}>
          <Card
            icon={Instagram}
            title="Platforms"
            desc="Daily essentials audiences across high-reach channels."
            bullets={["Instagram", "Facebook", "Local buyer trust content"]}
          />
        </Reveal>

        <Reveal delay={0.1}>
          <Card
            icon={ShieldCheck}
            title="Brand setup"
            desc="Optimized profiles and consistent visuals built for trust."
            bullets={["Bio + category", "Contact buttons", "Consistent colors", "Product visual style"]}
          />
        </Reveal>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Reveal delay={0.05}>
          <Card
            icon={CalendarDays}
            title="Content pillars"
            desc="Content designed to sell + build proof."
            bullets={["Product showcases", "Offers & discounts", "Order dispatch / trust posts", "Reels for awareness"]}
          />
        </Reveal>

        <Reveal delay={0.1}>
          <Card
            icon={ScrollText}
            title="Messaging"
            desc="Simple language that highlights value and delivery confidence."
            bullets={["Price-driven copy", "COD availability", "Fast delivery", "Clear CTAs (Order Now)"]}
          />
        </Reveal>

        <Reveal delay={0.15}>
          <Card
            icon={Percent}
            title="Highlights"
            desc="Quick access to offers, proof, and shopping categories."
            bullets={["Best Sellers", "Deals", "New Arrivals", "Customer Orders"]}
          />
        </Reveal>
      </div>

      <Reveal>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.06] to-white/[0.03] p-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold text-white">Why this works</div>
              <div className="mt-1 text-sm text-zinc-300">
                Trust content (orders + dispatch) + offer-led creatives makes cold audiences warmer — improving purchase rates
                and reducing cost per sale over time.
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
              <ChevronRight className="h-4 w-4" />
              Organic → purchase lift
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default function ESahulatMartCaseStudy() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [activeTab, setActiveTab] = useState("website");

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, -60]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.88]);
  const heroRef = useRef(null);

  return (
    <div className="min-h-screen text-zinc-100 mb-16">
      <ScrollProgress />

      {/* Background accents */}
      <GradientBlob className="left-[-120px] top-[-120px] h-[520px] w-[520px]" />
      <GradientBlob className="right-[-160px] top-[220px] h-[520px] w-[520px] bg-[radial-gradient(closest-side,rgba(16,185,129,0.55),rgba(16,185,129,0))]" />

      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden">
        <Container className="pb-10 pt-16 sm:pb-16 sm:pt-24">
          <motion.div style={{ y: heroY, opacity: heroOpacity }}>
            <Reveal>
              <div className="flex flex-wrap items-center gap-2">
                <Pill icon={ShoppingBag}>E-commerce</Pill>
                <Pill icon={Globe}>Pakistan</Pill>
                <Pill icon={LayoutGrid}>Website</Pill>
                <Pill icon={Instagram}>Social</Pill>
                <Pill icon={Megaphone}>Meta Ads</Pill>
                <Pill icon={ShoppingCart}>Sales growth</Pill>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                E Sahulat Mart — complete e-commerce brand build for daily sales growth
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                A Pakistan-based general store e-commerce brand for daily essentials — built with a conversion-focused website,
                trust-first social presence, and a purchase-optimized Meta Ads system to drive consistent orders at low cost.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-3 sm:grid-cols-4">
              <Reveal delay={0.1}>
                <Stat icon={LayoutGrid} label="Foundation" value="E-commerce website" />
              </Reveal>
              <Reveal delay={0.15}>
                <Stat icon={Megaphone} label="Daily spend" value="800–1,200 PKR" />
              </Reveal>
              <Reveal delay={0.2}>
                <Stat icon={Target} label="Cost per sale" value="250–300 PKR" />
              </Reveal>
              <Reveal delay={0.25}>
                <Stat icon={Wallet} label="Sales generated" value="2+ lac PKR" />
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.03] p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-2xl">
                    <div className="text-sm font-semibold text-white">Live website</div>
                    <div className="mt-1 text-sm text-zinc-300">
                      Use this page as your portfolio “Complete Brand Build” case study for E Sahulat Mart.
                    </div>
                  </div>
                  <a
                    href="https://esahulatmart.pk"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:opacity-90"
                  >
                    Visit Website <ArrowRight className="h-4 w-4" />
                  </a>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {[
                    { icon: ShoppingCart, title: "Checkout flow", desc: "Fast add-to-cart and smooth cart → checkout UX." },
                    { icon: Truck, title: "Trust signals", desc: "COD + delivery confidence cues for first-time buyers." },
                    { icon: BarChart3, title: "Purchase funnel", desc: "Pixel events + retargeting + purchase campaigns." },
                  ].map((b) => (
                    <div
                      key={b.title}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 h-full flex flex-col justify-center"
                    >
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5">
                          <b.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{b.title}</div>
                          <div className="mt-1 text-sm text-zinc-300">{b.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </motion.div>
        </Container>
      </section>

      {/* Sticky anchors */}
      <StickySubnav />

      <Container>
        <Divider />
      </Container>

      {/* Overview */}
      <section id="overview" className="scroll-mt-24">
        <Container className="pb-16">
          <Reveal>
            <SectionTitle
              kicker="Brand overview"
              title="A sales-driven daily essentials store built for consistent orders"
              desc="E Sahulat Mart offers household essentials and daily-use products through a simple, affordable online shopping experience. This build focused on conversion UX, trust on social, and a purchase-optimized Meta Ads system that scales sales steadily on controlled spend."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <Reveal delay={0.05}>
              <Card
                icon={ShoppingBag}
                title="Industry"
                desc="E-commerce • General Store • Daily Essentials"
                bullets={["Daily-use products", "Price-sensitive market", "Trust-first buying behavior"]}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Card
                icon={LayoutGrid}
                title="Scope"
                desc="Website • Social • Meta Ads • Sales Growth"
                bullets={["E-commerce website", "IG/FB trust content", "Pixel + conversion events", "Purchase funnel"]}
              />
            </Reveal>
            <Reveal delay={0.15}>
              <Card
                icon={ShieldCheck}
                title="Objectives"
                desc="Conversion + trust + profitable sales"
                bullets={[
                  "Conversion-focused store",
                  "Trust on Instagram & Facebook",
                  "Performance Meta Ads system",
                  "Low cost per purchase",
                ]}
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <Container>
        <Divider />
      </Container>

      {/* Tabs */}
      <section id="tabs" className="scroll-mt-24">
        <Container className="pb-16">
          <Reveal>
            <SectionTitle
              kicker="Brand build sections"
              title="Everything organized into three deliverables"
              desc="Switch between Website (E-commerce), Meta Ads (Sales Growth), and Social Media — each tab shows the structure, features, and outcomes."
            />
          </Reveal>

          <div className="mt-8">
            <Reveal delay={0.05}>
              <Tabs active={activeTab} onChange={setActiveTab} />
            </Reveal>
          </div>

          <div className="mt-8">
            <TabPanel active={activeTab} />
          </div>
        </Container>
      </section>

      <Container>
        <Divider />
      </Container>

      {/* Screenshots */}
      <section id="screens" className="scroll-mt-24">
        <Container className="pb-16">
          <Reveal>
            <SectionTitle
              kicker="Screenshot placeholders"
              title="Drop your proof here for a high-trust portfolio"
              desc="These placeholders match your requested sizes so you can swap images in later (website, product page, mobile, social, and Ads Manager)."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <Reveal delay={0.05}>
              <Shot
                title="[WEBSITE HOME PAGE]"
                size="1920 × 1080 (Desktop)"
                comment="Offers, featured products & trust messaging"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Shot
                title="[PRODUCT DETAIL PAGE]"
                size="1440 × 900"
                comment="Product images, pricing & buy CTA"
              />
            </Reveal>
            <Reveal delay={0.15}>
              <Shot
                title="[MOBILE SHOPPING VIEW]"
                size="390 × 844"
                comment="Mobile-first product browsing & checkout"
              />
            </Reveal>
            <Reveal delay={0.2}>
              <Shot
                title="[INSTAGRAM PROFILE]"
                size="1080 × 1080"
                comment="Bio, highlights & product grid"
              />
            </Reveal>
            <Reveal delay={0.25}>
              <Shot
                title="[PRODUCT REELS]"
                size="1080 × 1920"
                comment="Short reels showing product usage & offers"
              />
            </Reveal>
            <Reveal delay={0.3}>
              <Shot
                title="[FACEBOOK PAGE]"
                size="1200 × 630"
                comment="Page layout & recent posts"
              />
            </Reveal>
            <Reveal delay={0.35}>
              <Shot
                title="[ADS MANAGER DASHBOARD]"
                size="1920 × 1080"
                comment="Spend, purchases & ROAS overview"
              />
            </Reveal>
            <Reveal delay={0.4}>
              <Shot
                title="[PURCHASE EVENTS]"
                size="1440 × 900"
                comment="Conversion tracking & cost per sale"
              />
            </Reveal>
            <Reveal delay={0.45}>
              <Shot
                title="[PRODUCT AD PREVIEW]"
                size="1080 × 1920"
                comment="Sales-focused product creative"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <Container>
        <Divider />
      </Container>

      {/* Results */}
      <section id="results" className="scroll-mt-24">
        <Container>
          <Reveal>
            <SectionTitle
              kicker="Results"
              title="2+ lac PKR in sales with a sustainable daily spend model"
              desc="A complete e-commerce brand presence (website + social + ads) with purchase tracking, retargeting, and consistent daily orders — achieving profitable cost per sale on controlled budgets."
              align="center"
            />
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            <Reveal delay={0.05}>
              <Stat icon={Wallet} label="Sales generated" value="2+ lac PKR" />
            </Reveal>
            <Reveal delay={0.1}>
              <Stat icon={CalendarDays} label="Campaign duration" value="~3 months" />
            </Reveal>
            <Reveal delay={0.15}>
              <Stat icon={Target} label="Cost per sale" value="250–300 PKR" />
            </Reveal>
            <Reveal delay={0.2}>
              <Stat icon={Megaphone} label="Daily ad spend" value="800–1,200 PKR" />
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-emerald-400/10 p-6">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div className="max-w-2xl">
                  <div className="text-sm font-semibold text-white">Scalable next steps</div>
                  <div className="mt-1 text-sm text-zinc-300">
                    Scale by expanding best-seller campaigns, adding bundle offers, and increasing retargeting coverage — while
                    keeping budgets controlled to protect ROAS.
                  </div>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:opacity-90"
                >
                  Request a proposal <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 text-center text-xs text-zinc-500">© {year} • E Sahulat Mart brand build</div>
        </Container>
      </section>
    </div>
  );
}
