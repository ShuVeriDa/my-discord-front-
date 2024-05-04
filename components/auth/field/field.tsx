import {FC, useState} from 'react';
import {Input} from "@/components/ui/input";
import {ZodString} from "zod";
import {IError} from "@/services/auth/auth.type";

interface IFieldProps {
  header: string
  onChange: (text: string) => void;
  schema: ZodString
  setIsError: (isError: IError) => void
  typeError: "name" | "email" | "password"
}

export const Field: FC<IFieldProps> = (
  {onChange, header, schema, setIsError, typeError}
) => {
  const [error, setError] = useState<string | null>('')

  const onChangeHandler = (text: string) => {
    const parsedInput = schema.safeParse(text)
    if (!parsedInput.success) {
      const errorMessage = parsedInput.error.errors.map((issue) => issue.message).join(", ")
      setError(errorMessage)
      setIsError({[typeError]: true})
    }
    if (parsedInput.success) {
      setError(null)
      setIsError({[typeError]: false})
    }
    onChange(text)
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <label className={"w-full flex gap-1 text-[#b5bac1] text-[12px] font-bold"}>
        <span>{header}</span>
        <span className="text-[#f23f42]">*</span>
      </label>
      <Input onChange={(e) => onChangeHandler(e.currentTarget.value)}/>
      {error ?
        <p className={"text-[14px] text-[#f23f42]"}>{error}</p> : null}
    </div>
  );
};