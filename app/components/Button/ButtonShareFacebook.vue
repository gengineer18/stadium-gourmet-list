<template>
  <a :href="facebookURL" target="_blank" rel="nofollow">
    <img src="~assets/img/sns/facebook.png" class="share-button">
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
    facebookURL (): string {
      const url = `https://stgrmeikan.com/club/${this.clubId}/post/${this.docRefId}`
      return `https://www.facebook.com/sharer/sharer.php?u=${url}`
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
