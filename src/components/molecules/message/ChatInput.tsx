// components/molecules/message/ChatInput.tsx

import { use, useEffect, useRef } from "react";
import MessageArea from "@/components/atoms/message/MessageArea";
import SendButton from "@/components/atoms/message/SendButton";
import { UI_CONFIG } from "@/lib/constants/uiConfig";

type Props = {
	value: string;
	onChange: (val: string) => void;
	onSend: () => void;
	isSending: boolean;
};

/**
 * チャット入力フォーム（メッセージエリア＋送信ボタン）
 *
 * - 入力されたテキストを親コンポーネントに渡す
 * - 入力が空の場合は送信ボタンを無効化
 *
 * @param value - 入力欄に表示する現在の文字列
 * @param onChange - 入力が変更されたときに呼び出されるコールバック（新しい文字列を引数に受け取る）
 * @param onSend - 送信処理を行う関数
 * @param isSending - 送信中かどうかを示すフラグ
 */
export default function ChatInput({
	value,
	onChange,
	onSend,
	isSending,
}: Props) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// 初回読み込み時にフォーカスを当てる
	useEffect(() => {
		textareaRef.current?.focus();
	}, []);

	return (
		<form
			className="relative w-full"
			onSubmit={(e) => {
				e.preventDefault();
				onSend();
			}}
		>
			<MessageArea
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className={UI_CONFIG.messageArea.layout.padding} // ボタン用に右側に余白を作る
			/>
			<SendButton
				isSending={isSending} // 送信中かどうか
				type="submit" // フォーム送信
				disabled={isSending || value.trim() === ""} // 入力がないときは無効化
				className={UI_CONFIG.sendButton.button.position} // 右下に配置
			/>
		</form>
	);
}
