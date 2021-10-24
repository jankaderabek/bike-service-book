import { LoginResponse } from '~/src/Model/Auth/LoginResponse'
import { TokenStorage } from '~/src/Infrastructure/Auth/TokenStorage'
import { User } from '~/src/Model/Auth/User'
import { useNuxtApp } from '#app'
import { UserStorage } from '~/src/Infrastructure/Auth/UserStorage'
import { AuthRepository } from '~/src/Infrastructure/Auth/AuthRepository'
import { NewRegistrationResponse, NewUser } from '~/src/Model/Auth/Register'

export class AuthService {
  readonly #authRepository: AuthRepository
  readonly #tokenStorage: TokenStorage
  readonly #userStorage: UserStorage

  constructor (authRepository: AuthRepository, tokenStorage: TokenStorage, userStorage: UserStorage) {
    this.#authRepository = authRepository
    this.#tokenStorage = tokenStorage
    this.#userStorage = userStorage
  }

  public async login (email: string, password: string): Promise<LoginResponse> {
    const loginResponse = await this.#authRepository.loginLocal(email, password)
    await this.#tokenStorage.save(loginResponse.jwt)
    await this.#userStorage.save(loginResponse.user)

    return loginResponse
  }

  public async fetchUser (): Promise<User | null> {
    const token = await this.#tokenStorage.load()

    if (token === null) {
      return Promise.resolve(null)
    }

    const user = await this.#authRepository.fetchUser(token)
    await this.#userStorage.save(user)

    return user
  }

  public async register (newUser: NewUser): Promise<NewRegistrationResponse> {
    const registrationResponse = await this.#authRepository.register(newUser)
    await this.#tokenStorage.save(registrationResponse.jwt)
    await this.#userStorage.save(registrationResponse.user)

    return registrationResponse
  }

  public get loggedUser () {
    return this.#userStorage.loggedUser
  }
}

export const useAuthService = (): AuthService => {
  const { $auth } = useNuxtApp()

  return $auth
}
