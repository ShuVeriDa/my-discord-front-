import {instance} from "@/api/axios";
import {IChannel, ICreateChannel} from "@/services/channel/channel.type";

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
  }
}