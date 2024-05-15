import {IMember} from "@/services/members/members.type";
import {IDirectMessage} from "@/services/direct-message/direct-message.type";

export interface IConversation {
  id: string
  memberOneId: string
  memberOne: IMember
  memberTwoId: string
  memberTwo: IMember
  directMessages: IDirectMessage[]
}