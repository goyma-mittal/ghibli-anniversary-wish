import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { SwapPuzzle } from "@/components/SwapPuzzle";
import { Petals } from "@/components/Petals";
import couplePhoto from "@/assets/couple-photo.jpg.asset.json";

export const Route = createFileRoute("/puzzle")({
  head: () => ({
    meta: [
      { title: "The Puzzle — Two Month Anniversary" },
      {
        name: "description",
        content:
          "Swap the hand-painted pieces back into place to unlock a heartfelt two month wedding anniversary wish.",
      },
      { property: "og:title", content: "The Puzzle — Two Month Anniversary" },
      {
        property: "og:description",
        content: "Solve the Ghibli-style picture puzzle and unwrap a love letter.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PuzzlePage,
});

function PuzzlePage() {
  const [solved, setSolved] = useState(false);
  const handleSolved = useCallback(() => setSolved(true), []);

  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-10">
      <Petals />
      <div className="animate-float pointer-events-none absolute -right-10 top-24 h-24 w-40 rounded-full bg-card/70 blur-[2px]" />

      <div className="relative mx-auto max-w-md">
        {!solved ? (
          <>
            <header className="mb-7 text-center">
              <Link to="/" className="text-xs text-muted-foreground underline-offset-4 hover:underline">
                ← back
              </Link>
              <h1 className="mt-3 text-4xl leading-tight text-foreground">
                Put our little world back together
              </h1>
            </header>
            <SwapPuzzle onSolved={handleSolved} />
          </>
        ) : (
          <section className="animate-pop card-soft rounded-3xl border-4 border-card bg-card/90 p-5 text-center backdrop-blur">
            <div className="relative mx-auto aspect-square w-full max-w-[22rem] overflow-hidden rounded-[2rem] border-4 border-card shadow-[var(--shadow-soft)]">
              <img
                src={couplePhoto.url}
                alt="A couple dressed for celebration, standing together under sparkling lights"
                width={1024}
                height={1024}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-5 pt-16">
                <p className="text-xs uppercase tracking-[0.35em] text-white/80">
                  Puzzle complete
                </p>
                <h2 className="mt-2 text-2xl leading-tight text-white">
                  Happy 2nd Month Anniversary, my love
                </h2>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Two months of shared mornings, of your laugh filling quiet rooms, of
              building a home out of small ordinary days. Like this picture, every
              piece of my life makes sense only when it's next to you.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Here's to countless sunsets on our own little hill — I'd solve a
              thousand puzzles to keep finding you at the end of each one.
            </p>
            <p className="mt-5 text-2xl text-accent-foreground">Forever yours 🌸</p>
            <button
              onClick={() => setSolved(false)}
              className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground shadow-[var(--shadow-soft)] transition-opacity hover:opacity-90"
            >
              Play again
            </button>
          </section>
        )}
      </div>
    </main>
  );
}
