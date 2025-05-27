"use client";

import { Card, CardBody, Flex, Spacer, Text } from "@chakra-ui/react";

import { healthCheckLivenessAtomLoadable } from "@/lib/atom/HealthCheckAtom";
import { healthCheckReadinessAtomLoadable } from "@/lib/atom/HealthCheckAtom";
import { userAtomLoadable } from "@/lib/atom/UserAtom";

import type { HealthCheckResponse } from "@/lib/domain/HealthCheckQuery";
import { useAtomValue } from "jotai";
import type { Loadable } from "jotai/vanilla/utils/loadable";

import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";

import { useLoadable } from "@/lib/hook/useLoadable";

import UserGuard from "@/lib/guard/UserGuard";
import Link from "next/link";

const StatusBadge = ({
  check,
  text,
}: {
  check: Loadable<HealthCheckResponse | null>;
  text: string;
}) => {
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

  const user = useLoadable(userAtomLoadable);

  return (
    <Card w="100%" maxW="200px" m={4} p={4} borderRadius="lg" boxShadow="md">
      <CardBody>
        <Text size="xl" fontWeight={"bold"}>
          Health Check
        </Text>
        <StatusBadge check={liveness} text={"Liveness"} />
        <StatusBadge check={readiness} text={"Readiness"} />
        <UserGuard>
          <Text mt={4} fontSize="sm" color="gray.500">
            あなたはログインしています。
          </Text>
          {user && (
            <Link href={`/${user.id}`}>
              <Text mt={2} color="blue.500" textDecoration="underline">
                MYページへ移動
              </Text>
            </Link>
          )}
        </UserGuard>
      </CardBody>
    </Card>
  );
};

export default HealthCheckCard;
