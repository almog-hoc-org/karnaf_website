interface SparklineProps {
  values: number[];
  width?: number;
  height?: number;
  color?: string;
  fillColor?: string;
  /** When true, draws a soft area beneath the line. */
  area?: boolean;
}

/** Tiny inline trend chart — ~120×32 by default. Pure SVG, no deps. */
export const Sparkline = ({
  values,
  width = 120,
  height = 32,
  color = "hsl(var(--accent))",
  fillColor,
  area = true,
}: SparklineProps) => {
  if (values.length < 2) return null;

  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const stepX = width / (values.length - 1);

  const pts = values.map((v, i) => ({
    x: i * stepX,
    y: height - ((v - min) / range) * height,
  }));

  const linePoints = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const areaPath =
    `M 0 ${height} ` +
    pts.map((p) => `L ${p.x} ${p.y}`).join(" ") +
    ` L ${width} ${height} Z`;

  const last = pts[pts.length - 1];
  const fill = fillColor ?? `${color}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height + 6}`}
      width={width}
      height={height + 6}
      className="overflow-visible"
      aria-hidden="true"
    >
      {area && (
        <path
          d={areaPath}
          fill={fill}
          opacity="0.14"
        />
      )}
      <polyline
        points={linePoints}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx={last.x} cy={last.y} r="2.5" fill={color} />
    </svg>
  );
};
