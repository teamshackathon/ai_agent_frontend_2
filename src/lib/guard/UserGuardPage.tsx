"use client";

import { Button, Center, Skeleton, Text, VStack } from "@chakra-ui/react";
import { useAtomValue } from "jotai";

import Link from "next/link";
import { isLoadingAuthAtom } from "../atom/AuthAtom";
import { isUserLoadingAtom, userAtom } from "../atom/UserAtom";

const UserGuardPage = ({ children }: { children: React.ReactNode }) => {
	const user = useAtomValue(userAtom);
	const loading = useAtomValue(isUserLoadingAtom);
	const authLoading = useAtomValue(isLoadingAuthAtom);

	if (loading || authLoading) {
		return <Skeleton height="100vh" />;
	}

	if (!user) {
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
