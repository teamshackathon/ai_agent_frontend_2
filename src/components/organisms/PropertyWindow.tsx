// components/organisms/PropertyWindow.tsx

import { useState } from "react";
import {
  Box,
  SimpleGrid,
  Container,
  Heading,
  Text,
  Stack,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
import { Property } from "@/lib/domain/PropertyQuery";
import { PropertyCard } from "@/components/molecules/property/PropertyCard";

type Props = {
  properties: Property[];
  onNext: () => void;
};

export default function PropertyWindow({ properties, onNext }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3 }) ?? 3;

  const rows = [];
  for (let i = 0; i < properties.length; i += columns) {
    const rowItems = properties.slice(i, i + columns);
    const hasSelected = rowItems.some((p) => p.id === selectedId);
    rows.push(
      <SimpleGrid key={`row-${i}`} columns={columns} spacing={4} mb={2}>
        {rowItems.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            isDimmed={selectedId !== null && selectedId !== property.id}
            onClick={() => setSelectedId(property.id)}
          />
        ))}
      </SimpleGrid>
    );

    if (hasSelected) {
      const selected = rowItems.find((p) => p.id === selectedId);
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
            <Text color="gray.500">{selected.address}</Text>
            <Text mt={2}>{selected.description}</Text>
          </Box>
        );
      }
    }
  }
  return (
    <>
      <Container maxW="6xl" py={6}>
        {rows}
      </Container>
      <Button onClick={onNext}>次に遷移</Button>
    </>
  );
}
