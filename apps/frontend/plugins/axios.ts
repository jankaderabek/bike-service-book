import axios, { AxiosInstance } from 'axios'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:1337'
  })

  nuxtApp.provide('axios', axiosInstance)
})

declare module '#app' {
  interface NuxtApp {
    $axios: AxiosInstance
  }
}
