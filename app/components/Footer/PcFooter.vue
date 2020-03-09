<template>
  <footer class="footer">
    <div class="content has-text-centered footer-box">
      <div class="caption-box">
        <ul>
          <li>
            ©︎ 2020 Woods At Web
          </li>
        </ul>
      </div>
      <div class="list-box">
        <ul>
          <li>
            <nuxt-link to="/about">
              <span class="link-black">About</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/terms">
              <span class="link-black">利用規約</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="list-box">
        <ul>
          <li>
            <nuxt-link to="/privacy">
              <span class="link-black">プライバシー</span>
            </nuxt-link>
          </li>
          <li>
            <span class="link-black">ご意見</span>
          </li>
        </ul>
      </div>
      <div class="list-box">
        <ul>
          <li>
            <nuxt-link to="/guidline">
              <span class="link-black">ガイドライン</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '~assets/css/buefy.scss';
.footer-box {
  display:flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 100%;
  max-width: 960px;
  margin: auto;
}
.caption-box {
  margin: auto 0;
  ul {
    list-style: none;
  }
}
.link-black {
  color: $black;
}
.list-box {
  text-align: left;
  ul {
    list-style: none;
  }
}
</style>
