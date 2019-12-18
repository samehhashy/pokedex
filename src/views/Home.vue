<template>
<div class="home">

  <v-parallax class="home__hero" src="@/assets/imgs/hero-img.jpg">
  <div class="overlay" />
  <h1 class="home__hero__title">POKEDEX</h1>
  </v-parallax>

  <main class="home__body">
    <v-container>
      <pokemon-list :items="pokemons" />
    </v-container>
  </main>

</div>
</template>

<script>

export default {
  name: 'Home',

  data () {
    return {
      pokemons: []
    }
  },

  components: {
    PokemonList: () => import('@/components/AppList')
  },

  methods: {
    fetchData () {
      this.$axios('pokemon').then(res => {
        this.pokemons = res.data.results
      })
    }
  },

  created () {
    this.fetchData()
  }

}
</script>
