"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";

type PageTransitionSource = "showroom" | null;

type PageTransitionState = {
  activeScooterId: string | null;
  source: PageTransitionSource;
};

type PageTransitionContextValue = PageTransitionState & {
  shouldReduceMotion: boolean;
  setTransitionScooter: (scooterId: string) => void;
  clearTransitionScooter: () => void;
};

const initialTransitionState: PageTransitionState = {
  activeScooterId: null,
  source: null,
};

const PageTransitionContext =
  createContext<PageTransitionContextValue | null>(null);

const showroomMorphCleanupDelayMs = 420;

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [transitionState, setTransitionState] = useState<PageTransitionState>(
    initialTransitionState,
  );
  const previousPathnameRef = useRef(pathname);

  const setTransitionScooter = useCallback((scooterId: string) => {
    setTransitionState({
      activeScooterId: scooterId,
      source: "showroom",
    });
  }, []);

  const clearTransitionScooter = useCallback(() => {
    setTransitionState(initialTransitionState);
  }, []);

  useEffect(() => {
    const previousPathname = previousPathnameRef.current;

    previousPathnameRef.current = pathname;

    if (transitionState.source !== "showroom") {
      return;
    }

    if (pathname === "/scooters") {
      const timeout = window.setTimeout(
        () => setTransitionState(initialTransitionState),
        showroomMorphCleanupDelayMs,
      );

      return () => window.clearTimeout(timeout);
    }

    if (previousPathname !== pathname) {
      setTransitionState(initialTransitionState);
    }
  }, [pathname, transitionState.source]);

  useEffect(() => {
    const clearOnHistoryRestore = () => {
      setTransitionState(initialTransitionState);
    };

    window.addEventListener("popstate", clearOnHistoryRestore);
    window.addEventListener("pageshow", clearOnHistoryRestore);

    return () => {
      window.removeEventListener("popstate", clearOnHistoryRestore);
      window.removeEventListener("pageshow", clearOnHistoryRestore);
    };
  }, []);

  const contextValue = useMemo<PageTransitionContextValue>(
    () => ({
      ...transitionState,
      shouldReduceMotion,
      setTransitionScooter,
      clearTransitionScooter,
    }),
    [
      clearTransitionScooter,
      setTransitionScooter,
      shouldReduceMotion,
      transitionState,
    ],
  );
  const shouldKeepExitingPageForMorph =
    Boolean(transitionState.activeScooterId) &&
    transitionState.source === "showroom" &&
    !shouldReduceMotion;

  return (
    <PageTransitionContext.Provider value={contextValue}>
      <LayoutGroup id="grossimoto-page-transition">
        <div className="grid min-h-[100dvh] min-w-0">
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={pathname}
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 1 }}
              transition={{
                duration:
                  shouldReduceMotion || !shouldKeepExitingPageForMorph
                    ? 0.01
                    : showroomMorphCleanupDelayMs / 1000,
              }}
              className="col-start-1 row-start-1 min-h-[100dvh] min-w-0 w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext);

  if (!context) {
    throw new Error("usePageTransition must be used inside PageTransitionProvider");
  }

  return context;
}
