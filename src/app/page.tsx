import Header from "@/app/header";
import ChatWindow from "@/components/organisms/ChatWindow";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Header />
      <ChatWindow />
    </div>
  );
}
