<template>
  <b-field :label="label" label-position="on-border">
    <b-select :placeholder="label" expanded required>
      <template v-for="item in listItems">
        <option :key="item" :value="item.name">
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
      type: Object,
      required: true
    }
  }
})
</script>
