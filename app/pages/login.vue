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
        />
      </span>
      <span @click="loginGoogle">
        <button-google
          usage="ログイン"
          class="is-block btn-margin"
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
    <div>
      <p>
        <input
          v-model="email"
          type="text"
          placeholder="email"
        >
      </p>
      <p>
        <input
          v-model="password"
          type="password"
          placeholder="password"
        >
      </p>
      <button @click="loginPassword(email, password)">
        ログイン
      </button>
      <p>{{ email }}</p>
      <p>{{ password }}</p>
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
    },
    loginPassword (email: string, password: string) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (res: any) => {
          await this.$store.commit('user/setLoginState', res.user)
          await this.$router.push('/')
        })
        .catch((error) => {
          console.error('error!!!', error.code)
        })
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
