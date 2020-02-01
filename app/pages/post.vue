<template>
  <section id="postpage">
    <h1>投稿</h1>
    <form-input label="スタグル名" max-length="20" class="Form" />
    <form-pulldown label="ホームチーム" :list-items="listItems" class="Form" />
    <form-input label="店舗名" max-length="20" class="Form" />
    <form-text-area label="コメント" max-length="140" class="Form" />
    <form-date label="観戦した日" class="Form" />
  </section>
</template>

<script>
import FormInput from '@/components/FormInput'
import FormPulldown from '@/components/FormPulldown'
import FormTextArea from '@/components/FormTextArea'
import FormDate from '@/components/FormDate'

export default {
  components: {
    FormInput,
    FormPulldown,
    FormTextArea,
    FormDate
  },
  data () {
    return {
      listItems: require('~/assets/json/AllClubsNameList.json')
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
