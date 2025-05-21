"use client";

import {
	healthCheckLivenessAtomLoadable,
	healthCheckReadinessAtomLoadable,
} from "@/lib/atom/HealthCheckAtom";

import { useAtomValue } from "jotai";
import type { Loadable } from "jotai/vanilla/utils/loadable";
import type { HealthCheckResponse } from "@/lib/domain/HealthCheckQuery";

import { Loader2 } from "lucide-react"; // ShadCN UI では Lucide アイコンを多用

const getStatusDisplay = (
	check: Loadable<Promise<HealthCheckResponse | null>>,
) => {
	if (check.state === "loading") return null;
	if (check.state === "hasError")
		return <span className="text-sm text-red-500">ERROR</span>;
	if (check.state === "hasData") {
		return check.data?.status === "ok" ? (
			<span className="text-sm text-green-500">OK</span>
		) : (
			<span className="text-sm text-red-500">FAIL</span>
		);
	}
	return <span className="text-sm text-yellow-500">UNKNOWN</span>;
};

export default function Header() {
	const liveness = useAtomValue(healthCheckLivenessAtomLoadable);
	const readiness = useAtomValue(healthCheckReadinessAtomLoadable);

	return (
		<div className="flex p-4">
			<div>
				<h1 className="text-2xl font-bold mb-2">Health Check</h1>
				<div className="flex items-center mb-1">
					<span className="text-sm font-medium mr-2">Liveness:</span>
					{getStatusDisplay(liveness)}
				</div>
				<div className="flex items-center">
					<span className="text-sm font-medium mr-2">Readiness:</span>
					{getStatusDisplay(readiness)}
				</div>
			</div>
		</div>
	);
}
