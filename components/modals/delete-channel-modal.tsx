"use client"

import {FC, useState} from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {useModal} from "@/hooks/use-modal-store";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useChannelQuery} from "@/react-query/useChannelQuery";

interface IDeleteChannelModalProps {
}

export const DeleteChannelModal: FC<IDeleteChannelModalProps> = () => {
  const {isOpen, onClose, type, data} = useModal()
  const router = useRouter()

  const isModalOpen = isOpen && type === "deleteChannel"
  const { channel, server} = data

  const {deleteChannel} = useChannelQuery(server?.id, channel?.id)
  const {mutateAsync} = deleteChannel

  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)

      await mutateAsync(server?.id!)

      onClose()
      router.refresh()
      router.push(`/servers/${server?.id}`)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Channel
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure want to do this? <br/>
            <span className="text-indigo-500 font-semibold">#{channel?.name}</span> Will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button disabled={isLoading}
                    onClick={() => {
                    }}
                    variant="ghost"
            >
              Cancel
            </Button>
            <Button disabled={isLoading}
                    variant="primary"
                    onClick={onClick}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};