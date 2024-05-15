import {instance} from "@/api/axios";
import {IServer} from "@/services/servers/servers.type";

export const inviteCodeService = {
  async joinServer(inviteCode: string) {
    const {data} = await instance.patch<IServer>(`/invites`, {inviteCode})

    return data
  }
}