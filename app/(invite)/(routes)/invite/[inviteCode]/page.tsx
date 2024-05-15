import {NextPage} from "next";
import {InviteCode} from "@/components/pages/invite-code";

interface IInviteCodePageProps {
  params: {
    inviteCode: string;
  };
}

const InviteCodePage: NextPage<IInviteCodePageProps> =  ({params}) => {
  return <InviteCode params={params} />
};
export default InviteCodePage