<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <nuxt-link
          class="navbar-item"
          to="/"
        >
          <img
            src="~assets/buefy.png"
            alt="Buefy"
            height="28"
          >
        </nuxt-link>

        <nuxt-link class="navbar-item" to="/post">
          投稿
        </nuxt-link>

        <div class="navbar-burger">
          <span />
          <span />
          <span />
        </div>
      </div>
    </nav>

    <section class="main-content columns">
      <div class="container column is-8">
        <h1 class="TestLabel">
          現在αテスト中...
        </h1>
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 32px;
}
.TestLabel {
  font-size: 2.5rem;
}
</style>
