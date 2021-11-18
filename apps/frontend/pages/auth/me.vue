<template>
  <div>
    <pre>{{ loggedUser }}</pre>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/src/User/Auth/Application/AuthFacade'

const auth = useAuth()
const loggedUser = auth.loggedUser

</script>
