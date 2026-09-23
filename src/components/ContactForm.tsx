"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Could not send the message.");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (status === "sent") {
    return (
      <div
        className="editorial-card form-status"
        style={{ padding: "1.5rem", maxWidth: "32rem" }}
        role="status"
      >
        <p style={{ margin: 0, fontSize: "1.05rem", lineHeight: 1.6 }}>
          Got it, I&apos;ll write back soon. If it&apos;s urgent, email{" "}
          <a className="text-link" href="mailto:andypratama1211@gmail.com">
            andypratama1211@gmail.com
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="contact-form" style={{ display: "grid", gap: "1rem" }}>
      <div className="field">
        <label htmlFor="contact-name">Name</label>
        <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Your name" />
      </div>
      <div className="field">
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@company.com"
        />
      </div>
      <div className="field">
        <label htmlFor="contact-message">What are you trying to build?</label>
        <textarea
          id="contact-message"
          name="message"
          required
          placeholder="A short note is enough. Role, stack, timeline, or whatever helps."
        />
      </div>
      {status === "error" && (
        <p role="alert" style={{ margin: 0, color: "#B42318", fontSize: "0.9rem" }}>
          {error} You can also email me directly.
        </p>
      )}
      <div>
        <button type="submit" className="btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
