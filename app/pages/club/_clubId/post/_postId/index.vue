<template>
  <section>
    <h2 class="title is-5">
      <mark-circle :color1="color1" :color2="color2" :color3="color3" class="is-inline-block" />
      {{ clubName }}
    </h2>
    <h3 class="subtitle is-4">
      {{ gourmet }}
    </h3>
    <img :src="getImagePath(imagePath)" class="mb-1rem">
    <div>
      <ul>
        <li class="share-list-item">
          <button-share-twitter :club-id="clubId" :doc-ref-id="docRefId" :gourmet="gourmet" :comment="comment" />
        </li>
        <li class="share-list-item">
          <button-share-facebook :club-id="clubId" :doc-ref-id="docRefId" />
        </li>
      </ul>
    </div>
    <h3 class="is-size-5 mt-1rem">
      {{ userName }}
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
import 'dayjs/locale/ja'
import utilsGetClubConfig from '@/utils/getClubConfig'
import { defaultImagePath } from '@/utils/common'
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
      userName: '',
      gourmet: '',
      clubId: '',
      clubName: '',
      shop: '',
      comment: '',
      gameDate: '',
      imagePath: '',
      color1: '',
      color2: '',
      color3: '',
      price: null
    }
  },
  computed: {
    getImagePath () {
      return (imagePath: string): string => {
        return imagePath || defaultImagePath
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
      this.userName = storedPosts.user ? storedPosts.user.name : 'ゲスト'
      this.gourmet = storedPosts.gourmet || ''
      this.clubId = storedPosts.club ? storedPosts.club.id : ''
      this.clubName = storedPosts.club ? storedPosts.club.name : ''
      this.shop = storedPosts.shop || ''
      this.comment = storedPosts.comment || ''
      this.gameDate = storedPosts.gameDate ? dayjs(storedPosts.gameDate.toDate()).format('YYYY年MM月DD日') : ''
      this.imagePath = storedPosts.imagePath || ''
      this.price = storedPosts.price || null

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
</style>
