import {useMutation} from "@tanstack/react-query";
import {useMemo} from "react";
import {inviteCodeService} from "@/services/invite/inviteCode.service";

export const useInviteCode = (serverId?: string) => {
  const joinServer = useMutation({
    mutationKey: ['joinServer'],
    mutationFn: (inviteCode: string) => inviteCodeService.joinServer(inviteCode!)
  })

  const refreshCode = useMutation({
    mutationKey: ['refreshCode'],
    mutationFn: () => inviteCodeService.refreshCode(serverId!)
  })

  return useMemo(() => ({
    joinServer, refreshCode
  }), [joinServer, refreshCode])
}