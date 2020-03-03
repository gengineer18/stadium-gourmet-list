<template>
  <section>
    <h1 class="title is-4">
      {{ clubName }}
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
import { db } from '~/plugins/firebase'
import utilsGetClubConfig from '~/utils/getClubConfig'

export default Vue.extend({
  data () {
    return {
      storedClubs: [],
      clubName: ''
    }
  },
  computed: {
    getMenuPath () {
      return (menuId: string): string => {
        return `/club/${this.$route.params.clubId}/post/${menuId}`
      }
    }
  },
  created () {
    const clubConfig = utilsGetClubConfig(this.$route.params.clubId)
    this.clubName = clubConfig.name
  },
  async mounted () {
    await this.$store.dispatch('club/init', db.collection('clubs').doc(this.$route.params.clubId).collection('posts'))
    this.storedClubs = await this.$store.state.club.clubs
  }
})
</script>

<style lang="scss" scoped>
.Thumbnail {
  width: 200px;
  height: 200px;
}
</style>
