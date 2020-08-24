<template>
  <v-container fluid>
    <ArticlesIndex :articles="articles">
      <template #title="{ article }">
        {{ article.title }}
      </template>

      <template #created="{ article }"/>

      <template #description="{ article }"/>

      <template #tags="{ article }"/>
    </ArticlesIndex>
  </v-container>
</template>

<script>
import { filter, includes } from 'lodash'
import ArticlesIndex from '@/components/ArticlesIndex'

export default {
  name: 'TagSpecific',
  components: {
    ArticlesIndex
  },
  async asyncData({ $content, params }) {
    const articles = await $content('articles')
      .only(['createdAt', 'path', 'title', 'description', 'tags'])
      .fetch()

    return {
      articles: filter(articles, article => includes(article.tags, params.tag))
    }
  }
}
</script>
