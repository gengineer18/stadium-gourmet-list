<template>
  <section class="login-box">
    <div class="title-box has-text-centered">
      <h1 class="title is-4">
        ログイン
      </h1>
    </div>
    <div class="button-box">
      <span @click="loginTwitter">
        <button-login-twitter
          class="is-block button-margin"
          usage="ログイン"
        />
      </span>
      <span @click="loginFacebook">
        <button-login-facebook
          class="is-block button-margin"
          usage="ログイン"
        />
      </span>
      <span @click="loginGoogle">
        <button-login-google
          class="is-block button-margin"
          usage="ログイン"
        />
      </span>
    </div>
    <div class="terms-text-box has-text-centered">
      <span class="is-block">サインインすることにより、</span>
      <span class="is-block">
        <a href="/terms" target="_blank" class="link">
          利用規約
        </a>
        および
        <a href="/privacy" target="_blank" class="link">
          プライバシーポリシー
        </a>
        に同意したとみなされます。
      </span>
    </div>
    <div class="to-signup-box has-text-centered">
      <nuxt-link to="/account/signup" class="link">
        <strong>新規登録はこちら</strong>
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
      title: 'ログイン'
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
  .to-signup-box {
    padding-top: 1.3rem;
    .link {
      color: $sub;
    }
  }
}
</style>
