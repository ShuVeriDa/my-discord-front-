"use client"

import {FC} from "react";
import {NavigationAction} from "@/components/navigation/navigation-action";
import {Separator} from "@/components/ui/separator";
import {ScrollArea} from "@/components/ui/scroll-area";
import {NavigationItem} from "@/components/navigation/navigation-item";
import {ModeToggle} from "@/components/mode-toggle";
import {useServerQuery} from "@/react-query/useServerQuery";
import {useProfileStore} from "@/hooks/use-profile-store";
import {redirect} from "next/navigation";

interface INavigationSidebarProps {
}

export const NavigationSidebar: FC<INavigationSidebarProps> =  () => {
  const {fetchAllServers} = useServerQuery()
  const {data: servers, isSuccess} = fetchAllServers

  const {user} = useProfileStore()

  if (!user) {
    return redirect("/sign-in")
  }

  return (
    <div
      className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1e1f22] bg-[#e3e5e8] py-3">
      <NavigationAction/>
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"/>
      <ScrollArea className="flex-1 w-full">
        {isSuccess && servers.map((server) => {
          return <div key={server.id}
                      className="mb-4"
          >
            <NavigationItem id={server.id} name={server.name} imageUrl={server.imageUrl}/>
          </div>
        })}
      </ScrollArea>

      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle/>
        {/*<UserButton afterSignOutUrl={"/"}*/}
        {/*            appearance={{*/}
        {/*              elements: {*/}
        {/*                avatarBox: "h-[48px] w-[48px]"*/}
        {/*              }*/}
        {/*            }}*/}
        {/*/>*/}
      </div>
    </div>
  );
};