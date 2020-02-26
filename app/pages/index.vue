<template>
  <section id="toppage">
    <b-button
      type="is-sub"
      icon-left="soccer"
      size="is-large"
      tag="nuxt-link"
      to="/club"
      class="ClubButton"
    >
      クラブから探す
    </b-button>
    <div v-if="!isLogin">
      <button @click="loginTwitter">
        Twitterでログイン
      </button>
      <button @click="loginFacebook">
        Facebookでログイン
      </button>
      <button @click="loginGoogle">
        Googleでログイン
      </button>
    </div>
    <div v-else>
      <p>{{ user.displayName }}でログイン中</p>
      <button @click="logOut">
        ログアウト
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import firebase from 'firebase'

export default Vue.extend({
  name: 'TopPage',
  asyncData () {
    return {
      isLogin: false,
      user: []
    }
  },
  mounted () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$data.isLogin = true
        this.$data.user = user
      } else {
        this.$data.isLogin = false
        this.$data.user = []
      }
    })
  },
  methods: {
    loginGoogle () {
      this.$store.dispatch('user/loginGoogle')
    },
    loginFacebook () {
      this.$store.dispatch('user/loginFacebook')
    },
    loginTwitter () {
      this.$store.dispatch('user/loginTwitter')
    },
    logOut () {
      this.$store.dispatch('user/logout')
    }
  }
})
</script>

<style lang="scss" scoped>
#toppage{
  max-width: 540px;
  width: 95%;
}
.ClubButton{
  margin: 0 auto;
}
</style>
