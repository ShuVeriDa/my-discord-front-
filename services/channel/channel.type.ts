import {IProfile} from "@/services/profile/profile.type";
import {IServer} from "@/services/servers/servers.type";
import {IMessage} from "@/services/message/message.type";

export enum ChannelType {
  TEXT = "TEXT",
  AUDIO = "AUDIO",
  VIDEO = "VIDEO"
}

export interface ICreateChannel {
  serverId: string
  name: string
  type: ChannelType
}

export interface IChannel {
  id: string
  name: string
  type: ChannelType
  profileId: string
  profile: IProfile
  serverId: string
  server: IServer
  messages: IMessage[]
  createdAt: Date
  updatedAt: Date
}