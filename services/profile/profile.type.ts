import {IServer} from "@/services/servers/servers.type";
import {IChannel} from "@/services/channel/channel.type";
import {IMember} from "@/services/members/members.type";

export interface IProfile {
  id: string
  userId: string
  name: string
  imageUrl: string
  email: string

  servers: IServer
  members: IMember
  channels: IChannel

  createdAt: Date
  updatedAt: Date
}