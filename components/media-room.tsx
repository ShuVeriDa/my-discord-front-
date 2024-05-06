"use client";

import {FC, useEffect, useState} from "react";

import {Loader2} from "lucide-react";
import {LiveKitRoom, VideoConference} from "@livekit/components-react";
import "@livekit/components-styles"
import {useProfileStore} from "@/hooks/use-profile-store";
import {instance} from "@/api/axios";

interface IMediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
}

export const MediaRoom: FC<IMediaRoomProps> = ({ audio, video, chatId }) => {
  const { user } = useProfileStore();
  const [token, setToken] = useState("");

  useEffect(() => {
    // if (!user) return;

    (async () => {
      try {
        const {data} = await instance.get(`/calls/${chatId}`);

        setToken(data.token);
      } catch (error) {
        console.log(error);
      }
    })()

  }, [chatId, user]);

  if (token === "") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <LiveKitRoom data-lk-theme="default"
                 serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
                 token={token}
                 connect={true}
                 video={video}
                 audio={audio}
    >
      <VideoConference />
    </LiveKitRoom>
  );
};