<template>
  <section class="background-primary">
    <b-navbar type="is-primary" class="max-width">
      <template slot="brand">
        <b-navbar-item tag="div" class="align-center">
          <nuxt-link to="/">
            <span style="color:black;">SPみんなで作るスタグル名鑑</span>
          </nuxt-link>
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item v-if="!$store.state.user.isAuth" tag="router-link" to="/signup">
          ユーザー登録
        </b-navbar-item>
        <b-navbar-item v-if="!$store.state.user.isAuth" tag="router-link" to="/login">
          ログイン
        </b-navbar-item>
        <b-navbar-dropdown v-if="$store.state.user.isAuth" :label="$store.state.user.displayName">
          <b-navbar-item tag="div" @click="logout">
            ログアウト
          </b-navbar-item>
        </b-navbar-dropdown>
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
