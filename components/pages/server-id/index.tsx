"use client"

import {FC} from 'react';
import {useProfileStore} from "@/hooks/use-profile-store";
import {redirect} from "next/navigation";
import {useServerQuery} from "@/react-query/useServerQuery";

interface IServerIdProps {
  params: {
    serverId: string
  }
}

export const ServerId: FC<IServerIdProps> = ({params}) => {
  const {fetchOneServer} = useServerQuery(params.serverId)
  const {data: server, isSuccess} = fetchOneServer
  console.log({server}, "serverID")

  const {user} = useProfileStore()

  if (!user) {
    return redirect("/sign-in")
  }

  const initialChannel = server?.channels ? server.channels[0] : null

  if (initialChannel?.name !== "general") {
    return null;
  }

  return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`)
};