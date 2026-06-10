"use client";
import { useEffect, useRef } from "react";

const EKG: [number, number][] = [
  [-100, 0], [-70, -4], [-58, 0], [-20, 0],
  [-10, 0], [-8, -65], [2, 22], [14, 0], [22, -12], [32, 0], [80, 0],
];

function ekgOffset(dx: number): number {
  if (dx < EKG[0][0] || dx > EKG[EKG.length - 1][0]) return 0;
  for (let i = 0; i < EKG.length - 1; i++) {
    const [x0, y0] = EKG[i];
    const [x1, y1] = EKG[i + 1];
    if (dx >= x0 && dx <= x1) {
      const t = (dx - x0) / (x1 - x0);
      return y0 + t * (y1 - y0);
    }
  }
  return 0;
}

export default function WaveformHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const CHANNELS = 7;
    const GAP_IDX = 3;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, W, H);

      const sweepX = (t * 1.85) % (W + 120) - 20;
      const spikeCenter = sweepX - 90;

      for (let c = 0; c < CHANNELS; c++) {
        const baseY = (H * 0.68 / (CHANNELS + 1)) * (c + 1);
        const isGap = c === GAP_IDX;
        const freq = 0.014 + c * 0.004;
        const speedA = 0.4 + c * 0.05;
        const speedB = 0.26 + c * 0.033;
        const amp = 0.6 + (c % 3) * 0.3;

        if (isGap) {
          // History (left of cursor)
          ctx.beginPath();
          for (let x = 0; x <= Math.min(sweepX, W); x += 0.7) {
            const dx = x - spikeCenter;
            const noise = Math.sin(x * freq + t * speedA) * 1.5 + Math.sin(x * freq * 1.7 + t * speedB) * 0.5;
            const y = baseY + (Math.abs(dx) < 100 ? ekgOffset(dx) : noise);
            x < 0.8 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.strokeStyle = "rgba(255,255,255,0.65)";
          ctx.lineWidth = 1.0;
          ctx.stroke();

          // Glow pass on spike region
          const gStart = Math.max(0, spikeCenter - 100);
          const gEnd = Math.min(sweepX, spikeCenter + 80);
          if (gEnd > gStart) {
            ctx.save();
            ctx.shadowBlur = 14;
            ctx.shadowColor = "rgba(255,255,255,0.45)";
            ctx.beginPath();
            for (let x = gStart; x <= gEnd; x += 0.5) {
              const y = baseY + ekgOffset(x - spikeCenter);
              x <= gStart + 0.6 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.strokeStyle = "rgba(255,255,255,0.95)";
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.restore();
          }

          // Cursor dot + vertical dash
          if (sweepX > 0 && sweepX < W) {
            const dotY = baseY + (Math.abs(sweepX - spikeCenter) < 100
              ? ekgOffset(sweepX - spikeCenter)
              : Math.sin(sweepX * freq + t * speedA) * 1.5);

            ctx.save();
            ctx.shadowBlur = 18;
            ctx.shadowColor = "rgba(255,255,255,0.6)";
            ctx.beginPath();
            ctx.arc(sweepX, dotY, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255,255,255,1)";
            ctx.fill();
            ctx.restore();

            // Vertical dashed cursor line
            ctx.save();
            ctx.setLineDash([2, 4]);
            ctx.strokeStyle = "rgba(255,255,255,0.12)";
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(sweepX, baseY - 80);
            ctx.lineTo(sweepX, baseY + 80);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.restore();
          }

          // Future (right of cursor) — flat baseline
          ctx.beginPath();
          ctx.moveTo(Math.max(sweepX, 0), baseY);
          ctx.lineTo(W, baseY);
          ctx.strokeStyle = "rgba(255,255,255,0.04)";
          ctx.lineWidth = 0.6;
          ctx.stroke();

          // Annotation label near spike
          const labelX = spikeCenter + 8;
          if (labelX > 20 && labelX < W - 180 && spikeCenter > 0) {
            ctx.font = "8px 'Courier New', monospace";
            ctx.fillStyle = "rgba(255,255,255,0.22)";
            ctx.fillText("ANOMALY DETECTED", labelX, baseY - 48);
            ctx.fillStyle = "rgba(255,255,255,0.1)";
            ctx.fillText("RESEARCH GAP ↑", labelX, baseY - 35);
          }
        } else {
          ctx.beginPath();
          for (let x = 0; x <= W; x += 0.8) {
            const y = baseY
              + Math.sin(x * freq + t * speedA) * amp
              + Math.sin(x * freq * 1.85 + t * speedB) * (amp * 0.28);
            x < 0.9 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.strokeStyle = `rgba(255,255,255,${0.035 + (c % 2) * 0.012})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }

        // Channel labels
        ctx.font = "7.5px 'Courier New', monospace";
        ctx.fillStyle = isGap ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.035)";
        const chNum = c < GAP_IDX ? c + 1 : c + 2;
        ctx.fillText(
          isGap ? "CH04 — PHARMACOGENOMIC SIGNAL" : `CH0${chNum}`,
          10,
          baseY - 8
        );
      }

      // Horizontal grid ticks (very faint)
      ctx.strokeStyle = "rgba(255,255,255,0.015)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += 80) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H * 0.72);
        ctx.stroke();
      }

      t += 0.55;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative min-h-[70vh] border-b border-[#1e1e1e] overflow-hidden bg-[#0a0a0a]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Bottom gradient for text legibility */}
      <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/85 to-transparent pointer-events-none z-[5]" />
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[4] opacity-[0.025]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 4px)",
        }}
      />
      <div className="relative z-10 flex flex-col justify-end min-h-[70vh] max-w-6xl mx-auto px-6 pb-16 pt-24">
        <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 border border-[#2a2a2a] rounded-full bg-black/80 text-xs text-[#888] w-fit backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80 animate-pulse" />
          Submissions open June 11, 2026
        </div>
        <p className="text-xs text-[#555] uppercase tracking-[0.2em] font-medium mb-4">The 10% Newsletter</p>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight max-w-3xl leading-tight">
          Research that doesn&apos;t reach the people who need it{" "}
          <span className="text-[#555]">is research that doesn&apos;t matter.</span>
        </h1>
      </div>
    </section>
  );
}
