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
            <a href="/terms" target="_blank">
              <span class="link-black">利用規約</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="list-box">
        <ul>
          <li>
            <a href="/privacy" target="_blank">
              <span class="link-black">プライバシー</span>
            </a>
          </li>
          <li>
            <a href="https://forms.gle/o9Bd2j7eFToEBX2RA" target="_blank">
              <span class="link-black">ご意見</span>
            </a>
          </li>
        </ul>
      </div>
      <!-- <div class="list-box">
        <ul>
          <li>
            <a href="/guidline" target="_blank">
              <span class="link-black">ガイドライン</span>
            </a>
          </li>
        </ul>
      </div> -->
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
