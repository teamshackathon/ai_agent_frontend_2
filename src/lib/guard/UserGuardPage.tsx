import { useAtomValue } from "jotai";

import { userAtomLoadable } from "@/lib/atom/UserAtom";
import { useAuthState } from "@/lib/hook/useAuthState";

import { Skeleton } from "@chakra-ui/react";
import { useRouter } from "next/router";

const UserGuardPage = ({ children }: { children: React.ReactNode }) => {
	const { user, loading, idToken } = useAuthState();
	const userInfo = useAtomValue(userAtomLoadable);

	const router = useRouter();

	if (loading || userInfo.state === "loading") {
		return <></>;
	}

	if (
		!loading &&
		userInfo.state === "hasData" &&
		(!user || !idToken || !userInfo.data)
	) {
		router.push("/");
	}

	if (user && idToken && userInfo && userInfo.state === "hasData") {
		return <>{children}</>;
	}
};

export default UserGuardPage;
