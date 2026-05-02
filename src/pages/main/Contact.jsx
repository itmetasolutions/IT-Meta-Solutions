import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useScroll } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  Shield,
  Building2,
  Copy,
  Send,
  Globe,
  BadgeCheck,
  Briefcase,
  Layers,
  BarChart3,
  Laptop,
  Wand2,
  Handshake,
  Users,
  Cloud,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Video,
  Search,
  Palette,
  HelpCircle,
} from "lucide-react";
import SeoContentFaq from "../../components/SeoContentFaq";
import SubpageVisualLayer from "../../components/SubpageVisualLayer";

/* ==================== HELPERS ==================== */

const cx = (...classes) => classes.filter(Boolean).join(" ");

function Container({ children, className }) {
  return (
    <div className={`mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12 ${className || ''}`}>
      {children}
    </div>
  );
}

/* ==================== UI: HOME THEME PRIMITIVES ==================== */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-[#5025d1] via-purple-500 to-pink-500"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

function GradientBlob({ className, color = "rgba(80,37,209,0.3)" }) {
  return (
    <div
      aria-hidden
      className={cx("pointer-events-none absolute -z-10 blur-3xl", className)}
      style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }}
    />
  );
}

function Badge({ children, icon: Icon }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white">
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </span>
  );
}

function GlowCard({ className, children }) {
  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02]",
        className
      )}
    >
      <div className="relative">{children}</div>
    </div>
  );
}

function SectionHeading({ badge, title, description, centered = false }) {
  return (
    <div className={cx("mb-10 sm:mb-12", centered && "text-center")}>
      {badge && (
        <div className={cx("mb-4", centered && "flex justify-center")}>
          <Badge icon={Sparkles}>{badge}</Badge>
        </div>
      )}
      <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">{title}</h1>
      {description && (
        <p className={cx("mt-4 text-lg text-zinc-300 sm:text-xl max-w-3xl", centered && "mx-auto")}>
          {description}
        </p>
      )}
    </div>
  );
}

const seoContent = {
  kicker: "Contact Us",
  title: "Talk to Salesforce, E-commerce, and Performance Marketing Experts",
  subtitle:
    "Get direct access to a SECP registered IT firm in Lahore for Salesforce implementation, LWC development, and high-converting Shopify and WooCommerce builds.",
  paragraphs: [
    "Tell us your goals and we will recommend the fastest path to revenue, whether that is a Salesforce Experience Cloud portal, CRM automation, or a performance-optimized ecommerce store.",
    "We serve Pakistan and global clients in the UK and US with clear timelines, pricing, and measurable outcomes.",
  ],
  bullets: [
    "Hire Salesforce developers for custom integration and automation",
    "Performance marketing and Meta Ads strategy for scalable growth",
    "Custom web app development and ecommerce conversion optimization",
    "Local Lahore team with global delivery standards",
  ],
};

const seoFaqs = [
  {
    q: "How fast can you start a Salesforce implementation?",
    a: "Most Salesforce discovery and planning starts within 5 to 7 days after kickoff, followed by a clear implementation roadmap.",
  },
  {
    q: "Can I hire Salesforce LWC developers only?",
    a: "Yes. We offer dedicated LWC development services for custom components, portals, and integrations.",
  },
  {
    q: "Do you build performance-optimized Shopify stores?",
    a: "Yes. We build fast-loading Shopify and WooCommerce sites with conversion-focused UX and custom calculators.",
  },
  {
    q: "Are you a Lahore-based SECP registered IT firm?",
    a: "Yes. We are SECP and FBR registered and operate from City Star Plaza, Township, Lahore.",
  },
];

/* ==================== UI: NEW CONTACT DESIGN COMPONENTS ==================== */

function IconTile({ icon: Icon, title, desc }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 transition-all hover:border-[#5025d1]/50">
      <div className="relative flex items-start gap-4">
        <div className="shrink-0 rounded-2xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-3">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-white">{title}</div>
          <div className="mt-1 text-sm text-zinc-300">{desc}</div>
        </div>
      </div>
    </div>
  );
}

