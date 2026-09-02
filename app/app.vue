<template>
  <div>
    <AppHeader />
    <NuxtPage />
    <footer class="bg-black border-t border-zinc-800 py-6 px-8 flex items-center justify-center gap-48">
      <NuxtLink to="/" class="text-zinc-500 text-sm font-semibold hover:text-zinc-300 transition">
        HOME
      </NuxtLink>
      <NuxtLink to="/about" class="text-zinc-500 text-sm font-semibold hover:text-zinc-300 transition">
        ABOUT
      </NuxtLink>
      <NuxtLink to="/archive" class="text-zinc-500 text-sm font-semibold hover:text-zinc-300 transition">
        PAST SHOWS
      </NuxtLink>
      <NuxtLink to="/add-show" class="text-zinc-500 text-sm font-semibold hover:text-zinc-300 transition">
        ADD SHOW
      </NuxtLink>
    </footer>
  </div>
</template>