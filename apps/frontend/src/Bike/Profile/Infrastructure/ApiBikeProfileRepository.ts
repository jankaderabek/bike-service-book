import { AxiosInstance } from 'axios'
import { BikeProfileRepository } from '~/src/Bike/Profile/Domain/BikeProfileRepository'
import { BikeProfile, BikeProfileId } from '~/src/Bike/Profile/Domain/BikeProfile'
import { UserId } from '~/src/User/Domain/User'
import { BikeProfileToCreate } from '~/src/Bike/Profile/Domain/BikeProfileToCreate'
import { BikeProfileToUpdate } from '~/src/Bike/Profile/Domain/BikeProfileToUpdate'

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

  public getBike (bikeId: BikeProfileId): Promise<BikeProfile> {
    return this.#axios
      .get<BikeProfile>(`/bikes/${bikeId}`)
      .then(response => response.data)
  }

  public addBike (newBike: BikeProfileToCreate): Promise<BikeProfile> {
    return this.#axios
      .post<BikeProfile>('/bikes', newBike)
      .then(response => response.data)
  }

  public updateBike (bikeId: BikeProfileId, bike: BikeProfileToUpdate): Promise<BikeProfile> {
    return this.#axios
      .put<BikeProfile>(`/bikes/${bikeId}`, { title: bike.title })
      .then(response => response.data)
  }
}
