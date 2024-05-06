import {axiosClassic} from "@/api/axios";
import {IAuthResponse, ILogin, IRegister} from "@/services/auth/auth.type";
import {removeFromStorage, saveTokenStorage} from "@/services/auth/auth.helper";

export enum EnumTokens {
  'ACCESS_TOKEN' = 'accessToken',
  'REFRESH_TOKEN' = 'refreshToken',
}

export const authService = {
  async login(data: ILogin) {
    const res = await axiosClassic.post<IAuthResponse>(`/auth/login`, data);

    if (res.data.accessToken) saveTokenStorage(res.data.accessToken)

    return res
  },

  async register(data: IRegister) {
    const res = await axiosClassic.post<IAuthResponse>(`/auth/register`, data);

    if (res.data.accessToken) saveTokenStorage(res.data.accessToken)

    return res
  },

  async getNewTokens() {
    const response = await axiosClassic.post<IAuthResponse>('/auth/login/access-token')

    if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

    return response
  },

  async logout() {
    const response = await axiosClassic.post<boolean>('/auth/logout')

    if (response.data) removeFromStorage()

    return response
  }
}