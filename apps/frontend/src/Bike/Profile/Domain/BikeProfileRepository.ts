import { BikeProfile } from '~/src/Bike/Profile/Domain/BikeProfile'
import { UserId } from '~/src/User/Domain/User'

export interface BikeProfileRepository {
  getUserBikes(userId: UserId): Promise<BikeProfile[]>
}
