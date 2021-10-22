import { AxiosInstance } from 'axios'
import { LoginResponse } from '~/src/Model/Auth/LoginResponse'
import { TokenStorage } from '~/src/Infrastructure/Auth/TokenStorage'
import { User } from '~/src/Model/Auth/User'
import { useNuxtApp } from '#app'
import { UserStorage } from '~/src/Infrastructure/Auth/UserStorage'

export class AuthService {
  readonly #axios: AxiosInstance
  readonly #tokenStorage: TokenStorage
  readonly #userStorage: UserStorage

  constructor (axios: AxiosInstance, tokenStorage: TokenStorage, userStorage: UserStorage) {
    this.#axios = axios
    this.#tokenStorage = tokenStorage
    this.#userStorage = userStorage
  }

  public async login (email: string, password: string): Promise<LoginResponse> {
    const loginResponse = await this.#axios.post<LoginResponse>('/auth/local', { identifier: email, password })
    await this.#tokenStorage.save(loginResponse.data.jwt)
    await this.#userStorage.save(loginResponse.data.user)

    return loginResponse.data
  }

  public async fetchUser (): Promise<User | null> {
    const token = await this.#tokenStorage.load()

    if (token === null) {
      return Promise.resolve(null)
    }

    const userResponse = await this.#axios.get<User>('/users/me', { headers: { Authorization: `Bearer ${token}` } })
    await this.#userStorage.save(userResponse.data)

    return userResponse.data
  }

  public get loggedUser () {
    return this.#userStorage.loggedUser
  }
}

export const useAuthService = (): AuthService => {
  const { $auth } = useNuxtApp()

  return $auth
}
