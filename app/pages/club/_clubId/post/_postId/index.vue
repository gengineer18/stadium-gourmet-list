<template>
  <section>
    <h2 class="title is-5">
      <mark-circle :color1="color1" :color2="color2" :color3="color3" class="is-inline-block" />
      {{ clubName }}
    </h2>
    <img :src="getImagePath(imagePath)">
    <ul>
      <li class="share-list-item">
        <button-share-twitter :club-id="clubId" :doc-ref-id="docRefId" :gourmet="gourmet" :comment="comment" />
      </li>
      <li class="share-list-item">
        <button-share-facebook :club-id="clubId" :doc-ref-id="docRefId" />
      </li>
    </ul>
    <p>ユーザー：{{ user }}</p>
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
import utilsGetClubConfig from '@/utils/getClubConfig'
import MarkCircle from '@/components/Mark/MarkCircle.vue'
import ButtonShareTwitter from '@/components/Button/ButtonShareTwitter.vue'
import ButtonShareFacebook from '@/components/Button/ButtonShareFacebook.vue'

dayjs.locale('ja')

export default Vue.extend({
  components: {
    MarkCircle,
    ButtonShareTwitter,
    ButtonShareFacebook
  },
  data () {
    return {
      docRefId: '',
      user: '',
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
    getImagePath () {
      return (imagePath: string): string => {
        return imagePath || 'https://firebasestorage.googleapis.com/v0/b/stadium-gourmet-list.appspot.com/o/assets%2Fdefault-photo.png?alt=media&token=a518f35a-2ab4-4127-be64-1d614dbe294f'
      }
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
      this.user = storedPosts.user ? storedPosts.user : 'ゲスト'
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
</style>
