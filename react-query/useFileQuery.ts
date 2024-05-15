import {useMutation} from "@tanstack/react-query";
import {axiosClassic} from "@/api/axios";
import {useMemo} from "react";
import {errorCatch} from "@/api/api.helper";
import {Bounce, toast} from "react-toastify";

export const useFileQuery = (folder?: string) => {
  const uploadFile = useMutation({
    mutationKey: ['uploadFile'],
    mutationFn: async (file: FormData) => axiosClassic.post(`/files?folder=${folder}`, {
      file, headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
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
    uploadFile
  }), [uploadFile])
}