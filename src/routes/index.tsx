import { createFileRoute, Link } from "@tanstack/react-router";
import { Petals } from "@/components/Petals";
import anniversaryRings from "@/assets/anniversary-rings.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "For You — A Two Month Anniversary Surprise" },
      {
        name: "description",
        content:
          "A hand-painted Ghibli-style surprise for our two month wedding anniversary. Tap to begin the puzzle.",
      },
      { property: "og:title", content: "For You — A Two Month Anniversary Surprise" },
      {
        property: "og:description",
        content:
          "Open a little painted world, solve the puzzle, and find a wish waiting inside.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
      <Petals />
      <div className="animate-float pointer-events-none absolute -right-12 top-20 h-24 w-44 rounded-full bg-card/70 blur-[2px]" />
      <div className="animate-float pointer-events-none absolute -left-10 bottom-32 h-16 w-32 rounded-full bg-card/60 blur-[2px] [animation-delay:2.5s]" />

      <section className="animate-pop relative w-full max-w-sm text-center">
        <div className="card-soft mx-auto mb-8 w-52 rotate-[-3deg] rounded-[1.75rem] border-8 border-card bg-card p-0 overflow-hidden">
          <img
            src={anniversaryRings.url}
            alt="A couple's hands intertwined, showing their wedding and engagement rings"
            width={1024}
            height={1024}
            className="h-full w-full object-cover"
          />
        </div>

        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
          A small surprise
        </p>
        <h1 className="mt-3 text-5xl leading-[1.05] text-foreground">
          For my favourite person
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          I painted us a little world and then broke it into pieces. Put it back
          together and something sweet is waiting on the other side.
        </p>

        <Link
          to="/puzzle"
          className="card-soft mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
        >
          Begin the puzzle 🌸
        </Link>
      </section>
    </main>
  );
}
