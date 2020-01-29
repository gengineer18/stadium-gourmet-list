<template>
  <b-menu>
    <b-menu-list>
      <b-menu-item
        icon="settings"
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
        <b-menu-item
          v-for="club in clubJson"
          :key="club.id"
          icon="account"
          :label="club.name"
          tag="nuxt-link"
          :to="getClubPageLink(club.link)"
        />
      </b-menu-item>
    </b-menu-list>
  </b-menu>
  <!-- <div>
    <span v-for="club in clubJson" :key="club.id">
      <p>{{ club }}</p>
    </span>
  </div> -->
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    // eslint-disable-next-line vue/require-prop-types
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

<style>

</style>
