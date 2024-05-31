import TopBar from "@/Components/top-bar";

export default function Loading() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <TopBar title="포스트" />
      <div className="relative size-12 bg-neutral-400 animate-ping rounded-full">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-8 bg-neutral-400 rounded-full animate-none"></div>
      </div>
    </div>
  );
}
