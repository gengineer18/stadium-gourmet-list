<template>
  <section id="PostComplete">
    <h1>投稿</h1>
    <p>スタグル名：{{ gourmet }}</p>
    <p>チーム名：{{ teamName }}</p>
    <p>店舗名：{{ shop }}</p>
    <p>寸評：{{ comment }}</p>
    <p>観戦日：{{ date }}</p>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import { db } from '~/plugins/firebase.js'
import { completePost } from '@/types/post'
import 'dayjs/locale/ja'

dayjs.locale('ja')

export default Vue.extend({
  data (): completePost {
    return {
      gourmet: '',
      teamName: '',
      shop: '',
      comment: '',
      date: ''
    }
  },
  async mounted () {
    const url = window.location.search
    const query = url.slice(1)
    const array = query.split('=')
    const docRefId = array[1]
    // ドキュメントIDを元にfirebaseからデータをstateにセット
    await this.$store.dispatch('post/setPostsRef', db.collection('posts').doc(docRefId))
    // storeからデータ読み込み
    const storedPosts = await this.$store.state.post.posts
    if (storedPosts !== null) {
      this.gourmet = storedPosts.gourmet ? storedPosts.gourmet : ''
      this.teamName = storedPosts.team ? storedPosts.team.name : ''
      this.shop = storedPosts.shop ? storedPosts.shop : ''
      this.comment = storedPosts.comment ? storedPosts.comment : ''
      this.date = storedPosts.date ? dayjs(storedPosts.date.toDate()).format('YYYY年MM月DD日') : ''
    }
  }
})
</script>

<style>
</style>
