<template>
  <section class="background-primary">
    <b-navbar type="is-primary" class="max-width">
      <template slot="brand">
        <b-navbar-item tag="div" class="align-center">
          <nuxt-link to="/">
            <img src="~assets/logo.png" alt="logo">
          </nuxt-link>
        </b-navbar-item>
      </template>

      <template slot="start">
        <b-navbar-item tag="div">
          <b-button
            type="is-sub"
            icon-left="soccer"
            size="is-small"
            tag="nuxt-link"
            to="/club"
          >
            <strong>クラブから探す</strong>
          </b-button>
        </b-navbar-item>
        <b-navbar-item tag="div">
          <b-button
            type="is-accent"
            icon-left="pencil"
            size="is-small"
            tag="nuxt-link"
            to="/post"
          >
            <strong>投稿する</strong>
          </b-button>
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item v-if="showLogin" tag="div">
          <b-button
            type="is-sub"
            icon-left="login"
            size="is-small"
            tag="nuxt-link"
            to="/account/login"
          >
            <strong>ログイン</strong>
          </b-button>
        </b-navbar-item>
        <b-dropdown v-if="!showLogin" area-role="list" class="navbar-item">
          <a slot="trigger">
            <img :src="$store.state.user.photoURL" style="vertical-align: middle;">
            <span class="text-black">
              {{ $store.state.user.displayName }}
              <b-icon icon="menu-down" style="vertical-align: middle;" />
            </span>
          </a>
          <b-dropdown-item area-role="menuitem" :focusable="false" @click="logout">
            <b-icon icon="logout" />
            ログアウト
          </b-dropdown-item>
        </b-dropdown>
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
