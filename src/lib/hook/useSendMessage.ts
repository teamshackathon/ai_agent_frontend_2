// lib/hook/useSendMessage.ts

import { useAtom, useSetAtom } from "jotai";
import { messageListAtom } from "../atom/MessageAtom";
import { isSendingAtom, messageErrorAtom } from "../atom/MessageAtom";
import { type Message, ROLES, generateMessage } from "../domain/MessageQuery";
import { sendMessage } from "../domain/MessageQuery";

export function useSendMessage() {
	const [messages, setMessages] = useAtom(messageListAtom);
	const setIsSending = useSetAtom(isSendingAtom);
	const setError = useSetAtom(messageErrorAtom);

	const send = async (userMsg: Message): Promise<void> => {
		setIsSending(true);
		setError(null);
		try {
			const history: Message[] = messages;
			setMessages((prev) => [...prev, userMsg]);
			const output = await sendMessage(userMsg, history);
			const asstMsg = generateMessage(output.response, ROLES.ASSISTANT, {
				rawResponse: output,
			});
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
