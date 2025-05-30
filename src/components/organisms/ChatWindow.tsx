"use client";

import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { messageListAtom, isSendingAtom } from "@/lib/atom/MessageAtom";
import { messageErrorAtom } from "@/lib/atom/MessageAtom";
import { generateMessage, ROLES } from "@/lib/domain/MessageQuery";
import { useSendMessage } from "@/lib/hook/useSendMessage";
import { useRef, useState, useEffect } from "react";
import { UI_CONFIG } from "@/lib/constants/uiConfig";
import { ChatOutput } from "../molecules/message/ChatOutput";
import ChatInput from "../molecules/message/ChatInput";
import CtrlEnter from "../atoms/message/CtrlEnter";

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
      <Flex {...UI_CONFIG.chatWindow.Loading.flex}>
        <Spinner {...UI_CONFIG.chatWindow.Loading.spinner} />
      </Flex>
    );
  }

  return (
    <Box {...UI_CONFIG.chatWindow.outer}>
      <Box {...UI_CONFIG.chatWindow.output}>
        <ChatOutput messages={messages} bottomRef={bottomRef} />
      </Box>

      <Box {...UI_CONFIG.chatWindow.input}>
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={handleSend}
          isSending={isSending}
        />
        <CtrlEnter onSend={handleSend} />
      </Box>
    </Box>
  );
}
