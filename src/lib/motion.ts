// Motion presets — import from design config
// Usage: <motion.div {...fadeInUp} />

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' as const },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3 },
};

export const springPop = {
  initial: { scale: 0.5, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { type: 'spring' as const, stiffness: 200, damping: 15 },
};

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.06 } },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export const hoverLift = {
  whileHover: { scale: 1.04, y: -2 },
  whileTap: { scale: 0.97 },
  transition: { type: 'spring' as const, stiffness: 400, damping: 25 },
};
