"use client";

import ChatWindow from "@/components/organisms/ChatWindow";
import Header from "@/components/organisms/Header";
import ProgressStepper from "@/components/organisms/ProgressStepper";
import Scene from "@/components/organisms/VR";
import {
	Box,
	Flex,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
	type ImperativePanelHandle,
	Panel,
	PanelGroup,
	PanelResizeHandle,
} from "react-resizable-panels";

export default function Chat() {
	const ref = useRef<ImperativePanelHandle>(null);
	const [tabIndex, setTabIndex] = useState(0);

	return (
		<Box h="100vh" display="flex" flexDirection="column" overflow="hidden">
			<Box flexShrink={0}>
				<Header />
			</Box>

			{/* 👇 flex + minH=0 で PanelGroup に正しい高さ伝播 */}
			<Flex flex="1" minH={0}>
				<PanelGroup
					direction="horizontal"
					style={{ width: "100%", height: "100%" }}
				>
					<Panel defaultSize={80} minSize={40} maxSize={85} ref={ref}>
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
										<ChatWindow />
									</TabPanel>
									<TabPanel p={0} h="100%" overflow="hidden">
										<Scene />
									</TabPanel>
								</TabPanels>
							</Tabs>
						</Box>
					</Panel>

					<PanelResizeHandle>
						<Box width="6px" height="100%" bg="blue.500" />
					</PanelResizeHandle>

					<Panel defaultSize={20} minSize={15} maxSize={60}>
						<Box h="100%" p={4} overflowY="auto" borderLeft="1px solid #ddd">
							<ProgressStepper />
						</Box>
					</Panel>
				</PanelGroup>
			</Flex>
		</Box>
	);
}
