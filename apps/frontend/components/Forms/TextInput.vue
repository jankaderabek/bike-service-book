<template>
  <div>
    <label v-if="label" :for="name" class="sr-only">{{ label }}</label>
    <input
      id="name"
      v-model="value"
      :name="name"
      :type="type"
      class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      :placeholder="placeholder"
    >
    <span>{{ errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'

interface PropTypes {
  name: string
  modelValue?: unknown
  label?: string
  type?: string
  placeholder?: string
}

const props = withDefaults(defineProps<PropTypes>(), {
  type: 'text',
  modelValue: undefined,
  placeholder: '',
  label: ''
})

const emit = defineEmits<{(e: 'update:modelValue', value: unknown): void }>()

const { errorMessage, value } = useField(props.name)

watch(value, (newValue) => {
  if (newValue !== props.modelValue) {
    emit('update:modelValue', newValue)
  }
})

watch(
  () => props.modelValue,
  (newModel) => {
    if (newModel !== value.value) {
      value.value = newModel
    }
  }
)

</script>
