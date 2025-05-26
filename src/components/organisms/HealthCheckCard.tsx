"use client";

import {
	Box,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Flex,
	Heading,
	Spacer,
	Text,
} from "@chakra-ui/react";

import { healthCheckLivenessAtomLoadable } from "@/lib/atom/HealthCheckAtom";
import { healthCheckReadinessAtomLoadable } from "@/lib/atom/HealthCheckAtom";

import type { HealthCheckResponse } from "@/lib/domain/HealthCheckQuery";
import { useAtomValue } from "jotai";
import type { Loadable } from "jotai/vanilla/utils/loadable";

import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";

const StatusBadge = ({
	check,
	text,
}: { check: Loadable<HealthCheckResponse | null>; text: string }) => {
	if (check.state === "loading") {
		return <Text>Loading...</Text>;
	}

	if (check.state === "hasData" && check.data) {
		return check.data.status === "ok" ? (
			<Flex alignItems="center">
				<Text color="green.500">{text}</Text>
				<Spacer />
				<CheckCircleIcon color="green.500" boxSize={4} mr={2} />
			</Flex>
		) : (
			<Flex alignItems="center">
				<Text color="red.500">{text}</Text>
				<Spacer />
				<WarningIcon color="red.500" boxSize={4} mr={2} />
			</Flex>
		);
	}

	if (check.state === "hasError") {
		return <Text color="red.500">Error</Text>;
	}

	return null;
};

const HealthCheckCard = () => {
	const liveness = useAtomValue(healthCheckLivenessAtomLoadable);
	const readiness = useAtomValue(healthCheckReadinessAtomLoadable);

	return (
		<Card w="100%" maxW="200px" m={4} p={4} borderRadius="lg" boxShadow="md">
			<CardBody>
				<Text size="xl" fontWeight={"bold"}>
					Health Check
				</Text>
				<StatusBadge check={liveness} text={"Liveness"} />
				<StatusBadge check={readiness} text={"Readiness"} />
			</CardBody>
		</Card>
	);
};

export default HealthCheckCard;
