<template>
  <section>
    <p>スタグル名：{{ gourmet }}</p>
    <p>チーム名：{{ clubName }}</p>
    <p>店舗名：{{ shop }}</p>
    <p>寸評：{{ comment }}</p>
    <p>観戦日：{{ date }}</p>
    <img :src="imagePath">
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import { db } from '~/plugins/firebase.js'
import 'dayjs/locale/ja'

dayjs.locale('ja')

export default Vue.extend({
  data () {
    return {
      gourmet: '',
      clubName: '',
      shop: '',
      comment: '',
      date: '',
      imagePath: ''
    }
  },
  async created () {
    const params = this.$route.params
    const postId = params.postId
    const clubId = params.clubId
    await this.$store.dispatch('club/init', db.collection('clubs').doc(clubId).collection('posts').doc(postId))
    const storedPosts = await this.$store.state.club.clubs
    if (storedPosts !== null) {
      this.gourmet = storedPosts.gourmet ? storedPosts.gourmet : ''
      this.clubName = storedPosts.club ? storedPosts.club.name : ''
      this.shop = storedPosts.shop ? storedPosts.shop : ''
      this.comment = storedPosts.comment ? storedPosts.comment : ''
      this.date = storedPosts.date ? dayjs(storedPosts.date.toDate()).format('YYYY年MM月DD日') : ''
      this.imagePath = storedPosts.imagePath ? storedPosts.imagePath : ''
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
