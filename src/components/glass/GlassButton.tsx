"use client";

import React from "react";
import { motion } from "framer-motion";

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export default function GlassButton({
  children,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
  disabled = false,
}: GlassButtonProps) {
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs rounded-lg",
    md: "px-6 py-3 text-sm rounded-xl",
    lg: "px-8 py-4 text-base rounded-xl",
  };

  const variantStyles = {
    primary:
      "glass border-glass-border-hover text-text-primary hover:brightness-110",
    secondary:
      "bg-surface border-border-default text-text-secondary hover:bg-surface-hover",
    ghost:
      "bg-transparent border-transparent text-text-muted hover:text-text-primary hover:bg-glass-bg-hover",
  };

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 font-medium border transition-all duration-200 ${
        sizeStyles[size]
      } ${variantStyles[variant]} ${
        disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
    >
      {children}
    </motion.button>
  );
}
