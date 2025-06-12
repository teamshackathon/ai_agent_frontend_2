import { PropertyCard } from "@/components/molecules/property/PropertyCard";
import type { Property } from "@/lib/domain/PropertyQuery";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import { useState } from "react";

type Props = {
	properties: Property[];
	onNext: () => void;
};

export default function PropertyWindow({ properties, onNext }: Props) {
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const selected = properties.find((p) => p.id === selectedId) ?? null;

	if (selected) {
		return (
			<Box w="100%" h="100%" p={6} overflowY="auto" bg="gray.50">
				<Button
					leftIcon={<ArrowBackIcon />}
					onClick={() => setSelectedId(null)}
					mb={4}
					colorScheme="gray"
					variant="ghost"
				>
					物件一覧に戻る
				</Button>

				<Heading size="lg" mb={2}>
					{selected.name}
				</Heading>
				<Text color="gray.500" mb={2}>
					{selected.address}
				</Text>
				<Box
					as="img"
					src={selected.imageUrl}
					alt={selected.name}
					w="100%"
					maxH="400px"
					objectFit="cover"
					mb={4}
					borderRadius="md"
				/>
				<Text whiteSpace="pre-wrap" fontSize="md" mb={6}>
					{selected.description}
				</Text>

				<Button colorScheme="blue" onClick={onNext}>
					この物件を選択して次へ進む
				</Button>
			</Box>
		);
	}

	return (
		<Box py={6} px={4} w="100%">
			<SimpleGrid minChildWidth="320px" spacing={4} mb={4} w="100%">
				{properties.map((property) => (
					<PropertyCard
						key={property.id}
						property={property}
						onClick={(id) => setSelectedId(id)}
					/>
				))}
			</SimpleGrid>
		</Box>
	);
}
