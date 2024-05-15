import {useMutation, useQuery} from "@tanstack/react-query";
import {serversService} from "@/services/servers/servers.service";
import {useMemo} from "react";
import {errorCatch} from "@/api/api.helper";
import {Bounce, toast} from "react-toastify";

export const useServerQuery = (serverId?: string, inviteCode?: string) => {
  const fetchAllServers = useQuery({
    queryKey: ["fetchAllServers"],
    queryFn: () => serversService.getAllServers(),
  })

  const fetchOneServer = useQuery({
    queryKey: ["fetchOneServer"],
    queryFn: () => serversService.getOneServerById(serverId!),
    enabled: !!serverId,
  })

  const fetchOneServerByInviteCode = useQuery({
    queryKey: ["fetchOneServerByInviteCode"],
    queryFn: () => serversService.getOneServerByInviteCode(inviteCode!),
    enabled: !!inviteCode
  })

  const getOneServerByProfileId = useQuery({
    queryKey: ["getOneServerByProfileId"],
    queryFn: () => serversService.getOneServerByProfileId(),
  })

  const createServer = useMutation({
    mutationKey: ['createServer'],
    mutationFn: (data: { name: string, imageUrl: string }) => serversService.createServer(data),
    onError(error: Error) {
      const message = errorCatch(error)
      toast(message, {
        type: "error", autoClose: 2000, position: "bottom-center", transition: Bounce, hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  })

  return useMemo(() => ({
    fetchAllServers, fetchOneServer, fetchOneServerByInviteCode, getOneServerByProfileId, createServer
  }), [fetchAllServers, fetchOneServer, fetchOneServerByInviteCode, getOneServerByProfileId, createServer])
}