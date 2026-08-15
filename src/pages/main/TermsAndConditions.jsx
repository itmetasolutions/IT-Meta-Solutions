import { FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Container from "../../components/Container";
import SubpageVisualLayer from "../../components/SubpageVisualLayer";

const sections = [
  {
    title: "1. Agreement to Terms",
    body: [
      "These Terms and Conditions (\"Terms\") govern your use of the IT Meta Solutions (Pvt) Ltd website and any services provided by us. By accessing our website or engaging our services, you agree to be bound by these Terms. If you do not agree, please do not use our website or services.",
    ],
  },
  {
    title: "2. Services",
    body: [
      "IT Meta Solutions provides web development, custom web applications, Salesforce implementation, digital marketing, SEO, social media management, graphic design, video editing, and brand building services. The specific scope, deliverables, timeline, and cost of any engagement will be defined in a separate proposal, quotation, or agreement signed or confirmed by both parties.",
    ],
  },
  {
    title: "3. Quotes, Payments & Invoicing",
    body: [
      "Project pricing, payment schedules, and milestones will be communicated in writing before work begins.",
    ],
    bullets: [
      "A deposit or advance payment may be required before a project starts.",
      "Remaining payments are due as per the agreed milestones or upon project completion, unless otherwise stated.",
      "Late payments may result in project delays or suspension of services.",
      "All fees are exclusive of applicable taxes unless stated otherwise.",
    ],
  },
  {
    title: "4. Client Responsibilities",
    body: ["To ensure smooth project delivery, clients agree to:"],
    bullets: [
      "Provide accurate information, content, and access credentials required for the project.",
      "Respond to requests for feedback or approval within a reasonable timeframe.",
      "Ensure that any content, logos, or materials supplied do not infringe third-party rights.",
    ],
  },
  {
    title: "5. Revisions & Project Scope",
    body: [
      "Each project includes a defined number of revisions as agreed in the proposal. Requests beyond the agreed scope may be treated as additional work and billed separately. Significant changes to project scope after work has begun may affect timelines and cost.",
    ],
  },
  {
    title: "6. Intellectual Property",
    body: [
      "Upon full payment, clients receive ownership rights to the final deliverables created specifically for their project, except for third-party assets (such as licensed stock images, fonts, plugins, or frameworks) which remain subject to their original licenses.",
      "IT Meta Solutions retains the right to showcase completed work in its portfolio, case studies, and marketing materials, unless a confidentiality agreement states otherwise.",
    ],
  },
  {
    title: "7. Third-Party Services & Platforms",
    body: [
      "Some projects may rely on third-party platforms, tools, or services (e.g., hosting providers, Salesforce, Meta Ads, payment gateways, plugins). IT Meta Solutions is not responsible for outages, policy changes, or costs imposed by these third parties.",
    ],
  },
  {
    title: "8. Marketing & Advertising Disclaimer",
    body: [
      "For digital marketing, SEO, and advertising services, results depend on multiple factors including market conditions, competition, and platform algorithms. We do not guarantee specific rankings, traffic, leads, or sales figures, and we work in good faith to optimize performance based on agreed strategies.",
    ],
  },
  {
    title: "9. Limitation of Liability",
    body: [
      "To the fullest extent permitted by law, IT Meta Solutions shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or services, including but not limited to loss of profits, data, or business opportunities.",
    ],
  },
  {
    title: "10. Termination",
    body: [
      "Either party may terminate an ongoing engagement with written notice as agreed in the project contract. Fees for work completed up to the termination date remain payable. Any advance payments for undelivered work may be handled as outlined in the specific project agreement.",
    ],
  },
  {
    title: "11. Confidentiality",
    body: [
      "We treat client information and project details as confidential and will not disclose them to third parties without consent, except as required by law or to complete the agreed services.",
    ],
  },
  {
    title: "12. Governing Law",
    body: [
      "These Terms are governed by the laws of the Islamic Republic of Pakistan. Any disputes arising from these Terms or our services shall be subject to the exclusive jurisdiction of the courts of Lahore, Pakistan.",
    ],
  },
  {
    title: "13. Changes to These Terms",
    body: [
      "We may update these Terms from time to time. Changes will be posted on this page with an updated revision date. Continued use of our website or services after changes constitutes acceptance of the updated Terms.",
    ],
  },
  {
    title: "14. Contact Us",
    body: ["For any questions about these Terms, contact us:"],
    bullets: [
      "Email: info@itmetasolutions.com",
      "Phone: +92 327 180 4037",
      "Address: Office No M32 1st Floor, City Star Plaza, Township Block 1, Lahore 54700, Pakistan",
    ],
  },
];

export default function TermsAndConditions() {
  const lastUpdated = "August 16, 2026";

  return (
    <>
      <Helmet>
        <title>Terms &amp; Conditions | IT Meta Solutions</title>
        <meta
          name="description"
          content="Read the terms and conditions for using the IT Meta Solutions website and engaging our services."
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://itmetasolutions.com/terms-and-conditions" />
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
                <FileText className="h-4 w-4 opacity-70" />
                Terms &amp; Conditions
              </span>
              <span className="text-xs text-zinc-400">Last updated: {lastUpdated}</span>
            </div>

            <h1 className="mt-8 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Terms &amp; Conditions
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
              These Terms and Conditions govern your use of the IT Meta Solutions website and any
              services we provide. Please read them carefully.
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
                to="/privacy-policy"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View Privacy Policy
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
