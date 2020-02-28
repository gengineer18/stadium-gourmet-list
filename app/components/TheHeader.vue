<template>
  <section class="background-primary">
    <b-navbar type="is-primary" class="max-width">
      <template slot="start">
        <b-navbar-item tag="div">
          <b-button
            type="is-sub"
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
            <span style="color:black;">みんなで作るスタグル名鑑</span>
          </nuxt-link>
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <b-button
            type="is-sub"
            icon-left="account"
            size="is-small"
            tag="nuxt-link"
            to="/post"
          >
            <strong>ユーザー登録</strong>
          </b-button>
        </b-navbar-item>
        <b-navbar-item tag="div">
          <b-button
            type="is-white"
            icon-left="login"
            size="is-small"
            tag="nuxt-link"
            to="/post"
          >
            <strong>ログイン</strong>
          </b-button>
        </b-navbar-item>
      </template>
    </b-navbar>
  </section>
</template>

<script>
export default {

}
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
