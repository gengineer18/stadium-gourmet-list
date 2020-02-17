<template>
  <section>
    <h1 class="ClubName">
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
import utilsGetClubName from '~/utils/getClubName'

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
    this.clubName = utilsGetClubName(this.$route.params.clubId)
  },
  async mounted () {
    await this.$store.dispatch('club/init', db.collection('clubs').doc(this.$route.params.clubId).collection('posts'))
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
