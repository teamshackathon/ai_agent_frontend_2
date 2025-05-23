"use client";

import { useAtomValue } from "jotai";

import { userAtomLoadable } from "@/lib/atom/UserAtom";
import { useAuthState } from "@/lib/hook/useAuthState";
import { useFirebaseAuth } from "@/lib/hook/useFirebaseAuth";

import {
	Avatar,
	Box,
	Button,
	Center,
	Flex,
	Icon,
	Skeleton,
	Spacer,
	Spinner,
	Text,
	VStack,
} from "@chakra-ui/react";
import {
	Menu,
	MenuButton,
	MenuDivider,
	MenuGroup,
	MenuItem,
	MenuList,
} from "@chakra-ui/react";

import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

const UserMenu = () => {
	const user = useAtomValue(userAtomLoadable);
	console.log("UserMenu", user);

	const { logout } = useFirebaseAuth();

	if (!user) {
		return null;
	}

	if (user.state === "loading") {
		return (
			<Skeleton>
				<Button>Loading...</Button>
			</Skeleton>
		);
	}

	if (user.state === "hasData" && user.data) {
		return (
			<Menu>
				<MenuButton
					as={Button}
					rounded="full"
					variant="link"
					cursor="pointer"
					minW={0}
				>
					<Avatar
						size="md"
						name={user.data.displayName}
						src={user.data.photoURL}
					/>
				</MenuButton>
				<MenuList>
					<MenuGroup title="ユーザー情報">
						<Flex alignItems="center" mx={2} mb={2}>
							<Icon as={FaRegUser} boxSize={5} color="gray.500" />
							<Text ml={2} fontSize="sm">
								{user.data.displayName}
							</Text>
						</Flex>
						<Flex alignItems="center" mx={2} mb={2}>
							<Icon as={MdOutlineEmail} boxSize={5} color="gray.500" />
							<Text ml={2} fontSize="sm">
								{user.data.email}
							</Text>
						</Flex>
					</MenuGroup>
					<MenuDivider />
					<MenuItem onClick={logout}>ログアウト</MenuItem>
				</MenuList>
			</Menu>
		);
	}
};

export default function Header() {
	const { user, loading } = useAuthState();
	const { loginWithGithub, loading: oauthLoading } = useFirebaseAuth();

	if (oauthLoading) {
		return (
			<Center minH="100vh">
				<VStack spacing={4}>
					<Spinner size="xl" color="blue.500" thickness="4px" />
					<Text fontSize="lg">認証ページへ移動します...</Text>
				</VStack>
			</Center>
		);
	}

	return (
		<Flex bg={"lightblue"} alignItems="center" p={1}>
			<Box ml={1}>
				<Text fontSize="4xl" fontWeight="bold">
					FuniAIzer
				</Text>
			</Box>
			<Spacer />
			<Box mr={5}>
				{loading ? (
					<Skeleton>
						<Button onClick={loginWithGithub}>Login with GitHub</Button>
					</Skeleton>
				) : user ? (
					<Box>
						<UserMenu />
					</Box>
				) : (
					<Button onClick={loginWithGithub}>Login with GitHub</Button>
				)}
			</Box>
		</Flex>
	);
}
