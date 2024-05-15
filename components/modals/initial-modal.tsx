"use client"

import {FC, useEffect, useState} from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {useForm} from "react-hook-form";
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FileUpload} from "@/components/file-upload";
import {redirect, useRouter} from "next/navigation";
import {useServerQuery} from "@/react-query/useServerQuery";
import {useProfileStore} from "@/hooks/use-profile-store";

interface IInitialModalProps {
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required"
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required"
  })
})

export const InitialModal: FC<IInitialModalProps> = () => {
  const [isMounted, setIsMounted] = useState(false)

  const {user} = useProfileStore()

  if (!user) redirect("/sign-in")

  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)
  }, []);

  const {getOneServerByProfileId} = useServerQuery()
  const {data: server} = getOneServerByProfileId

  if (server) {
    return redirect(`/servers/${server.id}`)
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl: ""
    }
  })

  const isLoading = form.formState.isSubmitting

  const {createServer} = useServerQuery()
  const {mutateAsync} = createServer

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await mutateAsync(values)

      form.reset()
      router.refresh()
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  if (!isMounted) {
    return null
  }

  return (
    <Dialog open>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your server a personality with a name and an image. You can always change it later.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
          >
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField control={form.control}
                           name="imageUrl"
                           render={({field}) => (
                             <FormItem>
                               <FormControl>
                                 <FileUpload endpoint={"serverImage"}
                                             value={field.value}
                                             onChange={field.onChange}
                                 />
                               </FormControl>
                             </FormItem>
                           )}
                />
              </div>
              <FormField control={form.control}
                         name={"name"}
                         render={({field}) => (
                           <FormItem>
                             <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                               Server name
                             </FormLabel>
                             <FormControl>
                               <Input disabled={isLoading}
                                      className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                      placeholder={"Enter server name"}
                                      {...field}
                               />
                             </FormControl>
                             <FormMessage/>
                           </FormItem>
                         )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button disabled={isLoading}
                      variant={"primary"}
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};