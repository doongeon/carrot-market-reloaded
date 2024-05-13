import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-between p-6">
      <div className="my-auto flex flex-col items-center gap-2">
        <span className="text-9xl">🥕</span>
        <h1 className="text-4xl">당근</h1>
        <h2 className="text-2xl">안녕하세요 당근마켓입니다.</h2>
      </div>
      <div className="w-full flex flex-col gap-3 items-center">
        <Link className="primary-btn h-10" href={"/create-account"}>
          시작하기
        </Link>
        <div className="flex gap-2">
          <span>이미 계정이 있으신가요?</span>
          <Link
            className="hover:underline hover:text-orange-600"
            href={"/login"}
          >
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
