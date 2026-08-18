<script setup lang="ts">
defineProps<{
  cityOptions: string[]
  genreOptions: string[]
  tagOptions: string[]
}>()

const search = defineModel<string>('search', { required: true })
const fromDate = defineModel<string>('fromDate', { required: true })
const toDate = defineModel<string>('toDate', { required: true })
const cities = defineModel<string[]>('cities', { required: true })
const genres = defineModel<string[]>('genres', { required: true })
const tags = defineModel<string[]>('tags', { required: true })
const price = defineModel<string | null>('price', { required: true })

const genresExpanded = ref(false)
const tagsExpanded = ref(false)

const priceOptions = ['free', 'pwyw', '$15 and under', '$16-35', '$36-60', '$61+']

function toggleCity(value: string) {
  cities.value = cities.value.includes(value)
    ? cities.value.filter(v => v !== value)
    : [...cities.value, value]
}

function toggleGenre(value: string) {
  genres.value = genres.value.includes(value)
    ? genres.value.filter(v => v !== value)
    : [...genres.value, value]
}

function toggleTag(value: string) {
  tags.value = tags.value.includes(value)
    ? tags.value.filter(v => v !== value)
    : [...tags.value, value]
}
</script>

<template>
  <aside class="space-y-6">
    <div>
      <h3 class="text-xs font-bold text-zinc-400 tracking-widest mb-2">SEARCH</h3>
      <input
        v-model="search"
        type="text"
        placeholder="search by artist, band, or venue"
        class="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-brand"
      />
    </div>

    <div class="border-t border-zinc-800 pt-6">
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-xs font-bold text-zinc-400 tracking-widest">WHEN</h3>
        <button
          v-if="fromDate || toDate"
          @click="fromDate = ''; toDate = ''"
          class="text-xs text-zinc-500 hover:text-brand transition"
        >
          clear dates
        </button>
      </div>
      <div class="flex flex-col gap-3">
        <div>
          <label class="text-xs text-zinc-500 mb-1 block">From</label>
          <input
            type="date"
            v-model="fromDate"
            class="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-brand"
            style="color-scheme: dark;"
          />
        </div>
        <div>
          <label class="text-xs text-zinc-500 mb-1 block">To</label>
          <input
            type="date"
            v-model="toDate"
            class="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-brand"
            style="color-scheme: dark;"
          />
        </div>
      </div>
    </div>

    <div class="border-t border-zinc-800 pt-6">
      <h3 class="text-xs font-bold text-zinc-400 tracking-widest mb-2">CITY</h3>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="c in cityOptions"
          :key="c"
          @click="toggleCity(c)"
          :class="cities.includes(c) ? 'bg-brand text-black border-brand' : 'text-zinc-300 border-zinc-700 hover:border-zinc-500'"
          class="px-3 py-1.5 rounded-full border text-sm font-semibold transition"
        >
          {{ c }}
        </button>
      </div>
    </div>

    <div class="border-t border-zinc-800 pt-6">
      <h3 class="text-xs font-bold text-zinc-400 tracking-widest mb-2">GENRES</h3>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="g in (genresExpanded ? genreOptions : genreOptions.slice(0, 10))"
          :key="g"
          @click="toggleGenre(g)"
          :class="genres.includes(g) ? 'bg-brand text-black border-brand' : 'text-zinc-300 border-zinc-700 hover:border-zinc-500'"
          class="px-3 py-1.5 rounded-full border text-sm font-semibold transition"
        >
          {{ g }}
        </button>
      </div>
      <button
        v-if="genreOptions.length > 10"
        @click="genresExpanded = !genresExpanded"
        class="text-xs text-zinc-500 hover:text-brand transition mt-2"
      >
        {{ genresExpanded ? '− show less' : `+ more genres (${genreOptions.length - 10})` }}
      </button>
    </div>

    <div class="border-t border-zinc-800 pt-6">
      <h3 class="text-xs font-bold text-zinc-400 tracking-widest mb-2">TAGS</h3>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="t in (tagsExpanded ? tagOptions : tagOptions.slice(0, 6))"
          :key="t"
          @click="toggleTag(t)"
          :class="tags.includes(t) ? 'bg-brand text-black border-brand' : 'text-zinc-300 border-zinc-700 hover:border-zinc-500'"
          class="px-3 py-1.5 rounded-full border text-sm font-semibold transition"
        >
          {{ t }}
        </button>
      </div>
      <button
        v-if="tagOptions.length > 6"
        @click="tagsExpanded = !tagsExpanded"
        class="text-xs text-zinc-500 hover:text-brand transition mt-2"
      >
        {{ tagsExpanded ? '− show less' : `+ more tags (${tagOptions.length - 6})` }}
      </button>
    </div>

    <div class="border-t border-zinc-800 pt-6">
      <h3 class="text-xs font-bold text-zinc-400 tracking-widest mb-2">PRICE</h3>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="opt in priceOptions"
          :key="opt"
          @click="price = price === opt ? null : opt"
          :class="price === opt ? 'bg-brand text-black border-brand' : 'text-zinc-300 border-zinc-700 hover:border-zinc-500'"
          class="px-3 py-1.5 rounded-full border text-sm font-semibold transition"
        >
          {{ opt }}
        </button>
      </div>
    </div>
  </aside>
</template>