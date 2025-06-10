import { PropertyCard } from "@/components/molecules/property/PropertyCard";
import type { Property } from "@/lib/domain/PropertyQuery";
import {
	Box,
	Button,
	Container,
	Heading,
	SimpleGrid,
	Text,
	useBreakpointValue,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

type Props = {
	properties: Property[];
	onNext: () => void;
};

export default function PropertyWindow({ properties, onNext }: Props) {
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
	for (let i = 0; i < properties.length; i += columns) {
		const rowItems = properties.slice(i, i + columns);
		const hasSelected = rowItems.some((p) => p.id === selectedId);

		rows.push(
			<SimpleGrid key={`row-${i}`} minChildWidth="280px" spacing={4} mb={2}>
				{rowItems.map((property) => (
					<PropertyCard
						key={property.id}
						property={property}
						isDimmed={!!selectedId && selectedId !== property.id}
						onClick={() => handleCardClick(property.id)}
					/>
				))}
			</SimpleGrid>,
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
						<Text mt={2} whiteSpace="pre-wrap">
							{selected.description}
						</Text>
						<Button mt={4} colorScheme="blue" onClick={onNext}>
							この物件を選択して次へ進む
						</Button>
					</Box>,
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
