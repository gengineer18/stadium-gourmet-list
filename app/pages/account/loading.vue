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
    if (await this.$store.state.user.isRegistered) {
      console.log('true')
    } else {
      console.log('false')
    }
  }
})
</script>

<style>

</style>
