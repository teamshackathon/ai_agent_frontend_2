"use client";

import { useFirebaseAuth } from "@/lib/hook/useFirebaseAuth";
import {
	Box,
	Button,
	Center,
	Container,
	Divider,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Icon,
	Input,
	InputGroup,
	InputRightElement,
	Spinner,
	Text,
	VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState<{
		email?: string;
		password?: string;
		general?: string;
	}>({});

	const validateForm = () => {
		const newErrors: {
			email?: string;
			password?: string;
		} = {};

		if (!email) {
			newErrors.email = "メールアドレスを入力してください";
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = "有効なメールアドレスを入力してください";
		}

		if (!password) {
			newErrors.password = "パスワードを入力してください";
		} else if (password.length < 8) {
			newErrors.password = "パスワードは8文字以上である必要があります";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

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
		<Container maxW="md" py={12}>
			<VStack spacing={8} align="stretch">
				<Box textAlign="center">
					<Heading size="xl" mb={2}>
						ログイン
					</Heading>
					<Text color="gray.600">Furniaizer で家具配置のイメージを作成</Text>
				</Box>

				<Box as="form" p={8} borderRadius="lg" boxShadow="lg" bg="white">
					{errors.general && (
						<Box p={3} mb={6} bg="red.50" color="red.500" borderRadius="md">
							{errors.general}
						</Box>
					)}

					<VStack spacing={4}>
						<FormControl isInvalid={!!errors.email}>
							<FormLabel>メールアドレス</FormLabel>
							<Input
								type="email"
								placeholder="your@email.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<FormErrorMessage>{errors.email}</FormErrorMessage>
						</FormControl>

						<FormControl isInvalid={!!errors.password}>
							<FormLabel>パスワード</FormLabel>
							<InputGroup>
								<Input
									type={showPassword ? "text" : "password"}
									placeholder="••••••••"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<InputRightElement width="3rem">
									<Button
										h="1.5rem"
										size="sm"
										onClick={togglePasswordVisibility}
										variant="ghost"
									>
										<Icon as={showPassword ? FaEyeSlash : FaEye} />
									</Button>
								</InputRightElement>
							</InputGroup>
							<FormErrorMessage>{errors.password}</FormErrorMessage>
						</FormControl>

						<Box alignSelf="flex-end">
							<Link href="/forgot-password">
								<Text color="blue.500" fontSize="sm">
									パスワードをお忘れですか？
								</Text>
							</Link>
						</Box>

						<Button
							colorScheme="blue"
							width="full"
							mt={4}
							type="submit"
							isLoading={isLoading}
							loadingText="ログイン中..."
						>
							ログイン
						</Button>
					</VStack>

					<Flex align="center" my={6}>
						<Divider flex="1" />
						<Text px={3} color="gray.500" fontSize="sm">
							または
						</Text>
						<Divider flex="1" />
					</Flex>

					<Button
						width="full"
						leftIcon={<Icon as={FaGithub} />}
						isLoading={isLoading}
						onClick={loginWithGithub}
						variant="outline"
					>
						GitHubでログイン
					</Button>
				</Box>

				<Box textAlign="center">
					<Text>
						アカウントをお持ちでない場合は{" "}
						<Link href="/signup">
							<Box as="span" color="blue.500">
								新規登録
							</Box>
						</Link>
					</Text>
				</Box>
			</VStack>
		</Container>
	);
}
