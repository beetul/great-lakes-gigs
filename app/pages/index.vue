<!-- app/pages/index.vue -->
<script setup lang="ts">
const supabase = useSupabaseClient()
const view = useState<'grid' | 'list'>('showView', () => 'grid')
const filtersOpen = ref(false)

const search = ref('')
const fromDate = ref('')
const toDate = ref('')
const cities = ref<string[]>([])
const genres = ref<string[]>([])
const tags = ref<string[]>([])
const price = ref<string | null>(null)
const page = ref(1)
const pageSize = 28

const { data: cityOptions } = await useAsyncData('city-options', async () => {
  const { data, error } = await supabase.rpc('distinct_cities')
  if (error) throw error
  return (data ?? []).filter(Boolean).sort()
})

const { data: genreOptions } = await useAsyncData('genre-options', async () => {
  const { data, error } = await supabase.rpc('distinct_genres')
  if (error) throw error

  const priority = ['emo', 'punk', 'hardcore', 'metalcore', 'metal', 'midwest emo', 'alternative']

  return (data ?? []).filter(Boolean).sort((a, b) => {
    const aIndex = priority.indexOf(a)
    const bIndex = priority.indexOf(b)
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex
    if (aIndex !== -1) return -1
    if (bIndex !== -1) return 1
    return a.localeCompare(b)
  })
})

const { data: tagOptions } = await useAsyncData('tag-options', async () => {
  const { data, error } = await supabase.rpc('distinct_tags')
  if (error) throw error

  const priority = ['all ages', 'regional', 'touring', 'festival', 'outdoors', 'diy']

  return (data ?? []).filter(Boolean).sort((a, b) => {
    const aIndex = priority.indexOf(a)
    const bIndex = priority.indexOf(b)
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex
    if (aIndex !== -1) return -1
    if (bIndex !== -1) return 1
    return a.localeCompare(b)
  })
})

const { data: shows } = await useAsyncData('upcoming-shows', async () => {
  let query = supabase.from('shows').select('*', { count: 'exact' })

  if (fromDate.value && toDate.value) {
    query = query.gte('show_date', fromDate.value).lte('show_date', toDate.value)
  } else {
    query = query.gte('show_date', new Date().toISOString().split('T')[0])
  }

  if (search.value) {
    query = query.or(`title.ilike.%${search.value}%,venue.ilike.%${search.value}%`)
  }

  if (cities.value.length) {
    query = query.or(cities.value.map(c => `city.ilike.${c.trim()}`).join(','))
  }

  if (genres.value.length) {
    query = query.overlaps('genres', genres.value)
  }

  if (tags.value.length) {
    query = query.overlaps('tags', tags.value)
  }

  if (price.value === 'free') {
    query = query.eq('price_type', 'free')
  } else if (price.value === 'pwyw') {
    query = query.eq('price_type', 'pwyw')
  } else if (price.value === '$15 and under') {
    query = query.eq('price_type', 'fixed').lte('price_min', 15)
  } else if (price.value === '$16-35') {
    query = query.eq('price_type', 'fixed').gte('price_min', 16).lte('price_min', 35)
  } else if (price.value === '$36-60') {
    query = query.eq('price_type', 'fixed').gte('price_min', 36).lte('price_min', 60)
  } else if (price.value === '$61+') {
    query = query.eq('price_type', 'fixed').gte('price_min', 61)
  }

  const from = (page.value - 1) * pageSize
  const to = from + pageSize - 1

  const { data, error, count } = await query
    .order('show_date', { ascending: true })
    .range(from, to)

  if (error) throw error
  return { rows: data ?? [], total: count ?? 0 }
}, { watch: [search, fromDate, toDate, cities, genres, tags, price, page] })

const totalPages = computed(() => Math.max(1, Math.ceil((shows.value?.total ?? 0) / pageSize)))

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

  if (range[0] > 2) {
    pages.push('ellipsis')
  }

  pages.push(...range)

  if (range[range.length - 1] < total - 1) {
    pages.push('ellipsis')
  }

  if (total > 1) {
    pages.push(total)
  }

  return pages
})

