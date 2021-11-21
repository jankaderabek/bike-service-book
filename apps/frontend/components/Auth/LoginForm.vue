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
      <SubmitButton @click="submit">
        Sign in
      </SubmitButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import TextInput from '~/components/Forms/TextInput.vue'
import { AuthenticateUserFormData } from '~/src/User/Auth/Infrastructure/Delivery/Form/AuthenticateUserFormData'
import SubmitButton from '~/components/Forms/SubmitButton.vue'

const emit = defineEmits<{(e: 'submit', value: AuthenticateUserFormData): void }>()

const { handleSubmit } = useForm<AuthenticateUserFormData>({
  validationSchema: {
    email: 'email|required',
    password: 'required'
  }
})

const submit = handleSubmit(values => emit('submit', values))
</script>
