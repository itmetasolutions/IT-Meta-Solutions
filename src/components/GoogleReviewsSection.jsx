import { useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquareQuote } from "lucide-react";
import Container from "./Container";

const WIDGET_SRC = "https://elfsightcdn.com/platform.js";
const APP_ID = "416e46d0-c7c1-4638-bce7-268a149545f7";

export default function GoogleReviewsSection({
  title = "Google Reviews",
  description = "Read public Google reviews directly from our live review widget.",
}) {
  useEffect(() => {
    const existingScript = document.querySelector('script[data-elfsight-google-reviews="true"]');
    if (existingScript) return undefined;

    const script = document.createElement("script");
    script.src = WIDGET_SRC;
    script.async = true;
    script.setAttribute("data-elfsight-google-reviews", "true");
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        script.remove();
      }
    };
  }, []);

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-gradient-to-br from-black/60 via-[#12091f]/80 to-black/70 p-6 backdrop-blur-sm sm:p-8 lg:p-10"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-[#5025d1]/15 blur-3xl" />
          <div className="absolute -left-10 bottom-10 h-36 w-36 rounded-full bg-[#4285f4]/10 blur-3xl" />
          <div className="absolute -right-10 top-16 h-40 w-40 rounded-full bg-pink-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl border-b border-white/10 pb-8 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white">
                <MessageSquareQuote className="h-4 w-4" />
                Google Reviews
              </div>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-300 sm:text-lg">
                {description}
              </p>
            </div>

            <div className="mt-8 mx-auto max-w-[1120px] overflow-hidden rounded-[1.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
              <div className={`elfsight-app-${APP_ID}`} data-elfsight-app-lazy />
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
