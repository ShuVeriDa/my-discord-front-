import {MediaRoom} from "@/components/media-room";
import {SocketIndicator} from "@/components/socket-indicator";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-between p-24">
      <MediaRoom chatId={"idOfRoom"} video={true} audio={true} />
      <SocketIndicator/>
    </main>
  );
}
