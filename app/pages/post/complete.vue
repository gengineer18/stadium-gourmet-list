<template>
  <section id="PostComplete">
    <h1>投稿</h1>
    <p>スタグル名：{{ gourmet }}</p>
    <p>チーム名：{{ teamName }}</p>
    <p>店舗名：{{ shop }}</p>
    <p>寸評：{{ comment }}</p>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { db } from '~/plugins/firebase.js'
export default Vue.extend({
  data () {
    return {
      gourmet: '',
      teamName: '',
      shop: '',
      comment: ''
    }
  },
  async mounted () {
    const url = window.location.search
    const query = url.slice(1)
    const array = query.split('=')
    const docRefId = array[1]
    await this.$store.dispatch('post/setPostsRef', db.collection('posts').doc(docRefId))
    const storedPosts = await this.$store.state.post.posts
    if (storedPosts !== null) {
      this.gourmet = storedPosts.gourmet ? storedPosts.gourmet : ''
      this.teamName = storedPosts.team ? storedPosts.team.name : ''
      this.shop = storedPosts.shop ? storedPosts.shop : ''
      this.comment = storedPosts.comment ? storedPosts.comment : ''
    }
  }
})
</script>

<style>
</style>
