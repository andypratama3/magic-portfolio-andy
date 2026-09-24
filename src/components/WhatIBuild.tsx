"use client";

import { Chapter } from "./Chapter";

const categories = [
  {
    index: "01",
    name: "Production systems",
    description:
      "Long-lived platforms students, staff, and civil servants use daily. Built to survive contact with real users.",
  },
  {
    index: "02",
    name: "Digital products",
    description:
      "Self-contained tools with actual users and a maintenance plan: enrollment, rapor, billing, attendance.",
  },
  {
    index: "03",
    name: "Business automation",
    description:
      "WhatsApp bots, payroll, and the reports that used to eat an entire workday.",
  },
  {
    index: "04",
    name: "APIs & integrations",
    description:
      "REST APIs and the glue between payments, messaging, and legacy data.",
  },
];

export function WhatIBuild() {
  return (
    <div>
      <Chapter
        index="01"
        label="WHAT I BUILD"
        sectionId="what-i-build"
        title="Systems people depend on every day."
        lead="Four kinds of work, all of it production-facing. If a school runs its morning roll, a department meets a deadline, or a shop closes its books on this code, it counts."
      />

      <ul className="what-list" aria-label="Types of work">
        {categories.map((category) => (
          <li className="what-row" key={category.index}>
            <span className="what-row-index" aria-hidden="true">
              {category.index}
            </span>
            <h3 className="what-row-name">{category.name}</h3>
            <p className="what-row-desc">{category.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WhatIBuild;