export default function TopBar({ title }: { title: string }) {
  return (
    <h1 className="text-lg p-2 font-bold border-b-2 border-neutral-600 text-center">
      {title}
    </h1>
  );
}
