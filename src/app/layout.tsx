import { JotaiProvider } from "@/app/provider";
import { ChakraProvider } from "@chakra-ui/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "FurniAIzer",
	description: "FurniAIzer",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja" suppressHydrationWarning>
			<body>
				<ChakraProvider>
					<JotaiProvider>{children}</JotaiProvider>
				</ChakraProvider>
			</body>
		</html>
	);
}
