import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({ size = "md" }: LoadingSpinnerProps) {
  const sizeConfig = {
    sm: { container: 24, dot: 6 },
    md: { container: 40, dot: 10 },
    lg: { container: 56, dot: 14 },
  };

  const { container, dot } = sizeConfig[size];

  const containerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const dotVariants = {
    start: {
      y: "0%",
    },
    end: {
      y: "100%",
    },
  };

  const dotTransition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut" as const,
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="start"
      animate="end"
      className="flex gap-1 items-center justify-center"
      style={{ width: container, height: container }}
    >
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          variants={dotVariants}
          transition={dotTransition}
          className="rounded-full bg-linear-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500"
          style={{ width: dot, height: dot }}
        />
      ))}
    </motion.div>
  );
}
