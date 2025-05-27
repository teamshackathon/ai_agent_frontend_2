"use client";

import { useAtomValue } from "jotai";

import {
	Avatar,
	Badge,
	Box,
	Container,
	Divider,
	Flex,
	HStack,
	Heading,
	Icon,
	SimpleGrid,
	Skeleton,
	Stack,
	Text,
	VStack,
	useColorModeValue,
} from "@chakra-ui/react";
import { FaEnvelope, FaUserCircle } from "react-icons/fa";

import { userAtomLoadable } from "@/lib/atom/UserAtom";
import UserGuard from "@/lib/guard/UserGuard";
import { useLoadable } from "@/lib/hook/useLoadable";

// ユーザー情報の型定義
interface UserProfile {
	id: string;
	display_name: string;
	email: string;
	photo_url: string;
}

export default function UserProfilePage() {
	const user = useLoadable(userAtomLoadable);

	// 背景色とボーダーカラーをテーマに基づいて設定
	const bgColor = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");
	const textColor = useColorModeValue("gray.700", "gray.200");
	const subtleColor = useColorModeValue("gray.600", "gray.400");

	return (
		<UserGuard>
			{user && (
				<Container maxW="container.lg" py={8}>
					<Box
						bg={bgColor}
						borderWidth="1px"
						borderColor={borderColor}
						borderRadius="lg"
						overflow="hidden"
						boxShadow="lg"
					>
						{/* ヘッダー部分 - ユーザー基本情報 */}
						<Box p={6}>
							<Flex
								direction={{ base: "column", md: "row" }}
								alignItems="center"
							>
								<Avatar
									size="2xl"
									name={user?.displayName}
									src={user?.photoURL}
									border="4px solid"
									borderColor="blue.400"
									mb={{ base: 4, md: 0 }}
								/>

								<Stack
									ml={{ base: 0, md: 6 }}
									spacing={1}
									textAlign={{ base: "center", md: "left" }}
								>
									<Heading size="xl" fontWeight="bold" color={textColor}>
										{user?.displayName}
									</Heading>

									<HStack
										mt={2}
										spacing={2}
										justify={{ base: "center", md: "flex-start" }}
									>
										<Badge
											colorScheme="blue"
											fontSize="0.8em"
											px={2}
											py={1}
											borderRadius="full"
										>
											Developer
										</Badge>
										{user?.id.includes("github") && (
											<Badge
												colorScheme="green"
												fontSize="0.8em"
												px={2}
												py={1}
												borderRadius="full"
											>
												GitHub
											</Badge>
										)}
									</HStack>
								</Stack>
							</Flex>
						</Box>

						<Divider />

						{/* 詳細情報 */}
						<Box p={6}>
							<SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
								<VStack align="start" spacing={2}>
									<Flex align="center">
										<Icon as={FaEnvelope} mr={2} color="blue.500" />
										<Text fontWeight="medium">メールアドレス</Text>
									</Flex>
									<Text color={subtleColor}>{user?.email}</Text>
								</VStack>

								<VStack align="start" spacing={2}>
									<Flex align="center">
										<Icon as={FaUserCircle} mr={2} color="blue.500" />
										<Text fontWeight="medium">ユーザーID</Text>
									</Flex>
									<Text color={subtleColor}>{user?.id}</Text>
								</VStack>
							</SimpleGrid>
						</Box>
					</Box>
				</Container>
			)}
		</UserGuard>
	);
}
