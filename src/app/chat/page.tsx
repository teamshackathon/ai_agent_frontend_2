"use client";

import ChatWindow from "@/components/organisms/ChatWindow";
import FurnitureWindow from "@/components/organisms/FurnitureWindow";
import Header from "@/components/organisms/Header";
import MovingWindow from "@/components/organisms/MovingWindow";
import ProgressStepper from "@/components/organisms/ProgressStepper";
import PropertyWindow from "@/components/organisms/PropertyWindow";
import Scene from "@/components/organisms/VR";
import { stepAtom } from "@/lib/atom/StepAtom";
import {
	Box,
	Flex,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import {
	type ImperativePanelHandle,
	Panel,
	PanelGroup,
	PanelResizeHandle,
} from "react-resizable-panels";

export default function Chat() {
	const ref = useRef<ImperativePanelHandle>(null);
	const [tabIndex, setTabIndex] = useState(0);

	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	useEffect(() => {
		const handleDrop = (e: DragEvent) => {
			e.preventDefault();
			const file = e.dataTransfer?.files?.[0];
			if (file?.type.startsWith("image/")) {
				setImageFile(file);
				setImagePreview(URL.createObjectURL(file));
			}
		};

		const handlePaste = (e: ClipboardEvent) => {
			const items = e.clipboardData?.items;
			if (!items) return;
			for (const item of items) {
				if (item.kind === "file" && item.type.startsWith("image/")) {
					const file = item.getAsFile();
					if (file) {
						setImageFile(file);
						setImagePreview(URL.createObjectURL(file));
						break;
					}
				}
			}
		};

		const prevent = (e: Event) => e.preventDefault();

		window.addEventListener("drop", handleDrop);
		window.addEventListener("dragover", prevent);
		window.addEventListener("paste", handlePaste);

		return () => {
			window.removeEventListener("drop", handleDrop);
			window.removeEventListener("dragover", prevent);
			window.removeEventListener("paste", handlePaste);
		};
	}, []);
	const [step, setStep] = useAtom(stepAtom);
	const handleNext = () => {
		setStep((prev) => (prev + 1) % 3); // 0→1→2→0 循環
	};

	const renderLeftPanel = () => {
		switch (step) {
			case 0:
				return <PropertyWindow onNext={handleNext} />;
			case 1:
				return <FurnitureWindow onNext={handleNext} />;
			case 2:
				return <MovingWindow onNext={handleNext} />;
			default:
				return null;
		}
	};

	return (
		<Box h="100vh" display="flex" flexDirection="column" overflow="hidden">
			<Box flexShrink={0}>
				<Header />
			</Box>

			<Flex flex="1" minH={0}>
				<PanelGroup
					direction="horizontal"
					style={{ width: "100%", height: "100%" }}
				>
					<Panel defaultSize={25} minSize={15} maxSize={40}>
						<Box p={4}>{renderLeftPanel()}</Box>
					</Panel>

					<PanelResizeHandle>
						<Box width="4px" height="100%" bg="blue.500" />
					</PanelResizeHandle>

					<Panel defaultSize={60} minSize={30} maxSize={70} ref={ref}>
						<Box
							h="100%"
							overflow="hidden"
							display="flex"
							flexDirection="column"
						>
							<Tabs
								index={tabIndex}
								onChange={setTabIndex}
								isFitted
								flex="1"
								display="flex"
								flexDirection="column"
								overflow="hidden"
								variant="enclosed"
							>
								<TabList>
									<Tab>チャット</Tab>
									<Tab>VR内見</Tab>
								</TabList>

								<TabPanels flex="1" h="100%" minH={0} overflow="hidden">
									<TabPanel p={0} h="100%" overflow="hidden">
										<ChatWindow
											imageFile={imageFile}
											imagePreview={imagePreview}
											onImageSelect={(file, previewUrl) => {
												setImageFile(file);
												setImagePreview(previewUrl);
											}}
											onImageClear={() => {
												setImageFile(null);
												setImagePreview(null);
											}}
										/>
									</TabPanel>
									<TabPanel p={0} h="100%" overflow="hidden">
										<Scene />
									</TabPanel>
								</TabPanels>
							</Tabs>
						</Box>
					</Panel>

					<PanelResizeHandle>
						<Box width="4px" height="100%" bg="blue.500" />
					</PanelResizeHandle>

					<Panel defaultSize={15} minSize={15} maxSize={30}>
						<Box h="100%" p={4} overflowY="auto" borderLeft="1px solid #ddd">
							<ProgressStepper />
						</Box>
					</Panel>
				</PanelGroup>
			</Flex>
		</Box>
	);
}
