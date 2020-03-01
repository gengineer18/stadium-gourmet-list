<template>
  <section>
    <div class="title-box has-text-centered">
      <h1 class="title is-4">
        スタグル名鑑へようこそ！
      </h1>
      <h2 class="subtitle is-6">
        新規登録(無料)して利用を開始しましょう。
      </h2>
    </div>
    <div class="btn-width">
      <span @click="loginTwitter">
        <button-twitter
          usage="登録"
          class="is-block btn-margin"
        />
      </span>
      <span @click="loginFacebook">
        <button-facebook
          usage="登録"
          class="is-block btn-margin"
        />
      </span>
      <span @click="loginGoogle">
        <button-google
          usage="登録"
          class="is-block btn-margin"
        />
      </span>
    </div>
    <div class="signup-box">
      スタグル名鑑 のアカウントを持っている場合は
      <nuxt-link to="/login">
        ログイン
      </nuxt-link>
      から。
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import firebase from 'firebase'
import ButtonTwitter from '@/components/Button/ButtonTwitter.vue'
import ButtonFacebook from '@/components/Button/ButtonFacebook.vue'
import ButtonGoogle from '@/components/Button/ButtonGoogle.vue'

export default Vue.extend({
  components: {
    ButtonTwitter,
    ButtonFacebook,
    ButtonGoogle
  },
  data () {
    return {
      email: '',
      password: ''
    }
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
.title-box {
  border-bottom: 1px solid #dddddd;
}
.title {
  margin: 1.3rem auto;
}
.btn-width {
  width: 100%;
  max-width: 360px;
}
.btn-margin {
  margin-top: 1rem;
}
.signup-box {
  border-top: 1px solid #dddddd;
  margin-top: 1rem;
  padding-top: 1.3rem;
}
</style>
