<template>
  <b-button
    size="is-medium"
    icon-left="twitter"
    expanded
    type="is-twitter"
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
    }
  }
})
</script>
