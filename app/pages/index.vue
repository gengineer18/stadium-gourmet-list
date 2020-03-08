<template>
  <section>
    <h1 class="title is-5">
      タイムライン
    </h1>
    <loading-mark v-if="isLoading" />
    <loading-failed v-if="!isLoading && storedPosts.length === 0" />
    <div v-if="!isLoading && storedPosts.length > 0">
      <ul class="menu-list is-flex has-text-centered">
        <nuxt-link v-for="item in storedPosts" :key="item.id" :to="getMenuPath(item.club.id, item.id)">
          <li>
            <div class="card card-width">
              <header class="card-header has-text-centered">
                <img :src="getImagePath(item.imagePath)" class="Thumbnail card-header-title">
              </header>
              <div class="card-content">
                <mark-circle
                  :color1="getClubColor1(item.club.id)"
                  :color2="getClubColor2(item.club.id)"
                  :color3="getClubColor3(item.club.id)"
                  class="is-inline-block va-mid"
                />
                <span class="text-rem-8 va-mid">{{ getClubName(item.club.id) }}</span>
                <p>{{ item.gourmet }}</p>
              </div>
            </div>
          </li>
        </nuxt-link>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { db } from '~/plugins/firebase'
import utilsGetClubConfig from '~/utils/getClubConfig'
import MarkCircle from '@/components/Mark/MarkCircle.vue'
import { defaultImagePath } from '~/utils/common'
import LoadingMark from '@/components/Loading/LoadingMark.vue'
import LoadingFailed from '@/components/Loading/LoadingFailed.vue'

export default Vue.extend({
  name: 'TopPage',
  components: {
    MarkCircle,
    LoadingMark,
    LoadingFailed
  },
  data () {
    return {
      storedPosts: [],
      isLoading: true
    }
  },
  computed: {
    getMenuPath () {
      return (clubId: string, menuId: string): string => {
        return `/club/${clubId}/post/${menuId}`
      }
    },
    getImagePath () {
      return (imagePath: string): string => {
        return imagePath || defaultImagePath
      }
    }
  },
  async mounted () {
    await this.$store.dispatch('post/init', db.collection('posts').orderBy('createdAt', 'desc'))
    this.storedPosts = await this.$store.state.post.posts
    this.isLoading = await false
  },
  methods: {
    getClubConfig (clubId: string) {
      const clubConfig = utilsGetClubConfig(clubId)
      return clubConfig
    },
    getClubName (clubId: string): string {
      const clubConfig = this.getClubConfig(clubId)
      return clubConfig.name
    },
    getClubColor1 (clubId: string): string {
      const clubConfig = this.getClubConfig(clubId)
      return clubConfig.color1
    },
    getClubColor2 (clubId: string): string {
      const clubConfig = this.getClubConfig(clubId)
      return clubConfig.color2 || ''
    },
    getClubColor3 (clubId: string): string {
      const clubConfig = this.getClubConfig(clubId)
      return clubConfig.color3 || ''
    }
  }
})
</script>

<style lang="scss" scoped>
.Thumbnail {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  object-position: 50% 0;
}
.menu-list {
  flex-wrap: wrap;
  align-content: flex-start;
}
.va-mid {
  vertical-align: middle;
}
.card-width {
  width: 216px;
}
.text-rem-8 {
  font-size: 0.8rem;
}
</style>
