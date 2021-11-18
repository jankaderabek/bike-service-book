<template>
  <form class="mt-8 space-y-6" action="#" method="POST">
    <div class="rounded-md shadow-sm -space-y-px">
      <TextInput name="email" placeholder="Email" />
      <TextInput name="password" placeholder="Password" type="password" />
    </div>

    <div class="flex items-center justify-between">
      <div class="text-sm">
        <NuxtLink to="/auth/register" class="font-medium text-indigo-600 hover:text-indigo-500">
          Create new account
        </NuxtLink>
      </div>
    </div>

    <div>
      <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click.prevent="submit">
        Sign in
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import TextInput from '~/components/Forms/TextInput.vue'
import { AuthenticateUserFormData } from '~/src/User/Auth/Infrastructure/Delivery/Form/AuthenticateUserFormData'

const emit = defineEmits<{(e: 'submit', value: AuthenticateUserFormData): void }>()

const { handleSubmit } = useForm<AuthenticateUserFormData>({
  validationSchema: {
    email: 'email|required',
    password: 'required'
  }
})

const submit = handleSubmit(values => emit('submit', values))
</script>
