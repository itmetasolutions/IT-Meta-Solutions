import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import "@/styles/globals.scss";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://itmetasolutions.com"),
  title: {
    default: "IT Meta Solutions — Digital Product, Technology & Growth Studio",
    template: "%s — IT Meta Solutions",
  },
  description:
    "We design, build and grow digital products that move businesses forward — web, e-commerce, custom applications, CRM and digital growth.",
  openGraph: {
    type: "website",
    siteName: "IT Meta Solutions",
    title: "IT Meta Solutions — Digital Product, Technology & Growth Studio",
    description:
      "We design, build and grow digital products that move businesses forward.",
  },
  icons: {
    icon: "/ITMS Favicon Updated.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${inter.variable}`}>
      <body>
        <MetaPixel />
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
