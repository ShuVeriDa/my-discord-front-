"use client"

import {FC, ReactNode, useEffect} from 'react';
import {redirect} from "next/navigation";
import {useServerQuery} from "@/react-query/useServerQuery";
import {ServerSidebar} from "@/components/server/server-sidebar";
import {useProfileStore} from "@/hooks/use-profile-store";
import {getAccessToken} from "@/services/auth/auth.helper";

interface IServerIdLayoutComponentProps {
  children: ReactNode
  params: {serverId: string}
}

export const ServerIdLayoutComponent: FC<IServerIdLayoutComponentProps> = ({children, params}) => {
  const {user: profile} = useProfileStore()

  useEffect(() => {
    const token = getAccessToken()
    if (!token) redirect('/sign-in')
  }, [])

  const { fetchOneServer} = useServerQuery(params.serverId)
  const {data: server} = fetchOneServer

  if (!server) {
    return "Loading..."
  }

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={params.serverId}/>
      </div>
      <main className="h-full md:pl-60">
        {children}
      </main>
    </div>
  );
};