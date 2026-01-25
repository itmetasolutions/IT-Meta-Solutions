import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
  Code2,
  Palette,
  Megaphone,
  Target,
  CheckCircle2,
  Star,
  Quote,
  Rocket,
  Shield,
  Clock,
  Award,
  Mail,
  Phone,
  Globe,
  PlayCircle,
  ChevronRight,
  Building2,
} from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../components/Container";

/* ==================== HELPERS ==================== */

const cx = (...classes) => classes.filter(Boolean).join(" ");

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

/* ==================== COMPONENTS ==================== */

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
      style={{
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
      }}
    />
  );
}

function Badge({ children, icon: Icon }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </span>
  );
}

function SectionHeading({ badge, title, description, centered = false }) {
  return (
    <div className={cx("mb-12", centered && "text-center")}>
      {badge && (
        <div className={cx("mb-4", centered && "flex justify-center")}>
          <Badge icon={Sparkles}>{badge}</Badge>
        </div>
      )}
      <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && (
        <p className={cx("mt-4 text-lg text-zinc-300 sm:text-xl max-w-3xl", centered && "mx-auto")}>
          {description}
        </p>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, value, label, delay = 0 }) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 backdrop-blur-sm"
    >
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-3">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <div className="text-3xl font-bold text-white sm:text-4xl">{value}</div>
          <div className="mt-1 text-sm text-zinc-400">{label}</div>
        </div>
      </div>
    </motion.div>
  );
}

