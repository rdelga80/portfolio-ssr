<template>
  <aside class="px-5 pt-1">
    <v-container class="sidebar-container">
      <v-layout column>
        <v-col mb-4>
          <n-link to="/" tag="div">
            <v-flex class="nav-name text-h4 font-weight-bold link">
              Ricardo Delgado
            </v-flex>

            <v-flex class="text-subtitle-1">
              Web Developer
            </v-flex>
          </n-link>
        </v-col>

        <v-col>
          <v-flex text-center>
            <v-icon
              v-for="icon in icons"
              :key="icon"
              dark
              class="sidebar-icon">
              {{ icon }}
            </v-icon>
          </v-flex>
        </v-col>

        <v-col column mb-5>
          <v-flex
            v-for="skill in skills"
            :key="skill"
            text-subtitle-1
            mb-2>
            {{ skill }}
          </v-flex>
        </v-col>

        <v-col mb-5>
          Available for:

          <ul>
            <li>Testing Consultation</li>
            <li>Teach VueJs Testing</li>
            <li>VueJS Projects</li>
            <li>VueJS Consolutation and Lessons</li>
          </ul>

          <v-flex
            text-center
            mt-5>
            Contact:
          </v-flex>

          <v-flex
            text-subtitle-2
            text-center
            mt-1
            pa-2
            style="border: 1px solid rgba(255, 255, 255, 0.6);">
            ricdelgado80

            <br/>

            gmail [dot] com
          </v-flex>
        </v-col>

        <v-col>
          <v-flex class="text-title text-decoration-underline mt-3 mb-1">
            Recent Articles
          </v-flex>
        </v-col>

        <v-col
          v-for="(article, index) in articles"
          :key="index"
          mb-5>
          <v-flex>
            <n-link
              :to="article.path"
              tag="div"
              class="link text-title font-weight-bold">
              {{ article.title }}
            </n-link>
          </v-flex>

          <v-flex>
            <Date :value="article.createdAt"/>
          </v-flex>
        </v-col>

        <v-col>
          <v-flex text-decoration-underline>
            Tags:
          </v-flex>

          <v-flex>
            <v-row justify="start" no-gutters>
              <n-link
                v-for="(tag, index) in tags"
                :key="index"
                tag="div"
                class="px-1 link"
                :to="{ name: 'tags-tag', params: { tag } }">
                {{ tag }}
              </n-link>
            </v-row>
          </v-flex>
        </v-col>
      </v-layout>
    </v-container>
  </aside>
</template>

<script>
import { compact, flatMap, split, uniq } from 'lodash'
import Date from '@/components/TheDate'

export default {
  name: 'LayoutSidebar',
  components: {
    Date
  },
  data: () => ({
    articles: [],
    skills: [
      'VueJS Developer',
      'Vuex Architecture',
      'CDD: Component Driven Development',
      'TDD: Test Driven Development',
      'CSS, Sass, Scss',
      'Vuetify, Bulman, Bootstrap'
    ],
    icons: [
      'mdi-vuejs',
      'mdi-nuxt',
      'mdi-language-javascript',
      'mdi-nodejs',
      'mdi-language-html5',
      'mdi-language-css3'
    ]
  }),
  computed: {
    tags() {
      const tags = compact(
        flatMap(
          this.articles,
          article => split(article.tags, ',')
        )
      )

      return uniq(tags).sort()
    }
  },
  async beforeMount() {
    this.articles = await this.$content('articles')
      .only(['createdAt', 'path', 'title', 'tags'])
      .sortBy('createdAt', 'asc')
      .limit(5)
      .fetch()
  }
}
</script>

<style lang="scss" scoped>
.nav-name {
  line-height: 2rem !important;
}

.sidebar-icon {
  font-size: 1.3em !important;
  padding: 0 2px;

  &:first-of-type {
    padding-left: 0;
  }

  &:last-of-type {
    padding-right: 0;
  }
}

li {
  line-height: 1;
  margin-bottom: 0.5rem;
}
</style>
