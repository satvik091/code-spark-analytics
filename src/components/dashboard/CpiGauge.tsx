interface CpiGaugeProps {
  value: number;
  size?: "sm" | "md";
}

const CpiGauge = ({ value, size = "md" }: CpiGaugeProps) => {
  const dim = size === "sm" ? 40 : 64;
  const stroke = size === "sm" ? 4 : 5;
  const radius = (dim - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const color =
    value >= 75 ? "hsl(var(--primary))" :
    value >= 50 ? "hsl(var(--info))" :
    value >= 30 ? "hsl(var(--warning))" :
    "hsl(var(--destructive))";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={dim} height={dim} className="-rotate-90">
        <circle cx={dim / 2} cy={dim / 2} r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth={stroke} />
        <circle
          cx={dim / 2} cy={dim / 2} r={radius} fill="none"
          stroke={color} strokeWidth={stroke}
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <span className={`absolute font-bold font-mono ${size === "sm" ? "text-[10px]" : "text-sm"}`} style={{ color }}>
        {value}
      </span>
    </div>
  );
};

export default CpiGauge;

