// lib/hook/useEvent.ts

import { useRef, useEffect, useCallback } from "react";

export function useEvent<T extends (...args: any[]) => void>(handler: T): T {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  return useCallback(
    ((...args) => {
      return handlerRef.current(...args);
    }) as T,
    []
  );
}
