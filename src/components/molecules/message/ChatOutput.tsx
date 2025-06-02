// components/molecules/message/ChatOutput.tsx

import { AssistantMessage } from "@/components/atoms/message/AssistantMessage";
import { SystemMessage } from "@/components/atoms/message/SystemMessage";
import { UserMessage } from "@/components/atoms/message/UserMessage";
import { scrollbarStyle } from "@/lib/constants/uiConfig";
import { type Message, ROLES } from "@/lib/domain/MessageQuery";
import { Box, VStack } from "@chakra-ui/react";

export const ChatOutput = ({
  messages,
  bottomRef,
}: {
  messages: Message[];
  bottomRef: React.RefObject<HTMLDivElement | null>;
}) => {
  return (
    <Box
      h="100%"
      display="flex"
      flexDirection="column"
      flex="1"
      overflow="hidden"
    >
      <VStack
        spacing={1}
        align="stretch"
        flex="1"
        overflowY="auto" // ✅ スクロール可能に
        px={2}
        pt={3}
        sx={scrollbarStyle}
      >
        {messages.slice().map((message) => {
          switch (message.role) {
            case ROLES.USER:
              return <UserMessage key={message.id} message={message} />;
            case ROLES.ASSISTANT:
              return <AssistantMessage key={message.id} message={message} />;
            case ROLES.SYSTEM:
              return <SystemMessage key={message.id} message={message} />;
            default:
              return null;
          }
        })}
        <div ref={bottomRef} />
      </VStack>
    </Box>
  );
};
