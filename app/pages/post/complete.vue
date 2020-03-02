<template>
  <section>
    <h1 class="title is-4">
      投稿できました！
    </h1>
    <h2>チーム名：{{ clubName }}</h2>
    <img :src="imagePath">
    <ul class="share-list">
      <li class="share-list-item">
        <b-button
          type="is-twitter"
          icon-left="twitter"
          tag="a"
          :href="twitterURL"
          target="_blank"
          rel="nofollow"
        />
      </li>
      <li class="share-list-item is-facebook">
        <b-button
          type="is-facebook"
          icon-left="facebook"
          tag="a"
          :href="facebookURL"
          target="_blank"
        />
      </li>
    </ul>
    <p>ユーザー：{{ gourmet }}</p>
    <p>スタグル名：{{ gourmet }}</p>
    <p>店舗名：{{ shop }}</p>
    <p>観戦日：{{ date }}</p>
    <p>寸評：{{ comment }}</p>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import { db } from '~/plugins/firebase.js'
import { CompletePost } from '@/types/post'
import 'dayjs/locale/ja'

dayjs.locale('ja')

export default Vue.extend({
  data (): CompletePost {
    return {
      docRefId: '',
      gourmet: '',
      clubId: '',
      clubName: '',
      shop: '',
      comment: '',
      date: '',
      imagePath: ''
    }
  },
  computed: {
    twitterURL () {
      const host = location.host
      const url = `https://${host}/club/${this.$data.clubId}/post/${this.$data.docRefId}`
      const gourmet = encodeURIComponent(this.$data.gourmet)
      const comment = encodeURIComponent(this.$data.comment)
      const hashtag = encodeURIComponent('スタグル名鑑')
      return `https://twitter.com/intent/tweet?url=${url}&text=${gourmet}:${comment}&hashtags=${hashtag}`
    },
    facebookURL () {
      const host = location.host
      const url = `https://${host}/club/${this.$data.clubId}/post/${this.$data.docRefId}`
      const gourmet = encodeURIComponent(this.$data.gourmet)
      const comment = encodeURIComponent(this.$data.comment)
      return `https://www.facebook.com/sharer/sharer.php?u=${url}&text=${gourmet}:${comment}`
    }
  },
  async mounted () {
    const url = window.location.search
    const query = url.slice(1)
    const array = query.split('=')
    const docRefId = array[1]
    // ドキュメントIDを元にfirebaseからデータをstateにセット
    await this.$store.dispatch('post/init', db.collection('posts').doc(docRefId))
    // storeからデータ読み込み
    const storedPosts = await this.$store.state.post.posts
    if (storedPosts !== null) {
      this.docRefId = docRefId
      this.gourmet = storedPosts.gourmet ? storedPosts.gourmet : ''
      this.clubId = storedPosts.club ? storedPosts.club.id : ''
      this.clubName = storedPosts.club ? storedPosts.club.name : ''
      this.shop = storedPosts.shop ? storedPosts.shop : ''
      this.comment = storedPosts.comment ? storedPosts.comment : ''
      this.date = storedPosts.date ? dayjs(storedPosts.date.toDate()).format('YYYY年MM月DD日') : ''
      this.imagePath = storedPosts.imagePath ? storedPosts.imagePath : ''
    }
  }
})
</script>

<style lang="scss">
.shareList {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
}

.share-list-item {
  display: inline-block;
  flex-grow: 1;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
</style>
