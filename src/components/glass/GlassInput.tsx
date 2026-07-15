"use client";

import React from "react";

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function GlassInput({
  className = "",
  ...props
}: GlassInputProps) {
  return (
    <input
      className={`glass-input rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-muted w-full transition-all duration-200 ${className}`}
      {...props}
    />
  );
}
