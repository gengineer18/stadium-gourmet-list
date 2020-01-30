<template>
  <section class="section">
    <h2 class="title is-3 has-text-grey">
      "Just start  <b-icon
        icon="rocket"
        size="is-large"
      />"
    </h2>
    <h3 class="subtitle is-6 has-text-grey">
      Author: <a href="https://github.com/anteriovieira">
        Antério Vieira
      </a>
    </h3>
    <p>aaaaa{{ value }}</p>
    <validation-provider
      ref="messageForm"
      v-slot="{ errors }"
      rules="required|max:4"
      name="メッセージ"
    >
      <input
        v-model="message"
        type="text"
      >
      <p v-if="errors.length">
        <span v-for="(error, i) in errors" :key="`errors${i}`">
          {{ error }}
        </span>
      </p>
    </validation-provider>
    <h2 class="subtitle is-4 has-text-grey">
      北海道・東北
    </h2>
    <ul>
      <template>
        <li v-for="club in clubsHokkaidoTohoku" :key="club.id">
          {{ club.name }}: {{ club.stadium[0].name }}
        </li>
      </template>
    </ul>
    <h2 class="subtitle is-4 has-text-grey">
      関東
    </h2>
    <ul>
      <li v-for="club in clubsKanto" :key="club.id">
        {{ club.name }}: {{ club.stadium[0].name }}
      </li>
    </ul>
    <h2 class="subtitle is-4 has-text-grey">
      北信越
    </h2>
    <ul>
      <li v-for="club in clubsHokushinetsu" :key="club.id">
        {{ club.name }}: {{ club.stadium[0].name }}
      </li>
    </ul>
    <h2 class="subtitle is-4 has-text-grey">
      東海
    </h2>
    <ul>
      <li v-for="club in clubsTokai" :key="club.id">
        {{ club.name }}: {{ club.stadium[0].name }}
      </li>
    </ul>
    <h2 class="subtitle is-4 has-text-grey">
      関西
    </h2>
    <ul>
      <li v-for="club in clubsKansai" :key="club.id">
        {{ club.name }}: {{ club.stadium[0].name }}
      </li>
    </ul>
    <h2 class="subtitle is-4 has-text-grey">
      中国
    </h2>
    <ul>
      <li v-for="club in clubsChugoku" :key="club.id">
        {{ club.name }}: {{ club.stadium[0].name }}
      </li>
    </ul>
    <h2 class="subtitle is-4 has-text-grey">
      四国
    </h2>
    <ul>
      <li v-for="club in clubsShikoku" :key="club.id">
        {{ club.name }}: {{ club.stadium[0].name }}
      </li>
    </ul>
    <h2 class="subtitle is-4 has-text-grey">
      九州・沖縄
    </h2>
    <ul>
      <li v-for="club in clubsKyushuOkinawa" :key="club.id">
        {{ club.name }}: {{ club.stadium[0].name }}
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { ValidationProvider } from 'vee-validate'
import { db } from '~/plugins/firebase.js'

export default Vue.extend({
  components: {
    ValidationProvider
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
  },
  data () {
    return {
      value: 'hoge',
      message: 'message'
    }
  },
  created () :void {
    console.log('created')

    // db.collection('users').add({
    //   first: 'Adaaa',
    //   last: 'Lovelaceaaa',
    //   born: 1816
    // })
    //   .then(function (docRef) {
    //     console.log('Document written with ID: ', docRef.id)
    //   })
    //   .catch(function (error) {
    //     console.error('Error adding document: ', error)
    //   })

    db.collection('users').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`)
      })
    })
  }
})
</script>
