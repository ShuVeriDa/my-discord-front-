"use client"

import {FC, MouseEvent, useState} from 'react';
import {z} from "zod";
import {signUpInputSchema} from "@/lib/zod-validation";
import {Field} from "@/components/auth/field/field";
import {AuthFooter} from "@/components/auth/auth-footer/auth-footer";
import Image from "next/image";
import Logo from "@/public/svg/logo.svg"

interface ISignUpProps {
}

export const SignUp: FC<ISignUpProps> = () => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<z.inferFlattenedErrors<typeof signUpInputSchema>>()

  const onChangeEmail = (email: string) => setEmail(email)
  const onChangeName = (name: string) => setName(name)
  const onChangePassword = (password: string) => setPassword(password)

  const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const parsedInput = signUpInputSchema.safeParse({email, password, name})
      if (!parsedInput.success) {
        setErrors(parsedInput.error.flatten())
      }
    } catch (error) {

    }
  }

  return (
    <form className="w-full max-w-[480px] max-m:h-full flex flex-col gap-5 p-8 bg-[#313338] rounded-sm">
      <div className="hidden max-m:flex justify-center w-full">
          <Logo />
      </div>
      <h1 className={"text-[#f2f3f5] text-[24px] font-semibold text-center"}>Create an account</h1>

      <div className={"w-full flex flex-col gap-5"}>
        <Field header={"E-mail address"} onChange={onChangeEmail} fieldErrors={errors?.fieldErrors.email}/>
        <Field header={"Username"} onChange={onChangeName} fieldErrors={errors?.fieldErrors.name}/>
        <Field header={"Password"} onChange={onChangePassword} fieldErrors={errors?.fieldErrors.password}/>
      </div>

      <AuthFooter isDisabled={!!errors?.fieldErrors}
                  onSubmit={onSubmit}
                  link={"/sign-in"}
                  buttonTitle={"Sign up"}
                  linkTitle={"Already registered ?"}
      />
    </form>
  )
};