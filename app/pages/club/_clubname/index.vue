<template>
  <section>
    <h1>{{ getClubName }}</h1>
    <ul v-for="item in storedClubs" :key="item.id">
      <nuxt-link :to="getMenuPath(item.id)">
        <li>スタグル名：{{ item.gourmet }}</li>
      </nuxt-link>
    </ul>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { db } from '~/plugins/firebase.js'

export default Vue.extend({
  data () {
    return {
      storedClubs: []
    }
  },
  computed: {
    getMenuPath () {
      return (menuId: string): string => {
        return `/club/${this.$route.params.clubname}/menu/${menuId}`
      }
    },
    getClubName (): string {
      return this.$route.params.clubname
    }
  },
  async mounted () {
    await this.$store.dispatch('club/init', db.collection('clubs').doc(this.$route.params.clubname).collection('posts'))
    this.storedClubs = await this.$store.state.club.clubs
  }
})
</script>

<style lang="sass" scoped>
section
  border: solid 1px red
  background-color: #DDD
  padding: 3px
</style>
