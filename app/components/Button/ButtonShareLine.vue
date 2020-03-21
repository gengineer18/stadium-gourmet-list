<template>
  <a :href="lineURL" target="_blank" rel="nofollow">
    <img src="~assets/img/sns/line.png" class="share-button">
  </a>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    clubId: {
      type: String,
      required: true
    },
    docRefId: {
      type: String,
      required: true
    }
  },
  computed: {
    lineURL (): string {
      const url = `https://stgrmeikan.com/club/${this.clubId}/post/${this.docRefId}`
      return `https://timeline.line.me/social-plugin/share?url=${url}`
    }
  }
})
</script>

<style lang="scss" scoped>
.share-button {
  width: 32px;
  height: 32px;
}
</style>
