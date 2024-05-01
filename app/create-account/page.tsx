import FormBtn from "@/Components/form-btn";
import FormInput from "@/Components/form-input";
import SocialLogin from "@/Components/social-login-section";
import Link from "next/link";

export default function page() {
  return (
    <div className="min-h-screen flex flex-col gap-10 py-16 px-10">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2 px-2">
          <h1 className="text-3xl">안녕하세요!</h1>
          <h2 className="text-lg">새로운 계정을 만들어요!</h2>
        </div>
        <form className="flex flex-col gap-4" action="">
          <FormInput type="text" placeholder="닉네임" errors={[]} />
          <FormInput type="email" placeholder="Email" errors={[]} />
          <FormInput type="password" placeholder="Password" errors={[]} />
          <FormInput
            type="password"
            placeholder="Confirm Password"
            errors={[]}
          />
          <FormBtn text="만들기" loading={false} />
        </form>
      </div>
      <div className="h-px bg-neutral-600 w-full"></div>
      <div className="flex flex-col gap-5">
        <SocialLogin />
      </div>
      <div className="flex gap-2 justify-center">
        <span>이미 계정이 있으신가요?</span>
        <Link className="hover:underline hover:text-orange-600" href={"/login"}>
          로그인
        </Link>
      </div>
    </div>
  );
}
