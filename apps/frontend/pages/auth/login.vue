<template>
  <div>
    <template v-if="!loggedUser">
      <form>
        <input v-model="username" type="text" placeholder="email">
        <input v-model="password" type="password" placeholder="password">
        <input type="submit" @click.prevent="submit">
      </form>

      <NuxtLink to="/auth/register">
        Registration
      </NuxtLink>
    </template>

    <NuxtLink v-else to="/auth/me">
      Go to profile
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useAuthService } from '~/src/Infrastructure/Auth/AuthService'

const router = useRouter()
const authService = useAuthService()
const loggedUser = authService.loggedUser

const username = ref<string>('')
const password = ref<string>('')

const submit = async () => {
  await authService.login(username.value, password.value)
  router.push('/auth/me')
}
</script>
