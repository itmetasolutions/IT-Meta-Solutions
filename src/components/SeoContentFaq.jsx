import React from "react";
import Container from "./Container";
import TechMeshBg from "./TechMeshBg";
import {
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Rocket,
  Target,
  Zap,
} from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

function FAQItem({ q, a, lightTheme }) {
  return (
    <details
      className={cx(
        "group rounded-3xl border p-6",
        lightTheme ? "border-slate-200 bg-white" : "border-white/10 bg-white/[0.04]"
      )}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
        <div className={cx("text-sm font-semibold", lightTheme ? "text-slate-900" : "text-white")}>{q}</div>
        <ChevronRight className={cx("h-4 w-4 flex-shrink-0 transition group-open:rotate-90", lightTheme ? "text-slate-400" : "text-zinc-300")} />
      </summary>
      <div className={cx("mt-3 text-sm leading-relaxed", lightTheme ? "text-slate-600" : "text-zinc-300")}>{a}</div>
    </details>
  );
}

function AttractiveVisual() {
  return (
    <div className="relative">
      {/* Header */}
      <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-wide text-zinc-200">
        <Sparkles className="h-3.5 w-3.5" />
        Why Choose Us
      </div>
      <h3 className="mt-4 text-2xl font-semibold text-white">
        Results-driven solutions
      </h3>

      {/* Visual Cards */}
      <div className="mt-6 space-y-4">
        <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1D4ED8]/20 to-blue-600/10 p-5">
          <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#1D4ED8]/20 blur-3xl transition-all duration-500 group-hover:scale-150" />
          <div className="relative flex items-start gap-4">
            <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-[#1D4ED8] to-blue-600 p-2.5">
              <Rocket className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-white">Fast Delivery</div>
              <div className="mt-1 text-sm text-zinc-400">Quick execution with clean approvals</div>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/20 to-teal-500/10 p-5">
          <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-500/20 blur-3xl transition-all duration-500 group-hover:scale-150" />
          <div className="relative flex items-start gap-4">
            <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 p-2.5">
              <Target className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-white">Performance Focus</div>
              <div className="mt-1 text-sm text-zinc-400">Every solution optimized for growth</div>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-orange-500/20 to-amber-500/10 p-5">
          <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-orange-500/20 blur-3xl transition-all duration-500 group-hover:scale-150" />
          <div className="relative flex items-start gap-4">
            <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 p-2.5">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-white">Always Innovating</div>
              <div className="mt-1 text-sm text-zinc-400">Cutting-edge solutions for modern needs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SeoContentFaq({ content, faqs, className, lightTheme = false }) {
  if (!content && !faqs?.length) return null;

  const {
    kicker = "Why We Stand Out",
    title,
    subtitle,
    paragraphs = [],
    bullets = [],
  } = content || {};

  return (
    <>
      {/* Main Section - Content Left + Attractive Visual Right */}
      <section className={cx("py-16 sm:py-24 bg-[#141A2E] relative overflow-hidden", className)}>
        <TechMeshBg variant="devtech" iconColor="#1D4ED8" iconOpacityBase={0.032} />
        <div className="absolute inset-0 hex-grid-bg opacity-35 pointer-events-none" />
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Left Side - SEO Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-wide text-zinc-200">
                <Sparkles className="h-3.5 w-3.5" />
                {kicker}
              </div>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                {title}
              </h2>
              {subtitle ? (
                <p className="mt-3 text-lg text-zinc-300">{subtitle}</p>
              ) : null}

              <div className="mt-6 space-y-4 text-zinc-300 leading-relaxed">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {bullets.length ? (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {bullets.map((b, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                      <span className="text-sm text-zinc-200">{b}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Right Side - Always Attractive Visual */}
            <AttractiveVisual />
          </div>
        </Container>
      </section>

      {/* FAQ Section - Displayed Below if FAQs exist */}
      {faqs?.length ? (
        <section className={cx("py-16 sm:py-24 border-t", lightTheme ? "bg-white border-slate-200" : "border-white/5")}>
          <Container>
            <div className={cx(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-wide",
              lightTheme ? "border-slate-200 bg-slate-50 text-slate-600" : "border-white/15 bg-white/5 text-zinc-200"
            )}>
              <Sparkles className="h-3.5 w-3.5" />
              FAQ
            </div>
            <h3 className={cx("mt-4 text-2xl font-semibold sm:text-3xl", lightTheme ? "text-slate-900" : "text-white")}>
              Common questions answered
            </h3>
            <p className={cx("mt-2", lightTheme ? "text-slate-500" : "text-zinc-400")}>Quick answers about our services and process.</p>

            <div className="mt-8 grid gap-3">
              {faqs.map((item, i) => (
                <FAQItem key={i} q={item.q} a={item.a} lightTheme={lightTheme} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}

