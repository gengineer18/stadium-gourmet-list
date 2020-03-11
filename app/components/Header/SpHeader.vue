<template>
  <section class="background-primary">
    <b-navbar type="is-primary" class="max-width" close-on-click="true">
      <template slot="brand">
        <b-navbar-item tag="div" class="align-center is-black">
          <nuxt-link to="/">
            <span class="text-black">みんなで作るスタグル名鑑</span>
          </nuxt-link>
        </b-navbar-item>
      </template>

      <template slot="end">
        <div v-if="!$store.state.user.isAuth">
          <b-navbar-item tag="router-link" to="/account/login">
            <b-icon icon="login" />
            ログイン
          </b-navbar-item>
        </div>
        <div v-if="$store.state.user.isAuth">
          <b-navbar-item tag="div">
            <img :src="$store.state.user.photoURL" style="vertical-align: middle;">
            {{ $store.state.user.displayName }}
          </b-navbar-item>
          <hr class="dropdown-divider">
          <b-navbar-item tag="div" @click="logout">
            <b-icon icon="logout" />
            ログアウト
          </b-navbar-item>
        </div>
      </template>
    </b-navbar>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  created () {
    this.$store.dispatch('user/checkAuth')
  },
  beforeUpdate () {
    this.$store.dispatch('user/checkAuth')
  },
  methods: {
    logout () {
      this.$store.dispatch('user/logout')
      this.$router.push('/')
    }
  }
})
</script>

<style lang="scss">
@import "~assets/css/buefy.scss";
.background-primary {
  background-color: $primary
}
.max-width {
  width: 100%;
  max-width: 960px;
  margin: auto;
}
.text-black {
  color: $black
}
</style>
