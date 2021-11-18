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
import LoginForm from '~/components/Auth/LoginForm.vue'
import { AuthenticateUserFormData } from '~/src/User/Auth/Infrastructure/Delivery/Form/AuthenticateUserFormData'
import { useAuth } from '~/src/User/Auth/Application/AuthFacade'

const router = useRouter()
const auth = useAuth()

const submitLogin = async (values: AuthenticateUserFormData) => {
  await auth.login({ email: values.email, password: values.password })
  await router.push('/auth/me')
}

</script>
