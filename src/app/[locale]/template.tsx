"use client";
import { motion } from "framer-motion";

// IMPORTANT : pas de transform (y, scale, etc.) ici.
// Les `transform` sur un parent créent un nouveau containing block
// qui casse `position: fixed` des enfants (la nav, le curseur).
// On utilise UNIQUEMENT opacity.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
