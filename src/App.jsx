import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ChevronUp } from "lucide-react";
import { HelmetProvider } from "react-helmet-async";

const Home = lazy(() => import("./pages/main/Home"));
const Services = lazy(() => import("./pages/main/Services"));
const Work = lazy(() => import("./pages/main/Work"));
const About = lazy(() => import("./pages/main/About"));
const InHomesDirectCaseStudy = lazy(() => import("./pages/case-studies/InHomesDirectCaseStudy"));
const MoreHomesGroupCaseStudy = lazy(() => import("./pages/case-studies/MoreHomesGroupCaseStudy"));
const HallaGullaCaseStudy = lazy(() => import("./pages/case-studies/HallaGullaCaseStudy"));
const UnitedMuslimTravelsCaseStudy = lazy(() => import("./pages/case-studies/UnitedMuslimTravelsCaseStudy"));
const MultidatumCaseStudy = lazy(() => import("./pages/case-studies/MultidatumCaseStudy"));
const ESahulatMartCaseStudy = lazy(() => import("./pages/case-studies/ESahulatMartCaseStudy"));
const HikmabioticsCaseStudy = lazy(() => import("./pages/case-studies/HikmabioticsCaseStudy"));
const EkommartCaseStudy = lazy(() => import("./pages/case-studies/EkommartCaseStudy"));
const SalesforceDuplicateCheckCaseStudy = lazy(() => import("./pages/case-studies/SalesforceDuplicateCheckCaseStudy"));
const SalesforceExperienceCloudGovernmentCloud = lazy(() => import("./pages/case-studies/SalesforceExperienceCloudGovernmentCloud"));
const SalesforceServiceCloudImplementation = lazy(() => import("./pages/case-studies/SalesforceServiceCloudImplementation"));
const LettingAgencyPortalCaseStudy = lazy(() => import("./pages/case-studies/LettingAgencyPortalCaseStudy"));
const ShenCoinCaseStudy = lazy(() => import("./pages/case-studies/ShenCoinCaseStudy"));
const ProcessPage = lazy(() => import("./pages/main/process"));
const Contact = lazy(() => import("./pages/main/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/main/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/main/TermsAndConditions"));
const NotFoundPage = lazy(() => import("./pages/main/404"));
const SalesforceExpertise = lazy(() => import("./pages/expertise/SalesforceExpertise"));
const WebDevelopmentExpertise = lazy(() => import("./pages/expertise/WebDevelopmentExpertise"));
const DigitalMarketingExpertise = lazy(() => import("./pages/expertise/DigitalMarketingExpertise"));
const SocialMediaExpertise = lazy(() => import("./pages/expertise/SocialMediaExpertise"));
const GraphicDesigningExpertise = lazy(() => import("./pages/expertise/GraphicDesigningExpertise"));
const VideoEditingExpertise = lazy(() => import("./pages/expertise/VideoEditingExpertise"));
const BrandBuildingExpertise = lazy(() => import("./pages/expertise/BrandBuildingExpertise"));
const SeoExpertise = lazy(() => import("./pages/expertise/SeoExpertise"));
const CustomWebAppsExpertise = lazy(() => import("./pages/expertise/CustomWebAppsExpertise"));
const Footer = lazy(() => import("./components/Footer"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));

import Header from "./components/Header";
import CursorEffect from "./components/CursorEffect";
import Container from "./components/Container";
import LiveChat from "./components/LiveChat";
import codeIcon from "./assets/img/Code.png";
import rocketIcon from "./assets/img/Rocket.png";
import sparkleIcon from "./assets/img/sparkle.png";
import globeIcon from "./assets/img/globe.png";
import orbPng from "./assets/img/orb.png";


const AnchorLink = ({ href, className, children, ...props }) => (
  <a href={href} className={className} {...props}>
    {children}
  </a>
);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function GoToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Go to top"
      className="fixed bottom-24 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-[#1D4ED8] to-blue-600 text-white shadow-lg shadow-[#1D4ED8]/30 transition-all hover:scale-110 hover:shadow-xl hover:shadow-[#1D4ED8]/40"
    >
      <ChevronUp className="h-6 w-6" />
    </button>
  );
}

function DeferredFooter(props) {
  const ref = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      const timer = window.setTimeout(() => setShouldRender(true), 1200);
      return () => window.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "1200px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {shouldRender && (
        <Suspense fallback={null}>
          <Footer {...props} />
        </Suspense>
      )}
    </div>
  );
}

