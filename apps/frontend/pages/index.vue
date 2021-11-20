<template>
  <div>
    <div class="text-black dark:text-white font-semibold p-4 flex flex-col">
      Tailwindcss Starter

      <NuxtLink class="mt-5" to="modal">
        Go Modal Page
      </NuxtLink><br>

      <NuxtLink to="/auth/login">
        Login
      </NuxtLink>

      <NuxtLink to="/auth/me">
        Profile
      </NuxtLink>

      <NuxtLink to="/bikes">
        Bikes
      </NuxtLink>
    </div>
  </div>
</template>
