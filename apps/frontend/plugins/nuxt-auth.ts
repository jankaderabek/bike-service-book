import { defineNuxtPlugin } from '#app'
import { AuthService } from '~/src/Infrastructure/Auth/AuthService'
import { CookieTokenStorage } from '~/src/Infrastructure/Auth/TokenStorage'
import { GlobalStateUserStorage } from '~/src/Infrastructure/Auth/UserStorage'
import { AxiosAuthRepository } from '~/src/Infrastructure/Auth/AuthRepository'

export default defineNuxtPlugin(async (nuxtApp) => {
  const authService = new AuthService(
    new AxiosAuthRepository(nuxtApp.$axios),
    new CookieTokenStorage(nuxtApp.ssrContext?.req, nuxtApp.ssrContext?.res),
    new GlobalStateUserStorage()
  )
  await authService.fetchUser()

  nuxtApp.provide('auth', authService)
})

declare module '#app' {
  interface NuxtApp {
    $auth: AuthService
  }
}
