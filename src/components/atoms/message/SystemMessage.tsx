// components/atoms/message/SystemMessage.tsx

import { messageBox } from "@/lib/constants/uiConfig";
import type { Message } from "@/lib/domain/MessageQuery";
import { Box, Flex, Text } from "@chakra-ui/react";

export const SystemMessage = ({ message }: { message: Message }) => {
  return (
    <Flex width="full" justify="center" my={1}>
      <Box {...messageBox} bg={"yellow.200"}>
        <Text lineHeight={1.3} color={"black"}>
          {message.text}
        </Text>
      </Box>
    </Flex>
  );
};
