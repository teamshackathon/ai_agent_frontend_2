"use client";

import { authTokenAtom } from "@/lib/atom/AuthAtom";
import {
	Alert,
	AlertIcon,
	Center,
	Spinner,
	Text,
	VStack,
} from "@chakra-ui/react";
import { useSetAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

/**
 * GitHub OAuth認証後のコールバックを処理するコンポーネント
 * URLパラメータからトークンを取得し、認証状態を設定する
 */
function CallbackContent() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const setAuthToken = useSetAtom(authTokenAtom);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const processCallback = async () => {
			try {
				// URLパラメータからトークン情報を取得
				const accessToken = searchParams.get("access_token");
				const tokenType = searchParams.get("token_type");
				const expiresIn = searchParams.get("expires_in");

				if (!accessToken) {
					setError("アクセストークンが見つかりませんでした");
					setIsLoading(false);
					return;
				}

				console.log("トークンを取得しました", { tokenType, expiresIn });

				// トークンを保存
				setAuthToken(accessToken);

				// リダイレクト先を決定
				const returnUrl = sessionStorage.getItem("returnUrl") || "/chat";
				sessionStorage.removeItem("returnUrl");

				// ダッシュボードページにリダイレクト
				router.push(returnUrl);
			} catch (e) {
				console.error("認証コールバックの処理に失敗しました:", e);
				setError("認証処理中にエラーが発生しました");
				setIsLoading(false);
			}
		};

		processCallback();
	}, [searchParams, setAuthToken, router]);

	if (error) {
		return (
			<Center height="100vh">
				<VStack spacing={4}>
					<Alert status="error">
						<AlertIcon />
						{error}
					</Alert>
					<Text>
						<Text
							as="a"
							href="/auth/login"
							color="blue.500"
							textDecoration="underline"
							cursor="pointer"
							onClick={(e) => {
								e.preventDefault();
								router.push("/auth/login");
							}}
						>
							ログインページに戻る
						</Text>
					</Text>
				</VStack>
			</Center>
		);
	}

	if (isLoading) {
		return (
			<Center height="100vh">
				<VStack spacing={4}>
					<Spinner size="xl" color="blue.500" thickness="4px" />
					<Text fontSize="lg">認証中...</Text>
				</VStack>
			</Center>
		);
	}

	return null;
}

/**
 * Suspenseでラップしたメインコンポーネント
 * Next.jsのuseSearchParamsはSuspense境界内で使用する必要がある
 */
export default function CallbackPage() {
	return (
		<Suspense
			fallback={
				<Center height="100vh">
					<VStack spacing={4}>
						<Spinner size="xl" color="blue.500" thickness="4px" />
						<Text fontSize="lg">読み込み中...</Text>
					</VStack>
				</Center>
			}
		>
			<CallbackContent />
		</Suspense>
	);
}
