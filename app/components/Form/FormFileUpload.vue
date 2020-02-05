<template>
  <b-field class="file">
    <b-upload
      v-model="file"
      v-bind="$attrs"
      accept=".jpg, .png"
      v-on="$listeners"
    >
      <a class="button is-primary">
        <b-icon icon="upload" />
        <span>{{ label }}をアップロード</span>
      </a>
    </b-upload>
    <span v-if="file" class="file-name">
      {{ file.name }}
    </span>
  </b-field>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    label: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      file: null
    }
  }
})
</script>
