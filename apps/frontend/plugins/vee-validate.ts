import { defineRule } from 'vee-validate'
import AllRules from '@vee-validate/rules'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  Object.keys(AllRules).forEach((rule) => {
    defineRule(rule, AllRules[rule])
  })
})
