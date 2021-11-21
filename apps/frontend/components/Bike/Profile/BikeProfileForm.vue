<template>
  <form class="mt-8 space-y-6" action="#" method="POST">
    <div class="rounded-md shadow-sm -space-y-px">
      <TextInput name="title" placeholder="Bike title" />
    </div>

    <div>
      <SubmitButton @click="submit">
        {{ props.submitButtonText }}
      </SubmitButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import TextInput from '~/components/Forms/TextInput.vue'
import { BikeProfileFormData } from '~/src/Bike/Profile/Infrastructure/Delivery/Form/BikeProfileFormData'
import SubmitButton from '~/components/Forms/SubmitButton.vue'

interface PropTypes {
  initialValue?: BikeProfileFormData
  submitButtonText?: string
}

const props = withDefaults(defineProps<PropTypes>(), {
  initialValue: undefined,
  submitButtonText: 'Save'
})

const emit = defineEmits<{(e: 'submit', value: BikeProfileFormData): void }>()

const { handleSubmit } = useForm<BikeProfileFormData>({
  validationSchema: {
    title: 'required'
  },
  initialValues: props.initialValue
})

const submit = handleSubmit(values => emit('submit', values))
</script>
