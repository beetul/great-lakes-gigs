<!-- app/components/AppHeader.vue -->
<script setup lang="ts"></script>

<template>
  <div class="relative h-20 sm:h-24 md:h-32 overflow-hidden flex flex-col items-center justify-center gap-2">
    <img src="/images/banner.jpg" class="absolute inset-0 w-full h-full object-cover" />
    <div class="absolute inset-0 bg-black/40"></div>

    <NuxtLink to="/" class="relative flex items-center gap-2">
      <img
        src="/images/glg.png"
        alt="Great Lakes Gigs"
        class="h-24 md:h-28 w-auto"
      />
    </NuxtLink>
  </div>
</template>