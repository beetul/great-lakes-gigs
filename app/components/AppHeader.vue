<script setup lang="ts"></script>
<template>
  <div class="relative h-24 md:h-32 overflow-hidden">
    <img src="/images/banner.jpg" class="absolute inset-0 w-full h-full object-cover" />
    <div class="absolute inset-0 bg-black/50"></div>

    <div class="relative flex items-center justify-between px-4 md:px-6 py-4">
      <NuxtLink to="/">
        <img src="/images/glg.png" alt="Great Lakes Gigs logo" class="h-10 md:h-14 w-auto" />
      </NuxtLink>

      <nav class="flex items-center gap-1.5 md:gap-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-2 py-1 md:px-4 md:py-2">
        <NuxtLink to="/" class="text-white text-xs md:text-sm font-sans hover:text-accentColor transition">
          HOME
        </NuxtLink>
        <NuxtLink to="/about" class="text-white text-xs md:text-sm font-sans hover:text-accentColor transition">
          ABOUT
        </NuxtLink>
        <NuxtLink to="/archive" class="text-white text-xs md:text-sm font-sans hover:text-accentColor transition">
          ARCHIVE
        </NuxtLink>
        <NuxtLink to="/add-show" class="text-white text-xs md:text-sm font-sans hover:text-accentColor transition nav-nowrap">
          ADD SHOW
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.nav-nowrap {
  white-space: nowrap;
}
</style>
