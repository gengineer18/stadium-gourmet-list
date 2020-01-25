<template lang="pug">
div
  section(v-if="matchName")
    h1 FILE: {{fileName}}
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
      FILE_NAME: 'user/edit.vue'
    }
  },
  computed: {
    matchName () {
      console.info(this.$route.name)
      return this.$route.name === 'user-userid-edit'
    }
  }
})
</script>

<style lang="sass" scoped>
section
  border: solid 1px red
  background-color: skyblue
  padding: 3px
</style>
