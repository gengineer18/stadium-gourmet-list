<template>
  <b-button
    size="is-medium"
    icon-left="facebook"
    expanded
    type="is-facebook"
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
    }
  }
})
</script>
