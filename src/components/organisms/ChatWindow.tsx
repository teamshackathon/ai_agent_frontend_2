"use client";

import { useState } from "react";
import ChatInput from "../molecules/message/ChatInput";

export default function ChatWindow() {
	const [input, setInput] = useState("");

	return (
		<div className="p-4 max-w-xl mx-auto">
			<ChatInput
				value={input}
				onChange={setInput}
				onSend={() => {}}
				isSending={false}
			/>
		</div>
	);
}
