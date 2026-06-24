"use client";

import {
  startTransition,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import { usePageTransition } from "@/components/transitions/PageTransitionProvider";

type TransitionLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "children"
> & {
  href: string;
  scooterId: string;
  children: ReactNode;
};

function hrefWithFocus(href: string, scooterId: string) {
  const separator = href.includes("?") ? "&" : "?";

  return `${href}${separator}focus=${encodeURIComponent(scooterId)}`;
}

export function TransitionLink({
  href,
  scooterId,
  children,
  target,
  onClick,
  ...anchorProps
}: TransitionLinkProps) {
  const router = useRouter();
  const { setTransitionScooter } = usePageTransition();
  const focusedHref = hrefWithFocus(href, scooterId);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey ||
      (target && target !== "_self")
    ) {
      return;
    }

    event.preventDefault();
    setTransitionScooter(scooterId);

    startTransition(() => {
      router.push(focusedHref);
    });
  };

  return (
    <a
      {...anchorProps}
      href={focusedHref}
      target={target}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
