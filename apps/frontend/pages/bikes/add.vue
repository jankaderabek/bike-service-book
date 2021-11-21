<template>
  <div>
    <BikeProfileForm
      submit-button-text="Create"
      @submit="createNewBikeProfile"
    />
  </div>
</template>

<script setup lang="ts">
import BikeProfileForm from '~/components/Bike/Profile/BikeProfileForm.vue'
import { BikeProfileFormData } from '~/src/Bike/Profile/Infrastructure/Delivery/Form/BikeProfileFormData'
import { useCreateBikeProfileUseCase } from '~/src/Bike/Profile/Application/CreateBikeProfile/CreateBikeProfileUseCase'

const router = useRouter()

const createBikeProfileUseCase = useCreateBikeProfileUseCase()

const createNewBikeProfile = async (bikeProfile: BikeProfileFormData) => {
  const createdBikeProfile = await createBikeProfileUseCase.execute(bikeProfile)
  router.push(`/bikes/${createdBikeProfile.id}/detail`)
}

</script>
