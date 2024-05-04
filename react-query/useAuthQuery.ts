import {useMutation} from "@tanstack/react-query";
import {ILogin, IRegister} from "@/services/auth/auth.type";
import {authService} from "@/services/auth/auth.service";
import {saveTokenStorage} from "@/services/auth/auth.helper";
import {useRouter} from "next/navigation";
import {useMemo} from "react";

export const useAuthQuery = () => {
  const {push} = useRouter()
  const login = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: ILogin) => authService.login(data),
    onSuccess({data}) {
      saveTokenStorage(data.accessToken)
      // reset()
      push("/")
    }
  })

  const register = useMutation({
    mutationKey: ['register'],
    mutationFn: (data: IRegister) => authService.register(data),
    onSuccess({data}) {
      saveTokenStorage(data.accessToken)
      // reset()
      push("/sign-in")
    }
  })

  return useMemo(() => ({
    login,
    register,
  }), [login, register])
}