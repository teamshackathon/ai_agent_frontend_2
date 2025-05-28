// components/atoms/message/MessageArea.tsx

import { UI_CONFIG } from "@/lib/constants/uiConfig";
import { chakra } from "@chakra-ui/react";
import { forwardRef } from "react";
import type { ComponentProps } from "react";
import TextareaAutosize from "react-textarea-autosize";

const ChakraAutosizeTextarea = chakra(TextareaAutosize);

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
			<ChakraAutosizeTextarea
				ref={ref}
				placeholder={UI_CONFIG.messageArea.text.placeholder}
				{...UI_CONFIG.messageArea.autosizeProps}
				{...UI_CONFIG.messageArea.containerStyle}
				{...props}
				sx={UI_CONFIG.messageArea.scroll}
				style={UI_CONFIG.messageArea.textareaStyle}
			/>
		);
	},
);

MessageArea.displayName = "MessageArea";
export default MessageArea;
