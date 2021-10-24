import { AxiosInstance } from 'axios'
import { LoginResponse } from '~/src/Model/Auth/LoginResponse'
import { NewRegistrationResponse, NewUser } from '~/src/Model/Auth/Register'
import { User } from '~/src/Model/Auth/User'
import { useAxios } from '~/composables/axios'

export interface AuthRepository {
  loginLocal (email: string, password: string): Promise<LoginResponse>

  fetchUser (token: string): Promise<User>

  register (newUser: NewUser): Promise<NewRegistrationResponse>
}

export class AxiosAuthRepository implements AuthRepository {
  readonly #axios: AxiosInstance

  constructor (axios: AxiosInstance) {
    this.#axios = axios
  }

  public async loginLocal (email: string, password: string): Promise<LoginResponse> {
    return (await this.#axios.post<LoginResponse>('/auth/local', { identifier: email, password })).data
  }

  public async fetchUser (token: string): Promise<User> {
    const axiosResponse = await this.#axios.get<User>(
      '/users/me',
      { headers: { Authorization: `Bearer ${token}` } }
    )

    return axiosResponse.data
  }

  public async register (newUser: NewUser): Promise<NewRegistrationResponse> {
    return (await this.#axios.post<NewRegistrationResponse>('/auth/local/register', {
      username: newUser.email,
      email: newUser.email,
      password: newUser.password
    })).data
  }
}

export const useAuthRepository = () => {
  const axiosInstance = useAxios()

  return new AxiosAuthRepository(axiosInstance)
}
