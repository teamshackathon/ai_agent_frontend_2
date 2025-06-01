"use client";

import ChatWindow from "@/components/organisms/ChatWindow";
import Header from "@/components/organisms/Header";
import ProgressStepper from "@/components/organisms/ProgressStepper";
import Scene from "@/components/organisms/VR";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
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
      {/* ヘッダー */}
      <Box flexShrink={0}>
        <Header />
      </Box>

      {/* パネルグループ（左右分割リサイズ対応） */}
      <PanelGroup direction="horizontal" style={{ flex: 1 }}>
        {/* 左パネル（チャット＋VR） */}
        <Panel defaultSize={80} minSize={40} maxSize={85} ref={ref}>
          <Box h="100%" overflow="hidden" display="flex" flexDirection="column">
            <Tabs
              index={tabIndex}
              onChange={setTabIndex}
              isFitted
              flex="1"
              display="flex"
              flexDirection="column"
              variant="enclosed"
            >
              <TabList>
                <Tab>チャット</Tab>
                <Tab>VR内見</Tab>
              </TabList>

              <TabPanels flex="1" overflow="hidden">
                <TabPanel p={0} h="100%">
                  <ChatWindow />
                </TabPanel>
                <TabPanel p={0} h="100%">
                  <Scene />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Panel>

        {/* リサイズハンドル */}
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

        {/* 右パネル（ProgressStepper） */}
        <Panel defaultSize={20} minSize={15} maxSize={60}>
          <Box h="100%" p={4} overflowY="auto" borderLeft="1px solid #ddd">
            <ProgressStepper />
          </Box>
        </Panel>
      </PanelGroup>
    </Box>
  );
}
