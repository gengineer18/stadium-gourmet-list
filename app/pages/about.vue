<template>
  <section>
    <section class="hero is-medium is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title has-text-centered">
            みんなでつくる Jリーグスタグル名鑑
          </h1>
          <h2 class="has-text-centered is-size-5 has-text-weight-semibold">
            CONCEPT
          </h2>
          <h2 class="subtitle has-text-centered is-size-5">
            みんなでつくる Jリーグスタグル名鑑は、<br>「スタジアムグルメを通じてさらにJリーグを盛り上げていく」ことを<br>コンセプトとしたスタグル情報記録・共有Webサイトです。
          </h2>
        </div>
      </div>
    </section>
    <h3 class="has-text-weight-semibold">
      「今日これを食べたよ！」「うちのスタグル、これ美味しいよ！」を共有する
    </h3>
    <p>
      自分が食べたスタグルを共有することができます。Jリーグの醍醐味はサッカーのゲームだけではなく、各クラブが趣向を凝らして提供しているスタジアムグルメにもあります。あなたが共有した情報が他のユーザーの「こんなスタグル食べられるんだ！」という驚きや「これ食べたいな」という想いに繋がり、よりJリーグを盛り上げていくことに繋がります。試合の記憶と共に、コメントを添えてスタグルの記録をしてみましょう。
    </p>
    <h3 class="has-text-weight-semibold">
      「今日の試合、何を食べてから応援しようかな？」を探す
    </h3>
    <p>
      実際にスタグルを食べたユーザーのリアルな口コミを掲載しています。ご当地特産の食材を使ったスタグルやそのチームでしか味わえないような名物スタグルなど、各クラブ・スタジアムによって出店されるスタグルは様々です。ぜひスタグル選びの参考にし、チームの応援への原動力にしてください。
    </p>
  </section>
</template>

<script>
export default {
  layout: 'about',
  head () {
    return {
      title: '当サイトについて'
    }
  }
}
</script>

<style lang="scss" scoped>
h3, p {
  margin-top:1rem;
}
</style>
