// components/molecules/message/ChatInput.tsx

import MessageArea from "@/components/atoms/message/MessageArea";
import SendButton from "@/components/atoms/message/SendButton";
import WordButtonList from "@/components/atoms/message/WordButton";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

const words = ["hello", "good morning"];

type Props = {
	value: string;
	onChange: (val: string) => void;
	onSend: () => void;
	isSending: boolean;
};

const chatInputStyle = {
	overflow: "visible" as const,
	borderRadius: "2xl",
	px: 2,
	py: 2,
	w: "full",
	boxShadow: "md",
};

export default function ChatInput({
	value,
	onChange,
	onSend,
	isSending,
}: Props) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		textareaRef.current?.focus();
	}, []);

	return (
		<Box
			as="form"
			onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
				e.preventDefault();
				onSend();
			}}
			bg={useColorModeValue("gray.100", "gray.700")}
			{...chatInputStyle}
		>
			{/* メッセージ入力欄 */}
			<MessageArea
				value={value}
				onChange={(e) => onChange(e.target.value)}
				ref={textareaRef}
			/>

			{/* テンプレートボタン群 + 送信ボタン */}
			<Flex mt={2} align="center">
				<WordButtonList
					words={words}
					onSelect={(word) => {
						onChange(word);
						onSend();
					}}
					disable={isSending}
				/>
				<Box ml="auto">
					<SendButton
						isSending={isSending}
						disabled={isSending || value.trim() === ""}
					/>
				</Box>
			</Flex>
		</Box>
	);
}
