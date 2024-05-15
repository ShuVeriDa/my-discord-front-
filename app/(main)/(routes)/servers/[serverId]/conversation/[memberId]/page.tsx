import {NextPage} from "next";
import {MemberId} from "@/components/pages/member-id";

interface IMemberIdPageProps {
  params: {
    memberId: string
    serverId: string
  },
  searchParams: {
    video?: boolean
  }
}

const MemberIdPage: NextPage<IMemberIdPageProps> =  ({ params, searchParams }) => {
  console.log("MemberIdPage")
  return <MemberId searchParams={searchParams} params={params}/>
};
export default MemberIdPage;