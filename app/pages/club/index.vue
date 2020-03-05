<template>
  <section id="club">
    <h1 class="title is-5">
      クラブから探す
    </h1>
    <Menu area-name="北海道・東北" :club-json="clubsHokkaidoTohoku" />
    <Menu area-name="関東" :club-json="clubsKanto" />
    <Menu area-name="北信越" :club-json="clubsHokushinetsu" />
    <Menu area-name="東海" :club-json="clubsTokai" />
    <Menu area-name="近畿" :club-json="clubsKinki" />
    <Menu area-name="中国・四国" :club-json="clubsChugokuShikoku" />
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
    const json = require('~/static/json/AllClubsList.json')
    return {
      clubsHokkaidoTohoku: json[0].hokkaidoTohoku.list,
      clubsKanto: json[1].kanto.list,
      clubsHokushinetsu: json[2].hokushinetsu.list,
      clubsTokai: json[3].tokai.list,
      clubsKinki: json[4].kinki.list,
      clubsChugokuShikoku: json[5].chugokuShikoku.list,
      clubsKyushuOkinawa: json[6].kyushuOkinawa.list
    }
  }
})
</script>
