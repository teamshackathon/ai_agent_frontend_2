"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Provider as JotaiRootProvider } from "jotai";
import { CacheProvider } from "@emotion/react";
import { emotionCache } from "@/lib/emotion-cache";

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
