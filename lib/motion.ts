import { Variants, cubicBezier } from "framer-motion";

// Use framer-motion's typed easing function to satisfy Easing/Easing[] types
export const easeStandard = cubicBezier(0.4, 0, 0.2, 1);

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeStandard },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, ease: easeStandard },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: easeStandard } },
};


