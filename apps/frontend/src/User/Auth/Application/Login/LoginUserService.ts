import { UserStorage } from '~/src/User/Auth/Infrastructure/UserStorage'
import { LoginUserRequest } from '~/src/User/Auth/Application/Login/LoginUserRequest'
import { User } from '~/src/User/Domain/User'
import { AuthRepository } from '~/src/User/Auth/Domain/AuthRepository'
import { TokenStorage } from '~/src/User/Auth/Domain/TokenStorage'

export class LoginUserService {
  readonly #authRepository: AuthRepository
  readonly #tokenStorage: TokenStorage
  readonly #userStorage: UserStorage

  constructor (authRepository: AuthRepository, tokenStorage: TokenStorage, userStorage: UserStorage) {
    this.#authRepository = authRepository
    this.#tokenStorage = tokenStorage
    this.#userStorage = userStorage
  }

  public async execute (loginUserRequest: LoginUserRequest): Promise<User> {
    const loginResponse = await this.#authRepository.loginLocal(loginUserRequest.email, loginUserRequest.password)
    await this.#tokenStorage.save(loginResponse.jwt)
    await this.#userStorage.save(loginResponse.user)

    return loginResponse.user
  }
}
