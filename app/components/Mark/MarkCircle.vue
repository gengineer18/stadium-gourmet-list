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
      required: false,
      default: ''
    },
    color3: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    setColor () {
      if (this.color3) {
        return `background-image: linear-gradient(-90deg, ${this.color3} 0 33%, ${this.color2} 33% 67%, ${this.color1} 67% 100%)`
      }
      if (this.color2) {
        return `background-image: linear-gradient(-90deg, ${this.color2} 0 50%, ${this.color1} 50% 100%)`
      }
      return `background-image: linear-gradient(-90deg, ${this.color1} 100%, ${this.color1})`
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
