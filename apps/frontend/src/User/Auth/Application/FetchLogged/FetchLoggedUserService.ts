import { UserStorage } from '~/src/User/Auth/Infrastructure/UserStorage'
import { User } from '~/src/User/Domain/User'
import { AuthRepository } from '~/src/User/Auth/Domain/AuthRepository'
import { TokenStorage } from '~/src/User/Auth/Domain/TokenStorage'

export class FetchLoggedUserService {
  readonly #authRepository: AuthRepository
  readonly #tokenStorage: TokenStorage
  readonly #userStorage: UserStorage

  constructor (authRepository: AuthRepository, tokenStorage: TokenStorage, userStorage: UserStorage) {
    this.#authRepository = authRepository
    this.#tokenStorage = tokenStorage
    this.#userStorage = userStorage
  }

  public async execute (): Promise<User | null> {
    const token = await this.#tokenStorage.load()

    if (token === null) {
      return Promise.resolve(null)
    }

    const user = await this.#authRepository.fetchUser(token)
    await this.#userStorage.save(user)

    return user
  }
}
