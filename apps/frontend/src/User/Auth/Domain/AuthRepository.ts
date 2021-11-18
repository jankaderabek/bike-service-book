import { AuthenticatedUserInfo } from '~/src/User/Auth/Domain/Model/AuthenticatedUserInfo'
import { User } from '~/src/User/Domain/User'
import { CreatedUserInfo, UserToCreate } from '~/src/User/Auth/Domain/Model/CreateUser'

export interface AuthRepository {
  loginLocal(email: string, password: string): Promise<AuthenticatedUserInfo>

  fetchUser(token: string): Promise<User>

  register(newUser: UserToCreate): Promise<CreatedUserInfo>
}
