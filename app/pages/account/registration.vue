<template>
  <section class="registration-box">
    <div class="title-box has-text-centered">
      <h1 class="title is-4">
        スタグル名鑑へようこそ！
      </h1>
      <h2 class="subtitle is-6">
        ユーザー情報を登録できます。
      </h2>
    </div>
    <form-input v-model="displayName" label="ユーザー名" :max-length="20" :required="true" />
    <form-input v-model="email" label="メールアドレス" :max-length="254" :required="true" />
    <b-button
      type="is-primary"
      @click="register()"
    >
      登録
    </b-button>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import firebase from '~/plugins/firebase'
import FormInput from '@/components/Form/FormInput.vue'

export default Vue.extend({
  layout: 'registration',
  components: {
    FormInput
  },
  data () {
    return {
      checkbox: false,
      displayName: '',
      email: ''
    }
  },
  created () {
    this.$store.dispatch('user/checkAuth')
  },
  mounted () {
    this.displayName = this.$store.state.user.displayName
    this.email = this.$store.state.user.email
  },
  methods: {
    register (): void {
      const user = firebase.auth().currentUser
      if (user) {
        const uid = user.uid
          ? user.uid
          : ''
        if (this.displayName) {
          user.updateProfile({
            displayName: this.displayName
          })
        }
        if (this.email) {
          user.updateEmail(this.email)
        }
        this.$store.dispatch('user/setUserRegistered', { userData: {}, userId: uid })
      }
      this.$router.push('/')
    }
  }
})
</script>

<style lang="scss">
.registration-box {
  width: 100%;
  max-width: 540px;
  margin: 0 auto;
  .title-box {
    border-bottom: 1px solid #dddddd;
    margin-bottom: 2rem;
    .title {
      margin: 1.3rem auto;
    }
  }
}
</style>
