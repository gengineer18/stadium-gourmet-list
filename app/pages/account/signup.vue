<template>
  <section class="login-box">
    <div class="title-box has-text-centered">
      <h1 class="title is-4">
        スタグル名鑑へようこそ！
      </h1>
      <h2 class="subtitle is-6">
        新規登録(無料)して利用を開始しましょう。
      </h2>
    </div>
    <div class="button-box">
      <span @click="loginTwitter">
        <button-login-twitter
          class="is-block button-margin"
          usage="登録"
        />
      </span>
      <span @click="loginFacebook">
        <button-login-facebook
          class="is-block button-margin"
          usage="登録"
        />
      </span>
      <span @click="loginGoogle">
        <button-login-google
          class="is-block button-margin"
          usage="登録"
        />
      </span>
    </div>
    <div class="terms-text-box has-text-centered">
      サインインすることにより、
      <a href="/terms" target="_blank" class="link">
        利用規約
      </a>
      および
      <a href="/privacy" target="_blank" class="link">
        プライバシーポリシー
      </a>
      に同意したとみなされます。
    </div>
    <div class="to-login-box has-text-centered">
      <nuxt-link to="/account/login" class="link">
        <strong>ログインはこちら</strong>
      </nuxt-link>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import ButtonLoginTwitter from '@/components/Button/ButtonLoginTwitter.vue'
import ButtonLoginFacebook from '@/components/Button/ButtonLoginFacebook.vue'
import ButtonLoginGoogle from '@/components/Button/ButtonLoginGoogle.vue'

export default Vue.extend({
  middleware: 'redirectSSR',
  components: {
    ButtonLoginTwitter,
    ButtonLoginFacebook,
    ButtonLoginGoogle
  },
  methods: {
    async loginGoogle () {
      await this.$store.dispatch('user/loginGoogle')
      await this.routing()
    },
    async loginFacebook () {
      await this.$store.dispatch('user/loginFacebook')
      await this.routing()
    },
    async loginTwitter () {
      await this.$store.dispatch('user/loginTwitter')
      await this.routing()
    },
    routing () {
      this.$router.push('/')
    }
  },
  head () {
    return {
      title: '新規登録'
    }
  }
})
</script>

<style lang="scss">
@import '~assets/css/buefy.scss';

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
  .term-box {
    margin-top: 1rem;
  }
  .button-box {
    width: 100%;
    max-width: 360px;
    margin: auto;
    .button-margin {
      margin-top: 1rem;
    }
  }
  .terms-text-box {
    border-top: 1px solid #dddddd;
    margin-top: 1rem;
    padding-top: 1.3rem;
    font-size: 0.7rem;
    .link {
      color: $sub;
    }
  }
  .to-login-box {
    padding-top: 1.3rem;
    .link {
      color: $sub;
    }
  }
}
</style>
