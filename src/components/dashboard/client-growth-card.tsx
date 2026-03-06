"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export function ClientGrowthCard() {
  return (
    <Card className="relative overflow-hidden w-full h-[360px] col-span-4 lg:col-span-4">
      {/* Background SVG Concept: Wealth Mountain */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-end">
        <svg
          viewBox="0 0 800 300"
          className="w-full h-[80%] opacity-60 mt-auto"
          preserveAspectRatio="none"
        >
          <title>Client Growth Evolution</title>
          <defs>
            <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="var(--color-accent-primary)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="fade" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop
                offset="0%"
                stopColor="var(--color-accent-primary)"
                stopOpacity="0.1"
              />
              <stop
                offset="100%"
                stopColor="var(--color-accent-primary)"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          {/* Minimalist Sun */}
          <motion.circle
            cx="650"
            cy="100"
            r="40"
            stroke="var(--color-border-default)"
            strokeWidth="1"
            fill="none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {/* Polygonal Mountain Background */}
          <motion.path
            d="M0,300 L0,250 L150,180 L350,220 L550,120 L800,190 L800,300 Z"
            fill="url(#fade)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          <motion.path
            d="M0,250 L150,180 L350,220 L550,120 L800,190"
            stroke="var(--color-border-default)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Connecting glowing line (Fiber optic) */}
          <motion.path
            d="M0,200 L200,150 L400,170 L600,80 L800,120"
            stroke="url(#glow)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
            style={{
              filter: "drop-shadow(0px 4px 12px rgba(79, 70, 229, 0.4))",
            }}
          />

          {/* Data Nodes */}
          {[
            { id: "node-1", cx: 200, cy: 150 },
            { id: "node-2", cx: 400, cy: 170 },
            { id: "node-3", cx: 600, cy: 80 },
          ].map((point, i) => (
            <motion.circle
              key={point.id}
              cx={point.cx}
              cy={point.cy}
              r="4"
              fill="var(--color-surface-card)"
              stroke="var(--color-accent-primary)"
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.5 + i * 0.2, type: "spring" }}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between p-6">
        <div className="absolute top-6 left-6">
          <h3 className="text-text-primary tracking-tight text-base font-semibold font-sans">
            Client Growth
          </h3>
        </div>
        <div className="mt-auto pointer-events-auto pb-4">
          <div className="flex items-center gap-2 mt-2">
            {/* Adding the SVG labels at the bottom to match the old chart's axes conceptually */}
            <div className="flex w-full justify-between text-text-muted text-xs absolute bottom-6 left-6 pr-12 font-medium overflow-hidden whitespace-nowrap">
              <span>03/2025</span>
              <span>05/2025</span>
              <span>07/2025</span>
              <span>09/2025</span>
              <span>11/2025</span>
              <span>01/2026</span>
            </div>
            {/* Data Points Vertical */}
            <div className="flex flex-col h-[200px] justify-between text-text-muted text-xs absolute bottom-12 left-6 font-medium">
              <span>1200</span>
              <span>900</span>
              <span>600</span>
              <span>300</span>
              <span>0</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
