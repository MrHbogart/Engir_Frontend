<template>
  <section class="rounded-[28px] border border-slate-200 bg-white/70 p-6">
    <p class="text-center text-xs uppercase tracking-[0.4em] text-slate-500">Trusted by studios & bootcamps</p>
    <div class="mt-6 flex flex-wrap items-center justify-center gap-6 text-slate-500">
      <span
        v-for="logo in logos"
        :key="logo"
        class="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400"
      >
        {{ logo }}
      </span>
    </div>
  </section>
</template>

<script setup>
const logos = ['Atlas', 'FrameWorks', 'Helio Lab', 'Nova Arts', 'Northwind']
</script>
