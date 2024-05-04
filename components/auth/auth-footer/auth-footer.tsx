import {FC, MouseEvent} from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";

interface IAuthFooterProps {
  isDisabled: boolean
  onSubmit: (e: MouseEvent<HTMLButtonElement>) => void
  link: string
  buttonTitle: string
  linkTitle: string
  needAccount?: string
  isLoading: boolean
}

export const AuthFooter: FC<IAuthFooterProps> = (
  {isDisabled, linkTitle, buttonTitle, onSubmit, link, needAccount, isLoading}
) => {
  return (
    <div className={"flex flex-col gap-2 w-full"}>
      <Button type={"submit"}
              variant={"primary"}
              size={'lg'}
              onClick={(e) => onSubmit(e)}
              disabled={isDisabled}
      >
        {isLoading ? "Loading" : buttonTitle}
      </Button>
      <div className={"flex gap-1 text-[14px]  leading-4"}>
        {needAccount && <span className={"text-[#949ba4]"}>{needAccount}</span>}
        <Link href={link} className={"text-[#00a8fc]"}>{linkTitle}</Link>
      </div>
    </div>
  );
};