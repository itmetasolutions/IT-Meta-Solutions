import type { Project } from "./types";

// Seeded from the actual case-study copy already live on itmetasolutions.com
// (not the boilerplate summaries that were drifting on the old Work/Home
// pages). Numeric results are only shown where a project genuinely has
// concrete figures; everything else stays qualitative rather than invented.
//
// Real product screenshots don't exist yet for any of these six, so every
// `images` entry here is curated stock (verified working Unsplash URLs,
// each isPlaceholder: true) chosen to match the project's real industry —
// never a fabricated "screenshot" standing in for actual client work.
// Swap in real screenshots as they become available; that's the only thing
// `images` needs updating for.

export const projects: Project[] = [
  {
    slug: "inhomes-direct",
    title: "InHomes Direct",
    year: 2025,
    client: "InHomes Direct",
    category: ["E-Commerce", "Shopify", "UX", "Development"],
    summary:
      "A UK home-improvement retailer selling flooring, worktops, tiles, beds, doors and lighting — categories where a standard product page can't handle area-based pricing or survey-led quotes.",
    challenge:
      "Packs-vs-area conversion, worktop pricing based on survey measurements, mixed unit types across categories, and category-specific shipping and returns rules — none of it served well by out-of-the-box Shopify templates.",
    solution:
      "Custom-coded real-time calculators (area to packs, automatic round-up), conditional product templates per category, and category-aware policy display — built without relying on paid calculator apps.",
    results: [
      { label: "App dependency", value: "Zero paid calculator apps", verified: true },
      { label: "Ordering confidence", value: "Higher", verified: false },
      { label: "Policy clarity", value: "Improved", verified: false },
    ],
    themeColor: "#1D4ED8",
    themeColorSoft: "#E9EEFC",
    logo: "/brand/clients/inhomes-direct.webp",
    images: [
      {
        src: "https://images.unsplash.com/photo-1604039619887-415341e31b58?q=80&w=1600&auto=format&fit=crop",
        alt: "Brown wooden parquet flooring inside a home",
        kind: "hero",
        isPlaceholder: true,
      },
    ],
    stack: ["Shopify", "Liquid", "Custom JS calculators", "On-page SEO"],
    liveUrl: "https://inhomesdirect.co.uk",
  },
  {
    slug: "more-homes-group",
    title: "More Homes Group",
    year: 2025,
    client: "More Homes Group",
    category: ["Property", "Web Platform", "UX"],
    summary:
      "A property lettings platform combining listings, rental support services, and separate tenant and landlord journeys, built to scale across cities.",
    challenge:
      "Serving two distinct audiences — tenants searching by price/radius/city and landlords needing trust signals — from one coherent site, across multiple UK cities (London, Manchester, Birmingham).",
    solution:
      "An advanced-filter discovery system (price range, radius search, city coverage), split user journeys for tenants vs. landlords, and a testimonials/trust-signal module.",
    results: [
      { label: "Journey clarity", value: "Improved", verified: false },
      { label: "Property discovery", value: "Faster", verified: false },
      { label: "Trust signals", value: "Stronger", verified: false },
    ],
    themeColor: "#1D4ED8",
    themeColorSoft: "#E9EEFC",
    logo: "/brand/clients/more-homes-group.webp",
    images: [
      {
        src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop",
        alt: "Miniature house model with keys, on a wooden table",
        kind: "hero",
        isPlaceholder: true,
      },
    ],
    stack: ["Web platform", "Advanced search/filtering"],
    liveUrl: "https://morehomesgroup.co.uk",
  },
  {
    slug: "united-muslim-travels",
    title: "United Muslim Travels",
    year: 2025,
    client: "United Muslim Travels",
    category: ["Travel", "Website", "Digital Marketing"],
    summary:
      "A faith-focused travel brand offering Hajj, Umrah and Ramadan packages, visas, hotels and transport — built as a trust hub with WhatsApp-first conversion.",
    challenge:
      "Turning package browsing into WhatsApp conversations and form leads, for a category where trust and clarity matter more than checkout speed.",
    solution:
      "A trust-hub website with clear package architecture, WhatsApp-first CTAs throughout, and a three-stage Meta Ads funnel (awareness → retargeting → leads) with a consistent social identity.",
    results: [
      { label: "Test ad spend", value: "PKR 500 (validation test)", verified: true },
      { label: "Leads via WhatsApp + forms", value: "200+", verified: true },
    ],
    themeColor: "#1D4ED8",
    themeColorSoft: "#FBE9F3",
    logo: "/brand/clients/united-muslim-travels.webp",
    images: [
      {
        src: "https://images.unsplash.com/photo-1784400340561-270c9c240613?q=80&w=1600&auto=format&fit=crop",
        alt: "Grand mosque arches reflecting on a polished marble floor",
        kind: "hero",
        isPlaceholder: true,
      },
    ],
    stack: ["Website", "Meta Business Manager", "Meta Pixel", "WhatsApp", "Instagram/Facebook"],
    liveUrl: "https://unitedmuslimtravels.com",
  },
  {
    slug: "halla-gulla",
    title: "Halla Gulla",
    year: 2025,
    client: "Halla Gulla",
    category: ["Travel", "Website", "Digital Marketing"],
    summary:
      "A youthful tours and travel brand for Pakistan tourism — northern-area tours, group and family trips — validated through a short, tightly tracked ad test.",
    challenge:
      "Proving lead-generation viability on a small budget before scaling spend.",
    solution:
      "A conversion-ready website paired with a focused Meta Ads + WhatsApp lead-gen test across Instagram and Facebook.",
    results: [
      { label: "Spend", value: "PKR 5,500 over 3 days", verified: true },
      { label: "Leads", value: "67", verified: true },
      { label: "Cost per lead", value: "~PKR 78", verified: true },
    ],
    themeColor: "#1D4ED8",
    themeColorSoft: "#E4F6FC",
    logo: "/brand/clients/halla-gulla.webp",
    images: [
      {
        src: "https://images.unsplash.com/photo-1634633989623-69c2398928de?q=80&w=1600&auto=format&fit=crop",
        alt: "Travellers at Saif-ul-Malook Lake in northern Pakistan",
        kind: "hero",
        isPlaceholder: true,
      },
    ],
    stack: ["Website", "Meta Business Manager", "WhatsApp lead forms", "Instagram/Facebook"],
    liveUrl: "https://hallagulla.pk",
  },
  {
    slug: "multidatum",
    title: "Multidatum",
    year: 2025,
    client: "Multidatum",
    category: ["Digital Marketing", "Website"],
    summary:
      "A digital-marketing and social-growth agency site, built for service clarity and consultation-lead capture across five core service lines.",
    challenge:
      "Communicating five distinct services (strategy, paid campaigns, content & design, analytics & reporting, growth framework) without the page turning into an undifferentiated list.",
    solution:
      "A structured service architecture with clear objectives per section and consultation capture built into the flow.",
    results: [
      { label: "Service clarity", value: "Improved", verified: false },
      { label: "Lead capture", value: "Stronger", verified: false },
      { label: "Scalability", value: "Ready", verified: false },
    ],
    themeColor: "#1D4ED8",
    themeColorSoft: "#FFF4E0",
    images: [
      {
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
        alt: "Analytics dashboard showing campaign performance charts",
        kind: "hero",
        isPlaceholder: true,
      },
    ],
    stack: ["Website", "Service-led IA"],
  },
  {
    slug: "hikmabiotics",
    title: "Hikmabiotics",
    year: 2025,
    client: "Hikmabiotics",
    category: ["E-Commerce", "Dual Market", "Digital Marketing"],
    summary:
      "A premium natural-wellness supplements brand launching as two market-specific ecommerce sites — Pakistan and UK — under one consistent brand voice.",
    challenge:
      "Validating sales viability in the Pakistan market fast, on a small daily budget, before scaling the dual-market rollout.",
    solution:
      "Two market-specific ecommerce builds, a Meta Pixel with purchase-event tracking, and a short, tightly measured PK sales-validation campaign.",
    results: [
      { label: "Markets live", value: "PK + UK (2 sites)", verified: true },
      { label: "Daily budget (PK test)", value: "~PKR 800, first 3 days", verified: true },
      { label: "Cost per sale", value: "~PKR 250–300", verified: true },
      { label: "Revenue (PK test window)", value: "~PKR 20,000", verified: true },
    ],
    themeColor: "#1D4ED8",
    themeColorSoft: "#E9F7EF",
    logo: "/brand/clients/hikmabiotics.webp",
    images: [
      {
        src: "https://images.unsplash.com/photo-1704694671866-f83e0b91df09?q=80&w=1600&auto=format&fit=crop",
        alt: "Row of natural supplement and vitamin bottles",
        kind: "hero",
        isPlaceholder: true,
      },
    ],
    stack: ["Ecommerce (PK + UK)", "Meta Pixel", "Purchase-event tracking"],
    liveUrl: "https://hikmabiotics.com",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
