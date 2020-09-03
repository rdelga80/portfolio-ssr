<template>
  <v-container fluid>
    <v-container fluid>
      <article class="slug-article">
        <div class="doc-image">
          <img
            :src="doc.headerImg"
            :alt="doc.description"/>
        </div>

        <h1 class="text-h2">
          {{ doc.title }}
        </h1>

        <v-flex pb-5>
          <Date :value="doc.createdAt"/>
        </v-flex>

        <nuxt-content
          class="pt-3 pb-5"
          :document="doc"/>

        <strong>
          Tags:
        </strong>

        <n-link
          v-for="(tag, tagIndex) in tags(doc.tags)"
          :key="tagIndex"
          class="link"
          tag="span"
          :to="{ path: `tags/${tag}` }">
          {{ tag }}

          <span v-show="(tagIndex + 1) < tags(doc.tags).length">
            /
          </span>
        </n-link>
      </article>
    </v-container>
  </v-container>
</template>

<script>
import Date from '@/components/TheDate'
import { formatTags } from '@/assets/js/helpers'

export default {
  name: 'Articles',
  components: {
    Date
  },
  async asyncData({ $content, params }) {
    const doc = await $content('articles', (params.slug || 'index')).fetch()

    return { doc }
  },
  methods: {
    tags(tagsValues) {
      return formatTags(tagsValues)
    }
  },
  head() {
    return {
      title: this.doc.title,
      meta: [
        { property: 'og:title', content: this.doc.title },
        { property: 'og:image', content: this.doc.headerImg },
        { property: 'og:description', content: this.doc.description.slice(0, 55) },
        { property: 'og:type', content: 'article' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.slug-article {
  margin-bottom: 80px;
}

.doc-image {
  height: 300px;
  overflow: hidden;
  border: 2px solid white;
  margin-bottom: 1rem;

  img {
    width: 100%;
    margin-top: -4%;
    filter: opacity(60%);
  }
}
</style>
