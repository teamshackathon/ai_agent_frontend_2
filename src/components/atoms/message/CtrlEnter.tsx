// components/atoms/message/CtrlEnter.tsx

import { useRef, useEffect } from "react";

type Props = {
	onSend: () => void;
};

/**
 * Ctrl(Cmd) + Enterを押したときにメッセージを送信するコンポーネント
 */
export default function CtrlEnter({ onSend }: Props) {
	// onSendをrefに保存しておく
	const onSendRef = useRef(onSend);

	// onSendが変更されたときにrefを更新
	useEffect(() => {
		onSendRef.current = onSend;
	}, [onSend]);

	// コンポーネントがマウントされたときにのみイベントリスナーを登録
	// Ctrl(Cmd) + Enterを押したときにonSendを呼び出す
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
				e.preventDefault();
				onSendRef.current();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return null;
}
