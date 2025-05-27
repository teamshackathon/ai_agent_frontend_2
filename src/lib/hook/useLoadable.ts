import { type Atom, useAtomValue } from "jotai";
import type { Loadable } from "jotai/vanilla/utils/loadable";

export const useLoadable = <T>(atom: Atom<Loadable<Promise<T>>>): T | null => {
	const loadable = useAtomValue(atom);

	if (loadable === null) {
		return null;
	}

	const atom1 = loadable.state === "hasData" ? loadable.data : null;
	return atom1;
};
