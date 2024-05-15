import {instance} from "@/api/axios";
import {IServer, IServerWithMembersWithProfiles} from "@/services/servers/servers.type";

export const serversService = {
  async getAllServers() {
    const res = await instance.get<IServer[]>("/servers")

    return res.data
  },

  async getOneServerById(serverId: string) {
    const {data} = await instance.get<IServerWithMembersWithProfiles>(`/servers/${serverId}`)

    return data
  },

  async getOneServerByInviteCode(inviteCode: string) {
    const {data} = await instance.get<IServer>(`/servers/invite-code/${inviteCode}`)

    return data
  },

  async getOneServerByProfileId() {
    const {data} = await instance.get<IServerWithMembersWithProfiles>(`/servers/profile`)

    return data
  },

  async createServer(data: { name: string, imageUrl: string }) {
    const res = await instance.post<IServer>(`/servers`, data)
    return res.data
  }
}