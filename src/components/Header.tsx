"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Analytics } from "@vercel/analytics/next"
import { gsap } from 'gsap';

import { Fade, Flex, Line, ToggleButton } from "@once-ui-system/core";

import { routes, display, person, about, work, gallery } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.scss";
import { premiumEase } from "@/utils/gsap";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string; // Optionally allow locale, defaulting to 'en-GB'
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "en-GB" }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

export const Header = () => {
  const pathname = usePathname() ?? "";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate nav entrance
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: premiumEase }
      );
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    if (menuRef.current) {
      if (!isMenuOpen) {
        // Open menu with staggered reveal
        gsap.to(menuRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: premiumEase,
        });
        
        const links = menuRef.current.querySelectorAll('a');
        gsap.fromTo(links,
          { y: 20, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.5, 
            stagger: 0.1, 
            ease: premiumEase 
          }
        );
      } else {
        // Close menu
        gsap.to(menuRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: premiumEase,
        });
      }
    }
  };

  return (
    <>
      <Fade hide="s" fillWidth position="fixed" height="80" zIndex={9} />
      <Fade show="s" fillWidth position="fixed" bottom="0" to="top" height="80" zIndex={9} />
      
      {/* Fluid Island Navigation */}
      <Flex
        ref={navRef}
        fitHeight
        position="fixed"
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        style={{
          top: '24px',
          marginTop: '1.5rem',
        }}
      >
        <Flex
          background="page"
          border="neutral-alpha-weak"
          radius="m-4"
          shadow="l"
          padding="4"
          horizontal="center"
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            background: 'rgba(var(--surface-rgb), 0.8)',
            borderRadius: '9999px',
            padding: '0.5rem 1.5rem',
            transition: `all 0.7s ${premiumEase}`,
          }}
          className="hover:shadow-2xl"
        >
          <Flex gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
            {routes["/"] && (
              <ToggleButton 
                prefixIcon="home" 
                href="/" 
                selected={pathname === "/"}
                style={{
                  borderRadius: '9999px',
                  padding: '0.5rem 1rem',
                  transition: `all 0.3s ${premiumEase}`,
                }}
                className="hover:scale-105 active:scale-95"
              />
            )}
            <Line background="neutral-alpha-medium" vert maxHeight="24" />
            {routes["/about"] && (
              <>
                <ToggleButton
                  className="s-flex-hide hover:scale-105 active:scale-95"
                  prefixIcon="person"
                  href="/about"
                  label={about.label}
                  selected={pathname === "/about"}
                  style={{
                    borderRadius: '9999px',
                    padding: '0.5rem 1rem',
                    transition: `all 0.3s ${premiumEase}`,
                  }}
                />
                <ToggleButton
                  className="s-flex-show hover:scale-105 active:scale-95"
                  prefixIcon="person"
                  href="/about"
                  selected={pathname === "/about"}
                  style={{
                    borderRadius: '9999px',
                    padding: '0.5rem 1rem',
                    transition: `all 0.3s ${premiumEase}`,
                  }}
                />
              </>
            )}
            {routes["/work"] && (
              <>
                <ToggleButton
                  className="s-flex-hide hover:scale-105 active:scale-95"
                  prefixIcon="grid"
                  href="/work"
                  label={work.label}
                  selected={pathname.startsWith("/work")}
                  style={{
                    borderRadius: '9999px',
                    padding: '0.5rem 1rem',
                    transition: `all 0.3s ${premiumEase}`,
                  }}
                />
                <ToggleButton
                  className="s-flex-show hover:scale-105 active:scale-95"
                  prefixIcon="grid"
                  href="/work"
                  selected={pathname.startsWith("/work")}
                  style={{
                    borderRadius: '9999px',
                    padding: '0.5rem 1rem',
                    transition: `all 0.3s ${premiumEase}`,
                  }}
                />
              </>
            )}
            {routes["/gallery"] && (
              <>
                <ToggleButton
                  className="s-flex-hide hover:scale-105 active:scale-95"
                  prefixIcon="gallery"
                  href="/gallery"
                  label={gallery.label}
                  selected={pathname.startsWith("/gallery") || pathname.startsWith("/product")}
                  style={{
                    borderRadius: '9999px',
                    padding: '0.5rem 1rem',
                    transition: `all 0.3s ${premiumEase}`,
                  }}
                />
                <ToggleButton
                  className="s-flex-show hover:scale-105 active:scale-95"
                  prefixIcon="gallery"
                  href="/gallery"
                  selected={pathname.startsWith("/gallery") || pathname.startsWith("/product")}
                  style={{
                    borderRadius: '9999px',
                    padding: '0.5rem 1rem',
                    transition: `all 0.3s ${premiumEase}`,
                  }}
                />
              </>
            )}
            {display.themeSwitcher && (
              <>
                <Line background="neutral-alpha-medium" vert maxHeight="24" />
                <ThemeToggle />
              </>
            )}
          </Flex>
        </Flex>
      </Flex>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
          }}
        >
          {/* Mobile Menu Links */}
          <Flex
            direction="column"
            gap="l"
            horizontal="center"
            style={{ fontSize: '2rem' }}
          >
            {routes["/"] && (
              <ToggleButton
                prefixIcon="home"
                href="/"
                selected={pathname === "/"}
                label="Home"
                style={{ fontSize: '1.5rem' }}
                onClick={() => setIsMenuOpen(false)}
              />
            )}
            {routes["/about"] && (
              <ToggleButton
                prefixIcon="person"
                href="/about"
                selected={pathname === "/about"}
                label={about.label}
                style={{ fontSize: '1.5rem' }}
                onClick={() => setIsMenuOpen(false)}
              />
            )}
            {routes["/work"] && (
              <ToggleButton
                prefixIcon="grid"
                href="/work"
                selected={pathname.startsWith("/work")}
                label={work.label}
                style={{ fontSize: '1.5rem' }}
                onClick={() => setIsMenuOpen(false)}
              />
            )}
            {routes["/gallery"] && (
              <ToggleButton
                prefixIcon="gallery"
                href="/gallery"
                selected={pathname.startsWith("/gallery") || pathname.startsWith("/product")}
                label={gallery.label}
                style={{ fontSize: '1.5rem' }}
                onClick={() => setIsMenuOpen(false)}
              />
            )}
          </Flex>
        </div>
      )}

      {/* Hamburger Button for Mobile */}
      <Flex
        show="s"
        position="fixed"
        style={{
          bottom: '24px',
          right: '24px',
          zIndex: 100,
          width: '56px',
          height: '56px',
          borderRadius: '9999px',
          background: 'var(--surface)',
          border: '1px solid var(--neutral-alpha-medium)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          cursor: 'pointer',
          alignItems: 'center',
          justifyContent: 'center',
          transition: `all 0.3s ${premiumEase}`,
        }}
        className="hover:scale-110 active:scale-95"
        onClick={toggleMenu}
      >
        <Flex
          direction="column"
          gap="4"
          style={{
            width: '24px',
            transition: `all 0.3s ${premiumEase}`,
          }}
        >
          <div
            style={{
              width: '100%',
              height: '2px',
              background: 'var(--neutral-strong)',
              borderRadius: '1px',
              transition: `all 0.3s ${premiumEase}`,
              transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }}
          />
          <div
            style={{
              width: '100%',
              height: '2px',
              background: 'var(--neutral-strong)',
              borderRadius: '1px',
              transition: `all 0.3s ${premiumEase}`,
              opacity: isMenuOpen ? 0 : 1,
            }}
          />
          <div
            style={{
              width: '100%',
              height: '2px',
              background: 'var(--neutral-strong)',
              borderRadius: '1px',
              transition: `all 0.3s ${premiumEase}`,
              transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            }}
          />
        </Flex>
      </Flex>

      <Analytics />
    </>
  );
};
