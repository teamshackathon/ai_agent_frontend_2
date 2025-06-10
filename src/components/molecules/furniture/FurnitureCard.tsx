// components/molecules/furniture/Furniturecard.tsx

import { Box, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import type { Furniture } from "@/lib/domain/FurnitureQuery";

type Props = {
  furniture: Furniture;
  onClick?: (id: string) => void;
  isDimmed?: boolean;
};

export function FurnitureCard({ furniture, onClick, isDimmed }: Props) {
  return (
    <Box
      onClick={() => onClick?.(furniture.id)}
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      boxShadow="md"
      _hover={{ boxShadow: "lg" }}
      cursor="pointer"
      opacity={isDimmed ? 0.5 : 1}
      transition="opacity 0.2s"
    >
      <Flex>
        <Image
          src={furniture.imageUrl}
          alt={furniture.name}
          objectFit="cover"
          w="160px"
          h="120px"
        />
        <Box p={4} flex="1" overflow="hidden">
          <Stack spacing={1}>
            <Heading
              as="h3"
              size="md"
              isTruncated
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {furniture.name}
            </Heading>
            <Text fontSize="sm" color="gray.500" isTruncated>
              {furniture.category}
            </Text>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}
