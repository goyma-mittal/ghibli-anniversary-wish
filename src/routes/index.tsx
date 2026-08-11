import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { SlidePuzzle } from "@/components/SlidePuzzle";
import { Petals } from "@/components/Petals";
import puzzleImage from "@/assets/ghibli-puzzle.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Little Puzzle For Us — 2 Month Anniversary" },
      {
        name: "description",
        content:
          "Slide the Ghibli-style pieces back together to unlock a heartfelt wish for our two month wedding anniversary.",
      },
      { property: "og:title", content: "A Little Puzzle For Us — 2 Month Anniversary" },
      {
        property: "og:description",
        content:
          "Solve the hand-painted sliding puzzle and unwrap a love letter for our two month anniversary.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [solved, setSolved] = useState(false);
  const handleSolved = useCallback(() => setSolved(true), []);

  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-10">
      <Petals />
      <div className="animate-float pointer-events-none absolute -right-10 top-24 h-24 w-40 rounded-full bg-card/70 blur-[2px]" />
      <div className="animate-float pointer-events-none absolute -left-8 top-56 h-16 w-28 rounded-full bg-card/60 blur-[2px] [animation-delay:2s]" />

      <div className="relative mx-auto max-w-md">
        {!solved ? (
          <>
            <header className="mb-7 text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                Two months of us
              </p>
              <h1 className="mt-3 text-4xl leading-tight text-foreground">
                Put our little world back together
              </h1>
              <p className="mt-3 text-sm text-muted-foreground">
                Slide the pieces into place. A wish is hiding behind the picture.
              </p>
            </header>
            <SlidePuzzle onSolved={handleSolved} />
          </>
        ) : (
          <section className="animate-pop card-soft rounded-3xl border-4 border-card bg-card/90 p-6 text-center backdrop-blur">
            <img
              src={puzzleImage}
              alt="Illustration of a couple watching the sunset beneath a blossoming tree"
              width={1024}
              height={1024}
              className="mx-auto mb-6 w-full rounded-2xl"
            />
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
              Puzzle complete
            </p>
            <h2 className="mt-3 text-4xl leading-tight text-foreground">
              Happy 2nd Month Anniversary, my love
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Two months of shared mornings, of your laugh filling quiet rooms, of
              building a home out of small ordinary days. Like this picture, every
              piece of my life makes sense only when it's next to you.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Here's to countless sunsets on our own little hill — I'd solve a
              thousand puzzles to keep finding you at the end of each one.
            </p>
            <p className="mt-6 text-2xl text-accent-foreground">
              Forever yours 🌸
            </p>
            <button
              onClick={() => setSolved(false)}
              className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground shadow-[var(--shadow-soft)] transition-opacity hover:opacity-90"
            >
              Play again
            </button>
          </section>
        )}
      </div>
    </main>
  );
}
