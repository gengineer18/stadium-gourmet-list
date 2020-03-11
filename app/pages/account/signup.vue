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
    <div class="has-text-centered term-box">
      登録には
      <a href="/terms" target="_blank">利用規約</a>
      に同意する必要があります。
      <div>
        <b-checkbox v-model="checkbox">
          同意して登録する
        </b-checkbox>
      </div>
    </div>
    <div class="button-box">
      <span>
        <button-login-twitter
          class="is-block button-margin"
          usage="登録"
          :disabled="!checkbox"
          @login-twitter="loginTwitter($event)"
        />
      </span>
      <span>
        <button-login-facebook
          class="is-block button-margin"
          usage="登録"
          :disabled="!checkbox"
          @login-facebook="loginFacebook($event)"
        />
      </span>
      <span>
        <button-login-google
          class="is-block button-margin"
          usage="登録"
          :disabled="!checkbox"
          @login-google="loginGoogle($event)"
        />
      </span>
    </div>
    <div class="to-login-box has-text-centered">
      スタグル名鑑 のアカウントを<br>持っている場合は
      <nuxt-link to="/account/login">
        ログイン
      </nuxt-link>
      から。
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import ButtonLoginTwitter from '@/components/Button/ButtonLoginTwitter.vue'
import ButtonLoginFacebook from '@/components/Button/ButtonLoginFacebook.vue'
import ButtonLoginGoogle from '@/components/Button/ButtonLoginGoogle.vue'

export default Vue.extend({
  components: {
    ButtonLoginTwitter,
    ButtonLoginFacebook,
    ButtonLoginGoogle
  },
  data () {
    return {
      checkbox: false
    }
  },
  methods: {
    async loginGoogle (event: any) {
      await this.$store.dispatch('user/loginGoogle')
      await this.routing()
    },
    async loginFacebook (event: any) {
      await this.$store.dispatch('user/loginFacebook')
      await this.routing()
    },
    async loginTwitter (event: any) {
      await this.$store.dispatch('user/loginTwitter')
      await this.routing()
    },
    routing () {
      this.$router.push('/')
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

  .to-login-box {
    border-top: 1px solid #dddddd;
    margin-top: 1rem;
    padding-top: 1.3rem;
  }
}
</style>
