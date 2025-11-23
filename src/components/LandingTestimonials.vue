<template>
  <section class="rounded-[28px] border border-slate-200 bg-white p-6 text-slate-700 shadow-lg shadow-slate-200/70">
    <header class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="text-xs uppercase tracking-[0.4em] text-slate-500">Loved by modern classrooms</p>
        <h3 class="text-2xl font-semibold text-slate-900">What our teachers & students say</h3>
      </div>
      <div class="flex items-center gap-2 text-xs">
        <button
          type="button"
          class="rounded-full border border-slate-200 px-3 py-1 transition hover:border-sky-300"
          @click="previous"
        >
          ←
        </button>
        <button
          type="button"
          class="rounded-full border border-slate-200 px-3 py-1 transition hover:border-sky-300"
          @click="next"
        >
          →
        </button>
      </div>
    </header>

    <figure class="mt-6 space-y-4">
      <blockquote class="text-lg text-slate-900">
        “{{ active.quote }}”
      </blockquote>
      <figcaption class="text-sm text-slate-500">
        <p class="font-semibold text-slate-800">{{ active.author }}</p>
        <p>{{ active.role }} · {{ active.org }}</p>
      </figcaption>
    </figure>

    <div class="mt-6 flex gap-2">
      <span
        v-for="(testimonial, index) in testimonials"
        :key="testimonial.author"
        class="h-1 flex-1 rounded-full"
        :class="index === activeIndex ? 'bg-sky-500' : 'bg-slate-200'"
      />
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const testimonials = [
  {
    quote:
      'Engir replaced five tools for our cinematography cohort. Schedules, invites, stream control — it all lives in one inspiring console.',
    author: 'Leila M.',
    role: 'Head of Film',
    org: 'Frame School'
  },
  {
    quote: 'I never miss a live session anymore. Automatic timezone reminders and replays help me keep my streak going.',
    author: 'Mateo M.',
    role: 'Product design student',
    org: 'Remote Design Lab'
  },
  {
    quote: 'Our teachers love the broadcast overlays and reliability. Parents noticed the upgrade instantly.',
    author: 'Ivy M.',
    role: 'Director',
    org: 'Atlas Academy'
  }
]

const activeIndex = ref(0)
let intervalId

const next = () => {
  activeIndex.value = (activeIndex.value + 1) % testimonials.length
}

const previous = () => {
  activeIndex.value = (activeIndex.value - 1 + testimonials.length) % testimonials.length
}

const active = computed(() => testimonials[activeIndex.value])

onMounted(() => {
  intervalId = window.setInterval(() => {
    next()
  }, 6000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>
