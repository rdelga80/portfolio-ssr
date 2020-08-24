<template>
  <v-container fluid>
    <v-container fluid>
      <article>
        <h1 class="text-h2">
          {{ doc.title }}
        </h1>

        <v-flex pb-5>
          <Date :value="doc.createdAt"/>
        </v-flex>

        <nuxt-content
          class="text-body-1 pt-3"
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
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/variables';

.nuxt-content p {
  font-size: 2.6rem;
  letter-spacing: 0;
  line-height: 1rem;
}
</style>
