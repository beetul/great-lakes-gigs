<!-- app/components/ShowCard.vue -->
<script setup lang="ts">
const props = defineProps<{
  show: {
    id: string
    title: string
    venue: string
    city: string
    show_date: string
    show_time: string
    price_type: string
    price_min: number | null
    price_max: number | null
    price_display: string
    genres: string[]
    tags: string[]
    ticket_url: string
  }
}>()

const weekday = computed(() => {
  const d = new Date(props.show.show_date + 'T00:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()
})

const monthDay = computed(() => {
  const d = new Date(props.show.show_date + 'T00:00:00')
  return `${d.getMonth() + 1}.${d.getDate()}`
})
</script>

<template>
<a
  :href="show.ticket_url"
  target="_blank"
  rel="noopener noreferrer"
  class="flex items-center bg-zinc-900 border-l-4 border-accent mb-4 group hover:bg-zinc-800 transition"
>
  <div class="flex flex-col items-center justify-center px-6 py-4 min-w-[100px]">
    <p class="text-white font-black text-base tracking-wide">{{ weekday }}</p>
    <div class="w-8 h-px bg-zinc-600 my-1"></div>
    <p class="text-accent font-black text-xl">{{ monthDay }}</p>
  </div>

  <div class="flex-1 py-4 pr-4 border-l border-zinc-800 pl-4">
    <h3 class="text-xl font-display tracking-wide text-white group-hover:text-accent transition">
      {{ show.title }}
    </h3>
    <p class="text-zinc-400 text-base">
      <span class="text-emerald-300 font-bold">@ {{ show.venue }}</span> · {{ show.show_time }} · {{ show.price_display }}
    </p>

    <div class="flex gap-2 mt-2 flex-wrap">
      <span class="flex items-center gap-1 px-3 py-1 rounded-full border border-zinc-700 text-sm font-semibold text-zinc-300">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3.5 h-3.5">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/>
        </svg>
        {{ show.city }}
      </span>

      <span
        v-for="genre in show.genres"
        :key="genre"
        class="flex items-center gap-1 px-3 py-1 rounded-full border border-zinc-700 text-sm font-semibold text-zinc-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3.5 h-3.5">
          <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/>
        </svg>
        {{ genre }}
      </span>

      <span
        v-for="tag in show.tags"
        :key="tag"
        class="flex items-center gap-1 px-3 py-1 rounded-full border border-zinc-800 text-sm font-semibold text-zinc-400"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3.5 h-3.5">
          <path d="M20 10V8h-4V4h-2v4h-4V4H8v4H4v2h4v4H4v2h4v4h2v-4h4v4h2v-4h4v-2h-4v-4h4zm-6 4h-4v-4h4v4z"/>
        </svg>
        {{ tag }}
      </span>
    </div>
  </div>

  <div class="pr-6">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-zinc-600 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition">
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
  </div>
</a>
</template>