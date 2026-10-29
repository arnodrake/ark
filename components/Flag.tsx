import type { FlagCode } from "@/lib/i18n/config";

export type { FlagCode };

function starPath(cx: number, cy: number, r: number, rotation = -90) {
  const points: string[] = [];
  for (let i = 0; i < 10; i++) {
    const radius = i % 2 === 0 ? r : r * 0.382;
    const angle = ((rotation + i * 36) * Math.PI) / 180;
    points.push(`${(cx + radius * Math.cos(angle)).toFixed(3)},${(cy + radius * Math.sin(angle)).toFixed(3)}`);
  }
  return `M${points.join("L")}Z`;
}

function UsFlag() {
  const stripeH = 100 / 13;
  const cantonH = stripeH * 7;
  const stars: { x: number; y: number }[] = [];
  for (let row = 0; row < 9; row++) {
    const count = row % 2 === 0 ? 6 : 5;
    for (let col = 0; col < count; col++) {
      stars.push({
        x: (row % 2 === 0 ? 2 * col + 1 : 2 * col + 2) * (76 / 12),
        y: (row + 1) * (cantonH / 10),
      });
    }
  }
  return (
    <svg viewBox="0 0 190 100" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <rect width="190" height="100" fill="#fff" />
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} y={i * 2 * stripeH} width="190" height={stripeH} fill="#b22234" />
      ))}
      <rect width="76" height={cantonH} fill="#3c3b6e" />
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r="1.9" fill="#fff" />
      ))}
    </svg>
  );
}

function MxFlag() {
  return (
    <svg viewBox="0 0 21 14" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <rect width="7" height="14" fill="#006847" />
      <rect x="7" width="7" height="14" fill="#fff" />
      <rect x="14" width="7" height="14" fill="#ce1126" />
      <circle cx="10.5" cy="7" r="1.9" fill="#8c5a2b" />
      <circle cx="10.5" cy="7" r="1.1" fill="#4a7c3a" />
    </svg>
  );
}

function CnFlag() {
  return (
    <svg viewBox="0 0 30 20" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <rect width="30" height="20" fill="#ee1c25" />
      <path d={starPath(5, 5, 3)} fill="#ffde00" />
      <path d={starPath(10, 2, 1, -36)} fill="#ffde00" />
      <path d={starPath(12, 4, 1, -72)} fill="#ffde00" />
      <path d={starPath(12, 7, 1, -108)} fill="#ffde00" />
      <path d={starPath(10, 9, 1, -126)} fill="#ffde00" />
    </svg>
  );
}

function DeFlag() {
  return (
    <svg viewBox="0 0 5 3" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <rect width="5" height="1" fill="#000" />
      <rect y="1" width="5" height="1" fill="#dd0000" />
      <rect y="2" width="5" height="1" fill="#ffce00" />
    </svg>
  );
}

function FrFlag() {
  return (
    <svg viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <rect width="1" height="2" fill="#002395" />
      <rect x="1" width="1" height="2" fill="#fff" />
      <rect x="2" width="1" height="2" fill="#ed2939" />
    </svg>
  );
}

function JpFlag() {
  return (
    <svg viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <rect width="3" height="2" fill="#fff" />
      <circle cx="1.5" cy="1" r="0.6" fill="#bc002d" />
    </svg>
  );
}

const FLAGS: Record<FlagCode, () => React.JSX.Element> = {
  us: UsFlag,
  mx: MxFlag,
  cn: CnFlag,
  de: DeFlag,
  fr: FrFlag,
  jp: JpFlag,
};

export default function Flag({ code, className }: { code: FlagCode; className?: string }) {
  const Svg = FLAGS[code];
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 overflow-hidden ${className ?? "h-4 w-6"}`}
    >
      <Svg />
    </span>
  );
}
