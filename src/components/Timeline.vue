<script setup lang="ts">
import TimelineItem from "./TimelineItem.vue";
import { usePosts } from "../stores/posts";
import { periods } from "../constants";

const postsStore = usePosts();
</script>
<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period of periods"
        :class="{ 'is-active': period === postsStore.selectedPeriod }"
        :key="period"
        @click="postsStore.setSelectedPeriod(period)"
      >
        {{ period }}</a
      >
    </span>
  </nav>
  <TimelineItem
    v-for="post of postsStore.filteredPosts"
    :key="post.id"
    :post="post"
  />
</template>
