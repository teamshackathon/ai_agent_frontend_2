"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "jotai";

export function JotaiProvider({ children }: { children: React.ReactNode }) {
	return <Provider>{children}</Provider>;
}

export function ChakraProviderWrapper({
	children,
}: { children: React.ReactNode }) {
	return <ChakraProvider>{children}</ChakraProvider>;
}
