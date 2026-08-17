import type { Metadata } from "next";
import { ServiceShowcase } from "@/components/home/ServiceShowcase";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Strategy, web design, development, e-commerce, Shopify, custom applications, CRM & Salesforce, digital marketing and SEO.",
};

export default function ServicesPage() {
  return <ServiceShowcase />;
}
