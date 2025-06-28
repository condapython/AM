import { useEffect, useState } from "react";

export function useParallax() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollY;
}

export function useParallaxOffset(speed: number = 0.5) {
  const scrollY = useParallax();
  return scrollY * speed;
}
