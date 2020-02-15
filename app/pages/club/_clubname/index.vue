<template>
  <section>
    <p>{{ clubname }}</p>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      clubname: ''
    }
  },
  mounted () {
    this.clubname = this.$route.params.clubname
  }
})
</script>

<style lang="sass" scoped>
section
  border: solid 1px red
  background-color: silver
  padding: 3px
</style>
