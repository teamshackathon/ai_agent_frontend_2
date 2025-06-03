// components/atoms/message/MessageArea.tsx

import { scrollbarStyle } from "@/lib/constants/uiConfig";
import { chakra } from "@chakra-ui/react";
import { forwardRef } from "react";
import type { ComponentProps } from "react";
import type { CSSProperties } from "react";
import TextareaAutosize from "react-textarea-autosize";

const ChakraAutosizeTextarea = chakra(TextareaAutosize);

type MessageAreaProps = ComponentProps<"textarea">;

const textareaStyle = {
	width: "100%",
	resize: "none" as CSSProperties["resize"],
	border: "none",
	outline: "none",
	background: "transparent",
	font: "inherit",
	lineHeight: "1.2",
} satisfies CSSProperties;

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
				placeholder={"メッセージ入力(ctrl + Enterで送信)"}
				minRows={1}
				maxRows={6.5}
				width={"full"}
				flexGrow={1}
				fontSize={"md"}
				lineHeight={1.2}
				pt={0}
				pb={0}
				pr={0.5}
				pl={3}
				overflowY={"visible"}
				{...props}
				sx={scrollbarStyle}
				style={textareaStyle}
			/>
		);
	},
);

MessageArea.displayName = "MessageArea";
export default MessageArea;
