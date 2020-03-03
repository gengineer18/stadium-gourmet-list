<template>
  <b-field label-position="on-border">
    <template slot="label">
      {{ label }} <span class="has-text-danger">(必須)</span>
    </template>
    <b-select
      v-bind="$attrs"
      :placeholder="label"
      expanded
      required
      v-on="$listeners"
    >
      <template v-for="item in listItems">
        <option :key="item.id" :value="item">
          {{ item.name }}
        </option>
      </template>
    </b-select>
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
    listItems: {
      type: Array,
      required: true
    }
  }
})
</script>
