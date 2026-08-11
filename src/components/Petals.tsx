const petals = Array.from({ length: 14 }, (_, i) => ({
  left: (i * 7.3) % 100,
  delay: (i % 7) * 1.6,
  duration: 12 + (i % 5) * 3,
  size: 8 + (i % 4) * 4,
}));

export function Petals() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      {petals.map((p, i) => (
        <span
          key={i}
          className="animate-petal absolute top-0 block rounded-[100%_0_100%_0] bg-blossom/70"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
