import { useAtom, useSetAtom } from "jotai";
import { useRef } from "react";
import {
	isSendingAtom,
	messageErrorAtom,
	messageListAtom,
} from "../atom/MessageAtom";
import {
	type Message,
	ROLES,
	generateMessage,
	sendMessage,
} from "../domain/MessageQuery";

export function useSendMessage() {
	const [messages, setMessages] = useAtom(messageListAtom);
	const setIsSending = useSetAtom(isSendingAtom);
	const setError = useSetAtom(messageErrorAtom);

	const chatIdRef = useRef<string | null>(null); // ← chat_id を保持

	const send = async (userMsg: Message): Promise<void> => {
		setIsSending(true);
		setError(null);
		try {
			const history: Message[] = messages;
			setMessages((prev) => [...prev, userMsg]);

			const output = await sendMessage(
				{ ...userMsg, id: chatIdRef.current }, // ← chat_idを送信
				history,
			);

			if (!chatIdRef.current) {
				chatIdRef.current = output.chat_id; // ← 初回のchat_idを保存
			}

			const asstMsg = generateMessage(
				output.chat_id,
				output.response,
				ROLES.ASSISTANT,
				{
					rawResponse: output,
				},
			);
			setMessages((prev) => [...prev, asstMsg]);
		} catch (err) {
			setError(
				err instanceof Error ? err : new Error("送信中にエラーが発生しました"),
			);
		} finally {
			setIsSending(false);
		}
	};

	return { send };
}
