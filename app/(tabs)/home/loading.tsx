export default function Loading() {
  return (
    <div className="mt-5">
      {[...Array(10)].map((_, index) => {
        return (
          <div key={index} className="w-full flex items-center animate-pulse">
            <div className="flex items-center gap-5 py-3 px-5">
              <div className="size-20 bg-neutral-600 rounded-md" />
              <div className="*:bg-neutral-600 *:h-3 *:rounded-md flex flex-col gap-2">
                <div className="w-28" />
                <div className="w-16" />
                <div className="w-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
