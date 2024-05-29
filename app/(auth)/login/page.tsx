"use client";

import FormBtn from "@/Components/form-btn";
import FormInput from "@/Components/form-input";
import SocialLogin from "@/Components/social-login-section";
import { useFormState } from "react-dom";
import { handleLoginForm } from "./actions";
import ToCreateAccount from "@/Components/link-createAccount";

export default function Login() {
  const [loginFormState, action] = useFormState(handleLoginForm, null);

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
              errors={loginFormState?.fieldErrors?.email}
              name="email"
            />
            <FormInput
              type="password"
              placeholder="Password"
              errors={loginFormState?.fieldErrors?.password}
              minLength={6}
              name="password"
            />
          </div>
          <FormBtn text="로그인" />
        </form>
      </div>
      <div className="h-px bg-neutral-600 w-full"></div>
      <div className="flex flex-col gap-5">
        <SocialLogin />
      </div>
      <ToCreateAccount />
    </div>
  );
}
