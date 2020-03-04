<template>
  <b-button
    type="is-twitter"
    icon-left="twitter"
    tag="a"
    :href="twitterURL"
    target="_blank"
    rel="nofollow"
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
    },
    gourmet: {
      type: String,
      required: true
    },
    comment: {
      type: String,
      required: true
    }
  },
  computed: {
    twitterURL (): string {
      const url = `https://stgrmeikan.com/club/${this.clubId}/post/${this.docRefId}`
      const gourmet = encodeURIComponent(this.gourmet)
      const comment = encodeURIComponent(this.comment)
      const hashtag = encodeURIComponent('スタグル名鑑')
      return `https://twitter.com/intent/tweet?url=${url}&text=${gourmet}:${comment}&hashtags=${hashtag}`
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
