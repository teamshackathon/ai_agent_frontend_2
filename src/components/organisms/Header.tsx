// app/components/organisms/Header.tsx

"use client";

import { useAtomValue, useSetAtom } from "jotai";
import Link from "next/link";

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

import { isLoadingAuthAtom, logoutAtom } from "@/lib/atom/AuthAtom";
import { userAtom } from "@/lib/atom/UserAtom";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

const UserMenu = () => {
	const user = useAtomValue(userAtom);
	const logout = useSetAtom(logoutAtom);

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
					name={user?.name || "ゲストユーザー"}
					src={user?.avatarUrl || ""}
				/>
			</MenuButton>
			<MenuList>
				<MenuGroup title="ユーザー情報">
					<Flex alignItems="center" mx={2} mb={2}>
						<Icon as={FaRegUser} boxSize={5} color="gray.500" />
						<Text ml={2} fontSize="sm">
							{user?.name}
						</Text>
					</Flex>
					<Flex alignItems="center" mx={2} mb={2}>
						<Icon as={MdOutlineEmail} boxSize={5} color="gray.500" />
						<Text ml={2} fontSize="sm">
							{user?.email}
						</Text>
					</Flex>
				</MenuGroup>
				<MenuDivider />
				<MenuItem onClick={logout}>ログアウト</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default function Header() {
	const user = useAtomValue(userAtom);
	const isLoading = useAtomValue(isLoadingAuthAtom);

	return (
		<Flex bg={"lightblue"} alignItems="center" p={1}>
			<Box ml={1}>
				<Text fontSize="4xl" fontWeight="bold">
					FuniAIzer
				</Text>
			</Box>
			<Spacer />
			<Box mr={5}>
				{isLoading ? (
					<Skeleton>
						<Button px={8} as={Link} href={"/login"}>
							ログインする
						</Button>
					</Skeleton>
				) : user ? (
					<Box>
						<UserMenu />
					</Box>
				) : (
					<Button px={8} as={Link} href={"/login"}>
						ログインする
					</Button>
				)}
			</Box>
		</Flex>
	);
}
