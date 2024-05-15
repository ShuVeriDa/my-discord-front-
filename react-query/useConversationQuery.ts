import {useMutation, useQuery} from "@tanstack/react-query";
import {conversationService} from "@/services/conversation/conversation.service";
import {useMemo} from "react";

export const useConversationQuery = (serverId: string, memberTwoId: string) => {
  const fetchOrCreateConversation = useMutation({
    mutationKey: ["fetchOrCreateConversation"],
    mutationFn: () => conversationService.getOrCreateConversationByIds(serverId, memberTwoId),
  })

  return useMemo(() => ({
    fetchOrCreateConversation
  }), [fetchOrCreateConversation])
}