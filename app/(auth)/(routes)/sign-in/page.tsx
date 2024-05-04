import {NextPage} from "next";
import {SignIn} from "@/components/auth/sign-in/sign-in";


interface ISignInProps {
}

const SignInPage: NextPage<ISignInProps> = () => {
  return (
    <SignIn/>
  );
};
export default SignInPage