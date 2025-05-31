"use client";

import Header from "@/components/organisms/Header";
import UserGuardPage from "@/lib/guard/UserGuardPage";
import { useAuthState } from "@/lib/hook/useAuthState";
import {
	Badge,
	Box,
	Button,
	Container,
	Flex,
	Grid,
	HStack,
	Heading,
	Icon,
	Image,
	SimpleGrid,
	Stack,
	Text,
	VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import {
	FaArrowRight,
	FaCouch,
	FaHome,
	FaImage,
	FaTruck,
} from "react-icons/fa";
import type { IconType } from "react-icons/lib";

export default function Landing() {
	const { user } = useAuthState();
	console.log("user", user);

	return (
		<Box minH="100vh" display="flex" flexDirection="column">
			<Header />
			<Container maxW="container.xl" py={10} flex="1">
				{/* Hero Section */}
				<Flex
					direction={{ base: "column", md: "row" }}
					align="center"
					justify="space-between"
					mb={16}
					gap={8}
				>
					<Box maxW={{ base: "100%", md: "50%" }}>
						<Badge colorScheme="blue" fontSize="sm" mb={3}>
							新登場
						</Badge>
						<Heading
							as="h1"
							size="2xl"
							fontWeight="bold"
							lineHeight="shorter"
							mb={5}
						>
							引越し後の部屋を
							<Box as="span" color="blue.500">
								{" "}
								AIで
							</Box>
							<br />
							イメージしましょう
						</Heading>
						<Text fontSize="xl" color="gray.600" mb={6} lineHeight="tall">
							家具の配置に悩む引越し。新居に家具を配置したイメージを事前に確認できれば、理想の暮らしがすぐに実現します。
						</Text>
						<Stack direction={{ base: "column", sm: "row" }} spacing={4}>
							<Button
								size="lg"
								colorScheme="blue"
								px={8}
								rightIcon={<Icon as={FaArrowRight} />}
								as={Link}
								href={user ? "/chat" : "/login"}
							>
								今すぐ始める
							</Button>
							<Button
								size="lg"
								variant="outline"
								colorScheme="blue"
								px={8}
								as={Link}
								href="#how-it-works"
							>
								詳細を見る
							</Button>
						</Stack>
					</Box>

					<Box
						maxW={{ base: "100%", md: "45%" }}
						borderRadius="xl"
						overflow="hidden"
						boxShadow="2xl"
						position="relative"
					>
						<Image
							src="furniaizer/images/hero-visualization.png"
							alt="引越し先イメージ"
							fallbackSrc="https://via.placeholder.com/600x400?text=引越し先イメージ"
							borderRadius="xl"
							w="full"
						/>
						<Box
							position="absolute"
							bottom={4}
							right={4}
							bg="white"
							px={3}
							py={2}
							borderRadius="md"
							boxShadow="md"
						>
							<Text fontWeight="bold" color="blue.500">
								AI生成イメージ
							</Text>
						</Box>
					</Box>
				</Flex>

				{/* Features Section */}
				<Box mb={20} id="features">
					<Heading textAlign="center" mb={12} size="xl" fontWeight="semibold">
						Furniaizer{" "}
						<Box as="span" color="blue.500">
							の特徴
						</Box>
					</Heading>

					<SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
						<FeatureCard
							icon={FaImage}
							title="リアルな可視化"
							description="AIが現在の家具データから新居での配置をリアルに可視化。引越し前に新生活をイメージできます。"
						/>
						<FeatureCard
							icon={FaCouch}
							title="家具の最適配置"
							description="部屋の寸法に合わせて家具を最適に配置。スペースを最大限に活用した提案が可能です。"
						/>
						<FeatureCard
							icon={FaTruck}
							title="引越し見積もりサポート"
							description="引越し業者への依頼をサポート。配置プランを共有し、スムーズな引越しをアシストします。"
						/>
					</SimpleGrid>
				</Box>

				{/* How it Works */}
				<Box mb={20} id="how-it-works">
					<Heading textAlign="center" mb={12} size="xl" fontWeight="semibold">
						<Box as="span" color="blue.500">
							ご利用
						</Box>
						の流れ
					</Heading>

					<Grid templateColumns={{ base: "1fr", lg: "repeat(4, 1fr)" }} gap={8}>
						<ProcessStep
							number="01"
							title="写真アップロード"
							description="現在の家の家具や部屋の写真をアップロードします。"
						/>
						<ProcessStep
							number="02"
							title="新居情報入力"
							description="新居の見取り図や写真をアップロードします。"
						/>
						<ProcessStep
							number="03"
							title="AI処理"
							description="AIが家具の配置を最適化し、新居での配置イメージを生成します。"
						/>
						<ProcessStep
							number="04"
							title="結果確認"
							description="生成された3Dイメージや写真で、新居での暮らしをイメージできます。"
						/>
					</Grid>
				</Box>

				{/* Use Cases */}
				<Box mb={20} id="use-cases">
					<Heading textAlign="center" mb={12} size="xl" fontWeight="semibold">
						<Box as="span" color="blue.500">
							利用
						</Box>
						シーン
					</Heading>

					<SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
						<UseCaseCard
							title="個人の引越し"
							description="新居への引越しを検討中の方。実際の家具配置をイメージして、引越し後のギャップを解消します。"
							imageSrc="furniaizer/images/personal-moving.png"
							fallbackSrc="https://via.placeholder.com/500x300?text=個人の引越し"
						/>
						<UseCaseCard
							title="不動産会社連携"
							description="不動産会社と連携し、顧客に新居での暮らしをイメージしてもらうことができます。"
							imageSrc="furniaizer/images/real-estate.png"
							fallbackSrc="https://via.placeholder.com/500x300?text=不動産会社連携"
						/>
					</SimpleGrid>
				</Box>

				{/* CTA Section */}
				<Flex
					direction="column"
					align="center"
					justify="center"
					bg="blue.50"
					p={10}
					borderRadius="xl"
					boxShadow="sm"
					mb={10}
				>
					<Heading size="lg" mb={4} textAlign="center">
						あなたの新生活を可視化しましょう
					</Heading>
					<Text fontSize="lg" mb={6} textAlign="center" maxW="600px">
						部屋の写真をアップロードするだけで、引越し後の生活をリアルにイメージ。
						今すぐ試してみませんか？
					</Text>
					<Button
						size="lg"
						colorScheme="blue"
						px={8}
						rightIcon={<Icon as={FaArrowRight} />}
						as={Link}
						href={user ? "/chat" : "/login"}
					>
						今すぐ始める
					</Button>
				</Flex>

				{/* Footer */}
				<Box as="footer" textAlign="center" py={6}>
					<Text color="gray.500">
						© 2025 Furniaizer - 家具引越後イメージ作成AI
					</Text>
				</Box>
			</Container>
		</Box>
	);
}

// Component for feature cards
function FeatureCard({
	icon,
	title,
	description,
}: {
	icon: IconType;
	title: string;
	description: string;
}) {
	return (
		<VStack
			align="start"
			p={6}
			bg="white"
			borderRadius="lg"
			boxShadow="md"
			spacing={4}
			_hover={{ boxShadow: "lg", transform: "translateY(-5px)" }}
			transition="all 0.3s"
		>
			<Flex
				align="center"
				justify="center"
				bg="blue.500"
				color="white"
				borderRadius="full"
				p={3}
			>
				<Icon as={icon} boxSize={6} />
			</Flex>
			<Heading size="md">{title}</Heading>
			<Text color="gray.600">{description}</Text>
		</VStack>
	);
}

// Component for process steps
function ProcessStep({
	number,
	title,
	description,
}: {
	number: string;
	title: string;
	description: string;
}) {
	return (
		<VStack align="start" spacing={4} position="relative">
			<Flex
				align="center"
				justify="center"
				bg="blue.500"
				color="white"
				borderRadius="full"
				w="50px"
				h="50px"
				fontSize="xl"
				fontWeight="bold"
			>
				{number}
			</Flex>
			<Heading size="md">{title}</Heading>
			<Text color="gray.600">{description}</Text>
		</VStack>
	);
}

// Component for use case cards
function UseCaseCard({
	title,
	description,
	imageSrc,
	fallbackSrc,
}: {
	title: string;
	description: string;
	imageSrc: string;
	fallbackSrc: string;
}) {
	return (
		<Box
			borderRadius="xl"
			overflow="hidden"
			boxShadow="md"
			_hover={{ boxShadow: "xl", transform: "translateY(-5px)" }}
			transition="all 0.3s"
			bg="white"
		>
			<Image
				src={imageSrc}
				alt={title}
				fallbackSrc={fallbackSrc}
				h="240px"
				w="full"
				objectFit="cover"
			/>
			<Box p={6}>
				<Heading size="md" mb={3}>
					{title}
				</Heading>
				<Text color="gray.600">{description}</Text>
			</Box>
		</Box>
	);
}
