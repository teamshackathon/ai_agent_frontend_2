// components/organisms/MovingWindow.tsx

import { Button, Text } from "@chakra-ui/react";

export default function MovingWindow({ onNext }: { onNext: () => void }) {
	return (
		<>
			<Text>引っ越し画面</Text>
			<Button onClick={onNext}>最初に遷移</Button>
		</>
	);
}
