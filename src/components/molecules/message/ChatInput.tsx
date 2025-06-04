import MessageArea from "@/components/atoms/message/MessageArea";
import SendButton from "@/components/atoms/message/SendButton";
import { AddIcon } from "@chakra-ui/icons";
import {
	Box,
	Flex,
	IconButton,
	Image,
	useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";

type Props = {
	value: string;
	onChange: (val: string) => void;
	onSend: () => void;
	isSending: boolean;
	imagePreview?: string | null;
	onImageSelect?: (file: File, previewUrl: string) => void;
};

const chatInputStyle = {
	overflow: "visible" as const,
	borderRadius: "2xl",
	px: 2,
	py: 0,
	w: "full",
	boxShadow: "md",
};

export default function ChatInput({
	value,
	onChange,
	onSend,
	isSending,
	imagePreview,
	onImageSelect,
}: Props) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		textareaRef.current?.focus();
	}, []);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file?.type.startsWith("image/")) {
			const preview = URL.createObjectURL(file);
			onImageSelect?.(file, preview);
		}
	};

	return (
		<Box
			as="form"
			onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
				e.preventDefault();
				onSend();
			}}
			bg={useColorModeValue("gray.100", "gray.700")}
			{...chatInputStyle}
		>
			<Flex direction="column" gap={2}>
				{imagePreview && (
					<Image
						src={imagePreview}
						alt="プレビュー画像"
						maxH="150px"
						objectFit="contain"
						borderRadius="md"
					/>
				)}
				<Flex gap={1} align="end">
					<MessageArea
						value={value}
						onChange={(e) => onChange(e.target.value)}
						ref={textareaRef}
					/>
					<IconButton
						icon={<AddIcon />}
						aria-label="画像を追加"
						variant="ghost"
						onClick={() => fileInputRef.current?.click()}
					/>
					<input
						type="file"
						accept="image/*"
						ref={fileInputRef}
						style={{ display: "none" }}
						onChange={handleFileChange}
					/>
					<SendButton
						isSending={isSending}
						disabled={isSending || (value.trim() === "" && !imagePreview)}
					/>
				</Flex>
			</Flex>
		</Box>
	);
}
