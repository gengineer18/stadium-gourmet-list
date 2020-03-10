<template>
  <b-button
    size="is-medium"
    icon-left="twitter"
    expanded
    type="is-twitter"
    :disabled="disabled"
    @click="loginTwitter"
  >
    Twitterアカウントで{{ usage }}
  </b-button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    usage: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false
    }
  },
  methods: {
    loginTwitter () {
      this.$emit('login-twitter')
    }
  }
})
</script>
