"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface ImageItem {
  src: string;
  alt?: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: (string | ImageItem)[];
  title?: string;
  columns?: 2 | 3 | 4;
}

export function ImageGallery({ images = [], title, columns = 3 }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const formattedImages: ImageItem[] = images.map((img, idx) => {
    if (typeof img === "string") {
      return {
        src: img,
        alt: title ? `${title} screenshot ${idx + 1}` : `System screenshot ${idx + 1}`,
      };
    }
    return {
      src: img.src,
      alt: img.alt || `System screenshot ${idx + 1}`,
      caption: img.caption,
    };
  });

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const showNext = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % formattedImages.length : null));
  }, [formattedImages.length]);

  const showPrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + formattedImages.length) % formattedImages.length : null
    );
  }, [formattedImages.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, showNext, showPrev]);

  if (!formattedImages || formattedImages.length === 0) return null;

  return (
    <div style={{ width: "100%", margin: "2.5rem 0" }}>
      {title && (
        <h3
          className="kicker"
          style={{
            display: "block",
            marginBottom: "1rem",
          }}
        >
          {title}
        </h3>
      )}

      {/* Grid Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${
            columns === 2 ? "380px" : "280px"
          }), 1fr))`,
          gap: "1.25rem",
          width: "100%",
        }}
      >
        {formattedImages.map((img, index) => (
          <div
            key={index}
            className="gallery-tile"
            onClick={() => openLightbox(index)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openLightbox(index);
              }
            }}
            role="button"
            tabIndex={0}
            style={{
              position: "relative",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              cursor: "pointer",
              aspectRatio: "16 / 10",
              background: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <Image
              src={img.src}
              alt={img.alt || "Screenshot"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="media-zoom"
              style={{ objectFit: "cover" }}
            />
            <div
              className="gallery-overlay"
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(14,13,11,0.72) 0%, rgba(14,13,11,0) 55%)",
                transition: "opacity 0.25s ease",
                display: "flex",
                alignItems: "flex-end",
                padding: "0.875rem",
              }}
            >
              <span style={{ color: "#f3f0e8", fontSize: "0.8125rem", fontWeight: 500 }}>
                Look closer · {index + 1}/{formattedImages.length}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "rgba(0, 0, 0, 0.92)",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              top: "1.25rem",
              left: "1.5rem",
              right: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: 100000,
            }}
          >
            <div style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.9375rem", fontWeight: 500 }}>
              {formattedImages[selectedIndex]?.alt || "Image Preview"}{" "}
              <span style={{ opacity: 0.5, marginLeft: "0.5rem" }}>
                ({selectedIndex + 1} / {formattedImages.length})
              </span>
            </div>
            <button
              type="button"
              onClick={closeLightbox}
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#ffffff",
                borderRadius: "9999px",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "1.25rem",
              }}
              aria-label="Close lightbox"
            >
              ✕
            </button>
          </div>

          {/* Main Image View */}
          <div
            className="lightbox-media"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "92vw",
              maxHeight: "82vh",
              width: "1240px",
              height: "760px",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              boxShadow: "0 25px 80px rgba(0,0,0,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src={formattedImages[selectedIndex].src}
              alt={formattedImages[selectedIndex].alt || "Image"}
              fill
              sizes="90vw"
              priority
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            style={{
              position: "absolute",
              left: "1.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255, 255, 255, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              borderRadius: "9999px",
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "1.5rem",
              zIndex: 100000,
            }}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            style={{
              position: "absolute",
              right: "1.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255, 255, 255, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              borderRadius: "9999px",
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "1.5rem",
              zIndex: 100000,
            }}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
