<script setup lang="ts">
const supabase = useSupabaseClient()

useSeoMeta({
  title: 'Past Shows',
  description: 'An archive of past shows featured on Great Lakes Gigs',
})

const search = ref('')

const { data: pastShows } = await useAsyncData('past-shows', async () => {
  let query = supabase
    .from('shows')
    .select('id, title, venue, show_date, show_time, price_display, organizer')
    .lt('show_date', new Date().toISOString().split('T')[0])

  if (search.value) {
    query = query.or(`title.ilike.%${search.value}%,venue.ilike.%${search.value}%`)
  }

  const { data, error } = await query.order('show_date', { ascending: false })
  if (error) throw error
  return data ?? []
}, { watch: [search] })

function weekday(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()
}

function monthDay(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<template>
  <div class="bg-black min-h-screen text-white">
    <div class="max-w-6xl mx-auto px-8 pt-8 pb-16">
      <h1 class="text-3xl font-display tracking-wide text-white mb-4">PAST SHOWS</h1>

      <div class="relative w-full max-w-xs mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500">
          <circle cx="10.5" cy="10.5" r="7.5"></circle>
          <line x1="21" y1="21" x2="15.8" y2="15.8"></line>
        </svg>
        <input
          v-model="search"
          type="text"
          placeholder="search by artist, band, or venue"
          class="w-full bg-zinc-900 border border-zinc-700 rounded-lg pl-9 pr-3 py-2 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-brand"
        />
      </div>

      <div v-if="pastShows?.length === 0" class="text-zinc-500">No past shows match your search.</div>

      <div v-else>
        <div class="grid grid-cols-[110px_70px_1fr_150px_100px_120px] gap-4 py-3 px-2 border-b border-zinc-700 text-xs font-bold text-zinc-400 tracking-widest">
          <div>DATE</div>
          <div>TIME</div>
          <div>EVENT</div>
          <div>VENUE</div>
          <div>PRICE</div>
          <div class="hidden sm:block">ORGANIZER(S)</div>
        </div>

        <div
          v-for="(show, index) in pastShows"
          :key="show.id"
          :class="index % 2 === 0 ? 'bg-zinc-900' : 'bg-black'"
          class="grid grid-cols-[110px_70px_1fr_150px_100px_120px] gap-4 py-4 px-2 items-center text-zinc-400 text-sm"
        >
          <div>
            <p class="text-xs tracking-wide">{{ weekday(show.show_date) }}</p>
            <p class="font-bold">{{ monthDay(show.show_date) }}</p>
          </div>

          <div>
            {{ show.show_time }}
          </div>

          <div class="font-bold">
            {{ show.title }}
          </div>

          <div>
            {{ show.venue }}
          </div>

          <div>
            {{ show.price_display }}
          </div>

          <div class="hidden sm:block">
            {{ show.organizer }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>