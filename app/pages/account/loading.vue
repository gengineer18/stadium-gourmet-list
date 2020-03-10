<template>
  <div>
    ログイン処理中...
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'loading',
  created () {
    this.$store.dispatch('user/checkAuth')
  },
  async mounted () {
    if (this.$store.state.user.isRegistered) {
      await this.$router.push('/')
    } else {
      await this.$router.push('/account/registration')
    }
  }
})
</script>

<style>

</style>
