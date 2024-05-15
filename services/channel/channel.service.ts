import {instance} from "@/api/axios";
import {IChannel, ICreateChannel, IUpdateChannel} from "@/services/channel/channel.type";

export const channelService = {
  async fetchChannels(serverId: string) {
    const {data} = await instance.get<IChannel[]>(`/channels/${serverId}`);

    return data;
  },

  async fetchChannelById(serverId: string, channelId: string) {
    const {data} = await instance.post<IChannel>(`/channels/${channelId}`, {serverId})

    return data
  },

  async createChannel(data: ICreateChannel) {
    const res = await instance.post<IChannel>('/channels', data);

    return res.data
  },

  async updateChannel(data: IUpdateChannel, channelId: string) {
    const res = await instance.patch<IChannel>(`/channels/${channelId}`, data);

    return res.data
  },

  async deleteChannel(serverId: string, channelId: string) {
    const {data} = await instance.delete<string>(`/channels/${channelId}`, {
      data: {
        serverId
      }
    });

    return data
  }
}