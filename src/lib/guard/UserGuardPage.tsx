"use client";

import { Box, Button, Center, Skeleton, Text, VStack } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";

import { userAtomLoadable } from "@/lib/atom/UserAtom";
import { useAuthState } from "@/lib/hook/useAuthState";
import Link from "next/link";

const UserGuardPage = ({ children }: { children: React.ReactNode }) => {
	const { user, loading, idToken } = useAuthState();
	const userInfo = useAtomValue(userAtomLoadable);
	const router = useRouter();

	if (loading || userInfo.state === "loading") {
		return <Skeleton height="100vh" />;
	}

	const isAuthenticated =
		user && idToken && userInfo.state === "hasData" && userInfo.data;

	if (!isAuthenticated) {
		return (
			<Center>
				<VStack spacing={6}>
					<Text fontSize="lg">
						このページを表示するにはログインが必要です。
					</Text>
					<Button as={Link} href="/login" colorScheme="blue">
						ログインする
					</Button>
				</VStack>
			</Center>
		);
	}

	return <>{children}</>;
};

export default UserGuardPage;
