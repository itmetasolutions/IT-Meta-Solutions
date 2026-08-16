import React, { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useInView } from "framer-motion";
import {
  ArrowRight,
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
  Sparkles,
} from "lucide-react";
import SeoContentFaq from "../../components/SeoContentFaq";
import Container from "../../components/Container";
import { PHONE_NUMBERS, PRIMARY_PHONE, OFFICE_ADDRESS, OFFICE_HOURS, EMAIL } from "../../lib/contact";

/* ==================== HELPERS ==================== */

const cx = (...classes) => classes.filter(Boolean).join(" ");

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-0.5 w-full origin-left bg-gradient-to-r from-[#1D4ED8] via-[#23A6E8] to-[#3AC9F5]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

function Reveal({ children, delay = 0, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ==================== FORM COMPONENTS (light theme) ==================== */

function Field({ label, error, children, optional = false }) {
  return (
    <div>
      <label className="flex items-center justify-between text-sm font-semibold text-slate-700 mb-1.5">
        <span>{label}</span>
        {optional ? <span className="text-xs font-normal text-slate-400">(Optional)</span> : null}
      </label>
      {children}
      {error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}
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
        "w-full rounded-xl border px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 transition-all",
        error
          ? "border-red-300 focus:ring-red-200"
          : "border-slate-200 focus:border-[#1D4ED8]/40 focus:ring-[#1D4ED8]/15"
      )}
    />
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
        "w-full resize-none rounded-xl border px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 transition-all",
        error
          ? "border-red-300 focus:ring-red-200"
          : "border-slate-200 focus:border-[#1D4ED8]/40 focus:ring-[#1D4ED8]/15"
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
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/15 flex items-center justify-between transition-all hover:border-[#1D4ED8]/30"
      >
        <div className="flex items-center gap-2.5">
          {selectedOption?.icon && React.createElement(selectedOption.icon, { className: "h-4 w-4 text-slate-400" })}
          <span>{selectedOption?.label}</span>
        </div>
        <ChevronDown className="h-4 w-4 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-1 w-full rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-100 overflow-hidden">
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => {
                onChange({ target: { name, value: o.value } });
                setIsOpen(false);
              }}
              className={cx(
                "w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-sm transition hover:bg-[#F1F4F9]",
                o.value === value ? "text-[#1D4ED8] font-semibold bg-[#F1F4F9]" : "text-slate-700"
              )}
            >
              {o.icon && React.createElement(o.icon, { className: "h-4 w-4 text-slate-400" })}
              <span>{o.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ==================== COPY BUTTON ==================== */

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        } catch {}
      }}
      className="flex-shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-[#F1F4F9] px-2.5 py-1.5 text-xs font-medium text-slate-500 transition hover:border-[#1D4ED8]/30 hover:text-[#1D4ED8]"
    >
      <Copy className="h-3.5 w-3.5" />
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

/* ==================== CONTACT INFO CARD ==================== */

function ContactCard({ icon: Icon, color, label, value, href, copyText }) {
  return (
    <div className="premium-card rounded-2xl p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl" style={{ backgroundColor: `${color}15` }}>
          <Icon className="h-5 w-5" style={{ color }} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-medium text-slate-400 mb-0.5">{label}</div>
          <div className="text-sm font-semibold text-slate-800 break-words [overflow-wrap:anywhere]">{value}</div>
          {href && (
            <a
              href={href}
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold transition hover:opacity-80"
              style={{ color }}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {label.startsWith("Call") ? "Call now" : label === "Email" ? "Send email" : "View"}
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
        {copyText && <CopyButton text={copyText} />}
      </div>
    </div>
  );
}

/* ==================== API ==================== */

async function submitContact(payload) {
  const response = await fetch("https://it-meta-solutions.onrender.com/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response;
}

/* ==================== SEO DATA ==================== */

const seoContent = {
  kicker: "Contact Us",
  title: "Talk to Salesforce, E-commerce, and Performance Marketing Experts",
  subtitle: "Get direct access to a SECP registered IT firm in Lahore for Salesforce implementation, LWC development, and high-converting Shopify and WooCommerce builds.",
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
  { q: "How fast can you start a Salesforce implementation?", a: "Most Salesforce discovery and planning starts within 5 to 7 days after kickoff, followed by a clear implementation roadmap." },
  { q: "Can I hire Salesforce LWC developers only?", a: "Yes. We offer dedicated LWC development services for custom components, portals, and integrations." },
  { q: "Do you build performance-optimized Shopify stores?", a: "Yes. We build fast-loading Shopify and WooCommerce sites with conversion-focused UX and custom calculators." },
  { q: "Which countries do you serve?", a: "We work with clients across the UK, US, Canada, and Pakistan, with regional phone numbers for each." },
];

/* ==================== PAGE ==================== */

export default function Contact() {
  const CONTACT = useMemo(() => ({
    phones: PHONE_NUMBERS,
    primaryPhone: PRIMARY_PHONE,
    email: EMAIL,
    officeFull: OFFICE_ADDRESS,
    hours: OFFICE_HOURS,
    website: "https://itmetasolutions.com",
  }), []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "meta",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Email is invalid";
    if (!form.phone.trim()) e.phone = "Phone number is required";
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
      const payload = { ...form, createdAt: new Date().toISOString(), source: "contact-page" };
      const res = await submitContact(payload);
      if (!res?.ok) {
        const data = await res.json().catch(() => ({ error: "Failed to send message" }));
        throw new Error(data?.error || "Failed to send message");
      }
      setStatus("success");
      setForm({ name: "", email: "", phone: "", company: "", service: "meta", budget: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err?.message || "Something went wrong. Please try again or use live chat / call us directly.");
    }
  };

  return (
    <>
      <Helmet>
        <title>IT Meta Solutions - Contact Us | Get a Free Consultation</title>
        <meta name="description" content="Contact our Lahore-based Salesforce and ecommerce team for LWC, Experience Cloud, Shopify, and performance marketing." />
        <link rel="canonical" href="https://itmetasolutions.com/contact" />
      </Helmet>

      <ScrollProgress />

      {/* ==================== HERO (dark) ==================== */}
      <section className="relative bg-[#141A2E] overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="absolute inset-0 dot-grid-bg opacity-25 pointer-events-none" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#1D4ED8]/10 blur-[100px] pointer-events-none" />

        <Container>
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {[
                { icon: MessageCircle, label: "Free consultation" },
                { icon: BadgeCheck, label: "SECP registered firm" },
                { icon: Clock, label: "Quick response" },
              ].map((b) => (
                <span key={b.label} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-slate-300">
                  <b.icon className="h-3.5 w-3.5 text-[#3AC9F5]" />
                  {b.label}
                </span>
              ))}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Contact the team that
              <br />
              <span className="animated-gradient-text">builds + scales brands</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-slate-400 max-w-2xl"
            >
              Tell us what you want to build. We'll reply with a clear plan, timeline, and next steps — no fluff.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 max-w-lg"
            >
              {[
                { value: "< 24h", label: "Response time" },
                { value: "50+", label: "Projects done" },
                { value: "5★", label: "Google rating" },
              ].map((s) => (
                <div key={s.label} className="bg-white/[0.04] px-5 py-4 text-center backdrop-blur-sm">
                  <div className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</div>
                  <div className="mt-0.5 text-xs text-slate-400">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ==================== CONTACT INFO + FORM (mist) ==================== */}
      <section className="bg-[#F1F4F9] py-20 sm:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr,1.1fr] lg:gap-12">

            {/* LEFT: contact cards + info */}
            <div className="space-y-5">
              <Reveal>
                <div>
                  <span className="kicker">Direct contact</span>
                  <h2
                    className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Reach us directly
                  </h2>
                  <p className="mt-2 text-slate-500">Use these for urgent queries — live chat is fastest.</p>
                </div>
              </Reveal>

              {CONTACT.phones.map((p, i) => (
                <Reveal key={p.tel} delay={0.05 + i * 0.02}>
                  <ContactCard
                    icon={Phone}
                    color="#1D4ED8"
                    label={`Call — ${p.region}`}
                    value={p.display}
                    href={`tel:${p.tel}`}
                    copyText={p.display}
                  />
                </Reveal>
              ))}
              <Reveal delay={0.08}>
                <ContactCard
                  icon={Mail}
                  color="#23A6E8"
                  label="Email"
                  value={CONTACT.email}
                  href={`mailto:${CONTACT.email}`}
                  copyText={CONTACT.email}
                />
              </Reveal>
              <Reveal delay={0.11}>
                <ContactCard
                  icon={MapPin}
                  color="#3AC9F5"
                  label="Office Address"
                  value={CONTACT.officeFull}
                  copyText={CONTACT.officeFull}
                />
              </Reveal>
              <Reveal delay={0.14}>
                <ContactCard
                  icon={Clock}
                  color="#1D4ED8"
                  label="Working Hours"
                  value={CONTACT.hours}
                />
              </Reveal>

              {/* Social */}
              <Reveal delay={0.17}>
                <div className="premium-card rounded-2xl p-5">
                  <div className="text-sm font-semibold text-slate-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                    Follow Us
                  </div>
                  <div className="flex gap-2.5">
                    {[
                      { icon: Facebook, href: "https://web.facebook.com/itmetasolutions", label: "Facebook", color: "#1877F2" },
                      { icon: Instagram, href: "https://www.instagram.com/itmetasolutions.pvt.ltd/", label: "Instagram", color: "#E1306C" },
                      { icon: Linkedin, href: "https://www.linkedin.com/in/mehar-abdullah-khalid-375001331/", label: "LinkedIn", color: "#0A66C2" },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all hover:scale-105 hover:shadow-md"
                        style={{ "--hover-color": s.color }}
                      >
                        <s.icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* What to include */}
              <Reveal delay={0.2}>
                <div className="premium-card rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1D4ED8]/10">
                      <Wand2 className="h-4 w-4 text-[#1D4ED8]" />
                    </div>
                    <div className="text-sm font-bold text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>
                      What to include (recommended)
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {[
                      "Brand name + industry",
                      "Target city/country and audience",
                      "Goal (leads, sales, website, branding)",
                      "Timeline + budget (if you have one)",
                      "Reference links (competitors, style)",
                    ].map((x) => (
                      <li key={x} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1D4ED8]" />
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* RIGHT: Form */}
            <Reveal delay={0.05}>
              <div className="premium-card rounded-3xl p-7 sm:p-8 shadow-xl shadow-slate-200/60">
                <div className="flex items-start justify-between gap-4 mb-7">
                  <div>
                    <h2
                      className="text-2xl font-bold text-slate-900"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Request a proposal
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      We'll reply with a scope + timeline. For urgent work, live chat is fastest.
                    </p>
                  </div>
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#1D4ED8]/10">
                    <Send className="h-5 w-5 text-[#1D4ED8]" />
                  </div>
                </div>

                {/* Service chips */}
                <div className="grid grid-cols-2 gap-2 mb-7 sm:grid-cols-4">
                  {[
                    { icon: Laptop, label: "Web" },
                    { icon: BarChart3, label: "Marketing" },
                    { icon: Search, label: "SEO" },
                    { icon: Cloud, label: "Salesforce" },
                  ].map((chip) => (
                    <div key={chip.label} className="flex items-center gap-2 rounded-xl border border-slate-100 bg-[#F1F4F9] px-3 py-2.5">
                      <chip.icon className="h-4 w-4 text-[#1D4ED8]" />
                      <span className="text-xs font-semibold text-slate-700">{chip.label}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name *" error={errors.name}>
                      <Input name="name" value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} placeholder="Your name" error={errors.name} />
                    </Field>
                    <Field label="Email *" error={errors.email}>
                      <Input type="email" name="email" value={form.email} onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))} placeholder="you@email.com" error={errors.email} />
                    </Field>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Phone Number *" error={errors.phone}>
                      <Input name="phone" value={form.phone} onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))} placeholder="+44..." error={errors.phone} />
                    </Field>
                    <Field label="Company" optional>
                      <Input name="company" value={form.company} onChange={(e) => setForm((s) => ({ ...s, company: e.target.value }))} placeholder="Business name" />
                    </Field>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
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
                    <Field label="Budget" optional>
                      <Input name="budget" value={form.budget} onChange={(e) => setForm((s) => ({ ...s, budget: e.target.value }))} placeholder="e.g., 20k – 100k" />
                    </Field>
                  </div>
                  <Field label="Project details *" error={errors.message}>
                    <TextArea name="message" value={form.message} onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))} placeholder="Tell us what you want to achieve, any links, and your timeline..." rows={5} error={errors.message} />
                  </Field>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-1">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Shield className="h-3.5 w-3.5 text-emerald-500" />
                      Your info stays private and is only used to contact you.
                    </div>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className={cx(
                        "inline-flex items-center justify-center gap-2 rounded-full bg-[#1D4ED8] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1D4ED8]/25 transition-all",
                        status === "sending" ? "opacity-50 cursor-not-allowed" : "hover:bg-[#162f8f] hover:scale-105"
                      )}
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {status === "sending" ? "Submitting..." : "Submit Request"}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>

                  {status === "success" && (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                      <div className="flex items-center gap-2 font-semibold text-emerald-800 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        Message sent successfully!
                      </div>
                      <p className="mt-1 text-xs text-emerald-700">
                        We'll contact you shortly. If urgent, live chat is fastest, or call <span className="font-semibold">{CONTACT.primaryPhone.display}</span>
                      </p>
                    </div>
                  )}
                  {status === "error" && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                      <p className="text-sm font-semibold text-red-800">
                        {errorMessage || "Failed to send message. Please try again or contact us directly."}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-3 pt-1">
                    {[
                      { icon: Briefcase, text: "Clear proposal" },
                      { icon: Shield, text: "Privacy-first" },
                      { icon: BarChart3, text: "Growth-focused" },
                    ].map((x) => (
                      <div key={x.text} className="flex items-center justify-center gap-2 rounded-xl border border-slate-100 bg-[#F1F4F9] px-3 py-2.5 text-xs font-semibold text-slate-600">
                        <x.icon className="h-3.5 w-3.5 text-[#1D4ED8]" />
                        {x.text}
                      </div>
                    ))}
                  </div>
                </form>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ==================== MAP (white) ==================== */}
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mb-10 text-center">
            <span className="kicker">Visit Our Office</span>
            <h2
              className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Find Our Office
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              {CONTACT.officeFull}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-xl shadow-slate-100">
              <div className="grid lg:grid-cols-[1fr,360px]">
                {/* Map */}
                <div className="relative min-h-[350px] sm:min-h-[450px]">
                  <iframe
                    src={`https://www.google.com/maps?q=${encodeURIComponent(CONTACT.officeFull)}&output=embed`}
                    style={{ border: 0, position: "absolute", inset: 0, width: "100%", height: "100%" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="IT Meta Solutions Office Location"
                  />
                </div>

                {/* Side panel */}
                <div className="flex flex-col gap-6 border-t border-slate-100 bg-[#F1F4F9] p-7 lg:border-l lg:border-t-0">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: "#1D4ED815" }}>
                      <MapPin className="h-5 w-5" style={{ color: "#1D4ED8" }} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>Our Office</div>
                      <div className="mt-0.5 text-sm text-slate-500 leading-relaxed">{CONTACT.officeFull}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: "#23A6E815" }}>
                      <Clock className="h-5 w-5" style={{ color: "#23A6E8" }} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>Working Hours</div>
                      <div className="mt-0.5 text-sm text-slate-500 leading-relaxed">{CONTACT.hours}</div>
                    </div>
                  </div>
                  {CONTACT.phones.map((p) => (
                    <div key={p.tel} className="flex items-start gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: "#3AC9F515" }}>
                        <Phone className="h-5 w-5" style={{ color: "#3AC9F5" }} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>Call — {p.region}</div>
                        <div className="mt-0.5 text-sm text-slate-500 leading-relaxed">{p.display}</div>
                      </div>
                    </div>
                  ))}

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.officeFull)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#1D4ED8] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#1D4ED8]/20 transition-all hover:bg-[#162f8f] hover:scale-105"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    <MapPin className="h-4 w-4" />
                    Get Directions
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ==================== SEO / FAQ (mist) ==================== */}
      <div className="bg-[#F1F4F9]">
        <SeoContentFaq content={seoContent} faqs={seoFaqs} lightTheme={true} />
      </div>
    </>
  );
}
