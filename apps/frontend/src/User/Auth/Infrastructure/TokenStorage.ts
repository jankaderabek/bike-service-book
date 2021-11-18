import cookieUniversal, { ICookie } from 'cookie-universal'
import { TokenStorage } from '~/src/User/Auth/Domain/TokenStorage'

export class LocalTokenStorage implements TokenStorage {
  readonly #token_key: string = 'token'

  save (token: string): Promise<void> {
    if (typeof window === 'undefined') {
      return Promise.resolve()
    }

    window.localStorage.setItem(this.#token_key, token)

    return Promise.resolve()
  }

  load (): Promise<string | null> {
    if (typeof window === 'undefined') {
      return Promise.resolve(null)
    }

    return Promise.resolve(window.localStorage.getItem(this.#token_key))
  }
}

export class CookieTokenStorage implements TokenStorage {
  readonly #token_key: string = 'token'
  readonly #cookie: ICookie

  constructor (req: any, res: any) {
    this.#cookie = cookieUniversal(req, res)
  }

  save (token: string): Promise<void> {
    this.#cookie.set(this.#token_key, token)

    return Promise.resolve()
  }

  load (): Promise<string | null> {
    return Promise.resolve(this.#cookie.get(this.#token_key) ?? null)
  }
}
