import Header from "@/app/header";
import ChatWindow from "@/components/organisms/ChatWindow";
import UserGuardPage from "@/lib/guard/UserGuardPage";
import { Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box h="100vh" display="flex" flexDirection="column">
      <Header />
      <UserGuardPage>
        <Box flex="1" overflow="hidden">
          <ChatWindow />
        </Box>
      </UserGuardPage>
    </Box>
  );
}
