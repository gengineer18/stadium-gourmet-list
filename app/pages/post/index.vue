<template>
  <section>
    <h1 class="title is-5">
      投稿する
    </h1>
    <div class="form-team">
      <form-pulldown
        v-model="club"
        label="ホームチーム"
        :list-items="listItems"
      />
    </div>
    <div>
      <form-input
        v-model="gourmet"
        label="スタグル名"
        :max-length="20"
        :required="true"
      />
    </div>
    <div class="form-image">
      <div v-show="!postImage.path">
        <img src="~/assets/default-photo.png">
      </div>
      <div v-show="postImage.path">
        <canvas
          ref="thumbnail"
          :width="0"
          :height="0"
        />
      </div>
      <label class="button is-sub is-small">
        <b-icon
          icon="camera"
          size="is-small"
        />
        写真をアップロード
        <input
          ref="input"
          type="file"
          accept=".jpg, .png"
          class="input-photo"
          @change="resize"
        >
      </label>
      <span @click="reset">
        <b-button
          icon-left="close-circle"
          type="is-light"
          size="is-small"
        >
          写真をリセット
        </b-button>
      </span>
    </div>

    <div class="form-price">
      <form-input
        v-model="price"
        label="価格(円)"
        :max-length="5"
        pattern="[0-9]*"
        message="価格は半角数字で入力してください"
      />
    </div>
    <div class="form-not-required">
      <form-input
        v-model="shop"
        label="店舗名"
        :max-length="20"
      />
    </div>
    <div class="form-not-required">
      <form-date
        v-model="gameDate"
        label="観戦した日"
      />
    </div>
    <div class="form-comment">
      <form-text-area
        v-model="comment"
        label="寸評"
        :max-length="140"
        :required="true"
      />
    </div>

    <div v-if="!this.$store.state.user.isAuth" class="mb-1rem">
      <p class="is-size-7">
        あなたはゲストユーザーです。<br>
        投稿するためには
        <nuxt-link to="/account/login" class="link">
          ログイン
        </nuxt-link>
        するか、ゲストパスを発行する必要があります。<br>
        (ゲストパスの発行により、
        <a href="/terms" target="_blank" class="link">
          利用規約
        </a>
        および
        <a href="/privacy" target="_blank" class="link">
          プライバシーポリシー
        </a>
        に同意したとみなされます。)
      </p>
      <b-button v-if="isLoading" loading class="mb-1rem">
        ゲストパスを発行する
      </b-button>
      <b-button
        v-if="!isLoading"
        class="is-accent"
        @click="anonymous()"
      >
        ゲストパスを発行する
      </b-button>
    </div>
    <span
      v-if="clickable"
      @click="sendData()"
    >
      <b-button
        type="is-sub"
        icon-left="send"
      >
        投稿する
      </b-button>
    </span>
    <div v-if="!clickable">
      <b-button
        type="is-sub"
        icon-left="send"
        disabled
      >
        投稿する
      </b-button>
      <span class="is-block has-text-danger is-size-7">
        必須項目を入力してください
      </span>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import 'buefy'
import firebase, { db, storage } from '~/plugins/firebase'
import FormInput from '@/components/Form/FormInput.vue'
import FormPulldown from '@/components/Form/FormPulldown.vue'
import FormTextArea from '@/components/Form/FormTextArea.vue'
import FormDate from '@/components/Form/FormDate.vue'
import { PostData } from '@/types/post'
import { defaultImagePath } from '@/utils/common'

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
  data () {
    return {
      gourmet: '',
      club: {
        id: '',
        name: ''
      },
      shop: '',
      comment: '',
      gameDate: null,
      postImage: {
        path: '',
        width: 0,
        height: 0
      },
      imagePath: '',
      user: {
        id: '',
        name: ''
      },
      price: null,
      isLoading: false
    }
  },
  computed: {
    refs ():any {
      return this.$refs
    },
    clickable (): boolean {
      return !!this.gourmet && !!this.club && !!this.comment && !!this.$store.state.user.isAuth
    }
  },
  methods: {
    anonymous () {
      this.isLoading = true
      firebase.auth().signInAnonymously()
        .then(async (user) => {
          await this.$store.dispatch('user/loginAnonymous', user)
          await firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              this.isLoading = false
            }
          })
        })
    },
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
      const width: number = 300
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
      const ratio: number = image.height / image.width
      const width: number = 300
      const height: number = width * ratio
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
              gameDate: this.gameDate,
              imagePath: this.imagePath,
              user: {
                id: this.$store.getters['user/userId'],
                name: this.$store.getters['user/userName']
              },
              price: this.price
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
          gameDate: this.gameDate,
          imagePath: defaultImagePath,
          user: {
            id: this.$store.getters['user/userId'],
            name: this.$store.getters['user/userName']
          },
          price: this.price
        }
        this.addDb(docId, clubId, postData)
        this.$router.push(`/post/complete?docRefId=${docId}`)
      }
    },
    addDb (docId: string, clubId: string, postData: PostData): void {
      this.$store.dispatch('post/add', { postData, docId })
      this.$store.dispatch('club/add', { postData, docId, clubId })
      if (this.$store.state.user.isAuth) {
        const userId = this.$store.state.user.uid
        this.$store.dispatch('user/add', { postData, docId, userId })
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~assets/css/buefy.scss';

.form-image {
  margin-bottom: 1.6rem;
}
.form-team {
  margin-bottom: 1.6rem;
}
.form-price {
  margin-bottom: 0.5rem;
}
.form-not-required {
  margin-bottom: 0.2rem;
}
.form-comment {
  margin-top: 1.6rem;
}
.input-photo {
  display: none;
}
.mb-1rem {
  margin-bottom: 1rem;
}
.link {
  color: $sub;
  &:hover {
    color: $sub
  }
}
</style>
