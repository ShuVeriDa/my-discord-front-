"use client"

import {FC, useEffect} from 'react';
import {useProfileStore} from "@/hooks/use-profile-store";
import {redirect} from "next/navigation";
import {useChannelQuery} from "@/react-query/useChannelQuery";
import {useMemberQuery} from "@/react-query/useMemberQuery";
import {ChatHeader} from "@/components/chat/chat-header";
import {ChannelType} from "@/services/channel/channel.type";
import {ChatMessages} from "@/components/chat/chat-messages";
import {ChatInput} from "@/components/chat/chat-input";
import {MediaRoom} from "@/components/media-room";

interface IChannelIdProps {
  params: {
    serverId: string
    channelId: string
  }
}

export const ChannelId: FC<IChannelIdProps> = ({params}) => {
  const { user: profile} =  useProfileStore()

  const {fetchChannelById} = useChannelQuery(undefined, params.channelId)
  const {data: channel, mutate, isPending:isPendingChannel, } = fetchChannelById

  useEffect(() => {
    mutate(params.serverId)
  }, [mutate, params.serverId]);

  const {fetchCurrentMember} = useMemberQuery(params.serverId)
  const {data: member,  isPending:isPendingMember} = fetchCurrentMember

  if (!profile) {
    return redirect("/sign-in")
  }

  if (!member || !channel) {
    return "Loading ..."
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader name={channel.name}
                  serverId={channel.serverId}
                  type={"channel"}
      />
      {channel.type === ChannelType.TEXT && (
        <>
          <ChatMessages member={member}
                        name={channel.name}
                        chatId={channel.id}
                        type={"channel"}
                        apiUrl={"/api/messages"}
                        socketUrl={"/api/socket/messages"}
                        socketQuery={{
                          channelId: channel.id,
                          serverId: channel.serverId
                        }}
                        paramKey={"channelId"}
                        paramValue={channel.id}
          />
          <ChatInput name={channel.name}
                     type={"channel"}
                     apiUrl={"/api/socket/messages"}
                     query={{
                       channelId: channel.id,
                       serverId: channel.serverId
                     }}
          />
        </>
      )}
      {channel.type === ChannelType.AUDIO && (
        <MediaRoom chatId={channel.id}
                   video={false}
                   audio={true}
        />
      )}
      {channel.type === ChannelType.VIDEO && (
        <MediaRoom chatId={channel.id}
                   video={true}
                   audio={true}
        />
      )}

    </div>
  );
};