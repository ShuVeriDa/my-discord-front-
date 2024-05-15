import {IProfile} from "@/services/profile/profile.type";
import {IMember} from "@/services/members/members.type";
import {IChannel} from "@/services/channel/channel.type";

export interface IServer {
  id: string
  name: string
  imageUrl: string
  inviteCode: string
  profileId: string
  profile?: IProfile
  members?: IMember[]
  channels?: IChannel[]
  createdAt: Date | string
  updatedAt: Date | string
}

export type IServerWithMembersWithProfiles = IServer & {
  members: (IMember & { profile: IProfile })[];
};
