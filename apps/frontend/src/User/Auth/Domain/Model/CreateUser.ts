import { User } from '~/src/User/Domain/User'

export interface UserToCreate {
  email: string
  password: string
}

export interface CreatedUserInfo {
  jwt: string
  user: User
}
