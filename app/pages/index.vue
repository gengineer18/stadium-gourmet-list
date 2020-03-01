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
    <div>
      <p>{{ $store.state.user.isAuth }}</p>
      <p>{{ $store.state.user.uid }}</p>
      <p>{{ $store.state.user.displayName }}でログイン中</p>
      <button @click="logOut">
        ログアウト
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
// import firebase from 'firebase'

export default Vue.extend({
  name: 'TopPage',
  mounted () {
    this.$store.dispatch('user/checkAuth')
  },
  methods: {
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
