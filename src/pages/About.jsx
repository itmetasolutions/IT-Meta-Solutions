import React, { useEffect, useMemo, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Globe2,
  Handshake,
  HeartHandshake,
  Instagram,
  Landmark,
  Mail,
  MapPin,
  Megaphone,
  Phone,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wand2,
  Code2,
  Search,
  Palette,
  TrendingUp,
  BriefcaseBusiness,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

// Import team member images
import abdullahKhalidImg from "../assets/img/Abdullah Khalid.webp";
import moeezUlHaqImg from "../assets/img/Moeez Ul Haq.webp";
import danishAhmadImg from "../assets/img/Danish Ahmad.webp";
import hussainAliImg from "../assets/img/Hussain Ali.webp";
import abdullahAbdulRazzaqImg from "../assets/img/Abdullah Abdul Razzaq.webp";

/**
 * ABOUT US PAGE — IT Meta Solutions
 * Includes:
 * - Vision + Mission
 * - Experience (5 years total, 3 years professional)
 * - Markets: Pakistan, Canada, UK, USA
 * - Contact details
 * - Team section (4 members) with image placeholders + recommended sizes
 * - Photo frames placeholders for office/team/work images
 *
 * ✅ Replace CTA links (#) with your contact/quote page routes.
 */

const cx = (...c) => c.filter(Boolean).join(" ");

function Container({ children, className }) {
  return (
    <div className={cx("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

function GradientBlob({ className }) {
  return (
    <div
      aria-hidden
      className={cx(
        "pointer-events-none absolute -z-10 blur-3xl opacity-40",
        "bg-[radial-gradient(closest-side,rgba(99,102,241,0.55),rgba(99,102,241,0))]",
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
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200 mb-3">
      {Icon ? <Icon className="h-3.5 w-3.5 opacity-80" /> : null}
      {children}
    </span>
  );
}

function SectionTitle({ kicker, title, desc, align = "left", level = "h2" }) {
  const HeadingTag = level;
  return (
    <div className={cx("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
        <Sparkles className="h-3.5 w-3.5" />
        {kicker}
      </div>
      <HeadingTag className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">{title}</HeadingTag>
      <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">{desc}</p>
    </div>
  );
}

function Divider() {
  return <div className="my-12 sm:my-16 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />;
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

function TeamCard({ name, role, skills, image }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-6">
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />
      </div>

      <div className="relative">
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
              {image ? (
                <img
                  src={image}
                  alt={name}
                  className="h-24 w-24 rounded-2xl object-cover"
                />
              ) : (
                <div className="h-24 w-24 rounded-2xl border border-dashed border-white/20 bg-white/[0.02] grid place-items-center text-[11px] text-zinc-500">
                  Add image
                </div>
              )}
            </div>
          </div>

          <div className="min-w-0">
            <div className="text-lg font-semibold text-white">{name}</div>
            <div className="mt-1 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
              <BriefcaseBusiness className="h-3.5 w-3.5 opacity-80" />
              {role}
            </div>

            <ul className="mt-4 space-y-2 text-sm text-zinc-200">
              {skills.map((s, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  <span className="opacity-90">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AboutUsPage() {
  useEffect(() => {
    document.title = "ITMS | About";
  }, []);

  const year = useMemo(() => new Date().getFullYear(), []);
  const heroRef = useRef(null);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, -55]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.88]);

  return (
    <>
      <Helmet>
        <title>IT Meta Solutions - About Us | Premium Digital Growth Agency</title>
        <meta name="description" content="Learn about IT Meta Solutions - a premium digital growth agency specializing in web development, SEO, social media marketing, and performance advertising for businesses in Pakistan, Canada, UK, and USA." />
        <meta name="keywords" content="digital agency, web development company, SEO services, social media marketing, digital marketing agency, IT Meta Solutions" />
        <meta property="og:title" content="IT Meta Solutions - About Us | Premium Digital Growth Agency" />
        <meta property="og:description" content="Learn about IT Meta Solutions - a premium digital growth agency specializing in web development, SEO, social media marketing, and performance advertising for businesses in Pakistan, Canada, UK, and USA." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://itmetasolutions.com/about" />
        <meta property="og:url" content="https://itmetasolutions.com/about" />
        <meta property="og:image" content="https://itmetasolutions.com/favicon.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="IT Meta Solutions - About Us | Premium Digital Growth Agency" />
        <meta name="twitter:description" content="Learn about IT Meta Solutions - a premium digital growth agency specializing in web development, SEO, social media marketing, and performance advertising for businesses in Pakistan, Canada, UK, and USA." />
        <meta name="twitter:image" content="https://itmetasolutions.com/favicon.webp" />
      </Helmet>

      <div className="min-h-screen text-zinc-100 mb-16 overflow-x-hidden">
      <ScrollProgress />

      {/* Background accents */}
      <GradientBlob className="left-[-140px] top-[-140px] h-[560px] w-[560px]" />
      <GradientBlob className="right-[-180px] top-[240px] h-[560px] w-[560px] bg-[radial-gradient(closest-side,rgba(16,185,129,0.5),rgba(16,185,129,0))]" />

      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden">
        <Container className="pb-12 pt-24 sm:pb-16 sm:pt-32">
          <motion.div style={{ y: heroY, opacity: heroOpacity }}>
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <Pill icon={ShieldCheck}>Trust-first execution</Pill>
                <Pill icon={Target}>Performance-driven</Pill>
                <Pill icon={Globe2}>Global markets</Pill>
                <Pill icon={Users}>Skilled team</Pill>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <SectionTitle
                kicker="About us"
                title="IT Meta Solutions — building brands, websites & growth systems that perform"
                desc="We help businesses in Pakistan, Canada, UK and USA build a premium digital presence and scale with performance marketing — with a strong focus on conversion, trust, and measurable results."
                level="h1"
              />
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                <Stat icon={CalendarDays} label="Experience" value="5+ years" />
                <Stat icon={ShieldCheck} label="Professional" value="3+ years" />
                <Stat icon={Globe2} label="Markets" value="PK • CA • UK • USA" />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-2xl">
                    <div className="text-sm font-semibold text-white">Contact</div>
                    <div className="mt-2 grid gap-2 text-sm text-zinc-300">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span className="text-white font-semibold">+92 327 180 4037</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span className="text-white font-semibold">info@itmetasolutions.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>
                          26A Office No F1, 1st Floor, PCSIR Society Block A, Ameer Chowk, Lahore
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:opacity-90"
                    >
                      Get a proposal <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                    >
                      WhatsApp now <Phone className="h-4 w-4" />
                    </a>
                    <a
                      href="https://wa.me/923271804037"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                    >
                      WhatsApp now <Phone className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </motion.div>
        </Container>
      </section>

      {/* Vision / Mission */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-4 lg:grid-cols-2">
            <Reveal delay={0.05}>
              <Card
                icon={Wand2}
                title="Our Vision"
                desc="To become a trusted global digital growth partner for businesses by building brands and marketing systems that deliver measurable results."
                bullets={[
                  "Premium brand experiences",
                  "International-quality execution",
                  "Trust-driven digital presence",
                  "Long-term growth systems",
                ]}
              />
            </Reveal>

            <Reveal delay={0.1}>
              <Card
                icon={HeartHandshake}
                title="Our Mission"
                desc="To help businesses grow through modern web development, creative production, and performance marketing — with clear communication, fast delivery, and honest reporting."
                bullets={[
                  "Build conversion-first websites & stores",
                  "Create high-impact design & video",
                  "Run ads with tracking & optimization",
                  "Support clients with clear processes",
                ]}
              />
            </Reveal>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <Reveal delay={0.05}>
              <Card
                icon={ShieldCheck}
                title="What makes us different"
                desc="We don’t just ‘post’ or ‘run ads’ — we build a system."
                bullets={[
                  "Strategy + execution combined",
                  "Conversion-first approach",
                  "Creative testing mindset",
                  "Transparent reporting",
                ]}
              />
            </Reveal>

            <Reveal delay={0.1}>
              <Card
                icon={Handshake}
                title="How we work"
                desc="Simple approvals, fast iterations, weekly updates."
                bullets={[
                  "Discovery → plan → execution",
                  "Weekly progress updates",
                  "Clear deliverables",
                  "Optimization & scaling roadmap",
                ]}
              />
            </Reveal>

            <Reveal delay={0.15}>
              <Card
                icon={Globe2}
                title="Markets we serve"
                desc="We understand local and international buyer behavior."
                bullets={[
                  "Pakistan (PKR, COD, local trust)",
                  "Canada (service-first conversion)",
                  "UK (premium minimal + compliance)",
                  "USA (fast funnels + strong CTAs)",
                ]}
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* What we do (convincing) */}
      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionTitle
              kicker="What we deliver"
              title="A complete system, not scattered services"
              desc="Whether you need a website, branding, ads, or full management — everything connects into one growth engine."
              align="center"
            />
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <Reveal delay={0.05}>
              <Card
                icon={Code2}
                title="Web Development"
                desc="Business websites, landing pages, and e-commerce stores designed to convert."
                bullets={["Mobile-first UI", "WhatsApp/forms", "Speed optimization", "SEO-ready structure"]}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Card
                icon={Megaphone}
                title="Performance Marketing"
                desc="Meta Ads systems built for leads and sales — with tracking & optimization."
                bullets={["Funnel campaigns", "Retargeting pools", "Creative testing", "Reporting"]}
              />
            </Reveal>
            <Reveal delay={0.15}>
              <Card
                icon={Palette}
                title="Design & Video"
                desc="Modern creatives that make your brand look premium and improve ad performance."
                bullets={["Ad creatives", "Brand kits", "Reels editing", "Templates"]}
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionTitle
              kicker="Our team"
              title="Skilled specialists — one coordinated system"
              desc="A focused team with clear roles — so design, development, SEO, and ads work together (and don’t clash)."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <Reveal delay={0.05} className="lg:col-span-2">
              <TeamCard
                name="Abdullah Khalid"
                role="Web Developer • SEO Expert"
                image={abdullahKhalidImg}
                skills={[
                  "Conversion-focused website builds",
                  "Technical SEO structure",
                  "Speed + mobile optimization",
                  "Landing pages for ads",
                ]}
              />
            </Reveal>

            <Reveal delay={0.1}>
              <TeamCard
                name="Moeez ul Haq"
                role="Digital Marketer"
                image={moeezUlHaqImg}
                skills={[
                  "Meta Ads funnel strategy",
                  "Audience targeting + retargeting",
                  "Creative testing & scaling",
                  "Lead + sales optimization",
                ]}
              />
            </Reveal>

            <Reveal delay={0.15}>
              <TeamCard
                name="Danish Ahmad"
                role="Graphic Designer"
                image={danishAhmadImg}
                skills={[
                  "Brand identity & social templates",
                  "Ad creatives for performance",
                  "Packaging & print-ready designs",
                  "Modern UI visuals",
                ]}
              />
            </Reveal>

            <Reveal delay={0.2}>
              <TeamCard
                name="Hussain Ali"
                role="Dropshipping Expert"
                imgSize="Square: 800 × 800"
                image={hussainAliImg}
                skills={[
                  "Product research & validation",
                  "Store setup + optimization",
                  "Offer strategy & positioning",
                  "Order flow + scaling basics",
                ]}
              />
            </Reveal>

            <Reveal delay={0.25}>
              <TeamCard
                name="Abdullah Abdul Razzaq"
                role="Video Editor, Graphic Designer"
                image={abdullahAbdulRazzaqImg}
                skills={[
                  "Video editing and production",
                  "Graphic design for social media",
                  "Motion graphics",
                  "Brand visuals",
                ]}
              />
            </Reveal>
          </div>

          <Reveal delay={0.22}>
            <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-emerald-400/10 p-6">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div className="max-w-2xl">
                  <div className="text-sm font-semibold text-white">Let’s build something strong</div>
                  <div className="mt-1 text-sm text-zinc-300">
                    If you want a premium website + marketing system that generates results, contact us and we’ll share a clear plan.
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:opacity-90"
                  >
                    Request a proposal <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="tel:+923271804037"
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    Call now <Phone className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {[
                  { icon: ShieldCheck, title: "Trust-first", desc: "Clear communication and honest reporting." },
                  { icon: Target, title: "Performance", desc: "Focused on leads, sales, and ROAS." },
                  { icon: Rocket, title: "Fast delivery", desc: "Quick execution with clean approvals." },
                ].map((b) => (
                  <div key={b.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5">
                        <b.icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-white">{b.title}</div>
                        <div className="mt-1 text-sm text-zinc-300">{b.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>


        </Container>
      </section>
    </div>
    </>
  );
}
