// components/molecules/message/ChatOutput.tsx

import { Box, VStack } from "@chakra-ui/react";
import { Message, ROLES } from "@/lib/domain/types/Message";
import { UserMessage } from "@/components/atoms/message/UserMessage";
import { AssistantMessage } from "@/components/atoms/message/AssistantMessage";
import { SystemMessage } from "@/components/atoms/message/SystemMessage";
import { UI_CONFIG } from "@/lib/constants/uiConfig";

export const ChatOutput = ({
  messages,
  bottomRef,
}: {
  messages: Message[];
  bottomRef: React.RefObject<HTMLDivElement | null>;
}) => {
  return (
    <Box {...UI_CONFIG.chatOutput.style}>
      <VStack spacing={1} direction="column" width="100%">
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
