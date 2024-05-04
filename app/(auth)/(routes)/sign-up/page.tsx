import {NextPage} from "next";
import {SignUp} from "@/components/auth/sign-up/sign-up";

interface ISignUpProps {
}

const SignUpPage: NextPage<ISignUpProps> = () => {
  return (
    <SignUp/>
  );
};
export default SignUpPage