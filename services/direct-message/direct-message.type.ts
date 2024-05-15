import {IMember} from "@/services/members/members.type";
import {IConversation} from "@/services/conversation/conversation.type";

export interface IDirectMessage {
  id   : string
  content  : string
  fileUrl : string

  memberId  : string
  member: IMember

  conversationId  : string
  conversation: IConversation

  createdAt: Date
  updatedAt: Date

  deleted:boolean
}