import {NextPage} from "next";
import {ServerId} from "@/components/pages/server-id";

interface IServerIdPageProps {
  params: {
    serverId: string
  }
}

const ServerIdPage: NextPage<IServerIdPageProps> =  ({params}) => {
  return <ServerId params={params} />
};
export default ServerIdPage