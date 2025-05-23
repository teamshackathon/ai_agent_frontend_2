"use client";

import {
	healthCheckLivenessAtomLoadable,
	healthCheckReadinessAtomLoadable,
} from "@/lib/atom/HealthCheckAtom";

import type { HealthCheckResponse } from "@/lib/domain/HealthCheckQuery";
import type { User, UserResponse } from "@/lib/domain/UserQuery";
import { useAtomValue } from "jotai";
import type { Loadable } from "jotai/vanilla/utils/loadable";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Activity,
	AlertCircle,
	CheckCircle,
	Github,
	HelpCircle,
	Loader2,
	LogOut,
} from "lucide-react";

import { userAtomLoadable } from "@/lib/atom/UserAtom";
import { useAuthState } from "@/lib/hook/useAuthState";
import { useFirebaseAuth } from "@/lib/hook/useFirebaseAuth";

const getStatusDisplay = (
	check: Loadable<Promise<HealthCheckResponse | null>>,
) => {
	if (check.state === "loading")
		return <Loader2 className="h-4 w-4 animate-spin text-sky-500" />;
	if (check.state === "hasError")
		return (
			<span className="text-sm font-medium text-red-500 bg-white px-3 py-1 rounded-full flex items-center">
				<AlertCircle className="h-3 w-3 mr-1" /> ERROR
			</span>
		);
	if (check.state === "hasData") {
		return check.data?.status === "ok" ? (
			<span className="text-sm font-medium text-sky-600 bg-white px-3 py-1 rounded-full flex items-center">
				<CheckCircle className="h-3 w-3 mr-1" /> OK
			</span>
		) : (
			<span className="text-sm font-medium text-red-500 bg-white px-3 py-1 rounded-full flex items-center">
				<AlertCircle className="h-3 w-3 mr-1" /> FAIL
			</span>
		);
	}
	return (
		<span className="text-sm font-medium text-amber-500 bg-white px-3 py-1 rounded-full flex items-center">
			<HelpCircle className="h-3 w-3 mr-1" /> UNKNOWN
		</span>
	);
};

const getUserDisplay = (userInfo: Loadable<Promise<User | null>>) => {
	if (userInfo.state === "loading")
		return <Loader2 className="h-4 w-4 animate-spin text-sky-500" />;
	if (userInfo.state === "hasError")
		return (
			<span className="text-sm font-medium text-red-500 bg-white px-3 py-1 rounded-full flex items-center">
				<AlertCircle className="h-3 w-3 mr-1" /> ERROR
			</span>
		);
	if (userInfo.state === "hasData") {
		return userInfo.data?.displayName ? (
			<span className="text-sm font-medium text-sky-600 bg-white px-3 py-1 rounded-full">
				{userInfo.data.displayName}
			</span>
		) : (
			<span className="text-sm font-medium text-red-500 bg-white px-3 py-1 rounded-full flex items-center">
				<AlertCircle className="h-3 w-3 mr-1" /> FAIL
			</span>
		);
	}
	return (
		<span className="text-sm font-medium text-amber-500 bg-white px-3 py-1 rounded-full flex items-center">
			<HelpCircle className="h-3 w-3 mr-1" /> UNKNOWN
		</span>
	);
};

export default function Header() {
	const { user, loading } = useAuthState();
	const liveness = useAtomValue(healthCheckLivenessAtomLoadable);
	const readiness = useAtomValue(healthCheckReadinessAtomLoadable);
	const userInfo = useAtomValue(userAtomLoadable);
	console.log(userInfo);
	const { loginWithGithub, logout } = useFirebaseAuth();

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen bg-gradient-to-b from-sky-200 to-white">
				<div className="p-8 rounded-xl bg-white shadow-lg flex flex-col items-center">
					<Loader2 className="h-10 w-10 animate-spin text-sky-500" />
					<p className="mt-3 text-sky-700 font-medium">読み込み中...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-gradient-to-r from-sky-500 to-sky-400 text-white shadow-lg w-full">
			<div className="max-w-7xl w-full mx-auto px-6 py-4 flex justify-between items-center">
				<div className="flex items-center">
					<Activity className="h-7 w-7 mr-3" />
					<h1 className="text-2xl font-bold">Health Monitor</h1>
				</div>

				<div className="flex items-center space-x-8">
					<div className="bg-sky-600/30 backdrop-blur-sm rounded-lg px-5 py-3 shadow-md border border-white/10">
						<div className="flex items-center mb-2">
							<span className="text-sm font-medium mr-3 text-white">
								Liveness:
							</span>
							{getStatusDisplay(liveness)}
						</div>
						<div className="flex items-center">
							<span className="text-sm font-medium mr-3 text-white">
								Readiness:
							</span>
							{getStatusDisplay(readiness)}
						</div>
					</div>

					<div>
						{loading ? (
							<Loader2 className="h-5 w-5 animate-spin text-white" />
						) : user ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										className="relative h-11 w-11 rounded-full bg-white hover:bg-sky-50 p-0.5 ring-2 ring-white"
									>
										{/* userinfoがある時はUserInfoのデータを使う */}
										{userInfo.state === "hasData" && userInfo.data ? (
											<Avatar>
												<AvatarImage
													src={userInfo.data.photoURL || undefined}
													alt={userInfo.data.displayName || "User"}
												/>
												<AvatarFallback className="bg-sky-200 text-sky-700 font-medium">
													{userInfo.data.displayName?.charAt(0) || "U"}
												</AvatarFallback>
											</Avatar>
										) : (
											<Loader2 className="h-10 w-10 animate-spin text-sky-500" />
										)}
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									align="end"
									className="bg-white shadow-xl border-sky-100 rounded-lg"
								>
									<div className="flex items-center justify-start gap-3 p-4 border-b border-sky-100">
										{/* userinfoがある時はUserInfoのデータを使う */}
										{userInfo.state === "hasData" && userInfo.data ? (
											<Avatar>
												<AvatarImage
													src={userInfo.data.photoURL || undefined}
													alt={userInfo.data.displayName || "User"}
												/>
												<AvatarFallback className="bg-sky-200 text-sky-700 font-medium">
													{userInfo.data.displayName?.charAt(0) || "U"}
												</AvatarFallback>
											</Avatar>
										) : (
											<Loader2 className="h-10 w-10 animate-spin text-sky-500" />
										)}
										{/* userinfoがある時に表示する */}
										{userInfo.state === "hasData" && userInfo.data ? (
											<div className="flex flex-col">
												<span className="text-sm font-medium text-sky-700">
													{userInfo.data.displayName}
												</span>
												<span className="text-xs text-gray-500">
													{userInfo.data.email}
												</span>
											</div>
										) : (
											<Loader2 className="h-4 w-4 animate-spin text-sky-500" />
										)}
									</div>
									<DropdownMenuItem
										onClick={logout}
										className="cursor-pointer hover:bg-sky-50 text-sky-700 py-3"
									>
										<LogOut className="mr-2 h-4 w-4" />
										<span>ログアウト</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<Button
								onClick={loginWithGithub}
								className="flex items-center gap-2 bg-white text-sky-600 hover:bg-sky-50 hover:text-sky-700 border border-sky-200 font-medium px-4 py-2"
							>
								<Github className="h-4 w-4" />
								<span>GitHubでログイン</span>
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
