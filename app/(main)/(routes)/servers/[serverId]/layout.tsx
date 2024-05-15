import {NextPage} from "next";
import {ReactNode} from "react";
import {ServerIdLayoutComponent} from "@/components/pages/server-id-layout";


interface IServerIdLayoutProps {
  children: ReactNode
  params: { serverId: string }
}

const ServerIdLayout: NextPage<IServerIdLayoutProps> =  ({children, params}) => {
  return <ServerIdLayoutComponent params={params}>
    {children}
  </ServerIdLayoutComponent>
};
export default ServerIdLayout