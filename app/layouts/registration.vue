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
      <footer-registration class="footer" />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import FooterRegistration from '@/components/Footer/FooterRegistration.vue'

export default Vue.extend({
  components: {
    FooterRegistration
  }
})
</script>

<style lang="scss" scoped>
.page-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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
.footer {
  margin-top: auto;
}
</style>
