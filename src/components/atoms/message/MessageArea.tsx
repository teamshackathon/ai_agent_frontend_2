// components/atoms/message/MessageArea.tsx

import { forwardRef } from "react";
import { Textarea } from "@chakra-ui/react";
import type { ComponentProps } from "react";
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
        ref={ref}
        {...UI_CONFIG.messageArea.style}
        placeholder={UI_CONFIG.messageArea.text.placeholder}
        variant="unstyled"
        {...props}
      />
    );
  }
);

MessageArea.displayName = "MessageArea";
export default MessageArea;
