import { getFirebaseAuth } from "@/lib/firebase";
import type { User } from "firebase/auth";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

import { userAtom } from "../atom/UserAtom";

export function useAuthState() {
	const [user, setUser] = useAtom<User | null>(userAtom);
	const [loading, setLoading] = useState(true);
	const [idToken, setIdToken] = useState<string | null>(null);

	useEffect(() => {
		const auth = getFirebaseAuth();

		const unsubscribe = auth.onAuthStateChanged(async (firebaeUser) => {
			if (firebaeUser) {
				setUser(firebaeUser);
				try {
					const token = await firebaeUser.getIdToken();
					setIdToken(token);
				} catch (error) {
					console.error("Failed to get ID token:", error);
				}
			} else {
				setIdToken(null);
			}

			setLoading(false);
		});

		// Cleanup subscription
		return () => unsubscribe();
	}, [setUser]);

	return { user, loading, idToken };
}
