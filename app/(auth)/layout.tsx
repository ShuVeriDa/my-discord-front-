import {NextPage} from "next";
import {ReactNode} from "react";

interface IAuthLayoutProps {
  children: ReactNode
}

const AuthLayout: NextPage<IAuthLayoutProps> = ({children}) => {
  return (
    <div className={"flex flex-col justify-center items-center h-full relative bg-[url('/background.jpg')] bg-cover"}>
      {children}
    </div>
  );
};
export default AuthLayout