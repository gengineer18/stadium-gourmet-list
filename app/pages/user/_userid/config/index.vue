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
        <p class="is-size-7 mb-1">
          退会処理を行うと二度と元に戻すことはできません。<br>
          退会処理に進むためにはユーザーID&nbsp;
          <span class="has-text-weight-semibold has-text-danger">{{ uid }}</span>
          &nbsp;を入力してください。
        </p>
        <form-input v-model="inputUserId" label="ユーザーID" />
        <b-button
          v-if="!isCorrectUserId"
          type="is-danger"
          disabled
        >
          退会処理へ進む
        </b-button>
        <b-button
          v-if="isCorrectUserId"
          type="is-danger"
          @click="deleteUser"
        >
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
import { toastFail } from '@/utils/common'

export default Vue.extend({
  components: {
    FormInput,
    LoadingMark
  },
  data () {
    return {
      inputUserId: '',
      uid: '',
      displayName: '',
      photoURL: '',
      loading: false
    }
  },
  computed: {
    isCorrectUserId () {
      const user = firebase.auth().currentUser
      if (!user) { return false }
      return user.uid === this.$data.inputUserId
    }
  },
  created () {
    this.$store.dispatch('user/checkAuth')
  },
  mounted () {
    const user = firebase.auth().currentUser
    if (user != null) {
      this.uid = user.uid || ''
      this.displayName = user.displayName || ''
      this.photoURL = user.photoURL || ''
    }
  },
  methods: {
    async updateName (): Promise<void> {
      this.loading = true
      const user = await firebase.auth().currentUser
      if (user === null) {
        this.loading = false
        toastFail('ユーザーデータが取得できませんでした。')
        return
      }
      await user.updateProfile({
        displayName: this.displayName
      })
        .then(() => {
          const data = { displayName: this.displayName }
          this.$store.dispatch('user/updateCredential', { updateData: data, userId: user.uid })
            .then(() => {
              const href = window.location.href
              window.location.href = href
            })
        })
        .catch((error) => {
          console.error(error)
          this.loading = false
          toastFail('ユーザーデータの更新に失敗しました。')
        })
    },
    deleteUser (): void {
      this.$buefy.dialog.confirm({
        message: '本当に退会してよろしいですか?',
        cancelText: 'キャンセル',
        confirmText: '退会する',
        title: 'Jリーグ スタグル名鑑から退会する',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: async () => {
          this.loading = true
          let isDeleted = false
          const user = await firebase.auth().currentUser
          if (user === null) {
            this.loading = false
            toastFail('ユーザーデータが取得できませんでした。')
            return
          }
          const uid = user.uid
          await user.delete()
            .then(() => {
              this.$store.dispatch('user/deleteUser', { userId: uid })
              isDeleted = true
            })
            .catch((error) => {
              console.error(error)
              if (error.code === 'auth/requires-recent-login') {
                this.loading = false
                toastFail('ユーザーデータの削除に失敗しました。再度ログインし直してください。')
              }
              this.loading = false
              toastFail('ユーザーデータの削除に失敗しました。')
            })
            .then(() => {
              if (isDeleted) {
                window.location.href = '/'
              }
            })
        }
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
