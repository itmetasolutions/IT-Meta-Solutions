# Mobile Overflow Bug Fix Plan

## Investigation Results
- **GradientBlob components**: Fixed widths (w-[560px]) and negative positions (left-[-140px], right-[-180px]) cause overflow on mobile.
- **Footer logo**: Fixed width w-[466px] overflows on small screens.
- **Absolute positioning**: Blobs positioned relative to body, not clipped by wrapper.

## Steps to Fix
- [ ] Add temporary debug helpers (red outlines in CSS, JS logging in App.jsx)
- [ ] Update App.jsx main wrapper to position: relative
- [ ] Fix Footer logo to responsive width
- [ ] Update GradientBlob usage in all pages to use inset-0 instead of fixed widths/negative positions
  - [ ] Work.jsx
  - [ ] UnitedMuslimTravelsCaseStudy.jsx
  - [ ] Services.jsx
  - [ ] process.jsx
  - [ ] PortfolioMainPage.jsx
  - [ ] MultidatumCaseStudy.jsx
  - [ ] MoreHomesGroupCaseStudy.jsx
  - [ ] InHomesDirectCaseStudy.jsx
  - [ ] HikmabioticsCaseStudy.jsx
  - [ ] HallaGullaCaseStudy.jsx
  - [ ] ESahulatMartCaseStudy.jsx
  - [ ] Contact.jsx
  - [ ] About.jsx
- [ ] Test on mobile to ensure no horizontal scroll
- [ ] Remove debug helpers after verification
