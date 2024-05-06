import {create} from "zustand";
import {IAuthResponse, IUser} from "@/services/auth/auth.type";
import {persist} from "zustand/middleware";

interface ModalStore {
  user: IUser | null
  accessToken: string | null
  setUser: (user: IAuthResponse) => void
}

export const useProfileStore = create<ModalStore>()(persist((set, get) => ({
  user: null,
  accessToken: null,
  setUser: (data) => set(data),
}), {name: "auth"}))