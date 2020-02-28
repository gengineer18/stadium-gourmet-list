<template>
  <div>
    <the-header />
    <section class="main-content">
      <div class="container">
        <h1 class="TestLabel">
          現在αテスト中...
        </h1>
        <nuxt />
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
</script>>
export default {
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 32px;
}
.TestLabel {
  font-size: 2.5rem;
}
</style>
