<template>
  <footer class="footer">
    <div class="content has-text-centered footer-box">
      <div class="list-box">
        <nuxt-link to="/">
          <b-icon icon="home" class="text-black" />
          <p class="is-size-7 text-black">
            ホーム
          </p>
        </nuxt-link>
      </div>
      <div class="list-box">
        <nuxt-link to="/club">
          <b-icon icon="soccer" class="text-black" />
          <p class="is-size-7 text-black">
            クラブから探す
          </p>
        </nuxt-link>
      </div>
      <div class="list-box">
        <nuxt-link to="/post">
          <b-icon icon="pencil" class="text-black" />
          <p class="is-size-7 text-black">
            投稿する
          </p>
        </nuxt-link>
      </div>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "~assets/css/buefy.scss";

.footer-box {
  display:flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 100%;
  max-width: 960px;
  margin: auto;
}
.list-box {
  margin: auto 0;
  text-align: center;
  width: 33%;
  border-right: 1px solid $sub;
  color: $black;
}
.list-box:last-child {
  border-right: none;
}
.text-black {
  color: $black;
}
</style>
