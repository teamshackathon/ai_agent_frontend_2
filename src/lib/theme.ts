// lib/theme.ts
import { type ThemeConfig, extendTheme } from "@chakra-ui/react";

const config: ThemeConfig = {
	initialColorMode: "light",
	useSystemColorMode: false,
};

export const theme = extendTheme({ config });
