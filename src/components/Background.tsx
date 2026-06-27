import { useMemo } from "react";

export function Background() {
  const stars = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.7 + 0.3,
    }));
  }, []);

  const clouds = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 80,
      y: Math.random() * 80,
      w: Math.random() * 200 + 150,
      h: Math.random() * 80 + 60,
      dur: Math.random() * 15 + 12,
      delay: Math.random() * -10,
      dx: (Math.random() - 0.5) * 60,
      dy: (Math.random() - 0.5) * 30,
    }));
  }, []);

  return (
    <div className="stars-layer">
      {/* Glow orbs */}
      <div
        className="orb"
        style={{
          width: 400,
          height: 400,
          left: "-10%",
          top: "-10%",
          background: "radial-gradient(circle, rgba(123,58,237,0.3) 0%, transparent 70%)",
          "--dur": "7s",
        } as React.CSSProperties}
      />
      <div
        className="orb"
        style={{
          width: 350,
          height: 350,
          right: "-5%",
          bottom: "-10%",
          background: "radial-gradient(circle, rgba(59,91,219,0.25) 0%, transparent 70%)",
          "--dur": "9s",
        } as React.CSSProperties}
      />
      <div
        className="orb"
        style={{
          width: 200,
          height: 200,
          right: "30%",
          top: "20%",
          background: "radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)",
          "--dur": "5s",
        } as React.CSSProperties}
      />

      {/* Clouds */}
      {clouds.map((c) => (
        <div
          key={c.id}
          className="cloud"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: c.w,
            height: c.h,
            "--dur": `${c.dur}s`,
            "--delay": `${c.delay}s`,
            "--dx": `${c.dx}px`,
            "--dy": `${c.dy}px`,
          } as React.CSSProperties}
        />
      ))}

      {/* Stars */}
      {stars.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            "--duration": `${s.duration}s`,
            "--delay": `${s.delay}s`,
            "--max-opacity": s.opacity,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
