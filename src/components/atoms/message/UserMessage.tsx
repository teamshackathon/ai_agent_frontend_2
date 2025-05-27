// components/atoms/message/UserMessage.tsx

import { Flex, Box, Text } from "@chakra-ui/react";
import { UI_CONFIG } from "@/lib/constants/uiConfig";
import { Message } from "@/lib/domain/types/Message";

export const UserMessage = ({ message }: { message: Message }) => {
  return (
    <Flex {...UI_CONFIG.message.user.adjust}>
      <Box {...UI_CONFIG.message.style} {...UI_CONFIG.message.user.color}>
        <Text {...UI_CONFIG.message.user.fontColor}>{message.text}</Text>
      </Box>
    </Flex>
  );
};
