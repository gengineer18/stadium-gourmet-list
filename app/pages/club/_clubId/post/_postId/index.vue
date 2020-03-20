<template>
  <section>
    <h2 class="title is-5">
      <mark-circle :color1="color1" :color2="color2" :color3="color3" class="is-inline-block" />
      {{ clubName }}
    </h2>
    <h3 class="subtitle is-4">
      {{ gourmet }}
    </h3>
    <img :src="getImagePath(imagePath)">
    <p class="is-size-6 has-text-grey-light mb-1rem">
      {{ createdAt }}
    </p>
    <div>
      <ul>
        <li class="share-list-item">
          <button-share-twitter :club-id="clubId" :doc-ref-id="docRefId" :gourmet="gourmet" :comment="comment" />
        </li>
        <li class="share-list-item">
          <button-share-facebook :club-id="clubId" :doc-ref-id="docRefId" />
        </li>
        <li class="share-list-item">
          <button-share-line :club-id="clubId" :doc-ref-id="docRefId" />
        </li>
      </ul>
    </div>
    <h3 class="is-size-6 mt-1rem user">
      <nuxt-link v-if="user.name !== 'ゲスト'" :to="`/user/${user.id}`" class="link">
        <img :src="user.photo" class="user-content">
        <span class="user-content">{{ user.name }}</span>
      </nuxt-link>
      <span v-if="user.name == 'ゲスト'">
        <img :src="user.photo" class="user-content">
        <span class="user-content">{{ user.name }}</span>
      </span>
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
import ButtonShareLine from '@/components/Button/ButtonShareLine.vue'
import { guestUserImagePath } from '~/utils/common'

dayjs.locale('ja')

export default Vue.extend({
  components: {
    MarkCircle,
    ButtonShareTwitter,
    ButtonShareFacebook,
    ButtonShareLine
  },
  data () {
    return {
      docRefId: '',
      user: {
        id: '',
        name: '',
        photo: ''
      },
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
      price: null,
      createdAt: ''
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
      this.user.id = storedPosts.user ? storedPosts.user.id : 'guestuser'
      this.user.name = storedPosts.user ? storedPosts.user.name : 'ゲスト'
      this.user.photo = storedPosts.user ? storedPosts.user.photo : guestUserImagePath
      this.gourmet = storedPosts.gourmet || ''
      this.clubId = storedPosts.club ? storedPosts.club.id : ''
      this.clubName = storedPosts.club ? storedPosts.club.name : ''
      this.shop = storedPosts.shop || ''
      this.comment = storedPosts.comment || ''
      this.gameDate = storedPosts.gameDate ? dayjs(storedPosts.gameDate.toDate()).format('YYYY年MM月DD日') : ''
      this.imagePath = storedPosts.imagePath || ''
      this.price = storedPosts.price || null
      this.createdAt = storedPosts.createdAt ? dayjs(storedPosts.createdAt.toDate()).format('YYYY/MM/DD HH:mm') : ''

      const clubConfig = utilsGetClubConfig(this.clubId)
      this.color1 = clubConfig.color1
      this.color2 = clubConfig.color2 || ''
      this.color3 = clubConfig.color3 || ''
    }
  },
  head () {
    return {
      title: `${this.$data.gourmet}`
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~assets/css/buefy.scss';

.share-list-item {
  display: inline-block;
  flex-grow: 1;
  line-height: 32px;
  margin-right: 0.3rem;
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
  &-content {
    display: inline-block;
    vertical-align: middle;
  }
}
.link {
  color: $sub;
  &:hover {
    color: $sub;
  }
}
</style>
