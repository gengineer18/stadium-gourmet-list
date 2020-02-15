<template>
  <section>
    <h1>{{ clubName }}</h1>
    <ul v-for="item in storedClubs" :key="item.id">
      <li>スタグル名：{{ item.gourmet }}</li>
    </ul>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { db } from '~/plugins/firebase.js'

export default Vue.extend({
  data () {
    return {
      clubName: '',
      storedClubs: []
    }
  },
  async mounted () {
    this.clubName = this.$route.params.clubname
    await this.$store.dispatch('club/init', db.collection('clubs').doc(this.$route.params.clubname).collection('posts'))
    this.storedClubs = await this.$store.state.club.clubs
  }
})
</script>

<style lang="sass" scoped>
section
  border: solid 1px red
  background-color: silver
  padding: 3px
</style>
