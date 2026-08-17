"use client";

import { useState } from "react";
import { submitContact } from "@/lib/api/contact";
import styles from "./ContactForm.module.scss";

const NEEDS = ["Website", "E-Commerce", "App", "CRM", "Marketing", "SEO", "Other"];
const TIMELINES = ["ASAP", "1–3 months", "3–6 months", "Flexible"];

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [need, setNeed] = useState<string | null>(null);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = new FormData(e.currentTarget);
    const description = String(form.get("message") || "");
    const message = timeline ? `Timeline: ${timeline}\n\n${description}` : description;

    try {
      await submitContact({
        name: String(form.get("name") || ""),
        email: String(form.get("email") || ""),
        phone: String(form.get("phone") || ""),
        company: String(form.get("company") || ""),
        service: need || undefined,
        budget: String(form.get("budget") || ""),
        message,
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <div className={styles.success}>
        <h2>Message sent.</h2>
        <p>We&rsquo;ll get back to you within one business day.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.row}>
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className={styles.row}>
        <Field label="Company" name="company" />
        <Field label="Phone" name="phone" type="tel" />
      </div>

      <fieldset className={styles.pillGroup}>
        <legend>What do you need?</legend>
        <div className={styles.pills}>
          {NEEDS.map((option) => (
            <button
              key={option}
              type="button"
              className={`${styles.pill} ${need === option ? styles.pillActive : ""}`}
              onClick={() => setNeed(option === need ? null : option)}
              aria-pressed={need === option}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      <div className={styles.row}>
        <Field label="Estimated budget" name="budget" placeholder="Your estimated budget" />
        <fieldset className={styles.selectField}>
          <legend>Timeline</legend>
          <div className={styles.pills}>
            {TIMELINES.map((option) => (
              <button
                key={option}
                type="button"
                className={`${styles.pill} ${timeline === option ? styles.pillActive : ""}`}
                onClick={() => setTimeline(option === timeline ? null : option)}
                aria-pressed={timeline === option}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <label className={styles.field}>
        <span>Project description</span>
        <textarea name="message" rows={5} required placeholder="What are you building, and what does success look like?" />
      </label>

      {status === "error" && <p className={styles.error}>{errorMessage}</p>}

      <button type="submit" className={styles.submit} disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <input name={name} type={type} required={required} placeholder={placeholder} />
    </label>
  );
}
