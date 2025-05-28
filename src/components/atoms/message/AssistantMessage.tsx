// components/atoms/message/UserMessage.tsx

import { UI_CONFIG } from "@/lib/constants/uiConfig";
import type { Message } from "@/lib/domain/types/Message";
import { Box, Flex, Text } from "@chakra-ui/react";

export const AssistantMessage = ({ message }: { message: Message }) => {
	return (
		<Flex {...UI_CONFIG.message.assistant.adjust}>
			<Box {...UI_CONFIG.message.style} {...UI_CONFIG.message.assistant.color}>
				<Text {...UI_CONFIG.message.assistant.font}>{message.text}</Text>
			</Box>
		</Flex>
	);
};
