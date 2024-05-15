import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {channelService} from "@/services/channel/channel.service";
import {useMemo} from "react";
import {errorCatch} from "@/api/api.helper";
import {Bounce, toast} from "react-toastify";
import {ICreateChannel} from "@/services/channel/channel.type";

export const useChannelQuery = (serverId?: string, channelId?: string) => {
  const fetchChannels = useQuery({
    queryKey: ["fetchChannels"],
    queryFn: () => channelService.fetchChannels(serverId!),
    enabled: !!serverId
  })

  const client = useQueryClient()

  const fetchChannelById = useMutation({
    mutationKey: ["fetchChannelById"],
    mutationFn: () => channelService.fetchChannelById(serverId!, channelId!),
    onError(error: Error) {
      const message = errorCatch(error)
      toast(message, {
        type: "error", autoClose: 2000, position: "bottom-center", transition: Bounce, hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    },
  })

  const createChannel = useMutation({
    mutationKey: ["createChannel"],
    mutationFn: (data: ICreateChannel) => channelService.createChannel(data),
    onSuccess: () => {
      client.invalidateQueries({queryKey: ['fetchOneServer']})
    },
    onError(error: Error) {
      const message = errorCatch(error)
      toast(message, {
        type: "error", autoClose: 2000, position: "bottom-center", transition: Bounce, hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    },
  })

  const deleteChannel = useMutation({
    mutationKey: ["deleteChannel"],
    mutationFn: (serverId: string) => channelService.deleteChannel(serverId, channelId!),
    onSuccess: () => {
      client.invalidateQueries({queryKey: ['fetchOneServer']})
    },
    onError(error: Error) {
      const message = errorCatch(error)
      toast(message, {
        type: "error", autoClose: 2000, position: "bottom-center", transition: Bounce, hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    },
  })

  return useMemo(() => ({
    fetchChannelById, createChannel, fetchChannels, deleteChannel
  }), [fetchChannelById, createChannel, fetchChannels, deleteChannel] )
}