function ServiceCard({ service, delay = 0 }) {
  const reduced = usePrefersReducedMotion();
  const Icon = service.icon;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={reduced ? {} : { y: -8, transition: { duration: 0.2 } }}
      className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-8 backdrop-blur-sm transition-all"
    >
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-[#5025d1]/20 to-purple-600/20 blur-3xl transition-all group-hover:scale-150" />

      <div className="relative">
        <div className="inline-flex rounded-2xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-4">
          <Icon className="h-8 w-8 text-white" />
        </div>

        <h3 className="mt-6 text-2xl font-bold text-white">{service.title}</h3>
        <p className="mt-3 text-zinc-300">{service.description}</p>

        <ul className="mt-6 space-y-3">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
              <span className="text-sm text-zinc-200">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-2 text-[#5025d1] transition-all group-hover:gap-4">
          <span className="font-semibold">Learn more</span>
          <ArrowRight className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, delay = 0 }) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm transition-all hover:border-[#5025d1]/50"
    >
      {/* Image Placeholder */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#5025d1]/20 to-purple-600/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Building2 className="mx-auto h-16 w-16 text-white/40" />
            <p className="mt-3 text-sm text-white/60">Project Screenshot</p>
            <p className="mt-1 text-xs text-white/40">1200 × 800 recommended</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-3 flex items-center gap-2">
          {project.tags?.map((tag, idx) => (
            <span
              key={idx}
              className="rounded-full bg-[#5025d1]/20 px-3 py-1 text-xs font-medium text-purple-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-bold text-white">{project.title}</h3>
        <p className="mt-2 text-sm text-zinc-300">{project.description}</p>

        {project.results && (
          <div className="mt-4 grid grid-cols-2 gap-3">
            {project.results.map((result, idx) => (
              <div key={idx} className="rounded-xl bg-white/5 p-3">
                <div className="text-lg font-bold text-white">{result.value}</div>
                <div className="text-xs text-zinc-400">{result.label}</div>
              </div>
            ))}
          </div>
        )}

        {project.link && (
          <Link
            to={project.link}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#5025d1] transition-all hover:gap-4"
          >
            View case study
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

function TestimonialCard({ testimonial, delay = 0 }) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-8 backdrop-blur-sm"
    >
      <Quote className="h-12 w-12 text-[#5025d1]/30" />

      <div className="mt-4 flex gap-1">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      <p className="mt-4 text-zinc-200 leading-relaxed">{testimonial.quote}</p>

      <div className="mt-6 flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#5025d1] to-purple-600 p-0.5">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-black">
            <span className="text-lg font-bold text-white">
              {testimonial.name.charAt(0)}
            </span>
          </div>
        </div>
        <div>
          <div className="font-semibold text-white">{testimonial.name}</div>
          <div className="text-sm text-zinc-400">{testimonial.role}</div>
        </div>
      </div>
    </motion.div>
  );
}

/* ==================== DATA ==================== */

const stats = [
  { icon: Rocket, value: "50+", label: "Projects Launched" },
  { icon: Users, value: "40+", label: "Happy Clients" },
  { icon: TrendingUp, value: "200%", label: "Avg. Growth Rate" },
  { icon: Award, value: "100%", label: "Client Satisfaction" },
];

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Fast, modern websites built with cutting-edge technologies for maximum performance and conversion.",
    features: [
      "Custom responsive websites",
      "E-commerce platforms (Shopify, WooCommerce)",
      "Web applications & dashboards",
      "Performance optimization & SEO",
    ],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, user-centered designs that create memorable experiences and drive engagement.",
    features: [
      "Modern interface design",
      "Brand identity & guidelines",
      "Prototyping & wireframing",
      "User research & testing",
    ],
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Data-driven marketing strategies that generate leads, boost sales, and grow your brand.",
    features: [
      "Social media marketing",
      "Google & Meta Ads campaigns",
      "Content marketing & SEO",
      "Analytics & reporting",
    ],
  },
  {
    icon: Target,
    title: "Brand Strategy",
    description: "Complete brand building from concept to execution, creating a lasting market presence.",
    features: [
      "Brand positioning & messaging",
      "Market research & analysis",
      "Complete brand systems",
      "Growth & scaling strategies",
    ],
  },
];

const featuredProjects = [
  {
    title: "IN HOMES DIRECT",
    description: "E-commerce platform with custom pricing calculator and real-time inventory management.",
    tags: ["Shopify", "E-commerce"],
    results: [
      { value: "300%", label: "Sales Increase" },
      { value: "2.5s", label: "Load Time" },
    ],
    link: "/case-study/inhomes-direct",
  },
  {
    title: "Halla Gulla Travel",
    description: "Complete brand build with website, social media, and Meta Ads generating 67 qualified leads.",
    tags: ["Branding", "Marketing"],
    results: [
      { value: "67", label: "Qualified Leads" },
      { value: "4.2x", label: "ROAS" },
    ],
    link: "/case-study/halla-gulla",
  },
  {
    title: "E Sahulat Mart",
    description: "Full e-commerce brand setup with integrated social media and advertising campaigns.",
    tags: ["E-commerce", "Social"],
    results: [
      { value: "2L+", label: "PKR Sales" },
      { value: "150+", label: "Orders" },
    ],
    link: "/case-study/esahulat-mart",
  },
];

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "CEO, E-commerce Store",
    rating: 5,
    quote: "Our online sales tripled within 3 months. The website is beautiful, fast, and our customers love it. Best investment we've made!",
  },
  {
    name: "Michael Chen",
    role: "Marketing Director",
    rating: 5,
    quote: "The team's strategic approach to digital marketing transformed our online presence. We're now generating consistent leads every week.",
  },
  {
    name: "Fatima Khan",
    role: "Business Owner",
    rating: 5,
    quote: "Professional, responsive, and results-driven. They built our complete brand from scratch and the results speak for themselves.",
  },
];

/* ==================== PAGE ==================== */

export default function Home() {
  const reduced = usePrefersReducedMotion();
  const { scrollY } = useScroll();

  // Parallax effects
  const heroY = useTransform(scrollY, [0, 500], [0, reduced ? 0 : 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      data.services = formData.getAll('services');

      const payload = {
        ...data,
        createdAt: new Date().toISOString(),
        source: "home-page",
      };

      const res = await fetch("https://it-meta-solutions.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
      e.target.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <>
      <Helmet>
        <title>IT Meta Solutions - Premium Web Development & Digital Marketing</title>
        <meta
          name="description"
          content="Transform your business with high-converting websites, strategic digital marketing, and stunning design. Trusted by 40+ businesses worldwide."
        />
        <link rel="canonical" href="https://itmetasolutions.com/" />
      </Helmet>

      <div className="relative min-h-screen overflow-hidden">
        <ScrollProgress />

        {/* Background Elements */}
        <GradientBlob className="left-0 top-0 h-[600px] w-[600px]" color="rgba(80,37,209,0.2)" />
        <GradientBlob className="right-0 top-1/4 h-[800px] w-[800px]" color="rgba(186,85,211,0.15)" />
        <GradientBlob className="bottom-0 left-1/3 h-[700px] w-[700px]" color="rgba(80,37,209,0.18)" />

        {/* ==================== HERO SECTION ==================== */}
        <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24">
          <Container>
            <motion.div
              style={{ y: heroY, opacity: heroOpacity }}
              className="mx-auto max-w-5xl text-center"
            >
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={reduced ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge icon={Zap}>Trusted by 40+ businesses worldwide</Badge>
              </motion.div>

              <motion.h1
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={reduced ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-8 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
              >
                Build. Grow. Dominate.
                <br />
                <span className="bg-gradient-to-r from-[#5025d1] via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Your Digital Success
                </span>
              </motion.h1>

              <motion.p
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={reduced ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 text-xl text-zinc-300 sm:text-2xl max-w-3xl mx-auto"
              >
                We craft high-converting websites, launch powerful marketing campaigns, and build brands that stand out. Let's turn your vision into reality.
              </motion.p>

              <motion.div
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={reduced ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center"
              >
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#5025d1] to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-[#5025d1]/50 transition-all hover:shadow-xl hover:shadow-[#5025d1]/60 hover:scale-105"
                >
                  Start Your Project
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/work"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30"
                >
                  <PlayCircle className="h-5 w-5" />
                  View Our Work
                </Link>
              </motion.div>

              <motion.div
                initial={reduced ? false : { opacity: 0 }}
                animate={reduced ? {} : { opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-400"
              >
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-400" />
                  <span>100% Satisfaction Guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-400" />
                  <span>On-Time Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-400" />
                  <span>Award-Winning Design</span>
                </div>
              </motion.div>
            </motion.div>
          </Container>
        </section>

        {/* ==================== STATS SECTION ==================== */}
        <section className="py-16 sm:py-24">
          <Container>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} delay={index * 0.1} />
              ))}
            </div>
          </Container>
        </section>

        {/* ==================== SERVICES SECTION ==================== */}
        <section className="py-16 sm:py-24">
          <Container>
            <SectionHeading
              badge="What We Do"
              title={
                <>
                  Services That Drive
                  <br />
                  <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                    Real Results
                  </span>
                </>
              }
              description="From concept to execution, we deliver complete digital solutions tailored to your business goals."
              centered
            />

            <div className="grid gap-8 md:grid-cols-2">
              {services.map((service, index) => (
                <ServiceCard key={index} service={service} delay={index * 0.1} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-lg font-semibold text-[#5025d1] transition-all hover:gap-4"
              >
                Explore All Services
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          </Container>
        </section>

        {/* ==================== FEATURED PROJECTS ==================== */}
        <section className="py-16 sm:py-24">
          <Container>
            <SectionHeading
              badge="Our Work"
              title={
                <>
                  Projects We're
                  <br />
                  <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                    Proud Of
                  </span>
                </>
              }
              description="Real businesses, real results. See how we've helped brands grow and succeed."
              centered
            />

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={index} project={project} delay={index * 0.1} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/work"
                className="inline-flex items-center gap-2 text-lg font-semibold text-[#5025d1] transition-all hover:gap-4"
              >
                View All Projects
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          </Container>
        </section>

        {/* ==================== TESTIMONIALS ==================== */}
        <section className="py-16 sm:py-24">
          <Container>
            <SectionHeading
              badge="Testimonials"
              title={
                <>
                  Loved by Businesses
                  <br />
                  <span className="bg-gradient-to-r from-[#5025d1] to-purple-500 bg-clip-text text-transparent">
                    Around the World
                  </span>
                </>
              }
              description="Don't just take our word for it. Here's what our clients say about working with us."
              centered
            />

            <div className="grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} delay={index * 0.1} />
              ))}
            </div>
          </Container>
        </section>

        {/* ==================== CTA SECTION ==================== */}
        <section className="py-16 sm:py-24">
          <Container>
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={reduced ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#5025d1]/20 to-purple-600/20 p-12 backdrop-blur-sm sm:p-16"
            >
              <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#5025d1]/30 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-600/30 blur-3xl" />

              <div className="relative mx-auto max-w-3xl text-center">
                <h2 className="text-4xl font-bold text-white sm:text-5xl">
                  Ready to Transform Your Business?
                </h2>
                <p className="mt-6 text-xl text-zinc-300">
                  Let's create something amazing together. Get in touch and let's discuss your project.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-[#5025d1] shadow-lg transition-all hover:scale-105"
                  >
                    Get Started Now
                    <ArrowRight className="h-5 w-5" />
                  </Link>

                  <a
                    href="tel:+923271804037"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
                  >
                    <Phone className="h-5 w-5" />
                    Call Us Now
                  </a>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* ==================== CONTACT FORM ==================== */}
        <section className="py-16 sm:py-24" id="contact">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Left Column - Info */}
              <div>
                <SectionHeading
                  badge="Get in Touch"
                  title="Let's Start a Conversation"
                  description="Have a project in mind? We'd love to hear about it. Send us a message and we'll respond within 24 hours."
                />

                <div className="mt-8 space-y-4 sm:space-y-6">
                  <a
                    href="mailto:info@itmetasolutions.com"
                    className="flex items-center gap-3 sm:gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-sm transition-all hover:bg-white/10"
                  >
                    <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-2 sm:p-3">
                      <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs sm:text-sm text-zinc-400">Email</div>
                      <div className="font-semibold text-white text-sm sm:text-base break-words">info@itmetasolutions.com</div>
                    </div>
                  </a>

                  <a
                    href="tel:+923271804037"
                    className="flex items-center gap-3 sm:gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-sm transition-all hover:bg-white/10"
                  >
                    <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-2 sm:p-3">
                      <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs sm:text-sm text-zinc-400">Phone / WhatsApp</div>
                      <div className="font-semibold text-white text-sm sm:text-base">+92 327 180 4037</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 sm:gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-sm">
                    <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-[#5025d1] to-purple-600 p-2 sm:p-3">
                      <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs sm:text-sm text-zinc-400">Website</div>
                      <div className="font-semibold text-white text-sm sm:text-base break-words">www.itmetasolutions.com</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <motion.div
                initial={reduced ? false : { opacity: 0, x: 20 }}
                whileInView={reduced ? {} : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-8 backdrop-blur-sm"
              >
                <h3 className="text-2xl font-bold text-white">Send us a message</h3>
                <p className="mt-2 text-zinc-400">Fill out the form and we'll get back to you shortly.</p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={cx(
                        "mt-2 w-full rounded-xl border bg-white/5 px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2",
                        errors.name ? "border-red-500 focus:ring-red-500" : "border-white/10 focus:ring-[#5025d1]"
                      )}
                      placeholder="Your name"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-white">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={cx(
                          "mt-2 w-full rounded-xl border bg-white/5 px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2",
                          errors.email ? "border-red-500 focus:ring-red-500" : "border-white/10 focus:ring-[#5025d1]"
                        )}
                        placeholder="you@example.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={cx(
                          "mt-2 w-full rounded-xl border bg-white/5 px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2",
                          errors.phone ? "border-red-500 focus:ring-red-500" : "border-white/10 focus:ring-[#5025d1]"
                        )}
                        placeholder="+92 XXX XXXXXXX"
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white">Services Needed</label>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {["Website", "E-commerce", "Branding", "Marketing", "SEO", "Social Media", "Salesforce", "Video Editing"].map((service) => (
                        <label key={service} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="services"
                            value={service}
                            className="h-5 w-5 rounded border-white/20 bg-white/5 text-[#5025d1] focus:ring-[#5025d1]"
                          />
                          <span className="text-sm text-zinc-300">{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white">Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={4}
                      className={cx(
                        "mt-2 w-full rounded-xl border bg-white/5 px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 resize-none",
                        errors.message ? "border-red-500 focus:ring-red-500" : "border-white/10 focus:ring-[#5025d1]"
                      )}
                      placeholder="Tell us about your project..."
                    />
                    {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className={cx(
                      "w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5025d1] to-purple-600 px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all",
                      status === "sending" ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl hover:scale-105"
                    )}
                  >
                    {status === "sending" ? "Sending..." : "Send Message"}
                    <ArrowRight className="h-5 w-5" />
                  </button>

                  {status === "success" && (
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-400">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-semibold">Message sent successfully!</span>
                      </div>
                      <p className="mt-1 text-sm">We'll get back to you within 24 hours.</p>
                    </div>
                  )}

                  {status === "error" && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
                      <p className="font-semibold">Failed to send message. Please try again or contact us directly.</p>
                    </div>
                  )}
                </form>
              </motion.div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
