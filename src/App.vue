<template>
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900">
    <div class="pointer-events-none absolute inset-x-0 top-[-15%] h-[360px] bg-gradient-to-r from-sky-200/60 via-transparent to-indigo-200/40 blur-3xl" />
    <div class="pointer-events-none absolute bottom-[-25%] left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-sky-100/60 blur-3xl" />

    <header class="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 text-slate-900 backdrop-blur-xl shadow-sm">
      <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-6">
        <RouterLink to="/" class="group flex items-center gap-3">
          <img src="/engir-logo.svg" alt="Engir logo" class="h-10 w-10 transition group-hover:rotate-6" />
          <div>
            <p class="text-xs uppercase tracking-[0.4em] text-slate-500">Engir</p>
            <h1 class="text-xl font-semibold text-night-900">Learning Streams</h1>
          </div>
          <span class="rounded-full border border-sky-400/40 px-2 py-0.5 text-[10px] uppercase tracking-wide text-sky-500">Beta</span>
        </RouterLink>

        <nav class="hidden flex-1 items-center justify-center gap-2 text-sm lg:flex">
          <template v-for="link in navLinks" :key="link.label">
            <RouterLink
              v-if="!link.external"
              :to="link.to"
              class="rounded-full px-4 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-night-900"
              active-class="bg-slate-200/70 text-night-900"
            >
              {{ link.label }}
            </RouterLink>
            <a
              v-else
              :href="link.href"
              target="_blank"
              rel="noreferrer"
              class="rounded-full px-4 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-night-900"
            >
              {{ link.label }}
            </a>
          </template>
        </nav>

        <div class="flex items-center gap-2 text-sm">
          <button class="inline-flex items-center rounded-full border border-slate-200 px-3 py-2 text-slate-600 lg:hidden" @click="toggleMobileNav">
            Menu
          </button>
          <template v-if="auth.isAuthenticated">
            <span class="hidden rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 sm:inline-flex">
              {{ auth.user?.first_name || auth.user?.email }} · {{ auth.userRole }}
            </span>
            <RouterLink
              :to="auth.userRole === 'teacher' ? '/dashboard/teacher' : '/dashboard/student'"
              class="hidden rounded-full border border-slate-200 px-4 py-2 text-night-900 hover:border-sky-400 hover:text-sky-500 sm:inline-flex"
            >
              Console
            </RouterLink>
            <button
              type="button"
              class="rounded-full border border-rose-200 px-4 py-2 text-rose-600 transition hover:bg-rose-50"
              @click="handleLogout"
            >
              Sign out
            </button>
          </template>
          <template v-else>
            <RouterLink
              to="/login"
              class="rounded-full border border-slate-200 px-4 py-2 text-slate-700 transition hover:border-sky-400 hover:text-sky-500"
            >
              Sign in
            </RouterLink>
            <RouterLink
              to="/signup"
              class="hidden rounded-full border border-slate-200 px-4 py-2 text-slate-700 transition hover:border-sky-400 hover:text-sky-500 sm:inline-flex"
            >
              Create account
            </RouterLink>
            <button
              type="button"
              class="rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 px-5 py-2 text-white shadow-lg shadow-sky-200/70"
              @click="handlePrimaryCta"
            >
              Get started
            </button>
          </template>
        </div>
      </div>

      <Transition name="fade-slide">
        <div v-if="showMobileNav" class="border-t border-slate-200/60 bg-white/95 px-5 py-4 text-sm shadow-lg lg:hidden">
          <nav class="flex flex-col gap-2">
            <template v-for="link in navLinks" :key="link.label + '-mobile'">
              <RouterLink
                v-if="!link.external"
                :to="link.to"
                class="rounded-2xl px-4 py-3 text-slate-700 transition hover:bg-slate-100"
                @click="toggleMobileNav(false)"
              >
                {{ link.label }}
              </RouterLink>
              <a
                v-else
                :href="link.href"
                target="_blank"
                rel="noreferrer"
                class="rounded-2xl px-4 py-3 text-slate-700 transition hover:bg-slate-100"
                @click="toggleMobileNav(false)"
              >
                {{ link.label }}
              </a>
            </template>
            <RouterLink
              v-if="!auth.isAuthenticated"
              to="/signup"
              class="rounded-2xl border border-slate-200 px-4 py-3 text-center text-slate-700"
              @click="toggleMobileNav(false)"
            >
              Create account
            </RouterLink>
            <button
              v-if="!auth.isAuthenticated"
              type="button"
              class="rounded-2xl bg-gradient-to-r from-sky-400 to-indigo-500 px-4 py-3 text-white"
              @click="() => {
                toggleMobileNav(false)
                handlePrimaryCta()
              }"
            >
              Get started
            </button>
          </nav>
        </div>
      </Transition>
    </header>

    <main class="mx-auto min-h-[calc(100vh-200px)] w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <RouterView v-slot="{ Component }">
        <Transition name="fade-slide" mode="out-in">
          <component :is="Component" :key="$route.fullPath" />
        </Transition>
      </RouterView>
    </main>

    <footer class="border-t border-slate-200/70 bg-white/80 text-sm text-slate-600">
      <div class="mx-auto max-w-6xl px-5 py-10 sm:px-6">
        <div class="grid gap-8 md:grid-cols-4">
          <div>
            <div class="flex items-center gap-2 text-night-900">
              <img src="/engir-logo.svg" alt="Engir logo" class="h-8 w-8" />
              <div>
                <p class="text-xs uppercase tracking-[0.4em] text-slate-500">Engir</p>
                <p class="text-lg font-semibold">Learning Streams</p>
              </div>
            </div>
            <p class="mt-3 text-sm text-slate-500">Studio-quality live classrooms, scheduling, and replays in one console.</p>
            <div class="mt-4 flex gap-3 text-xs">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" class="text-slate-500 hover:text-sky-500">Twitter</a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" class="text-slate-500 hover:text-sky-500">LinkedIn</a>
              <a href="https://github.com" target="_blank" rel="noreferrer" class="text-slate-500 hover:text-sky-500">GitHub</a>
            </div>
          </div>
          <div v-for="column in footerLinks" :key="column.title">
            <p class="text-xs uppercase tracking-[0.4em] text-slate-500">{{ column.title }}</p>
            <ul class="mt-3 space-y-2 text-sm">
              <li v-for="item in column.items" :key="item.label">
                <RouterLink v-if="item.to" :to="item.to" class="text-slate-600 hover:text-night-900">{{ item.label }}</RouterLink>
                <a v-else :href="item.href" target="_blank" rel="noreferrer" class="text-slate-600 hover:text-night-900">
                  {{ item.label }}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {{ new Date().getFullYear() }} Engir. Learning without borders.</p>
          <div class="flex gap-3">
            <a href="#" class="hover:text-night-900">Privacy</a>
            <a href="#" class="hover:text-night-900">Terms</a>
            <a href="#" class="hover:text-night-900">Status</a>
          </div>
        </div>
      </div>
    </footer>

    <Teleport to="body">
      <Transition name="fade-slide">
        <div v-if="showRoleDialog" class="fixed inset-0 z-[60] flex items-center justify-center bg-night-900/30 px-4">
          <div class="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <header class="mb-4">
              <p class="text-xs uppercase tracking-[0.4em] text-slate-500">Choose your lane</p>
              <h3 class="mt-2 text-2xl font-semibold text-night-900">How do you plan to use Engir?</h3>
            </header>
            <div class="space-y-4">
              <button
                v-for="option in roleOptions"
                :key="option.role"
                type="button"
                class="w-full rounded-2xl border border-slate-200 px-4 py-4 text-left transition hover:border-sky-400 hover:bg-sky-50"
                @click="selectRole(option.role)"
              >
                <p class="text-sm uppercase tracking-[0.3em] text-slate-500">{{ option.badge }}</p>
                <p class="text-lg font-semibold text-night-900">{{ option.title }}</p>
                <p class="text-sm text-slate-500">{{ option.copy }}</p>
              </button>
            </div>
            <button type="button" class="mt-4 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-500" @click="closeRoleDialog">
              Maybe later
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'

