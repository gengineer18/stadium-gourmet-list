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
</style>
