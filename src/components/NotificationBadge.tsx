import { motion } from "motion/react";

interface NotificationBadgeProps {
  count: number;
  max?: number;
}

export function NotificationBadge({ count, max = 99 }: NotificationBadgeProps) {
  if (count === 0) return null;

  const displayCount = count > max ? `${max}+` : count;

  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1"
    >
      {displayCount}
    </motion.span>
  );
}
