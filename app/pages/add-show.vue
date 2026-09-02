<script setup lang="ts">
const supabase = useSupabaseClient()

useSeoMeta({
  title: 'Add Show',
  description: 'Submit a show you want listed on Great Lakes Gigs',
})

const title = ref('')
const venue = ref('')
const city = ref('')
const showDate = ref('')
const showTime = ref('')
const organizer = ref('')
const ticketUrl = ref('')

const priceType = ref<'fixed' | 'free' | 'pwyc'>('fixed')
const priceMin = ref<number | null>(null)
const priceMax = ref<number | null>(null)
const priceDisplay = ref('')

const genreInput = ref('')
const genres = ref<string[]>([])
const tagInput = ref('')
const tags = ref<string[]>([])

function addGenre() {
  const v = genreInput.value.trim().toLowerCase()
  if (v && !genres.value.includes(v)) genres.value = [...genres.value, v]
  genreInput.value = ''
}
function removeGenre(g: string) {
  genres.value = genres.value.filter(x => x !== g)
}
function addTag() {
  const v = tagInput.value.trim().toLowerCase()
  if (v && !tags.value.includes(v)) tags.value = [...tags.value, v]
  tagInput.value = ''
}
function removeTag(t: string) {
  tags.value = tags.value.filter(x => x !== t)
}

const submitting = ref(false)
const submitted = ref(false)
const errorMsg = ref('')

async function handleSubmit() {
  errorMsg.value = ''

  if (!title.value || !venue.value || !city.value || !showDate.value) {
    errorMsg.value = 'Please complete all required fields.'
    return
  }

  submitting.value = true

  const { error } = await supabase.from('shows').insert({
    title: title.value,
    venue: venue.value,
    city: city.value.toLowerCase(),
    show_date: showDate.value,
    show_time: showTime.value || null,
    organizer: organizer.value || null,
    ticket_url: ticketUrl.value || null,
    price_type: priceType.value,
    price_min: priceType.value === 'fixed' ? priceMin.value : null,
    price_max: priceType.value === 'fixed' ? priceMax.value : null,
    price_display: priceDisplay.value || (priceType.value === 'free' ? 'FREE' : priceType.value === 'pwyc' ? 'PWYC' : ''),
    genres: genres.value,
    tags: tags.value,
    status: 'pending',
  })

  submitting.value = false

  if (error) {
    console.error('Supabase error:', error)
    errorMsg.value = 'Something went wrong submitting your show. Try again?'
    return
  }

  submitted.value = true
}

function resetForm() {
  title.value = ''
  venue.value = ''
  city.value = ''
  showDate.value = ''
  showTime.value = ''
  organizer.value = ''
  ticketUrl.value = ''
  priceType.value = 'fixed'
  priceMin.value = null
  priceMax.value = null
  priceDisplay.value = ''
  genres.value = []
  tags.value = []
  errorMsg.value = ''
  submitted.value = false
}
</script>