function App() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  const nav = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Process", href: "/process" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const year = new Date().getFullYear();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll-reveal: observe .fade-up / .reveal* elements site-wide, including lazy-loaded
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".fade-up,.reveal,.reveal-left,.reveal-right,.reveal-scale")
        .forEach(el => el.classList.add("in-view"));
      return;
    }

    const SELECTORS = ".fade-up,.reveal,.reveal-left,.reveal-right,.reveal-scale";

    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("in-view"); io.unobserve(e.target); }
      }),
      { threshold: 0.10, rootMargin: "0px 0px -40px 0px" }
    );

    const observed = new WeakSet();
    const observe = (root) => {
      (root.querySelectorAll ? root.querySelectorAll(SELECTORS) : []).forEach(el => {
        if (!observed.has(el)) { observed.add(el); io.observe(el); }
      });
    };

    observe(document);

    const mo = new MutationObserver(mutations =>
      mutations.forEach(m => m.addedNodes.forEach(node => {
        if (node.nodeType === 1) observe(node);
      }))
    );
    mo.observe(document.body, { childList: true, subtree: true });

    return () => { io.disconnect(); mo.disconnect(); };
  }, []);

  // Cursor hover-grow via event delegation — single pair of listeners on document
  useEffect(() => {
    if (isMobile) return;

    const cursor = document.querySelector(".cursor-effect");
    if (!cursor) return;

    const SELECTORS = "a, button, input, textarea, select, [role='button'], [data-cursor='hover']";

    const onOver = (e) => {
      if (e.target.closest(SELECTORS)) cursor.classList.add("is-hover");
    };
    const onOut = (e) => {
      if (e.target.closest(SELECTORS)) cursor.classList.remove("is-hover");
    };

    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });

    return () => {
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [isMobile]);

  return (
    <HelmetProvider>
      <div className="bg-stage min-h-screen w-full overflow-x-hidden relative">
        {/* Background layers (global) */}
        <div className="bg-grid" />
        <div className="bg-scan" />
        <div className="bg-noise" />

        {/* Floating icons layer (put icons in /public/icons/) */}
        {/* Floating icons layer */}
        {!isMobile && <div className="floating-icons" aria-hidden="true">
          <img
            className="icon small"
            style={{ top: "12%", left: "10%", animationDelay: "0s" }}
            src={codeIcon}
            alt=""
          />
          <img
            className="icon"
            style={{ top: "22%", left: "78%", animationDelay: "2.5s" }}
            src={rocketIcon}
            alt=""
          />
          <img
            className="icon big"
            style={{ top: "66%", left: "14%", animationDelay: "6s" }}
            src={sparkleIcon}
            alt=""
          />
          <img
            className="icon"
            style={{ top: "78%", left: "82%", animationDelay: "9s" }}
            src={globeIcon}
            alt=""
          />

          {/* Optional orb */}
          <img
            className="icon big"
            src={orbPng}
            alt=""
            style={{
              top: "40%",
              left: "45%",
              transform: "translate(-50%, -50%)",
              animationDelay: "4s",
              opacity: 0.08,
            }}
          />
        </div>}



        <BrowserRouter>
          <ScrollToTop />

          <SiteRoutes nav={nav} year={year} isMobile={isMobile} />
        </BrowserRouter>
      </div>
    </HelmetProvider>
  );
}

function SiteRoutes({ nav, year, isMobile }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && !isMobile && <CursorEffect />}
      {!isAdminRoute && <Header nav={nav} AnchorLink={AnchorLink} />}

      <Suspense fallback={<div className="min-h-screen" />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/work" element={<Work />} />
        <Route path="/about" element={<About />} />
        <Route path="/case-study/inhomes-direct" element={<InHomesDirectCaseStudy />} />
        <Route path="/case-study/more-homes-group" element={<MoreHomesGroupCaseStudy />} />
        <Route path="/case-study/halla-gulla" element={<HallaGullaCaseStudy />} />
        <Route path="/case-studies/united-muslim-travels-brand-build" element={<UnitedMuslimTravelsCaseStudy />} />
        <Route path="/case-study/esahulat-mart" element={<ESahulatMartCaseStudy />} />
        <Route path="/case-study/hikmabiotics" element={<HikmabioticsCaseStudy />} />
        <Route path="/case-study/ekommart" element={<EkommartCaseStudy />} />
        <Route path="/case-study/multidatum" element={<MultidatumCaseStudy />} />
        <Route path="/case-study/salesforce-duplicate-check" element={<SalesforceDuplicateCheckCaseStudy />} />
        <Route path="/case-study/salesforce-experience-cloud-government-cloud" element={<SalesforceExperienceCloudGovernmentCloud />} />
        <Route path="/case-study/salesforce-service-cloud-implementation" element={<SalesforceServiceCloudImplementation />} />
        <Route path="/case-study/letting-agency-portal" element={<LettingAgencyPortalCaseStudy />} />
        <Route path="/case-study/shencoin" element={<ShenCoinCaseStudy />} />
        <Route path="/salesforce-expertise" element={<SalesforceExpertise />} />
        <Route path="/web-development-expertise" element={<WebDevelopmentExpertise />} />
        <Route path="/digital-marketing-expertise" element={<DigitalMarketingExpertise />} />
        <Route path="/social-media-expertise" element={<SocialMediaExpertise />} />
        <Route path="/graphic-designing-expertise" element={<GraphicDesigningExpertise />} />
        <Route path="/video-editing-expertise" element={<VideoEditingExpertise />} />
        <Route path="/brand-building-expertise" element={<BrandBuildingExpertise />} />
        <Route path="/seo-expertise" element={<SeoExpertise />} />
        <Route path="/custom-web-apps-expertise" element={<CustomWebAppsExpertise />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </Suspense>

      {!isAdminRoute && <GoToTopButton />}
      {!isAdminRoute && <LiveChat />}
      {!isAdminRoute && (
        <DeferredFooter nav={nav} year={year} AnchorLink={AnchorLink} Container={Container} />
      )}
    </>
  );
}

export default App;

