import {FC} from 'react';
import {Input} from "@/components/ui/input";

interface IFieldProps {
  header: string
  onChange: (text: string) => void;
  fieldErrors: string[] | undefined
}

export const Field: FC<IFieldProps> = ({fieldErrors, onChange, header}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <label className={"w-full flex gap-1 text-[#b5bac1] text-[12px] font-bold"}>
        <span>{header}</span>
        <span className="text-[#f23f42]">*</span>
      </label>
      <Input onChange={(e) => onChange(e.currentTarget.value)}/>
      {fieldErrors && fieldErrors ?
        <p className={"text-[14px] text-[#f23f42]"}>{fieldErrors}</p> : null}
    </div>
  );
};