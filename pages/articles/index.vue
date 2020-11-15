<template>
  <div class="container">
    <h2>Articles</h2>

    <nuxt-link
      v-for="(article, index) in articles"
      :key="index"
      class="article-container"
      :to="article.path"
      tag="div">
      <div class="format-date">
        {{ convertDate(article.createdAt) }}
      </div>

      <h3 class="text-h3">
        {{ article.title }}
      </h3>

      <p>
        {{ article.description }}... [more]
      </p>
    </nuxt-link>
  </div>
</template>

<script>
import { formatDate } from '@/assets/js/date'

export default {
  name: 'ArticlesHome',
  async asyncData({ $content }) {
    const articles = await $content('articles')
      .only(['createdAt', 'path', 'title', 'description', 'tags'])
      .sortBy('createdAt', 'desc')
      .fetch()

    return {
      articles
    }
  },
  methods: {
    convertDate(date) {
      return formatDate(date)
    }
  },
  head() {
    return {
      title: 'Articles',
      meta: [
        { property: 'og:title', content: 'Articles' },
        { property: 'og:description', content: 'Index of all Articles' },
        { property: 'og:type', content: 'article' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.article-container {
  margin-top: 1rem;
}

.format-date {
  width: 100%;
  text-align: right;
}

p {
  font-size: 1.25rem;
}
</style>
