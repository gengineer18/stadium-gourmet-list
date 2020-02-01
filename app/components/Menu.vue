<template>
  <b-menu>
    <b-menu-list>
      <b-menu-item
        icon="soccer"
        :active="isActive"
        :expanded="isActive"
        @click="isActive = !isActive"
      >
        <template slot="label" slot-scope="props">
          {{ areaName }}
          <b-icon
            class="is-pulled-right"
            :icon="props.expanded ? 'menu-down' : 'menu-up'"
          />
        </template>
        <div
          v-for="club in clubJson"
          :key="club.id"
        >
          <mark-circle :color1="club.color1" :color2="club.color2" class="is-inline-block" />
          <b-menu-item
            :label="club.name"
            tag="nuxt-link"
            :to="getClubPageLink(club.spell)"
            class="is-inline-block MenuItem"
          />
        </div>
      </b-menu-item>
    </b-menu-list>
  </b-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import MarkCircle from '@/components/MarkCircle.vue'

export default Vue.extend({
  components: {
    MarkCircle
  },
  props: {
    areaName: {
      type: String,
      required: true
    },
    clubJson: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    getClubPageLink () {
      return (clubname: string): string => {
        return `/club/${clubname}`
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.MenuItem {
  width: calc(100% - 24px);
}
</style>
