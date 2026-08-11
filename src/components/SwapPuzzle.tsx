import { useCallback, useEffect, useMemo, useState } from "react";
import puzzleImage from "@/assets/ghibli-puzzle.jpg";

const SIZE = 3;
const TILES = SIZE * SIZE;

function shuffled() {
  let order: number[];
  do {
    order = [...Array(TILES).keys()].sort(() => Math.random() - 0.5);
  } while (order.every((v, i) => v === i));
  return order;
}

export function SwapPuzzle({ onSolved }: { onSolved: () => void }) {
  const [order, setOrder] = useState<number[]>(() => [...Array(TILES).keys()]);
  const [selected, setSelected] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setOrder(shuffled());
  }, []);

  const solved = useMemo(
    () => started && order.every((v, i) => v === i),
    [order, started],
  );

  useEffect(() => {
    if (solved) onSolved();
  }, [solved, onSolved]);

  const tap = useCallback(
    (idx: number) => {
      setSelected((sel) => {
        if (sel === null) return idx;
        if (sel === idx) return null;
        setOrder((cur) => {
          const next = [...cur];
          next[idx] = cur[sel]!;
          next[sel] = cur[idx]!;
          return next;
        });
        setMoves((m) => m + 1);
        setStarted(true);
        return null;
      });
    },
    [],
  );

  const reset = () => {
    setOrder(shuffled());
    setMoves(0);
    setStarted(false);
    setSelected(null);
  };

  return (
    <div className="w-full">
      <div className="card-soft mx-auto grid aspect-square w-full max-w-[22rem] grid-cols-3 gap-2 rounded-[2rem] border-4 border-card bg-card/80 p-2 backdrop-blur">
        {order.map((tile, idx) => {
          const isSel = selected === idx;
          const inPlace = tile === idx;
          return (
            <button
              key={idx}
              onClick={() => tap(idx)}
              aria-label={`Piece ${tile + 1}`}
              className={`relative overflow-hidden rounded-2xl bg-cover transition-all duration-200 active:scale-95 ${
                isSel
                  ? "scale-95 rotate-1 ring-4 ring-primary"
                  : inPlace
                    ? "ring-2 ring-primary/25"
                    : "ring-1 ring-border"
              }`}
              style={{
                backgroundImage: `url(${puzzleImage})`,
                backgroundSize: `${SIZE * 100}% ${SIZE * 100}%`,
                backgroundPosition: `${(tile % SIZE) * 50}% ${
                  Math.floor(tile / SIZE) * 50
                }%`,
              }}
            />
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-center gap-4 text-sm text-muted-foreground">
        <span>Swaps: {moves}</span>
        <button
          onClick={reset}
          className="rounded-full bg-primary px-4 py-2 text-primary-foreground shadow-[var(--shadow-soft)] transition-opacity hover:opacity-90"
        >
          Shuffle again
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Tap one piece, then tap another to swap them.
      </p>
    </div>
  );
}
