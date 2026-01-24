import React, { useEffect, useMemo, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  ChevronRight,
  FileSearch,
  Gauge,
  Globe,
  Layout,
  LineChart,
  Megaphone,
  MessageSquareText,
  PieChart,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  PenTool,
  TrendingUp,
} from "lucide-react";

/**
 * Multidatum — Case Study Page
 * SAME template/theme as your InHomes Direct reference:
 * - Dark, glass cards, gradients
 * - Scroll progress
 * - Parallax hero
 * - Reveal animations
 * - Sticky anchor subnav
 *
 * Content updated for:
 * https://multidatum.itmetasolutions.com/
 * Digital Marketing & Social Media Services
 */

const cx = (...c) => c.filter(Boolean).join(" ");

const nav = [
  { label: "Overview", href: "#overview" },
  { label: "Objectives", href: "#objectives" },
  { label: "Challenge", href: "#challenge" },
  { label: "Solution", href: "#solution" },
  { label: "Features", href: "#features" },
  { label: "SEO", href: "#seo" },
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
    <div
      className="
        group relative overflow-hidden
        rounded-3xl border border-white/10
        bg-gradient-to-b from-white/[0.07] to-white/[0.03]
        p-6 pb-8
        h-full
        flex
      "
    >
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
    <div className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/60 backdrop-blur">
      <Container className="py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-300">
            <BriefcaseBusiness className="h-4 w-4" />
            Multidatum — Case Study
          </div>

          <div className="flex flex-wrap items-center gap-2 justify-end">
            {nav.map((n) => (
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

export default function MultidatumCaseStudy() {
  useEffect(() => {
    document.title = "ITMS | Multidatum";
  }, []);

  const year = useMemo(() => new Date().getFullYear(), []);
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
                <Pill icon={Megaphone}>Digital marketing</Pill>
                <Pill icon={Target}>Growth strategy</Pill>
                <Pill icon={BarChart3}>Data-driven</Pill>
                <Pill icon={PenTool}>Creative execution</Pill>
                <Pill icon={ShieldCheck}>Lead-focused</Pill>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                Multidatum — data-driven social media growth for measurable brand impact
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                We structured a growth-focused digital marketing website that clearly communicates services, differentiates
                the brand with strong positioning, showcases credibility, and drives consultations through prominent contact
                pathways.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <Reveal delay={0.1}>
                <Stat icon={Layout} label="Clarity" value="Service architecture" />
              </Reveal>
              <Reveal delay={0.15}>
                <Stat icon={Target} label="Conversion" value="Lead-ready CTAs" />
              </Reveal>
              <Reveal delay={0.2}>
                <Stat icon={LineChart} label="Positioning" value="Strategy → results" />
              </Reveal>
            </div>

            {/* Live website card */}
            <Reveal delay={0.15}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.03] p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-2xl">
                    <div className="text-sm font-semibold text-white">Live website</div>
                    <div className="mt-1 text-sm text-zinc-300">Replace with screenshots in your final portfolio if needed.</div>
                  </div>
                  <a
                    href="https://multidatum.itmetasolutions.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:opacity-90"
                  >
                    Visit Multidatum <ArrowRight className="h-4 w-4" />
                  </a>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {[
                    { icon: MessageSquareText, title: "Clear messaging", desc: "Value props written for decision-makers." },
                    { icon: PieChart, title: "Data + strategy", desc: "Complex concepts simplified into outcomes." },
                    { icon: Users, title: "Lead paths", desc: "Contact and consultation CTAs placed intentionally." },
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
              kicker="Overview"
              title="A growth-focused digital marketing brand with a conversion-ready website"
              desc="Multidatum helps businesses grow through smart, creative, and data-driven social media strategies. The website presents core services, positioning, success/credibility cues, and consultation contact paths in a clear structure."
            />
          </Reveal>

          <div className="mt-10 pb-6 grid gap-4 lg:grid-cols-3">
            <Reveal delay={0.05}>
              <Card
                icon={Globe}
                title="Industry"
                desc="Branding • Strategy • Growth Marketing"
                bullets={["Digital marketing services", "Social media growth", "Creative + analytics"]}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Card
                icon={Layout}
                title="Goal"
                desc="Clarity + differentiation + lead capture"
                bullets={["Service structure", "Value proposition messaging", "Consultation CTAs"]}
              />
            </Reveal>
            <Reveal delay={0.15}>
              <Card
                icon={ShieldCheck}
                title="Outcome focus"
                desc="Make strategy feel simple and measurable"
                bullets={["Insights → action messaging", "Campaign outcomes framing", "Credibility cues"]}
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <Container>
        <Divider />
      </Container>

      {/* Objectives */}
      <section id="objectives" className="scroll-mt-24">
        <Container className="pb-16">
          <Reveal>
            <SectionTitle
              kicker="Objectives"
              title="Explain services fast — and turn attention into consultations"
              desc="We focused on scannable sections, strong value propositions, and multiple contact touchpoints so prospects can understand the offer and request a consultation quickly."
            />
          </Reveal>

          <div className="mt-10 pb-6 grid gap-4 md:grid-cols-2">
            <Reveal delay={0.05}>
              <Card
                icon={BriefcaseBusiness}
                title="Professional service layout"
                desc="Present offerings clearly for business owners and marketing leads."
                bullets={["Service overview", "Clear CTAs", "Easy navigation"]}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Card
                icon={Target}
                title="Value propositions"
                desc="Communicate strategy, creativity, and measurable results in plain language."
                bullets={["Outcomes-focused copy", "Simple explanations", "Trust-first tone"]}
              />
            </Reveal>
            <Reveal delay={0.15}>
              <Card
                icon={Users}
                title="Credibility signals"
                desc="Support decision-making through proof, team, and outcomes."
                bullets={["Success stories/portfolio blocks", "Team section", "Brand consistency"]}
              />
            </Reveal>
            <Reveal delay={0.2}>
              <Card
                icon={MessageSquareText}
                title="Lead generation"
                desc="Make it easy for prospects to inquire for consultations."
                bullets={["Contact CTAs", "Lead-focused forms", "Clear next steps"]}
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <Container>
        <Divider />
      </Container>

      {/* Challenge */}
      <section id="challenge" className="scroll-mt-24">
        <Container className="pb-16">
          <Reveal>
            <SectionTitle
              kicker="Challenges"
              title="Agency sites must stand out — and still stay simple"
              desc="Many digital agencies offer similar services. The challenge was to differentiate Multidatum, simplify data-driven strategy, and keep the site structured to convert visitors into leads."
            />
          </Reveal>

          <div className="mt-10 pb-6 grid gap-4 md:grid-cols-2">
            <Reveal delay={0.05}>
              <Card
                icon={TrendingUp}
                title="Conversion to leads"
                desc="Turn browsing into contact actions through strong messaging and CTAs."
                bullets={["Lead-focused sections", "CTA placements", "Consultation cues"]}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Card
                icon={Sparkles}
                title="Differentiation"
                desc="Stand out from similar agencies with clear positioning and brand voice."
                bullets={["Unique value framing", "Outcome language", "Brand consistency"]}
              />
            </Reveal>
            <Reveal delay={0.15}>
              <Card
                icon={BarChart3}
                title="Complex strategy → simple"
                desc="Explain analytics and data-driven approach in an understandable way."
                bullets={["Insights → action messaging", "Plain language", "Measurable outcomes"]}
              />
            </Reveal>
            <Reveal delay={0.2}>
              <Card
                icon={Layout}
                title="Portfolio integration"
                desc="Show case examples without overwhelming the user."
                bullets={["Success story blocks", "Expandable sections", "Scalable layout"]}
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <Container>
        <Divider />
      </Container>

      {/* Solution */}
      <section id="solution" className="scroll-mt-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <SectionTitle
                kicker="Solution"
                title="Positioning-led design + modular service architecture"
                desc="We built a structure that immediately communicates what Multidatum does, how it works, and why it matters — supported by scannable service sections and clear consultation paths."
              />

              <div className="mt-6 flex flex-wrap gap-2">
                <Pill icon={MessageSquareText}>Clear messaging</Pill>
                <Pill icon={Layout}>Service hierarchy</Pill>
                <Pill icon={BarChart3}>Data-led approach</Pill>
                <Pill icon={Target}>Lead CTAs</Pill>
                <Pill icon={FileSearch}>SEO-ready sections</Pill>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-6">
                <div className="text-sm font-semibold text-white">Implementation summary</div>
                <ul className="mt-4 space-y-3 text-sm text-zinc-200">
                  {[
                    "Strong hero positioning: ‘smart, creative, and data-driven social media strategies’",
                    "Structured services: strategy, paid campaigns, content/design, analytics/reporting, growth framework",
                    "Service preview cards for fast scanning and decision-making",
                    "Lead-focused contact sections and forms for consultations",
                    "Scalable content areas (blog/insights) for SEO and thought leadership",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-300" />
                      <span className="opacity-90">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Container>
        <Divider />
      </Container>

      {/* Features */}
      <section id="features" className="scroll-mt-24">
        <Container className="pb-16">
          <Reveal>
            <SectionTitle
              kicker="Key features"
              title="Services, strategy, and conversion paths — clearly presented"
              desc="These were the core website components designed to communicate value fast and capture consultation leads."
            />
          </Reveal>

          <div className="mt-10 pb-6 grid gap-4 lg:grid-cols-3">
            <Reveal delay={0.05}>
              <Card
                icon={BarChart3}
                title="Data-driven strategy messaging"
                desc="Explains how insights translate into actions and results."
                bullets={["Insights → action framing", "Outcome-first copy", "Simple explanations"]}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Card
                icon={Layout}
                title="Service highlight sections"
                desc="Scannable modules for what the agency does and how it helps."
                bullets={["Strategy", "Content & design", "Campaign management"]}
              />
            </Reveal>
            <Reveal delay={0.15}>
              <Card
                icon={Target}
                title="Lead-focused CTAs"
                desc="Consultation CTAs placed where users are ready to act."
                bullets={["Contact prompts", "Consultation workflow", "Clear next steps"]}
              />
            </Reveal>
          </div>

          <div className="mt-6 pb-6 grid gap-4 lg:grid-cols-2">
            <Reveal delay={0.1}>
              <Card
                icon={Megaphone}
                title="Paid ads + analytics integration"
                desc="Services framed around measurable growth and reporting."
                bullets={["Paid campaigns", "Analytics & reporting", "Optimization mindset"]}
              />
            </Reveal>
            <Reveal delay={0.15}>
              <Card
                icon={FileSearch}
                title="Content sections for SEO"
                desc="Blog/insights areas designed for inbound traffic and authority building."
                bullets={["Thought leadership", "Search targeting", "Scalable publishing"]}
              />
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.06] to-white/[0.03] p-6">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div className="max-w-2xl">
                  <div className="text-sm font-semibold text-white">Responsive, conversion-optimized layout</div>
                  <div className="mt-1 text-sm text-zinc-300">
                    The site is designed to keep users oriented to core services, proof, and contact paths — on any device.
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
                  <ChevronRight className="h-4 w-4" />
                  Mobile-first UX
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <Container>
        <Divider />
      </Container>

      {/* SEO */}
      <section id="seo" className="scroll-mt-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <SectionTitle
                kicker="SEO & structure"
                title="Service pages + content blocks built for search intent"
                desc="We organized service architecture for clearer targeting, and supported future growth with content sections like blogs to attract inbound traffic and build authority."
              />
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid gap-4">
                {[
                  {
                    icon: FileSearch,
                    title: "Clear service targeting",
                    desc: "Structured service pages help search engines map offerings to user intent.",
                  },
                  {
                    icon: Layout,
                    title: "Segmented navigation",
                    desc: "About, Services, Blog, Contact to keep users oriented and reduce bounce.",
                  },
                  {
                    icon: Gauge,
                    title: "Performance-ready layout",
                    desc: "Clean sections and modular content prevent bloat as the site grows.",
                  },
                  {
                    icon: BarChart3,
                    title: "Measurement mindset",
                    desc: "Messaging supports measurable outcomes and reporting expectations.",
                  },
                ].map((r) => (
                  <div key={r.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                    <div className="flex items-start gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5">
                        <r.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{r.title}</div>
                        <div className="mt-1 text-sm text-zinc-300">{r.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
              kicker="Impact"
              title="Clearer services, stronger trust, better lead capture"
              desc="The website improves clarity around offerings and outcomes, supports brand credibility with structured content, and provides consultation contact paths designed to convert visitors into leads."
              align="center"
            />
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Reveal delay={0.05}>
              <Stat icon={Layout} label="Service clarity" value="Improved" />
            </Reveal>
            <Reveal delay={0.1}>
              <Stat icon={Target} label="Lead capture" value="Stronger" />
            </Reveal>
            <Reveal delay={0.15}>
              <Stat icon={TrendingUp} label="Scalability" value="Ready" />
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-emerald-400/10 p-6">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div className="max-w-2xl">
                  <div className="text-sm font-semibold text-white">Want a similar agency website?</div>
                  <div className="mt-1 text-sm text-zinc-300">
                    We can build positioning-led messaging, modular service architecture, and consultation flows — designed
                    to convert visitors into leads.
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

          <div className="mt-10 text-center text-xs text-zinc-500">
            © {year} • Multidatum case study
          </div>
        </Container>
      </section>
    </div>
  );
}