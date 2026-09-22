<script setup lang="ts"></script>

<template>
  <div class="relative isolate">
    <nav class="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-6 py-3 bg-black/25 backdrop-blur-md border-b border-white/10">
      <NuxtLink to="/">
        <img src="/images/glg.png" alt="Great Lakes Gigs logo" class="h-9 md:h-12 w-auto" />
      </NuxtLink>

      <div class="flex items-center gap-4 md:gap-6">
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
      </div>
    </nav>

    <div class="relative h-32 md:h-44 overflow-hidden transform-gpu">
      <img src="/images/banner.jpg" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-black/60"></div>
    </div>
  </div>
</template>

<style scoped>
.nav-nowrap {
  white-space: nowrap;
}
</style>
