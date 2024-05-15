import {instance} from "@/api/axios";
import {IConversation} from "@/services/conversation/conversation.type";

export const conversationService = {
  async getOrCreateConversationByIds(serverId: string, memberTwoId: string) {
    const {data} = await instance.post<IConversation>(`/conversations`, {
      serverId, memberTwoId
    });

    return data
  }
}