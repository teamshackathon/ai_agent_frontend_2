// components/organisms/PropertyWindow.tsx

import { Button, Text } from "@chakra-ui/react";

export default function PropertyWindow({ onNext }: { onNext: () => void }) {
	return (
		<>
			<Text>物件選択画面</Text>
			<Button onClick={onNext}>次に遷移</Button>
		</>
	);
}
