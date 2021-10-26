<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <LoginForm @submit="submitLogin" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthService } from '~/src/Infrastructure/Auth/AuthService'
import LoginForm from '~/components/Auth/LoginForm.vue'
import { LoginFormData } from '~/src/Infrastructure/Auth/Form/LoginFormData'

const router = useRouter()
const authService = useAuthService()

const submitLogin = async (values: LoginFormData) => {
  await authService.login(values.email, values.password)
  router.push('/auth/me')
}

</script>
