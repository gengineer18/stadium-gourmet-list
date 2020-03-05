<template>
  <section>
    <h1 class="title is-5">
      <mark-circle :color1="color1" :color2="color2" :color3="color3" class="is-inline-block" />
      {{ clubName }}
    </h1>
    <ul v-for="item in storedClubs" :key="item.id">
      <nuxt-link :to="getMenuPath(item.id)">
        <li>
          <img :src="getImagePath(item.imagePath)" class="Thumbnail">
        </li>
      </nuxt-link>
    </ul>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { db } from '~/plugins/firebase'
import utilsGetClubConfig from '~/utils/getClubConfig'
import MarkCircle from '@/components/Mark/MarkCircle.vue'

export default Vue.extend({
  components: {
    MarkCircle
  },
  data () {
    return {
      storedClubs: [],
      clubName: '',
      color1: '',
      color2: '',
      color3: ''
    }
  },
  computed: {
    getMenuPath () {
      return (menuId: string): string => {
        return `/club/${this.$route.params.clubId}/post/${menuId}`
      }
    },
    getImagePath () {
      return (imagePath: string): string => {
        return imagePath || 'https://firebasestorage.googleapis.com/v0/b/stadium-gourmet-list.appspot.com/o/assets%2Fdefault-photo.png?alt=media&token=4e9d7eab-2f73-4472-8f9e-404db32a18e4'
      }
    }
  },
  created () {
    const clubConfig = utilsGetClubConfig(this.$route.params.clubId)
    this.clubName = clubConfig.name
    this.color1 = clubConfig.color1
    this.color2 = clubConfig.color2 ? clubConfig.color2 : ''
    this.color3 = clubConfig.color3 ? clubConfig.color3 : ''
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
