"use client";

import { Button } from "@/components/ui/button";
import { useFirebaseAuth } from "@/lib/hook/useFirebaseAuth";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function AuthCallback() {
	const [error, setError] = useState<string | null>(null);
	const { handleCallback, loading } = useFirebaseAuth();
	const router = useRouter();
	const searchParams = useSearchParams();
	const authAttemptedRef = useRef(false);

	useEffect(() => {
		const processAuth = async () => {
			// すでに認証を試みていたら二重実行しない
			if (authAttemptedRef.current) {
				return;
			}

			authAttemptedRef.current = true; // フラグを立てる

			try {
				const token = searchParams.get("token");

				if (!token) {
					setError("認証トークンがありません");
					return;
				}

				console.log("認証開始");
				const success = await handleCallback(token);

				if (success) {
					console.log("認証成功: ホームページへリダイレクト");
					router.push("/");
				} else {
					setError("認証に失敗しました");
				}
			} catch (err) {
				console.error("認証エラー:", err);
				authAttemptedRef.current = false; // エラーの場合は再試行できるようにフラグをリセット
				setError(
					err instanceof Error
						? err.message
						: "認証処理中にエラーが発生しました",
				);
			}
		};

		processAuth();
	}, [searchParams, handleCallback, router]);

	if (error) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen">
				<h2 className="text-2xl font-bold text-red-600 mb-2">認証エラー</h2>
				<p className="text-gray-600">{error}</p>
				<Button
					onClick={() => router.push("/")}
					className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
				>
					ホームに戻る
				</Button>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
			<p className="text-lg">認証処理中...</p>
		</div>
	);
}
