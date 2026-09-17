"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_TOP_THRESHOLD = 100;

function getClampedScrollY() {
  const maxScrollY = Math.max(
    document.documentElement.scrollHeight - window.innerHeight,
    0,
  );

  return Math.min(Math.max(window.scrollY, 0), maxScrollY);
}

export function useScrollDirection(
  topThreshold = DEFAULT_TOP_THRESHOLD,
) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    lastScrollYRef.current = getClampedScrollY();

    const updateVisibility = () => {
      const currentScrollY = getClampedScrollY();
      const previousScrollY = lastScrollYRef.current;

      if (currentScrollY < topThreshold) {
        setIsVisible(true);
      } else if (currentScrollY > previousScrollY) {
        setIsVisible(false);
      } else if (currentScrollY < previousScrollY) {
        setIsVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
      frameRef.current = null;
    };

    const handleScroll = () => {
      if (frameRef.current !== null) return;

      frameRef.current = window.requestAnimationFrame(updateVisibility);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [topThreshold]);

  return isVisible;
}
