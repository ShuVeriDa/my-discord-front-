import {instance} from "@/api/axios";
import {ICreateServer, IServer, IServerWithMembersWithProfiles, IUpdateServer} from "@/services/servers/servers.type";

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

  async createServer(data: ICreateServer) {
    const res = await instance.post<IServer>(`/servers`, data)
    return res.data
  },

  async updateServer(data: IUpdateServer, serverId: string) {
    const res = await instance.patch<IServer>(`/servers/${serverId}`, data)
    return res.data
  },

  async deleteServer(serverId: string) {
    const {data} = await instance.delete<string>(`/servers/${serverId}`)

    return data
  },

  async leaveServer(serverId: string) {
    const {data} = await instance.patch<string>(`/servers/${serverId}/leave`)

    return data
  }
}