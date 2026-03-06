"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export function GoalsProgressCard() {
  return (
    <Card className="relative overflow-hidden w-full h-[320px]">
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg viewBox="0 0 600 300" className="w-full h-full">
          <defs>
            <linearGradient
              id="progress-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="transparent" />
              <stop offset="60%" stopColor="var(--color-accent-primary)" />
              <stop offset="60.1%" stopColor="transparent" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <filter id="glow-target">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Base path (The entire journey) */}
          <path
            d="M 50 200 C 200 200, 300 100, 500 120"
            stroke="var(--color-border-default)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="6 6"
          />

          {/* Completed progress path (Trail of light) */}
          <motion.path
            d="M 50 200 C 200 200, 300 100, 500 120"
            stroke="url(#progress-gradient)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{
              filter: "drop-shadow(0px 0px 8px rgba(79, 70, 229, 0.5))",
            }}
          />

          {/* Start Point */}
          <circle
            cx="50"
            cy="200"
            r="6"
            fill="none"
            stroke="var(--color-text-muted)"
            strokeWidth="1"
          />
          <circle cx="50" cy="200" r="2" fill="var(--color-text-muted)" />

          {/* Current Progress Point (60%) */}
          <motion.circle
            cx="290"
            cy="135"
            r="5"
            fill="var(--color-accent-primary)"
            filter="url(#glow-target)"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 1.5, duration: 0.5 }}
          />
          <motion.circle
            cx="290"
            cy="135"
            r="12"
            fill="none"
            stroke="var(--color-accent-primary)"
            strokeWidth="1"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
          />

          {/* End Target */}
          <circle
            cx="500"
            cy="120"
            r="8"
            fill="none"
            stroke="var(--color-border-default)"
            strokeWidth="1"
          />
          <circle
            cx="500"
            cy="120"
            r="14"
            fill="none"
            stroke="var(--color-border-subtle)"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col h-full pointer-events-none p-6">
        <h3 className="text-text-secondary tracking-tight text-sm font-medium uppercase font-sans">
          Progresso de Metas
        </h3>

        <div className="mt-auto pointer-events-auto">
          <div className="mb-2">
            <span className="text-2xl font-semibold tracking-tight text-text-primary">
              60%
            </span>
            <span className="text-text-muted text-sm ml-2">concluído</span>
          </div>
          <h4 className="font-medium text-text-primary">
            Independência Financeira
          </h4>
          <p className="text-text-secondary text-sm mt-1">
            Faltam R$ 400.000 para a chegada
          </p>
        </div>
      </div>
    </Card>
  );
}
