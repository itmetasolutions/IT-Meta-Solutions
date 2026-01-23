import React, { useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Copy,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Globe2,
  MessageSquareText,
  Building2,
} from "lucide-react";

/**
 * CONTACT PAGE + FORM (client-side)
 * - Dark/glass/gradient theme matching your other pages
 * - Contact info: phone, email, address
 * - Convincing copy + trust cards
 * - Form validation + success UI
 * - "mailto:" + "tel:" quick actions
 *
 * ✅ This form currently simulates submission (no backend).
 * To connect backend:
 * - Replace `submitContact()` with fetch("/api/contact", { method:"POST", body: JSON.stringify(payload) })
 * - Or integrate EmailJS / Formspree / custom Node API
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

function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
      <Sparkles className="h-3.5 w-3.5 opacity-80" />
      {children}
    </span>
  );
}

function Divider() {
  return <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />;
}

function SectionTitle({ kicker, title, desc, align = "left" }) {
  return (
    <div className={cx("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
        <Sparkles className="h-3.5 w-3.5" />
        {kicker}
      </div>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h1>
      <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">{desc}</p>
    </div>
  );
}

function InfoCard({ icon: Icon, label, value, actionLabel, actionHref, copyText }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/5">
              <Icon className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-zinc-400">{label}</div>
              <div className="mt-1 text-sm font-semibold text-white break-words">{value}</div>
              {actionHref ? (
                <a
                  href={actionHref}
                  className="mt-3 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:opacity-90"
                >
                  {actionLabel} <ArrowRight className="h-4 w-4" />
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
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200 hover:bg-white/10"
              aria-label="Copy"
            >
              <Copy className="h-4 w-4" />
              {copied ? "Copied" : "Copy"}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, placeholder, error, type = "text" }) {
  return (
    <label className="block">
      <div className="mb-2 text-xs font-semibold text-white">{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cx(
          "w-full rounded-2xl border bg-zinc-950/40 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none",
          error ? "border-red-500/60 focus:border-red-500/70" : "border-white/10 focus:border-white/20"
        )}
      />
      {error ? <div className="mt-2 text-xs text-red-300">{error}</div> : null}
    </label>
  );
}

function Select({ label, value, onChange, options, error }) {
  return (
    <label className="block">
      <div className="mb-2 text-xs font-semibold text-white">{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cx(
          "w-full rounded-2xl border bg-zinc-950/40 px-4 py-3 text-sm text-zinc-100 outline-none",
          error ? "border-red-500/60 focus:border-red-500/70" : "border-white/10 focus:border-white/20"
        )}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-zinc-950">
            {o.label}
          </option>
        ))}
      </select>
      {error ? <div className="mt-2 text-xs text-red-300">{error}</div> : null}
    </label>
  );
}

function TextArea({ label, value, onChange, placeholder, error }) {
  return (
    <label className="block">
      <div className="mb-2 text-xs font-semibold text-white">{label}</div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={6}
        className={cx(
          "w-full resize-none rounded-2xl border bg-zinc-950/40 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none",
          error ? "border-red-500/60 focus:border-red-500/70" : "border-white/10 focus:border-white/20"
        )}
      />
      {error ? <div className="mt-2 text-xs text-red-300">{error}</div> : null}
    </label>
  );
}

function TrustItem({ title, desc }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5">
          <BadgeCheck className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-white">{title}</div>
          <div className="mt-1 text-sm text-zinc-300">{desc}</div>
        </div>
      </div>
    </div>
  );
}

async function submitContact(payload) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return response;
}

export default function ContactPage() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const heroRef = useRef(null);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 650], [0, -50]);
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0.9]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "meta",
    budget: "50k",
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
    if (!form.message.trim() || form.message.trim().length < 20)
      e.message = "Please describe your requirements (min 20 characters).";
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
      const payload = {
        ...form,
        createdAt: new Date().toISOString(),
        source: "contact-page",
      };
      const res = await submitContact(payload);
      if (!res?.ok) {
        const errorData = await res.json().catch(() => ({ error: "Failed to send message" }));
        throw new Error(errorData.error || "Failed to send message");
      }
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", company: "", service: "meta", budget: "50k", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message || "Something went wrong. Please try again or WhatsApp us directly.");
    }
  };

  return (
    <div className="min-h-screen text-zinc-100 mb-16">
      <ScrollProgress />

      {/* Background accents */}
      <GradientBlob className="left-[-140px] top-[-140px] h-[560px] w-[560px]" />
      <GradientBlob className="right-[-180px] top-[240px] h-[560px] w-[560px] bg-[radial-gradient(closest-side,rgba(16,185,129,0.5),rgba(16,185,129,0))]" />

      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden">
        <Container className="pb-10 pt-16 sm:pb-16 sm:pt-24">
          <motion.div style={{ y: heroY, opacity: heroOpacity }}>
            <Reveal>
              <div className="flex flex-wrap items-center gap-2">
                <Pill>Fast response</Pill>
                <Pill>WhatsApp-friendly</Pill>
                <Pill>Clear proposals</Pill>
                <Pill>Global markets</Pill>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <SectionTitle
                kicker="Contact"
                title="Let’s build your website, brand, and growth system"
                desc="Share your goals and budget range — we’ll respond with a clear plan and next steps. For urgent work, WhatsApp/call is fastest."
              />
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Phone / WhatsApp</div>
                      <div className="text-sm text-zinc-300">03271804037</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Email</div>
                      <div className="text-sm text-zinc-300">info@itmetasolutions.com</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Office</div>
                      <div className="text-sm text-zinc-300">Ameer Chowk, Lahore</div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </motion.div>
        </Container>
      </section>

      <Container>
        <Divider />
      </Container>

      {/* CONTENT */}
      <section className="pb-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left: Contact info + trust */}
            <div className="grid gap-4">
              <Reveal delay={0.05}>
                <InfoCard
                  icon={Phone}
                  label="Call / WhatsApp"
                  value="03271804037"
                  actionLabel="Call now"
                  actionHref="tel:03271804037"
                  copyText="03271804037"
                />
              </Reveal>

              <Reveal delay={0.08}>
                <InfoCard
                  icon={Mail}
                  label="Email"
                  value="info@itmetasolutions.com"
                  actionLabel="Send email"
                  actionHref="mailto:info@itmetasolutions.com"
                  copyText="info@itmetasolutions.com"
                />
              </Reveal>

              <Reveal delay={0.11}>
                <InfoCard
                  icon={MapPin}
                  label="Office address"
                  value="26A Office No F1, 1st Floor, PCSIR Society Block A, Ameer Chowk, Lahore"
                  actionLabel="Open maps"
                  actionHref="#"
                  copyText="26A Office No F1, 1st Floor, PCSIR Society Block A, Ameer Chowk, Lahore"
                />
              </Reveal>

              <Reveal delay={0.14}>
                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-emerald-400/10 p-6">
                  <div className="flex items-start gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white">What happens after you submit?</div>
                      <div className="mt-1 text-sm text-zinc-300">
                        We review your request and respond with a short plan: recommended service mix, timeline, and a clear next step.
                      </div>

                      <div className="mt-4 grid gap-3">
                        <TrustItem title="Quick reply" desc="We respond fast on WhatsApp and email." />
                        <TrustItem title="Clear scope" desc="You get deliverables — not vague promises." />
                        <TrustItem title="Global experience" desc="Pakistan, Canada, UK, USA market experience." />
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <div className="flex items-start gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5">
                      <Globe2 className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white">Preferred details to share</div>
                      <ul className="mt-3 space-y-2 text-sm text-zinc-200">
                        {[
                          "Your business/brand name + industry",
                          "Target city/country and audience",
                          "Goal (leads, sales, website, branding)",
                          "Budget range (monthly/one-time)",
                          "Any reference links (competitors, style)",
                        ].map((x, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <BadgeCheck className="h-4 w-4 text-emerald-300" />
                            <span className="opacity-90">{x}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: Form */}
            <Reveal delay={0.06}>
              <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-white">Send a message</div>
                    <div className="mt-1 text-sm text-zinc-300">
                      Fill the form and we’ll get back with a plan.
                    </div>
                  </div>
                  <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5">
                    <MessageSquareText className="h-5 w-5" />
                  </div>
                </div>

                <form onSubmit={onSubmit} className="mt-6 grid gap-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input
                      label="Full name"
                      value={form.name}
                      onChange={(v) => setForm((s) => ({ ...s, name: v }))}
                      placeholder="Your name"
                      error={errors.name}
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={(v) => setForm((s) => ({ ...s, email: v }))}
                      placeholder="you@email.com"
                      error={errors.email}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Input
                      label="Phone / WhatsApp"
                      value={form.phone}
                      onChange={(v) => setForm((s) => ({ ...s, phone: v }))}
                      placeholder="+92..."
                      error={errors.phone}
                    />
                    <Input
                      label="Company (optional)"
                      value={form.company}
                      onChange={(v) => setForm((s) => ({ ...s, company: v }))}
                      placeholder="Business name"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Select
                      label="Service needed"
                      value={form.service}
                      onChange={(v) => setForm((s) => ({ ...s, service: v }))}
                      error={errors.service}
                      options={[
                        { value: "meta", label: "Meta Ads (Leads/Sales)" },
                        { value: "tiktok", label: "TikTok Ads" },
                        { value: "google", label: "Google Ads" },
                        { value: "web", label: "Website / E-commerce" },
                        { value: "social", label: "Social Media Management" },
                        { value: "brand", label: "Brand Building" },
                        { value: "design", label: "Graphic Design" },
                        { value: "video", label: "Video Editing" },
                        { value: "other", label: "Other / Not sure" },
                      ]}
                    />
                    <Select
                      label="Budget range"
                      value={form.budget}
                      onChange={(v) => setForm((s) => ({ ...s, budget: v }))}
                      options={[
                        { value: "20k", label: "Under 20k PKR" },
                        { value: "50k", label: "20k – 50k PKR" },
                        { value: "100k", label: "50k – 100k PKR" },
                        { value: "200k", label: "100k – 200k PKR" },
                        { value: "custom", label: "Custom / Discuss" },
                      ]}
                    />
                  </div>

                  <TextArea
                    label="Project details"
                    value={form.message}
                    onChange={(v) => setForm((s) => ({ ...s, message: v }))}
                    placeholder="Tell us what you want to achieve, any links, and your timeline..."
                    error={errors.message}
                  />

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs text-zinc-400 flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4" />
                      Your info stays private and is only used to contact you.
                    </div>

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className={cx(
                        "inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:opacity-90",
                        status === "sending" && "opacity-60 cursor-not-allowed"
                      )}
                    >
                      {status === "sending" ? (
                        <>
                          Sending <Send className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Send message <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>

                  {status === "sent" ? (
                    <div className="mt-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-200">
                      <div className="flex items-center gap-2 font-semibold">
                        <CheckCircle2 className="h-5 w-5" />
                        Message sent successfully!
                      </div>
                      <div className="mt-1 text-emerald-200/90">
                        We’ll contact you shortly. If urgent, WhatsApp is fastest: <span className="text-white font-semibold">03271804037</span>
                      </div>
                    </div>
                  ) : null}

                  {status === "error" ? (
                    <div className="mt-2 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200">
                      {errorMessage}
                    </div>
                  ) : null}
                </form>

                <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white">Office hours</div>
                      <div className="mt-1 text-sm text-zinc-300">
                        Monday – Saturday • 06:00 AM – 12:00 AM (PKT)
                      </div>
                      <div className="mt-3 text-xs text-zinc-400">
                        (You can change this text anytime.)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>


        </Container>
      </section>
    </div>
  );
}
