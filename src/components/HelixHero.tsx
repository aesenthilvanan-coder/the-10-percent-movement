"use client";
import { useEffect, useRef } from "react";

export default function HelixHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let phase = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Point = { x: number; y: number; z: number };

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H * 0.38;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, W, H);

      const AMP = Math.min(H * 0.24, 98);
      const xL = W * 0.05;
      const xR = W * 0.95;
      const xSpan = xR - xL;
      const TURNS = 2.5;
      const STEPS = 110;

      const s1: Point[] = [];
      const s2: Point[] = [];

      for (let i = 0; i <= STEPS; i++) {
        const progress = i / STEPS;
        const x = xL + progress * xSpan;
        const angle = progress * Math.PI * 2 * TURNS + phase;
        s1.push({ x, y: cy + Math.sin(angle) * AMP, z: Math.cos(angle) });
        s2.push({ x, y: cy - Math.sin(angle) * AMP, z: -Math.cos(angle) });
      }

      // Cross-links (rungs)
      for (let i = 0; i <= STEPS; i += 5) {
        const p1 = s1[i];
        const p2 = s2[i];
        const depth = (p1.z + 1) * 0.5;
        ctx.strokeStyle = `rgba(255,255,255,${0.04 + depth * 0.1})`;
        ctx.lineWidth = 0.55;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        // Rung midpoint node
        const mx = (p1.x + p2.x) / 2;
        const my = (p1.y + p2.y) / 2;
        ctx.beginPath();
        ctx.arc(mx, my, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.06 + depth * 0.1})`;
        ctx.fill();
      }

      // Draw strands as per-segment lines (depth-aware)
      const drawStrand = (pts: Point[]) => {
        for (let i = 0; i < pts.length - 1; i++) {
          const p = pts[i];
          const q = pts[i + 1];
          const avgZ = (p.z + q.z) * 0.5;
          const depth = (avgZ + 1) * 0.5;
          ctx.strokeStyle = `rgba(255,255,255,${0.07 + depth * 0.6})`;
          ctx.lineWidth = 0.45 + depth * 1.3;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      };

      drawStrand(s1);
      drawStrand(s2);

      // Strand nodes sorted front-to-back for proper depth ordering
      const allPts = [...s1, ...s2].sort((a, b) => a.z - b.z);
      for (const p of allPts) {
        const depth = (p.z + 1) * 0.5;
        const r = 1.2 + depth * 3.2;
        const alpha = 0.08 + depth * 0.82;

        if (depth > 0.65) {
          ctx.save();
          ctx.shadowBlur = 7 + depth * 5;
          ctx.shadowColor = `rgba(255,255,255,${depth * 0.3})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
          ctx.fill();
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.4, r * 0.65), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${alpha * 0.6})`;
          ctx.fill();
        }
      }

      // Central axis (very subtle)
      ctx.strokeStyle = "rgba(255,255,255,0.018)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(xL, cy);
      ctx.lineTo(xR, cy);
      ctx.stroke();

      // DNA label
      ctx.font = "8px 'Courier New', monospace";
      ctx.fillStyle = "rgba(255,255,255,0.07)";
      ctx.fillText("DOUBLE HELIX · CYP2C19 VARIANT", xL, cy - AMP - 18);

      phase -= 0.009;
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
      <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/85 to-transparent pointer-events-none z-[5]" />
      <div className="relative z-10 flex flex-col justify-end min-h-[70vh] max-w-6xl mx-auto px-6 pb-16 pt-24">
        <p className="text-xs text-[#555] uppercase tracking-[0.2em] font-medium mb-4">The Movement</p>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight max-w-3xl leading-tight">
          Science is built on averages.{" "}
          <span className="text-[#555]">Millions of patients fall outside them.</span>
        </h1>
      </div>
    </section>
  );
}
