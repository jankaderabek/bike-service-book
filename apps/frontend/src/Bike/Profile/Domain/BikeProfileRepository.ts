import { BikeProfile, BikeProfileId } from '~/src/Bike/Profile/Domain/BikeProfile'
import { UserId } from '~/src/User/Domain/User'
import { BikeProfileToCreate } from '~/src/Bike/Profile/Domain/BikeProfileToCreate'
import { BikeProfileToUpdate } from '~/src/Bike/Profile/Domain/BikeProfileToUpdate'

export interface BikeProfileRepository {
  getBike (bikeId: BikeProfileId): Promise<BikeProfile>

  addBike (newBike: BikeProfileToCreate): Promise<BikeProfile>

  updateBike (bikeId: BikeProfileId, bike: BikeProfileToUpdate): Promise<BikeProfile>

  getUserBikes(userId: UserId): Promise<BikeProfile[]>
}
