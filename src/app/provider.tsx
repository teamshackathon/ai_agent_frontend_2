"use client";

import { emotionCache } from "@/lib/emotion-cache";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { CacheProvider } from "@emotion/react";
import { Provider as JotaiRootProvider } from "jotai";

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
				<JotaiRootProvider>{children}</JotaiRootProvider>
			</ChakraProvider>
		</CacheProvider>
	);
}
