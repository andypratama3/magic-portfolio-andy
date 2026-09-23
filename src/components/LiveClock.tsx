"use client";

import { useEffect, useState } from "react";

const TIME_ZONE = "Asia/Makassar";

function getParts(now: Date) {
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(now);

  const weekday = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    weekday: "long",
  }).format(now);

  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: TIME_ZONE,
      hour: "numeric",
      hour12: false,
    }).format(now)
  );

  const partOfDay = hour < 11 ? "morning" : hour < 17 ? "afternoon" : hour < 21 ? "evening" : "night";

  return { time, weekday, partOfDay };
}

export function LiveClock({ variant = "short" }: { variant?: "short" | "long" }) {
  const [parts, setParts] = useState<ReturnType<typeof getParts> | null>(null);

  useEffect(() => {
    const tick = () => setParts(getParts(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!parts) {
    return <span>{variant === "long" ? "Samarinda" : "--:--"}</span>;
  }

  if (variant === "long") {
    return (
      <span>
        {parts.weekday} {parts.partOfDay} in Samarinda · {parts.time}
      </span>
    );
  }

  return <span>{parts.time}</span>;
}
