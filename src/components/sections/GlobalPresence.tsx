"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function GlobalPresence() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="w-full px-3 md:px-1">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          // Keeps the rounded corners and subtle shadow visible
          className="relative w-full overflow-hidden rounded-[1.5rem] md:rounded-[2rem] shadow-2xl shadow-slate-200/50"
        >
          <Image
            src="/global-presence.png"
            alt="Building Brands Across Borders - India, UK, UAE, USA"
            width={1920}
            height={600}
            quality={100}
            className="h-auto w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}