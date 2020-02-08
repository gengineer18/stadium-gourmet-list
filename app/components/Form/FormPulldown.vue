<template>
  <b-field :label="label" label-position="on-border">
    <b-select
      v-bind="$attrs"
      :placeholder="label"
      expanded
      required
      v-on="$listeners"
    >
      <template v-for="item in listItems">
        <option :key="item.spell" :value="item">
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
