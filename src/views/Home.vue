<template>
  <div class="home">
    <v-parallax class="home__hero" src="@/assets/imgs/hero-img.jpg">
      <div class="overlay" />
      <h1 class="home__hero__title" v-text="'POKEDEX'" />
    </v-parallax>

    <main class="home__body">
      <v-container>
        <v-row justify="space-around">
          <v-col cols="12" sm="6" xl="5">
            <pokemon-list
              :items="pokemons"
              @load-more="fetchData(meta.next)"
              :loading="loading.page"
              :no-pagination="hasNextPage"
            />
          </v-col>
          <v-col cols="12" sm="6" xl="5">
            <pokemon-details />
          </v-col>
        </v-row>
      </v-container>
    </main>
  </div>
</template>

<script>
export default {
  name: "Home",

  data() {
    return {
      pokemons: [],
      meta: {
        next: "",
        count: null
      },
      loading: {
        list: false,
        page: false
      }
    };
  },

  components: {
    PokemonList: () => import("@/components/AppList"),
    PokemonDetails: () => import("@/components/DetailsCard")
  },

  computed: {
    hasNextPage() {
      return this.meta.count !== this.pokemons.length;
    }
  },

  methods: {
    fetchData(url = "pokemon") {
      this.loading.page = true;
      this.$axios(url).then(res => {
        this.pokemons.push(...res.data.results);
        this.meta.next = res.data.next;
        this.meta.prev = res.data.previous;
        this.loading.page = false;
      });
    }
  },

  created() {
    this.fetchData();
  }
};
</script>
