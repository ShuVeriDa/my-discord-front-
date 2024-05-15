import {useQuery} from "@tanstack/react-query";
import {memberService} from "@/services/members/member.service";
import {useMemo} from "react";

export const useMemberQuery = (serverId?: string) => {
  const fetchCurrentMember = useQuery({
    queryKey: ["fetchCurrentMember"],
    queryFn: () => memberService.findCurrentMember(serverId!),
    enabled: !!serverId
  })

  return useMemo(() => ({
    fetchCurrentMember
  }), [fetchCurrentMember])
}