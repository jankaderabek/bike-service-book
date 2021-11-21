<template>
  <div>
    <h1>Edit: {{ bikeProfile.title }}</h1>

    <BikeProfileForm
      :initial-value="{ title: bikeProfile.title }"
      @submit="updateBikeProfile"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useBikeProfileRepository } from '~/src/Bike/Profile/Infrastructure/BikeProfileRepositoryProvider'
import { BikeProfile } from '~/src/Bike/Profile/Domain/BikeProfile'
import BikeProfileForm from '~/components/Bike/Profile/BikeProfileForm.vue'
import { useUpdateBikeProfileUseCase } from '~/src/Bike/Profile/Application/UpdateBikeProfile/UpdateBikeProfileUseCase'
import { BikeProfileFormData } from '~/src/Bike/Profile/Infrastructure/Delivery/Form/BikeProfileFormData'

const bikeProfileRepository = useBikeProfileRepository()
const updateBikeProfileUseCase = useUpdateBikeProfileUseCase()

const route = useRoute()
const router = useRouter()

const { data: bikeProfile } = await useAsyncData<BikeProfile>(
  'bikes',
  () => bikeProfileRepository.getBike(Number(route.params.id))
)

const updateBikeProfile = (bikeProfileFormData: BikeProfileFormData) => {
  updateBikeProfileUseCase.execute({ bikeId: bikeProfile.value.id, title: bikeProfileFormData.title })
  router.push(`/bikes/${route.params.id}/detail`)
}

</script>
