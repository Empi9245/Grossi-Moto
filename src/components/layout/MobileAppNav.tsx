"use client";

import { Bike, Home, Phone, Wrench } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useScrollDirection } from "@/hooks/useScrollDirection";

const appNavItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Gamma", href: "/scooters", icon: Bike },
  { label: "Servizi", href: "/servizi", icon: Wrench },
  { label: "Contatti", href: "/contatti", icon: Phone },
] as const;

function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === href : pathname.startsWith(href);
}

export function MobileAppNav() {
  const pathname = usePathname();
  const isVisible = useScrollDirection();
  const [homeHeroVisibility, setHomeHeroVisibility] = useState(() => ({
    pathname,
    visible: pathname === "/",
  }));

  useEffect(() => {
    if (pathname !== "/") {
      setHomeHeroVisibility({ pathname, visible: false });
      return;
    }

    const hero = document.querySelector<HTMLElement>(
      '[data-qa="hero-viewport"]',
    );

    if (!hero) {
      setHomeHeroVisibility({ pathname, visible: false });
      return;
    }

    const heroRect = hero.getBoundingClientRect();
    setHomeHeroVisibility({
      pathname,
      visible: heroRect.bottom > 0 && heroRect.top < window.innerHeight,
    });

    const observer = new IntersectionObserver(([entry]) => {
      setHomeHeroVisibility({
        pathname,
        visible: Boolean(entry?.isIntersecting),
      });
    });

    observer.observe(hero);

    return () => observer.disconnect();
  }, [pathname]);

  const isHomeHeroVisible =
    homeHeroVisibility.pathname === pathname
      ? homeHeroVisibility.visible
      : pathname === "/";
  const shouldShow = isVisible && !isHomeHeroVisible;

  return (
    <nav
      aria-label="Navigazione principale mobile"
      inert={!shouldShow}
      className={`mobile-app-nav fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-[1100] grid grid-cols-4 gap-1 overflow-hidden rounded-[1.45rem] bg-[oklch(12%_0.014_42/0.94)] p-1.5 text-[oklch(92%_0.012_78)] shadow-[0_16px_42px_rgba(17,11,9,0.28)] ring-1 ring-[oklch(96%_0.008_80/0.12)] backdrop-blur-xl transition-[clip-path,opacity] duration-[340ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[clip-path,opacity] motion-reduce:transition-none lg:hidden ${
        shouldShow
          ? "opacity-100 [clip-path:inset(0_0_0_0_round_1.45rem)]"
          : "pointer-events-none opacity-0 [clip-path:inset(0_50%_0_50%_round_999px)]"
      }`}
    >
      {appNavItems.map(({ label, href, icon: Icon }) => {
        const isActive = isActivePath(pathname, href);

        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={
              isActive
                ? "font-ui flex min-h-12 min-w-0 flex-col items-center justify-center gap-1 rounded-[1.05rem] bg-[oklch(94%_0.01_78)] px-1 text-[oklch(17%_0.014_50)] outline-none transition-[background,color,transform] duration-200 active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-[oklch(76%_0.04_72)]"
                : "font-ui flex min-h-12 min-w-0 flex-col items-center justify-center gap-1 rounded-[1.05rem] px-1 text-[oklch(92%_0.012_78/0.68)] outline-none transition-[background,color,transform] duration-200 active:scale-[0.96] focus-visible:bg-[oklch(92%_0.012_78/0.12)] focus-visible:ring-2 focus-visible:ring-[oklch(76%_0.04_72)]"
            }
          >
            <Icon aria-hidden="true" className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.8} />
            <span className="max-w-full truncate text-[0.59rem] font-bold uppercase tracking-[0.08em]">
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
