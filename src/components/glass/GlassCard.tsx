"use client";

import React from "react";
import { motion, type Transition } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const springTransition: Transition = {
  type: "spring" as const,
  bounce: 0.3,
  duration: 0.4,
};

export default function GlassCard({
  children,
  className = "",
  hover = true,
  onClick,
}: GlassCardProps) {
  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        transition={springTransition}
        className={`glass-card rounded-2xl p-6 transition-all duration-300 cursor-pointer glass-card-hover ${className}`}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      className={`glass-card rounded-2xl p-6 transition-all duration-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
