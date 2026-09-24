"use client";

import { FormEvent, useState } from "react";

const MAX_MESSAGE = 800;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(0);

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
      setCharCount(0);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (status === "sent") {
    return (
      <div
        className="editorial-card form-status"
        style={{ padding: "1.75rem", maxWidth: "32rem" }}
        role="status"
      >
        <div style={{ marginBottom: "0.65rem" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--status-live)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", fontWeight: 600 }}>
          Message sent.
        </p>
        <p style={{ margin: 0, fontSize: "0.9625rem", lineHeight: 1.6, color: "var(--text-secondary)" }}>
          I&apos;ll write back soon. If it&apos;s urgent, email{" "}
          <a className="text-link" href="mailto:andypratama1211@gmail.com">
            andypratama1211@gmail.com
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="contact-form" style={{ display: "grid", gap: "1.1rem" }}>
      <div className="field">
        <label htmlFor="contact-name">Name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          required
          minLength={2}
        />
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <label htmlFor="contact-message">What are you trying to build?</label>
          <span
            style={{
              fontSize: "0.8rem",
              color: charCount > MAX_MESSAGE * 0.9 ? "var(--text-primary)" : "var(--text-muted)",
              fontVariantNumeric: "tabular-nums",
              transition: "color 0.2s ease",
            }}
            aria-live="polite"
          >
            {charCount}/{MAX_MESSAGE}
          </span>
        </div>
        <textarea
          id="contact-message"
          name="message"
          required
          maxLength={MAX_MESSAGE}
          placeholder="A short note is enough. Role, stack, timeline, or whatever helps."
          onChange={(e) => setCharCount(e.target.value.length)}
        />
      </div>
      {status === "error" && (
        <p role="alert" className="form-error" style={{ margin: 0, color: "#B42318", fontSize: "0.9rem" }}>
          {error}
        </p>
      )}
      <div>
        <button
          type="submit"
          className="btn-primary"
          disabled={status === "sending"}
          style={{ position: "relative", minWidth: "148px" }}
        >
          {status === "sending" ? (
            <>
              <svg
                style={{ animation: "spin 0.8s linear infinite" }}
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              <span>Sending</span>
            </>
          ) : (
            "Send message"
          )}
        </button>
      </div>
    </form>
  );
}
