<template>
  <b-field :label="label" label-position="on-border">
    <b-input
      v-bind="$attrs"
      :maxlength="maxLength"
      :placeholder="label"
      type="search"
      v-on="$listeners"
    />
  </b-field>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    label: {
      type: String,
      required: true
    },
    maxLength: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      value: ''
    }
  }
})
</script>
