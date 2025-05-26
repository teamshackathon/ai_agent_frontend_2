"use client";

import { useState } from "react";
import { Box } from "@chakra-ui/react";
import ChatInput from "../molecules/message/ChatInput";

export default function ChatWindow() {
  const [input, setInput] = useState("");

  return (
    <Box p={4} w="full">
      <ChatInput
        value={input}
        onChange={setInput}
        onSend={() => {}}
        isSending={false}
      />
    </Box>
  );
}
