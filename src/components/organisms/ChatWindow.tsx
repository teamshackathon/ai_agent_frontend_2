"use client";

import { isSendingAtom, messageListAtom } from "@/lib/atom/MessageAtom";
import { ROLES, generateMessage } from "@/lib/domain/MessageQuery";
import { useSendMessage } from "@/lib/hook/useSendMessage";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import CtrlEnter from "../atoms/message/CtrlEnter";
import ChatInput from "../molecules/message/ChatInput";
import { ChatOutput } from "../molecules/message/ChatOutput";

type Props = {
  imageFile?: File | null;
  imagePreview?: string | null;
  onImageSelect?: (file: File, previewUrl: string) => void;
  onImageClear?: () => void;
};

export default function ChatWindow({
  imageFile,
  imagePreview,
  onImageSelect,
  onImageClear,
}: Props) {
  const [input, setInput] = useState("");
  const [messages] = useAtom(messageListAtom);
  const [mounted, setMounted] = useState(false);
  const [isSending] = useAtom(isSendingAtom);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { send } = useSendMessage();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (messages.length === 0) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() && !imageFile) return;

    const userMessage = generateMessage(input.trim(), ROLES.USER);

    // 🔽 画像ファイルがある場合はログ（API拡張ポイント）
    if (imageFile) {
      console.log("送信画像あり:", imageFile);
    }

    setInput("");
    onImageClear?.();

    await send(userMessage);
  };

  if (!mounted) {
    return (
      <Flex
        position={"fixed"}
        inset={0}
        justify={"center"}
        align={"center"}
        bg={"white"}
        zIndex={100}
      >
        <Spinner
          size="xl"
          thickness="4px"
          emptyColor="gray.200"
          color="blue.500"
          speed="1s"
        />
      </Flex>
    );
  }

  return (
    <Flex direction="column" h="100%" minH={0}>
      <Box flex="1" overflowY="hidden" px={4}>
        <ChatOutput messages={messages} bottomRef={bottomRef} />
      </Box>

      <Box p={2} pb={6}>
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={handleSend}
          isSending={isSending}
          imagePreview={imagePreview}
          onImageSelect={onImageSelect}
        />
        <CtrlEnter onSend={handleSend} isSending={isSending} />
      </Box>
    </Flex>
  );
}
