import { useEffect, useRef } from 'react';
import { useCountUp } from '../hooks/useCountUp';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { LucideIcon } from 'lucide-react';

interface Stat {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  icon?: LucideIcon;
  decimals?: number;
}

interface AnimatedStatsProps {
  stats: Stat[];
  columns?: 2 | 3 | 4;
}

function StatCard({ stat }: { stat: Stat }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const { formattedValue, startAnimation } = useCountUp({
    end: stat.value,
    duration: 2500,
    decimals: stat.decimals || 0,
    suffix: stat.suffix || '',
    prefix: stat.prefix || ''
  });

  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      startAnimation();
      hasAnimated.current = true;
    }
  }, [isVisible, startAnimation]);

  return (
    <div
      ref={ref}
      className="relative group p-8 bg-white rounded-2xl shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300"
    >
      {/* Background Hover Effect */}
      <div className="absolute inset-0 bg-[var(--color-primary)]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative">
        {/* Icon */}
        {stat.icon && (
          <div className="mb-4 inline-flex p-3 bg-[var(--color-primary)]/10 rounded-xl">
            <stat.icon className="w-6 h-6 text-[var(--color-primary)]" />
          </div>
        )}

        {/* Value */}
        <div className="mb-2">
          <span className="text-[var(--color-primary)] tracking-tight" style={{ fontSize: '48px', fontWeight: 700, lineHeight: 1.2 }}>
            {formattedValue}
          </span>
        </div>

        {/* Label */}
        <p className="text-[var(--color-text-secondary)] font-medium">
          {stat.label}
        </p>

        {/* Decorative Line */}
        <div className="mt-4 h-1 w-12 bg-[var(--color-primary)] rounded-full" />
      </div>
    </div>
  );
}

export function AnimatedStats({ stats, columns = 3 }: AnimatedStatsProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {stats.map((stat, index) => (
        <StatCard key={index} stat={stat} />
      ))}
    </div>
  );
}