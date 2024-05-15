import {useMutation} from "@tanstack/react-query";
import {useMemo} from "react";
import {inviteCodeService} from "@/services/invite/inviteCode.service";

export const useInviteCode = (inviteCode?: string) => {
  const joinServer = useMutation({
    mutationKey: ['joinServer'],
    mutationFn: () => inviteCodeService.joinServer(inviteCode!)
  })

  return useMemo(() => ({
    joinServer
  }), [joinServer])
}