export type Service = {
  slug: string;
  index: string; // "01"
  title: string;
  short: string;
  capabilities: string[];
  relatedProjects: string[]; // project slugs
};

export const services: Service[] = [
  {
    slug: "strategy-ux",
    index: "01",
    title: "Strategy & UX",
    short: "Figuring out what to build before anyone builds it.",
    capabilities: ["Discovery & positioning", "User journeys", "Information architecture", "Wireframing"],
    relatedProjects: ["more-homes-group", "multidatum"],
  },
  {
    slug: "web-design",
    index: "02",
    title: "Web Design",
    short: "Interfaces that hold up under real content, not just mockups.",
    capabilities: ["Visual identity", "Design systems", "Responsive layout", "Prototyping"],
    relatedProjects: ["united-muslim-travels", "halla-gulla"],
  },
  {
    slug: "web-development",
    index: "03",
    title: "Development",
    short: "Websites engineered for what happens after launch.",
    capabilities: ["Frontend engineering", "Performance", "CMS integration", "Accessibility"],
    relatedProjects: ["inhomes-direct", "more-homes-group"],
  },
  {
    slug: "e-commerce",
    index: "04",
    title: "E-Commerce",
    short: "Commerce logic that fits the product, not the other way round.",
    capabilities: ["Custom pricing logic", "Checkout optimisation", "Catalog architecture", "Conversion UX"],
    relatedProjects: ["inhomes-direct", "hikmabiotics"],
  },
  {
    slug: "shopify",
    index: "05",
    title: "Shopify",
    short: "Custom Shopify builds — without stacking paid apps to fake it.",
    capabilities: ["Custom themes", "Liquid development", "App-free calculators", "Migrations"],
    relatedProjects: ["inhomes-direct"],
  },
  {
    slug: "custom-applications",
    index: "06",
    title: "Custom Applications",
    short: "Software for the parts of the business that off-the-shelf tools don't fit.",
    capabilities: ["Internal tools", "Platform architecture", "API integration", "Workflow automation"],
    relatedProjects: ["more-homes-group"],
  },
  {
    slug: "crm-salesforce",
    index: "07",
    title: "CRM & Salesforce",
    short: "CRM systems that match how your team actually sells and serves.",
    capabilities: ["Salesforce implementation", "Process automation", "Custom objects", "Reporting"],
    relatedProjects: [],
  },
  {
    slug: "digital-marketing",
    index: "08",
    title: "Digital Marketing",
    short: "Paid and social campaigns measured by leads, not impressions.",
    capabilities: ["Meta Ads", "Social media management", "Funnel design", "Lead-form optimisation"],
    relatedProjects: ["united-muslim-travels", "halla-gulla", "hikmabiotics"],
  },
  {
    slug: "seo-growth",
    index: "09",
    title: "SEO & Growth",
    short: "Structured for search from the first template, not bolted on after.",
    capabilities: ["Technical SEO", "On-page structure", "Content architecture", "Analytics & reporting"],
    relatedProjects: ["inhomes-direct", "multidatum"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
