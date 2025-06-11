// components/organisms/FurnitureWindow.tsx

import { useState, useRef } from "react";
import { Box, SimpleGrid, useBreakpointValue, Button } from "@chakra-ui/react";
import { FurnitureCard } from "@/components/molecules/furniture/FurnitureCard";
import type { Furniture } from "@/lib/domain/FurnitureQuery";

type Props = {
  furnitures: Furniture[];
  onNext: () => void;
};

export default function FurnitureWindow({ furnitures, onNext }: Props) {
  const [items, setItems] = useState<Furniture[]>(
    furnitures.map((f) => ({ ...f, selected: false, count: 0 }))
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3 }) ?? 3;

  const handleCardClick = (id: string, isSelected: boolean) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        if (isSelected) {
          // 選択解除
          return { ...item, selected: false, count: 0 };
        } else {
          // 新規選択
          return { ...item, selected: true, count: 1 };
        }
      })
    );
  };

  const increment = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, count: (item.count || 0) + 1 } : item
      )
    );
  };

  const decrement = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const newCount = (item.count || 0) - 1;
        if (newCount <= 0) return { ...item, selected: false, count: 0 };
        return { ...item, count: newCount };
      })
    );
  };

  return (
    <Box
      ref={containerRef}
      onClick={(e) => {
        if (e.target === containerRef.current) {
          setItems((prev) =>
            prev.map((item) => ({ ...item, selected: false, count: 0 }))
          );
        }
      }}
      height="100%"
      overflowY="auto"
    >
      <Box w="100%" py={6} px={4} mx="auto">
        <SimpleGrid minChildWidth="280px" spacing={4} mb={2}>
          {items.map((furniture) => (
            <FurnitureCard
              key={furniture.id}
              furniture={furniture}
              onClick={() =>
                handleCardClick(furniture.id, furniture.selected || false)
              }
              isSelected={furniture.selected || false}
              count={furniture.count || 0}
              onIncrement={() => increment(furniture.id)}
              onDecrement={() => decrement(furniture.id)}
            />
          ))}
        </SimpleGrid>
      </Box>
      <Button colorScheme="blue" onClick={onNext}>
        この物件を選択して次へ進む
      </Button>
    </Box>
  );
}
