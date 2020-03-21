<template>
  <section>
    <h1 class="title is-5">
      ユーザー情報設定
    </h1>
    <loading-mark v-if="loading" />
    <div v-if="!loading">
      <div class="box">
        <h2 class="title is-6">
          名前を変更する
        </h2>
        <form-input
          v-model="displayName"
          label="名前"
          :max-length="20"
          :required="true"
        />
        <b-button v-if="!displayName" type="is-sub" disabled>
          変更する
        </b-button>
        <b-button v-if="displayName" type="is-sub" @click="updateName()">
          変更する
        </b-button>
      </div>
      <div class="box">
        <h2 class="title is-6">
          アイコンを変更する
        </h2>
        <img :src="photoURL" class="is-block mb-1">
        <b-button type="is-sub">
          アイコンの変更へ進む
        </b-button>
      </div>
      <div class="box box-danger">
        <h2 class="title is-6">
          退会する
        </h2>
        <p>退会処理を行うと二度と元に戻すことはできません。</p>
        <b-button type="is-danger">
          退会処理へ進む
        </b-button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import firebase from '~/plugins/firebase'
import FormInput from '@/components/Form/FormInput.vue'
import LoadingMark from '@/components/Loading/LoadingMark.vue'

export default Vue.extend({
  components: {
    FormInput,
    LoadingMark
  },
  data () {
    return {
      displayName: '',
      photoURL: '',
      loading: false
    }
  },
  created () {
    this.$store.dispatch('user/checkAuth')
  },
  mounted () {
    const user = firebase.auth().currentUser
    if (user != null) {
      this.displayName = user.displayName || ''
      this.photoURL = user.photoURL || ''
    }
  },
  methods: {
    updateName () {
      this.loading = true
      const user = firebase.auth().currentUser
      if (user === null) {
        console.error('ユーザーデータが取得できませんでした')
        return
      }
      user.updateProfile({
        displayName: this.displayName
      })
        .then(() => {
          const href = window.location.href
          window.location.href = href
        })
        .catch((error) => {
        // An error happened.
          console.error(error)
          this.loading = false
        })
    }
  }
})
</script>

<style lang="scss" scoped>
@import "~assets/css/buefy.scss";

.box {
  padding: 2rem;
  &-danger {
    border: 1px solid $danger;
  }
}
.mb-1 {
  margin-bottom: 1rem;
}
</style>
