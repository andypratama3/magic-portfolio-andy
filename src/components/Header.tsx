"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { LiveClock } from "./LiveClock";
import { SocialLinks } from "./SocialLinks";
import styles from "./Header.module.scss";

const links = [
  { href: "/work", label: "Work", match: (path: string) => path.startsWith("/work") },
  { href: "/#how-i-build", label: "Process", match: () => false },
  { href: "/about", label: "About", match: (path: string) => path === "/about" },
  { href: "/#contact", label: "Contact", match: () => false },
];

const mobileNavItems = [
  { num: "01", href: "/", label: "Home", match: (path: string) => path === "/" },
  { num: "02", href: "/work", label: "Selected Work", match: (path: string) => path.startsWith("/work") },
  { num: "03", href: "/#how-i-build", label: "Process", match: () => false },
  { num: "04", href: "/about", label: "About", match: (path: string) => path === "/about" },
  { num: "05", href: "/#contact", label: "Contact", match: () => false },
];

export const Header = () => {
  const pathname = usePathname() ?? "";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const handleLinkClick = useCallback((href: string) => {
    setIsMenuOpen(false);
    if (href.startsWith("/#") && pathname === "/") {
      const targetId = href.replace("/#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      if (isMenuOpen) {
        setHidden(false);
        last = current;
        return;
      }
      setHidden(current > last && current > 80);
      last = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMenuOpen]);

  return (
    <header className={`${styles.header} ${hidden ? styles.headerHidden : ""}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="Andy Pratama home">
          <span className={styles.brandName}>Andy Pratama</span>
        </Link>

        <div className={styles.statusPill}>
          <span className="status-dot" aria-hidden="true" />
          <span>Available</span>
          <span className={styles.statusTime}>
            · <LiveClock />
          </span>
        </div>

        <nav className={styles.nav} aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${link.match(pathname) ? styles.navLinkActive : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <Link href="/#contact" className={styles.contactBtn}>
            Let&apos;s talk
          </Link>
          <button
            type="button"
            className={`${styles.mobileToggle} ${isMenuOpen ? styles.mobileToggleActive : ""}`}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <span className={styles.hamburgerBar} />
            <span className={styles.hamburgerBar} />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className={styles.mobileDrawer}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <nav className={styles.mobileNavList} aria-label="Mobile primary">
            {mobileNavItems.map((item, index) => {
              const isActive = item.match(pathname);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => handleLinkClick(item.href)}
                  className={`${styles.mobileDrawerLink} ${isActive ? styles.mobileDrawerLinkActive : ""}`}
                  style={{ animationDelay: `${index * 45 + 50}ms` }}
                >
                  <div className={styles.linkLeft}>
                    <span className={styles.linkNum}>{item.num}</span>
                    <span className={styles.linkTitle}>{item.label}</span>
                  </div>
                  {isActive ? (
                    <span className={styles.activeBadge}>Current</span>
                  ) : (
                    <svg
                      className={styles.linkArrow}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className={styles.drawerCtaWrapper}>
            <Link
              href="/#contact"
              onClick={() => handleLinkClick("/#contact")}
              className={styles.drawerContactBtn}
            >
              <span>Start a project / Get in touch</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          <div className={styles.drawerFooter}>
            <div className={styles.drawerStatus}>
              <span className="status-dot" aria-hidden="true" />
              <span>Available for new work · Samarinda</span>
              <span className={styles.statusTime}>
                · <LiveClock />
              </span>
            </div>
            <SocialLinks includeEmail className={styles.drawerSocials} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
