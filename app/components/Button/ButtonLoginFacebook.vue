<template>
  <b-button
    size="is-medium"
    icon-left="facebook"
    expanded
    type="is-facebook"
    :disabled="disabled"
    @click="loginFacebook"
  >
    Facebookアカウントで{{ usage }}
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
    loginFacebook () {
      this.$emit('login-facebook')
    }
  }
})
</script>
