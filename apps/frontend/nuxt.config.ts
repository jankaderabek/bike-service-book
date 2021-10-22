import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {}
        }
      }
    }
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
  extendPlugins (plugins: any) {
    const pluginIndex = plugins.findIndex(
      // @ts-ignore
      ({ src }) => src === '~/plugins/axios.ts'// @ts-ignore
    )
    const shouldBeFirstPlugin = plugins[pluginIndex]

    plugins.splice(pluginIndex, 1)
    plugins.unshift(shouldBeFirstPlugin)

    return plugins
  }
})
