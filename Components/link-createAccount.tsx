import Link from "next/link";

export default function ToCreateAccount() {
  return (
    <div className="flex gap-2 justify-center">
      <span>계정이 없으신가요?</span>
      <Link
        className="hover:underline hover:text-orange-600"
        href={"/create-account"}
      >
        시작하기
      </Link>
    </div>
  );
}
