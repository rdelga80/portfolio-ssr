<template>
  <v-app v-resize="checkMobile">
    <v-app-bar
      v-if="isMobile"
      flat>
      <v-toolbar-title>
        <v-col @click="returnHome">
          <v-flex class="text-weight-bold bar-title">
            Ricardo Delgado
          </v-flex>

          <v-flex class="caption">
            Web Developer
          </v-flex>
        </v-col>
      </v-toolbar-title>

      <v-spacer/>

      <v-col class="nav-links">
        <n-link
          :to="{ name: 'articles' }"
          class="link text-caption"
          tag="div">
          Articles
        </n-link>

        <n-link
          :to="{ name: 'about' }"
          class="link text-caption"
          tag="div">
          About
        </n-link>
      </v-col>
    </v-app-bar>

    <v-main>
      <v-row justify-center class="mx-5">
        <v-flex class="d-flex">
          <LayoutSidebar v-if="!isMobile"/>
          <nuxt/>
        </v-flex>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import LayoutSidebar from '@/components/LayoutSidebar'

export default {
  name: 'Default',
  components: {
    LayoutSidebar
  },
  data: () => ({
    isMobile: false
  }),
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth < 560
    },
    returnHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.bar-title {
  font-size: 1.75rem;
  line-height: 1rem;
}

.nav-links {
  > div {
    line-height: 1.25em !important;
  }
}
</style>
