"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export function RecentTransactionsCard() {
  return (
    <Card className="relative overflow-hidden w-full h-[320px]">
      <div className="absolute inset-y-0 right-0 w-2/3 pointer-events-none z-0">
        <svg
          viewBox="0 0 400 300"
          className="w-[150%] h-full opacity-40 ml-auto"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="wave-fade" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="100%" stopColor="var(--color-text-muted)" />
            </linearGradient>
          </defs>

          {/* 3 Sinuous Waves */}
          {[
            { d: "M -100 150 Q 50 100, 200 150 T 500 150", width: 1 },
            { d: "M -100 170 Q 100 220, 250 170 T 500 170", width: 2 },
            { d: "M -100 190 Q 150 140, 300 190 T 500 190", width: 1 },
          ].map((wave, i) => (
            <motion.path
              key={`wave-${i}`}
              d={wave.d}
              stroke="url(#wave-fade)"
              strokeWidth={wave.width}
              fill="none"
              animate={{ x: [0, 50, 0] }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Arrows riding the middle wave */}
          {[1, 2, 3].map((i) => (
            <motion.g
              key={`arrow-${i}`}
              animate={{ x: [-50, 350], y: [-10, 10, -10], opacity: [0, 1, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: i * 2,
                ease: "linear",
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <path
                d="M 50 170 L 60 160 M 60 160 L 50 160 M 60 160 L 60 170"
                stroke="var(--color-accent-primary)"
                strokeWidth="1.5"
                fill="none"
                opacity="0.8"
              />
            </motion.g>
          ))}
        </svg>
      </div>

      <div className="relative z-10 flex flex-col h-full pointer-events-none p-6 w-full max-w-[60%]">
        <h3 className="text-text-secondary tracking-tight text-sm font-medium uppercase font-sans">
          Liquidez & Fluxo
        </h3>

        <div className="mt-8 space-y-5 pointer-events-auto">
          {[
            { label: "Aporte Renda Fixa", value: "+ R$ 2.500,00", type: "in" },
            { label: "Rendimento FIIs", value: "+ R$ 450,00", type: "in" },
            { label: "Compra BOVA11", value: "- R$ 1.200,00", type: "out" },
          ].map((tx, i) => (
            <div
              key={i}
              className="flex justify-between items-center text-sm border-b border-border-subtle pb-2 last:border-0"
            >
              <span className="text-text-primary truncate pr-4">
                {tx.label}
              </span>
              <span
                className={`font-medium shrink-0 ${tx.type === "in" ? "text-status-success" : "text-text-secondary"}`}
              >
                {tx.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
