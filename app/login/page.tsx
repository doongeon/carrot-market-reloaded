"use client";

import FormBtn from "@/Components/form-btn";
import FormInput from "@/Components/form-input";
import SocialLogin from "@/Components/social-login-section";
import Link from "next/link";
import { useFormState } from "react-dom";
import { handleForm } from "./action";

export default function page() {
  const [state, action] = useFormState(handleForm, null);

  return (
    <div className="min-h-screen flex flex-col gap-10 py-16 px-10">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2 px-2">
          <h1 className="text-3xl">안녕하세요!</h1>
          <h2 className="text-lg">이메일 로그인</h2>
        </div>
        <form className="flex flex-col gap-10" action={action}>
          <div className="flex flex-col gap-4">
            <FormInput
              type="email"
              placeholder="Email"
              errors={[]}
              name="email"
            />
            <FormInput
              type="password"
              placeholder="Password"
              errors={state?.errors ?? []}
              name="password"
            />
          </div>
          <FormBtn text="만들기" />
        </form>
      </div>
      <div className="h-px bg-neutral-600 w-full"></div>
      <div className="flex flex-col gap-5">
        <SocialLogin />
      </div>
      <div className="flex gap-2 justify-center">
        <span>계정이 없으신가요?</span>
        <Link
          className="hover:underline hover:text-orange-600"
          href={"/create-account"}
        >
          시작하기
        </Link>
      </div>
    </div>
  );
}
