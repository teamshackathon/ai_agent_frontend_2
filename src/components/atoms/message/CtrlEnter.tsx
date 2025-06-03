// components/atoms/message/CtrlEnter.tsx

import { useEvent } from "@/lib/hook/useEvent";
import { useEffect } from "react";

type Props = {
	onSend: () => void;
	isSending: boolean;
};

/**
 * Ctrl(Cmd) + Enterを押したときにメッセージを送信するコンポーネント
 */
export default function CtrlEnter({ onSend, isSending }: Props) {
	const handleKeyDown = useEvent<[KeyboardEvent], void>((e) => {
		if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
			e.preventDefault();
			if (!isSending) onSend();
		}
	});

	// コンポーネントがマウントされたときにのみイベントリスナーを登録
	// Ctrl(Cmd) + Enterを押したときにonSendを呼び出す
	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [handleKeyDown]);

	return null;
}
