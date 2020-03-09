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
            About
          </li>
          <li>
            利用規約
          </li>
        </ul>
      </div>
      <div class="list-box">
        <ul>
          <li>
            プライバシー
          </li>
          <li>
            ご意見
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
.list-box {
  text-align: left;
  ul {
    list-style: none;
  }
}
</style>
