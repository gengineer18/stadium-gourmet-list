<template>
  <section>
    <h2 class="title is-4">
      <mark-circle :color1="color1" :color2="color2" :color3="color3" class="is-inline-block" />
      {{ clubName }}
    </h2>
    <img :src="imagePath">
    <ul>
      <li class="share-list-item">
        <b-button
          type="is-twitter"
          icon-left="twitter"
          tag="a"
          :href="twitterURL"
          target="_blank"
          rel="nofollow"
          class="share-button"
        />
      </li>
      <li class="share-list-item">
        <b-button
          type="is-facebook"
          icon-left="facebook"
          tag="a"
          :href="facebookURL"
          target="_blank"
          class="share-button"
        />
      </li>
      <li class="share-list-item">
        <b-button
          type="is-line"
          tag="a"
          :href="lineURL"
          target="_blank"
          class="share-button"
        >
          <img src="/line-icon.png" class="line-icon">
        </b-button>
      </li>
    </ul>
    <p>ユーザー：{{ this.$store.getters['user/userName'] }}</p>
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
import 'dayjs/locale/ja'
import MarkCircle from '@/components/Mark/MarkCircle.vue'
import utilsGetClubConfig from '@/utils/getClubConfig'

dayjs.locale('ja')

export default Vue.extend({
  components: {
    MarkCircle
  },
  data () {
    return {
      docRefId: '',
      gourmet: '',
      clubId: '',
      clubName: '',
      shop: '',
      comment: '',
      date: '',
      imagePath: '',
      color1: '',
      color2: '',
      color3: ''
    }
  },
  computed: {
    twitterURL () {
      const url = `https://stgrmeikan.com/club/${this.$data.clubId}/post/${this.$data.docRefId}`
      const gourmet = encodeURIComponent(this.$data.gourmet)
      const comment = encodeURIComponent(this.$data.comment)
      const hashtag = encodeURIComponent('スタグル名鑑')
      return `https://twitter.com/intent/tweet?url=${url}&text=${gourmet}:${comment}&hashtags=${hashtag}`
    },
    facebookURL () {
      const url = `https://stgrmeikan.com/club/${this.$data.clubId}/post/${this.$data.docRefId}`
      return `https://www.facebook.com/sharer/sharer.php?u=${url}`
    },
    lineURL () {
      const url = `https://stgrmeikan.com/club/${this.$data.clubId}/post/${this.$data.docRefId}`
      return `https://social-plugins.line.me/lineit/share?url=${url}`
    }
  },
  async created () {
    const params = this.$route.params
    const postId = params.postId
    const clubId = params.clubId
    await this.$store.dispatch('club/init', db.collection('clubs').doc(clubId).collection('posts').doc(postId))
    const storedPosts = await this.$store.state.club.clubs
    if (storedPosts !== null) {
      this.docRefId = postId
      this.gourmet = storedPosts.gourmet ? storedPosts.gourmet : ''
      this.clubId = storedPosts.club ? storedPosts.club.id : ''
      this.clubName = storedPosts.club ? storedPosts.club.name : ''
      this.shop = storedPosts.shop ? storedPosts.shop : ''
      this.comment = storedPosts.comment ? storedPosts.comment : ''
      this.date = storedPosts.date ? dayjs(storedPosts.date.toDate()).format('YYYY年MM月DD日') : ''
      this.imagePath = storedPosts.imagePath ? storedPosts.imagePath : ''

      const clubConfig = utilsGetClubConfig(this.clubId)
      this.color1 = clubConfig.color1
      this.color2 = clubConfig.color2 ? clubConfig.color2 : ''
      this.color3 = clubConfig.color3 ? clubConfig.color3 : ''
    }
  }
})
</script>

<style lang="scss" scoped>
.share-list-item {
  display: inline-block;
  flex-grow: 1;
  width: 60px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin-right: 0.5rem;
}

.share-button {
  width: 60px;
  height: 40px;
}

.line-icon {
  height: 24px;
  margin: auto;
}
</style>
