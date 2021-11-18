import { AxiosInstance } from 'axios'
import { AuthenticatedUserInfo } from '~/src/User/Auth/Domain/Model/AuthenticatedUserInfo'
import { CreatedUserInfo, UserToCreate } from '~/src/User/Auth/Domain/Model/CreateUser'
import { User } from '~/src/User/Domain/User'
import { useAxios } from '~/composables/axios'
import { AuthRepository } from '~/src/User/Auth/Domain/AuthRepository'

export class AxiosAuthRepository implements AuthRepository {
  readonly #axios: AxiosInstance

  constructor (axios: AxiosInstance) {
    this.#axios = axios
  }

  public async loginLocal (email: string, password: string): Promise<AuthenticatedUserInfo> {
    return (await this.#axios.post<AuthenticatedUserInfo>('/auth/local', { identifier: email, password })).data
  }

  public async fetchUser (token: string): Promise<User> {
    const axiosResponse = await this.#axios.get<User>(
      '/users/me',
      { headers: { Authorization: `Bearer ${token}` } }
    )

    return axiosResponse.data
  }

  public async register (newUser: UserToCreate): Promise<CreatedUserInfo> {
    return (await this.#axios.post<CreatedUserInfo>('/auth/local/register', {
      username: newUser.email,
      email: newUser.email,
      password: newUser.password
    })).data
  }
}
