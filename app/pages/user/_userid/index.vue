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
      <div class="pie">
        <div class="pie-container">
          <div class="pie-chart">
            <pie-chart :graph="setGraph" />
          </div>
          <div v-if="$ua.deviceType() === 'pc'" class="pie-legend">
            <template v-for="countItem in counter">
              <div v-if="countItem.count !== 0" :key="countItem.id">
                <mark-circle
                  :color1="getClubColor1(countItem.id)"
                  :color2="getClubColor2(countItem.id)"
                  :color3="getClubColor3(countItem.id)"
                  class="is-inline-block va-mid"
                />
                <span class="is-inline-block va-mid club-name">{{ getClubName(countItem.id) }}</span>
                <span class="is-inline-block va-mid club-name">{{ countItem.count }}件</span>
              </div>
            </template>
          </div>
        </div>
        <div v-if="$ua.deviceType() !== 'pc'" class="pie-announce-sp">
          円グラフをタップすることで、各クラブ別の投稿件数が確認できます。
        </div>
      </div>
      <ul class="menu-list is-flex has-text-centered">
        <template v-for="postItem in storedPosts">
          <nuxt-link v-if="!postItem.isDeleted" :key="postItem.id" :to="getMenuPath(postItem.club.id, postItem.id)">
            <li>
              <div class="card card-width">
                <header class="card-header has-text-centered">
                  <img :src="getImagePath(postItem.imagePath)" class="Thumbnail card-header-title">
                </header>
                <div class="card-content">
                  <mark-circle
                    :color1="getClubColor1(postItem.club.id)"
                    :color2="getClubColor2(postItem.club.id)"
                    :color3="getClubColor3(postItem.club.id)"
                    class="is-inline-block va-mid"
                  />
                  <span class="club-name va-mid">{{ getClubName(postItem.club.id) }}</span>
                  <p class="gourmet-name">
                    {{ postItem.gourmet }}
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
            backgroundColor,
            borderColor: '#EEE',
            borderWidth: 1
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
.pie {
  width: 560px;
  margin: 10px auto;
  &-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  &-chart {
    max-width: 216px;
  }
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
  .pie {
    width: 320px;
    margin: 10px auto;
    &-container {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    &-chart {
      max-width: 216px;
    }
    &-announce-sp {
      margin-top: 1rem;
      font-size: .5rem;
    }
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
