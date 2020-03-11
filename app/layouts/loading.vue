<template>
  <section>
    <div class="page-layout">
      <section class="main-content">
        <div class="container">
          <div class="content-inner">
            <nuxt />
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({

})
</script>

<style lang="scss" scoped>
.page-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main-content {
  margin-bottom: 3rem;
}
.container {
  width: 100%;
  max-width: 960px;
  margin: 32px auto 0;
  .content-inner {
    width: 96%;
    max-width: 720px;
    margin: 0 auto;
  }
}
</style>
