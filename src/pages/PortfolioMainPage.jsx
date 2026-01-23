import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CheckCircle2,
  Code2,
  Compass,
  FileSearch,
  Globe,
  Instagram,
  Layers,
  LayoutGrid,
  Mail,
  Megaphone,
  MousePointerClick,
  Phone,
  ShoppingCart,
  Sparkles,
  Star,
  Zap,
  Users,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import heroBg from "../assets/img/Hero Section Banner Background ITMS.webp";
import aboutImg from "../assets/img/Home About Image ITMS.webp";

/* ------------------ helpers ------------------ */
const cx = (...c) => c.filter(Boolean).join(" ");
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!m) return;
    const onChange = () => setReduced(!!m.matches);
    onChange();
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function Reveal({ children, delay = 0, className }) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function AnchorLink({ href, children, className, onClick }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        if (href?.startsWith?.("#")) {
          e.preventDefault();
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        onClick?.(e);
      }}
      className={className}
    >
      {children}
    </a>
  );
}

// ✅ Brand color used here
function GradientBlob({ className, color = "rgba(80,37,209,0.55)" }) {
  return (
    <div
      aria-hidden
      className={cx("pointer-events-none absolute -z-10 blur-3xl opacity-40", className)}
      style={{
        background: `radial-gradient(closest-side, ${color}, rgba(80,37,209,0))`,
      }}
    />
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-[#5025d1] via-emerald-400 to-fuchsia-500"
      style={{ scaleX: scrollYProgress }}
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
  return <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />;
}

function SectionTitle({ kicker, title, desc, align = "left" }) {
  return (
    <div className={cx("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
        <Zap className="h-3.5 w-3.5" />
        {kicker}
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">{desc}</p>
    </div>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
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

function Stars({ n = 5 }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-white/80 text-white/80" />
      ))}
    </div>
  );
}

function TestimonialCard({ t }) {
  return (
    <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 flex flex-col">
      <Stars n={t.rating} />
      <p className="mt-4 text-sm leading-relaxed text-zinc-200">“{t.quote}”</p>

      <div className="mt-auto pt-5 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5">
          <span className="text-sm font-semibold text-white">{t.name.slice(0, 1)}</span>
        </div>
        <div>
          <div className="text-sm font-semibold text-white">{t.name}</div>
          <div className="text-xs text-zinc-300">{t.role}</div>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ s }) {
  return (
    <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] border-l-4 border-[#5025d1] p-6 flex flex-col">
      <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5">
        <s.icon className="h-5 w-5" />
      </div>

      <div className="mt-4 text-lg font-semibold text-white">{s.title}</div>
      <p className="mt-2 text-sm text-zinc-300">{s.desc}</p>

      {s.bullets?.length ? (
        <ul className="mt-4 space-y-2 text-sm text-zinc-200">
          {s.bullets.map((b, i) => (
            <li key={i} className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-emerald-300" />
              <span className="opacity-90">{b}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function WorkCard({ item }) {
  const CardBody = (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] border-l-4 border-[#5025d1] p-6 transition hover:bg-white/[0.06] h-full flex flex-col">
      <div className="flex items-center justify-between text-xs text-zinc-400">
        <span>{item.type || item.subtitle}</span>
        <span>{item.tag}</span>
      </div>

      <h4 className="mt-3 text-lg font-semibold text-white">{item.title}</h4>
      <p className="mt-2 text-sm text-zinc-300">{item.desc}</p>

      {item.bullets && (
        <ul className="mt-4 space-y-2 text-sm text-zinc-200">
          {item.bullets.map((b, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
              {b}
            </li>
          ))}
        </ul>
      )}

      {item.pills && (
        <div className="mt-4 flex flex-wrap gap-2">
          {item.pills.map((pill, i) => {
            const Icon = pill.icon;
            return (
              <span
                key={i}
                className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-zinc-200"
              >
                <Icon className="h-3 w-3" />
                {pill.label}
              </span>
            );
          })}
        </div>
      )}

      {(item.slug || item.href) && (
        <div className="mt-auto pt-5 flex items-center gap-2 text-sm text-white/80">
          <span>View case study</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      )}
    </div>
  );

  return item.slug || item.href ? (
    <Link to={item.slug || item.href} className="group block h-full">
      {CardBody}
    </Link>
  ) : (
    <div className="h-full">{CardBody}</div>
  );
}

/* ------------------ NEW: Animated Image Placeholder ------------------ */
function ImageFrame({
  label = "Hero image",
  size = "Recommended: 1200 × 900 (or 1600 × 1200)",
  hint = "Add a premium brand/office/team image. Keep background clean.",
  className,
  tilt = true,
  image,
}) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      className={cx(
        "relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-4",
        className
      )}
      initial={reduced ? false : { opacity: 0, y: 18, scale: 0.98 }}
      animate={reduced ? {} : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      whileHover={
        reduced || !tilt
          ? {}
          : {
            y: -4,
            rotate: -0.4,
            scale: 1.01,
          }
      }
    >
      <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-[#5025d1]/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />

      <div className="relative">
        {!image && (
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white">{label}</div>
              <div className="mt-1 text-xs text-zinc-400">{size}</div>
              <div className="mt-2 text-sm text-zinc-300">{hint}</div>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5">
              <Building2 className="h-5 w-5" />
            </div>
          </div>
        )}

        {/* placeholder box or image */}
        {image ? (
          <motion.img
            src={image}
            alt={label}
            className="mt-4 aspect-[4/3] w-full rounded-2xl object-cover"
            initial={reduced ? false : { opacity: 0, scale: 0.95 }}
            animate={reduced ? {} : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        ) : (
          <motion.div
            className="mt-4 aspect-[4/3] w-full rounded-2xl border border-dashed border-white/15 bg-white/[0.02] grid place-items-center text-xs text-zinc-400"
            animate={
              reduced
                ? {}
                : {
                  boxShadow: [
                    "0 0 0 rgba(80,37,209,0)",
                    "0 0 25px rgba(80,37,209,0.15)",
                    "0 0 0 rgba(80,37,209,0)",
                  ],
                }
            }
            transition={reduced ? {} : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            Use: office/team photo, brand collage, or dashboard screenshot (blur sensitive info).
          </motion.div>
        )}

        {!image && (
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-zinc-300">
            <span className="text-white font-semibold">Tip:</span> Use WebP/JPG under ~250KB for fast loading.
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ------------------ data ------------------ */
const chips = [
  "Shopify",
  "WordPress",
  "Custom HTML/CSS/JS",
  "React",
  "UI/UX",
  "Landing Pages",
  "Lead Funnels",
  "Meta Ads",
  "Google Ads",
  "On-Page SEO",
  "Analytics",
  "Email Automation",
];

const services = [
  {
    icon: Code2,
    title: "Web Development",
    desc: "Fast, conversion-focused websites built with modern UI and clean structure.",
    bullets: ["Landing pages", "E-commerce", "Booking & forms", "Performance optimization"],
  },
  {
    icon: FileSearch,
    title: "On-Page SEO",
    desc: "Technical structure, headings, metadata, and internal linking.",
    bullets: ["Keyword mapping", "Metadata", "Internal linking", "Schema basics"],
  },
  {
    icon: Sparkles,
    title: "Social Media",
    desc: "Content systems, reels, creatives, and growth planning.",
    bullets: ["Content calendars", "Reels & creatives", "Community management", "Reporting"],
  },
  {
    icon: BarChart3,
    title: "Paid Marketing",
    desc: "Meta & Google Ads with tracking and optimization.",
    bullets: ["Pixel & events", "A/B testing", "Retargeting", "Lead nurturing"],
  },
];

const workSites = [
  {
    title: "IN HOMES DIRECT",
    type: "Website",
    tag: "Shopify",
    slug: "/case-study/inhomes-direct",
    desc: "Home interiors e-commerce with custom pricing logic and calculators.",
    bullets: ["Real-time flooring calculator", "Pack requirement logic", "Custom pricing rules", "SEO-ready structure"],
  },
  {
    title: "MORE HOMES GROUP",
    type: "Website",
    tag: "Property Lettings",
    slug: "/case-study/more-homes-group",
    desc: "Property lettings platform with tenant and landlord services, advanced search, and multi-city coverage.",
    bullets: ["Property listings", "Tenant & landlord flows", "Advanced search & filters", "Multi-city coverage"],
  },
  {
    title: "Multidatum",
    type: "Website",
    tag: "Digital Marketing",
    slug: "/case-study/multidatum",
    desc: "Data-driven social media growth for measurable brand impact.",
    bullets: ["Strategy", "Paid campaigns", "Content & design", "Analytics & reporting"],
  },
];

const workBrands = [
  {
    slug: "/case-study/halla-gulla",
    title: "Halla Gulla",
    subtitle: "Complete Brand Build",
    desc: "Complete travel brand build with website, social media, and Meta Ads system generating 67 qualified leads on a low budget.",
    pills: [
      { icon: LayoutGrid, label: "Website" },
      { icon: Instagram, label: "Social" },
      { icon: Megaphone, label: "Meta Ads" },
      { icon: Phone, label: "WhatsApp leads" },
    ],
  },
  {
    slug: "/case-studies/united-muslim-travels-brand-build",
    title: "United Muslim Travels",
    subtitle: "Complete Brand Build",
    desc: "Complete Islamic travel brand build with website, social media, and Meta Ads system generating 200+ qualified leads on a low budget.",
    pills: [
      { icon: LayoutGrid, label: "Website" },
      { icon: Instagram, label: "Social" },
      { icon: Megaphone, label: "Meta Ads" },
      { icon: Phone, label: "WhatsApp leads" },
    ],
  },
  {
    slug: "/case-study/esahulat-mart",
    title: "E Sahulat Mart",
    subtitle: "Complete Brand Build",
    desc: "Complete e-commerce brand build with website, social media, and Meta Ads system generating 2+ lac PKR in sales on a low budget.",
    pills: [
      { icon: LayoutGrid, label: "Website" },
      { icon: Instagram, label: "Social" },
      { icon: Megaphone, label: "Meta Ads" },
      { icon: ShoppingCart, label: "Sales growth" },
    ],
  },
  {
    slug: "/case-study/hikmabiotics",
    title: "Hikmabiotics",
    subtitle: "Complete Brand Build",
    desc: "Complete dual-market brand build with localized websites for Pakistan and UK, social media, and Meta Ads system generating early profitable sales.",
    pills: [
      { icon: LayoutGrid, label: "Website" },
      { icon: Instagram, label: "Social" },
      { icon: Megaphone, label: "Meta Ads" },
      { icon: Globe, label: "PK + UK" },
    ],
  },
];

const testimonials = [
  {
    name: "Operations Lead",
    role: "Local Services",
    quote: "We started getting consistent leads within the first week. The site feels premium and the tracking is clean.",
    rating: 5,
  },
  {
    name: "Founder",
    role: "E-commerce",
    quote: "The storefront looks high-end and loads fast. Product pages are structured properly and conversions improved.",
    rating: 5,
  },
  {
    name: "Marketing Manager",
    role: "Hospitality",
    quote: "Content + ads finally feel aligned. The reporting is simple, and we always know what’s working.",
    rating: 5,
  },
];

/* ------------------ page ------------------ */
export default function PortfolioMainPage() {
  const reduced = usePrefersReducedMotion();
  const { scrollY } = useScroll();

  // Parallax
  const heroY = useTransform(scrollY, [0, 800], [0, reduced ? 0 : -60]);
  const heroImgY = useTransform(scrollY, [0, 900], [0, reduced ? 0 : -30]);
  const heroImgR = useTransform(scrollY, [0, 900], [0, reduced ? 0 : 0.8]);

  const year = useMemo(() => new Date().getFullYear(), []);

  // Form state
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMessage, setErrorMessage] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.phone.trim()) e.phone = "Please enter a phone/WhatsApp number.";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Please describe your requirements (min 10 characters).";
    return e;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setStatus("idle");
    setErrorMessage("");
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    try {
      setStatus("sending");
      const formData = new FormData(ev.target);
      const data = Object.fromEntries(formData.entries());
      data.services = formData.getAll('services'); // Handle multiple checkboxes
      const payload = {
        ...data,
        createdAt: new Date().toISOString(),
        source: "home-page",
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res?.ok) {
        const errorData = await res.json().catch(() => ({ error: "Failed to send message" }));
        throw new Error(errorData.error || "Failed to send message");
      }
      setStatus("sent");
      setForm({ name: "", phone: "", email: "", message: "" });
      // Reset checkboxes
      ev.target.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message || "Something went wrong. Please try again or WhatsApp us directly.");
    }
  };

  return (
    <div className="min-h-screen w-full text-zinc-100 overflow-x-hidden">
      <ScrollProgress />

      {/* blobs */}
      <GradientBlob className="left-[-120px] top-[-120px] h-[520px] w-[520px]" />
      <GradientBlob className="right-[-160px] top-[220px] h-[520px] w-[520px]" color="rgba(16,185,129,0.55)" />

      {/* HERO */}
      <section
        className="overflow-hidden relative min-h-[550px] flex items-center pt-16"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <Container className="py-[30px] relative z-10">
          <motion.div style={{ y: heroY }}>
            <div className="grid gap-10 lg:grid-cols-1 lg:items-center text-center">
              {/* CENTER: copy */}
              <div>
                <Reveal>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <Pill>Modern websites + growth systems</Pill>
                    <span className="text-xs text-zinc-400">Build • Manage • Market</span>
                  </div>
                </Reveal>

                <Reveal delay={0.05}>
                  <h1 className="mt-6 max-w-3xl mx-auto text-4xl font-semibold sm:text-6xl">
                    We build <span className="text-white/80">high-converting</span> websites &{" "}
                    <span className="text-white/80">growth systems</span>
                  </h1>
                </Reveal>

                <Reveal delay={0.1}>
                  <p className="mt-5 max-w-2xl mx-auto text-sm text-zinc-300 sm:text-base">
                    Web development, on-page SEO, social media, and marketing — all designed to look premium and perform.
                  </p>
                </Reveal>

                <Reveal delay={0.13}>
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
                      <ShieldCheck className="h-3.5 w-3.5" /> Trust-first execution
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
                      <MousePointerClick className="h-3.5 w-3.5" /> Conversion-first UI
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
                      <BarChart3 className="h-3.5 w-3.5" /> Weekly optimization
                    </span>
                  </div>
                </Reveal>

                <Reveal delay={0.15}>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center justify-center">
                    <Link
                      to="/work"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#5025d1] px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
                    >
                      View work <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                      to="/services"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      See services <Compass className="h-4 w-4" />
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* CHIP SCROLLER */}
      <section className="-mt-5 relative z-10">
        <Container>
          <Reveal delay={0.2}>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-black">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-zinc-950 to-transparent" />
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-zinc-950 to-transparent" />
                <motion.div
                  className="flex gap-2 px-4 py-4"
                  animate={reduced ? {} : { x: [0, -600] }}
                  transition={reduced ? {} : { duration: 18, repeat: Infinity, ease: "linear" }}
                  style={{ willChange: "transform" }}
                >
                  {[...chips, ...chips].map((c, i) => (
                    <span
                      key={`${c}-${i}`}
                      className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200"
                    >
                      {c}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <Container>
        <Divider />
      </Container>

      {/* NEW: SHORT ABOUT US */}
      <section id="about" className="scroll-mt-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <SectionTitle
                kicker="About us"
                title="A small team, built for real growth"
                desc="We combine modern web development, clean design, and performance marketing to generate leads and sales — with clear communication and measurable reporting."
              />

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  { icon: Users, title: "Specialists", desc: "Dev • Design • Ads • SEO" },
                  { icon: ShieldCheck, title: "Trust-first", desc: "Clear scope + clean approvals" },
                  { icon: BarChart3, title: "Performance", desc: "Testing + optimization weekly" },
                  { icon: Globe, title: "Global", desc: "PK • UK • CA • USA" },
                ].map((b) => (
                  <div key={b.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                    <div className="flex items-start gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5">
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

              <div className="mt-8 flex flex-wrap gap-2">
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#5025d1] px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
                >
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Contact <Phone className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <motion.div
                whileHover={reduced ? {} : { scale: 1.01, y: -4 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <ImageFrame
                  label="About Us"
                  size=""
                  hint=""
                  tilt={false}
                  image={aboutImg}
                />
              </motion.div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Container>
        <Divider />
      </Container>

      {/* SERVICES */}
      <section id="services" className="scroll-mt-24">
        <Container>
          <Reveal>
            <SectionTitle
              kicker="What we do"
              title="Web + Social + Marketing — in one consistent brand system"
              desc="Choose only what you need, or combine everything for a complete growth setup."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2 items-stretch">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05} className="h-full">
                <ServiceCard s={s} />
              </Reveal>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#5025d1] px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      <Container>
        <Divider />
      </Container>

      {/* SITES DEVELOPED */}
      <section id="work" className="pt-24 scroll-mt-24">
        <Container>
          <Reveal>
            <SectionTitle
              kicker="Sites Developed"
              title="Websites Built for Performance"
              desc="Custom websites designed for conversion, speed, and growth across various industries."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-3 items-stretch">
            {workSites.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.05} className="h-full">
                <WorkCard item={w} />
              </Reveal>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              to="/work"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#5025d1] px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              See all projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      <Container>
        <Divider />
      </Container>

      {/* FULL BRAND BUILDING */}
      <section className="scroll-mt-24">
        <Container>
          <Reveal>
            <SectionTitle
              kicker="Full Brand Building"
              title="End-to-End Brand Systems"
              desc="Complete brand setups including website, social media management, and integrated marketing systems for measurable growth."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-2 items-stretch">
            {workBrands.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.05} className="h-full">
                <WorkCard item={w} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Container>
        <Divider />
      </Container>

      {/* TESTIMONIALS */}
      <section className="scroll-mt-24">
        <Container>
          <Reveal>
            <SectionTitle
              kicker="Results"
              title="Clients love the clarity"
              desc="Modern visuals, measurable growth, and clean communication."
              align="center"
            />
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-3 items-stretch">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.05} className="h-full">
                <TestimonialCard t={t} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Container>
        <Divider />
      </Container>

      {/* PROCESS */}
      <section id="process" className="scroll-mt-24">
        <Container>
          <Reveal>
            <SectionTitle
              kicker="How we work"
              title="A clean process that delivers fast"
              desc="You always know what’s happening, what’s next, and what results we’re targeting."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-4 items-stretch">
            {[
              { step: "01", icon: Compass, title: "Audit & Strategy", desc: "We review your offer and goals, then map a simple plan." },
              { step: "02", icon: Layers, title: "Design System", desc: "We define colors, type, layout rules, and templates for consistency." },
              { step: "03", icon: Code2, title: "Build & Launch", desc: "We develop, optimize, QA, and launch with tracking + basic SEO." },
              { step: "04", icon: BarChart3, title: "Optimize & Scale", desc: "We iterate with content + ads, improve pages, and report weekly." },
            ].map((p, i) => (
              <Reveal key={p.step} delay={i * 0.05} className="h-full">
                <div className="h-full relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 flex flex-col">
                  <div className="absolute right-4 top-4 text-4xl font-semibold text-white/10">{p.step}</div>
                  <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 text-base font-semibold text-white">{p.title}</div>
                  <div className="mt-2 text-sm leading-relaxed text-zinc-300">{p.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Container>
        <Divider />
      </Container>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-24">
        <Container className="pb-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <div>
                <SectionTitle
                  kicker="Contact"
                  title="Let’s build your next growth setup"
                  desc="Send your details and we’ll reply with a plan + timeline + estimate."
                />

                <div className="mt-8 grid gap-3">
                  {[
                    { icon: Mail, label: "Email", value: "info@itmetasolutions.com" },
                    { icon: Globe, label: "Website", value: "www.itmetasolutions.com" },
                    { icon: Phone, label: "WhatsApp", value: "+92 327 180 4037" },
                  ].map((c) => (
                    <div
                      key={c.label}
                      className="flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5">
                          <c.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-xs text-zinc-300">{c.label}</div>
                          <div className="text-sm font-semibold text-white">{c.value}</div>
                        </div>
                      </div>
                      <span className="text-xs text-zinc-400">Quick</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.03] p-6">
                  <div className="text-sm font-semibold text-white">Quick checklist</div>
                  <ul className="mt-3 space-y-2 text-sm text-zinc-200">
                    {["Your business name + niche", "What you want (site / social / ads / SEO)", "Any competitor links", "Your timeline"].map(
                      (b) => (
                        <li key={b} className="flex items-center gap-2">
                          <BadgeCheck className="h-4 w-4 text-emerald-300" />
                          <span className="opacity-90">{b}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>


              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <div className="text-sm font-semibold text-white">Request a proposal</div>
                <p className="mt-2 text-sm text-zinc-300">Front-end UI. Connect to your backend/email service.</p>

                <form onSubmit={onSubmit} className="mt-6 grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs text-zinc-300">Full name</label>
                      <input
                        required
                        name="name"
                        value={form.name}
                        onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                        placeholder="Your name"
                        className={cx(
                          "mt-2 w-full rounded-2xl border bg-zinc-950/50 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none",
                          errors.name ? "border-red-500/60 focus:border-red-500/70" : "border-white/10 focus:border-white/20"
                        )}
                      />
                      {errors.name && <div className="mt-2 text-xs text-red-300">{errors.name}</div>}
                    </div>
                    <div>
                      <label className="text-xs text-zinc-300">Phone / WhatsApp</label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                        placeholder="+92 ..."
                        className={cx(
                          "mt-2 w-full rounded-2xl border bg-zinc-950/50 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none",
                          errors.phone ? "border-red-500/60 focus:border-red-500/70" : "border-white/10 focus:border-white/20"
                        )}
                      />
                      {errors.phone && <div className="mt-2 text-xs text-red-300">{errors.phone}</div>}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-zinc-300">Email</label>
                    <input
                      required
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                      placeholder="you@email.com"
                      className={cx(
                        "mt-2 w-full rounded-2xl border bg-zinc-950/50 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none",
                        errors.email ? "border-red-500/60 focus:border-red-500/70" : "border-white/10 focus:border-white/20"
                      )}
                    />
                    {errors.email && <div className="mt-2 text-xs text-red-300">{errors.email}</div>}
                  </div>

                  <div>
                    <label className="text-xs text-zinc-300">What do you need?</label>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      {["Website", "E-commerce", "Social Media Management", "Paid Ads", "On-page SEO", "Complete Brand Setup"].map(
                        (s) => (
                          <label
                            key={s}
                            className="flex cursor-pointer items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200 hover:bg-white/10"
                          >
                            <input type="checkbox" name="services" value={s} className="accent-[#5025d1]" />
                            <span>{s}</span>
                          </label>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-zinc-300">Message</label>
                    <textarea
                      rows={5}
                      name="message"
                      value={form.message}
                      onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                      placeholder="Tell us about your business and goals..."
                      className={cx(
                        "mt-2 w-full resize-none rounded-2xl border bg-zinc-950/50 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none",
                        errors.message ? "border-red-500/60 focus:border-red-500/70" : "border-white/10 focus:border-white/20"
                      )}
                    />
                    {errors.message && <div className="mt-2 text-xs text-red-300">{errors.message}</div>}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs text-zinc-400 flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4" />
                      Your info stays private and is only used to contact you.
                    </div>

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className={cx(
                        "inline-flex items-center gap-2 rounded-2xl bg-[#5025d1] px-5 py-3 text-sm font-semibold text-white hover:opacity-90",
                        status === "sending" && "opacity-60 cursor-not-allowed"
                      )}
                    >
                      {status === "sending" ? (
                        <>
                          Sending <ArrowRight className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Send request <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>

                  {status === "sent" && (
                    <div className="mt-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-200">
                      <div className="flex items-center gap-2 font-semibold">
                        <CheckCircle2 className="h-5 w-5" />
                        Message sent successfully!
                      </div>
                      <div className="mt-1 text-emerald-200/90">
                        We’ll contact you shortly. If urgent, WhatsApp is fastest: <span className="text-white font-semibold">03271804037</span>
                      </div>
                    </div>
                  )}

                  {status === "error" && (
                    <div className="mt-2 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200">
                      {errorMessage}
                    </div>
                  )}
                </form>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </div>
  );
}
