<template>
  <section class="login-box">
    <div class="title-box has-text-centered">
      <h1 class="title is-4">
        ログイン
      </h1>
    </div>
    <div class="button-box">
      <span @click="loginTwitter">
        <button-twitter
          class="is-block button-margin"
          usage="ログイン"
        />
      </span>
      <span @click="loginFacebook">
        <button-facebook
          class="is-block button-margin"
          usage="ログイン"
        />
      </span>
      <span @click="loginGoogle">
        <button-google
          class="is-block button-margin"
          usage="ログイン"
        />
      </span>
    </div>
    <div class="to-signup-box has-text-centered">
      スタグル名鑑 のアカウントを持っていない場合は
      <nuxt-link to="/signup">
        新規登録
      </nuxt-link>
      から。
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import ButtonTwitter from '@/components/Button/ButtonTwitter.vue'
import ButtonFacebook from '@/components/Button/ButtonFacebook.vue'
import ButtonGoogle from '@/components/Button/ButtonGoogle.vue'

export default Vue.extend({
  components: {
    ButtonTwitter,
    ButtonFacebook,
    ButtonGoogle
  },
  methods: {
    async loginGoogle () {
      await this.$store.dispatch('user/loginGoogle')
      await this.$router.push('/')
    },
    async loginFacebook () {
      await this.$store.dispatch('user/loginFacebook')
      await this.$router.push('/')
    },
    async loginTwitter () {
      await this.$store.dispatch('user/loginTwitter')
      await this.$router.push('/')
    }
  }
})
</script>

<style lang="scss">
.login-box {
  width: 100%;
  max-width: 540px;
  margin: 0 auto;
  .title-box {
    border-bottom: 1px solid #dddddd;
    .title {
      margin: 1.3rem auto;
    }
  }
  .button-box {
    width: 100%;
    max-width: 360px;
    margin: auto;
    .button-margin {
      margin-top: 1rem;
    }
  }

  .to-signup-box {
    border-top: 1px solid #dddddd;
    margin-top: 1rem;
    padding-top: 1.3rem;
  }
}
</style>
