<template>
  <section>
    <h1 class="title is-5">
      投稿できました！
    </h1>
    <h2 class="title is-5">
      <mark-circle :color1="color1" :color2="color2" :color3="color3" class="is-inline-block" />
      {{ clubName }}
    </h2>
    <h3 class="subtitle is-4">
      {{ gourmet }}
    </h3>
    <img :src="imagePath" class="mb-1rem">
    <ul>
      <li class="share-list-item">
        <button-share-twitter :club-id="clubId" :doc-ref-id="docRefId" :gourmet="gourmet" :comment="comment" />
      </li>
      <li class="share-list-item">
        <button-share-facebook :club-id="clubId" :doc-ref-id="docRefId" />
      </li>
    </ul>
    <h3 class="is-size-5 mt-1rem">
      {{ this.$store.getters['user/userName'] }}
    </h3>
    <h3 v-if="price" class="is-size-6">
      価格：{{ price }}円
    </h3>
    <h3 v-if="shop" class="is-size-6">
      店舗名：{{ shop }}
    </h3>
    <h3 v-if="date" class="is-size-6">
      観戦日：{{ date }}
    </h3>
    <h3 v-if="comment" class="is-size-6">
      寸評：{{ comment }}
    </h3>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import { db } from '~/plugins/firebase.js'
import { CompletePost } from '@/types/post'
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
  data (): CompletePost {
    return {
      docRefId: '',
      gourmet: '',
      clubId: '',
      clubName: '',
      shop: '',
      comment: '',
      date: '',
      imagePath: '',
      userName: '',
      color1: '',
      color2: '',
      color3: '',
      price: null
    }
  },
  async mounted () {
    const docRefId = new URL(location.href).searchParams.get('docRefId')
    if (!docRefId) { return }
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
      this.userName = storedPosts.user.name ? storedPosts.user.name : 'ゲスト'
      this.price = storedPosts.price ? storedPosts.price : null

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
.mb-1rem {
  margin-bottom: 1rem;
}
.mt-1rem {
  margin-top: 1rem;
}
</style>
