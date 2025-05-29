"use client";

import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { Box, Button, Center, Skeleton, Text, VStack } from "@chakra-ui/react";

import { userAtomLoadable } from "@/lib/atom/UserAtom";
import { useAuthState } from "@/lib/hook/useAuthState";
import { useFirebaseAuth } from "@/lib/hook/useFirebaseAuth";

const UserGuardPage = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, idToken } = useAuthState();
  const userInfo = useAtomValue(userAtomLoadable);
  const { loginWithGithub, loading: oauthLoading } = useFirebaseAuth();
  const router = useRouter();

  if (loading || userInfo.state === "loading" || oauthLoading) {
    return <Skeleton height="100vh" />;
  }

  const isAuthenticated =
    user && idToken && userInfo.state === "hasData" && userInfo.data;

  if (!isAuthenticated) {
    return (
      <Center height="100vh">
        <VStack spacing={6}>
          <Text fontSize="lg">
            このページを表示するにはログインが必要です。
          </Text>
          <Button colorScheme="blue" onClick={loginWithGithub}>
            Login with GitHub
          </Button>
        </VStack>
      </Center>
    );
  }

  return <>{children}</>;
};

export default UserGuardPage;
