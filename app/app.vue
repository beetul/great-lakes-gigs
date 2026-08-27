<template>
  <div>
    <AppHeader />
    <NuxtPage />
    <footer class="bg-black border-t border-zinc-800 py-6 px-8 flex items-center justify-end gap-8">
      <NuxtLink to="/" class="text-zinc-500 text-sm font-semibold hover:text-brandColor transition">
        HOME
      </NuxtLink>
      <NuxtLink to="/about" class="text-zinc-500 text-sm font-semibold hover:text-brandColor transition">
        ABOUT
      </NuxtLink>
      <NuxtLink to="/archive" class="text-zinc-500 text-sm font-semibold hover:text-brandColor transition">
        PAST SHOWS
      </NuxtLink>
    </footer>
  </div>
</template>