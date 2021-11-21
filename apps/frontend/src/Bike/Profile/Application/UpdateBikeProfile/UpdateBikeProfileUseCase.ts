import { BikeProfile } from '~/src/Bike/Profile/Domain/BikeProfile'
import { BikeProfileRepository } from '~/src/Bike/Profile/Domain/BikeProfileRepository'
import { UpdateBikeProfileRequest } from '~/src/Bike/Profile/Application/UpdateBikeProfile/UpdateBikeProfileRequest'
import { useBikeProfileRepository } from '~/src/Bike/Profile/Infrastructure/BikeProfileRepositoryProvider'

export class UpdateBikeProfileUseCase {
  #bikeProfileRepository: BikeProfileRepository

  constructor (
    bikeProfileRepository: BikeProfileRepository
  ) {
    this.#bikeProfileRepository = bikeProfileRepository
  }

  public execute (bikeProfileRequest: UpdateBikeProfileRequest): Promise<BikeProfile> {
    return this.#bikeProfileRepository.updateBike(
      bikeProfileRequest.bikeId,
      { title: bikeProfileRequest.title }
    )
  }
}

export const useUpdateBikeProfileUseCase = () => {
  return new UpdateBikeProfileUseCase(useBikeProfileRepository())
}
