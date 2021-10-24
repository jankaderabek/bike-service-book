import { User } from '~/src/Model/Auth/User'

export interface NewUser {
  email: string
  password: string
}

export interface NewRegistrationResponse {
  jwt: string
  user: User
}
