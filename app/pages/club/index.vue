<template>
  <section id="club">
    <Menu area-name="北海道・東北" :club-json="clubsHokkaidoTohoku" class="Menu" />
    <Menu area-name="関東" :club-json="clubsKanto" class="Menu" />
    <Menu area-name="北信越" :club-json="clubsHokushinetsu" class="Menu" />
    <Menu area-name="東海" :club-json="clubsTokai" class="Menu" />
    <Menu area-name="関西" :club-json="clubsKansai" class="Menu" />
    <Menu area-name="中国" :club-json="clubsChugoku" class="Menu" />
    <Menu area-name="四国" :club-json="clubsShikoku" class="Menu" />
    <Menu area-name="九州・沖縄" :club-json="clubsKyushuOkinawa" class="Menu" />
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
      clubsHokkaidoTohoku: require('~/static/json/ClubsHokkaidoTohoku.json'),
      clubsKanto: require('~/static/json/ClubsKanto.json'),
      clubsHokushinetsu: require('~/static/json/ClubsHokushinetsu.json'),
      clubsTokai: require('~/static/json/ClubsTokai.json'),
      clubsKansai: require('~/static/json/ClubsKansai.json'),
      clubsChugoku: require('~/static/json/ClubsChugoku.json'),
      clubsShikoku: require('~/static/json/ClubsShikoku.json'),
      clubsKyushuOkinawa: require('~/static/json/ClubsKyushuOkinawa.json')
    }
  }
})
</script>

<style lang="scss" scoped>
.Menu {
  max-width: 540px;
  width: 95%;
  margin: 0 auto;
}
</style>
