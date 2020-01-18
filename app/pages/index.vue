<template>
  <section class="section">
    <div
      v-touch:swipe.left="() => $router.push('/inspire')"
      v-touch:swipe.right="() => $router.push('/inspire')"
      class="columns is-mobile"
    >
      <card
        title="Free"
        icon="github-circle"
      >
        Open source on <a href="https://github.com/buefy/buefy">
          GitHub
        </a>
      </card>

      <card
        title="Responsive"
        icon="cellphone-link"
      >
        <b class="has-text-grey">
          Every
        </b> component is responsive
      </card>

      <card
        title="Modern"
        icon="alert-decagram"
      >
        Built with <a href="https://vuejs.org/">
          Vue.js
        </a> and <a href="http://bulma.io/">
          Bulma
        </a>
      </card>

      <card
        title="Lightweight"
        icon="arrange-bring-to-front"
      >
        No other internal dependency
      </card>
    </div>
    <div>
      <p>{{ deviceType }}</p>
    </div>
    <div>
      <nuxt-link
        v-scroll-to="'#anchor'"
        to
      >
        アンカーへリンク
      </nuxt-link>
      <a id="anchor"> 到着！ </a>
    </div>
  </section>
</template>

<script lang="ts">
import { Context } from 'vm'
import Vue from 'vue'
import Card from '~/components/Card.vue'

export default Vue.extend({
  name: 'HomePage',
  components: {
    Card
  },
  async asyncData (context: Context): Promise<any> {
    const deviceType: string = await context.$ua.deviceType()
    return { deviceType }
  }
})
</script>

<style scoped>
#anchor {
  display: block;
  margin-top: 200vh;
  margin-bottom: 100vh;
}
</style>
