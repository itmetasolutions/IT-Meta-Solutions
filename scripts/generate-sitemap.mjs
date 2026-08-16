import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const appPath = path.join(root, "src", "App.jsx");
const baseUrl = "https://itmetasolutions.com";

const appSource = fs.readFileSync(appPath, "utf8");
const routeRegex = /<Route\s+[^>]*path="([^"]+)"[^>]*>/g;

const routes = [];
let match = routeRegex.exec(appSource);
while (match) {
  const route = match[1];
  if (route && route !== "*" && !route.startsWith("/admin")) {
    routes.push(route);
  }
  match = routeRegex.exec(appSource);
}

const uniqueRoutes = [...new Set(routes)];
const lastmod = new Date().toISOString().slice(0, 10);

const getChangefreq = (route) => (route === "/" ? "weekly" : "monthly");

const getPriority = (route) => {
  if (route === "/") return "1.0";
  if (route.startsWith("/case-study") || route.startsWith("/case-studies")) return "0.5";
  if (route.endsWith("-expertise")) return "0.7";
  return "0.8";
};

const urlEntries = uniqueRoutes
  .map((route) => {
    const loc = `${baseUrl}${route}`;
    return [
      "  <url>",
      `    <loc>${loc}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${getChangefreq(route)}</changefreq>`,
      `    <priority>${getPriority(route)}</priority>`,
      "  </url>",
    ].join("\n");
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;

const publicSitemapPath = path.join(root, "public", "sitemap.xml");
fs.writeFileSync(publicSitemapPath, xml, "utf8");

const distSitemapPath = path.join(root, "dist", "sitemap.xml");
if (fs.existsSync(distSitemapPath)) {
  fs.writeFileSync(distSitemapPath, xml, "utf8");
}

console.log(`Sitemap updated with ${uniqueRoutes.length} routes: ${publicSitemapPath}`);
