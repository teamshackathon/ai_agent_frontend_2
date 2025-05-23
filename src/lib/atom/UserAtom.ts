import { getUser } from "@/lib/domain/UserQuery";
import type { User } from "firebase/auth";
import { atom } from "jotai";
import { loadable } from "jotai/utils";

export const userAtom = atom<User | null>(null);

export const userAtomAsync = atom(async (get) => {
	try {
		const user = get(userAtom);
		// userがnullの場合は、nullを返す
		if (!user) {
			return null;
		}
		const response = await getUser();
		return response;
	} catch (error) {
		console.error("Error fetching user:", error);
		return null;
	}
});

export const userAtomLoadable = loadable(userAtomAsync);
