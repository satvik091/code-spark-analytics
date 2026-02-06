import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; positive: boolean };
}

const StatCard = ({ title, value, subtitle, icon: Icon, trend }: StatCardProps) => (
  <div className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/20 hover:shadow-[var(--shadow-glow)]">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</p>
        <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
        {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
        {trend && (
          <div className={`mt-2 inline-flex items-center text-xs font-medium ${trend.positive ? "text-success" : "text-destructive"}`}>
            {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}% this week
          </div>
        )}
      </div>
      <div className="rounded-lg bg-accent/50 p-2.5 text-accent-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
        <Icon className="h-5 w-5" />
      </div>
    </div>
  </div>
);

export default StatCard;
