import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function ProgressBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    setProgress(0);

    // Simulate loading progress
    const timer1 = setTimeout(() => setProgress(30), 100);
    const timer2 = setTimeout(() => setProgress(60), 200);
    const timer3 = setTimeout(() => setProgress(100), 400);
    const timer4 = setTimeout(() => setIsVisible(false), 600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          style={{ scaleX: progress / 100 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 h-1 bg-[#223B57] z-[100] origin-left"
        />
      )}
    </AnimatePresence>
  );
}