<template>
  <section class="background-primary">
    <b-navbar type="is-primary" class="max-width">
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

      <template slot="brand">
        <b-navbar-item tag="div" class="align-center">
          <nuxt-link to="/">
            <span style="color:black;">PCみんなで作るスタグル名鑑</span>
          </nuxt-link>
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item v-if="!$store.state.user.isAuth" tag="div">
          <b-button
            type="is-sub"
            icon-left="account"
            size="is-small"
            tag="nuxt-link"
            to="/signup"
          >
            <strong>ユーザー登録</strong>
          </b-button>
        </b-navbar-item>
        <b-navbar-item v-if="!$store.state.user.isAuth" tag="div">
          <b-button
            type="is-white"
            icon-left="login"
            size="is-small"
            tag="nuxt-link"
            to="/login"
          >
            <strong>ログイン</strong>
          </b-button>
        </b-navbar-item>
        <b-dropdown v-if="$store.state.user.isAuth" area-role="list" class="navbar-item">
          <a slot="trigger">
            <img :src="$store.state.user.photoURL" style="vertical-align: middle;">
            <span style="color:black;">{{ $store.state.user.displayName }}</span>
            <b-icon icon="menu-down" style="vertical-align: middle;" />
          </a>
          <b-dropdown-item area-role="menu-item" :focusable="false">
            <strong>{{ $store.state.user.displayName }}</strong><br>
            マイページ
          </b-dropdown-item>
          <hr class="dropdown-divider">
          <b-dropdown-item area-role="menu-item" :focusable="false" @click="logout">
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
.background-primary {
  background-color: #f6d04d
}
.max-width {
  width: 100%;
  max-width: 960px;
  margin: auto;
}
</style>
