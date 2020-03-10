<template>
  <section class="registration-box">
    <div class="title-box has-text-centered">
      <h1 class="title is-4">
        スタグル名鑑へようこそ！
      </h1>
      <h2 class="subtitle is-6">
        新規登録(無料)して利用を開始しましょう。
      </h2>
    </div>
    <form-input v-model="displayName" label="ユーザー名" :max-length="20" :required="true" />
    <div class="field">
      <b-checkbox v-model="checkbox">
        <a href="/terms" target="_blank">利用規約</a>に同意する
      </b-checkbox>
    </div>
    <b-button
      :class="[checkbox === true ? 'is-primary' : '' ]"
      type="is-primary"
      :disabled="!checkbox"
    >
      利用規約に同意して登録
    </b-button>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import FormInput from '@/components/Form/FormInput.vue'

export default Vue.extend({
  layout: 'registration',
  components: {
    FormInput
  },
  data () {
    return {
      checkbox: false,
      displayName: ''
    }
  }
})
</script>

<style lang="scss">
.registration-box {
  width: 100%;
  max-width: 540px;
  margin: 0 auto;
  .title-box {
    border-bottom: 1px solid #dddddd;
    margin-bottom: 2rem;
    .title {
      margin: 1.3rem auto;
    }
  }
}
</style>
