// components/atoms/message/MessageArea.tsx

import { forwardRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { UI_CONFIG } from "@/lib/constants/uiConfig";

type MessageAreaProps = ComponentProps<"textarea">;

/**
 * メッセージ入力エリア
 *
 * `value`:`string`,
 *
 * `onChange`:`Function`,
 *
 * その他、標準の `<textarea>` 属性を受け取る
 */
const MessageArea = forwardRef<HTMLTextAreaElement, MessageAreaProps>(
	(props, ref) => {
		return (
			<Textarea
				ref={ref} // refを渡す
				className={cn(
					"resize-none", // ユーザー側で高さを変更できないようにする
					"text-base", // フォントサイズを大きくする
					UI_CONFIG.messageArea.layout.padding, // ボタン用に右側に余白を作る
					UI_CONFIG.messageArea.layout.grow, // 横幅いっぱいに広がる
					UI_CONFIG.messageArea.size.maxHeight, // 複数行になったとき、ある程度の高さまで自動で広がる
					UI_CONFIG.messageArea.layout.scroll, // それ以上はスクロールする
				)}
				placeholder={UI_CONFIG.messageArea.text.placeholder} // プレースホルダー
				{...props}
			/>
		);
	},
);

MessageArea.displayName = "MessageArea";
export default MessageArea;
