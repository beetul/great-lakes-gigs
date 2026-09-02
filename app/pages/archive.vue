<script setup lang="ts">
const supabase = useSupabaseClient()

useSeoMeta({
  title: 'Past Shows',
  description: 'An archive of past shows featured on Great Lakes Gigs',
})

const search = ref('')
const page = ref(1)
const pageSize = 45

const { data: pastShows } = await useAsyncData('past-shows', async () => {
  let query = supabase
    .from('shows')
    .select('id, title, venue, show_date, show_time, price_display, organizer', { count: 'exact' })
    .lt('show_date', new Date().toISOString().split('T')[0])

  if (search.value) {
    query = query.or(`title.ilike.%${search.value}%,venue.ilike.%${search.value}%`)
  }

  const from = (page.value - 1) * pageSize
  const to = from + pageSize - 1

  const { data, error, count } = await query
    .order('show_date', { ascending: false })
    .range(from, to)

  if (error) throw error
  return { rows: data ?? [], total: count ?? 0 }
}, { watch: [search, page] })

const totalPages = computed(() => Math.max(1, Math.ceil((pastShows.value?.total ?? 0) / pageSize)))

const pageNumbers = computed(() => {
  const total = totalPages.value
  const current = page.value
  const delta = 1

  const pages: (number | 'ellipsis')[] = []
  const range: number[] = []
  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    range.push(i)
  }

  pages.push(1)
  if (range[0] > 2) pages.push('ellipsis')
  pages.push(...range)
  if (range[range.length - 1] < total - 1) pages.push('ellipsis')
  if (total > 1) pages.push(total)

  return pages
})

watch(search, () => {
  page.value = 1
})

function weekday(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()
}

function monthDay(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' })
}
</script>

<template>
  <div class="bg-black min-h-screen text-white">
    <div class="max-w-6xl mx-auto px-8 pt-8 pb-16">
      <h1 class="text-3xl font-display tracking-wide text-white mb-4">PAST SHOWS</h1>

      <div class="relative w-full max-w-xs mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500">
          <circle cx="10.5" cy="10.5" r="7.5"></circle>
          <line x1="21" y1="21" x2="15.8" y2="15.8"></line>
        </svg>
        <input
          v-model="search"
          type="text"
          placeholder="search by artist/band or venue"
          class="w-full bg-zinc-900 border border-zinc-700 rounded-sm pl-3 pr-9 py-2 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-brandColor"
        />
      </div>

      <div v-if="pastShows?.rows.length === 0" class="text-zinc-500">No past shows match your search.</div>

      <div v-else class="overflow-x-auto">
        <div class="min-w-[700px]">
          <div class="grid grid-cols-[110px_70px_1fr_150px_100px_120px] gap-4 py-3 px-2 border-b border-zinc-700 text-xs font-bold text-zinc-400 tracking-widest">
            <div>DATE</div>
            <div>TIME</div>
            <div>LINEUP</div>
            <div>VENUE</div>
            <div>PRICE</div>
            <div class="hidden sm:block">ORGANIZER(S)</div>
          </div>

          <div
            v-for="(show, index) in pastShows?.rows"
            :key="show.id"
            :class="index % 2 === 0 ? 'bg-zinc-900' : 'bg-black'"
            class="grid grid-cols-[110px_70px_1fr_150px_100px_120px] gap-4 py-4 px-2 items-center text-zinc-400 text-sm"
          >
            <div>
              <p class="text-xs tracking-wide">{{ weekday(show.show_date) }}</p>
              <p>{{ monthDay(show.show_date) }}</p>
            </div>

            <div>
              {{ show.show_time }}
            </div>

            <div>
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

      <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-8">
        <button
          :disabled="page === 1"
          @click="page--"
          class="flex items-center justify-center w-9 h-9 text-zinc-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>

        <template v-for="(p, i) in pageNumbers" :key="i">
          <span v-if="p === 'ellipsis'" class="px-2 text-zinc-600 text-sm">…</span>
          <button
            v-else
            @click="page = p"
            :class="page === p ? 'text-brandColor' : 'text-zinc-300'"
            class="w-9 h-9 rounded-sm text-sm transition"
          >
            {{ p }}
          </button>
        </template>

        <button
          :disabled="page === totalPages"
          @click="page++"
          class="flex items-center justify-center w-9 h-9 text-zinc-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>