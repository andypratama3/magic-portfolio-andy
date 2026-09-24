"use client";

import Link from "next/link";
import Image from "next/image";
import { Chapter } from "./Chapter";

const facts = [
  { label: "Status", value: "In production" },
  { label: "Scope", value: "52+ modules · 893 routes" },
  { label: "Users", value: "480+ students · 100+ staff" },
  { label: "Access", value: "18 roles · 272 permissions" },
  { label: "Tests", value: "157+ files · 1,233 methods" },
];

const narrative = [
  {
    title: "Problem",
    text: "Enrollment, billing, attendance, and reporting ran on paper and spreadsheets. The same data was re-typed into several systems with no single source of truth.",
  },
  {
    title: "System",
    text: "One platform, 52+ modules: rapor, billing, GPS-geofenced attendance, and an AI-powered WhatsApp bot that answers staff questions through function calling.",
  },
  {
    title: "Architecture",
    text: "Laravel 12 monolith with clean module boundaries, Redis queues, and role-scoped queries so each of the 18 roles only ever sees its own data.",
  },
  {
    title: "Impact",
    text: "893 production routes serving a school that actually runs on it, with 157+ test files keeping the critical paths from regressing.",
  },
];

export function FeaturedCaseStudy() {
  return (
    <div className="featured-case">
      <Chapter
        index="02"
        label="SELECTED WORK"
        sectionId="selected-work"
        title="One platform, written as a system."
        lead="ProductSchool is the flagship: a school management platform that replaced paper and spreadsheets. This is the case study version, not a marketing page."
        action={
          <Link href="/work/productschool" className="btn-secondary">
            Read the full case study
          </Link>
        }
      />

      <div className="case-viewport">
        <div className="case-media">
          <Image
            src="/images/projects/products_shool/dashboard.webp"
            alt="ProductSchool dashboard: school management overview"
            fill
            sizes="(max-width: 1024px) 100vw, 1080px"
            className="media-zoom"
            priority
          />
        </div>
      </div>

      <div className="case-grid">
        <div className="case-intro">
          <p className="kicker">Flagship · Still in production</p>
          <h3 className="text-h2" style={{ margin: "0.4rem 0 0.6rem" }}>
            ProductSchool
          </h3>
          <p className="text-body-large" style={{ margin: 0 }}>
            Enterprise school management for SD Muhammadiyah 3 Samarinda. Billing, rapor,
            attendance, a WhatsApp bot, and the integration layer under all of it.
          </p>
        </div>

        <dl className="case-facts">
          {facts.map((fact) => (
            <div className="case-fact" key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <ol className="case-narrative">
        {narrative.map((note) => (
          <li className="case-note" key={note.title}>
            <p className="case-note-title">{note.title}</p>
            <p>{note.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default FeaturedCaseStudy;