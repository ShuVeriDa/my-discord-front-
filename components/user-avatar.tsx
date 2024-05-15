import {FC} from 'react';
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {cn} from "@/lib/utils";

interface IUserAvatarProps {
  src?: string
  className?: string
}

export const UserAvatar: FC<IUserAvatarProps> = ({src, className}) => {
  const url =`${process.env.NEXT_PUBLIC_API_URL}/${src}`

  console.log({url})
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
      <AvatarImage src={url} />
    </Avatar>
  );
};