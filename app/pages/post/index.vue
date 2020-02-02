<template>
  <section id="postpage">
    <h1>投稿</h1>
    <form-input v-model="gourmet" label="スタグル名" max-length="20" class="Form" />
    <form-pulldown v-model="team" label="ホームチーム" :list-items="listItems" class="Form" />
    <form-input v-model="shop" label="店舗名" max-length="20" class="Form" />
    <form-text-area v-model="comment" label="コメント" max-length="140" class="Form" />
    <form-date v-model="date" label="観戦した日" class="Form" />
    <form-file-upload v-model="file" label="写真" class="Form" />
    <b-button
      type="is-sub"
      tag="nuxt-link"
      to="/post/confirm"
    >
      確認
    </b-button>
    <b-button @click="showConsole()">
      コンソール
    </b-button>
    <p>スタグル名：{{ gourmet }}</p>
    <p>チーム名：{{ team }}</p>
    <p>店舗名：{{ shop }}</p>
    <p>コメント：{{ comment }}</p>
    <p>観戦日：{{ date }}</p>
    <p>写真：{{ file }}</p>
  </section>
</template>

<script>
import FormInput from '@/components/FormInput'
import FormPulldown from '@/components/FormPulldown'
import FormTextArea from '@/components/FormTextArea'
import FormDate from '@/components/FormDate'
import FormFileUpload from '@/components/FormFileUpload'

export default {
  components: {
    FormInput,
    FormPulldown,
    FormTextArea,
    FormDate,
    FormFileUpload
  },
  asyncData () {
    return {
      listItems: require('~/assets/json/AllClubsNameList.json')
    }
  },
  data () {
    return {
      gourmet: '',
      team: '',
      shop: '',
      comment: '',
      date: null,
      file: null
    }
  },
  methods: {
    showConsole () {
      console.info(this.file)
    }
  }
}
</script>

<style>
.Form {
  max-width: 540px;
  width: 95%;
  margin: 0 auto;
}
</style>
