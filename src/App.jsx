import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import PortfolioMainPage from "./pages/PortfolioMainPage";
import Services from "./pages/Services";
import Work from "./pages/Work";
import About from "./pages/About";
import InHomesDirectCaseStudy from "./pages/InHomesDirectCaseStudy";
import MoreHomesGroupCaseStudy from "./pages/MoreHomesGroupCaseStudy";
import HallaGullaCaseStudy from "./pages/HallaGullaCaseStudy";
import UnitedMuslimTravelsCaseStudy from "./pages/UnitedMuslimTravelsCaseStudy";
import MultidatumCaseStudy from "./pages/MultidatumCaseStudy";
import ESahulatMartCaseStudy from "./pages/ESahulatMartCaseStudy";
import HikmabioticsCaseStudy from "./pages/HikmabioticsCaseStudy";
import ProcessPage from "./pages/process";
import Contact from "./pages/Contact";

import Header from "./components/Header";
import Footer from "./components/Footer";
import CursorEffect from "./components/CursorEffect";
import Container from "./components/Container";

const AnchorLink = ({ href, className, children, ...props }) => (
  <a href={href} className={className} {...props}>{children}</a>
);

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const nav = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Process", href: "/process" },
    { label: "Contact", href: "/contact" },
  ];

  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <BrowserRouter>
        <ScrollToTop />
        <CursorEffect />
        <Header nav={nav} AnchorLink={AnchorLink} />
        <Routes>
          <Route path="/" element={<PortfolioMainPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/work" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/case-study/inhomes-direct" element={<InHomesDirectCaseStudy />} />
          <Route path="/case-study/more-homes-group" element={<MoreHomesGroupCaseStudy />} />
          <Route path="/case-study/halla-gulla" element={<HallaGullaCaseStudy />} />
          <Route path="/case-studies/united-muslim-travels-brand-build" element={<UnitedMuslimTravelsCaseStudy />} />
          <Route path="/case-study/esahulat-mart" element={<ESahulatMartCaseStudy />} />
          <Route path="/case-study/hikmabiotics" element={<HikmabioticsCaseStudy />} />
          <Route path="/case-study/multidatum" element={<MultidatumCaseStudy />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer nav={nav} year={year} AnchorLink={AnchorLink} Container={Container} />
      </BrowserRouter>
    </div>
  );
}

export default App;