function ContactMiniCard({ icon: Icon, label, value, href, copyText }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="relative flex items-start justify-between gap-4 min-w-0">
        <div className="flex items-start gap-4 min-w-0">
          <div className="shrink-0 rounded-2xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-3">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0">
            <div className="text-xs text-zinc-400">{label}</div>
            <div className="mt-1 text-sm font-semibold text-white break-words [overflow-wrap:anywhere]">{value}</div>

            {href ? (
              <a
                href={href}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#5025d1] transition-all hover:scale-[1.02] sm:w-auto"
              >
                {label === "Email" ? "Send email" : label.includes("WhatsApp") ? "Chat on WhatsApp" : "Open"}
                <ArrowRight className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </div>

        {copyText ? (
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(copyText);
                setCopied(true);
                setTimeout(() => setCopied(false), 1200);
              } catch {
                // ignore
              }
            }}
            className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10"
          >
            <Copy className="h-4 w-4" />
            {copied ? "Copied" : "Copy"}
          </button>
        ) : null}
      </div>
    </div>
  );
}

function Field({ label, error, children, optional = false }) {
  return (
    <div className="min-w-0">
      <label className="flex items-center justify-between text-sm font-medium text-white">
        <span>{label}</span>
        {optional ? <span className="text-xs font-medium text-zinc-400">(Optional)</span> : null}
      </label>
      <div className="mt-2 min-w-0">{children}</div>
      {error ? <p className="mt-1 text-sm text-red-400">{error}</p> : null}
    </div>
  );
}

function Input({ name, value, onChange, placeholder, type = "text", error }) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={cx(
        "w-full min-w-0 rounded-2xl border bg-white/5 px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2",
        error ? "border-red-500/60 focus:ring-red-500" : "border-white/10 focus:ring-[#5025d1]"
      )}
    />
  );
}

