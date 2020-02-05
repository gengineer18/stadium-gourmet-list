<template>
  <section id="PostComplete">
    <h1>投稿</h1>
    <p>{{ posts }}</p>
    <ul>
      <li v-for="post in posts" :key="post.id">
        {{ post.id }}
      </li>
    </ul>
    <!-- <p>スタグル名：{{ posts.gourmet }}</p>
    <p>チーム名：{{ posts.team }}</p>
    <p>店舗名：{{ posts.shop }}</p>
    <p>コメント：{{ posts.comment }}</p>
    <p>観戦日：{{ posts.date }}</p> -->
    <nuxt-link to="/post">
      <b-button>戻る</b-button>
    </nuxt-link>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { db } from '~/plugins/firebase.js'
export default Vue.extend({
  computed: {
    // VuexからPostsデータを取得
    ...mapGetters({ posts: 'post/getPosts' })
  },
  created () {
    // firestoreのpostsをバインド
    this.$store.dispatch('post/setPostsRef', db.collection('posts'))
  }
})
</script>

<style>
.Form {
  max-width: 540px;
  width: 95%;
  margin: 0 auto;
}
</style>
