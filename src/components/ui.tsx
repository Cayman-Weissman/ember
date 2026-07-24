"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function FadeUp({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

type BtnProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "solid" | "ghost" | "line";
  className?: string;
  disabled?: boolean;
};

export function Btn({
  children,
  href,
  onClick,
  type = "button",
  variant = "solid",
  className = "",
  disabled,
}: BtnProps) {
  const cls =
    variant === "ghost"
      ? `text-sm font-semibold text-muted hover:text-fg ${className}`
      : variant === "line"
        ? `ember-btn-line ${className}`
        : `ember-btn ${className}`;

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={cls.trim()}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cls.trim()}
    >
      {children}
    </button>
  );
}
