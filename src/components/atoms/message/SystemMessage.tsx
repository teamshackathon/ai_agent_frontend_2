// components/atoms/message/UserMessage.tsx

import { UI_CONFIG } from "@/lib/constants/uiConfig";
import type { Message } from "@/lib/domain/MessageQuery";
import { Box, Flex, Text } from "@chakra-ui/react";

export const SystemMessage = ({ message }: { message: Message }) => {
  return (
    <Flex {...UI_CONFIG.message.system.adjust}>
      <Box {...UI_CONFIG.message.style} {...UI_CONFIG.message.system.color}>
        <Text {...UI_CONFIG.message.system.font}>{message.text}</Text>
      </Box>
    </Flex>
  );
};
