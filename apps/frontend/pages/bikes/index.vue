<template>
  <div>
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="bike in bikes" :key="bike.id">
                  <td class="px-6 py-4 underline text-sm text-gray-500">
                    <nuxt-link :to="`/bikes/${bike.id}/detail`">
                      #{{ bike.id }}
                    </nuxt-link>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ bike.title }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <nuxt-link :to="`/bikes/${bike.id}/edit`" class="text-indigo-600 hover:text-indigo-900">
                      Edit
                    </nuxt-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBikeProfileRepository } from '~/src/Bike/Profile/Infrastructure/BikeProfileRepositoryProvider'
import { useAuth } from '~/src/User/Auth/Application/AuthFacade'
import { BikeProfile } from '~/src/Bike/Profile/Domain/BikeProfile'

const bikeProfileRepository = useBikeProfileRepository()
const authFacade = useAuth()

const loggedUserId = authFacade.loggedUser.value?.id ?? 0

const { data: bikes } = await useAsyncData<BikeProfile[]>('bikes', () => bikeProfileRepository.getUserBikes(loggedUserId))

</script>
