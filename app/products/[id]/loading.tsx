import { PhotoIcon } from "@heroicons/react/24/solid";

export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col">
        <div className="aspect-square border-2 border-neutral-700 border-dashed flex items-center justify-center">
          <PhotoIcon className="h-20 text-neutral-700" />
        </div>
        <div>
          <div className="border-b-2 border-neutral-700 flex items-center gap-3 px-3 py-2 mt-1">
            <div className="aspect-square h-10 bg-neutral-700 rounded-full" />
            <div className="h-3 bg-neutral-700 w-20 rounded-md" />
          </div>
          <div className="flex flex-col gap-2 py-5 px-5">
            <div className="h-3 bg-neutral-700 w-1/2 max-w-screen-sm rounded-md" />
            <div className="h-3 bg-neutral-700 w-20 rounded-md" />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0  left-0 w-full bg-black flex items-center justify-between py-5 px-5 rounded-t-3xl ">
        <div className="h-3 bg-neutral-700 w-16 rounded-md" />
        <div className="h-3 bg-neutral-700 w-16 rounded-md" />
      </div>
    </div>
  );
}
