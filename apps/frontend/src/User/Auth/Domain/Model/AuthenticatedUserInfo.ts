import { User } from '~/src/User/Domain/User'

export interface AuthenticatedUserInfo {
  jwt: string
  user: User
}
