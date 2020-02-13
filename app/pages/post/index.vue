<template>
  <section id="PostPage">
    <h1>投稿</h1>
    <validation-observer v-slot="{ invalid }">
      <form-input v-model="gourmet" label="スタグル名" :max-length="20" class="Form" :required="true" />
      <form-pulldown v-model="team" label="ホームチーム" :list-items="listItems" class="Form" />
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
    <p>スタグル名：{{ gourmet }}</p>
    <p>チーム名：{{ team }}</p>
    <p>店舗名：{{ shop }}</p>
    <p>寸評：{{ comment }}</p>
    <p>観戦日：{{ date }}</p>
    <p>写真：{{ file }}</p>
    <p>{{ posts }}</p>
    <ul>
      <li v-for="post in posts" :key="post.id">
        {{ post.id }}
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import 'buefy'
import { mapGetters } from 'vuex'
import { db } from '~/plugins/firebase.js'
import FormInput from '@/components/Form/FormInput.vue'
import FormPulldown from '@/components/Form/FormPulldown.vue'
import FormTextArea from '@/components/Form/FormTextArea.vue'
import FormDate from '@/components/Form/FormDate.vue'
import FormFileUpload from '@/components/Form/FormFileUpload.vue'
import { newPost } from '@/types/post'

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
  data (): newPost {
    return {
      gourmet: '',
      team: '',
      shop: '',
      comment: '',
      date: null,
      file: null,
      docRefId: ''
    }
  },
  computed: {
    // VuexからPostsデータを取得
    ...mapGetters({ posts: 'post/getPosts' })
  },
  created () {
    // firestoreのpostsをバインド
    this.$store.dispatch('post/setPostsRef', db.collection('posts'))
  },
  methods: {
    sendData () {
      this.$buefy.dialog.confirm({
        message: '投稿してよろしいですか?',
        cancelText: 'キャンセル',
        confirmText: 'OK',
        onConfirm: async () => {
          const dbdata = {
            gourmet: this.gourmet,
            team: this.team,
            shop: this.shop,
            comment: this.comment,
            date: this.date,
            file: this.file
          }
          // データの登録
          await db.collection('posts').add(dbdata)
            .then((docRef) => {
              this.docRefId = docRef.id
              console.log('Document written with ID: ', docRef.id)
            })
            .catch((error) => {
              console.error('Error adding document: ', error)
            })
          await this.$router.push(`/post/complete?docRefId=${this.docRefId}`)
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
