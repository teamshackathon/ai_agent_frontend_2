import { useAtomValue } from "jotai";

import { userAtomLoadable } from "@/lib/atom/UserAtom";
import { useAuthState } from "@/lib/hook/useAuthState";

import { Skeleton } from "@chakra-ui/react";

const UserGuard = ({ children }: { children: React.ReactNode }) => {
	const { user, loading, idToken } = useAuthState();
	const userInfo = useAtomValue(userAtomLoadable);

	if (loading) {
		return <></>;
	}

	if (!user || !idToken || !userInfo) {
		return <></>;
	}

	if (user && idToken && userInfo && userInfo.state === "hasData") {
		return <>{children}</>;
	}
};

export default UserGuard;
