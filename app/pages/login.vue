<template>
  <section>
    <div class="title-box has-text-centered">
      <h1 class="title is-4">
        ログイン
      </h1>
    </div>
    <div class="btn-width">
      <span @click="loginTwitter">
        <button-twitter
          usage="ログイン"
          class="is-block btn-margin"
        />
      </span>
      <span @click="loginFacebook">
        <button-facebook
          usage="ログイン"
          class="is-block btn-margin"
          click="loginFacebook"
        />
      </span>
      <span @click="loginGoogle">
        <button-google
          usage="ログイン"
          class="is-block btn-margin"
          click="loginGoogle"
        />
      </span>
    </div>
    <div class="signup-box">
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
