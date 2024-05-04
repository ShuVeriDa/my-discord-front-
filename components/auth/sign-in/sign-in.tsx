"use client"

import {FC, MouseEvent, useState} from 'react';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {signInInputSchema} from "@/lib/zod-validation";
import {z} from "zod";
import {AuthFooter} from "@/components/auth/auth-footer/auth-footer";
import Logo from "@/public/svg/logo.svg";

interface ISignInProps {
}

export const SignIn: FC<ISignInProps> = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<z.inferFlattenedErrors<typeof signInInputSchema>>()

  const onChangeEmail = (email: string) => setEmail(email)
  const onChangePassword = (password: string) => setPassword(password)

  const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const parsedInput = signInInputSchema.safeParse({email, password})
      if (!parsedInput.success) {
        setErrors(parsedInput.error.flatten())
      }
    } catch (error) {

    }
  }

  return (
    <form className="w-full max-w-[480px] max-m:h-full flex flex-col gap-5 p-8 bg-[#313338] rounded-sm">
      <div className="hidden max-m:flex justify-center w-full">
        <Logo/>
      </div>
      <div className={"flex flex-col items-center gap-2"}>
        <h1 className={"text-[#f2f3f5] text-[24px] font-semibold"}>Welcome back!</h1>
        <h2 className="text-[#b5bac1] text-[16px]">We are so happy to see you again!</h2>
      </div>

      <div className={"w-full flex flex-col gap-5"}>
        <div className="w-full flex flex-col gap-2">
          <label className={"w-full flex gap-1 text-[#b5bac1] text-[12px] font-bold"}>
            <span>E-mail address</span>
            <span className="text-[#f23f42]">*</span>
          </label>
          <Input onChange={(e) => onChangeEmail(e.currentTarget.value)}/>
          {errors?.fieldErrors.email ?
            <p className={"text-[14px] text-[#f23f42]"}>{errors.fieldErrors['email']}</p> : null}
        </div>

        <div className="w-full flex flex-col gap-2">
          <label className={"w-full flex gap-1 text-[#b5bac1] text-[12px] font-bold"}>
            <span>Password</span>
            <span className="text-[#f23f42]">*</span>
          </label>
          <Input onChange={(e) => onChangePassword(e.currentTarget.value)}/>
          {errors?.fieldErrors.password ?
            <p className={"text-[14px] text-[#f23f42]"}>{errors.fieldErrors['password']}</p> : null}
        </div>
      </div>

      <AuthFooter isDisabled={!!errors?.fieldErrors}
                  onSubmit={onSubmit}
                  link={"/sign-up"}
                  buttonTitle={"Sign in"}
                  linkTitle={"Sign up"}
                  needAccount={"Need an account?"}
      />
    </form>
  );
};