"use client";

import { social } from "@/resources";

export function SocialLinks({
  includeEmail = true,
  className = "social-row",
}: {
  includeEmail?: boolean;
  className?: string;
}) {
  const items = includeEmail ? social : social.filter((item) => item.name !== "Email");

  return (
    <div className={className}>
      {items.map((item) => (
        <a
          key={item.name}
          className="text-link"
          href={item.link}
          target={item.link.startsWith("mailto:") ? undefined : "_blank"}
          rel={item.link.startsWith("mailto:") ? undefined : "noopener noreferrer"}
        >
          {item.name}
        </a>
      ))}
    </div>
  );
}
