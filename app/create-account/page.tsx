"use client";

import FormBtn from "@/Components/form-btn";
import FormInput from "@/Components/form-input";
import ToLogin from "@/Components/link-login";
import SocialLogin from "@/Components/social-login-section";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";
import { useEffect } from "react";

export default function CreateAccount() {
  const [state, action] = useFormState(createAccount, null);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div className="min-h-screen flex flex-col gap-10 py-16 px-10">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2 px-2">
          <h1 className="text-3xl">안녕하세요!</h1>
          <h2 className="text-lg">새로운 계정을 만들어요!</h2>
        </div>
        <form className="flex flex-col gap-4" action={action}>
          <FormInput
            type="text"
            name="userName"
            placeholder="닉네임"
            errors={state?.fieldErrors?.userName}
          />
          <FormInput
            type="email"
            name="email"
            placeholder="Email"
            errors={state?.fieldErrors?.email}
          />
          <FormInput
            type="password"
            name="password"
            placeholder="Password"
            errors={state?.fieldErrors?.password}
          />
          <FormInput
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            errors={state?.fieldErrors?.confirmPassword}
          />
          <FormBtn text="만들기" />
        </form>
      </div>
      <div className="h-px bg-neutral-600 w-full"></div>
      <div className="flex flex-col gap-5">
        <SocialLogin />
      </div>
      <ToLogin />
    </div>
  );
}
