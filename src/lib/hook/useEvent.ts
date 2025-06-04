// lib/hook/useEvent.ts

import { useCallback, useEffect, useRef } from "react";

/**
 * 最新の関数を安定して使えるようにする汎用フック
 */
export function useEvent<TArgs extends unknown[], TReturn>(
	handler: (...args: TArgs) => TReturn,
): (...args: TArgs) => TReturn {
	const handlerRef = useRef(handler);

	useEffect(() => {
		handlerRef.current = handler;
	}, [handler]);

	return useCallback((...args: TArgs) => {
		return handlerRef.current(...args);
	}, []);
}
