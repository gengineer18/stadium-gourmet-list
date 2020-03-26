<template>
  <section>
    <h1 class="title is-5">
      <mark-circle :color1="color1" :color2="color2" :color3="color3" class="is-inline-block" />
      {{ clubName }}
    </h1>
    <loading-mark v-if="isLoading" />
    <loading-failed v-if="!isLoading && storedClubs.length === 0" />
    <div v-if="!isLoading && storedClubs.length > 0">
      <ul class="menu-list is-flex has-text-centered">
        <template v-for="item in storedClubs">
          <nuxt-link v-if="!item.isDeleted" :key="item.id" :to="getMenuPath(item.id)">
            <li>
              <div class="card card-width">
                <header class="card-header has-text-centered">
                  <img :src="getImagePath(item.imagePath)" class="Thumbnail card-header-title">
                </header>
                <div class="card-content">
                  <p class="gourmet-name">
                    {{ item.gourmet }}
                  </p>
                </div>
              </div>
            </li>
          </nuxt-link>
        </template>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { db } from '~/plugins/firebase'
import utilsGetClubConfig from '~/utils/getClubConfig'
import { defaultImagePath } from '~/utils/common'
import MarkCircle from '@/components/Mark/MarkCircle.vue'
import LoadingMark from '@/components/Loading/LoadingMark.vue'
import LoadingFailed from '@/components/Loading/LoadingFailed.vue'

export default Vue.extend({
  components: {
    MarkCircle,
    LoadingMark,
    LoadingFailed
  },
  data () {
    return {
      storedClubs: [],
      clubName: '',
      color1: '',
      color2: '',
      color3: '',
      isLoading: true
    }
  },
  computed: {
    getMenuPath () {
      return (menuId: string): string => {
        return `/club/${this.$route.params.clubId}/post/${menuId}`
      }
    },
    getImagePath () {
      return (imagePath: string): string => {
        return imagePath || defaultImagePath
      }
    }
  },
  created () {
    const clubConfig = utilsGetClubConfig(this.$route.params.clubId)
    this.clubName = clubConfig.name
    this.color1 = clubConfig.color1
    this.color2 = clubConfig.color2 || ''
    this.color3 = clubConfig.color3 || ''
  },
  async mounted () {
    await this.$store.dispatch('club/init', db.collection('clubs').doc(this.$route.params.clubId).collection('posts').orderBy('createdAt', 'desc'))
    this.storedClubs = await this.$store.state.club.clubs
    this.isLoading = await false
  },
  head () {
    return {
      title: `${this.$data.clubName}`
    }
  }
})
</script>

<style lang="scss" scoped>
.Thumbnail {
  width: 192px;
  max-width: 100%;
  max-height: 192px;
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
.gourmet-name {
  font-size: 1rem;
}
.card-content {
  padding: 8px;
}

@media screen and (max-width: 480px){
  .card-header-title {
    padding: 4px;
  }
  .card-width {
    width: calc((100vw / 2) - 36px);
  }
  .Thumbnail {
    width: calc(100% - 30px);
    max-width: 100%;
    max-height: 150px;
    object-fit: cover;
    object-position: 50% 0;
  }
  .gourmet-name {
    font-size: 0.8rem;
  }
  .card-content {
    padding: 4px;
  }
}
</style>
