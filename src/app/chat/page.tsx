"use client";

import ChatWindow from "@/components/organisms/ChatWindow";
import Header from "@/components/organisms/Header";
import ProgressStepper from "@/components/organisms/ProgressStepper";
import Scene from "@/components/organisms/VR";
import UserGuardPage from "@/lib/guard/UserGuardPage";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
	type ImperativePanelHandle,
	Panel,
	PanelGroup,
	PanelResizeHandle,
} from "react-resizable-panels";

export default function Chat() {
	const ref = useRef<ImperativePanelHandle>(null);

	// ローカルステートでサイズを追跡する方法
	const [leftPanelSize, setLeftPanelSize] = useState<number>(70);
	const [rightPanelSize, setRightPanelSize] = useState<number>(30);

	// パネルのリサイズイベントを処理するハンドラー
	const handleLeftPanelResize = (size: number) => {
		setLeftPanelSize(size);
	};

	const handleRightPanelResize = (size: number) => {
		setRightPanelSize(size);
	};

	return (
		<Box maxH="100%">
			<Header />
			<Box h={"100%"}>
				{/* <UserGuardPage> */}
				<PanelGroup direction="horizontal" style={{ height: "100%" }}>
					<Panel
						ref={ref}
						defaultSize={70}
						minSize={50}
						maxSize={80}
						onResize={handleLeftPanelResize}
					>
						<Box m={5} overflow="auto">
							<Tabs>
								<TabList>
									<Tab>チャット</Tab>
									<Tab>VR内見</Tab>
								</TabList>

								<TabPanels>
									<TabPanel>
										<ChatWindow />
									</TabPanel>
									<TabPanel>
										<Scene />
									</TabPanel>
								</TabPanels>
							</Tabs>
						</Box>
					</Panel>

					<PanelResizeHandle>
						<Box
							width="6px"
							height="100%"
							bg="blue.500"
							cursor="col-resize"
							_hover={{ bg: "blue.600" }}
							_active={{ bg: "blue.700" }}
						/>
					</PanelResizeHandle>

					<Panel
						defaultSize={30}
						minSize={20}
						maxSize={50}
						onResize={handleRightPanelResize}
					>
						<Box p={5} h="100%" overflow="auto">
							<ProgressStepper />
						</Box>
					</Panel>
				</PanelGroup>
				{/* </UserGuardPage> */}
			</Box>
		</Box>
	);
}
