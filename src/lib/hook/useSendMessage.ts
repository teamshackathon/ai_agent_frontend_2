import { type Message, ROLES } from "@/lib/domain/types/Message";
import { getFirebaseAuth } from "@/lib/firebase";
import { getIdToken } from "firebase/auth";
import { useState } from "react";
import { generateMessage } from "../domain/usecases/message/generateMessage";

export function useSendMessage() {
	const [isSending, setIsSending] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const send = async (
		userMessage: Message,
		history: Message[],
	): Promise<Message | null> => {
		setIsSending(true);
		setError(null);
		const auth = getFirebaseAuth();
		const user = auth.currentUser;

		if (!user) {
			setError(new Error("ログインが必要です"));
			setIsSending(false);
			return null;
		}

		try {
			const idToken = await getIdToken(user);

			const apiHistory = [...history, userMessage].map((msg) => ({
				role: msg.role,
				content: msg.text ?? "",
			}));

			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/chat`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${idToken}`,
					},
					body: JSON.stringify({
						role: "user",
						response: userMessage.text,
						history: apiHistory,
						model_name: "gemini-pro",
					}),
				},
			);

			if (!res.ok) {
				const errorText = await res.text();
				throw new Error(`送信失敗: ${res.status} ${errorText}`);
			}

			const data = await res.json();
			return generateMessage(data.response, ROLES.ASSISTANT, {
				rawResponse: data,
			});
		} catch (err) {
			setError(
				err instanceof Error ? err : new Error("送信中にエラーが発生しました"),
			);
			return null;
		} finally {
			setIsSending(false);
		}
	};

	return { send, isSending, error };
}