<template>
  <div class="bg-black min-h-screen text-white">
    <div class="max-w-4xl mx-auto px-8 pt-8 pb-16">
      <h1 class="text-3xl font-display tracking-wide text-white mb-2">ADD A SHOW</h1>
      <p class="text-zinc-400 text-md mb-8">
        Submitted shows are reviewed before they get posted. <br> 
        *required field
      </p>

      <div v-if="submitted" class="bg-[#E8D4F0] rounded-sm p-8 text-center">
        <p class="text-purple-900 font-bold text-lg mb-2">Show submitted!</p>
        <p class="text-purple-800 text-sm mb-6">Thanks for your submission! We'll review it and get it posted very soon.</p>
        <button
          @click="resetForm"
          class="px-8 bg-purple-600 text-white font-bold py-3 rounded-sm hover:bg-purple-700 transition"
        >
          Add Another Show
        </button>
      </div>

      <form v-else @submit.prevent="handleSubmit" class="bg-[#E8D4F0] rounded-sm p-8 space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-[160px_1fr] items-start gap-y-4 gap-x-6">
          <label class="text-sm font-semibold text-zinc-800 pt-2">Lineup *</label>
          <div>
            <input
              v-model="title"
              type="text"
              class="w-full bg-white border border-zinc-300 rounded-sm px-3 py-2 text-black text-sm focus:outline-none focus:border-purple-500"
            />
            <p class="text-xs text-zinc-600 mt-1">e.g. "Tiny Voices + Garden Home + Snag"</p>
          </div>

          <label class="text-sm font-semibold text-zinc-800 pt-2">Venue *</label>
          <div>
            <input
              v-model="venue"
              type="text"
              class="w-full bg-white border border-zinc-300 rounded-sm px-3 py-2 text-black text-sm focus:outline-none focus:border-purple-500"
            />
            <p class="text-xs text-zinc-600 mt-1">e.g. "Cactus Club"</p>
          </div>

          <label class="text-sm font-semibold text-zinc-800 pt-2">City *</label>
          <div>
            <input
              v-model="city"
              type="text"
              class="w-full bg-white border border-zinc-300 rounded-sm px-3 py-2 text-black text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <label class="text-sm font-semibold text-zinc-800 pt-2">Date *</label>
          <div>
            <input
              v-model="showDate"
              type="date"
              class="w-full bg-white border border-zinc-300 rounded-sm px-3 py-2 text-black text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <label class="text-sm font-semibold text-zinc-800 pt-2">Time</label>
          <div>
            <input
              v-model="showTime"
              type="text"
              class="w-full bg-white border border-zinc-300 rounded-sm px-3 py-2 text-black text-sm focus:outline-none focus:border-purple-500"
            />
            <p class="text-xs text-zinc-600 mt-1">e.g. "8:00pm" or "doors 6:30 / music 7"</p>
          </div>

          <label class="text-sm font-semibold text-zinc-800 pt-2">Organizer</label>
          <div>
            <input
              v-model="organizer"
              type="text"
              class="w-full bg-white border border-zinc-300 rounded-sm px-3 py-2 text-black text-sm focus:outline-none focus:border-purple-500"
            />
            <p class="text-xs text-zinc-600 mt-1">e.g. "The Basement Collective" or "Kickstand Productions"</p>
          </div>

          <label class="text-sm font-semibold text-zinc-800 pt-2">Ticket URL</label>
          <div>
            <input
              v-model="ticketUrl"
              type="url"
              placeholder="https://..."
              class="w-full bg-white border border-zinc-300 rounded-sm px-3 py-2 text-black text-sm focus:outline-none focus:border-purple-500"
            />
            <p class="text-xs text-zinc-600 mt-1">Link to tickets, venue event page, or social media post</p>
          </div>
        </div>

        <div class="border-t border-purple-300 pt-6 space-y-4">
          <label class="text-sm font-semibold text-zinc-800 block">Price</label>
          <select
            v-model="priceType"
            class="w-32 bg-white border border-zinc-300 rounded-sm px-3 py-2 text-black text-sm focus:outline-none focus:border-purple-500"
          >
            <option value="fixed">Set Price</option>
            <option value="free">Free</option>
            <option value="pwyc">PWYC</option>
          </select>

          <div v-if="priceType === 'fixed'" class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs text-zinc-600 mb-1 block">Min price ($)</label>
              <input
                v-model.number="priceMin"
                type="number"
                class="w-full bg-white border border-zinc-300 rounded-sm px-3 py-2 text-black text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label class="text-xs text-zinc-600 mb-1 block">Max price ($, OPTIONAL)</label>
              <input
                v-model.number="priceMax"
                type="number"
                class="w-full bg-white border border-zinc-300 rounded-sm px-3 py-2 text-black text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label class="text-xs text-zinc-600 mb-1 block">
              Exact price to display (e.g. "$20, FREE, PWYC, $10 adv / $15 dos")
            </label>
            <input
              v-model="priceDisplay"
              type="text"
              :placeholder="priceType === 'free' ? 'FREE' : priceType === 'pwyc' ? 'PWYC, $10 suggested donation' : '$20'"
              class="w-full bg-white border border-zinc-300 rounded-sm px-3 py-2 text-black text-sm focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div class="border-t border-purple-300 pt-6">
          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="text-sm font-semibold text-zinc-800 mb-2 block">Genres</label>
              <p class="text-xs text-zinc-600 mb-2">e.g. "emo", "metal", "hardcore"</p>
              <input
                v-model="genreInput"
                @keydown.enter.prevent="addGenre"
                type="text"
                placeholder="type a genre, then press enter"
                class="w-full bg-white border border-zinc-300 rounded-sm px-3 py-2 text-black text-sm focus:outline-none focus:border-purple-500 mb-2"
              />
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="g in genres"
                  :key="g"
                  class="flex items-center gap-1 px-3 py-1 rounded-full border border-zinc-400 bg-white text-sm text-zinc-700"
                >
                  {{ g }}
                  <button type="button" @click="removeGenre(g)" class="text-zinc-500 hover:text-black">×</button>
                </span>
              </div>
            </div>

            <div>
              <label class="text-sm font-semibold text-zinc-800 mb-2 block">Tags</label>
              <p class="text-xs text-zinc-600 mb-2">e.g. "all ages", "21+", "touring"</p>
              <input
                v-model="tagInput"
                @keydown.enter.prevent="addTag"
                type="text"
                placeholder="type any other relevant info, then press enter"
                class="w-full bg-white border border-zinc-300 rounded-sm px-3 py-2 text-black text-sm focus:outline-none focus:border-purple-500 mb-2"
              />
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="t in tags"
                  :key="t"
                  class="flex items-center gap-1 px-3 py-1 rounded-full border border-zinc-300 bg-white text-sm text-zinc-600"
                >
                  {{ t }}
                  <button type="button" @click="removeTag(t)" class="text-zinc-500 hover:text-black">×</button>
                </span>
              </div>
            </div>
          </div>
        </div>

        <p v-if="errorMsg" class="text-red-600 text-sm">{{ errorMsg }}</p>

        <div class="flex justify-center">
          <button
            type="submit"
            :disabled="submitting"
            class="px-8 bg-purple-600 text-white font-bold py-3 rounded-sm hover:bg-purple-700 disabled:opacity-50 transition"
          >
            {{ submitting ? 'Submitting...' : 'Submit' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>