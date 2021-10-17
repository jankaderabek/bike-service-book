import { defineNuxtConfig } from 'nuxt3'


export default defineNuxtConfig({
  ssr: false,
  nitro: {
    preset: 'server'
  },
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        }
      }
    },
  },
  vite: {
    // @ts-ignore
    ssr: {
      noExternal: [
        '@headlessui/vue',
        '@heroicons/vue/outline',
        '@heroicons/vue/solid'
      ]
    }
  },
})
