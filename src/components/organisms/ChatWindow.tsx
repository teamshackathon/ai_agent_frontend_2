"use client";

import { UI_CONFIG } from "@/lib/constants/uiConfig";
import { type Message, ROLES } from "@/lib/domain/types/Message";
import { generateMessage } from "@/lib/domain/usecases/message/generateMessage";
import { useSendMessage } from "@/lib/hook/useSendMessage";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import CtrlEnter from "../atoms/message/CtrlEnter";
import ChatInput from "../molecules/message/ChatInput";
import { ChatOutput } from "../molecules/message/ChatOutput";

export default function ChatWindow() {
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const [mounted, setMounted] = useState(false);
	const bottomRef = useRef<HTMLDivElement>(null);
	const { send, isSending, error } = useSendMessage();

	// 読み込み時のSpinnerセット用
	useEffect(() => {
		const timer = setTimeout(() => setMounted(true), 100);
		return () => clearTimeout(timer);
	}, []);

	// 新しいメッセージが追加されたときに自動でスクロール
	useEffect(() => {
		// useEffect内でmessagesを使わないとLintで怒られる
		if (messages.length === 0) return;
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSend = async () => {
		if (!input.trim()) return;
		const userMessage = generateMessage(input.trim(), ROLES.USER);
		setMessages((prev) => [...prev, userMessage]);
		setInput("");

		const assistantMessage = await send(userMessage, messages);
		if (assistantMessage) {
			setMessages((prev) => [...prev, assistantMessage]);
		}
	};

	// Spinner表示
	if (!mounted) {
		return (
			<Flex {...UI_CONFIG.chatWindow.Loading.flex}>
				<Spinner {...UI_CONFIG.chatWindow.Loading.spinner} />
			</Flex>
		);
	}

	return (
		<Box {...UI_CONFIG.chatWindow.outer}>
			<Box {...UI_CONFIG.chatWindow.output}>
				<ChatOutput messages={messages} bottomRef={bottomRef} />
			</Box>

			<Box {...UI_CONFIG.chatWindow.input}>
				<ChatInput
					value={input}
					onChange={setInput}
					onSend={handleSend}
					isSending={isSending}
				/>
				<CtrlEnter onSend={handleSend} />
			</Box>
		</Box>
	);
}
