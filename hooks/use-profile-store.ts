import {create} from "zustand";
import {IAuthResponse, IUser} from "@/services/auth/auth.type";

interface ModalStore {
  user: IUser | null
  accessToken: string | null
  setUser: (user: IAuthResponse) => void
}

export const useProfileStore = create<ModalStore>((set) => ({
  user: null,
  accessToken: null,
  setUser: (data) => set(data),
}))