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
      <!-- <aside class="column is-2 section">
        <p class="menu-label is-hidden-touch">
          General
        </p>
        <ul class="menu-list">
          <li
            v-for="(item, key) of items"
            :key="key"
          >
            <nuxt-link
              :to="item.to"
              exact-active-class="is-active"
            >
              <b-icon :icon="item.icon" /> {{ item.title }}
            </nuxt-link>
          </li>
        </ul>
      </aside> -->

      <div class="container column is-8">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        // {
        //   title: 'Home',
        //   icon: 'home',
        //   to: { name: 'index' }
        // },
        // {
        //   title: 'Inspire',
        //   icon: 'lightbulb',
        //   to: { name: 'inspire' }
        // },
        // {
        //   title: 'Clubname',
        //   icon: 'lightbulb',
        //   to: { path: '/club/fctokyo' }
        // },
        // {
        //   title: 'Menuid',
        //   icon: 'lightbulb',
        //   to: { path: '/club/fctokyo/curry' }
        // },
        // {
        //   title: 'MenuEdit',
        //   icon: 'lightbulb',
        //   to: { path: '/club/fctokyo/curry/edit' }
        // },
        // {
        //   title: 'User',
        //   icon: 'lightbulb',
        //   to: { path: '/user/test' }
        // },
        // {
        //   title: 'UserEdit',
        //   icon: 'lightbulb',
        //   to: { path: '/user/test/edit' }
        // },
        // {
        //   title: 'post',
        //   icon: 'lightbulb',
        //   to: { path: '/post' }
        // }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 32px;
}
</style>
