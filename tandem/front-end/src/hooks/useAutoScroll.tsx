import { useRef, useEffect } from "react";

export function useAutoScroll(dep: unknown) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [dep]);

  return bottomRef;
}