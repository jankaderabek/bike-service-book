import { defineNuxtPlugin } from '#app'
import { CookieTokenStorage } from '~/src/User/Auth/Infrastructure/TokenStorage'
import { GlobalStateUserStorage } from '~/src/User/Auth/Infrastructure/UserStorage'
import { AxiosAuthRepository } from '~/src/User/Auth/Infrastructure/AuthRepository'
import { AuthFacade } from '~/src/User/Auth/Application/AuthFacade'
import { LoginUserService } from '~/src/User/Auth/Application/Login/LoginUserService'
import { RegisterUserService } from '~/src/User/Auth/Application/Register/RegisterUserService'
import { FetchLoggedUserService } from '~/src/User/Auth/Application/FetchLogged/FetchLoggedUserService'

export default defineNuxtPlugin(async (nuxtApp) => {
  const axiosAuthRepository = new AxiosAuthRepository(nuxtApp.$axios)
  const tokenStorage = new CookieTokenStorage(nuxtApp.ssrContext?.req, nuxtApp.ssrContext?.res)
  const globalStateUserStorage = new GlobalStateUserStorage()

  const authFacade = new AuthFacade(
    new LoginUserService(axiosAuthRepository, tokenStorage, globalStateUserStorage),
    new RegisterUserService(axiosAuthRepository, tokenStorage, globalStateUserStorage),
    new FetchLoggedUserService(axiosAuthRepository, tokenStorage, globalStateUserStorage),
    globalStateUserStorage
  )

  await authFacade.fetchUser()

  nuxtApp.provide('auth', authFacade)
})

declare module '#app' {
  interface NuxtApp {
    $auth: AuthFacade
  }
}
