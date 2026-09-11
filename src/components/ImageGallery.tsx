"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Flex, Text, Icon } from "@once-ui-system/core";

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
        alt: title ? `${title} screenshot ${idx + 1}` : `Project screenshot ${idx + 1}`,
      };
    }
    return {
      src: img.src,
      alt: img.alt || `Project screenshot ${idx + 1}`,
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
    <div style={{ width: "100%", margin: "2rem 0" }}>
      {title && (
        <Text
          variant="heading-strong-m"
          style={{ marginBottom: "1rem", letterSpacing: "-0.01em" }}
        >
          {title}
        </Text>
      )}

      {/* Grid Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${
            columns === 2 ? "320px" : "240px"
          }), 1fr))`,
          gap: "1.25rem",
          width: "100%",
        }}
      >
        {formattedImages.map((img, index) => (
          <div
            key={index}
            onClick={() => openLightbox(index)}
            style={{
              position: "relative",
              borderRadius: "1rem",
              overflow: "hidden",
              cursor: "pointer",
              aspectRatio: "16 / 10",
              background: "var(--surface-background, var(--page-background))",
              border: "1px solid var(--neutral-alpha-medium)",
              boxShadow: "var(--shadow-sm)",
              transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1)`,
            }}
            className="group hover:scale-[1.03] hover:shadow-xl"
          >
            <Image
              src={img.src}
              alt={img.alt || "Screenshot"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                objectFit: "cover",
                transition: `transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)`,
              }}
              className="group-hover:scale-105"
            />
            {/* Overlay badge */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 60%)",
                opacity: 0,
                transition: "opacity 0.3s ease",
                display: "flex",
                alignItems: "flex-end",
                padding: "0.875rem",
              }}
              className="group-hover:!opacity-100"
            >
              <Flex vertical="center" gap="s">
                <Icon name="openLink" size="s" style={{ color: "#ffffff" }} />
                <Text
                  variant="body-default-xs"
                  style={{ color: "#ffffff", fontWeight: 500 }}
                >
                  Click to enlarge ({index + 1}/{formattedImages.length})
                </Text>
              </Flex>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          onClick={closeLightbox}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "rgba(0, 0, 0, 0.88)",
            backdropFilter: "blur(16px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
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
            <Text variant="body-default-m" style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>
              {formattedImages[selectedIndex]?.alt || "Image Preview"}{" "}
              <span style={{ opacity: 0.6, marginLeft: "0.5rem" }}>
                ({selectedIndex + 1} / {formattedImages.length})
              </span>
            </Text>
            <button
              onClick={closeLightbox}
              style={{
                background: "rgba(255, 255, 255, 0.12)",
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
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)")}
            >
              ✕
            </button>
          </div>

          {/* Main Image View */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "92vw",
              maxHeight: "80vh",
              width: "1200px",
              height: "750px",
              borderRadius: "1rem",
              overflow: "hidden",
              boxShadow: "0 25px 80px rgba(0,0,0,0.5)",
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
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            style={{
              position: "absolute",
              left: "1.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255, 255, 255, 0.12)",
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
              backdropFilter: "blur(8px)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.28)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)")}
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            style={{
              position: "absolute",
              right: "1.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255, 255, 255, 0.12)",
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
              backdropFilter: "blur(8px)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.28)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)")}
          >
            ›
          </button>

          {/* Bottom Thumbnails Navigation */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "flex",
              gap: "0.5rem",
              marginTop: "1.25rem",
              maxWidth: "90vw",
              overflowX: "auto",
              padding: "0.5rem",
              background: "rgba(255,255,255,0.06)",
              borderRadius: "9999px",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {formattedImages.map((thumb, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                style={{
                  width: "56px",
                  height: "36px",
                  position: "relative",
                  borderRadius: "8px",
                  overflow: "hidden",
                  cursor: "pointer",
                  opacity: idx === selectedIndex ? 1 : 0.45,
                  border:
                    idx === selectedIndex
                      ? "2px solid #ffffff"
                      : "1px solid transparent",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
              >
                <Image src={thumb.src} alt="thumbnail" fill style={{ objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
