import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  typescript: {
    strict: true
  },
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {}
        }
      }
    },
    transpile: ['vee-validate', '@vue/devtools-api', 'yup', 'lodash', 'lodash.has', 'lodash-es']
  },
  vite: {
    // @ts-ignore
    ssr: {
      noExternal: [
        '@headlessui/vue',
        '@heroicons/vue/outline',
        '@heroicons/vue/solid',
        'vee-validate',
        '@vue/devtools-api',
        'yup',
        'nanoclone',
        'lodash',
        'lodash.has',
        'lodash-es'
      ]
    }
  }
})
