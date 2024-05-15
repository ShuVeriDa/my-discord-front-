"use client"

import {FC} from 'react';
import {useProfileStore} from "@/hooks/use-profile-store";
import {redirect} from "next/navigation";
import {useServerQuery} from "@/react-query/useServerQuery";
import {useInviteCode} from "@/react-query/useInviteCode";

interface IInviteCodeProps {
  params: {
    inviteCode: string;
  };
}

export const InviteCode: FC<IInviteCodeProps> = ({params}) => {
  const {user: profile} = useProfileStore()

  if (!profile) {
    return redirect("/sign-in")
  }

  if (!params.inviteCode) {
    return redirect("/");
  }

  const {fetchOneServerByInviteCode} = useServerQuery(undefined, params.inviteCode)
  const {data : existingServer} = fetchOneServerByInviteCode

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  const {joinServer} = useInviteCode(params.inviteCode)
  const {data: server} = joinServer

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return null;
};