export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
};

// Matches the existing Express handler's contract exactly (server/app.js,
// POST /api/contact) — source: "contact-page" selects the richer email
// template that includes company/service/budget.
export async function submitContact(payload: ContactPayload): Promise<void> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, source: "contact-page" }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error || "Failed to send message");
  }
}
