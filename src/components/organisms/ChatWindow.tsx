"use client";

import { useState, useEffect, useRef } from "react";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import ChatInput from "../molecules/message/ChatInput";
import CtrlEnter from "../atoms/message/CtrlEnter";
import { UI_CONFIG } from "@/lib/constants/uiConfig";
import { Message, ROLES } from "@/lib/domain/types/Message";
import { ChatOutput } from "../molecules/message/ChatOutput";

export default function ChatWindow() {
  const [input, setInput] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const bottomRef = useRef<HTMLDivElement>(null); // メッセージの最後尾の把握用

  // 読み込み時のスピナー表示用
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // メッセージ送信後に自動でスクロール
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // メッセージ送信ハンドラー
  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      role: ROLES.USER,
      text: input.trim(),
      timeStamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  return (
    <Box {...UI_CONFIG.chatWindow.outer}>
      {!mounted && (
        <Flex {...UI_CONFIG.chatWindow.Loading.flex}>
          <Spinner {...UI_CONFIG.chatWindow.Loading.spinner} />
        </Flex>
      )}

      <Box
        opacity={mounted ? 1 : 0}
        transition="opacity 0.3s ease"
        pointerEvents={mounted ? "auto" : "none"}
        height="100%" // ← 忘れず追加
        position="relative" // ← 忘れず追加
        display="flex"
        flexDirection="column"
      >
        {/* チャットログ背景 */}
        <Box
          {...UI_CONFIG.chatWindow.output}
          opacity={mounted ? 1 : 0}
          transition="opacity 0.3s ease"
          pointerEvents={mounted ? "auto" : "none"}
        >
          <ChatOutput messages={messages} bottomRef={bottomRef} />
        </Box>

        {/* 入力欄を前面に固定 */}
        <Box
          {...UI_CONFIG.chatWindow.input}
          opacity={mounted ? 1 : 0}
          transition="opacity 0.3s ease"
          pointerEvents={mounted ? "auto" : "none"}
        >
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={handleSend}
            isSending={isSending}
          />
          <CtrlEnter onSend={handleSend} />
        </Box>
      </Box>
    </Box>
  );
}
