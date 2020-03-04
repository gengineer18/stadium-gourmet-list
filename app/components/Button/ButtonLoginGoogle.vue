<template>
  <b-button
    size="is-medium"
    icon-left="google"
    expanded
    type="is-google"
  >
    Googleアカウントで{{ usage }}
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
