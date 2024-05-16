"use client"

import {FC} from 'react';
import {useProfileStore} from "@/hooks/use-profile-store";
import {redirect} from "next/navigation";
import {useMemberQuery} from "@/react-query/useMemberQuery";
import {useConversationQuery} from "@/react-query/useConversationQuery";
import {ChatHeader} from "@/components/chat/chat-header";
import {MediaRoom} from "@/components/media-room";
import {ChatMessages} from "@/components/chat/chat-messages";
import {ChatInput} from "@/components/chat/chat-input";

interface IMemberIdProps {
  params: {
    memberId: string
    serverId: string
  },
  searchParams: {
    video?: boolean
  }
}

export const MemberId: FC<IMemberIdProps> = ({params, searchParams}) => {
  const {user: profile} = useProfileStore()

  if (!profile) {
    return redirect("/sign-in")
  }

  const {fetchCurrentMember} = useMemberQuery(params.serverId)
  const {data: currentMember} = fetchCurrentMember

  if (!currentMember) {
    return redirect("/");
  }

  const {fetchOrCreateConversation} = useConversationQuery(currentMember.id, params.memberId)
  const {data: conversation} = fetchOrCreateConversation

  if (!conversation) {
    return redirect(`/servers/${params.serverId}`);
  }

  const { memberTwo, memberOne } = conversation;

  const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader serverId={params.serverId}
                  name={otherMember.profile.name}
                  type={"conversation"}
                  imageUrl={otherMember.profile.imageUrl}
      />
      {searchParams.video && (
        <MediaRoom chatId={conversation.id}
                   video={true}
                   audio={true}
        />
      )}
      {!searchParams.video && (
        <>
          <ChatMessages member={currentMember}
                        name={otherMember.profile.name}
                        chatId={conversation.id}
                        type={"conversation"}
                        apiUrl={"/api/direct-messages"}
                        paramKey={"conversationId"}
                        paramValue={conversation.id}
                        socketUrl={"/api/socket/direct-messages"}
                        socketQuery={{
                          conversationId: conversation.id,
                        }}
          />
          <ChatInput apiUrl={"/api/socket/direct-messages"}
                     query={{
                       conversationId: conversation.id,
                     }}
                     name={otherMember.profile.name}
                     type={"conversation"}
          />
        </>
      )}
    </div>
  );
};