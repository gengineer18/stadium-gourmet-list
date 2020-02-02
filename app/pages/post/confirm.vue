<template>
  <section id="postpage">
    <h1>投稿</h1>
    <p>スタグル名：{{ gourmet }}</p>
    <p>チーム名：{{ team }}</p>
    <p>店舗名：{{ shop }}</p>
    <p>コメント：{{ comment }}</p>
    <p>観戦日：{{ date }}</p>
    <nuxt-link to="/post">
      <b-button>戻る</b-button>
    </nuxt-link>
  </section>
</template>

<script>
export default {
  components: {

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
      date: ''
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
