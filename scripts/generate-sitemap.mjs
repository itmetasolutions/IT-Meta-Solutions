import fs from "node:fs";
import path from "node:path";

// Walks the Next.js App Router `app/` tree for real page.tsx files instead of
// regex-parsing React Router <Route> tags (that belonged to the old Vite
// SPA — see legacy/). Dynamic [slug] segments are expanded from the content
// files (regex-read as plain text, not imported, so this plain `node`
// script doesn't need a TypeScript loader).

const root = process.cwd();
const appDir = path.join(root, "app");
const baseUrl = "https://itmetasolutions.com";

// Known dynamic route segments -> the content file that supplies real slugs.
const dynamicSlugSources = {
  "work/[slug]": "content/projects.ts",
  "services/[slug]": "content/services.ts",
  "insights/[slug]": "content/insights.ts",
};

function readSlugsFromContentFile(relativePath) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) return [];
  const source = fs.readFileSync(fullPath, "utf8");
  const slugRegex = /slug:\s*["']([^"']+)["']/g;
  const slugs = [];
  let match = slugRegex.exec(source);
  while (match) {
    slugs.push(match[1]);
    match = slugRegex.exec(source);
  }
  return slugs;
}

function walkAppDir(dir, segments = []) {
  const routes = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  const hasPage = entries.some((e) => e.isFile() && /^page\.(tsx|ts|jsx|js)$/.test(e.name));
  if (hasPage) {
    const routeKey = segments.join("/");
    const dynamicSegment = segments.find((s) => s.startsWith("[") && s.endsWith("]"));

    if (dynamicSegment) {
      const source = dynamicSlugSources[routeKey];
      if (source) {
        const slugs = readSlugsFromContentFile(source);
        for (const slug of slugs) {
          routes.push(`/${segments.map((s) => (s === dynamicSegment ? slug : s)).join("/")}`);
        }
      }
      // Unrecognised dynamic route: skip rather than emit a literal "[slug]" URL.
    } else {
      routes.push(segments.length === 0 ? "/" : `/${routeKey}`);
    }
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("_")) continue; // private folders
    if (entry.name === "api") continue; // no Next API routes in this project

    // Route groups "(group)" don't add a URL segment.
    const isGroup = entry.name.startsWith("(") && entry.name.endsWith(")");
    const nextSegments = isGroup ? segments : [...segments, entry.name];
    routes.push(...walkAppDir(path.join(dir, entry.name), nextSegments));
  }

  return routes;
}

const uniqueRoutes = [...new Set(walkAppDir(appDir))];
const lastmod = new Date().toISOString().slice(0, 10);

const getChangefreq = (route) => (route === "/" ? "weekly" : "monthly");

const getPriority = (route) => {
  if (route === "/") return "1.0";
  if (route.startsWith("/work/")) return "0.7";
  if (route.startsWith("/services/")) return "0.7";
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

console.log(`Sitemap updated with ${uniqueRoutes.length} routes: ${publicSitemapPath}`);
