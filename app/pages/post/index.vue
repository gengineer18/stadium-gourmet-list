<template>
  <section id="PostPage">
    <h1>投稿</h1>
    <validation-observer v-slot="{ invalid }">
      <form-input v-model="gourmet" label="スタグル名" :max-length="20" class="Form" :required="true" />
      <form-pulldown v-model="club" label="ホームチーム" :list-items="listItems" class="Form" />
      <form-input v-model="shop" label="店舗名" :max-length="20" class="Form" />
      <form-text-area v-model="comment" label="寸評" :max-length="140" class="Form" :required="true" />
      <form-date v-model="date" label="観戦した日" class="Form" />
      <div>
        <canvas ref="thumbnail" :width="0" :height="0" />
      </div>
      <input ref="input" type="file" accept=".jpg, .png" @change="resize">
      <div>
        <button @click="reset">
          ×
        </button>
      </div>
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
import { db, storage } from '~/plugins/firebase'
import FormInput from '@/components/Form/FormInput.vue'
import FormPulldown from '@/components/Form/FormPulldown.vue'
import FormTextArea from '@/components/Form/FormTextArea.vue'
import FormDate from '@/components/Form/FormDate.vue'
import { NewPost, PostData } from '@/types/post'

export default Vue.extend({
  components: {
    FormInput,
    FormPulldown,
    FormTextArea,
    FormDate
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
      postImage: {
        path: '',
        width: 0,
        height: 0
      },
      imagePath: ''
    }
  },
  computed: {
    refs ():any {
      return this.$refs
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
          // データの登録
          this.upload(docId, clubId)
        }
      })
    },
    resize (e: any) {
      const file = e.target.files[0]
      const image: HTMLImageElement = new Image()
      const reader: FileReader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target === null) { return }
        if (typeof e.target.result === 'string') {
          image.src = e.target.result
          image.onload = () => {
            this.postImage.path = image.width < 540 ? image.src : this.makeImage(image)
            this.makeTumbnail(image)
          }
        }
      }
    },
    makeImage (image: HTMLImageElement): string {
      const canvas: HTMLCanvasElement = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const ratio: number = image.height / image.width
      const width: number = 540
      const height: number = width * ratio
      canvas.width = width
      canvas.height = height
      if (ctx === null) { return '' }
      ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height)
      return canvas.toDataURL('image/png')
    },
    makeTumbnail (image: HTMLImageElement) {
      const canvas: HTMLCanvasElement = this.refs.thumbnail
      const ctx = canvas.getContext('2d')
      const ratio: number = image.width / image.height
      const height: number = 200
      const width: number = height * ratio
      canvas.height = height
      canvas.width = width
      if (ctx === null) { return '' }
      ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height)
    },
    reset () {
      const canvas: HTMLCanvasElement = this.refs.thumbnail
      this.postImage.path = ''
      canvas.height = 0
      canvas.width = 0
      this.refs.input.value = ''
    },
    upload (docId: string, clubId: string) {
      if (this.postImage.path !== '') { // 画像があれば
        const photoPath: string = this.postImage.path
        const storageRef = storage.ref().child(`clubs/${clubId}/${docId}.jpg`)
        storageRef.putString(photoPath, 'data_url').then((snapshot: any) => {
          storageRef.getDownloadURL().then(async (url) => {
            this.imagePath = url
            const postData: PostData = {
              gourmet: this.gourmet,
              club: this.club,
              shop: this.shop,
              comment: this.comment,
              date: this.date,
              imagePath: this.imagePath
            }
            this.reset()
            this.addDb(docId, clubId, postData)
            await this.$router.push(`/post/complete?docRefId=${docId}`)
          })
        })
      } else { // 画像の指定がない場合
        const postData: PostData = {
          gourmet: this.gourmet,
          club: this.club,
          shop: this.shop,
          comment: this.comment,
          date: this.date,
          imagePath: ''
        }
        this.addDb(docId, clubId, postData)
        this.$router.push(`/post/complete?docRefId=${docId}`)
      }
    },
    addDb (docId: string, clubId: string, postData: PostData): void {
      this.$store.dispatch('post/add', { postData, docId })
      this.$store.dispatch('club/add', { postData, docId, clubId })
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
