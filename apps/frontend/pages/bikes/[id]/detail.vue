<template>
  <div>
    <h1>Detail: {{ bikeProfile.title }}</h1>

    <nuxt-link :to="`/bikes/${bikeProfile.id}/edit`">
      Edit
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { useBikeProfileRepository } from '~/src/Bike/Profile/Infrastructure/BikeProfileRepositoryProvider'
import { BikeProfile } from '~/src/Bike/Profile/Domain/BikeProfile'

const bikeProfileRepository = useBikeProfileRepository()

const route = useRoute()

const { data: bikeProfile } = await useAsyncData<BikeProfile>(
  'bikes',
  () => bikeProfileRepository.getBike(Number(route.params.id))
)

</script>
