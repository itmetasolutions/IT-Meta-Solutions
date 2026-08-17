export type ServiceFaq = { q: string; a: string };

export type Service = {
  slug: string;
  index: string; // "01"
  title: string;
  short: string;
  headline: string;
  overview: string;
  capabilities: string[];
  relatedProjects: string[]; // project slugs
  faqs: ServiceFaq[];
};

export const services: Service[] = [
  {
    slug: "strategy-ux",
    index: "01",
    title: "Strategy & UX",
    short: "Figuring out what to build before anyone builds it.",
    headline: "The plan that stops a build from drifting halfway through.",
    overview:
      "Before any design or code, we map who the product is actually for and what they're trying to do — pricing logic, user journeys, information architecture. It's the difference between a site that looks right and one that works right.",
    capabilities: ["Discovery & positioning", "User journeys", "Information architecture", "Wireframing"],
    relatedProjects: ["more-homes-group", "multidatum"],
    faqs: [
      { q: "Do you work from an existing brand or start from scratch?", a: "Both — we've built discovery systems on top of existing brands (More Homes Group) and defined the IA from zero for new sites (Multidatum)." },
      { q: "What does a discovery phase actually produce?", a: "User journey maps, an information architecture, and wireframes — concrete enough that development doesn't stall waiting for decisions." },
    ],
  },
  {
    slug: "web-design",
    index: "02",
    title: "Web Design",
    short: "Interfaces that hold up under real content, not just mockups.",
    headline: "Design that survives contact with real content.",
    overview:
      "A lot of design work looks great with placeholder text and falls apart once real copy, real prices and real images go in. We design against real content from the start — visual identity, design systems, and layouts built to flex.",
    capabilities: ["Visual identity", "Design systems", "Responsive layout", "Prototyping"],
    relatedProjects: ["united-muslim-travels", "halla-gulla"],
    faqs: [
      { q: "Can you design within an existing brand identity?", a: "Yes — United Muslim Travels and Halla Gulla both kept their existing brand identity; we designed the site and campaign creative around it." },
      { q: "Do you deliver a reusable design system, or just page designs?", a: "Both, depending on scope — a component-level design system for larger builds, page-level design for smaller sites." },
    ],
  },
  {
    slug: "web-development",
    index: "03",
    title: "Development",
    short: "Websites engineered for what happens after launch.",
    headline: "Websites engineered for what happens after launch.",
    overview:
      "Launch is the easy part. We build for what comes after — content updates, traffic growth, new categories — with clean, maintainable frontend engineering rather than a one-off build that breaks the first time something changes.",
    capabilities: ["Frontend engineering", "Performance", "CMS integration", "Accessibility"],
    relatedProjects: ["inhomes-direct", "more-homes-group"],
    faqs: [
      { q: "What stack do you build on?", a: "Depends on the project — Shopify/Liquid for commerce builds like InHomes Direct, custom web platforms for property/listings work like More Homes Group." },
      { q: "Can you take over and extend an existing codebase?", a: "Yes, though we'll audit it first — extending unmaintainable code often costs more than a scoped rebuild of the affected parts." },
    ],
  },
  {
    slug: "e-commerce",
    index: "04",
    title: "E-Commerce",
    short: "Commerce logic that fits the product, not the other way round.",
    headline: "Commerce logic that fits the product, not the other way round.",
    overview:
      "Standard product pages break down fast for anything sold by area, survey, or configuration. We build the pricing and ordering logic your catalog actually needs, instead of forcing it into a template built for T-shirts.",
    capabilities: ["Custom pricing logic", "Checkout optimisation", "Catalog architecture", "Conversion UX"],
    relatedProjects: ["inhomes-direct", "hikmabiotics"],
    faqs: [
      { q: "Can you build calculators for area-based or configurable pricing?", a: "Yes — InHomes Direct runs on custom-coded area-to-pack calculators built without paid Shopify apps." },
      { q: "Do you support launching in more than one market at once?", a: "Yes — Hikmabiotics launched as two market-specific stores (Pakistan and UK) under one brand." },
    ],
  },
  {
    slug: "shopify",
    index: "05",
    title: "Shopify",
    short: "Custom Shopify builds — without stacking paid apps to fake it.",
    headline: "Shopify, built custom instead of stacked with paid apps.",
    overview:
      "Most Shopify stores solve hard problems by installing another app. We write the calculator, the conditional template, or the pricing logic directly — fewer moving parts, no monthly app fees, and no plugin conflicts to debug later.",
    capabilities: ["Custom themes", "Liquid development", "App-free calculators", "Migrations"],
    relatedProjects: ["inhomes-direct"],
    faqs: [
      { q: "Why avoid paid calculator/pricing apps?", a: "They add recurring cost, another point of failure, and rarely fit an unusual pricing model exactly — custom Liquid code we can actually maintain." },
      { q: "Can you migrate an existing store to Shopify?", a: "Yes, including custom pricing logic that a stock migration tool won't carry over correctly." },
    ],
  },
  {
    slug: "custom-applications",
    index: "06",
    title: "Custom Applications",
    short: "Software for the parts of the business that off-the-shelf tools don't fit.",
    headline: "Software for the parts of the business off-the-shelf tools don't fit.",
    overview:
      "Once a business outgrows generic tools, the gap usually shows up in one specific workflow — property discovery, tenant vs. landlord journeys, internal operations. We build the platform around that workflow, not the other way round.",
    capabilities: ["Internal tools", "Platform architecture", "API integration", "Workflow automation"],
    relatedProjects: ["more-homes-group"],
    faqs: [
      { q: "What kind of custom platforms have you built?", a: "More Homes Group's advanced-filter property discovery system with separate tenant and landlord journeys is a recent example." },
      { q: "Do you handle both the platform and the ongoing support?", a: "Yes — we scope for iteration, not a one-time handoff." },
    ],
  },
  {
    slug: "crm-salesforce",
    index: "07",
    title: "CRM & Salesforce",
    short: "CRM systems that match how your team actually sells and serves.",
    headline: "CRM systems that match how your team actually sells and serves.",
    overview:
      "A CRM that doesn't match your actual sales or service process just becomes a place data goes to get ignored. We implement Salesforce around your real workflow — custom objects, automation, and reporting that people actually use.",
    capabilities: ["Salesforce implementation", "Process automation", "Custom objects", "Reporting"],
    relatedProjects: [],
    faqs: [
      { q: "Do you work with an existing Salesforce org, or set one up from scratch?", a: "Both — implementation from zero, or extending/cleaning up an existing org." },
      { q: "Can you automate approval or assignment workflows?", a: "Yes, via Salesforce flows and process automation scoped to how your team actually works." },
    ],
  },
  {
    slug: "digital-marketing",
    index: "08",
    title: "Digital Marketing",
    short: "Paid and social campaigns measured by leads, not impressions.",
    headline: "Campaigns measured by leads, not impressions.",
    overview:
      "We run Meta Ads and social presence with a specific number in mind — leads, cost per lead, or sales — and report on that number, not vanity metrics. Every campaign starts as a small, tightly tracked test before scaling spend.",
    capabilities: ["Meta Ads", "Social media management", "Funnel design", "Lead-form optimisation"],
    relatedProjects: ["united-muslim-travels", "halla-gulla", "hikmabiotics"],
    faqs: [
      { q: "Do you start with a small test budget?", a: "Yes — Halla Gulla's first test ran on PKR 5,500 over 3 days before any decision to scale spend." },
      { q: "What's tracked in these campaigns?", a: "Spend, leads or sales, and cost per result — via Meta Pixel and WhatsApp/instant lead forms, reported plainly." },
    ],
  },
  {
    slug: "seo-growth",
    index: "09",
    title: "SEO & Growth",
    short: "Structured for search from the first template, not bolted on after.",
    headline: "Structured for search from the first template, not bolted on after.",
    overview:
      "SEO added after launch means retrofitting URLs, templates and content structure that were never built with search in mind. We bake technical SEO and content architecture into the build from day one.",
    capabilities: ["Technical SEO", "On-page structure", "Content architecture", "Analytics & reporting"],
    relatedProjects: ["inhomes-direct", "multidatum"],
    faqs: [
      { q: "Is SEO a separate phase, or part of the build?", a: "Part of the build — on-page structure and technical SEO are handled as part of development, not a retrofit." },
      { q: "Do you provide ongoing reporting?", a: "Yes, scoped per project — analytics and reporting tied to the goals set during discovery." },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
