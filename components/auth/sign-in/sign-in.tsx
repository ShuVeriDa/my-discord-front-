"use client"

import {FC, MouseEvent, useEffect, useState} from 'react';
import {emailSchema, passwordSchema} from "@/lib/zod-validation";
import {AuthFooter} from "@/components/auth/auth-footer/auth-footer";
import Logo from "@/public/svg/logo.svg";
import {IError} from "@/services/auth/auth.type";
import {useAuthQuery} from "@/react-query/useAuthQuery";
import {errorCatch} from "@/api/api.helper";
import {Bounce, toast} from "react-toastify";
import {Field} from "@/components/auth/field/field";
import {useProfileStore} from "@/hooks/use-profile-store";

interface ISignInProps {
}

export const SignIn: FC<ISignInProps> = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState<IError>({name: false, email: false, password: false})
  const [isDisabled, setIsDisabled] = useState(true)

  const {setUser, user} = useProfileStore()
  const onChangeEmail = (email: string) => setEmail(email)
  const onChangePassword = (password: string) => setPassword(password)

  const {login} = useAuthQuery()
  const {mutateAsync: mutateLogin} = login

  useEffect(() => {
    if (isError.email || isError.name || isError.password  || email.length === 0 || password.length === 0) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [email.length, isError,  password.length]);

  const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      setIsLoading(true)

      const res = await mutateLogin({email, password})
      setUser(res.data)

      setIsLoading(false)
      setEmail('')
      setPassword('')
    } catch (error: any) {
      const message = errorCatch(error)
      toast(message, {
        type: "error", autoClose: 2000, position: "bottom-center", transition: Bounce, hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } finally {
      setIsLoading(false)
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
        <Field header={"E-mail address"} onChange={onChangeEmail} schema={emailSchema} setIsError={setIsError}
               typeError={'email'}/>
        <Field header={"Password"} onChange={onChangePassword} schema={passwordSchema} setIsError={setIsError}
               typeError={"password"}/>
      </div>

      <AuthFooter isDisabled={isDisabled || isLoading}
                  isLoading={isLoading}
                  onSubmit={onSubmit}
                  link={"/sign-up"}
                  buttonTitle={"Sign in"}
                  linkTitle={"Sign up"}
                  needAccount={"Need an account?"}
      />
    </form>
  );
};