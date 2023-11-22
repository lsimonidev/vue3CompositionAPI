<script setup lang="ts">
import { ref, computed } from "vue";
import { TimelinePost, today, thisWeek, thisMonth } from "../posts";
import { DateTime } from "luxon";
import TimelineItem from "./TimelineItem.vue";
import { usePosts } from "../stores/posts";

const periods = ["Today", "This Week", "This Month"] as const;
type Period = (typeof periods)[number];

const selectedPeriod = ref<Period>("Today");

function selectPeriod(period: Period) {
  selectedPeriod.value = period;
}

const postsStore = usePosts();

const posts = computed<TimelinePost[]>(() => {
  return [today, thisWeek, thisMonth]
    .map((post) => {
      return { ...post, created: DateTime.fromISO(post.created) };
    })
    .filter((post) => {
      if (selectedPeriod.value === "Today") {
        return post.created >= DateTime.now().minus({ day: 1 });
      }
      if (selectedPeriod.value === "This Week") {
        return post.created >= DateTime.now().minus({ week: 1 });
      }
      return post;
    });
});
</script>
<template>
  <span>{{ postsStore.getState().foo }}</span>
  <button @click="postsStore.updateFoo('bar')">update</button>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period of periods"
        :class="{ 'is-active': period === selectedPeriod }"
        :key="period"
        @click="selectPeriod(period)"
      >
        {{ period }}</a
      >
    </span>
  </nav>
  <TimelineItem v-for="post of posts" :key="post.id" :post="post" />
</template>
