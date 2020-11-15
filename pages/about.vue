<template>
  <div>
    <nuxt-content :document="about"/>
  </div>
</template>

<script>
export default {
  name: 'About',
  async asyncData({ $content }) {
    const about = await $content('about', 'about').fetch()

    return { about }
  }
}
</script>

<style lang="scss" scoped>
p {
  font-size: 1.25em;
}
</style>
