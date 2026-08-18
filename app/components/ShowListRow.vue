<script setup lang="ts">
const props = defineProps<{
  show: {
    id: string
    title: string
    venue: string
    show_date: string
    price_display: string
    ticket_url: string
  }
}>()

const weekday = computed(() => {
  const d = new Date(props.show.show_date + 'T00:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()
})

const monthDay = computed(() => {
  const d = new Date(props.show.show_date + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
})
</script>

<template>
<a
  :href="show.ticket_url"
  target="_blank"
  rel="noopener noreferrer"
  class="flex items-center gap-6 py-4 border-b border-zinc-800 group hover:bg-zinc-900 transition px-2"
>
  <div class="min-w-[70px]">
    <p class="text-zinc-500 text-xs font-semibold tracking-wide">{{ weekday }}</p>
    <p class="text-accent font-bold text-sm">{{ monthDay }}</p>
  </div>

  <div class="flex-1">
    <h3 class="text-white font-bold group-hover:text-accent transition">
      {{ show.title }}
    </h3>
    <p class="text-zinc-500 text-sm">
      {{ show.venue }} · {{ show.price_display }}
    </p>
  </div>

  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-zinc-600 group-hover:text-accent transition">
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
</a>
</template>