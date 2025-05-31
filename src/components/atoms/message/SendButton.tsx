// components/atoms/message/SendButton.tsx

import { IconButton } from "@chakra-ui/react";
import { IoIosSend } from "react-icons/io";

export default function SendButton({
	isSending,
	disabled,
}: { isSending: boolean; disabled?: boolean }) {
	return (
		<IconButton
			icon={<IoIosSend />}
			disabled={disabled}
			isRound={true}
			aria-label="Send message"
		/>
	);
}
