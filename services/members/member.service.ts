import {IMember} from "@/services/members/members.type";
import {instance} from "@/api/axios";

export const memberService = {
  async findCurrentMember(serverId: string) {
    const {data} = await instance.get<IMember>(`/members/${serverId}`)
    return data
  }
}