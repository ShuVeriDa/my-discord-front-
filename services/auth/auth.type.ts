export interface IUser {
  id: number
  name: string
  email: string
  imageUrl: string
  createdAt: Date
  updatedAt: Date
}

export interface IAuthResponse {
  accessToken: string
  user: IUser
}

export interface ILogin {
  email: string
  password: string
}

export interface IRegister {
  email: string
  name: string
  password: string
}

export interface IError {
  email?: boolean
  name?: boolean
  password?: boolean
}