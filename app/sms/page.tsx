import FormBtn from "@/Components/form-btn";
import FormInput from "@/Components/form-input";
import ToCreateAccount from "@/Components/link-createAccount";
import SocialLogin from "@/Components/social-login-section";
import Link from "next/link";

export default function page() {
  return (
    <div className="min-h-screen flex flex-col gap-10 py-16 px-10">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2 px-2">
          <h1 className="text-3xl">안녕하세요!</h1>
          <h2 className="text-lg">문자 로그인</h2>
        </div>
        <form className="flex flex-col gap-4" action="">
          <FormInput type="number" placeholder="전화번호" errors={[]} name="phoneNumber"/>
          <FormInput type="password" placeholder="인증번호" errors={[]} name="verifyNumber"/>
        </form>
        <FormBtn text="로그인" />
      </div>
      <div className="h-px bg-neutral-600 w-full"></div>
      <div className="flex flex-col gap-5">
        <SocialLogin />
      </div>
      <ToCreateAccount />
    </div>
  );
}
