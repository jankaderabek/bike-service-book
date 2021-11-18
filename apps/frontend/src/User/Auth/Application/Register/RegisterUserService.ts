import { UserStorage } from '~/src/User/Auth/Infrastructure/UserStorage'
import { User } from '~/src/User/Domain/User'
import { RegisterUserRequest } from '~/src/User/Auth/Application/Register/RegisterUserRequest'
import { AuthRepository } from '~/src/User/Auth/Domain/AuthRepository'
import { TokenStorage } from '~/src/User/Auth/Domain/TokenStorage'

export class RegisterUserService {
  readonly #authRepository: AuthRepository
  readonly #tokenStorage: TokenStorage
  readonly #userStorage: UserStorage

  constructor (authRepository: AuthRepository, tokenStorage: TokenStorage, userStorage: UserStorage) {
    this.#authRepository = authRepository
    this.#tokenStorage = tokenStorage
    this.#userStorage = userStorage
  }

  public async execute (registerUserRequest: RegisterUserRequest): Promise<User> {
    const loginResponse = await this.#authRepository.register({
      email: registerUserRequest.email,
      password: registerUserRequest.password
    })

    await this.#tokenStorage.save(loginResponse.jwt)
    await this.#userStorage.save(loginResponse.user)

    return loginResponse.user
  }
}
