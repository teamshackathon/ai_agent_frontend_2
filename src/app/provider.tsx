"use client";

import { authTokenAtom, isLoadingAuthAtom } from "@/lib/atom/AuthAtom";
import { getUserAtom, userAtom } from "@/lib/atom/UserAtom";
import { emotionCache } from "@/lib/emotion-cache";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { CacheProvider } from "@emotion/react";
import { Provider as JotaiRootProvider } from "jotai";
import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";

// Chakra のテーマ設定（必要なら既存のテーマにマージ）
const config = {
	initialColorMode: "light",
	useSystemColorMode: false,
};
const theme = extendTheme({ config });

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<CacheProvider value={emotionCache}>
			<ChakraProvider theme={theme}>
				<JotaiRootProvider>
					<AuthProvider>{children}</AuthProvider>
				</JotaiRootProvider>
			</ChakraProvider>
		</CacheProvider>
	);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [authToken, setAuthToken] = useAtom(authTokenAtom);
	const setIsLoadingAuth = useSetAtom(isLoadingAuthAtom);
	const setUser = useSetAtom(userAtom);
	const getUser = useSetAtom(getUserAtom);

	useEffect(() => {
		const initializeAuth = async () => {
			if (!authToken) {
				setUser(null);
			}
			setIsLoadingAuth(true);
			try {
				await getUser();
			} catch (error) {
				console.error("Failed to fetch user data:", error);
				setAuthToken(null);
				setUser(null);
			} finally {
				setIsLoadingAuth(false);
			}
		};

		initializeAuth();
	}, [authToken, setAuthToken, setIsLoadingAuth, getUser, setUser]);

	return <>{children}</>;
}
