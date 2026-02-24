import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-surface-page relative overflow-hidden">
      {/* Ambient Texture - Cartografia do Futuro */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none z-0 opacity-5 text-text-primary">
        <svg
          viewBox="0 0 800 800"
          className="w-full h-full"
          preserveAspectRatio="xMaxYMin slice"
        >
          <path
            d="M 400 0 Q 500 200, 800 100 M 350 -50 Q 450 150, 800 50 M 450 50 Q 550 250, 800 150 M 300 100 C 400 400, 600 300, 800 500 M 200 150 C 350 500, 550 400, 800 600 M 100 200 C 300 550, 500 450, 800 700 M 550 0 Q 650 150, 800 100"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M 600 0 Q 700 100, 800 50 M 650 0 Q 750 50, 800 0 M 250 -50 C 350 300, 550 200, 800 400 M 150 0 C 250 350, 450 250, 800 450"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
          />
          <circle
            cx="800"
            cy="0"
            r="200"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            strokeDasharray="4 4"
          />
          <circle
            cx="800"
            cy="0"
            r="300"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            strokeDasharray="2 6"
          />
          <circle
            cx="800"
            cy="0"
            r="450"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            strokeDasharray="1 8"
          />
        </svg>
      </div>

      <Header />

      <main className="flex-1 w-full relative z-10 p-6 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
