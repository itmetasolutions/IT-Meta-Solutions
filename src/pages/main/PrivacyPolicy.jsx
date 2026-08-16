import { Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Container from "../../components/Container";
import SubpageVisualLayer from "../../components/SubpageVisualLayer";
import { PHONE_NUMBERS, OFFICE_ADDRESS, EMAIL } from "../../lib/contact";

const sections = [
  {
    title: "1. Introduction",
    body: [
      "IT Meta Solutions (Pvt) Ltd (\"we\", \"us\", \"our\") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains what information we collect, how we use it, and the choices you have.",
      "By using our website or engaging our services, you agree to the practices described in this policy.",
    ],
  },
  {
    title: "2. Information We Collect",
    body: [
      "We may collect the following types of information:",
    ],
    bullets: [
      "Contact details you provide through forms, email, phone, or live chat, such as your name, email address, and phone number.",
      "Project or business information you share when requesting a proposal or consultation.",
      "Technical data such as IP address, browser type, device information, and pages visited, collected automatically via cookies and analytics tools.",
      "Communications you send us, including messages, feedback, and support requests.",
    ],
  },
  {
    title: "3. How We Use Your Information",
    body: ["We use the information we collect to:"],
    bullets: [
      "Respond to inquiries and provide quotes or proposals.",
      "Deliver the services you've requested, including web development, Salesforce, marketing, and design work.",
      "Improve our website, services, and communication with clients.",
      "Send updates, invoices, or project-related communication.",
      "Comply with legal and regulatory obligations in Pakistan.",
    ],
  },
  {
    title: "4. Cookies & Analytics",
    body: [
      "Our website may use cookies and third-party analytics tools (such as Google Analytics) to understand how visitors use our site and to improve performance. You can disable cookies through your browser settings; some site features may not function correctly without them.",
    ],
  },
  {
    title: "5. Data Sharing",
    body: [
      "We do not sell your personal information. We may share information with:",
    ],
    bullets: [
      "Trusted third-party service providers who help us operate our business (e.g., hosting, payment processing, email delivery), bound by confidentiality obligations.",
      "Authorities, where required by law or to protect our legal rights.",
    ],
  },
  {
    title: "6. Data Security",
    body: [
      "We take reasonable technical and organizational measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    title: "7. Data Retention",
    body: [
      "We retain personal information only as long as necessary to fulfil the purposes described in this policy, or as required by applicable law and regulatory obligations (including SECP and FBR record-keeping requirements).",
    ],
  },
  {
    title: "8. Your Rights",
    body: [
      "You may request access to, correction of, or deletion of your personal information by contacting us at info@itmetasolutions.com. We will respond to reasonable requests within a reasonable timeframe.",
    ],
  },
  {
    title: "9. Third-Party Links",
    body: [
      "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those external sites.",
    ],
  },
  {
    title: "10. Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. Continued use of our website or services after changes constitutes acceptance of the updated policy.",
    ],
  },
  {
    title: "11. Contact Us",
    body: [
      "If you have questions about this Privacy Policy or how we handle your data, contact us:",
    ],
    bullets: [
      `Email: ${EMAIL}`,
      ...PHONE_NUMBERS.map((p) => `Phone (${p.region}): ${p.display}`),
      `Address: ${OFFICE_ADDRESS}`,
    ],
  },
];

export default function PrivacyPolicy() {
  const lastUpdated = "August 16, 2026";

  return (
    <>
      <Helmet>
        <title>Privacy Policy | IT Meta Solutions</title>
        <meta
          name="description"
          content="Read the IT Meta Solutions privacy policy to understand how we collect, use, and protect your personal information."
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://itmetasolutions.com/privacy-policy" />
      </Helmet>

      <div className="itms-subpage relative min-h-screen overflow-hidden text-zinc-100">
        <SubpageVisualLayer />

        <Container className="py-24 sm:py-32">
          <motion.div
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-200">
                <Shield className="h-4 w-4 opacity-70" />
                Privacy Policy
              </span>
              <span className="text-xs text-zinc-400">Last updated: {lastUpdated}</span>
            </div>

            <h1 className="mt-8 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
              This policy explains how IT Meta Solutions (Pvt) Ltd collects, uses, and protects your
              personal information when you visit our website or use our services.
            </p>

            <div className="mt-10 max-w-3xl space-y-10">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-xl font-semibold text-white sm:text-2xl">{section.title}</h2>
                  {section.body.map((p, i) => (
                    <p key={i} className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">
                      {p}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="mt-3 space-y-2">
                      {section.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-300 sm:text-base">
                          <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[#3AC9F5]" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/terms-and-conditions"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View Terms &amp; Conditions
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1D4ED8] px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </Container>
      </div>
    </>
  );
}
