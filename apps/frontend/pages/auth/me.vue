<template>
  <div>
    <pre>{{ loggedUser }}</pre>
  </div>
</template>

<script setup lang="ts">
import { useAuthService } from '~/src/Infrastructure/Auth/AuthService'

const authService = useAuthService()
const loggedUser = authService.loggedUser

</script>
