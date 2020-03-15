<template>
  <section>
    <div v-if="$ua.deviceType() === 'pc'" class="page-layout-pc">
      <pc-header />
      <section class="main-content">
        <div class="container">
          <nuxt />
        </div>
      </section>
      <pc-footer class="pc-footer" />
    </div>
    <div v-if="$ua.deviceType() !== 'pc'" class="page-layout-sp">
      <sp-header />
      <section class="main-content">
        <div class="container">
          <nuxt />
        </div>
      </section>
      <sp-footer class="sp-footer" />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import PcHeader from '@/components/Header/PcHeader.vue'
import SpHeader from '@/components/Header/SpHeader.vue'
import PcFooter from '@/components/Footer/PcFooter.vue'
import SpFooter from '@/components/Footer/SpFooter.vue'

export default Vue.extend({
  components: {
    PcHeader,
    SpHeader,
    PcFooter,
    SpFooter
  }
})
</script>

<style lang="scss" scoped>
.page-layout-pc {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.page-layout-sp {
  display: flex;
  flex-direction: column;
  padding-bottom: 11vh;
}
.main-content {
  margin-bottom: 3rem;
}
.container {
  width: 100%;
  max-width: 960px;
}

.pc-footer {
  margin-top: auto;
}
.sp-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 11vh;
}
</style>
