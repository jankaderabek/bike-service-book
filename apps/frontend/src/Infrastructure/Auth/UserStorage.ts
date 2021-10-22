import type { Ref, ComputedRef } from 'vue'
import { computed } from 'vue'
import { User } from '~/src/Model/Auth/User'

export interface UserStorage {
  save (user: User): Promise<void>
  load (): Promise<User | null>

  get loggedUser (): ComputedRef<User | null>
}

export class GlobalStateUserStorage implements UserStorage {
  readonly #loggedUser: Ref<User | null>

  constructor () {
    this.#loggedUser = ref(null)
  }

  save (user: User): Promise<void> {
    this.#loggedUser.value = user

    return Promise.resolve()
  }

  load (): Promise<User | null> {
    return Promise.resolve(this.#loggedUser.value)
  }

  get loggedUser () {
    return computed(() => this.#loggedUser.value)
  }
}
