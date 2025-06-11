import type { Property } from "@/lib/domain/PropertyQuery";
// components/molecules/property/PropertyCard.tsx
import { Box, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";

type Props = {
  property: Property;
  onClick?: (id: string) => void;
  isDimmed?: boolean;
};

export function PropertyCard({ property, onClick, isDimmed }: Props) {
  return (
    <Box
      w="100%"
      onClick={() => onClick?.(property.id)}
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
        {/* 左：画像 */}
        <Image
          src={property.imageUrl}
          alt={property.name}
          objectFit="cover"
          w="160px"
          h="120px"
        />

        {/* 右：テキスト情報 */}
        <Box p={4} flex="1" overflow="hidden" w="100%">
          <Stack spacing={1}>
            <Heading
              as="h3"
              size="md"
              isTruncated
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {property.name}
            </Heading>
            <Text fontSize="sm" color="gray.500" isTruncated>
              {property.address}
            </Text>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}
