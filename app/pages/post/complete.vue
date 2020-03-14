<template>
  <section>
    <h1 class="title is-5">
      <mark-circle :color1="color1" :color2="color2" :color3="color3" class="is-inline-block" />
      {{ clubName }}
    </h1>
    <h3 class="subtitle is-4">
      {{ gourmet }}
    </h3>
    <img :src="imagePath">
    <p class="is-size-6 has-text-grey-light mb-1rem">
      {{ createdAt }}
    </p>
    <ul>
      <li class="share-list-item">
        <button-share-twitter :club-id="clubId" :doc-ref-id="docRefId" :gourmet="gourmet" :comment="comment" />
      </li>
      <li class="share-list-item">
        <button-share-facebook :club-id="clubId" :doc-ref-id="docRefId" />
      </li>
    </ul>
    <h3 class="is-size-6 mt-1rem user">
      <img :src="userPhoto" class="user-content">
      <span class="user-content">{{ userName }}</span>
    </h3>
    <h3 v-if="price" class="is-size-6">
      価格：{{ price }}円
    </h3>
    <h3 v-if="shop" class="is-size-6">
      店舗名：{{ shop }}
    </h3>
    <h3 v-if="gameDate" class="is-size-6">
      観戦日：{{ gameDate }}
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
import { guestUserImagePath } from '~/utils/common'

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
      gameDate: '',
      imagePath: '',
      userName: '',
      color1: '',
      color2: '',
      color3: '',
      price: null,
      createdAt: '',
      userPhoto: ''
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
      this.gourmet = storedPosts.gourmet || ''
      this.clubId = storedPosts.club ? storedPosts.club.id : ''
      this.clubName = storedPosts.club ? storedPosts.club.name : ''
      this.shop = storedPosts.shop || ''
      this.comment = storedPosts.comment || ''
      this.gameDate = storedPosts.gameDate ? dayjs(storedPosts.gameDate.toDate()).format('YYYY年MM月DD日') : ''
      this.imagePath = storedPosts.imagePath || ''
      this.userName = storedPosts.user ? storedPosts.user.name : 'ゲスト'
      this.userPhoto = storedPosts.user ? storedPosts.user.photo : guestUserImagePath
      this.price = storedPosts.price || null
      this.createdAt = storedPosts.createdAt ? dayjs(storedPosts.createdAt.toDate()).format('YYYY/MM/DD HH:mm') : ''

      const clubConfig = utilsGetClubConfig(this.clubId)
      this.color1 = clubConfig.color1
      this.color2 = clubConfig.color2 || ''
      this.color3 = clubConfig.color3 || ''
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
.user {
  height: 30px;
  line-height: 30px;
  img {
    width: 30px;
    height: 30px;
  }
  &-content{
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
