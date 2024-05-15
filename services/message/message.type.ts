import {IMember} from "@/services/members/members.type";
import {IChannel} from "@/services/channel/channel.type";

export interface IMessage {
  id: string
  content: string
  fileUrl: string
  memberId: string
  member: IMember
  channelId: string
  channel: IChannel

  deleted: boolean
  createdAt: Date
  updatedAt: Date
}