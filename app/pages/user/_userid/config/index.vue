<template>
  <section>
    <div>
      <form-input
        v-model="displayName"
        label="名前"
        :max-length="20"
        :required="true"
      />
      <form-input
        v-model="email"
        label="メールアドレス"
        :max-length="254"
        :required="true"
      />
    </div>
    <div>
      <p>アイコンの変更: {{ photoURL }}</p>
    </div>
    <div class="danger-area">
      <p>退会する</p>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import firebase from '~/plugins/firebase'
import FormInput from '@/components/Form/FormInput.vue'

export default Vue.extend({
  components: {
    FormInput
  },
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
