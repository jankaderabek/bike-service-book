import { User } from '~/src/Model/Auth/User'

export interface LoginResponse {
  jwt: string
  user: User
}
