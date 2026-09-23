import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-heading), Newsreader, Georgia, serif",
          fontStyle: "italic",
          fontSize: "clamp(4rem, 10vw, 7rem)",
          fontWeight: 500,
          letterSpacing: "-0.03em",
          lineHeight: 1,
          color: "var(--border-medium)",
          marginBottom: "1rem",
        }}
      >
        404
      </div>
      <h1 className="text-h1" style={{ marginBottom: "1rem" }}>
        This page wandered off.
      </h1>
      <p className="text-body-large" style={{ maxWidth: "480px", marginBottom: "2rem" }}>
        Maybe it was renamed. The work is still on the home page.
      </p>
      <Link href="/" className="btn-primary">
        Back home
      </Link>
    </div>
  );
}
