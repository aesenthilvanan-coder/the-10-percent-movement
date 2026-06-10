"use client";
import { useEffect, useRef } from "react";

export default function TriOrbitHero() {
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

    const ORBITS = [
      { r: 0.21, speed: 0.0012, a0: 0, tilt: 0.38, label: "AS" },
      { r: 0.30, speed: -0.00075, a0: Math.PI * 0.65, tilt: -0.22, label: "C" },
      { r: 0.17, speed: 0.0017, a0: Math.PI * 1.35, tilt: 0.52, label: "B" },
    ];

    const TRAIL = 50;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H * 0.4;
      const base = Math.min(W, H);

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#0d0d0d";
      ctx.fillRect(0, 0, W, H);

      // Orbital path ellipses (very faint)
      ORBITS.forEach(({ r, tilt }) => {
        const orbitR = base * r;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(1, Math.cos(Math.abs(tilt) * 0.9));
        ctx.beginPath();
        ctx.arc(0, 0, orbitR, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,255,255,0.04)";
        ctx.lineWidth = 0.7;
        ctx.stroke();
        ctx.restore();
      });

      // Nucleus
      ctx.save();
      ctx.shadowBlur = 22;
      ctx.shadowColor = "rgba(255,255,255,0.25)";
      ctx.beginPath();
      ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.fill();
      ctx.restore();

      // Inner halo ring
      ctx.beginPath();
      ctx.arc(cx, cy, 10, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Orbital particles
      ORBITS.forEach(({ r, speed, a0, tilt, label }) => {
        const orbitR = base * r;
        const cosT = Math.cos(Math.abs(tilt) * 0.9);

        // Trail
        for (let j = TRAIL; j > 0; j--) {
          const trailAngle = a0 + (t - j * 0.8) * speed * 1000;
          const tx = cx + Math.cos(trailAngle) * orbitR;
          const ty = cy + Math.sin(trailAngle) * orbitR * cosT;
          const depthT = (Math.sin(trailAngle) * Math.sin(tilt) + 1) * 0.5;
          const alpha = ((TRAIL - j) / TRAIL) * 0.18 * (0.4 + depthT * 0.6);
          ctx.beginPath();
          ctx.arc(tx, ty, 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
          ctx.fill();
        }

        // Current position
        const angle = a0 + t * speed * 1000;
        const px = cx + Math.cos(angle) * orbitR;
        const py = cy + Math.sin(angle) * orbitR * cosT;
        const depth = (Math.sin(angle) * Math.sin(tilt) + 1) * 0.5;

        // Connection line to nucleus (very faint)
        ctx.strokeStyle = `rgba(255,255,255,${0.025 + depth * 0.04})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(px, py);
        ctx.stroke();

        // Node glow
        ctx.save();
        ctx.shadowBlur = 12 + depth * 10;
        ctx.shadowColor = `rgba(255,255,255,${0.3 + depth * 0.45})`;
        ctx.beginPath();
        ctx.arc(px, py, 3 + depth * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.5 + depth * 0.5})`;
        ctx.fill();
        ctx.restore();

        // Initial label
        ctx.font = "8px 'Courier New', monospace";
        ctx.fillStyle = `rgba(255,255,255,${0.14 + depth * 0.2})`;
        ctx.fillText(label, px + 7, py - 4);
      });

      // Cross-connection lines between orbital particles (at current positions)
      const positions = ORBITS.map(({ r, speed, a0, tilt }) => {
        const orbitR = base * r;
        const cosT = Math.cos(Math.abs(tilt) * 0.9);
        const angle = a0 + t * speed * 1000;
        return {
          x: cx + Math.cos(angle) * orbitR,
          y: cy + Math.sin(angle) * orbitR * cosT,
        };
      });

      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          ctx.strokeStyle = "rgba(255,255,255,0.03)";
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(positions[i].x, positions[i].y);
          ctx.lineTo(positions[j].x, positions[j].y);
          ctx.stroke();
        }
      }

      // Subtle label at top
      ctx.font = "8px 'Courier New', monospace";
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      ctx.fillText("THREE FOUNDERS · ONE MISSION", cx - 110, cy - base * ORBITS[1].r - 22);

      t += 0.016;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative min-h-[70vh] border-b border-[#1e1e1e] overflow-hidden bg-[#0d0d0d]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/85 to-transparent pointer-events-none z-[5]" />
      <div className="relative z-10 flex flex-col justify-end min-h-[70vh] max-w-6xl mx-auto px-6 pb-16 pt-24">
        <p className="text-xs text-[#555] uppercase tracking-[0.2em] font-medium mb-4">Team</p>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight max-w-3xl leading-tight">
          Three founders.{" "}
          <span className="text-[#555]">One conviction.</span>
        </h1>
      </div>
    </section>
  );
}
