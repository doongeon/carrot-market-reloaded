import TapBar from "@/Components/tap-bar";

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <TapBar />
    </>
  );
}
