// components/organisms/FurnitureWindow.tsx

import { useState, useRef } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FurnitureCard } from "@/components/molecules/furniture/FurnitureCard";
import type { Furniture } from "@/lib/domain/FurnitureQuery";

type Props = {
  furnitures: Furniture[];
  onNext: () => void;
};

export default function FurnitureWindow({ furnitures, onNext }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3 }) ?? 3;

  const handleCardClick = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current) {
      setSelectedId(null);
    }
  };

  const rows = [];
  for (let i = 0; i < furnitures.length; i += columns) {
    const rowItems = furnitures.slice(i, i + columns);
    const hasSelected = rowItems.some((f) => f.id === selectedId);

    rows.push(
      <SimpleGrid key={`row-${i}`} minChildWidth="280px" spacing={4} mb={2}>
        {rowItems.map((furniture) => (
          <FurnitureCard
            key={furniture.id}
            furniture={furniture}
            isDimmed={!!selectedId && selectedId !== furniture.id}
            onClick={() => handleCardClick(furniture.id)}
          />
        ))}
      </SimpleGrid>
    );

    if (hasSelected) {
      const selected = rowItems.find((f) => f.id === selectedId);
      if (selected) {
        rows.push(
          <Box
            key={`details-${selected.id}`}
            borderWidth="1px"
            borderRadius="md"
            p={4}
            mb={4}
            bg="gray.50"
            gridColumn="1 / -1"
          >
            <Heading size="md" mb={2}>
              {selected.name}
            </Heading>
            <Text color="gray.500">{selected.category}</Text>
            <Text mt={2} whiteSpace="pre-wrap">
              {selected.description}
            </Text>
            <Button mt={4} colorScheme="blue" onClick={onNext}>
              この家具を選択して次へ進む
            </Button>
          </Box>
        );
      }
    }
  }

  return (
    <Box
      ref={containerRef}
      onClick={handleClickOutside}
      height="100%"
      overflowY="auto"
    >
      <Container maxW="6xl" py={6}>
        {rows}
      </Container>
    </Box>
  );
}
