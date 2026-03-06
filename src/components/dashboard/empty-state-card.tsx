"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function EmptyStateCard({
  title,
  message,
  ctaLabel,
}: {
  title: string;
  message: string;
  ctaLabel: string;
}) {
  return (
    <Card className="relative overflow-hidden w-full h-[320px] flex flex-col items-center justify-center text-center p-6 border border-dashed border-border-default shadow-none bg-surface-page/50">
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        {/* SVG Isometric Grid and Blueprint */}
        <svg
          viewBox="0 0 400 300"
          className="w-[120%] h-[120%] max-w-[500px] opacity-70"
        >
          <defs>
            <filter id="blueprint-glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Isometric Transform Group for Base Grid */}
          <g transform="translate(200, 180) scale(1, 0.5) rotate(45)">
            {/* Grid Pattern */}
            <g
              stroke="var(--color-border-default)"
              strokeWidth="1"
              strokeDasharray="2 2"
              opacity="0.5"
            >
              {[...Array(9)].map((_, i) => (
                <line
                  key={`h-${i}`}
                  x1="-80"
                  y1={-80 + i * 20}
                  x2="80"
                  y2={-80 + i * 20}
                />
              ))}
              {[...Array(9)].map((_, i) => (
                <line
                  key={`v-${i}`}
                  x1={-80 + i * 20}
                  y1="-80"
                  x2={-80 + i * 20}
                  y2="80"
                />
              ))}
            </g>

            {/* Base shadow */}
            <rect
              x="-20"
              y="-20"
              width="40"
              height="40"
              fill="var(--color-border-subtle)"
              opacity="0.6"
            />
          </g>

          {/* Floating blueprint polygon above the center */}
          <motion.g
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            transform="translate(200, 140) scale(1, 0.5) rotate(45)"
          >
            <rect
              x="-20"
              y="-20"
              width="40"
              height="40"
              fill="none"
              stroke="var(--color-accent-primary)"
              strokeWidth="2"
              filter="url(#blueprint-glow)"
            />
            <path
              d="M -20 -20 L 20 20 M -20 20 L 20 -20"
              stroke="var(--color-accent-primary)"
              strokeWidth="1"
              opacity="0.5"
            />
          </motion.g>
        </svg>
      </div>

      <div className="relative z-10 max-w-sm">
        <h3 className="text-text-primary font-semibold tracking-tight text-lg mb-2">
          {title}
        </h3>
        <p className="text-text-secondary text-sm mb-6">{message}</p>
        <Button
          variant="outline"
          className="text-accent-primary border-accent-primary/20 hover:bg-accent-subtle bg-surface-card"
        >
          {ctaLabel}
        </Button>
      </div>
    </Card>
  );
}
