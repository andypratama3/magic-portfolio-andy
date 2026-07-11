"use client";

import Masonry from "react-masonry-css";
import { Media } from "@once-ui-system/core";
import styles from "./Gallery.module.scss";
import { gallery } from "@/resources";
import Link from "next/link";

export default function MasonryGrid() {
  const breakpointColumnsObj = {
    default: 2,
    720: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles.masonryGrid}
      columnClassName={styles.masonryGridColumn}
    >
      {gallery.items.map((item, index) => (
        <div key={index} className={styles.gridItem}>
          <div className={styles.imageContainer}>
            <Media
              priority={index < 10}
              sizes="(max-width: 560px) 100vw, 50vw"
              aspectRatio={item.orientation === "horizontal" ? "16 / 9" : "3 / 4"}
              src={item.src}
              alt={item.alt}
            />
          </div>
          <div className={styles.cardContent}>
            <span className={styles.badge}>Digital Product</span>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDescription}>{item.description}</p>
            {item.link && (
              <Link href={item.link} className={styles.cardLink}>
                <span>View Product</span>
                <span className={styles.cardLinkIcon}>→</span>
              </Link>
            )}
          </div>
        </div>
      ))}
    </Masonry>
  );
}
