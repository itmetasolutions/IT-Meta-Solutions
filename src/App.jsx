import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ChevronUp } from "lucide-react";
import { HelmetProvider } from "react-helmet-async";

import Home from "./pages/main/Home";
import Services from "./pages/main/Services";
import Work from "./pages/main/Work";
import About from "./pages/main/About";
import InHomesDirectCaseStudy from "./pages/case-studies/InHomesDirectCaseStudy";
import MoreHomesGroupCaseStudy from "./pages/case-studies/MoreHomesGroupCaseStudy";
import HallaGullaCaseStudy from "./pages/case-studies/HallaGullaCaseStudy";
import UnitedMuslimTravelsCaseStudy from "./pages/case-studies/UnitedMuslimTravelsCaseStudy";
import MultidatumCaseStudy from "./pages/case-studies/MultidatumCaseStudy";
import ESahulatMartCaseStudy from "./pages/case-studies/ESahulatMartCaseStudy";
import HikmabioticsCaseStudy from "./pages/case-studies/HikmabioticsCaseStudy";
import EkommartCaseStudy from "./pages/case-studies/EkommartCaseStudy";
import SalesforceDuplicateCheckCaseStudy from "./pages/case-studies/SalesforceDuplicateCheckCaseStudy";
import SalesforceExperienceCloudGovernmentCloud from "./pages/case-studies/SalesforceExperienceCloudGovernmentCloud";
import SalesforceServiceCloudImplementation from "./pages/case-studies/SalesforceServiceCloudImplementation";
import LettingAgencyPortalCaseStudy from "./pages/case-studies/LettingAgencyPortalCaseStudy";
import ProcessPage from "./pages/main/process";
import Contact from "./pages/main/Contact";
import NotFoundPage from "./pages/main/404";
import SalesforceExpertise from "./pages/expertise/SalesforceExpertise";
import WebDevelopmentExpertise from "./pages/expertise/WebDevelopmentExpertise";
import DigitalMarketingExpertise from "./pages/expertise/DigitalMarketingExpertise";
import SocialMediaExpertise from "./pages/expertise/SocialMediaExpertise";
import GraphicDesigningExpertise from "./pages/expertise/GraphicDesigningExpertise";
import VideoEditingExpertise from "./pages/expertise/VideoEditingExpertise";
import BrandBuildingExpertise from "./pages/expertise/BrandBuildingExpertise";
import SeoExpertise from "./pages/expertise/SeoExpertise";
import CustomWebAppsExpertise from "./pages/expertise/CustomWebAppsExpertise";

import Header from "./components/Header";
import Footer from "./components/Footer";
import CursorEffect from "./components/CursorEffect";
import Container from "./components/Container";
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
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-[#5025d1] to-purple-600 text-white shadow-lg shadow-[#5025d1]/30 transition-all hover:scale-110 hover:shadow-xl hover:shadow-[#5025d1]/40"
    >
      <ChevronUp className="h-6 w-6" />
    </button>
  );
}

function App() {
  const [isMobile, setIsMobile] = useState(false);

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

  // Cursor hover-grow (works with pointer-events:none cursor)
  useEffect(() => {
    if (isMobile) return;

    const cursor = document.querySelector(".cursor-effect");
    if (!cursor) return;

    const onEnter = () => cursor.classList.add("is-hover");
    const onLeave = () => cursor.classList.remove("is-hover");

    const bind = () => {
      const targets = document.querySelectorAll(
        "a, button, input, textarea, select, [role='button'], [data-cursor='hover']"
      );
      targets.forEach((t) => {
        t.addEventListener("mouseenter", onEnter);
        t.addEventListener("mouseleave", onLeave);
      });

      return () => {
        targets.forEach((t) => {
          t.removeEventListener("mouseenter", onEnter);
          t.removeEventListener("mouseleave", onLeave);
        });
      };
    };

    const unbind = bind();

    // Re-bind after route changes / re-renders (simple)
    const mo = new MutationObserver(() => {
      // Small optimization: just ensure class removed if DOM changes
      cursor.classList.remove("is-hover");
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      unbind?.();
      mo.disconnect();
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
        <div className="floating-icons" aria-hidden="true">
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
        </div>



        <BrowserRouter>
          <ScrollToTop />
          {!isMobile && <CursorEffect />}

          <Header nav={nav} AnchorLink={AnchorLink} />

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
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          <GoToTopButton />
          <Footer nav={nav} year={year} AnchorLink={AnchorLink} Container={Container} />
        </BrowserRouter>
      </div>
    </HelmetProvider>
  );
}

export default App;
