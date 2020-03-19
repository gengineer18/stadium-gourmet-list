<template>
  <section class="background-primary">
    <b-navbar type="is-primary" class="max-width" close-on-click="true">
      <template slot="brand">
        <b-navbar-item tag="div" style="padding-top:4px;">
          <nuxt-link to="/">
            <img src="~assets/logo.png" alt="logo">
          </nuxt-link>
        </b-navbar-item>
      </template>

      <template slot="end">
        <div>
          <b-navbar-item v-if="showLogin" tag="router-link" to="/account/login">
            <b-icon icon="login" />
            ログイン
          </b-navbar-item>
          <b-navbar-item v-if="!showLogin" tag="div">
            <img :src="$store.state.user.photoURL" style="vertical-align: middle;">
            {{ $store.state.user.displayName }}
          </b-navbar-item>
          <b-navbar-item v-if="!showLogin" tag="router-link" :to="userPageUrl">
            <b-icon icon="account" />
            設定
          </b-navbar-item>
          <hr class="dropdown-divider">
          <b-navbar-item tag="router-link" to="/about">
            About
          </b-navbar-item>
          <b-navbar-item tag="a" href="/terms" target="_blank">
            利用規約
          </b-navbar-item>
          <b-navbar-item tag="a" href="/privacy" target="_blank">
            プライバシー
          </b-navbar-item>
          <b-navbar-item tag="a" href="https://forms.gle/o9Bd2j7eFToEBX2RA" target="_blank">
            ご意見
          </b-navbar-item>
          <hr v-if="!showLogin" class="dropdown-divider">
          <b-navbar-item v-if="!showLogin" tag="div" @click="logout">
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
  computed: {
    showLogin (): boolean {
      return !this.$store.state.user.isAuth || this.$store.state.user.isAnonymous
    },
    userPageUrl () {
      return `/user/${this.$store.state.user.uid}/config`
    }
  },
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
