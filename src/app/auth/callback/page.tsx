"use client";

import { useFirebaseAuth } from "@/lib/hook/useFirebaseAuth";
import {
	Button,
	Center,
	Heading,
	Spinner,
	Text,
	VStack,
} from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

function AuthCallbackContent() {
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

				const success = await handleCallback(token);

				if (success) {
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
			<Center minH="100vh">
				<VStack spacing={4}>
					<Heading color="red.500" size="lg">
						認証エラー
					</Heading>
					<Text color="gray.600">{error}</Text>
					<Button onClick={() => router.push("/")} colorScheme="blue" size="md">
						ホームに戻る
					</Button>
				</VStack>
			</Center>
		);
	}

	return (
		<Center minH="100vh">
			<VStack spacing={4}>
				<Spinner size="xl" color="blue.500" thickness="4px" />
				<Text fontSize="lg">認証処理中...</Text>
			</VStack>
		</Center>
	);
}

export default function AuthCallback() {
	return (
		<Suspense
			fallback={
				<Center minH="100vh">
					<VStack spacing={4}>
						<Spinner size="xl" color="blue.500" thickness="4px" />
						<Text fontSize="lg">読み込み中...</Text>
					</VStack>
				</Center>
			}
		>
			<AuthCallbackContent />
		</Suspense>
	);
}
