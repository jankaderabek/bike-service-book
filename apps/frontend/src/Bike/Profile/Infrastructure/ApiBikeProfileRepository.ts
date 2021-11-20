import { AxiosInstance } from 'axios'
import { BikeProfileRepository } from '~/src/Bike/Profile/Domain/BikeProfileRepository'
import { BikeProfile } from '~/src/Bike/Profile/Domain/BikeProfile'
import { UserId } from '~/src/User/Domain/User'

export class ApiBikeProfileRepository implements BikeProfileRepository {
  readonly #axios: AxiosInstance

  constructor (axios: AxiosInstance) {
    this.#axios = axios
  }

  getUserBikes (userId: UserId): Promise<BikeProfile[]> {
    return this.#axios
      .get<BikeProfile[]>('/bikes', { params: { user: userId.toString() } })
      .then(response => response.data)
  }
}
