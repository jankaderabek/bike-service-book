<template>
  <div>
    <form>
      <input v-model="username" type="text">
      <input v-model="password" type="text">
      <input type="submit" @click.prevent="submit">
    </form>

    <pre>{{ loggedUser }}</pre>
  </div>
</template>

<script setup lang="ts">
import { useAuthService } from '~/src/Infrastructure/Auth/AuthService'

const authService = useAuthService()
const loggedUser = authService.loggedUser

const username = ref<string>('')
const password = ref<string>('')

const submit = () => {
  authService.login(username.value, password.value)
}
</script>
