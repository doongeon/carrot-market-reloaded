import Link from "next/link";

export default function ToLogin() {
  return (
    <div className="flex gap-2 justify-center">
      <span>이미 계정이 있으신가요?</span>
      <Link className="hover:underline hover:text-orange-600" href={"/login"}>
        로그인
      </Link>
    </div>
  );
}
