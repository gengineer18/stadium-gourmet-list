<template lang="pug">
div
  section(v-if="matchName")
    ul
      li ROUTE NAME: {{JSON.stringify($route.name)}}
      li PATH: {{JSON.stringify($route.path)}}
      li PARAMS: {{JSON.stringify($route.params)}}
    nuxt-child
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      FILE_NAME: 'club/_clubId/menu/_menuid.vue'
    }
  },
  computed: {
    matchName () {
      console.info(this.$route.name)
      return this.$route.name === 'club-clubId-menu-menuid'
    }
  }
})
</script>

<style lang="sass" scoped>
section
  border: solid 1px red
  background-color: #FF77dd
  padding: 3px
</style>
