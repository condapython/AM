import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Floating3DElementProps {
  className?: string;
  type: "circle" | "square" | "triangle";
  color: string;
  delay?: number;
}

export default function Floating3DElement({
  className,
  type,
  color,
  delay = 0,
}: Floating3DElementProps) {
  const shapeClasses = {
    circle: "rounded-full",
    square: "rounded-lg",
    triangle: "rounded-sm transform rotate-45",
  };

  return (
    <motion.div
      className={cn(
        `bg-gradient-to-r ${color} ${shapeClasses[type]} opacity-60 floating-element`,
        className
      )}
      animate={{
        y: [0, -20, -10, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
      style={{
        filter: "blur(0.5px)",
      }}
    />
  );
}
