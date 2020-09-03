<template>
  <v-container fluid>
    <ArticlesIndex :articles="articles">
      <template #title="{ article }">
        {{ article.title }}
      </template>

      <template #image="{ article }"/>

      <template #created="{ article }"/>

      <template #description="{ article }"/>

      <template #tags="{ article }"/>
    </ArticlesIndex>
  </v-container>
</template>

<script>
import { split } from 'lodash'
import ArticlesIndex from '@/components/ArticlesIndex'

export default {
  name: 'PagesIndex',
  components: {
    ArticlesIndex
  },
  async asyncData({ $content }) {
    const articles = await $content('articles')
      .only(['createdAt', 'path', 'title', 'description', 'tags', 'headerImg'])
      .sortBy('createdAt', 'desc')
      .fetch()

    return {
      articles
    }
  },

  methods: {
    tags(tags) {
      return split(tags, ',') || []
    },
    translateDate(dateUTC) {
      return new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(new Date(dateUTC))
    }
  },
  head() {
    return {
      title: 'Home'
    }
  }
}
</script>
