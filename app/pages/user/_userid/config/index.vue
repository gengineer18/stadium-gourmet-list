<template>
  <section>
    <div>
      <p>名前: {{ displayName }}</p>
      <p>メールアドレス: {{ email }}</p>
    </div>
    <div>
      <p>アイコンの変更: {{ photoURL }}</p>
    </div>
    <div>
      <p>退会する</p>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import firebase from '~/plugins/firebase'

export default Vue.extend({
  data () {
    return {
      displayName: '',
      email: '',
      photoURL: ''
    }
  },
  created () {
    this.$store.dispatch('user/checkAuth')
  },
  mounted () {
    const user = firebase.auth().currentUser
    if (user != null) {
      this.displayName = user.displayName || ''
      this.email = user.email || ''
      this.photoURL = user.photoURL || ''
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
