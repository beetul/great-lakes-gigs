<!-- app/components/AppHeader.vue -->
<script setup lang="ts"></script>

<template>
  <div class="relative h-20 sm:h-24 md:h-32 overflow-hidden flex flex-col items-center justify-center gap-2">
    <img src="/images/banner.jpg" class="absolute inset-0 w-full h-full object-cover" />
    <div class="absolute inset-0 bg-black/40"></div>

    <NuxtLink to="/" class="relative flex items-center gap-2">
      <span class="text-3xl md:text-3xl font-display tracking-wide text-brand">GREAT LAKES </span>
      <span class="text-3xl md:text-3xl font-display tracking-wide text-white">GIGS</span>
    </NuxtLink>
  </div>
</template>