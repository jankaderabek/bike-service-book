import { BikeProfileRepository } from '~/src/Bike/Profile/Domain/BikeProfileRepository'
import { ApiBikeProfileRepository } from '~/src/Bike/Profile/Infrastructure/ApiBikeProfileRepository'
import { useAxios } from '~/composables/axios'

export const useBikeProfileRepository = (): BikeProfileRepository => {
  const axiosInstance = useAxios()

  return new ApiBikeProfileRepository(axiosInstance)
}
