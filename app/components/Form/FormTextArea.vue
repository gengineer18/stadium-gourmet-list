<template>
  <b-field label-position="on-border">
    <template slot="label">
      {{ label }} <span v-if="required" class="has-text-danger">(必須)</span>
    </template>
    <b-input
      v-bind="$attrs"
      :maxlength="maxLength"
      type="textarea"
      :placeholder="label"
      :required="required"
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
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      value: ''
    }
  }
})
</script>
