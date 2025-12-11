"use client";

import { motion } from "framer-motion";
import { PropsWithChildren, ReactNode } from "react";
import { fadeInUp, staggerContainer } from "@/lib/motion";

type SectionProps = PropsWithChildren<{
  id?: string;
  className?: string;
  title?: ReactNode;
  subdued?: boolean; // for gray background
  dark?: boolean; // for dark background
  center?: boolean; // center align content & title
  padYClass?: string; // override vertical padding
}>;

export function Section({ id, className, title, children, subdued, dark, center, padYClass }: SectionProps) {
  const baseColors = dark
    ? "bg-neutral-950 text-white"
    : subdued
    ? "bg-neutral-50 text-neutral-900"
    : "bg-white text-neutral-900";
  const py = padYClass ? padYClass : "py-16 md:py-24";

  return (
    <section
      id={id}
      className={`${py} ${baseColors} ${className ?? ""}`}
    >
      <div className={`mx-auto max-w-7xl px-4 md:px-6 ${center ? "text-center" : ""}`}>
        {title ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-10"
          >
            <motion.h2 variants={fadeInUp} className={`text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight ${center ? "mx-auto" : ""}`}>
              {title}
            </motion.h2>
          </motion.div>
        ) : null}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          {children}
        </motion.div>
      </div>
    </section>
  );
}

export default Section;


