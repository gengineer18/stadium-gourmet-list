<template>
  <b-field label-position="on-border">
    <template slot="label">
      {{ label }} <span v-if="required" class="has-text-danger">(必須)</span>
    </template>
    <b-input
      v-bind="$attrs"
      :maxlength="maxLength"
      :placeholder="label"
      :required="required"
      :pattern="pattern"
      :validation-message="message"
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
    },
    pattern: {
      type: String,
      required: false,
      default: '.*'
    },
    message: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      value: ''
    }
  }
})
</script>
