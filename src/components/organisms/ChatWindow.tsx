"use client";

import { useState } from "react";
import { Box } from "@chakra-ui/react";
import ChatInput from "../molecules/message/ChatInput";
import { UI_CONFIG } from "@/lib/constants/uiConfig";

export default function ChatWindow() {
  const [input, setInput] = useState("");

  return (
    <Box {...UI_CONFIG.chatWindow.style}>
      <ChatInput
        value={input}
        onChange={setInput}
        onSend={() => {}}
        isSending={false}
      />
    </Box>
  );
}
