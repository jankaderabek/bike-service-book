<template>
  <div>
    <form>
      <input v-model="email" type="text" placeholder="email">
      <input v-model="password" type="password" placeholder="password">
      <input type="submit" @click.prevent="submit">
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAuthService } from '~/src/Infrastructure/Auth/AuthService'

const authService = useAuthService()
const router = useRouter()

const email = ref<string>('')
const password = ref<string>('')

const submit = async () => {
  await authService.register({ email: email.value, password: password.value })
  router.push('/auth/me')
}
</script>
