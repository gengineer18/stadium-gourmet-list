<template>
  <div class="Circle" :style="setColor" />
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    color1: {
      type: String,
      required: true
    },
    color2: {
      type: String,
      required: true
    }
  },
  computed: {
    setColor () {
      return `background-image: linear-gradient(-90deg, ${this.color2} 50%, ${this.color1} 50%, ${this.color1})`
    }
  }
})
</script>

<style lang="scss" scoped>
.Circle {
  width: 1rem;
  height: 1rem;
  border: 1px solid #DDD;
  border-radius: 50%;
}
</style>
