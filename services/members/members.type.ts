import {IProfile} from "@/services/profile/profile.type";
import {IServer} from "@/services/servers/servers.type";
import {IMessage} from "@/services/message/message.type";
import {IDirectMessage} from "@/services/direct-message/direct-message.type";

export enum MemberRole {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  GUEST = 'GUEST'
}

export interface IMember {
  id: string
  role: MemberRole
  profileId: string
  profile: IProfile
  serverId: string
  server: IServer
  createdAt: Date
  updatedAt: Date

  messages: IMessage[]
  directMessages: IDirectMessage[]

}