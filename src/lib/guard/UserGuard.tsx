"use client";

import { useAtomValue } from "jotai";

import { isLoadingAuthAtom } from "../atom/AuthAtom";
import { isUserLoadingAtom, userAtom } from "../atom/UserAtom";

const UserGuard = ({ children }: { children: React.ReactNode }) => {
	const user = useAtomValue(userAtom);
	const loading = useAtomValue(isUserLoadingAtom);
	const authLoading = useAtomValue(isLoadingAuthAtom);

	if (loading || authLoading) {
		return <></>;
	}

	if (!user) {
		return <></>;
	}

	if (user) {
		return <>{children}</>;
	}
};

export default UserGuard;
