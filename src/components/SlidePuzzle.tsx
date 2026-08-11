import { useCallback, useEffect, useMemo, useState } from "react";
import puzzleImage from "@/assets/ghibli-puzzle.jpg";

const SIZE = 3;
const TILES = SIZE * SIZE;

function isSolvable(order: number[]) {
  let inv = 0;
  const arr = order.filter((n) => n !== TILES - 1);
  for (let i = 0; i < arr.length; i++)
    for (let j = i + 1; j < arr.length; j++) if (arr[i]! > arr[j]!) inv++;
  return inv % 2 === 0;
}

function shuffled() {
  let order: number[];
  do {
    order = [...Array(TILES).keys()].sort(() => Math.random() - 0.5);
  } while (!isSolvable(order) || order.every((v, i) => v === i));
  return order;
}

export function SlidePuzzle({ onSolved }: { onSolved: () => void }) {
  const [order, setOrder] = useState<number[]>(() => [...Array(TILES).keys()]);
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

  const move = useCallback(
    (idx: number) => {
      setOrder((cur) => {
        const blank = cur.indexOf(TILES - 1);
        const [r1, c1] = [Math.floor(idx / SIZE), idx % SIZE];
        const [r2, c2] = [Math.floor(blank / SIZE), blank % SIZE];
        if (Math.abs(r1 - r2) + Math.abs(c1 - c2) !== 1) return cur;
        const next = [...cur];
        next[idx] = cur[blank]!;
        next[blank] = cur[idx]!;
        setMoves((m) => m + 1);
        setStarted(true);
        return next;
      });
    },
    [],
  );

  return (
    <div className="w-full">
      <div className="card-soft mx-auto grid aspect-square w-full max-w-[22rem] grid-cols-3 gap-[3px] overflow-hidden rounded-3xl border-4 border-card bg-card p-[3px]">
        {order.map((tile, idx) => {
          const isBlank = tile === TILES - 1;
          return (
            <button
              key={idx}
              onClick={() => move(idx)}
              aria-label={`Tile ${tile + 1}`}
              className={`relative overflow-hidden rounded-xl transition-transform duration-150 active:scale-95 ${
                isBlank && !solved ? "bg-secondary/60" : ""
              }`}
              style={
                isBlank && !solved
                  ? undefined
                  : {
                      backgroundImage: `url(${puzzleImage})`,
                      backgroundSize: `${SIZE * 100}% ${SIZE * 100}%`,
                      backgroundPosition: `${(tile % SIZE) * 50}% ${
                        Math.floor(tile / SIZE) * 50
                      }%`,
                    }
              }
            />
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-center gap-4 text-sm text-muted-foreground">
        <span>Moves: {moves}</span>
        <button
          onClick={() => {
            setOrder(shuffled());
            setMoves(0);
            setStarted(false);
          }}
          className="rounded-full bg-primary px-4 py-2 text-primary-foreground shadow-[var(--shadow-soft)] transition-opacity hover:opacity-90"
        >
          Shuffle again
        </button>
      </div>
    </div>
  );
}
