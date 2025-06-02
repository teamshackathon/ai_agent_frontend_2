// components/prganisms/ChatWindow.tsx

"use client";

import { isSendingAtom, messageListAtom } from "@/lib/atom/MessageAtom";
import { messageErrorAtom } from "@/lib/atom/MessageAtom";
import { ROLES, generateMessage } from "@/lib/domain/MessageQuery";
import { useSendMessage } from "@/lib/hook/useSendMessage";
import { Box, Flex, Spacer, Spinner } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import CtrlEnter from "../atoms/message/CtrlEnter";
import ChatInput from "../molecules/message/ChatInput";
import { ChatOutput } from "../molecules/message/ChatOutput";

export default function ChatWindow() {
  const [input, setInput] = useState("");
  const [messages] = useAtom(messageListAtom);
  const [mounted, setMounted] = useState(false);
  const [isSending] = useAtom(isSendingAtom);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { send } = useSendMessage();

  // 読み込み時のSpinnerセット用
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // 新しいメッセージが追加されたときに自動でスクロール
  useEffect(() => {
    // useEffect内でmessagesを使わないとLintで怒られる
    if (messages.length === 0) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = generateMessage(input.trim(), ROLES.USER);
    setInput("");
    await send(userMessage);
  };

  // Spinner表示
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
      {/* チャットエリア */}
      <Box flex="1" overflowY="hidden" px={4}>
        <ChatOutput messages={messages} bottomRef={bottomRef} />
      </Box>

      {/* 入力欄 */}
      <Box p={2} pb={6}>
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={handleSend}
          isSending={isSending}
        />
        <CtrlEnter onSend={handleSend} />
      </Box>
    </Flex>
  );
}
