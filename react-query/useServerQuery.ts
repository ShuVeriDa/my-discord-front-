import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {serversService} from "@/services/servers/servers.service";
import {useMemo} from "react";
import {errorCatch} from "@/api/api.helper";
import {Bounce, toast} from "react-toastify";
import {ICreateServer, IUpdateServer} from "@/services/servers/servers.type";

export const useServerQuery = (serverId?: string, inviteCode?: string) => {
  const fetchAllServers = useQuery({
    queryKey: ["fetchAllServers"],
    queryFn: () => serversService.getAllServers(),
  })

  const fetchOneServer = useQuery({
    queryKey: ["fetchOneServer", serverId],
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

  const client = useQueryClient()

  const createServer = useMutation({
    mutationKey: ['createServer'],
    mutationFn: (data: ICreateServer) => serversService.createServer(data),
    onSuccess: () => {
      client.invalidateQueries({queryKey: ['fetchAllServers']})
    },
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

  const updateServer = useMutation({
    mutationKey: ['updateServer'],
    mutationFn: (data: IUpdateServer) => serversService.updateServer(data, serverId!),
    onSuccess: () => {
      client.invalidateQueries({queryKey: ['fetchAllServers']})
      client.invalidateQueries({queryKey: ["fetchOneServer"]})
    },
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

  const deleteServer = useMutation({
    mutationKey: ['deleteServer'],
    mutationFn: () => serversService.deleteServer(serverId!),
    onSuccess: () => {
      client.invalidateQueries({queryKey: ['fetchAllServers']})
      // client.invalidateQueries({queryKey: ["fetchOneServer"]})
    },
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

  const leaveServer = useMutation({
    mutationKey: ['leaveServer'],
    mutationFn: () => serversService.leaveServer(serverId!),
    onSuccess: () => {
      client.invalidateQueries({queryKey: ['fetchAllServers']})
      // client.invalidateQueries({queryKey: ["fetchOneServer"]})
    },
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
    fetchAllServers,
    fetchOneServer,
    fetchOneServerByInviteCode,
    getOneServerByProfileId,
    createServer,
    updateServer,
    deleteServer,
    leaveServer
  }), [
    fetchAllServers,
    fetchOneServer,
    fetchOneServerByInviteCode,
    getOneServerByProfileId,
    createServer,
    updateServer,
    deleteServer,
    leaveServer
  ])
}