function Select({ name, value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full min-w-0 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#5025d1] flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          {selectedOption?.icon && React.createElement(selectedOption.icon, { className: "h-5 w-5 text-white/80" })}
          <span>{selectedOption?.label}</span>
        </div>
        <ChevronDown className="h-5 w-5 text-white/80" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-2xl border border-white/10 bg-zinc-950 shadow-lg">
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => {
                onChange({ target: { name, value: o.value } });
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-white hover:bg-white/10 first:rounded-t-2xl last:rounded-b-2xl"
            >
              {o.icon && React.createElement(o.icon, { className: "h-5 w-5 text-white/80" })}
              <span>{o.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function TextArea({ name, value, onChange, placeholder, rows = 6, error }) {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={cx(
        "w-full min-w-0 resize-none rounded-2xl border bg-white/5 px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2",
        error ? "border-red-500/60 focus:ring-red-500" : "border-white/10 focus:ring-[#5025d1]"
      )}
    />
  );
}

async function submitContact(payload) {
  const response = await fetch("https://it-meta-solutions.onrender.com/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response;
}

/* ==================== PAGE ==================== */

export default function Contact() {

  // ✅ Data from your previous contact page
  const CONTACT = useMemo(
    () => ({
      phoneRaw: "03271804037",
      phoneTel: "+923271804037",
      email: "info@itmetasolutions.com",
      officeShort: "City Star Plaza, Lahore",
      officeFull: "Office No M32 1st Floor, City Star Plaza, Maulana Shaukat Ali Rd, Township Block 1 Sector B 1 Lahore, 54700",
      hours: "Monday – Saturday • 06:00 AM – 12:00 AM (PKT)",
      website: "https://itmetasolutions.com",
    }),
    []
  );

  // form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "meta",
    budget: "", // ✅ optional + fillable
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Email is invalid";
    if (!form.phone.trim()) e.phone = "Phone / WhatsApp is required";
    if (!form.message.trim() || form.message.trim().length < 20) e.message = "Please add details (min 20 characters)";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setErrorMessage("");
    const e = validateForm();
    setErrors(e);
    if (Object.keys(e).length) return;

    setStatus("sending");

    try {
      const payload = {
        ...form,
        createdAt: new Date().toISOString(),
        source: "contact-page",
      };

      const res = await submitContact(payload);
      if (!res?.ok) {
        const data = await res.json().catch(() => ({ error: "Failed to send message" }));
        throw new Error(data?.error || "Failed to send message");
      }

      setStatus("success");
      setForm({ name: "", email: "", phone: "", company: "", service: "meta", budget: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err?.message || "Something went wrong. Please try again or WhatsApp us directly.");
    }
  };

  return (
    <>
      <Helmet>
        <title>IT Meta Solutions - Contact Us | Get a Free Consultation</title>
        <meta
          name="description"
          content="Contact our Lahore-based Salesforce and ecommerce team for LWC, Experience Cloud, Shopify, and performance marketing."
        />
        <link rel="canonical" href="https://itmetasolutions.com/contact" />
      </Helmet>

      <div className="itms-subpage text-zinc-100 relative min-h-screen overflow-hidden">
        <SubpageVisualLayer />

        <ScrollProgress />

        {/* Background Elements */}

        {/* ==================== NEW HERO (COMPLETELY DIFFERENT) ==================== */}
        <section className="relative pt-28 pb-12 sm:pt-36 sm:pb-16">
          <Container>
            <motion.div className="relative">
              {/* Split hero card */}
              <GlowCard className="p-7 sm:p-10">
                <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
                  {/* Left: headline */}
                  <div className="min-w-0">
                    <Badge icon={Sparkles}>Free consultation • Quick response</Badge>

                    <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                      Contact the team that
                      <br />
                      <span className="bg-gradient-to-r from-[#5025d1] via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        builds + scales brands
                      </span>
                    </h1>

                    <p className="mt-4 text-lg text-zinc-300 sm:text-xl max-w-2xl">
                      Tell us what you want to build. We’ll reply with a clear plan, timeline, and next steps — no fluff.
                    </p>

                    {/* Feature tiles */}
                    <div className="mt-7 grid gap-4 sm:grid-cols-2">
                      <IconTile icon={Clock} title="Fast response" desc="WhatsApp + email replies quickly." />
                      <IconTile icon={Shield} title="Privacy first" desc="Your data is only used to contact you." />
                      <IconTile icon={Handshake} title="Clear scope" desc="Deliverables, timeline, and pricing." />
                      <IconTile icon={Users} title="Trusted approach" desc="Process-driven delivery, not guesswork." />
                    </div>
                  </div>

                  {/* Right: quick contact */}
                  <div className="min-w-0">
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-white">Quick contact</div>
                          <div className="mt-1 text-sm text-zinc-300">Pick the fastest option</div>
                        </div>
                        <div className="rounded-2xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-3">
                          <MessageCircle className="h-6 w-6 text-white" />
                        </div>
                      </div>

                      <div className="mt-6 grid gap-4">
                        <a
                          href={`tel:${CONTACT.phoneRaw}`}
                          className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="rounded-xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-2">
                              <Phone className="h-5 w-5 text-white" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs text-zinc-400">Call / WhatsApp</div>
                              <div className="text-sm font-semibold text-white break-words [overflow-wrap:anywhere]">
                                {CONTACT.phoneRaw}
                              </div>
                            </div>
                          </div>
                          <ArrowRight className="h-5 w-5 text-white/80 transition-transform group-hover:translate-x-1" />
                        </a>

                        <a
                          href={`mailto:${CONTACT.email}`}
                          className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="rounded-xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-2">
                              <Mail className="h-5 w-5 text-white" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs text-zinc-400">Email</div>
                              <div className="text-sm font-semibold text-white break-words [overflow-wrap:anywhere]">
                                {CONTACT.email}
                              </div>
                            </div>
                          </div>
                          <ArrowRight className="h-5 w-5 text-white/80 transition-transform group-hover:translate-x-1" />
                        </a>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <div className="flex items-start gap-3">
                            <div className="rounded-xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-2">
                              <Building2 className="h-5 w-5 text-white" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs text-zinc-400">Office</div>
                              <div className="text-sm font-semibold text-white break-words [overflow-wrap:anywhere]">
                                {CONTACT.officeShort}
                              </div>
                              <div className="mt-1 text-xs text-zinc-300">{CONTACT.hours}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                        <a
                          href={CONTACT.website}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
                        >
                          <Globe className="h-4 w-4" />
                          Website
                        </a>
                        <a
                          href={`tel:${CONTACT.phoneRaw}`}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#5025d1] hover:opacity-95"
                        >
                          <Phone className="h-4 w-4" />
                          Call Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          </Container>
        </section>

        {/* ==================== MAIN (NEW LAYOUT) ==================== */}
        <section className="py-16 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.95fr,1.05fr] lg:gap-14">
              {/* LEFT: MINI CONTACT CARDS (copy + actions) */}
              <div className="min-w-0">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white">Direct contact</div>
                    <div className="mt-1 text-sm text-zinc-300">Use these for urgent queries</div>
                  </div>
                  <Badge icon={BadgeCheck}>Always online</Badge>
                </div>

                <div className="mt-6 grid gap-5">
                  <ContactMiniCard
                    icon={Phone}
                    label="Call / WhatsApp"
                    value={CONTACT.phoneRaw}
                    href={`tel:${CONTACT.phoneRaw}`}
                    copyText={CONTACT.phoneRaw}
                  />
                  <ContactMiniCard
                    icon={Mail}
                    label="Email"
                    value={CONTACT.email}
                    href={`mailto:${CONTACT.email}`}
                    copyText={CONTACT.email}
                  />
                  <ContactMiniCard
                    icon={MapPin}
                    label="Office address"
                    value={CONTACT.officeFull}
                    href="#"
                    copyText={CONTACT.officeFull}
                  />
                </div>

                {/* Social links */}
                <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="mb-4 text-sm font-semibold text-white">Follow Us</div>
                  <div className="flex gap-3">
                    {[
                      { icon: Facebook, href: "https://web.facebook.com/itmetasolutions", label: "Facebook" },
                      { icon: Instagram, href: "https://www.instagram.com/itmetasolutions.pvt.ltd/", label: "Instagram" },
                      { icon: Linkedin, href: "https://www.linkedin.com/in/mehar-abdullah-khalid-375001331/", label: "LinkedIn" },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition-all duration-300 hover:border-[#5025d1]/30 hover:bg-[#5025d1]/20 hover:text-white"
                      >
                        <s.icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Why share box */}
                <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 rounded-2xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-3">
                      <Wand2 className="h-6 w-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-lg font-bold text-white">What to include (recommended)</div>
                      <ul className="mt-4 space-y-3 text-sm text-zinc-200">
                        {[
                          "Brand name + industry",
                          "Target city/country and audience",
                          "Goal (leads, sales, website, branding)",
                          "Timeline + budget (if you have one)",
                          "Reference links (competitors, style)",
                        ].map((x) => (
                          <li key={x} className="flex items-start gap-3">
                            <div className="mt-0.5 rounded-xl bg-white/10 p-2">
                              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                            </div>
                            <span className="break-words [overflow-wrap:anywhere]">{x}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: FORM (NEW LOOK) */}
              <div className="min-w-0">
                <GlowCard className="p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h2 className="text-2xl font-bold text-white">Request a proposal</h2>
                      <p className="mt-2 text-zinc-300">
                        We’ll reply with a scope + timeline. For urgent work, WhatsApp is fastest.
                      </p>
                    </div>
                    <div className="shrink-0 rounded-2xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-3">
                      <Send className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Service chips (pure UI) */}
                  <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center gap-3">
                        <Laptop className="h-5 w-5 text-white/80" />
                        <div>
                          <div className="text-sm font-semibold text-white">Web</div>
                          <div className="text-xs text-zinc-400">Sites & apps</div>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center gap-3">
                        <BarChart3 className="h-5 w-5 text-white/80" />
                        <div>
                          <div className="text-sm font-semibold text-white">Marketing</div>
                          <div className="text-xs text-zinc-400">Leads & sales</div>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center gap-3">
                        <Search className="h-5 w-5 text-white/80" />
                        <div>
                          <div className="text-sm font-semibold text-white">SEO</div>
                          <div className="text-xs text-zinc-400">Visibility</div>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center gap-3">
                        <Cloud className="h-5 w-5 text-white/80" />
                        <div>
                          <div className="text-sm font-semibold text-white">Salesforce</div>
                          <div className="text-xs text-zinc-400">Solutions</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-6 min-w-0">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <Field label="Full name *" error={errors.name}>
                        <Input
                          name="name"
                          value={form.name}
                          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                          placeholder="Your name"
                          error={errors.name}
                        />
                      </Field>

                      <Field label="Email *" error={errors.email}>
                        <Input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                          placeholder="you@email.com"
                          error={errors.email}
                        />
                      </Field>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <Field label="Phone / WhatsApp *" error={errors.phone}>
                        <Input
                          name="phone"
                          value={form.phone}
                          onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                          placeholder="+92..."
                          error={errors.phone}
                        />
                      </Field>

                      <Field label="Company" optional>
                        <Input
                          name="company"
                          value={form.company}
                          onChange={(e) => setForm((s) => ({ ...s, company: e.target.value }))}
                          placeholder="Business name"
                        />
                      </Field>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <Field label="Service needed">
                        <Select
                          name="service"
                          value={form.service}
                          onChange={(e) => setForm((s) => ({ ...s, service: e.target.value }))}
                          options={[
                            { value: "meta", label: "Meta Ads", icon: Facebook },
                            { value: "tiktok", label: "TikTok Ads", icon: Video },
                            { value: "google", label: "Google Ads", icon: Search },
                            { value: "seo", label: "SEO", icon: Search },
                            { value: "web", label: "Website", icon: Laptop },
                            { value: "social", label: "SMM", icon: Users },
                            { value: "brand", label: "Brand Building", icon: Layers },
                            { value: "design", label: "Graphic Design", icon: Palette },
                            { value: "video", label: "Video Editing", icon: Video },
                            { value: "salesforce", label: "Salesforce", icon: Cloud },
                          ]}
                        />
                      </Field>

                      {/* ✅ Budget: fillable + optional */}
                      <Field label="Budget" optional>
                        <Input
                          name="budget"
                          value={form.budget}
                          onChange={(e) => setForm((s) => ({ ...s, budget: e.target.value }))}
                          placeholder="e.g., 20k – 100k (optional)"
                          type="text"
                        />
                      </Field>
                    </div>

                    <Field label="Project details *" error={errors.message}>
                      <TextArea
                        name="message"
                        value={form.message}
                        onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                        placeholder="Tell us what you want to achieve, any links, and your timeline..."
                        rows={6}
                        error={errors.message}
                      />
                    </Field>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="inline-flex items-center gap-2 text-xs text-zinc-400">
                        <Shield className="h-4 w-4 text-emerald-400" />
                        Your info stays private and is only used to contact you.
                      </div>

                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className={cx(
                          "w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl",
                          "bg-gradient-to-r from-[#5025d1] to-purple-600 px-6 py-4 text-lg font-semibold text-white",
                          "shadow-lg shadow-[#5025d1]/40 transition-all",
                          status === "sending"
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:shadow-xl hover:shadow-[#5025d1]/50 hover:scale-[1.02]"
                        )}
                      >
                        {status === "sending" ? "Submiting..." : "Submit"}
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>

                    {status === "success" && (
                      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-200">
                        <div className="flex items-center gap-2 font-semibold">
                          <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                          Message sent successfully!
                        </div>
                        <p className="mt-1 text-sm text-emerald-200/90">
                          We’ll contact you shortly. If urgent, WhatsApp is fastest:{" "}
                          <span className="font-semibold text-white">{CONTACT.phoneRaw}</span>
                        </p>
                      </div>
                    )}

                    {status === "error" && (
                      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-200">
                        <p className="font-semibold">
                          {errorMessage || "Failed to send message. Please try again or contact us directly."}
                        </p>
                      </div>
                    )}

                    {/* bottom micro proof */}
                    <div className="mt-2 grid gap-3 sm:grid-cols-3">
                      {[
                        { icon: Briefcase, text: "Clear proposal" },
                        { icon: Shield, text: "Privacy-first" },
                        { icon: BarChart3, text: "Growth-focused" },
                      ].map((x) => (
                        <div
                          key={x.text}
                          className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white"
                        >
                          <x.icon className="h-4 w-4 text-white/80" />
                          {x.text}
                        </div>
                      ))}
                    </div>
                  </form>
                </GlowCard>
              </div>
            </div>
          </Container>
        </section>

        {/* ==================== MAP SECTION ==================== */}
        <section className="py-10 sm:py-14">
          <Container>
            <div className="mb-8 text-center">
              <Badge icon={MapPin}>Visit Our Office</Badge>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Find Us in Lahore</h2>
              <p className="mx-auto mt-3 max-w-2xl text-zinc-300">
                Office No M32 1st Floor, City Star Plaza, Maulana Shaukat Ali Rd, Township Block 1 Sector B 1 Lahore, 54700
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/10">
              <div className="grid lg:grid-cols-[1fr,360px]">
                {/* Map iframe */}
                <div className="relative min-h-[350px] sm:min-h-[450px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.1789751778897!2d74.31494959999999!3d31.4642625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391907f28acfe357%3A0x875d67a6a5a7aa3!2sIT%20Meta%20Solutions!5e0!3m2!1sen!2s!4v1772499535973!5m2!1sen!2s"
                    style={{ border: 0, position: "absolute", inset: 0, width: "100%", height: "100%" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="IT Meta Solutions Office Location"
                  />
                </div>

                {/* Side info panel */}
                <div className="flex flex-col gap-6 border-t border-white/10 bg-white/5 p-6 sm:p-8 lg:border-l lg:border-t-0">
                  <div>
                    <div className="mb-3 flex items-center gap-3">
                      <div className="rounded-2xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-3">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-lg font-bold text-white">Our Office</div>
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-300">
                      Office No M32 1st Floor, City Star Plaza, Maulana Shaukat Ali Rd, Township Block 1 Sector B 1 Lahore, 54700
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-2xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-3">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Working Hours</div>
                      <div className="mt-1 text-sm text-zinc-300">Mon – Sat • 06:00 AM – 12:00 AM (PKT)</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-2xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-3">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Call / WhatsApp</div>
                      <div className="mt-1 text-sm text-zinc-300">+92 327 180 4037</div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 text-sm font-semibold text-white">Follow Us</div>
                    <div className="flex gap-3">
                      {[
                        { icon: Facebook, href: "https://web.facebook.com/itmetasolutions", label: "Facebook" },
                        { icon: Instagram, href: "https://www.instagram.com/itmetasolutions.pvt.ltd/", label: "Instagram" },
                        { icon: Linkedin, href: "https://www.linkedin.com/in/mehar-abdullah-khalid-375001331/", label: "LinkedIn" },
                      ].map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition-all duration-300 hover:border-[#5025d1]/30 hover:bg-[#5025d1]/20 hover:text-white"
                        >
                          <s.icon className="h-4 w-4" />
                        </a>
                      ))}
                    </div>
                  </div>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=31.4642625,74.31494959999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#5025d1] to-purple-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
                  >
                    <MapPin className="h-4 w-4" />
                    Get Directions
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <SeoContentFaq content={seoContent} faqs={seoFaqs} />
      </div>
    </>
  );
}
