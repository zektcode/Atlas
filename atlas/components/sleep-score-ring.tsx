/**
 * The Confidence Ring — Atlas's signature visual motif. A segmented arc
 * (bull/neutral/bear or, in this context, positive/neutral/negative
 * contribution) with the score centered. Reused across the Dashboard and
 * Decision Card so the product has one consistent visual language for
 * "a number plus its composition" — see /design/Design_System.md.
 */
"use client";

interface RingProps {
  score: number; // 0-100
  size?: number;
  segments?: { value: number; color: string }[]; // must sum to <= 100
  label?: string;
}

export function SleepScoreRing({ score, size = 88, segments, label }: RingProps) {
  const radius = size / 2 - size * 0.1;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const defaultSegments = segments ?? [{ value: score, color: "#4ade9a" }];
  let offset = 0;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={center} cy={center} r={radius} fill="none" stroke="#1b1e29" strokeWidth={size * 0.1} />
        {defaultSegments.map((seg, i) => {
          const segLength = (seg.value / 100) * circumference;
          const dashArray = `${segLength} ${circumference}`;
          const dashOffset = -offset;
          offset += segLength;
          return (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={size * 0.1}
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${center} ${center})`}
            />
          );
        })}
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-2xl text-text-1">{score}</span>
        {label && <span className="text-[10px] tracking-wide text-text-3">{label}</span>}
      </div>
    </div>
  );
}
