"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export function AssetAllocationCard() {
  return (
    <Card className="relative overflow-hidden w-full h-[320px]">
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        <svg
          viewBox="0 0 400 400"
          className="w-[120%] h-[120%] opacity-80 max-w-[500px]"
        >
          <title>Asset Allocation Orbit</title>
          <defs>
            <linearGradient id="comet-tail" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                stopColor="var(--color-accent-primary)"
                stopOpacity="0.8"
              />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
            <filter id="glow-planet">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Orbits */}
          {[80, 130, 180].map((radius) => (
            <motion.circle
              key={`orbit-${radius}`}
              cx="200"
              cy="200"
              r={radius}
              stroke="var(--color-border-default)"
              strokeWidth="1"
              strokeDasharray="4 4"
              fill="none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: (radius / 50) * 0.2 }}
            />
          ))}

          {/* Central Nucleus */}
          <circle cx="200" cy="200" r="4" fill="var(--color-border-default)" />

          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "200px 200px" }}
          >
            {/* Comet tail for the main planet on the outermost orbit */}
            <path
              d="M 200 20 A 180 180 0 0 1 350 100"
              stroke="url(#comet-tail)"
              strokeWidth="2"
              fill="none"
            />
            {/* Main Planet (Ações) */}
            <circle
              cx="200"
              cy="20"
              r="12"
              fill="var(--color-accent-primary)"
              filter="url(#glow-planet)"
            />

            {/* Inner Planets */}
            <circle
              cx="120"
              cy="136"
              r="8"
              fill="var(--color-text-secondary)"
            />
            <circle cx="260" cy="252" r="6" fill="var(--color-text-muted)" />
          </motion.g>
        </svg>
      </div>

      <div className="relative z-10 flex flex-col h-full pointer-events-none p-6">
        <h3 className="text-text-primary tracking-tight text-base font-semibold font-sans mb-4">
          Assets Under Management
        </h3>
        <div className="mt-auto pointer-events-auto flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-primary shadow-[0_0_8px_rgba(79,70,229,0.6)]"></div>
              <span className="text-text-primary font-medium">
                Ações Brasil
              </span>
            </div>
            <span className="text-text-secondary">45%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-text-secondary"></div>
              <span className="text-text-primary font-medium">Renda Fixa</span>
            </div>
            <span className="text-text-secondary">35%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#f97316]"></div>
              <span className="text-text-primary font-medium">Fundos</span>
            </div>
            <span className="text-text-secondary">20%</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
