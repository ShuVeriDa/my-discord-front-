"use client"

import {FC, useEffect} from 'react';
import {redirect} from "next/navigation";
import {useServerQuery} from "@/react-query/useServerQuery";
import {useInviteCode} from "@/react-query/useInviteCode";

interface IInviteCodeProps {
  params: {
    inviteCode: string;
  };
}

export const InviteCode: FC<IInviteCodeProps> = ({params}) => {
  // const {user: profile} = useProfileStore()
  if (!params.inviteCode) {
    redirect("/");
  }

  const {fetchOneServerByInviteCode} = useServerQuery(undefined, params.inviteCode)
  const {data: existingServer} = fetchOneServerByInviteCode
  const {joinServer} = useInviteCode()
  const {mutateAsync} = joinServer

  useEffect(() => {
    if (existingServer) {
      return redirect(`/servers/${existingServer.id}`);
    }

    if (!existingServer) {
      (async () => {
        const server = await mutateAsync(params.inviteCode)
        return redirect(`/servers/${server?.id}`);
      })()
    }
  }, [existingServer, mutateAsync, params.inviteCode]);


  return null;
};