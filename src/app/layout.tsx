import type { Metadata } from "next";
import { Providers } from "./provider";

export const metadata: Metadata = {
	title: "FurniAIzer",
	description: "FurniAIzer",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ja" suppressHydrationWarning>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
