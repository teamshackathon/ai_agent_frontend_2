// components/molecules/message/ChatInput.tsx

import { useEffect, useRef } from "react";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import MessageArea from "@/components/atoms/message/MessageArea";
import SendButton from "@/components/atoms/message/SendButton";
import { UI_CONFIG } from "@/lib/constants/uiConfig";

type Props = {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  isSending: boolean;
};

export default function ChatInput({
  value,
  onChange,
  onSend,
  isSending,
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <Box
      as="form"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSend();
      }}
      bg={useColorModeValue("gray.100", "gray.700")}
      {...UI_CONFIG.chatInput.style}
    >
      <Flex direction="column" gap={2}>
        <MessageArea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          ref={textareaRef}
        />
        <Flex justify="flex-end">
          <SendButton
            isSending={isSending}
            type="submit"
            disabled={isSending || value.trim() === ""}
          />
        </Flex>
      </Flex>
    </Box>
  );
}
