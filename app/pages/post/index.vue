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
      <div v-show="!resizedImg">
        <img src="~/assets/img/default-photo.png">
      </div>
      <div v-show="resizedImg">
        <img :src="resizedImg">
      </div>
      <label class="button is-sub is-small">
        <b-icon
          icon="camera"
          size="is-small"
        />
        写真をアップロード
        <input
          ref="fileInput"
          type="file"
          accept=".jpeg, .png"
          class="input-photo"
          @change="attachImg"
        >
      </label>
      <span @click="clearAttachImg">
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

<script>
import Vue from 'vue'
import 'buefy'
import loadImage from 'blueimp-load-image'
import firebase, { db, storage } from '~/plugins/firebase'
import FormInput from '@/components/Form/FormInput.vue'
import FormPulldown from '@/components/Form/FormPulldown.vue'
import FormTextArea from '@/components/Form/FormTextArea.vue'
import FormDate from '@/components/Form/FormDate.vue'
import { defaultImagePath, toastSuccess, toastFail } from '@/utils/common'

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
      imagePath: '',
      user: {
        id: '',
        name: '',
        photo: ''
      },
      price: null,
      isLoading: false,
      resizedImg: null,
      blob: null
    }
  },
  computed: {
    refs () {
      return this.$refs
    },
    clickable () {
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
              toastSuccess('ゲストパスを発効しました。')
            }
          })
        }).catch((e) => {
          toastFail('エラーが発生しました。')
        })
    },
    sendData () {
      this.$buefy.dialog.confirm({
        message: '投稿してよろしいですか?',
        cancelText: 'キャンセル',
        confirmText: 'OK',
        onConfirm: async () => {
          const docId = await db.collection('posts').doc().id
          const clubId = this.club.id
          // データの登録
          this.upload(docId, clubId)
        }
      })
    },
    attachImg (e) {
      const file = e.target.files[0]

      loadImage.parseMetaData(file, (data) => {
        const options = {
          maxHeight: 300,
          maxWidth: 300,
          canvas: true
        }
        if (data.exif) {
          options.orientation = data.exif.get('Orientation')
        }
        this.displayImage(file, options)
      })
    },
    displayImage (file, options) {
      loadImage(
        file,
        (canvas) => {
          const data = canvas.toDataURL(file.type)
          // data_url形式をblob objectに変換
          const blob = this.base64ToBlob(data, file.type)
          // objectのURLを生成
          const url = window.URL.createObjectURL(blob)
          this.blob = blob
          this.resizedImg = url
        },
        options
      )
    },
    clearAttachImg () {
      this.resizedImg = null
      if (this.$refs.fileInput && this.$refs.fileInput.value !== undefined) {
        this.$refs.fileInput.value = ''
        window.URL.revokeObjectURL(this.resizedImg)
      }
    },
    base64ToBlob (base64, fileType) {
      const bin = atob(base64.replace(/^.*,/, ''))
      const buffer = new Uint8Array(bin.length)
      for (let i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i)
      }
      return new Blob([buffer.buffer], {
        type: fileType || 'image/jpg'
      })
    },
    async upload (docId, clubId) {
      if (this.resizedImg) { // 画像があれば
        const blob = this.blob
        const storageRef = storage.ref().child(`clubs/${clubId}/${docId}.jpg`)
        storageRef.put(blob).then((snapshot) => {
          storageRef.getDownloadURL().then(async (url) => {
            this.imagePath = url
            const postData = {
              gourmet: this.gourmet,
              club: this.club,
              shop: this.shop,
              comment: this.comment,
              gameDate: this.gameDate,
              imagePath: this.imagePath,
              user: {
                id: this.$store.getters['user/userId'],
                name: this.$store.getters['user/userName'],
                photo: this.$store.getters['user/userPhoto']
              },
              price: this.price
            }
            await this.addDb(docId, clubId, postData)
            await this.$router.push(`/post/complete/${docId}`)
            await this.clearAttachImg()
          })
        })
      } else { // 画像の指定がない場合
        const postData = {
          gourmet: this.gourmet,
          club: this.club,
          shop: this.shop,
          comment: this.comment,
          gameDate: this.gameDate,
          imagePath: defaultImagePath,
          user: {
            id: this.$store.getters['user/userId'],
            name: this.$store.getters['user/userName'],
            photo: this.$store.getters['user/userPhoto']
          },
          price: this.price
        }
        await console.log('userphoto', postData.user.photo)
        await this.addDb(docId, clubId, postData)
        await this.$router.push(`/post/complete/${docId}`)
      }
    },
    async addDb (docId, clubId, postData) {
      await this.$store.dispatch('post/add', { postData, docId })
      await this.$store.dispatch('club/add', { postData, docId, clubId })
      if (this.$store.state.user.isAuth) {
        const userId = this.$store.state.user.uid
        await this.$store.dispatch('user/add', { postData, docId, userId })
      }
    }
  },
  head () {
    return {
      title: '投稿する'
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
