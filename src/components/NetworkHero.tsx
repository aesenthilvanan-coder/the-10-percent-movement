"use client";
import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  selected: boolean;
  phase: number;
  bornAt: number;
}

export default function NetworkHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let frame = 0;
    let nodes: Node[] = [];

    const N = 32;
    const SELECTED_INDICES = [3, 15, 26];
    const CONNECT_DIST = 155;

    const initNodes = () => {
      const W = canvas.width;
      const H = canvas.height;
      nodes = [];
      frame = 0;
      for (let i = 0; i < N; i++) {
        const edge = Math.floor(Math.random() * 4);
        let sx = 0, sy = 0;
        if (edge === 0) { sx = Math.random() * W; sy = -40; }
        else if (edge === 1) { sx = W + 40; sy = Math.random() * H * 0.7; }
        else if (edge === 2) { sx = Math.random() * W; sy = H * 0.72; }
        else { sx = -40; sy = Math.random() * H * 0.7; }

        nodes.push({
          x: sx, y: sy,
          tx: 60 + Math.random() * (W - 120),
          ty: 40 + Math.random() * (H * 0.65 - 60),
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          selected: SELECTED_INDICES.includes(i),
          phase: Math.random() * Math.PI * 2,
          bornAt: i * 8,
        });
      }
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initNodes();
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, W, H);

      // Update positions
      for (let i = 0; i < N; i++) {
        const n = nodes[i];
        if (frame < n.bornAt) continue;
        const age = frame - n.bornAt;

        if (age < 90) {
          // Flying in — strong lerp to target
          n.x += (n.tx - n.x) * 0.045;
          n.y += (n.ty - n.y) * 0.045;
        } else {
          // Settled — gentle drift
          n.x += n.vx;
          n.y += n.vy;
          n.vx += (Math.random() - 0.5) * 0.008;
          n.vy += (Math.random() - 0.5) * 0.008;
          n.vx = Math.max(-0.45, Math.min(0.45, n.vx));
          n.vy = Math.max(-0.45, Math.min(0.45, n.vy));
          if (n.x < 30 || n.x > W - 30) n.vx *= -1;
          if (n.y < 20 || n.y > H * 0.7) n.vy *= -1;
        }
      }

      // Draw connections
      for (let i = 0; i < N; i++) {
        if (frame < nodes[i].bornAt) continue;
        for (let j = i + 1; j < N; j++) {
          if (frame < nodes[j].bornAt) continue;
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const proximity = 1 - dist / CONNECT_DIST;
            const isHot = nodes[i].selected || nodes[j].selected;
            ctx.strokeStyle = `rgba(255,255,255,${proximity * (isHot ? 0.28 : 0.08)})`;
            ctx.lineWidth = isHot ? 0.8 : 0.45;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < N; i++) {
        const n = nodes[i];
        if (frame < n.bornAt) continue;
        const age = frame - n.bornAt;
        const opacity = Math.min(1, age / 22);

        if (n.selected) {
          // Outer pulse
          const r1 = 18 + Math.sin(frame * 0.045 + n.phase) * 6;
          ctx.beginPath();
          ctx.arc(n.x, n.y, r1, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,255,255,${opacity * 0.09})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // Inner ring
          const r2 = 10 + Math.sin(frame * 0.045 + n.phase) * 2.5;
          ctx.beginPath();
          ctx.arc(n.x, n.y, r2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,255,255,${opacity * 0.22})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();

          // Core with glow
          ctx.save();
          ctx.shadowBlur = 16;
          ctx.shadowColor = `rgba(255,255,255,${opacity * 0.55})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${opacity})`;
          ctx.fill();
          ctx.restore();

          // Labels
          ctx.font = "7px 'Courier New', monospace";
          ctx.fillStyle = `rgba(255,255,255,${opacity * 0.26})`;
          ctx.fillText("COHORT", n.x + 9, n.y - 5);
          ctx.fillStyle = `rgba(255,255,255,${opacity * 0.15})`;
          ctx.fillText("MEMBER", n.x + 9, n.y + 5);
        } else {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${opacity * 0.28})`;
          ctx.fill();
        }
      }

      // Status readout (bottom-right, above gradient)
      const active = nodes.filter((n) => frame > n.bornAt + 80).length;
      if (active > 0) {
        ctx.font = "8px 'Courier New', monospace";
        ctx.fillStyle = "rgba(255,255,255,0.08)";
        ctx.fillText(
          `${active} NODES ACTIVE · ${SELECTED_INDICES.length} SELECTED`,
          W - 245,
          H * 0.7 - 12
        );
      }

      frame++;
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
        <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 border border-[#2a2a2a] rounded-full bg-black/80 text-xs text-[#888] w-fit backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80 animate-pulse" />
          Applications open June 11, 2026
        </div>
        <p className="text-xs text-[#555] uppercase tracking-[0.2em] font-medium mb-4">Research Cohort</p>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight max-w-3xl leading-tight">
          A community of researchers who believe the outlier{" "}
          <span className="text-[#555]">deserves the same rigor as the majority.</span>
        </h1>
      </div>
    </section>
  );
}
