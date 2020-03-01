<template>
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
</template>

<script lang="ts">
import Vue from 'vue'
import firebase from 'firebase'
export default Vue.extend({
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    createPassword (email: string, password: string) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (res: any) => {
          await this.$store.commit('user/setLoginState', res.user)
          await this.$router.push('/')
        })
        .catch((error) => {
          console.error('error!!!', error.code)
        })
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

<style>

</style>
