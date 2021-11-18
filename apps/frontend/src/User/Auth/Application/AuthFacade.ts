import { LoginUserService } from '~/src/User/Auth/Application/Login/LoginUserService'
import { RegisterUserService } from '~/src/User/Auth/Application/Register/RegisterUserService'
import { LoginUserRequest } from '~/src/User/Auth/Application/Login/LoginUserRequest'
import { User } from '~/src/User/Domain/User'
import { RegisterUserRequest } from '~/src/User/Auth/Application/Register/RegisterUserRequest'
import { FetchLoggedUserService } from '~/src/User/Auth/Application/FetchLogged/FetchLoggedUserService'
import { UserStorage } from '~/src/User/Auth/Infrastructure/UserStorage'
import { useNuxtApp } from '#app'

export class AuthFacade {
  readonly #loginService: LoginUserService
  readonly #fetchLoggedUserService: FetchLoggedUserService
  readonly #registerService: RegisterUserService
  readonly #userStorage: UserStorage

  constructor (
    loginService: LoginUserService,
    registerService: RegisterUserService,
    fetchLoggedUserService: FetchLoggedUserService,
    userStorage: UserStorage
  ) {
    this.#fetchLoggedUserService = fetchLoggedUserService
    this.#loginService = loginService
    this.#registerService = registerService
    this.#userStorage = userStorage
  }

  public login (loginUserRequest: LoginUserRequest): Promise<User> {
    return this.#loginService.execute(loginUserRequest)
  }

  public register (registerUserRequest: RegisterUserRequest): Promise<User> {
    return this.#registerService.execute(registerUserRequest)
  }

  public fetchUser (): Promise<User | null> {
    return this.#fetchLoggedUserService.execute()
  }

  public get loggedUser () {
    return this.#userStorage.loggedUser
  }
}

export const useAuth = (): AuthFacade => {
  const { $auth } = useNuxtApp()

  return $auth
}