watch([search, fromDate, toDate, cities, genres, tags, price], () => {
  page.value = 1
})

useSeoMeta({
  title: 'Great Lakes Gigs',
  description: 'A compilation of upcoming live music from independent venues across Milwaukee, Chicago, and neighboring areas.',
})
</script>

<template>
  <div class="bg-black min-h-screen text-white">
    <div class="max-w-7xl mx-auto p-8">
      <div class="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
        <aside class="hidden md:block border-r border-zinc-800 pr-6 sticky top-8 self-start max-h-[calc(100vh-4rem)] overflow-y-auto">
          <FilterSidebar
            v-model:search="search"
            v-model:from-date="fromDate"
            v-model:to-date="toDate"
            v-model:cities="cities"
            v-model:genres="genres"
            v-model:tags="tags"
            v-model:price="price"
            :city-options="cityOptions ?? []"
            :genre-options="genreOptions ?? []"
            :tag-options="tagOptions ?? []"
          />
        </aside>

        <Teleport to="body">
          <Transition
            enter-active-class="transition-opacity duration-300 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div v-if="filtersOpen" class="fixed inset-0 z-50 md:hidden bg-black/70" @click="filtersOpen = false"></div>
          </Transition>

          <Transition
            enter-active-class="transition-transform duration-300 ease-out"
            enter-from-class="translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transition-transform duration-250 ease-in"
            leave-from-class="translate-x-0"
            leave-to-class="translate-x-full"
          >
            <div
              v-if="filtersOpen"
              class="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-black border-l border-zinc-800 p-6 overflow-y-auto z-50 md:hidden"
            >
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-lg font-display tracking-wide text-white">FILTERS</h2>
                <button @click="filtersOpen = false" class="text-zinc-400 hover:text-white transition">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="w-6 h-6">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <FilterSidebar
                v-model:search="search"
                v-model:from-date="fromDate"
                v-model:to-date="toDate"
                v-model:cities="cities"
                v-model:genres="genres"
                v-model:tags="tags"
                v-model:price="price"
                :city-options="cityOptions ?? []"
                :genre-options="genreOptions ?? []"
                :tag-options="tagOptions ?? []"
              />
            </div>
          </Transition>
        </Teleport>

        <main class="max-w-5xl">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
              <button
                @click="filtersOpen = true"
                aria-label="Open filters"
                class="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-zinc-700 text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
              </button>
              <h1 class="text-2xl font-display tracking-wide text-white">UPCOMING SHOWS</h1>
            </div>

            <div class="flex gap-1 bg-zinc-900 rounded-md p-1">
              <button
                @click="view = 'grid'"
                :class="view === 'grid' ? 'bg-brand text-black' : 'text-zinc-500'"
                class="p-1.5 rounded transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                </svg>
              </button>
              <button
                @click="view = 'list'"
                :class="view === 'list' ? 'bg-brand text-black' : 'text-zinc-500'"
                class="p-1.5 rounded transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="w-4 h-4">
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          <div v-if="shows?.rows.length === 0" class="text-zinc-500">no upcoming shows match your filters T_T</div>

          <TransitionGroup
            tag="div"
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
            move-class="transition duration-300 ease-in-out"
          >
            <template v-if="view === 'grid'">
              <ShowCard v-for="show in shows?.rows" :key="show.id" :show="show" />
            </template>
            <template v-else>
              <ShowListRow v-for="show in shows?.rows" :key="show.id" :show="show" />
            </template>
          </TransitionGroup>

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
                :class="page === p ? 'bg-brand text-black' : 'text-zinc-300 hover:bg-zinc-800'"
                class="w-9 h-9 rounded-lg text-sm font-semibold transition"
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
        </main>
      </div>
    </div>
  </div>
</template>