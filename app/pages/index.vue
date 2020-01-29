<template>
  <section id="toppage">
    <Menu area-name="北海道・東北" :club-json="clubsHokkaidoTohoku" />
    <Menu area-name="関東" :club-json="clubsKanto" />
    <Menu area-name="北信越" :club-json="clubsHokushinetsu" />
    <Menu area-name="東海" :club-json="clubsTokai" />
    <Menu area-name="関西" :club-json="clubsKansai" />
    <Menu area-name="中国" :club-json="clubsChugoku" />
    <Menu area-name="四国" :club-json="clubsShikoku" />
    <Menu area-name="九州・沖縄" :club-json="clubsKyushuOkinawa" />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Menu from '~/components/Menu.vue'

export default Vue.extend({
  name: 'TopPage',
  components: {
    Menu
  },
  asyncData () {
    return {
      clubsHokkaidoTohoku: require('~/assets/json/ClubsHokkaidoTohoku.json'),
      clubsKanto: require('~/assets/json/ClubsKanto.json'),
      clubsHokushinetsu: require('~/assets/json/ClubsHokushinetsu.json'),
      clubsTokai: require('~/assets/json/ClubsTokai.json'),
      clubsKansai: require('~/assets/json/ClubsKansai.json'),
      clubsChugoku: require('~/assets/json/ClubsChugoku.json'),
      clubsShikoku: require('~/assets/json/ClubsShikoku.json'),
      clubsKyushuOkinawa: require('~/assets/json/ClubsKyushuOkinawa.json')
    }
  }
})
</script>

<style scoped>
</style>
