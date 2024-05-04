"use client"

import {FC, MouseEvent, useEffect, useState} from 'react';
import {emailSchema, nameSchema, passwordSchema} from "@/lib/zod-validation";
import {Field} from "@/components/auth/field/field";
import {AuthFooter} from "@/components/auth/auth-footer/auth-footer";
import Logo from "@/public/svg/logo.svg"
import {useAuthQuery} from "@/react-query/useAuthQuery";
import {IError} from "@/services/auth/auth.type";
import {Bounce, toast} from "react-toastify";
import {errorCatch} from "@/api/api.helper";

interface ISignUpProps {
}

export const SignUp: FC<ISignUpProps> = () => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState<IError>({name: false, email: false, password: false})
  const [isDisabled, setIsDisabled] = useState(true)

  const onChangeEmail = (email: string) => setEmail(email)
  const onChangeName = (name: string) => setName(name)
  const onChangePassword = (password: string) => setPassword(password)

  const {register} = useAuthQuery()
  const {mutateAsync: mutateRegister} = register

  useEffect(() => {
    if (isError.email || isError.name || isError.password || name.length === 0 || email.length === 0 || password.length === 0) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [email.length, isError, name.length, password.length]);

  const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      setIsLoading(true)

      await mutateRegister({email, name, password})

      setIsLoading(false)
      setName('')
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
      <h1 className={"text-[#f2f3f5] text-[24px] font-semibold text-center"}>Create an account</h1>

      <div className={"w-full flex flex-col gap-5"}>
        <Field header={"E-mail address"} onChange={onChangeEmail} schema={emailSchema} setIsError={setIsError}
               typeError={'email'}/>
        <Field header={"Username"} onChange={onChangeName} schema={nameSchema} setIsError={setIsError}
               typeError={'name'}/>
        <Field header={"Password"} onChange={onChangePassword} schema={passwordSchema} setIsError={setIsError}
               typeError={"password"}/>
      </div>

      <AuthFooter isDisabled={isDisabled || isLoading}
                  isLoading={isLoading}
                  onSubmit={onSubmit}
                  link={"/sign-in"}
                  buttonTitle={"Sign up"}
                  linkTitle={"Already registered ?"}
      />
    </form>
  )
};