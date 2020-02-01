<template>
  <b-field :label="label" label-position="on-border">
    <b-datepicker
      v-model="date"
      :first-day-of-week="0"
      :placeholder="label"
      :month-names="monthNames"
      :day-names="dayNames"
    >
      <button
        class="button is-primary"
        @click="date = new Date()"
      >
        <b-icon icon="calendar-today" />
        <span>今日</span>
      </button>

      <button
        class="button is-danger"
        @click="date = null"
      >
        <b-icon icon="close" />
        <span>クリア</span>
      </button>
    </b-datepicker>
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
      date: null,
      monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      dayNames: ['日', '月', '火', '水', '木', '金', '土']
    }
  }
})
</script>