import { useAuthStore } from '@/state/authStore'
import { useDashboardStore } from '@/state/dashboardStore'

const auth = useAuthStore()
const dashboard = useDashboardStore()
const router = useRouter()

const showRoleDialog = ref(false)
const showMobileNav = ref(false)

const roleOptions = [
  {
    role: 'teacher',
    badge: 'Teachers',
    title: 'Preview the broadcast desk',
    copy: 'Walk through classes, sessions, and enrollments. Publishing requires an account.'
  },
  {
    role: 'student',
    badge: 'Students',
    title: 'Preview the personal hub',
    copy: 'Explore upcoming sessions, replays, and reminders before signing up.'
  }
]

const footerLinks = [
  {
    title: 'Product',
    items: [
      { label: 'Landing', to: '/' },
      { label: 'Sessions', to: '/explore' },
      { label: 'Teacher desk', to: '/preview/teacher' }
    ]
  },
  {
    title: 'Teams',
    items: [
      { label: 'Student hub', to: '/preview/student' },
      { label: 'Docs', href: 'https://github.com' },
      { label: 'Roadmap', href: 'https://github.com' }
    ]
  },
  {
    title: 'Company',
    items: [
      { label: 'About', href: 'https://github.com' },
      { label: 'Support', href: 'mailto:hello@engir.app' },
      { label: 'Contact', href: 'mailto:hello@engir.app' }
    ]
  }
]

const navLinks = computed(() => {
  const teacherDestination = auth.userRole === 'teacher' ? '/dashboard/teacher' : '/preview/teacher'
  const studentDestination = auth.userRole === 'student' ? '/dashboard/student' : '/preview/student'
  return [
    { label: 'Product', to: '/' },
    { label: 'Sessions', to: '/explore' },
    { label: 'Teacher desk', to: teacherDestination },
    { label: 'Student hub', to: studentDestination },
    { label: 'Docs', href: 'https://github.com', external: true },
    { label: 'Pricing', href: '#', external: true }
  ]
})

const toggleMobileNav = (force) => {
  if (typeof force === 'boolean') {
    showMobileNav.value = force
  } else {
    showMobileNav.value = !showMobileNav.value
  }
}

const handleLogout = () => {
  auth.logout()
  dashboard.clear()
  router.push({ name: 'landing' })
}

const handlePrimaryCta = () => {
  if (auth.isAuthenticated) {
    router.push(auth.userRole === 'teacher' ? { name: 'teacher-dashboard' } : { name: 'student-dashboard' })
    return
  }
  showRoleDialog.value = true
}

const selectRole = (role) => {
  showRoleDialog.value = false
  if (auth.isAuthenticated) {
    router.push(role === 'teacher' ? { name: 'teacher-dashboard' } : { name: 'student-dashboard' })
    return
  }
  router.push(role === 'teacher' ? { name: 'teacher-preview' } : { name: 'student-preview' })
}

const closeRoleDialog = () => {
  showRoleDialog.value = false
}
</script>
