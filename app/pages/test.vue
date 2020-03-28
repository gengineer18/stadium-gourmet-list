<template>
  <section>
    <ul>
      <li v-for="(item, index) in list" :key="index">
        {{ item }}
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { db } from '~/plugins/firebase'
export default Vue.extend({
  data () {
    return {
      list: []
    }
  },
  mounted () {
    const snapshots = db.collectionGroup('posts').where('postId', '==', 'RR5sFRFCn6omas4lyvx4')
    snapshots.get()
      .then((querySnapshot: any) => {
        querySnapshot.doc.data()
        // querySnapshot.forEach((doc: any) => {
        //   console.log(doc.data())
        // })
      })
  }
})
</script>

<style>

</style>
