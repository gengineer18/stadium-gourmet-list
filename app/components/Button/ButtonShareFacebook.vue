<template>
  <b-button
    type="is-facebook"
    icon-left="facebook"
    tag="a"
    :href="facebookURL"
    target="_blank"
    class="share-button"
  />
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
  width: 60px;
  height: 40px;
}
</style>
