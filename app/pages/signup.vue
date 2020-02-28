<template>
  <div>
    <h1>新規ユーザー登録</h1>
    <b-button icon-left="facebook">
      Facebook
    </b-button>
    <b-button icon-left="google" @click="loginGoogle">
      Google
    </b-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {

  }
})
</script>

<style>

</style>
