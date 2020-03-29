<template>
  <div class="container">
    <h1>{{ error.statusCode }}</h1>
    <p v-if="error.statusCode === 404">
      ページが見つかりません。
    </p>
    <p v-else>
      エラーが発生しました。
    </p>
    <nuxt-link to="/">
      トップに戻る
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>
