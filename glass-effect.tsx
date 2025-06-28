import { cn } from "@/lib/utils";

interface GlassEffectProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassEffect({ children, className }: GlassEffectProps) {
  return (
    <div className={cn("glass-effect", className)}>
      {children}
    </div>
  );
}
