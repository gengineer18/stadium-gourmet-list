<template>
  <section>
    <loading-mark v-if="isLoading" />
    <div v-if="!isLoading && (storedPosts.length === 0 || isDeleted)">
      <p>このユーザーは存在しないか、一度も投稿をしていません。</p>
      <p>
        <nuxt-link to="/">
          トップに戻る
        </nuxt-link>
      </p>
    </div>
    <div v-if="!isLoading && storedPosts.length > 0">
      <h1 class="title is-5 user">
        <img :src="user.photoUrl" class="user-content">
        <span class="user-content">{{ user.name }}</span>
      </h1>
      <div class="pie-chart">
        <pie-chart :graph="setGraph" />
      </div>
      <ul class="menu-list is-flex has-text-centered">
        <template v-for="item in storedPosts">
          <nuxt-link v-if="!item.isDeleted" :key="item.id" :to="getMenuPath(item.club.id, item.id)">
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
                  <span class="club-name va-mid">{{ getClubName(item.club.id) }}</span>
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

<script>
import Vue from 'vue'
import { db } from '~/plugins/firebase'
import utilsGetClubConfig from '~/utils/getClubConfig'
import MarkCircle from '@/components/Mark/MarkCircle.vue'
import { defaultImagePath, guestUserImagePath } from '~/utils/common'
import LoadingMark from '@/components/Loading/LoadingMark.vue'
import PieChart from '@/components/Chart/PieChart.vue'

export default Vue.extend({
  components: {
    MarkCircle,
    LoadingMark,
    PieChart
  },
  data () {
    return {
      storedPosts: [],
      counter: [],
      isLoading: true,
      user: {
        id: '',
        name: '',
        photoUrl: '',
        isDeleted: false
      }
    }
  },
  computed: {
    getMenuPath () {
      return (clubId, menuId) => {
        return `/club/${clubId}/post/${menuId}`
      }
    },
    getImagePath () {
      return (imagePath) => {
        return imagePath || defaultImagePath
      }
    },
    getPostCount () {
      let postLength = this.storedPosts.length
      let deletedCount = 0
      this.storedPosts.forEach((post) => {
        if (post.isDeleted) {
          deletedCount++
        }
      })
      postLength = postLength - deletedCount
      return postLength
    },
    setGraph () {
      const labels = []
      const data = []
      const backgroundColor = []
      this.counter.forEach((item) => {
        if (item.count !== 0) {
          const clubId = item.id
          labels.push(this.getClubName(clubId))
          data.push(item.count)
          backgroundColor.push(this.getClubColor1(clubId))
        }
      })
      const graph = {
        labels,
        datasets: [
          {
            data,
            backgroundColor
          }
        ]
      }
      return graph
    }
  },
  async mounted () {
    if (!this.$route.params.userid) {
      this.isLoading = false
      return false
    }
    await this.$store.dispatch('user/init', db.collection('users').doc(this.$route.params.userid).collection('posts').orderBy('createdAt', 'desc'))
    await this.$store.dispatch('user/count', { userId: this.$route.params.userid })
    const getDoc = await db.collection('users').doc(this.$route.params.userid).collection('credentials').doc(this.$route.params.userid).get()
    const userdata = getDoc.data()
    if (userdata) {
      this.user.id = userdata.userId
      this.user.name = userdata.displayName || 'ゲスト'
      this.user.photoUrl = userdata.photoURL || guestUserImagePath
      this.user.isDeleted = userdata.isDeleted || false
    }
    this.storedPosts = this.$store.state.user.userPosts
    this.isLoading = false
    this.counter = this.$store.state.user.count
  },
  methods: {
    getClubConfig (clubId) {
      const clubConfig = utilsGetClubConfig(clubId)
      return clubConfig
    },
    getClubName (clubId) {
      const clubConfig = this.getClubConfig(clubId)
      return clubConfig.name
    },
    getClubColor1 (clubId) {
      const clubConfig = this.getClubConfig(clubId)
      return clubConfig.color1
    },
    getClubColor2 (clubId) {
      const clubConfig = this.getClubConfig(clubId)
      return clubConfig.color2 || ''
    },
    getClubColor3 (clubId) {
      const clubConfig = this.getClubConfig(clubId)
      return clubConfig.color3 || ''
    }
  },
  head () {
    return {
      title: `${this.$data.user.name}`
    }
  }
})
</script>

<style lang="scss" scoped>
.card-width {
  width: 216px;
}
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

.club-name {
  font-size: 0.8rem;
}
.gourmet-name {
  font-size: 1rem;
}
.card-header-title {
  padding: 8px;
}
.card-content {
  padding: 8px;
}
.pie-chart {
  max-width: 200px;
  margin:  10px auto;
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
  .club-name {
    font-size: 0.65rem;
  }
  .gourmet-name {
    font-size: 0.8rem;
  }
  .card-content {
    padding: 4px;
  }
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
