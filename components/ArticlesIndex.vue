<template>
  <v-container fluid>
    <v-layout
      v-for="(article, index) in articles"
      :key="index"
      class="article-container"
      column>
      <v-col>
        <v-flex>
          <n-link
            :to="article.path"
            tag="h2"
            class="text-h2 link">
            <slot
              name="title"
              :article="article"/>
          </n-link>
        </v-flex>

        <v-flex pb-4>
          <slot
            name="created"
            :article="article">
            <Date :value="article.createdAt"/>
          </slot>
        </v-flex>

        <v-flex class="image-container">
          <slot name="image">
            <img
              class="image"
              :src="article.headerImg"
              :alt="article.description"/>
          </slot>
        </v-flex>

        <v-flex class="text-body-1" py-5>
          <slot
            name="description"
            :article="article">
            {{ article.description }}
          </slot>
        </v-flex>

        <v-flex text-right>
          <strong>
            Tags:
          </strong>

          <slot
            :article="article"
            name="tags">
            <n-link
              v-for="(tag, tagIndex) in tags(article.tags)"
              :key="tagIndex"
              class="link"
              tag="span"
              :to="{ path: `tags/${tag}` }">
              {{ tag }}

              <span v-show="(tagIndex + 1) < tags(article.tags).length">
                /
              </span>
            </n-link>
          </slot>
        </v-flex>

        <v-flex
          v-if="(index + 1) < articles.length"
          class="article-divider">
          <hr/>
        </v-flex>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
import { split } from 'lodash'
import Date from '@/components/TheDate'

export default {
  name: 'ArticlesIndex',
  components: {
    Date
  },
  props: {
    articles: Array
  },
  methods: {
    tags(tags) {
      return split(tags, ',') || []
    }
  }
}
</script>

<style lang="scss" scoped>
.article {
  &-container {
    margin-bottom: 2rem;
  }

  &-divider {
    padding: 2rem 4rem;
    margin-top: 2rem;

    hr {
      border-color: rgba(white, 0.6);
    }
  }
}

.image-container {
  height: 100%;
  max-height: 300px;
  overflow: hidden;
  border: 2px solid white;

  img {
    width: 100%;
    margin-bottom: -6px;
    filter: opacity(60%);
  }
}
</style>
