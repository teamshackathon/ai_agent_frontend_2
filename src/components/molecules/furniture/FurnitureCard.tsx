// components/molecules/furniture/FurnitureCard.tsx

import type { Furniture } from "@/lib/domain/FurnitureQuery";
import { AddIcon, CheckIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Image, Text } from "@chakra-ui/react";

type Props = {
	furniture: Furniture;
	onClick?: (id: string, isSelected: boolean) => void;
	isSelected?: boolean;
	count?: number;
	onIncrement?: () => void;
	onDecrement?: () => void;
};

export function FurnitureCard({
	furniture,
	onClick,
	isSelected = false,
	count = 0,
	onIncrement,
	onDecrement,
}: Props) {
	return (
		<Box
			position="relative"
			onClick={() => onClick?.(furniture.id, isSelected)}
			borderWidth="1px"
			borderRadius="md"
			overflow="hidden"
			boxShadow="md"
			_hover={{ boxShadow: "lg" }}
			cursor="pointer"
			opacity={isSelected ? 1 : 0.5}
			transition="opacity 0.2s"
		>
			<Image
				src={furniture.imageUrl}
				alt={furniture.name}
				objectFit="cover"
				w="100%"
				h="160px"
			/>

			{isSelected && (
				<>
					{/* チェックマーク */}
					<Box
						position="absolute"
						top={2}
						right={2}
						bg="white"
						borderRadius="full"
						p={1}
					>
						<CheckIcon color="green.500" />
					</Box>

					{/* カウント操作ボックス */}
					<Flex
						position="absolute"
						bottom={2}
						right={2}
						alignItems="center"
						bg="white"
						borderRadius="md"
						px={2}
						py={1}
						gap={2}
						boxShadow="sm"
					>
						<IconButton
							aria-label="decrease"
							icon={<MinusIcon />}
							size="xs"
							onClick={(e) => {
								e.stopPropagation();
								onDecrement?.();
							}}
						/>
						<Text fontSize="sm">{count}</Text>
						<IconButton
							aria-label="increase"
							icon={<AddIcon />}
							size="xs"
							onClick={(e) => {
								e.stopPropagation();
								onIncrement?.();
							}}
						/>
					</Flex>
				</>
			)}
		</Box>
	);
}
