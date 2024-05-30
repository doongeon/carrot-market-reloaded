import Ping from "@/Components/ping";
import TopBar from "@/Components/top-bar";

export default function Loading() {
  return (
    <div className="flex flex-col gap-5 mb-14">
      <TopBar title="마이페이지" />
      <Ping />
    </div>
  );
}
