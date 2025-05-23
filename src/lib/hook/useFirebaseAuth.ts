import { userAtom } from "@/lib/atom/UserAtom";
import { getFirebaseAuth } from "@/lib/firebase";
import { signInWithCustomToken, signOut } from "firebase/auth";
import { useSetAtom } from "jotai";
import { useState } from "react";

export function useFirebaseAuth() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const auth = getFirebaseAuth();
	const setUser = useSetAtom(userAtom);

	const loginWithGithub = async () => {
		setLoading(true);
		setError(null);

		try {
			// バックエンドのGitHub認証エンドポイントにリダイレクト
			window.location.href =
				process.env.NEXT_PUBLIC_REDIRECT_URL ||
				"http://localhost:8000/api/v1/auth/github/login";
		} catch (err) {
			setError(err instanceof Error ? err : new Error("認証に失敗しました"));
			setLoading(false);
		}
	};

	const handleCallback = async (token: string) => {
		setLoading(true);
		setError(null);

		try {
			await signInWithCustomToken(auth, token);
			return true;
		} catch (err) {
			setError(
				err instanceof Error
					? err
					: new Error("カスタムトークンでのサインインに失敗しました"),
			);
			return false;
		} finally {
			setLoading(false);
		}
	};

	const logout = async () => {
		setLoading(true);
		try {
			// Firebase Authからサインアウト
			await signOut(auth);
			setUser(null);
		} catch (err) {
			setError(
				err instanceof Error ? err : new Error("ログアウトに失敗しました"),
			);
		} finally {
			setLoading(false);
		}
	};

	return { loginWithGithub, handleCallback, logout, loading, error };
}
