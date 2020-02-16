<template>
  <section>
    <h1 class="ClubName">
      {{ getClubName }}
    </h1>
    <ul v-for="item in storedClubs" :key="item.id">
      <nuxt-link :to="getMenuPath(item.id)">
        <li>
          <img :src="item.imagePath" class="Thumbnail">
        </li>
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

<style lang="scss" scoped>
.ClubName {
  font-size: 1.5rem;
}
.Thumbnail {
  width: 200px;
  height: 200px;
}
</style>
