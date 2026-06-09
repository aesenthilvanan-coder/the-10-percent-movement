"use client";
import { useEffect, useRef, useState, CSSProperties } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  animation?: "slide-up" | "slide-right" | "reveal-left" | "scale-reveal" | "iris-reveal";
  delay?: number;
  threshold?: number;
  style?: CSSProperties;
}

export default function AnimateIn({
  children,
  className = "",
  animation = "slide-up",
  delay = 0,
  threshold = 0.1,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`${animation} ${inView ? "in-view" : ""} ${className}`}
      style={{ ...style, transitionDelay: delay ? `${delay}s` : undefined }}
    >
      {children}
    </div>
  );
}
