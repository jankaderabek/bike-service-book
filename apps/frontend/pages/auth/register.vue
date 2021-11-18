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
import { useAuth } from '~/src/User/Auth/Application/AuthFacade'

const auth = useAuth()
const router = useRouter()

const email = ref<string>('')
const password = ref<string>('')

const submit = async () => {
  await auth.register({ email: email.value, password: password.value })
  await router.push('/auth/me')
}
</script>
