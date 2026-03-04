"use client";

import { useEffect, useRef, useState } from "react";

export default function useScrollReveal<T extends HTMLElement>({
  threshold = 0.3,
  once = false,
}: {
  threshold?: number;
  once?: boolean;
} = {}) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(element);
        } else {
          if (!once) setVisible(false);
        }
      },
      { threshold },
    );

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [threshold, once]);

  return [ref, visible] as const; // ⭐ penting
}
