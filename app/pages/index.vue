<template>
  <section id="toppage">
    <h1>デプロイOK</h1>
    <b-button
      type="is-sub"
      icon-left="soccer"
      size="is-large"
      tag="nuxt-link"
      to="/club"
      class="ClubButton"
    >
      クラブから探す
    </b-button>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TopPage'
})
</script>

<style lang="scss" scoped>
#toppage{
  max-width: 540px;
  width: 95%;
}
.ClubButton{
  margin: 0 auto;
}
</style>
