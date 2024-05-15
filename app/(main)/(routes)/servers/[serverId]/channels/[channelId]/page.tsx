import {NextPage} from "next";
import {ChannelId} from "@/components/pages/channel-id";

interface IChannelIdPageProps {
  params: {
    serverId: string
    channelId: string
  }
}

const ChannelIdPage: NextPage<IChannelIdPageProps> =  ({params}) => {
  return <ChannelId params={params} />
};
export default ChannelIdPage