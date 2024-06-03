export default function TopBar({ title }: { title: string }) {
  return (
    <>
      <h1 className="fixed left-1/2 top-0 -translate-x-1/2 z-10 w-full max-w-screen-md md:hidden text-lg p-2 bg-neutral-900 border-b border-b-orange-500 font-bold text-center">
        {title}
      </h1>
    </>
  );
}
