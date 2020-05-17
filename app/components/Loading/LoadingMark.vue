<template>
  <div>
    <vue-simple-spinner
      size="100"
      :line-size="lineSize"
      message="NowLoading..."
      :font-size="fontSize"
      line-bg-color="#ccddcc"
      line-fg-color="#f6d04d"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      lineSize: 10,
      fontSize: 18
    }
  }
})
</script>
