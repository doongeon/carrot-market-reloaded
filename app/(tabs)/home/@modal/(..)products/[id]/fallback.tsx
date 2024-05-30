export const fallback = (
  <div className="w-full max-w-screen-sm aspect-[1/1.5] sm:aspect-[1/1.2] bg-black opacity-100 overflow-hidden flex flex-col gap-4 items-center overflow-y-scroll">
    <div className="relative w-full aspect-square bg-neutral-600 animate-pulse" />
    <div className="w-full flex flex-col gap-3 px-3 pb-5">
      <div className="w-full flex gap-3 justify-start px-2">
        <div className="relative aspect-square h-6 rounded-full overflow-hidden bg-neutral-600 animate-pulse" />
        <span className="h-8 w-10 bg-neutral-600 rounded-lg animate-pulse" />
      </div>
      <h1 className="h-8 w-5 bg-neutral-600 rounded-lg animate-pulse" />
      <div className="h-8 w-10 bg-neutral-600 rounded-lg animate-pulse" />
    </div>
  </div>
);
