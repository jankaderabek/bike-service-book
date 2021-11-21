import { BikeProfile } from '~/src/Bike/Profile/Domain/BikeProfile'
import { BikeProfileRepository } from '~/src/Bike/Profile/Domain/BikeProfileRepository'
import { CreateBikeProfileRequest } from '~/src/Bike/Profile/Application/CreateBikeProfile/CreateBikeProfileRequest'
import { useBikeProfileRepository } from '~/src/Bike/Profile/Infrastructure/BikeProfileRepositoryProvider'

export class CreateBikeProfileUseCase {
  #bikeProfileRepository: BikeProfileRepository

  constructor (
    bikeProfileRepository: BikeProfileRepository
  ) {
    this.#bikeProfileRepository = bikeProfileRepository
  }

  public execute (bikeProfileRequest: CreateBikeProfileRequest): Promise<BikeProfile> {
    return this.#bikeProfileRepository.addBike(bikeProfileRequest)
  }
}

export const useCreateBikeProfileUseCase = () => {
  return new CreateBikeProfileUseCase(useBikeProfileRepository())
}
