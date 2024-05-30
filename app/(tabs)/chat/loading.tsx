import Ping from "@/Components/ping";
import TopBar from "@/Components/top-bar";

export default function Loading() {
  return (
    <div className="h-[100vh] w-full flex flex-col gap-5 items-center justify-start">
      <TopBar title="채팅" />
      <Ping />
    </div>
  );
}
