import {useSocket} from "@/components/providers/socket-provider";
import qs from "query-string";
import {useInfiniteQuery} from "@tanstack/react-query";
import {undefined} from "zod";

interface IChatQueryProps {
  queryKey: string
  apiUrl: string
  paramKey: "channelId" | "conversationId"
  paramValue: string
}

export const useChatQuery = (
  {
    queryKey, paramKey, paramValue, apiUrl
  }: IChatQueryProps
) => {

  const {isConnected} = useSocket()

  const fetchMessages = async ({pageParam = undefined}) => {
    const res = await fetch(`${apiUrl}?${paramKey}=${paramValue}`)
    return res.json()
  }

  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, status} = useInfiniteQuery({
    initialPageParam: undefined,
    queryKey: [queryKey],
    queryFn: fetchMessages,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    refetchInterval: isConnected ? false : 1000
  })

  return {data, fetchNextPage, hasNextPage, isFetchingNextPage, status}
}