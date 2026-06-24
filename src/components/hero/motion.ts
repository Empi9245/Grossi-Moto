import type { MotionProps } from "framer-motion";

const premiumEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

type RevealOptions = {
  delay?: number;
  duration?: number;
  scale?: number;
  y?: number;
};

export function revealMotion(
  shouldReduceMotion: boolean | null,
  { delay = 0, duration = 0.58, scale = 0.98, y = 18 }: RevealOptions = {},
): MotionProps {
  if (shouldReduceMotion) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.01 },
    };
  }

  return {
    initial: { opacity: 0, y, scale },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: {
      delay,
      duration,
      ease: premiumEase,
    },
  };
}

export function subtleHover(shouldReduceMotion: boolean | null) {
  if (shouldReduceMotion) {
    return {};
  }

  return {
    whileHover: { scale: 1.025 },
    whileTap: { scale: 0.985 },
    transition: { duration: 0.2, ease: premiumEase },
  };
}
