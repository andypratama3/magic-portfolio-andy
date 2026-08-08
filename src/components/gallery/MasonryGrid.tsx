"use client";

import Masonry from "react-masonry-css";
import { Media } from "@once-ui-system/core";
import styles from "./Gallery.module.scss";
import { gallery } from "@/resources";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { staggeredReveal, premiumEase } from "@/utils/gsap";

export default function MasonryGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  const breakpointColumnsObj = {
    default: 2,
    720: 1,
  };

  useEffect(() => {
    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll('.grid-item');
      staggeredReveal(Array.from(items) as HTMLElement[], 0.15);
    }
  }, []);

  return (
    <div ref={containerRef}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.masonryGrid}
        columnClassName={styles.masonryGridColumn}
      >
        {gallery.items.map((item, index) => (
          <div 
            key={index} 
            className={`${styles.gridItem} grid-item`}
            style={{
              transition: `all 0.6s ${premiumEase}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div className={styles.imageContainer} style={{ overflow: 'hidden' }}>
              <Media
                priority={index < 10}
                sizes="(max-width: 560px) 100vw, 50vw"
                aspectRatio={item.orientation === "horizontal" ? "16 / 9" : "3 / 4"}
                src={item.src}
                alt={item.alt}
                style={{
                  transition: `transform 0.6s ${premiumEase}`,
                }}
                className="group-hover:scale-110"
              />
            </div>
            <div className={styles.cardContent}>
              <span className={styles.badge}>Digital Product</span>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDescription}>{item.description}</p>
              {item.link && (
                <Link 
                  href={item.link} 
                  className={styles.cardLink}
                  style={{
                    transition: `all 0.3s ${premiumEase}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <span>View Product</span>
                  <span className={styles.cardLinkIcon}>→</span>
                </Link>
              )}
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  );
}
