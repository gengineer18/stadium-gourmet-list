<template>
  <div>
    <the-header />
    <section class="main-content">
      <div class="container">
        <h1 class="TestLabel">
          現在αテスト中...
        </h1>
        <div class="content-inner">
          <nuxt />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TheHeader from '@/components/TheHeader.vue'

export default Vue.extend({
  components: {
    TheHeader
  }
})
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 960px;
  margin: 32px auto 0;
  .TestLabel {
    font-size: 2.5rem;
  }
  .content-inner {
    width: 100%;
    max-width: 720px;
    margin: 0 auto;
  }
}
</style>
