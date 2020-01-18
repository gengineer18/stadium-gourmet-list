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
    <p>{{ value }}</p>
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
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { ValidationProvider } from 'vee-validate'
export default Vue.extend({
  components: {
    ValidationProvider
  },
  data () {
    return {
      value: 'hoge',
      message: 'message'
    }
  },
  created () :void {
    console.log('created')
  }
})
</script>
