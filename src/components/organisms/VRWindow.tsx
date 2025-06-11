// components/organisms/VRWindow.tsx

import { useState, useRef } from "react";
import { Box, SimpleGrid, useBreakpointValue, Button } from "@chakra-ui/react";
import { FurnitureCard } from "@/components/molecules/furniture/FurnitureCard";
import type { Furniture } from "@/lib/domain/FurnitureQuery";
import Scene from "../molecules/VR/VR";

type Props = {
  onNext: () => void;
};

export default function VRWindow({ onNext }: Props) {
  return (
    <Box height="100%" overflowY="auto">
      <Button colorScheme="blue" onClick={onNext}>
        配置を終了して進む
      </Button>
      <Scene />
    </Box>
  );
}
