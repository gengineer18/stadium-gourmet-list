<template>
  <section id="PostPage">
    <h1>投稿</h1>
    <validation-observer v-slot="{ invalid }">
      <form-input v-model="gourmet" label="スタグル名" :max-length="20" class="Form" :required="true" />
      <form-pulldown v-model="club" label="ホームチーム" :list-items="listItems" class="Form" />
      <form-input v-model="shop" label="店舗名" :max-length="20" class="Form" />
      <form-text-area v-model="comment" label="寸評" :max-length="140" class="Form" :required="true" />
      <form-date v-model="date" label="観戦した日" class="Form" />
      <form-file-upload v-model="file" label="写真" class="Form" />
      <span @click="sendData()">
        <b-button
          type="is-sub"
          icon-right="send"
          :disabled="invalid"
        >
          投稿
        </b-button>
      </span>
    </validation-observer>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import 'buefy'
import { db } from '~/plugins/firebase.js'
import FormInput from '@/components/Form/FormInput.vue'
import FormPulldown from '@/components/Form/FormPulldown.vue'
import FormTextArea from '@/components/Form/FormTextArea.vue'
import FormDate from '@/components/Form/FormDate.vue'
import FormFileUpload from '@/components/Form/FormFileUpload.vue'
import { NewPost } from '@/types/post'

export default Vue.extend({
  components: {
    FormInput,
    FormPulldown,
    FormTextArea,
    FormDate,
    FormFileUpload
  },
  asyncData () {
    return {
      listItems: require('~/static/json/AllClubsNameList.json')
    }
  },
  data (): NewPost {
    return {
      gourmet: '',
      club: {
        id: '',
        name: ''
      },
      shop: '',
      comment: '',
      date: null,
      file: null
    }
  },
  methods: {
    sendData () {
      this.$buefy.dialog.confirm({
        message: '投稿してよろしいですか?',
        cancelText: 'キャンセル',
        confirmText: 'OK',
        onConfirm: async () => {
          const docId: string = await db.collection('posts').doc().id
          const clubId: string = this.club.id
          const postData: NewPost = {
            gourmet: this.gourmet,
            club: this.club,
            shop: this.shop,
            comment: this.comment,
            date: this.date,
            file: this.file
          }
          // データの登録
          await this.$store.dispatch('post/add', { postData, docId })
          await this.$store.dispatch('club/add', { postData, docId, clubId })
          await this.$router.push(`/post/complete?docRefId=${docId}`)
        }
      })
    }
  }
})
</script>

<style>
.Form {
  max-width: 540px;
  width: 95%;
  margin: 0 auto;
}
</style>
